import { Activity, Flame, Gauge, ShieldAlert, TrendingUp, Zap } from 'lucide-react'
import type { DashboardStats, RiskZone } from '../types'
import { formatNumber, formatPercent } from '../utils/format'
import { CRIME_CATEGORY_COLORS, RISK_LEVEL_COLORS } from '../utils/visuals'
import { DemoChip, RiskBadge, TrendIndicator } from './ui/Badge'
import { Panel } from './ui/Panel'
import { StatTile } from './ui/StatTile'

interface StatisticsPanelProps {
  stats: DashboardStats
  zones: RiskZone[]
  className?: string
}

const TREND_COLORS: Record<DashboardStats['trendDirection'], string> = {
  Rising: '#991b1b', // Natural Brick Crimson
  Stable: '#b45309', // Natural Warm Ochre
  Declining: '#2d6a4f', // Natural Forest Sage
}

/** Right-hand information panel with the headline intelligence indicators. */
export function StatisticsPanel({ stats, zones, className = '' }: StatisticsPanelProps) {
  const trendColor = TREND_COLORS[stats.trendDirection]
  const watchlist = [...zones]
    .sort((a, b) => b.riskScore - a.riskScore || b.crimeCount - a.crimeCount)
    .slice(0, 5)

  return (
    <div
      className={`scroll-thin flex flex-col gap-3.5 w-full ${className}`}
      aria-label="Situation statistics"
    >
      <div className="flex items-center justify-between gap-2">
        <h2
          className="text-[11px] font-bold uppercase tracking-[0.16em] font-cyber transition-colors"
          style={{ color: 'var(--text-muted)' }}
        >
          Situation overview
        </h2>
        <DemoChip />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
        <StatTile
          label="Total incidents"
          value={formatNumber(stats.totalIncidents)}
          hint="Matching active filters"
          color="#2c5282" // Natural Slate Navy
          icon={<Activity className="size-3.5" />}
        />
        <StatTile
          label="Active zones"
          value={stats.activeHotspots}
          hint="Flagged for patrol focus"
          color="#991b1b" // Natural Brick Crimson
          icon={<Flame className="size-3.5" />}
        />
        <StatTile
          label="Emerging zones"
          value={stats.emergingHotspots}
          hint="New or rising localities"
          color="#b45309" // Natural Warm Ochre
          icon={<Zap className="size-3.5" />}
        />
        <StatTile
          label="High-risk zones"
          value={stats.highRiskZones}
          hint="High or critical rating"
          color="#c2410c" // Natural Burnt Terracotta
          icon={<ShieldAlert className="size-3.5" />}
        />
        <StatTile
          label="Avg risk score"
          value={`${stats.averageRiskScore}/100`}
          hint="Mean across visible zones"
          color="#475569" // Natural Charcoal Slate
          icon={<Gauge className="size-3.5" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <Panel title="Crime trend" subtitle="Last 30 days vs previous 30 days">
          <div className="flex items-end justify-between gap-3">
            <div>
              <div
                className="text-3xl font-bold leading-none font-mono"
                style={{ color: trendColor }}
              >
                {formatPercent(stats.trendPercent, 1)}
              </div>
              <div className="mt-1.5">
                <TrendIndicator trend={stats.trendDirection} showGlyph={false} />
              </div>
            </div>
            <span
              className="grid size-11 shrink-0 place-items-center rounded-full"
              style={{ backgroundColor: `${trendColor}1a`, color: trendColor }}
            >
              <TrendingUp
                className={`size-5 ${stats.trendDirection === 'Declining' ? 'rotate-180' : stats.trendDirection === 'Stable' ? 'rotate-90' : ''}`}
                aria-hidden
              />
            </span>
          </div>
          <p className="mt-3 text-[11px] leading-relaxed text-slate-500 font-serif border-t border-gray-200 pt-2">
            Comparison uses synthetic demo incident timestamps inside the selected date range.
          </p>
        </Panel>

        <Panel title="Most common crime type" subtitle="Share of filtered demo incidents">
          {stats.mostCommonCategory ? (
            <>
              <div className="flex items-center justify-between gap-3">
                <span className="text-xl font-bold text-slate-900 font-serif">{stats.mostCommonCategory}</span>
                <span
                  className="h-3.5 w-3.5 rounded-full"
                  style={{ backgroundColor: CRIME_CATEGORY_COLORS[stats.mostCommonCategory] }}
                  aria-hidden
                />
              </div>
              <div className="mt-1.5 text-[12px] text-slate-600 font-serif font-medium">
                {formatNumber(stats.mostCommonCount)} incidents &middot;{' '}
                {stats.totalIncidents > 0
                  ? Math.round((stats.mostCommonCount / stats.totalIncidents) * 100)
                  : 0}
                % of all filtered records
              </div>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100 border border-slate-200/60">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${stats.totalIncidents > 0 ? (stats.mostCommonCount / stats.totalIncidents) * 100 : 0}%`,
                    backgroundColor: CRIME_CATEGORY_COLORS[stats.mostCommonCategory],
                  }}
                />
              </div>
            </>
          ) : (
            <p className="text-[11px] text-slate-500 font-serif">No incidents match the current filters.</p>
          )}
        </Panel>

        <Panel title="Zone watchlist" subtitle="Highest risk score first">
          {watchlist.length > 0 ? (
            <ul className="divide-y divide-gray-200 font-serif">
              {watchlist.map((zone) => (
                <li key={zone.id} className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
                  <span
                    className="h-8 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: RISK_LEVEL_COLORS[zone.riskLevel] }}
                    aria-hidden
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate text-[13px] font-bold text-slate-900 font-serif">
                        {zone.area}
                      </span>
                      <RiskBadge level={zone.riskLevel} />
                    </div>
                    <div className="mt-0.5 flex items-center gap-2 text-[11px] text-slate-500 font-serif">
                      <span>{zone.id}</span>
                      <span>&middot;</span>
                      <span>{zone.dominantCrime}</span>
                      <span>&middot;</span>
                      <span>{zone.crimeCount} reports</span>
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <span
                      className="font-mono text-[14px] font-bold"
                      style={{ color: RISK_LEVEL_COLORS[zone.riskLevel] }}
                    >
                      {zone.riskScore}
                    </span>
                    <div className="mt-0.5">
                      <TrendIndicator trend={zone.trend} />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[11px] text-slate-500 font-serif">No zones match the current filters.</p>
          )}
        </Panel>
      </div>

      <p className="pb-1 text-[10px] leading-relaxed text-steel-600">
        All figures derive from synthetic demo records bundled with the app. They are not
        statistics from any police department or government source.
      </p>
    </div>
  )
}
