import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { CHAMPION_SCORE, useGameScore } from '../../hooks/useGameScore'
import { GAME_DURATION_SEC, useGameTimer } from '../../hooks/useGameTimer'
import { playCollectSound } from '../../utils/playCollectSound'
import CollectParticles from './CollectParticles'
import FloatingStar from './FloatingStar'

const MAX_STARS = 14
const SPAWN_MS = 450
const STARS_PER_TICK = 2
const COMBO_WINDOW_MS = 1200

function randomPosition() {
  return {
    x: 8 + Math.random() * 84,
    y: 10 + Math.random() * 78,
  }
}

const GLASS =
  'rounded-2xl border border-white/10 bg-white/5 shadow-[0_8px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl'

/** Mini star collection game with timer, score, combo, and champion badge */
export default function StarGame({ copy, isRtl, fullPage = false }) {
  const { score, bestScore, addScore, resetScore, isChampion } = useGameScore()
  const {
    timeLeft,
    timeDisplay,
    isRunning,
    isFinished,
    startTimer,
    progress,
  } = useGameTimer(GAME_DURATION_SEC)

  const showChampion = isChampion || bestScore >= CHAMPION_SCORE
  const [stars, setStars] = useState([])
  const [particles, setParticles] = useState([])
  const [combo, setCombo] = useState(0)
  const [comboFlash, setComboFlash] = useState(false)
  const lastCollectRef = useRef(0)
  const comboTimeoutRef = useRef(null)
  const spawnIntervalRef = useRef(null)

  const spawnStars = useCallback(() => {
    if (!isRunning) return
    setStars((prev) => {
      const active = prev.filter((s) => !s.collected).length
      const room = MAX_STARS - active
      if (room <= 0) return prev

      const count = Math.min(STARS_PER_TICK, room)
      const newStars = Array.from({ length: count }, () => ({
        id: crypto.randomUUID(),
        ...randomPosition(),
        collected: false,
      }))
      return [...prev, ...newStars]
    })
  }, [isRunning])

  useEffect(() => {
    if (!isRunning) {
      if (spawnIntervalRef.current) {
        clearInterval(spawnIntervalRef.current)
        spawnIntervalRef.current = null
      }
      return
    }

    spawnStars()
    spawnIntervalRef.current = setInterval(spawnStars, SPAWN_MS)
    return () => {
      if (spawnIntervalRef.current) clearInterval(spawnIntervalRef.current)
    }
  }, [isRunning, spawnStars])

  useEffect(() => {
    const id = setInterval(() => {
      setStars((prev) => prev.filter((s) => !s.collected))
    }, 800)
    return () => clearInterval(id)
  }, [])

  const handleCollect = useCallback(
    (starId) => {
      if (!isRunning || isFinished) return

      const star = stars.find((s) => s.id === starId)
      if (!star || star.collected) return

      const now = Date.now()
      let nextCombo = 1
      if (now - lastCollectRef.current < COMBO_WINDOW_MS) {
        nextCombo = combo + 1
        setComboFlash(true)
        setTimeout(() => setComboFlash(false), 600)
      } else {
        nextCombo = 1
      }
      lastCollectRef.current = now
      setCombo(nextCombo)

      if (comboTimeoutRef.current) clearTimeout(comboTimeoutRef.current)
      comboTimeoutRef.current = setTimeout(() => setCombo(0), COMBO_WINDOW_MS)

      playCollectSound(nextCombo)
      addScore(nextCombo >= 3 ? 2 : 1)

      setParticles((p) => [...p, { id: starId, x: star.x, y: star.y }])
      setStars((prev) =>
        prev.map((s) => (s.id === starId ? { ...s, collected: true } : s)),
      )
    },
    [stars, combo, addScore, isRunning, isFinished],
  )

  const handlePlayAgain = () => {
    resetScore()
    setCombo(0)
    setStars([])
    setParticles([])
    startTimer()
    setTimeout(spawnStars, 150)
  }

  const removeParticle = useCallback((id) => {
    setParticles((p) => p.filter((x) => x.id !== id))
  }, [])

  const isLowTime = timeLeft <= 10 && isRunning

  return (
    <section
      className={`relative mx-auto w-full max-w-4xl px-4 sm:px-6 ${
        fullPage
          ? 'flex min-h-[calc(100svh-3.75rem)] flex-col justify-center py-8 sm:py-10'
          : 'py-20'
      }`}
      aria-labelledby="star-game-title"
    >
      <div className={`${GLASS} overflow-hidden p-6 sm:p-8`}>
        <div className="mb-6 text-center">
          <h2
            id="star-game-title"
            className={`text-2xl font-semibold text-amber-100 sm:text-3xl ${isRtl ? 'font-arabic-display' : 'font-display'}`}
          >
            {copy.title}
          </h2>
          <p className={`mt-2 text-sm text-white/60 ${isRtl ? 'font-arabic-body' : ''}`}>
            {copy.instructions}
          </p>
        </div>

        {/* Score + timer row */}
        <div className="mb-4 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <ScorePill label={copy.score} value={score} highlight />
          <TimerPill
            label={copy.time}
            display={timeDisplay}
            isLowTime={isLowTime}
            isFinished={isFinished}
            progress={progress}
          />
          <ScorePill label={copy.best} value={bestScore} />
          <AnimatePresence>
            {showChampion && (
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="rounded-full border border-amber-400/50 bg-amber-500/20 px-4 py-1.5 text-xs font-semibold text-amber-200 sm:text-sm"
              >
                {copy.champion}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {comboFlash && combo >= 3 && isRunning && (
            <motion.p
              className="mb-2 text-center text-lg font-bold text-amber-300"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              {copy.combo} x{combo}!
            </motion.p>
          )}
        </AnimatePresence>

        {/* Game arena */}
        <div
          className="relative mx-auto h-[min(52vw,320px)] max-h-[360px] min-h-[260px] w-full overflow-hidden rounded-xl border border-amber-400/15 bg-[#050d18]/60"
          style={{
            backgroundImage:
              'radial-gradient(ellipse at center, rgba(212,175,55,0.06) 0%, transparent 70%)',
          }}
        >
          {isRunning &&
            stars.map((star) => (
              <FloatingStar
                key={star.id}
                star={star}
                onCollect={handleCollect}
                combo={combo}
              />
            ))}
          {particles.map((p) => (
            <CollectParticles
              key={p.id}
              x={p.x}
              y={p.y}
              onDone={() => removeParticle(p.id)}
            />
          ))}

          {isRunning && stars.filter((s) => !s.collected).length === 0 && (
            <motion.p
              className="absolute inset-0 flex items-center justify-center text-sm text-white/30"
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {copy.waiting}
            </motion.p>
          )}

          <AnimatePresence>
            {isFinished && (
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center bg-[#050d18]/75 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.p
                  className={`text-xl font-semibold text-amber-200 sm:text-2xl ${isRtl ? 'font-arabic-display' : 'font-display'}`}
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                >
                  {copy.timeUp}
                </motion.p>
                <p className={`mt-2 text-sm text-white/60 ${isRtl ? 'font-arabic-body' : ''}`}>
                  {copy.finalScore}: {score}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-6 flex justify-center">
          <motion.button
            type="button"
            onClick={handlePlayAgain}
            className="cursor-pointer rounded-xl border border-amber-400/40 bg-white/5 px-6 py-2.5 text-sm font-medium text-amber-100 hover:bg-white/10"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {isFinished ? copy.playAgain : copy.restart}
          </motion.button>
        </div>

        {!showChampion && (
          <p className="mt-3 text-center text-xs text-white/35">
            {copy.championHint.replace('{n}', String(CHAMPION_SCORE))}
          </p>
        )}
      </div>
    </section>
  )
}

function ScorePill({ label, value, highlight }) {
  return (
    <div className="text-center">
      <p className="text-[10px] uppercase tracking-widest text-amber-300/60 sm:text-xs">
        {label}
      </p>
      <motion.p
        key={value}
        className={`font-display text-2xl font-semibold sm:text-3xl ${highlight ? 'text-amber-200' : 'text-white/80'}`}
        initial={{ scale: 1.2, opacity: 0.6 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 18 }}
      >
        {value}
      </motion.p>
    </div>
  )
}

function TimerPill({ label, display, isLowTime, isFinished, progress }) {
  return (
    <div className="text-center">
      <p className="text-[10px] uppercase tracking-widest text-amber-300/60 sm:text-xs">
        {label}
      </p>
      <motion.p
        key={display}
        className={`font-display text-2xl font-semibold tabular-nums sm:text-3xl ${
          isFinished
            ? 'text-white/50'
            : isLowTime
              ? 'text-red-300'
              : 'text-amber-100'
        }`}
        animate={isLowTime && !isFinished ? { scale: [1, 1.08, 1] } : {}}
        transition={{ duration: 0.5, repeat: isLowTime ? Infinity : 0 }}
      >
        {display}
      </motion.p>
      <div className="mx-auto mt-1.5 h-1 w-16 overflow-hidden rounded-full bg-white/10 sm:w-20">
        <motion.div
          className={`h-full rounded-full ${isLowTime ? 'bg-red-400/80' : 'bg-amber-400/80'}`}
          style={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  )
}
