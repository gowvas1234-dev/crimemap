import { useEffect, useState } from 'react'

interface AnimatedBackgroundProps {
  theme?: 'dark' | 'light'
}

export function AnimatedBackground({ theme = 'dark' }: AnimatedBackgroundProps) {
  const [time, setTime] = useState('')
  const isLight = theme === 'light'

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString('en-IN', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      )
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden select-none z-0 transition-colors duration-300"
      aria-hidden="true"
    >
      {/* Background Gradient for Theme */}
      {isLight ? (
        <>
          <div className="absolute inset-0 bg-[#f1f5f9]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(248,250,252,0.95)_0%,rgba(226,232,240,0.98)_100%)]" />
          <div className="absolute -top-40 left-1/4 size-[550px] rounded-full bg-blue-500/8 blur-[140px]" />
          <div className="absolute -top-40 right-1/4 size-[550px] rounded-full bg-amber-500/6 blur-[140px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,#000_60%,transparent_100%)]" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-[#081220]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(15,29,51,0.85)_0%,rgba(8,18,32,0.98)_100%)]" />
          <div className="absolute -top-40 left-1/4 size-[550px] rounded-full bg-blue-600/10 blur-[140px]" />
          <div className="absolute -top-40 right-1/4 size-[550px] rounded-full bg-amber-500/8 blur-[140px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,#000_60%,transparent_100%)]" />
        </>
      )}

      {/* Centerpiece: Puducherry Police Emblem 2 (Golden Ashoka & Blue Wreath) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        {/* Soft Golden & Royal Blue Halos */}
        <div className={`absolute size-[580px] rounded-full blur-[110px] ${isLight ? 'bg-blue-600/6' : 'bg-blue-600/10'}`} />
        <div className={`absolute size-[440px] rounded-full blur-[95px] ${isLight ? 'bg-amber-500/6' : 'bg-amber-500/8'}`} />

        {/* Precision Thin HUD Rings */}
        <svg
          className="absolute size-[640px] text-blue-400/10"
          viewBox="0 0 400 400"
          fill="none"
        >
          <circle
            cx="200"
            cy="200"
            r="192"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeDasharray="4 8"
          />
          <circle
            cx="200"
            cy="200"
            r="168"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeDasharray="2 12"
          />
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <line
              key={deg}
              x1="200"
              y1="5"
              x2="200"
              y2="15"
              stroke="currentColor"
              strokeWidth="1.2"
              transform={`rotate(${deg} 200 200)`}
            />
          ))}
        </svg>

        <svg
          className="absolute size-[500px] text-cyan-400/20 animate-[spin_42s_linear_infinite_reverse]"
          viewBox="0 0 300 300"
          fill="none"
        >
          <circle
            cx="150"
            cy="150"
            r="142"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="14 8"
          />
          <circle cx="150" cy="150" r="122" stroke="currentColor" strokeWidth="0.7" />
          <line x1="150" y1="4" x2="150" y2="20" stroke="currentColor" strokeWidth="1.5" />
          <line x1="150" y1="280" x2="150" y2="296" stroke="currentColor" strokeWidth="1.5" />
          <line x1="4" y1="150" x2="20" y2="150" stroke="currentColor" strokeWidth="1.5" />
          <line x1="280" y1="150" x2="296" y2="150" stroke="currentColor" strokeWidth="1.5" />
        </svg>

        {/* Slow Sweeping Tactical Radar Line */}
        <div className="absolute size-[520px] rounded-full overflow-hidden animate-[spin_9s_linear_infinite]">
          <div className="w-1/2 h-1/2 ml-auto bg-[conic-gradient(from_0deg,transparent_0deg,transparent_280deg,rgba(37,99,235,0.35)_360deg)] origin-bottom-left" />
        </div>

        {/* The PP Logo 2 - Crisp Transparent Emblem */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          <div className="relative">
            <div className="absolute -inset-6 rounded-full bg-gradient-to-tr from-blue-600/30 via-amber-500/20 to-blue-500/30 blur-2xl opacity-80 animate-pulse" />
            <img
              src="/pp-logo-2.webp"
              alt="Puducherry Police"
              className="relative w-80 sm:w-96 md:w-[440px] max-w-[85vw] object-contain opacity-45 drop-shadow-[0_0_40px_rgba(37,99,235,0.6)] transition-opacity duration-500 hover:opacity-60"
            />
          </div>

          {/* Professional Status Ribbon */}
          <div className="mt-5 flex items-center gap-2.5 rounded-full border border-blue-500/40 bg-navy-950/90 px-4 py-1.5 backdrop-blur-md shadow-[0_0_20px_rgba(37,99,235,0.4)]">
            <span className="size-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="font-mono text-[11px] font-semibold tracking-wider text-blue-200 uppercase">
              PUDUCHERRY POLICE · INTELLIGENCE COMMAND
            </span>
          </div>
        </div>
      </div>

      {/* Subtle Vertical Scanning Line */}
      <div className="absolute inset-x-0 h-32 bg-gradient-to-b from-transparent via-blue-500/10 to-transparent animate-[scan_8s_ease-in-out_infinite]" />

      {/* Corner Telemetry Readouts */}
      <div className="hidden lg:flex absolute top-6 left-8 flex-col gap-1 text-[11px] font-mono text-steel-400 border-l-2 border-blue-500 pl-3">
        <span className="text-blue-300 font-bold tracking-wider flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-blue-400 animate-pulse" />
          COMMAND OPERATIONS CENTER
        </span>
        <span className="text-steel-400">PUDUCHERRY TALUK JURISDICTION</span>
        <span className="text-steel-500">SECTOR COORD: 11.9416° N / 79.8083° E</span>
      </div>

      <div className="hidden lg:flex absolute top-6 right-8 flex-col items-end gap-1 text-[11px] font-mono text-steel-400 border-r-2 border-amber-500 pr-3">
        <span className="text-amber-400 font-bold tracking-wider flex items-center gap-1.5">
          LIVE SYSTEM STATUS
          <span className="size-1.5 rounded-full bg-amber-400 animate-ping" />
        </span>
        <span className="text-steel-200 font-semibold">{time || '00:00:00'} IST</span>
        <span className="text-steel-500">ANALYTICS &amp; FORECAST v2.5</span>
      </div>
    </div>
  )
}
