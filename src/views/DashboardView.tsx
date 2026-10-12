import { CdeHeroSection } from '../components/CdeHeroSection'
import { StatisticsPanel } from '../components/StatisticsPanel'
import { MostWantedSection } from '../components/MostWantedSection'
import type { AppView, DashboardStats, RiskZone } from '../types'

interface DashboardViewProps {
  stats: DashboardStats
  zones: RiskZone[]
  onNavigate?: (view: AppView) => void
  onOpenReportCrime?: () => void
}

export function DashboardView({
  stats,
  zones,
  onNavigate = () => {},
  onOpenReportCrime,
}: DashboardViewProps) {
  return (
    <div className="flex flex-col gap-5 bg-transparent p-3 pb-8 xl:p-5 font-sans">
      {/* FBI Crime Data Explorer Hero & Trends section based on bk image.png */}
      <CdeHeroSection stats={stats} onNavigate={onNavigate} onOpenReportCrime={onOpenReportCrime} />

      {/* Operational Situation Overview & Live Metrics */}
      <StatisticsPanel stats={stats} zones={zones} />

      {/* Puducherry Police Most Wanted Persons Registry */}
      <MostWantedSection />
    </div>
  )
}
