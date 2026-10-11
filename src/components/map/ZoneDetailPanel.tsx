import { X } from 'lucide-react'
import type { Recommendation, RiskZone } from '../../types'
import { RecommendationCard } from '../RecommendationCard'
import { RiskBreakdown } from '../RiskBreakdown'
import { DemoChip, TrendIndicator } from '../ui/Badge'

interface ZoneDetailPanelProps {
  zone: RiskZone
  recommendation: Recommendation | null
  onClose: () => void
  onFocusArea: (area: string) => void
}

/**
 * Selected-zone intelligence: explainable score + operational recommendation.
 * Desktop docks it to the right of the map, mobile stacks it under the map.
 */
export function ZoneDetailPanel({
  zone,
  recommendation,
  onClose,
  onFocusArea,
}: ZoneDetailPanelProps) {
  return (
    <aside
      className="pointer-events-auto scroll-thin absolute inset-x-2 bottom-2 z-[1200] max-h-[58vh] overflow-y-auto rounded-xl border xl:inset-x-auto xl:bottom-3 xl:right-3 xl:top-3 xl:max-h-none xl:w-[360px] font-serif transition-all"
      style={{
        backgroundColor: 'var(--card-bg)',
        borderColor: 'var(--card-border)',
        boxShadow: 'var(--card-shadow)',
        color: 'var(--card-text-body)',
      }}
      aria-label={`Risk analysis for ${zone.area}`}
    >
      <header
        className="sticky top-0 z-10 flex items-start justify-between gap-2 border-b px-4 py-3 backdrop-blur font-serif transition-colors"
        style={{
          backgroundColor: 'var(--card-bg)',
          borderColor: 'var(--card-header-border)',
        }}
      >
        <div className="min-w-0">
          <p
            className="text-[10px] font-bold uppercase tracking-[0.14em] font-cyber transition-colors"
            style={{ color: 'var(--card-text-title)' }}
          >
            Zone analysis · {zone.id}
          </p>
          <h2
            className="truncate text-[15px] font-bold font-cyber transition-colors"
            style={{ color: 'var(--card-text-title)' }}
          >
            {zone.area}
          </h2>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <TrendIndicator trend={zone.trend} percent={zone.trendPercent} />
            <span
              className="text-[11px] font-serif transition-colors"
              style={{ color: 'var(--card-text-muted)' }}
            >
              {zone.crimeCount} incidents · {zone.dominantCrime}
            </span>
            <DemoChip compact />
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close zone analysis"
          className="shrink-0 rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
        >
          <X className="size-4" />
        </button>
      </header>

      <div className="flex flex-col gap-3 p-3 font-serif">
        <RiskBreakdown zone={zone} title={`Why is ${zone.area} high risk?`} />

        {recommendation ? <RecommendationCard recommendation={recommendation} /> : null}

        <div className="grid grid-cols-2 gap-2 text-[11px] font-serif">
          <div className="rounded-lg border border-slate-200 bg-slate-50/80 px-2.5 py-2 shadow-xs">
            <p className="font-bold uppercase tracking-[0.12em] text-slate-500 text-[10px]">Peak time</p>
            <p className="mt-0.5 text-[12px] font-bold text-slate-900">{zone.peakWindow}</p>
            <p className="text-slate-500">{zone.peakShare}% of incidents</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50/80 px-2.5 py-2 shadow-xs">
            <p className="font-bold uppercase tracking-[0.12em] text-slate-500 text-[10px]">Repeat spots</p>
            <p className="mt-0.5 text-[12px] font-bold text-slate-900">{zone.repeatShare}%</p>
            <p className="text-slate-500">within 250 m</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50/80 px-2.5 py-2 shadow-xs">
            <p className="font-bold uppercase tracking-[0.12em] text-slate-500 text-[10px]">Previous window</p>
            <p className="mt-0.5 text-[12px] font-bold text-slate-900">
              {zone.previousCount} incidents
            </p>
            <p className="text-slate-500">now {zone.crimeCount}</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50/80 px-2.5 py-2 shadow-xs">
            <p className="font-bold uppercase tracking-[0.12em] text-slate-500 text-[10px]">Nearby activity</p>
            <p className="mt-0.5 text-[12px] font-bold text-slate-900">
              {zone.nearbyCount} incidents
            </p>
            <p className="text-slate-500">within 3 km</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onFocusArea(zone.area)}
          className="rounded-lg border border-blue-500/60 bg-blue-600 px-3 py-2 text-[11px] font-semibold text-white hover:bg-blue-500"
        >
          Focus map on {zone.area}
        </button>
      </div>
    </aside>
  )
}
