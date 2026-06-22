import { motion } from 'framer-motion'

export default function Sheep3D({ parallaxX = 0, parallaxY = 0, alt = 'Eid Al Adha sheep', compact = false }) {
  return (
    <motion.div
      className={`relative z-20 mx-auto w-full ${compact ? 'max-w-[200px] sm:max-w-sm md:max-w-md' : 'max-w-[240px] sm:max-w-sm md:max-w-md'}`}
      initial={{ opacity: 0, scale: 0.85, y: 60 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      style={{
        perspective: 1000,
      }}
    >
      {/* Ground shadow for depth */}
      <motion.div
        className="absolute -bottom-4 left-1/2 h-8 w-3/4 -translate-x-1/2 rounded-[100%] bg-black/40 blur-xl"
        animate={{ scaleX: [1, 1.05, 1], opacity: [0.5, 0.35, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      />

      {/* Parallax tilt layer */}
      <motion.div
        className="relative"
        style={{
          transformStyle: 'preserve-3d',
          rotateX: parallaxY * -0.6,
          rotateY: parallaxX * 0.6,
          x: parallaxX,
          y: parallaxY,
        }}
      >
        {/* Floating layer */}
        <motion.div
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div
            className="absolute inset-0 -z-10 scale-110 rounded-full bg-gradient-to-t from-amber-500/20 via-transparent to-transparent blur-2xl"
            aria-hidden
          />

          <motion.img
            src="/assets/images/sheep-3d.png"
            alt={alt}
            className={`relative mx-auto w-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] ${compact ? 'max-h-[32vh] max-w-[180px] sm:max-h-none sm:max-w-[320px] md:max-w-[380px]' : 'max-w-[220px] sm:max-w-[320px] md:max-w-[380px]'}`}
            draggable={false}
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
