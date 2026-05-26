import { useCallback, useMemo, useState } from 'react'

const STORAGE_KEY = 'eid-memory-greetings'
const OWNER_KEY = 'eid-memory-owner'

function getOwnerId() {
  try {
    let id = sessionStorage.getItem(OWNER_KEY)
    if (!id) {
      id = crypto.randomUUID()
      sessionStorage.setItem(OWNER_KEY, id)
    }
    return id
  } catch {
    return 'guest'
  }
}

function loadGreetings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveGreetings(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  } catch {
    /* ignore */
  }
}

/** Eid wishes stored in LocalStorage; delete limited to current visitor */
export function useLocalGreetings() {
  const ownerId = useMemo(() => getOwnerId(), [])
  const [greetings, setGreetings] = useState(loadGreetings)

  const addGreeting = useCallback((name, message) => {
    const entry = {
      id: crypto.randomUUID(),
      ownerId,
      name: name.trim(),
      message: message.trim(),
      createdAt: Date.now(),
    }
    setGreetings((prev) => {
      const next = [entry, ...prev]
      saveGreetings(next)
      return next
    })
    return entry
  }, [ownerId])

  const removeGreeting = useCallback(
    (id) => {
      setGreetings((prev) => {
        const target = prev.find((g) => g.id === id)
        if (!target || target.ownerId !== ownerId) return prev
        const next = prev.filter((g) => g.id !== id)
        saveGreetings(next)
        return next
      })
    },
    [ownerId],
  )

  const canDelete = useCallback(
    (id) => {
      const g = greetings.find((item) => item.id === id)
      return g?.ownerId === ownerId
    },
    [greetings, ownerId],
  )

  return { greetings, addGreeting, removeGreeting, canDelete }
}
