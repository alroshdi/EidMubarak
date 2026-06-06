import { motion } from 'framer-motion'
import Sheep3D from '../Sheep3D'

/** Main Eid hero — home page view */
export default function HomeHero({ t, isRtl, sheepParallax }) {
  return (
    <main
      className={`relative flex min-h-[calc(100svh-3.5rem)] flex-col items-center justify-center px-4 py-12 sm:px-6 md:px-8 ${isRtl ? 'font-arabic-body' : ''}`}
    >
      <motion.header
        className="mb-6 text-center sm:mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        key={isRtl ? 'ar' : 'en'}
      >
        <motion.p
          className={`mb-2 text-xs text-amber-300/80 sm:text-sm ${isRtl ? 'font-arabic-display text-base font-medium tracking-normal sm:text-lg' : 'font-body uppercase tracking-[0.35em]'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {t.occasion}
        </motion.p>
        <motion.h1
          className={`bg-gradient-to-r from-amber-200 via-[#d4af37] to-amber-100 bg-clip-text font-semibold text-transparent ${isRtl ? 'font-arabic-display text-6xl leading-tight sm:text-7xl md:text-8xl' : 'font-display text-4xl tracking-wide sm:text-5xl md:text-6xl lg:text-7xl'}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          {t.heading}
        </motion.h1>
        <motion.p
          className={`mx-auto mt-4 max-w-lg text-white/75 ${isRtl ? 'font-arabic-body text-lg leading-[2] sm:text-xl md:text-2xl' : 'font-body text-sm leading-relaxed sm:text-base md:text-lg'}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
        >
          {t.subheading}
        </motion.p>
      </motion.header>

      <Sheep3D
        parallaxX={sheepParallax.x}
        parallaxY={sheepParallax.y}
        alt={t.sheepAlt}
      />

      <motion.div
        className={`absolute bottom-6 left-0 right-0 flex items-center justify-center gap-2 text-xs sm:bottom-8 sm:text-sm ${isRtl ? 'font-arabic-display' : 'font-body'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <a
          href="https://alroshdi.github.io/hajersystems/"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 text-white/40 transition-colors hover:text-amber-200/80"
          aria-label="Visit Hajer Alroshdi website"
        >
          <span>Done by Hajer Alroshdi</span>
          <svg
            className="h-4 w-4 shrink-0 opacity-70 transition-opacity group-hover:opacity-100"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
          </svg>
        </a>
      </motion.div>

      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-amber-900/20 to-transparent"
        aria-hidden
      />
    </main>
  )
}
