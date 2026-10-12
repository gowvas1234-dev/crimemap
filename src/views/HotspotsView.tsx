import { Flame, Radar, X, Zap } from 'lucide-react'
import { DemoChip, RiskBadge, TrendIndicator } from '../components/ui/Badge'
import { Panel } from '../components/ui/Panel'
import { RiskBreakdown } from '../components/RiskBreakdown'
import { RecommendationCard } from '../components/RecommendationCard'
import type { Recommendation, RiskZone } from '../types'

interface HotspotsViewProps {
  zones: RiskZone[]
  recommendations: Recommendation[]
  selectedZone: RiskZone | null
  onFocusArea: (area: string) => void
  onSelectZone: (zone: RiskZone) => void
  onCloseDetails: () => void
}

/** Risk zones view - explains every zone's 0-100 score with full breakdowns. */
export function HotspotsView({
  zones,
  recommendations,
  selectedZone,
  onFocusArea,
  onSelectZone,
  onCloseDetails,
}: HotspotsViewProps) {
  const sorted = [...zones].sort((a, b) => b.riskScore - a.riskScore)
  const selectedRecommendation = selectedZone
    ? (recommendations.find(
        (entry) => entry.zoneId === selectedZone.id || entry.area === selectedZone.area,
      ) ?? null)
    : null

  return (
    <div className="scroll-thin flex h-full flex-col gap-3 overflow-y-auto bg-transparent p-3 pb-6 xl:p-4">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h1
            className="text-[18px] font-bold leading-tight xl:text-[22px] font-cyber transition-colors"
            style={{ color: 'var(--text-main)' }}
          >
            Dynamic Risk Zones &amp; Localities
          </h1>
          <p
            className="mt-1 max-w-3xl text-[13px] leading-relaxed transition-colors font-serif"
            style={{ color: 'var(--text-muted)' }}
          >
            Deterministic, explainable risk zones derived from incident frequency, trend, severity,
            repeat activity, time-of-day and proximity. Scores are reproducible and accompanied by their breakdown.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <DemoChip />
          <span className="rounded-lg border border-navy-700 bg-navy-800 px-3 py-2 text-[12px] font-bold text-steel-200 shadow-2xs font-sans">
            {sorted.length} active zones
          </span>
        </div>
      </header>

      {sorted.length === 0 ? (
        <Panel
          title="No risk zones detected"
          subtitle="Adjust filters to include more incidents or widen the date range"
        >
          <p className="text-[12px] text-steel-500">
            The engine groups recent incidents by locality and computes 0-100 scores only when
            enough activity exists in the recent window.
          </p>
        </Panel>
      ) : (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {sorted.map((zone) => (
            <article
              key={zone.id}
              className="flex flex-col gap-3 rounded-xl border p-3.5 font-serif transition-all duration-200"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--card-border)',
                boxShadow: 'var(--card-shadow)',
                color: 'var(--card-text-body)',
              }}
            >
              <header className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p
                    className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] font-cyber transition-colors"
                    style={{ color: 'var(--card-text-title)' }}
                  >
                    {zone.isEmerging ? (
                      <>
                        <Zap className="size-3.5 text-amber-500" aria-hidden /> Emerging hotspot
                      </>
                    ) : (
                      <>
                        <Flame className="size-3.5 text-red-500" aria-hidden /> Active risk zone
                      </>
                    )}
                  </p>
                  <h2
                    className="truncate text-[18px] font-bold font-cyber transition-colors"
                    style={{ color: 'var(--card-text-title)' }}
                  >
                    {zone.area}
                  </h2>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <RiskBadge level={zone.riskLevel} />
                    <TrendIndicator trend={zone.trend} percent={zone.trendPercent} />
                    <span
                      className="text-[12px] font-mono font-bold transition-colors"
                      style={{ color: 'var(--card-text-muted)' }}
                    >
                      {zone.id}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onSelectZone(zone)
                    onFocusArea(zone.area)
                  }}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-gray-400 bg-slate-900 px-3 py-1.5 text-[12px] font-bold text-white shadow-xs hover:bg-black transition-colors"
                >
                  <Radar className="size-3.5" /> View on map
                </button>
              </header>

              <RiskBreakdown zone={zone} compact />

              <div
                className="grid grid-cols-2 gap-2 border-t pt-2.5 text-[12px] transition-colors"
                style={{
                  borderColor: 'var(--card-header-border)',
                  color: 'var(--card-text-muted)',
                }}
              >
                <div>
                  Peak:{' '}
                  <span
                    className="font-bold transition-colors"
                    style={{ color: 'var(--card-text-body)' }}
                  >
                    {zone.peakWindow}
                  </span>
                </div>
                <div>
                  Peak share:{' '}
                  <span
                    className="font-bold transition-colors"
                    style={{ color: 'var(--card-text-body)' }}
                  >
                    {zone.peakShare}%
                  </span>
                </div>
                <div>
                  Repeat:{' '}
                  <span
                    className="font-bold transition-colors"
                    style={{ color: 'var(--card-text-body)' }}
                  >
                    {zone.repeatShare}%
                  </span>{' '}
                  within 250 m
                </div>
                <div>
                  Nearby:{' '}
                  <span
                    className="font-bold transition-colors"
                    style={{ color: 'var(--card-text-body)' }}
                  >
                    {zone.nearbyCount}
                  </span>{' '}
                  incidents &lt; 3 km
                </div>
                <div>
                  Dominant:{' '}
                  <span
                    className="font-bold transition-colors"
                    style={{ color: 'var(--card-text-body)' }}
                  >
                    {zone.dominantCrime}
                  </span>
                </div>
                <div>
                  Radius:{' '}
                  <span
                    className="font-bold transition-colors"
                    style={{ color: 'var(--card-text-body)' }}
                  >
                    {zone.radiusMeters} m
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {selectedZone ? (
        <Panel
          title={`Hotspot details: ${selectedZone.area}`}
          subtitle={`${selectedZone.id} · Risk score ${selectedZone.riskScore} (${selectedZone.riskLevel})`}
          actions={
            <button
              type="button"
              onClick={onCloseDetails}
              className="inline-flex items-center gap-1 rounded-lg border border-navy-600 bg-navy-800 px-2.5 py-1.5 text-[10px] font-semibold text-steel-300 hover:text-white"
            >
              <X className="size-3.5" /> Close details
            </button>
          }
        >
          <div className="flex flex-col gap-3">
            <RiskBreakdown zone={selectedZone} title={`Why is ${selectedZone.area} high risk?`} />
            {selectedRecommendation ? <RecommendationCard recommendation={selectedRecommendation} /> : null}
            <div className="grid grid-cols-2 gap-2 text-[11px] md:grid-cols-4">
              <div className="rounded-lg border border-navy-600 bg-navy-800 px-2.5 py-2">
                <p className="font-bold uppercase tracking-[0.12em] text-steel-500">Peak time</p>
                <p className="mt-0.5 text-[12px] font-semibold text-steel-100">{selectedZone.peakWindow}</p>
                <p className="text-steel-500">{selectedZone.peakShare}% of incidents</p>
              </div>
              <div className="rounded-lg border border-navy-600 bg-navy-800 px-2.5 py-2">
                <p className="font-bold uppercase tracking-[0.12em] text-steel-500">Repeat spots</p>
                <p className="mt-0.5 text-[12px] font-semibold text-steel-100">{selectedZone.repeatShare}%</p>
                <p className="text-steel-500">within 250 m</p>
              </div>
              <div className="rounded-lg border border-navy-600 bg-navy-800 px-2.5 py-2">
                <p className="font-bold uppercase tracking-[0.12em] text-steel-500">Previous window</p>
                <p className="mt-0.5 text-[12px] font-semibold text-steel-100">
                  {selectedZone.previousCount} incidents
                </p>
                <p className="text-steel-500">now {selectedZone.crimeCount}</p>
              </div>
              <div className="rounded-lg border border-navy-600 bg-navy-800 px-2.5 py-2">
                <p className="font-bold uppercase tracking-[0.12em] text-steel-500">Nearby activity</p>
                <p className="mt-0.5 text-[12px] font-semibold text-steel-100">
                  {selectedZone.nearbyCount} incidents
                </p>
                <p className="text-steel-500">within 3 km</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onFocusArea(selectedZone.area)}
              className="rounded-lg border border-blue-500/60 bg-blue-600 px-3 py-2 text-[12px] font-semibold text-white hover:bg-blue-500"
            >
              Focus map on {selectedZone.area}
            </button>
          </div>
        </Panel>
      ) : null}

      {recommendations.length > 0 ? (
        <Panel
          title="Recommended actions"
          subtitle={`${recommendations.length} actionable items derived from these zones`}
        >
          <div className="grid gap-2.5 md:grid-cols-2 xl:grid-cols-3">
            {recommendations.slice(0, 6).map((recommendation) => (
              <RecommendationCard key={recommendation.zoneId} recommendation={recommendation} compact />
            ))}
          </div>
        </Panel>
      ) : null}
    </div>
  )
}
