import type {
  CrimeIncident,
  RiskZone,
  PoliceStation,
  CategoryStat,
  DashboardStats,
  CrimeFilterState,
  ChangeReport,
} from '../types'
import { CrimeTable } from '../components/CrimeTable'
import { DemoChip } from '../components/ui/Badge'
import { Panel } from '../components/ui/Panel'
import { RiskBreakdown } from '../components/RiskBreakdown'
import { formatNumber } from '../utils/format'
import { severityOf } from '../utils/severity'
import { downloadTextFile, toCsv } from '../utils/export'

interface ReportsViewProps {
  incidents: CrimeIncident[]
  zones: RiskZone[]
  changes: ChangeReport
  stations: PoliceStation[]
  stats: DashboardStats
  categoryStats: CategoryStat[]
  filters: CrimeFilterState
}

function stamp(): string {
  return new Date().toISOString().slice(0, 10)
}

function exportIncidents(incidents: CrimeIncident[]) {
  const rows = incidents.map((incident) => [
    incident.id,
    incident.occurredAt.slice(0, 10),
    incident.occurredAt.slice(11, 16),
    incident.category,
    severityOf(incident.category),
    incident.area,
    incident.status,
    incident.lat,
    incident.lng,
  ])
  downloadTextFile(
    `crimemap-incidents-${stamp()}.csv`,
    toCsv(
      ['Incident ID', 'Date', 'Time', 'Category', 'Severity', 'Locality', 'Status', 'Lat', 'Lng'],
      rows,
    ),
  )
}

function exportZones(zones: RiskZone[]) {
  const rows = zones.map((zone) => [
    zone.id,
    zone.area,
    zone.riskScore,
    zone.riskLevel,
    zone.trend,
    zone.trendPercent,
    zone.crimeCount,
    zone.previousCount,
    zone.dominantCrime,
    zone.peakWindow,
    zone.peakShare,
    zone.status,
    zone.isEmerging ? 'yes' : 'no',
  ])
  downloadTextFile(
    `crimemap-risk-zones-${stamp()}.csv`,
    toCsv(
      [
        'Zone ID',
        'Locality',
        'Risk Score',
        'Risk Level',
        'Trend',
        'Trend %',
        'Recent',
        'Previous',
        'Dominant Crime',
        'Peak Window',
        'Peak Share %',
        'Status',
        'Emerging',
      ],
      rows,
    ),
  )
}

function exportChanges(report: ChangeReport) {
  const rows = report.signals.map((signal) => [
    signal.id,
    signal.kind,
    signal.severity,
    signal.area,
    signal.headline,
    signal.detail,
    signal.deltaPercent,
    signal.recentCount,
    signal.previousCount,
    signal.category ?? '',
  ])
  downloadTextFile(
    `crimemap-change-signals-${stamp()}.csv`,
    toCsv(
      [
        'Signal ID',
        'Kind',
        'Urgency',
        'Locality',
        'Headline',
        'Detail',
        'Delta %',
        'Recent',
        'Previous',
        'Category',
      ],
      rows,
    ),
  )
}

function exportStations(stations: PoliceStation[]) {
  const rows = stations.map((station) => [
    station.id,
    station.name,
    station.area,
    station.jurisdiction.join('; '),
    station.lat,
    station.lng,
  ])
  downloadTextFile(
    `crimemap-stations-${stamp()}.csv`,
    toCsv(['Station ID', 'Name', 'Locality', 'Jurisdiction', 'Lat', 'Lng'], rows),
  )
}

/** Reports view: export-ready summary of incidents and risk zones. */
export function ReportsView({
  incidents,
  zones,
  changes,
  stations,
  stats,
  categoryStats,
}: ReportsViewProps) {
  const exportButtons: { label: string; hint: string; onClick: () => void }[] = [
    {
      label: 'Incidents CSV',
      hint: `${formatNumber(incidents.length)} records`,
      onClick: () => exportIncidents(incidents),
    },
    {
      label: 'Risk zones CSV',
      hint: `${formatNumber(zones.length)} zones`,
      onClick: () => exportZones(zones),
    },
    {
      label: 'Change signals CSV',
      hint: `${changes.signals.length} signals`,
      onClick: () => exportChanges(changes),
    },
    {
      label: 'Stations CSV',
      hint: `${formatNumber(stations.length)} stations`,
      onClick: () => exportStations(stations),
    },
    {
      label: 'Print / PDF',
      hint: 'Browser print dialog',
      onClick: () => window.print(),
    },
  ]

  return (
    <div className="scroll-thin flex h-full flex-col gap-3 overflow-y-auto bg-transparent p-3 pb-6 xl:p-4">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-[18px] font-bold leading-tight text-white xl:text-[22px]">
            Reports &amp; Export
          </h1>
          <p className="mt-1 max-w-3xl text-[12px] leading-relaxed text-steel-400">
            Snapshot of the current filtered dataset and explainable risk zones. Suitable for
            printing or copy/paste into operational briefs.
          </p>
        </div>
        <DemoChip />
      </header>

      <div className="grid gap-3 md:grid-cols-3">
        <Panel title="Total incidents" subtitle="Filtered">
          <p className="text-4xl font-bold text-blue-950 font-serif">{formatNumber(stats.totalIncidents)}</p>
        </Panel>
        <Panel title="Risk zones" subtitle="Active">
          <p className="text-4xl font-bold text-red-600 font-serif">{formatNumber(zones.length)}</p>
        </Panel>
        <Panel title="Avg risk score" subtitle="0–100">
          <p className="text-4xl font-bold text-amber-600 font-serif">{Math.round(stats.averageRiskScore)}</p>
        </Panel>
      </div>

      <Panel title="Exports" subtitle="CSV files respect the active filters">
        <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3 font-serif">
          {exportButtons.map((button) => (
            <button
              key={button.label}
              type="button"
              onClick={button.onClick}
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 py-2.5 text-left transition-colors hover:border-blue-500 hover:bg-blue-50/50 shadow-xs"
            >
              <span className="text-[13px] font-bold text-slate-900">{button.label}</span>
              <span className="text-[10px] text-slate-500 font-mono font-semibold">{button.hint}</span>
            </button>
          ))}
        </div>
      </Panel>

      <Panel title="Top categories" subtitle="Share of filtered incidents">
        <ul className="divide-y divide-slate-100 font-serif">
          {categoryStats.slice(0, 6).map((entry) => (
            <li key={entry.category} className="flex items-center justify-between py-2 first:pt-0 last:pb-0">
              <span className="text-[13px] font-bold text-slate-900">{entry.category}</span>
              <span className="font-mono text-[11px] text-slate-600 font-semibold">
                {entry.count} ({entry.share}%)
              </span>
            </li>
          ))}
        </ul>
      </Panel>

      {zones.length > 0 ? (
        <Panel title="Risk zone summaries" subtitle="Explainable scores">
          <div className="grid gap-2.5 md:grid-cols-2">
            {zones.slice(0, 3).map((zone) => (
              <RiskBreakdown key={zone.id} zone={zone} compact />
            ))}
          </div>
        </Panel>
      ) : null}

      <Panel title="Incidents (filtered)" subtitle={`${formatNumber(incidents.length)} records`}>
        <CrimeTable incidents={incidents.slice(0, 25)} />
      </Panel>
    </div>
  )
}
