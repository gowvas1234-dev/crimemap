/**
 * Plays a discrete, subtle police tactical radio dispatch tone
 * using the Web Audio API without requiring external audio files.
 */
export function playCpoAlertChirp(): void {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (!AudioContextClass) return

    const ctx = new AudioContextClass()
    if (ctx.state === 'suspended') {
      ctx.resume()
    }

    const now = ctx.currentTime

    // Tone 1: High frequency chime
    const osc1 = ctx.createOscillator()
    const gain1 = ctx.createGain()
    osc1.type = 'sine'
    osc1.frequency.setValueAtTime(880, now) // A5
    osc1.frequency.exponentialRampToValueAtTime(1174, now + 0.12) // D6

    gain1.gain.setValueAtTime(0.001, now)
    gain1.gain.linearRampToValueAtTime(0.18, now + 0.02)
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.14)

    osc1.connect(gain1)
    gain1.connect(ctx.destination)
    osc1.start(now)
    osc1.stop(now + 0.15)

    // Tone 2: Confirming harmonic tone
    const osc2 = ctx.createOscillator()
    const gain2 = ctx.createGain()
    osc2.type = 'triangle'
    osc2.frequency.setValueAtTime(1320, now + 0.15) // E6
    osc2.frequency.setValueAtTime(1760, now + 0.22) // A6

    gain2.gain.setValueAtTime(0.001, now + 0.15)
    gain2.gain.linearRampToValueAtTime(0.15, now + 0.18)
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.35)

    osc2.connect(gain2)
    gain2.connect(ctx.destination)
    osc2.start(now + 0.15)
    osc2.stop(now + 0.36)
  } catch {
    // Ignore autoplay or audio context constraints safely
  }
}
