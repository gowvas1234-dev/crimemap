import { Siren } from 'lucide-react'

interface CriticalAlertButtonProps {
  onClick: () => void
  compact?: boolean
}

/**
 * High-visibility Alert Message Button placed at the very top of the app.
 * Provides a 1-tap trigger for critical situations to immediately broadcast to all CPOs.
 */
export function CriticalAlertButton({ onClick, compact = false }: CriticalAlertButtonProps) {
  if (compact) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label="Tap for Critical Situation Alert Message"
        title="Tap to dispatch Critical Situation Alert to all CPOs"
        className="group relative inline-flex items-center gap-1.5 rounded-lg border-2 border-amber-400 bg-gradient-to-r from-[#8b1818] via-[#a82525] to-[#8b1818] px-2.5 py-1 text-[11px] font-black text-white shadow-[0_0_15px_rgba(245,158,11,0.6)] hover:shadow-[0_0_22px_rgba(239,68,68,0.9)] hover:border-amber-300 hover:scale-105 active:scale-95 transition-all cursor-pointer select-none"
      >
        <span className="relative flex size-2 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-300 opacity-80" />
          <span className="relative inline-flex size-2 rounded-full bg-amber-400" />
        </span>
        <Siren className="size-3.5 text-amber-300 animate-pulse shrink-0" aria-hidden />
        <span className="uppercase tracking-wider">Alert Msg</span>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Tap for Critical Situation Alert Message"
      title="Tap to dispatch Critical Situation Alert to all CPOs"
      className="group relative inline-flex items-center gap-2 rounded-xl border-2 border-amber-400 bg-gradient-to-r from-[#7f1d1d] via-[#991b1b] to-[#7f1d1d] px-3.5 py-1.5 text-[12px] sm:text-[13px] font-black text-white shadow-[0_0_20px_rgba(245,158,11,0.6)] hover:shadow-[0_0_30px_rgba(245,158,11,0.9)] hover:border-white hover:scale-105 active:scale-95 transition-all cursor-pointer select-none"
    >
      {/* Flashing Beacon Dot */}
      <span className="relative flex size-2.5 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-300 opacity-90" />
        <span className="relative inline-flex size-2.5 rounded-full bg-amber-400" />
      </span>

      {/* Emergency Siren Symbol */}
      <Siren className="size-4 text-amber-300 group-hover:text-white transition-colors animate-pulse shrink-0" aria-hidden />

      {/* Main Label */}
      <span className="tracking-wide text-white uppercase font-extrabold drop-shadow-sm">
        Alert Message
      </span>

      {/* High-visibility Critical Situation badge */}
      <span className="inline-flex items-center rounded-md bg-amber-400 px-1.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-slate-950 shadow-xs">
        Critical Situation
      </span>
    </button>
  )
}
