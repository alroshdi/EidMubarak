import { motion } from 'framer-motion'

const PARTICLES = 8

/** Brief golden burst when a star is collected */
export default function CollectParticles({ x, y, onDone }) {
  return (
    <div
      className="pointer-events-none absolute z-20"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      {Array.from({ length: PARTICLES }).map((_, i) => {
        const angle = (i / PARTICLES) * Math.PI * 2
        const dx = Math.cos(angle) * 36
        const dy = Math.sin(angle) * 36
        return (
          <motion.span
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full bg-amber-200 shadow-[0_0_8px_#f5e6a8]"
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{ x: dx, y: dy, opacity: 0, scale: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            onAnimationComplete={i === 0 ? onDone : undefined}
            aria-hidden
          />
        )
      })}
    </div>
  )
}
