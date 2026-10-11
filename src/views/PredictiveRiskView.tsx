import { ShieldAlert, TrendingUp } from 'lucide-react'
import { DemoChip, RiskBadge, TrendIndicator } from '../components/ui/Badge'
import { Panel } from '../components/ui/Panel'
import type { RiskForecastResponse } from '../types'
import { formatPercent } from '../utils/format'
import { RISK_LEVEL_COLORS } from '../utils/visuals'

interface PredictiveRiskViewProps {
  forecast: RiskForecastResponse
  onFocusArea: (area: string) => void
}

/** Risk Forecast view - deterministic forward view using current zone dynamics. */
export function PredictiveRiskView({ forecast, onFocusArea }: PredictiveRiskViewProps) {
  const predictions = [...forecast.predictions].sort(
    (a, b) => b.risk_score - a.risk_score,
  )
  const topArea = predictions[0]?.area ?? null

  return (
    <div className="scroll-thin flex h-full flex-col gap-3 overflow-y-auto bg-transparent p-3 pb-6 xl:p-4">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h1
            className="text-[18px] font-bold leading-tight xl:text-[22px] font-cyber transition-colors"
            style={{ color: 'var(--text-main)' }}
          >
            Risk Forecast &amp; Trend Dynamics
          </h1>
          <p
            className="mt-1 max-w-3xl text-[12px] leading-relaxed transition-colors font-serif"
            style={{ color: 'var(--text-muted)' }}
          >
            Deterministic, explainable outlook derived from current risk zones (trend, emerging
            status, peak activity). This is a situational operational forecast based on empirical incident density.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <DemoChip />
          {topArea ? (
            <button
              type="button"
              onClick={() => onFocusArea(topArea)}
              className="rounded-lg border border-gray-500 bg-slate-900 px-3 py-2 text-[11px] font-semibold text-white shadow-xs transition-colors hover:bg-black"
            >
              View top zone on map
            </button>
          ) : null}
        </div>
      </header>

      <Panel title="Forecast summary" subtitle="By risk zone (next operational outlook)">
        {predictions.length === 0 ? (
          <p className="text-[12px] text-slate-500">No forecastable zones for current filters.</p>
        ) : (
          <div className="divide-y divide-gray-200 font-serif">
            {predictions.map((prediction) => {
              const riskColor = RISK_LEVEL_COLORS[prediction.risk_level] ?? '#64748b'
              return (
                <div key={prediction.zoneId} className="flex flex-col gap-2 py-3.5 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <span
                      className="h-10 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: riskColor }}
                      aria-hidden
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="truncate text-[15px] font-bold text-slate-900 font-serif">
                          {prediction.area}
                        </span>
                        <RiskBadge level={prediction.risk_level} />
                      </div>
                      <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-slate-600 font-serif font-medium">
                        <span>Zone: {prediction.zoneId}</span>
                        <span>&middot;</span>
                        <span>Confidence: {formatPercent(prediction.confidence)}</span>
                        <span>&middot;</span>
                        <span>Model: {prediction.modelVersion}</span>
                      </div>
                    </div>
                    <div className="shrink-0 text-right">
                      <span
                        className="text-[20px] font-bold font-serif"
                        style={{ color: riskColor }}
                      >
                        {prediction.risk_score}
                        <span className="text-[12px] text-slate-400 font-normal"> / 100</span>
                      </span>
                      <div className="mt-0.5 flex justify-end">
                        <TrendIndicator trend="Stable" showGlyph={false} />
                      </div>
                    </div>
                  </div>

                  {/* Natural progress bar showing risk intensity */}
                  <div className="ml-4.5 h-1.5 w-[calc(100%-1.125rem)] overflow-hidden rounded-full bg-slate-100 border border-slate-200/60">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.max(prediction.risk_score, 4)}%`,
                        backgroundColor: riskColor,
                      }}
                    />
                  </div>

                  {prediction.contributing_factors.length > 0 ? (
                    <ul className="ml-4.5 flex flex-wrap gap-1.5 text-[11px] text-slate-700 font-serif">
                      {prediction.contributing_factors.map((factor) => (
                        <li key={factor} className="rounded-md border border-gray-300 bg-slate-50 px-2 py-0.5 text-[10px] font-medium text-slate-700 shadow-2xs">
                          {factor}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              )
            })}
          </div>
        )}
      </Panel>

      <Panel title="Methodology" subtitle="Deterministic & explainable police analytics">
        <ul className="space-y-2 text-[12px] leading-relaxed text-slate-700 font-serif">
          <li className="flex items-start gap-2">
            <ShieldAlert className="mt-0.5 size-4 text-amber-700 shrink-0" />
            <span>Deterministic algorithmic classification derived from actual incident frequency, temporal density, and geographic proximity.</span>
          </li>
          <li className="flex items-start gap-2">
            <TrendingUp className="mt-0.5 size-4 text-[#2c5282] shrink-0" />
            <span>Trend persistence applied conservatively; zones marked emerging receive a calibrated status watch indicator.</span>
          </li>
          <li className="flex items-start gap-2">
            <ShieldAlert className="mt-0.5 size-4 text-slate-600 shrink-0" />
            <span>Confidence metrics represent empirical spatial data coverage across the active filtering window.</span>
          </li>
        </ul>
      </Panel>
    </div>
  )
}
