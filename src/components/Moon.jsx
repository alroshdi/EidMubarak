import { motion } from 'framer-motion'

export default function Moon({ parallaxX = 0, parallaxY = 0 }) {
  return (
    <motion.div
      className="pointer-events-none absolute top-8 right-[8%] z-10 sm:top-12 sm:right-[12%] md:top-16"
      initial={{ opacity: 0, y: -40, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      style={{
        x: parallaxX * 0.4,
        y: parallaxY * 0.4,
      }}
    >
      {/* Pulse glow */}
      <motion.div
        className="absolute inset-0 -m-8 rounded-full bg-amber-200/20 blur-3xl"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      />
      <motion.div
        className="absolute inset-0 -m-4 rounded-full bg-amber-100/10 blur-2xl"
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        aria-hidden
      />

      <motion.img
        src="/assets/images/moon.png"
        alt=""
        className="relative h-20 w-20 select-none object-contain drop-shadow-[0_0_30px_rgba(245,230,168,0.5)] sm:h-28 sm:w-28 md:h-36 md:w-36"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        draggable={false}
      />
    </motion.div>
  )
}
