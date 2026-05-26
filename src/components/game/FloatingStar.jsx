import { AnimatePresence, motion } from 'framer-motion'
import { useMemo } from 'react'

/** Single collectible star with float, glow, and burst on collect */
export default function FloatingStar({ star, onCollect, combo }) {
  const floatDuration = useMemo(() => 3.5 + Math.random() * 2, [])
  const floatDelay = useMemo(() => Math.random() * 1.5, [])

  return (
    <AnimatePresence mode="popLayout">
      {!star.collected && (
        <motion.button
          type="button"
          key={star.id}
          className="absolute z-10 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/80"
          style={{ left: `${star.x}%`, top: `${star.y}%` }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -12, 0, 10, 0],
            x: [0, 6, -4, 0],
          }}
          exit={{ opacity: 0, scale: 2.2, filter: 'blur(8px)' }}
          transition={{
            opacity: { duration: 0.25 },
            scale: { duration: 0.35 },
            y: { duration: floatDuration, repeat: Infinity, ease: 'easeInOut', delay: floatDelay },
            x: { duration: floatDuration * 1.1, repeat: Infinity, ease: 'easeInOut', delay: floatDelay },
          }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.85 }}
          onClick={() => onCollect(star.id)}
          aria-label="Collect star"
        >
          {/* Glow pulse */}
          <motion.span
            className="absolute inset-0 -m-3 rounded-full bg-amber-300/30 blur-md"
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            aria-hidden
          />
          <span
            className="relative block text-2xl drop-shadow-[0_0_12px_rgba(245,230,168,0.9)] sm:text-3xl"
            aria-hidden
          >
            ✦
          </span>
          {combo >= 3 && (
            <motion.span
              className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-amber-500/90 px-2 py-0.5 text-[10px] font-bold text-[#0a1628]"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
            >
              x{combo}
            </motion.span>
          )}
        </motion.button>
      )}
    </AnimatePresence>
  )
}
