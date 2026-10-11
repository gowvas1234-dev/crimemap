import { CdeHeroSection } from '../components/CdeHeroSection'
import { StatisticsPanel } from '../components/StatisticsPanel'
import type { AppView, DashboardStats, RiskZone } from '../types'

interface DashboardViewProps {
  stats: DashboardStats
  zones: RiskZone[]
  onNavigate?: (view: AppView) => void
}

export function DashboardView({ stats, zones, onNavigate = () => {} }: DashboardViewProps) {
  return (
    <div className="scroll-thin flex h-full flex-col gap-5 overflow-y-auto bg-transparent p-3 pb-8 xl:p-5 font-sans">
      {/* FBI Crime Data Explorer Hero & Trends section based on bk image.png */}
      <CdeHeroSection stats={stats} onNavigate={onNavigate} />

      {/* Operational Situation Overview & Live Metrics */}
      <StatisticsPanel stats={stats} zones={zones} />
    </div>
  )
}
