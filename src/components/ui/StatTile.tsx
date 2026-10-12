import type { ReactNode } from 'react'

interface StatTileProps {
  label: string
  value: ReactNode
  hint?: string
  color?: string
  icon?: ReactNode
}

export function StatTile({ label, value, hint, color = '#38bdf8', icon }: StatTileProps) {
  return (
    <div
      className="rounded-xl border px-3.5 py-3 transition-all duration-200"
      style={{
        backgroundColor: 'var(--card-bg)',
        borderColor: 'var(--card-border)',
        boxShadow: 'var(--card-shadow)',
      }}
    >
      <div className="flex items-center justify-between gap-2">
        <span
          className="text-[12px] font-bold uppercase tracking-[0.1em] font-cyber transition-colors"
          style={{ color: 'var(--card-text-title)' }}
        >
          {label}
        </span>
        {icon ? (
          <span style={{ color: 'var(--card-text-muted)' }}>{icon}</span>
        ) : null}
      </div>
      <div className="mt-1.5 text-3xl font-extrabold leading-none font-mono" style={{ color }}>
        {value}
      </div>
      {hint ? (
        <div
          className="mt-1 text-[11px] leading-tight font-semibold transition-colors"
          style={{ color: 'var(--card-text-muted)' }}
        >
          {hint}
        </div>
      ) : null}
    </div>
  )
}

interface BarRowProps {
  label: string
  value: number
  max: number
  color: string
  meta?: string
}

export function BarRow({ label, value, max, color, meta }: BarRowProps) {
  const width = max > 0 ? Math.max((value / max) * 100, value > 0 ? 3 : 0) : 0
  return (
    <div className="py-2">
      <div className="flex items-baseline justify-between gap-3 text-[13px]">
        <span className="truncate text-steel-100 font-bold">{label}</span>
        <span className="shrink-0 font-bold text-white font-mono">
          {value}
          {meta ? <span className="ml-1 text-steel-300 font-medium font-sans text-[12px]">({meta})</span> : null}
        </span>
      </div>
      <div className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-navy-950 border border-navy-700">
        <div
          className="h-full rounded-full transition-[width] duration-300"
          style={{ width: `${width}%`, backgroundColor: color }}
        />
      </div>
    </div>
  )
}
