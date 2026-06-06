import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import StarGame from './components/game/StarGame'
import HomeHero from './components/layout/HomeHero'
import PageControls from './components/layout/PageControls'
import TopNav, { PAGES } from './components/layout/TopNav'
import EidMemoryWall from './components/memory/EidMemoryWall'
import Moon from './components/Moon'
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
    nav: {
      home: 'Home',
      game: 'Star Game',
      memory: 'Memory Wall',
    },
    game: {
      title: 'Eid Star Quest',
      instructions: 'Collect stars in 60 seconds — build combos for bonus points!',
      score: 'Score',
      time: 'Time',
      timeUp: "Time's Up!",
      finalScore: 'Final score',
      best: 'Best',
      restart: 'Restart',
      champion: 'Eid Champion',
      championHint: 'Reach {n} points to earn the Eid Champion badge',
      combo: 'Combo',
      waiting: 'Stars arriving…',
      playAgain: 'Play Again',
    },
    memory: {
      title: 'Eid Memory Wall',
      subtitle: 'Share your Eid wishes — they float here for everyone to see',
      nameLabel: 'Your name',
      namePlaceholder: 'Enter your name',
      messageLabel: 'Eid message',
      messagePlaceholder: 'Write your Eid greeting…',
      submit: 'Share Greeting',
      delete: 'Delete message',
      empty: 'Be the first to leave an Eid wish on the wall',
      errorEmpty: 'Please enter your name and message',
      errorName: 'Name is too long',
      errorMessage: 'Message is too long',
    },
  },
  ar: {
    occasion: 'عيد الأضحى',
    heading: 'عيد مبارك',
    subheading: 'تقبل الله منا ومنكم صالح الأعمال وجعل أيامكم سعيدة ومباركة.',
    play: 'تشغيل التكبير',
    pause: 'إيقاف التكبير',
    sheepAlt: 'خروف عيد الأضحى',
    nav: {
      home: 'الرئيسية',
      game: 'اللعبة',
      memory: 'جدار التهاني',
    },
    game: {
      title: 'لعبة نجوم العيد',
      instructions: 'اجمع النجوم خلال ٦٠ ثانية — سلسلة سريعة تعطيك نقاطًا إضافية!',
      score: 'النقاط',
      time: 'الوقت',
      timeUp: 'انتهى الوقت!',
      finalScore: 'النتيجة',
      best: 'الأفضل',
      restart: 'إعادة البدء',
      champion: 'بطل العيد',
      championHint: 'اجمع {n} نقطة لتحصل على وسام بطل العيد',
      combo: 'سلسلة',
      waiting: 'النجوم في الطريق…',
      playAgain: 'العب مجددًا',
    },
    memory: {
      title: 'جدار ذكريات العيد',
      subtitle: 'شارك تهنئتك بالعيد — تظهر هنا كبطاقات عائمة للجميع',
      nameLabel: 'اسمك',
      namePlaceholder: 'اكتب اسمك',
      messageLabel: 'رسالة العيد',
      messagePlaceholder: 'اكتب تهنئة العيد…',
      submit: 'شارك التهنئة',
      delete: 'حذف الرسالة',
      empty: 'كن أول من يكتب تهنئة على جدار العيد',
      errorEmpty: 'يرجى إدخال الاسم والرسالة',
      errorName: 'الاسم طويل جدًا',
      errorMessage: 'الرسالة طويلة جدًا',
    },
  },
}

const pageTransition = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
}

export default function EidAdha3DPage() {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [lang, setLang] = useState('ar')
  const [activePage, setActivePage] = useState(PAGES.home)

  const handleNavigate = useCallback((page) => {
    setActivePage(page)
    window.scrollTo(0, 0)
  }, [])

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
      className="relative min-h-svh w-full overflow-x-hidden bg-gradient-to-b from-[#050d18] via-[#0a1628] to-[#0d1f3c] text-white"
      dir={isRtl ? 'rtl' : 'ltr'}
      lang={lang}
    >
      <div className="pointer-events-none fixed inset-0 z-0">
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_80%,rgba(212,175,55,0.08)_0%,transparent_55%)]"
          aria-hidden
        />
        <motion.div
          className="absolute inset-0 opacity-40"
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
      </div>

      <audio ref={audioRef} src={TAKBEER_AUDIO} preload="auto" loop />

      <PageControls
        isPlaying={isPlaying}
        onTogglePlay={togglePlay}
        playLabel={t.play}
        pauseLabel={t.pause}
        lang={lang}
        onSetLang={setLang}
        isRtl={isRtl}
      />

      <TopNav
        activePage={activePage}
        onNavigate={handleNavigate}
        navCopy={t.nav}
        isRtl={isRtl}
      />

      <div className="relative z-10 pt-14 sm:pt-16">
        <AnimatePresence mode="wait">
          {activePage === PAGES.home && (
            <motion.div key="home" {...pageTransition}>
              <HomeHero t={t} isRtl={isRtl} sheepParallax={sheepParallax} />
            </motion.div>
          )}
          {activePage === PAGES.game && (
            <motion.div key="game" {...pageTransition}>
              <StarGame copy={t.game} isRtl={isRtl} fullPage />
            </motion.div>
          )}
          {activePage === PAGES.memory && (
            <motion.div key="memory" {...pageTransition}>
              <EidMemoryWall copy={t.memory} isRtl={isRtl} fullPage />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
