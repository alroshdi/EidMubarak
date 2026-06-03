import { motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import Moon from './components/Moon'
import Sheep3D from './components/Sheep3D'
import StarsBackground from './components/StarsBackground'
import { useParallax } from './hooks/useParallax'

const TAKBEER_AUDIO = '/assets/audio/takbeer.mp3'

const CONTENT = {
  en: {
    occasion: 'Eid Al Adha',
    heading: 'Eid Mubarak',
    subheading:
      'May Allah accept our good deeds and bless you with happiness and peace.',
    play: 'Play Takbeer',
    pause: 'Pause Takbeer',
    sheepAlt: 'Eid Al Adha sheep',
  },
  ar: {
    occasion: 'عيد الأضحى',
    heading: 'عيد مبارك',
    subheading: 'تقبل الله منا ومنكم صالح الأعمال وجعل أيامكم سعيدة ومباركة.',
    play: 'تشغيل التكبير',
    pause: 'إيقاف التكبير',
    sheepAlt: 'خروف عيد الأضحى',
  },
}

export default function EidAdha3DPage() {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [lang, setLang] = useState('ar')

  const t = CONTENT[lang]
  const isRtl = lang === 'ar'

  const { getTransform } = useParallax({ intensity: 1.2 })
  const sheepParallax = getTransform(1.5)
  const moonParallax = getTransform(0.6)

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr'
  }, [lang, isRtl])

  const togglePlay = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      audio.play().catch(() => {})
    } else {
      audio.pause()
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = 0.7

    const tryAutoplay = async () => {
      try {
        await audio.play()
      } catch {
        setIsPlaying(false)
      }
    }

    const onCanPlay = () => tryAutoplay()

    audio.addEventListener('canplaythrough', onCanPlay)
    if (audio.readyState >= 3) onCanPlay()

    return () => audio.removeEventListener('canplaythrough', onCanPlay)
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)
    const onEnded = () => {
      setIsPlaying(false)
      audio.currentTime = 0
      audio.play().catch(() => {})
    }

    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('ended', onEnded)

    return () => {
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('ended', onEnded)
    }
  }, [])

  return (
    <div
      className="relative min-h-svh w-full overflow-hidden bg-gradient-to-b from-[#050d18] via-[#0a1628] to-[#0d1f3c] text-white"
      dir={isRtl ? 'rtl' : 'ltr'}
      lang={lang}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_80%,rgba(212,175,55,0.08)_0%,transparent_55%)]"
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse at 30% 20%, rgba(100, 149, 237, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 70% 60%, rgba(212, 175, 55, 0.08) 0%, transparent 45%)',
        }}
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      />

      <StarsBackground />
      <Moon parallaxX={moonParallax.x} parallaxY={moonParallax.y} />

      <audio ref={audioRef} src={TAKBEER_AUDIO} preload="auto" loop />

      {/* Top bar: always top-left, order unchanged in any language */}
      <motion.div
        dir="ltr"
        className="fixed top-4 left-4 z-50 flex flex-row flex-wrap items-center gap-2 sm:top-6 sm:left-6 sm:gap-3"
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.button
          type="button"
          onClick={togglePlay}
          className={`rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 px-5 py-3 text-sm font-semibold text-[#0a1628] shadow-[0_4px_24px_rgba(212,175,55,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a1628] sm:px-7 sm:py-3.5 ${isRtl ? 'font-arabic-display tracking-normal' : 'tracking-wide'}`}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          aria-label={isPlaying ? t.pause : t.play}
        >
          {isPlaying ? t.pause : t.play}
        </motion.button>

        <div
          className="flex overflow-hidden rounded-xl border border-amber-400/40 bg-white/5 shadow-[0_4px_20px_rgba(0,0,0,0.3)] backdrop-blur-md"
          role="group"
          aria-label="Language"
        >
          <LangButton active={lang === 'en'} onClick={() => setLang('en')}>
            EN
          </LangButton>
          <LangButton active={lang === 'ar'} onClick={() => setLang('ar')} arabic>
            عربي
          </LangButton>
        </div>
      </motion.div>

      <main
        className={`relative z-30 flex min-h-svh flex-col items-center justify-center px-4 py-16 sm:px-6 md:px-8 ${isRtl ? 'font-arabic-body' : ''}`}
      >
        <motion.header
          className="mb-6 text-center sm:mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          key={lang}
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
            className={`mx-auto mt-4 w-full max-w-lg text-center text-white/75 ${isRtl ? 'font-arabic-body text-lg leading-[2] sm:text-xl md:text-2xl' : 'font-body text-sm leading-relaxed sm:text-base md:text-lg'}`}
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

        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-amber-900/20 to-transparent"
          aria-hidden
        />
      </main>
    </div>
  )
}

function LangButton({ children, active, onClick, arabic = false }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={`px-4 py-3 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 focus-visible:ring-inset ${arabic ? 'font-arabic-display text-base' : ''} ${
        active
          ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-[#0a1628]'
          : 'text-amber-100/90 hover:bg-white/10'
      }`}
      whileTap={{ scale: 0.97 }}
      aria-pressed={active}
    >
      {children}
    </motion.button>
  )
}
