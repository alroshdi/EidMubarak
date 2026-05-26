let audioCtx = null

/** Short golden chime via Web Audio — no external audio file */
export function playCollectSound(comboMultiplier = 1) {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext
    if (!Ctx) return
    if (!audioCtx) audioCtx = new Ctx()
    if (audioCtx.state === 'suspended') audioCtx.resume()

    const t = audioCtx.currentTime
    const base = 720 + Math.min(comboMultiplier, 5) * 80

    const osc = audioCtx.createOscillator()
    const gain = audioCtx.createGain()
    osc.type = 'sine'
    osc.connect(gain)
    gain.connect(audioCtx.destination)

    osc.frequency.setValueAtTime(base, t)
    osc.frequency.exponentialRampToValueAtTime(base * 1.6, t + 0.07)
    gain.gain.setValueAtTime(0.12, t)
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.14)

    osc.start(t)
    osc.stop(t + 0.15)
  } catch {
    /* autoplay policy or unsupported */
  }
}
