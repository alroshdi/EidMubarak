import { useCallback, useState } from 'react'

const STORAGE_KEY = 'eid-star-game-best'
export const CHAMPION_SCORE = 25

function readBestScore() {
  try {
    return Number(localStorage.getItem(STORAGE_KEY)) || 0
  } catch {
    return 0
  }
}

/** Score state with best score persisted in LocalStorage */
export function useGameScore() {
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(readBestScore)

  const addScore = useCallback((points = 1) => {
    setScore((prev) => {
      const next = prev + points
      setBestScore((best) => {
        if (next > best) {
          try {
            localStorage.setItem(STORAGE_KEY, String(next))
          } catch {
            /* storage full / private mode */
          }
          return next
        }
        return best
      })
      return next
    })
  }, [])

  const resetScore = useCallback(() => setScore(0), [])

  return {
    score,
    bestScore,
    addScore,
    resetScore,
    isChampion: score >= CHAMPION_SCORE,
  }
}
