import { CdeHeroSection } from '../components/CdeHeroSection'
import { StatisticsPanel } from '../components/StatisticsPanel'
import { MostWantedSection } from '../components/MostWantedSection'
import { DashboardPatrolColumn } from '../components/DashboardPatrolColumn'
import type { AppView, DashboardStats, RiskZone } from '../types'

interface DashboardViewProps {
  stats: DashboardStats
  zones: RiskZone[]
  onNavigate?: (view: AppView) => void
  onOpenReportCrime?: () => void
  onOpenEmergencySos?: () => void
}

export function DashboardView({
  stats,
  zones,
  onNavigate = () => {},
  onOpenReportCrime,
  onOpenEmergencySos,
}: DashboardViewProps) {
  return (
    <div className="flex flex-col gap-5 bg-transparent p-3 pb-8 xl:p-5 font-sans">
      {/* FBI Crime Data Explorer Hero & Trends section */}
      <CdeHeroSection
        stats={stats}
        onNavigate={onNavigate}
        onOpenReportCrime={onOpenReportCrime}
        onOpenEmergencySos={onOpenEmergencySos}
      />

      {/* Main Dashboard Command Grid: Situation Overview + Separate Column for Patrol Moving & Active */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left Column (7 cols on lg, 8 cols on xl): Operational Situation Overview & Live Metrics */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-4">
          <StatisticsPanel stats={stats} zones={zones} />
        </div>

        {/* Right Column (5 cols on lg, 4 cols on xl): Dedicated Separate Column for Patrol Moving and Active */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col">
          <DashboardPatrolColumn
            onNavigate={onNavigate}
            onOpenEmergencySos={onOpenEmergencySos}
          />
        </div>
      </div>

      {/* Puducherry Police Most Wanted Persons Registry */}
      <MostWantedSection />
    </div>
  )
}
