import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { useLocalGreetings } from '../../hooks/useLocalGreetings'
import MemoryCard from './MemoryCard'

const MAX_NAME = 40
const MAX_MESSAGE = 200

const GLASS =
  'rounded-2xl border border-white/10 bg-white/5 shadow-[0_8px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl'

/** Interactive wall for Eid wishes — LocalStorage only */
export default function EidMemoryWall({ copy, isRtl, fullPage = false }) {
  const { greetings, addGreeting, removeGreeting, canDelete } = useLocalGreetings()
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    const n = name.trim()
    const m = message.trim()
    if (!n || !m) {
      setError(copy.errorEmpty)
      return
    }
    if (n.length > MAX_NAME) {
      setError(copy.errorName)
      return
    }
    if (m.length > MAX_MESSAGE) {
      setError(copy.errorMessage)
      return
    }
    addGreeting(n, m)
    setMessage('')
    setName('')
  }

  return (
    <section
      className={`relative mx-auto w-full max-w-6xl px-3 sm:px-6 ${
        fullPage
          ? 'min-h-[calc(100svh-5.75rem)] py-6 pb-12 sm:min-h-[calc(100svh-3.75rem)] sm:py-10 sm:pb-16'
          : 'py-20 pb-32'
      }`}
      aria-labelledby="memory-wall-title"
    >
      <div className={`${GLASS} overflow-hidden p-4 sm:p-8`}>
        <div className="mb-6 text-center sm:mb-8">
          <h2
            id="memory-wall-title"
            className={`text-xl font-semibold text-amber-100 sm:text-3xl ${isRtl ? 'font-arabic-display' : 'font-display'}`}
          >
            {copy.title}
          </h2>
          <p className={`mt-2 text-xs text-white/60 sm:text-sm ${isRtl ? 'font-arabic-body' : ''}`}>
            {copy.subtitle}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className={`mx-auto mb-8 max-w-xl space-y-4 sm:mb-10 ${isRtl ? 'font-arabic-body' : ''}`}
        >
          <div>
            <label htmlFor="eid-name" className="mb-1 block text-xs text-amber-300/70">
              {copy.nameLabel}
            </label>
            <input
              id="eid-name"
              type="text"
              value={name}
              maxLength={MAX_NAME}
              onChange={(e) => setName(e.target.value)}
              placeholder={copy.namePlaceholder}
              className="w-full rounded-xl border border-white/10 bg-[#050d18]/50 px-4 py-3 text-white placeholder:text-white/30 focus:border-amber-400/50 focus:outline-none focus:ring-1 focus:ring-amber-400/30"
            />
          </div>
          <div>
            <label htmlFor="eid-message" className="mb-1 block text-xs text-amber-300/70">
              {copy.messageLabel}
            </label>
            <textarea
              id="eid-message"
              value={message}
              maxLength={MAX_MESSAGE}
              rows={3}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={copy.messagePlaceholder}
              className="w-full resize-none rounded-xl border border-white/10 bg-[#050d18]/50 px-4 py-3 text-white placeholder:text-white/30 focus:border-amber-400/50 focus:outline-none focus:ring-1 focus:ring-amber-400/30"
            />
            <p className="mt-1 text-end text-[10px] text-white/35">
              {message.length}/{MAX_MESSAGE}
            </p>
          </div>
          {error && (
            <motion.p
              className="text-sm text-red-300/90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.p>
          )}
          <motion.button
            type="submit"
            className="w-full cursor-pointer rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 py-3 text-sm font-semibold text-[#0a1628] shadow-[0_4px_20px_rgba(212,175,55,0.35)] sm:w-auto sm:px-10"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {copy.submit}
          </motion.button>
        </form>

        {greetings.length === 0 ? (
          <motion.div
            className="flex flex-col items-center justify-center py-16 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.span
              className="mb-4 text-5xl text-amber-300/40"
              animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
              aria-hidden
            >
              ✦
            </motion.span>
            <p className={`text-white/40 ${isRtl ? 'font-arabic-body text-lg' : 'text-sm'}`}>
              {copy.empty}
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 gap-4 overflow-hidden sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {greetings.map((g) => (
                <MemoryCard
                  key={g.id}
                  greeting={g}
                  onDelete={removeGreeting}
                  canDelete={canDelete(g.id)}
                  copy={copy}
                  isRtl={isRtl}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  )
}
