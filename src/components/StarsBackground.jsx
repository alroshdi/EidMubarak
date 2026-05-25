import { motion } from 'framer-motion'
import { useMemo } from 'react'

const STAR_COUNT = 80

function Star({ style, delay, duration }) {
  return (
    <motion.span
      className="absolute rounded-full bg-white"
      style={style}
      initial={{ opacity: 0.2, scale: 0.6 }}
      animate={{
        opacity: [0.2, 1, 0.3, 0.9, 0.2],
        scale: [0.6, 1, 0.7, 1.1, 0.6],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      aria-hidden
    />
  )
}

export default function StarsBackground() {
  const stars = useMemo(
    () =>
      Array.from({ length: STAR_COUNT }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() * 2.5 + 0.5,
        delay: Math.random() * 4,
        duration: 2 + Math.random() * 3,
      })),
    [],
  )

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {stars.map((star) => (
        <Star
          key={star.id}
          delay={star.delay}
          duration={star.duration}
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            boxShadow: `0 0 ${star.size * 3}px rgba(255, 255, 255, 0.6)`,
          }}
        />
      ))}
    </div>
  )
}
