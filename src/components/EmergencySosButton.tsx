import { PhoneCall, Radio } from 'lucide-react'

interface EmergencySosButtonProps {
  onClick: () => void
  compact?: boolean
  className?: string
}

/**
 * High-visibility Emergency SOS App connection button.
 * Triggers connection with the Pan-India 112 Emergency Response Support System (ERSS).
 */
export function EmergencySosButton({
  onClick,
  compact = false,
  className = '',
}: EmergencySosButtonProps) {
  if (compact) {
    return (
      <button
        type="button"
        onClick={onClick}
        title="Connect with Emergency SOS App (112 India)"
        className={`inline-flex items-center gap-1.5 rounded-lg border-2 border-red-400 bg-gradient-to-r from-red-600 to-rose-700 px-2.5 py-1 text-[11px] font-black text-white shadow-[0_0_12px_rgba(239,68,68,0.5)] hover:shadow-[0_0_20px_rgba(239,68,68,0.8)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer ${className}`}
      >
        <span className="relative flex size-2 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-300 opacity-80" />
          <span className="relative inline-flex size-2 rounded-full bg-amber-400" />
        </span>
        <PhoneCall className="size-3 text-white" />
        <span className="tracking-wide uppercase font-mono">112 SOS</span>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative inline-flex items-center justify-between gap-2.5 rounded-lg border-2 border-rose-400/90 bg-gradient-to-r from-rose-700 via-red-600 to-rose-800 px-3.5 py-2 text-[12px] font-black text-white shadow-[0_0_16px_rgba(225,29,72,0.45)] hover:shadow-[0_0_24px_rgba(225,29,72,0.75)] hover:border-amber-300 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer ${className}`}
    >
      <div className="flex items-center gap-2">
        <span className="relative flex size-2.5 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-300 opacity-90" />
          <span className="relative inline-flex size-2.5 rounded-full bg-amber-400" />
        </span>
        <Radio className="size-4 text-amber-300 animate-pulse" />
        <span className="uppercase tracking-wider">Emergency SOS App</span>
      </div>
      <span className="rounded bg-black/40 border border-white/30 px-1.5 py-0.5 font-mono text-[10px] font-black text-amber-300">
        112 ERSS
      </span>
    </button>
  )
}
