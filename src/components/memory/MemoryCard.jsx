import { motion } from 'framer-motion'
import { useMemo } from 'react'

/** Floating glass card for one Eid greeting */
export default function MemoryCard({ greeting, onDelete, canDelete, copy, isRtl }) {
  const rotation = useMemo(() => -4 + Math.random() * 8, [greeting.id])
  const delay = useMemo(() => Math.random() * 0.4, [greeting.id])

  const date = new Date(greeting.createdAt)
  const timeStr = date.toLocaleString(isRtl ? 'ar-OM' : 'en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <motion.article
      layout
      className="memory-card group relative w-full max-w-none rounded-2xl border border-white/10 bg-white/5 p-4 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:max-w-sm sm:p-5"
      style={{ rotate: rotation }}
      initial={{ opacity: 0, y: 24, scale: 0.92 }}
      animate={{
        opacity: 1,
        y: [0, -8, 0],
        scale: 1,
      }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.25 } }}
      transition={{
        y: { duration: 5 + delay * 2, repeat: Infinity, ease: 'easeInOut', delay },
        opacity: { duration: 0.5, delay },
        scale: { duration: 0.5, delay },
      }}
      whileHover={{ scale: 1.04, rotate: 0, zIndex: 10 }}
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <h3
          className={`min-w-0 break-words font-semibold text-amber-200 ${isRtl ? 'font-arabic-display text-base sm:text-lg' : 'font-display text-sm sm:text-base'}`}
        >
          {greeting.name}
        </h3>
        {canDelete && (
          <motion.button
            type="button"
            onClick={() => onDelete(greeting.id)}
            className="cursor-pointer shrink-0 rounded-lg px-2 py-1 text-xs text-white/40 hover:bg-white/10 hover:text-red-300"
            whileTap={{ scale: 0.95 }}
            aria-label={copy.delete}
          >
            ×
          </motion.button>
        )}
      </div>
      <p
        className={`break-words leading-relaxed text-white/80 ${isRtl ? 'font-arabic-body text-sm sm:text-base' : 'text-sm'}`}
      >
        {greeting.message}
      </p>
      <time className="mt-3 block text-[10px] text-white/35" dateTime={date.toISOString()}>
        {timeStr}
      </time>
    </motion.article>
  )
}
