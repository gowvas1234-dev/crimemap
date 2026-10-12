import { CategoryChart, TrendsChart } from '../components/Charts'
import { Panel } from '../components/ui/Panel'
import { DemoChip } from '../components/ui/Badge'
import type { AreaStat, CategoryStat, DashboardStats, MonthPoint, RiskLevel } from '../types'
import { RISK_LEVEL_COLORS } from '../utils/visuals'

interface TrendsViewProps {
  stats: DashboardStats
  monthly: MonthPoint[]
  categoryStats: CategoryStat[]
  areaStats: AreaStat[]
  statusStats: { status: string; count: number }[]
  zoneRiskCounts: Record<string, number>
}

export function TrendsView({ monthly, categoryStats, areaStats, statusStats, zoneRiskCounts }: TrendsViewProps) {
  const maxArea = Math.max(1, ...areaStats.map((item) => item.count))
  const maxStatus = Math.max(1, ...statusStats.map((item) => item.count))
  const maxZoneRisk = Math.max(1, ...Object.values(zoneRiskCounts))

  return (
    <div className="flex flex-col gap-3 p-3 pb-6 xl:p-4">
      <div className="grid gap-3 lg:grid-cols-2 lg:gap-4">
        <TrendsChart data={monthly} />
        <CategoryChart data={categoryStats} />
      </div>
      <div className="grid gap-3 lg:grid-cols-3 lg:gap-4 font-sans">
        <Panel title="Top areas" subtitle="Filtered demo incidents by locality">
          <div className="space-y-2">
            {areaStats.map((area) => {
              const width = (area.count / maxArea) * 100
              return (
                <div key={area.area} className="space-y-1">
                  <div className="flex items-center justify-between gap-3 text-[12px]">
                    <span className="truncate text-steel-200 font-semibold">{area.area}</span>
                    <span className="font-mono text-[11px] text-white font-bold">{area.count}</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-navy-950 border border-navy-700">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{ width: `${Math.max(width, 3)}%`, backgroundColor: '#38bdf8' }}
                    />
                  </div>
                </div>
              )
            })}
            {areaStats.length === 0 ? <p className="text-[11px] text-steel-400 font-medium">No areas found</p> : null}
          </div>
        </Panel>

        <Panel title="Incident status" subtitle="Resolution mix for filtered demo set">
          <div className="space-y-2">
            {statusStats.map((item) => {
              const width = (item.count / maxStatus) * 100
              const statusColor =
                item.status === 'Closed'
                  ? '#10b981' // Bright Emerald
                  : item.status === 'Under Investigation'
                  ? '#f59e0b' // Amber
                  : '#38bdf8' // Sky Blue
              return (
                <div key={item.status} className="space-y-1">
                  <div className="flex items-center justify-between gap-3 text-[12px]">
                    <span className="text-steel-200 font-semibold flex items-center gap-1.5">
                      <span className="size-2 rounded-full" style={{ backgroundColor: statusColor }} />
                      {item.status}
                    </span>
                    <span className="font-mono text-[11px] text-white font-bold">{item.count}</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-navy-950 border border-navy-700">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{ width: `${Math.max(width, 3)}%`, backgroundColor: statusColor }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </Panel>

        <Panel title="Risk zone profile" subtitle="Detected zones by risk level">
          <div className="space-y-2">
            {Object.entries(zoneRiskCounts).map(([level, count]) => {
              const width = (count / maxZoneRisk) * 100
              const color = RISK_LEVEL_COLORS[level as RiskLevel] ?? '#64748b'
              return (
                <div key={level} className="space-y-1">
                  <div className="flex items-center justify-between gap-3 text-[12px]">
                    <span className="inline-flex items-center gap-1.5 text-steel-200 font-semibold">
                      <span className="size-2.5 rounded-full" style={{ backgroundColor: color }} />
                      {level}
                    </span>
                    <span className="font-mono text-[11px] text-white font-bold">{count} zones</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-navy-950 border border-navy-700">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{ width: `${Math.max(width, 3)}%`, backgroundColor: color }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-steel-400 font-medium border-t border-navy-700 pt-2">
            <span>Dynamic Risk Classifier</span>
            <DemoChip compact />
          </div>
        </Panel>
      </div>
    </div>
  )
}

