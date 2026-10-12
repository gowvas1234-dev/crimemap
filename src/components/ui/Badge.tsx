import type { CrimeCategory, IncidentStatus, RiskLevel, TrendDirection } from '../../types'
import { CRIME_CATEGORY_COLORS, RISK_LEVEL_COLORS, STATUS_COLORS, riskLevelClass, trendGlyph } from '../../utils/visuals'

const BASE = 'inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.06em] font-serif shadow-2xs'

export function RiskBadge({ level, className = '' }: { level: RiskLevel; className?: string }) {
  return <span className={`${BASE} ${riskLevelClass(level)} ${className}`}>{level}</span>
}

export function CategoryBadge({ category }: { category: CrimeCategory }) {
  const color = CRIME_CATEGORY_COLORS[category]
  return (
    <span
      className={BASE}
      style={{ color, borderColor: `${color}40`, backgroundColor: `${color}12` }}
    >
      {category}
    </span>
  )
}

export function StatusBadge({ status }: { status: IncidentStatus | string }) {
  const color = STATUS_COLORS[status] ?? '#64748b'
  return (
    <span
      className={BASE}
      style={{ color, borderColor: `${color}40`, backgroundColor: `${color}12` }}
    >
      {status}
    </span>
  )
}

export function TrendIndicator({
  trend,
  percent,
  showGlyph = true,
}: {
  trend: TrendDirection
  percent?: number
  showGlyph?: boolean
}) {
  const color = STATUS_COLORS[trend] ?? '#64748b'
  return (
    <span className="inline-flex items-center gap-1 text-[11px] font-bold font-serif" style={{ color }}>
      {showGlyph ? <span aria-hidden className="text-[10px]">{trendGlyph(trend)}</span> : null}
      <span>{trend}</span>
      {typeof percent === 'number' ? (
        <span className="text-steel-200 font-mono text-[10px] font-bold">
          ({percent > 0 ? '+' : ''}
          {percent}%)
        </span>
      ) : null}
    </span>
  )
}

export function DemoChip({ compact = false }: { compact?: boolean }) {
  return (
    <span
      className="inline-flex items-center gap-1 rounded border border-amber-400/50 bg-amber-500/20 px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.14em] text-amber-300 font-cyber shadow-2xs"
      title="Synthetic sample data - not real crime information"
    >
      DEMO{compact ? '' : ' DATA'}
    </span>
  )
}

export function RiskLevelDot({ level }: { level: RiskLevel }) {
  return (
    <span
      className="inline-block h-2.5 w-2.5 rounded-full"
      style={{ backgroundColor: RISK_LEVEL_COLORS[level] }}
      aria-hidden
    />
  )
}
