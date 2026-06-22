import { motion } from 'framer-motion'
import Sheep3D from '../Sheep3D'

/** Main Eid hero — home page view */
export default function HomeHero({ t, isRtl, sheepParallax }) {
  return (
    <main
      className={`relative flex h-[calc(100svh-5.75rem)] flex-col overflow-hidden px-3 sm:h-[calc(100svh-4rem)] sm:px-6 md:px-8 ${isRtl ? 'font-arabic-body' : ''}`}
    >
      <motion.header
        className="shrink-0 pt-1 text-center sm:pt-2"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        key={isRtl ? 'ar' : 'en'}
      >
        <motion.p
          className={`mb-1 text-[11px] text-amber-300/80 sm:mb-2 sm:text-sm ${isRtl ? 'font-arabic-display text-sm font-medium tracking-normal sm:text-lg' : 'font-body uppercase tracking-[0.25em] sm:tracking-[0.35em]'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {t.occasion}
        </motion.p>
        <motion.h1
          className={`bg-gradient-to-r from-amber-200 via-[#d4af37] to-amber-100 bg-clip-text font-semibold text-transparent ${isRtl ? 'font-arabic-display text-[2.25rem] leading-tight sm:text-7xl md:text-8xl' : 'font-display text-3xl tracking-wide sm:text-5xl md:text-6xl lg:text-7xl'}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          {t.heading}
        </motion.h1>
        <motion.p
          className={`mx-auto mt-1 max-w-lg px-1 text-white/75 sm:mt-4 ${isRtl ? 'font-arabic-body text-sm leading-[1.75] sm:text-xl md:text-2xl' : 'font-body text-sm leading-relaxed sm:text-base md:text-lg'}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
        >
          {t.subheading}
        </motion.p>
      </motion.header>

      <div className="flex min-h-0 flex-1 items-center justify-center">
        <Sheep3D
          parallaxX={sheepParallax.x}
          parallaxY={sheepParallax.y}
          alt={t.sheepAlt}
          compact
        />
      </div>

      <motion.div
        className={`relative z-30 shrink-0 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 text-center text-[11px] sm:pb-3 sm:pt-4 sm:text-sm ${isRtl ? 'font-arabic-display' : 'font-body'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <a
          href="https://alroshdi.github.io/hajersystems/"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative z-30 mx-auto flex flex-wrap items-center justify-center gap-1.5 px-3 text-white/40 transition-colors hover:text-amber-200/80 sm:gap-2 sm:px-0"
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
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-amber-900/20 to-transparent sm:h-32"
        aria-hidden
      />
    </main>
  )
}
