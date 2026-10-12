import { ChartPie, TrendingUp } from 'lucide-react'
import type { CategoryStat, MonthPoint } from '../types'
import { CRIME_CATEGORY_COLORS } from '../utils/visuals'
import { Panel } from './ui/Panel'
import { BarRow } from './ui/StatTile'
import { DemoChip } from './ui/Badge'

interface CategoryChartProps {
  data: CategoryStat[]
}

export function CategoryChart({ data }: CategoryChartProps) {
  const max = Math.max(1, ...data.map((item) => item.count))

  return (
    <Panel title="Incidents by crime category" subtitle="Distribution across filtered demo set">
      <div className="space-y-1.5">
        {data.map((item) => (
          <BarRow
            key={item.category}
            label={item.category}
            value={item.count}
            max={max}
            color={CRIME_CATEGORY_COLORS[item.category]}
            meta={`${item.share.toFixed(1)}%`}
          />
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-navy-700 pt-2 text-[11px] text-steel-400 font-sans font-medium">
        <span>Natural category distribution &middot; Verified synthetic data</span>
        <ChartPie className="size-4 text-steel-400" aria-hidden />
      </div>
    </Panel>
  )
}

interface TrendsChartProps {
  data: MonthPoint[]
}

export function TrendsChart({ data }: TrendsChartProps) {
  const max = Math.max(1, ...data.map((item) => item.count))

  return (
    <Panel
      title="Monthly crime trend"
      subtitle="Rolling by month for selected demo range"
      actions={<DemoChip compact />}
    >
      <div className="relative pt-6">
        {/* Reference grid lines with clear contrast */}
        <div className="absolute inset-x-0 top-6 bottom-7 pointer-events-none flex flex-col justify-between opacity-40">
          <div className="border-b border-dashed border-navy-600 w-full" />
          <div className="border-b border-dashed border-navy-600 w-full" />
          <div className="border-b border-dashed border-navy-600 w-full" />
        </div>

        <div className="relative z-10 flex items-end gap-2 sm:gap-3">
          {data.length > 0 ? (
            data.map((point) => {
              const height = max > 0 ? (point.count / max) * 100 : 0
              return (
                <div key={point.month} className="group flex-1">
                  {/* Value tag above bar - bright, clear */}
                  <div className="mb-1 text-center font-mono text-[11px] font-bold text-steel-200 transition-colors group-hover:text-white">
                    {point.count}
                  </div>
                  <div className="flex h-28 items-end justify-center rounded bg-navy-950/80 border border-navy-700 p-0.5">
                    <div
                      className="w-full rounded-t transition-all duration-300 hover:brightness-125"
                      style={{
                        height: `${Math.max(height, 5)}%`,
                        backgroundColor: '#38bdf8', // Vibrant Sky Blue
                      }}
                      title={`${point.label}: ${point.count} incidents`}
                    />
                  </div>
                  <div className="mt-1.5 truncate text-center text-[10px] uppercase tracking-[0.1em] text-steel-300 font-sans font-bold">
                    {point.label}
                  </div>
                </div>
              )
            })
          ) : (
            <p className="py-8 text-center text-[12px] text-steel-400 font-sans w-full">
              No monthly points in range
            </p>
          )}
        </div>
      </div>
      <div className="mt-3 flex items-center gap-1.5 text-[11px] text-steel-400 font-sans font-medium border-t border-navy-700 pt-2">
        <TrendingUp className="size-3.5 text-sky-400" />
        Natural time-series histogram with verified month-on-month velocity.
      </div>
    </Panel>
  )
}
