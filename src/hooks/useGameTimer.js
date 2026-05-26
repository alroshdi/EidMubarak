import { useCallback, useEffect, useRef, useState } from 'react'

export const GAME_DURATION_SEC = 60

/** Countdown timer for the star game round */
export function useGameTimer(durationSec = GAME_DURATION_SEC) {
  const [timeLeft, setTimeLeft] = useState(durationSec)
  const [isRunning, setIsRunning] = useState(true)
  const [isFinished, setIsFinished] = useState(false)
  const intervalRef = useRef(null)

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const startTimer = useCallback(() => {
    clearTimer()
    setTimeLeft(durationSec)
    setIsFinished(false)
    setIsRunning(true)

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
          setIsRunning(false)
          setIsFinished(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }, [durationSec, clearTimer])

  const stopTimer = useCallback(() => {
    clearTimer()
    setIsRunning(false)
  }, [clearTimer])

  useEffect(() => {
    startTimer()
    return clearTimer
  }, [startTimer, clearTimer])

  const formatTime = useCallback((seconds) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }, [])

  return {
    timeLeft,
    timeDisplay: formatTime(timeLeft),
    isRunning,
    isFinished,
    startTimer,
    stopTimer,
    progress: timeLeft / durationSec,
  }
}
