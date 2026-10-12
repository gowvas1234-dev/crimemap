import {
  AlertTriangle,
  Flame,
  Radio,
  Siren,
  X,
  Zap,
} from 'lucide-react'
import { useState } from 'react'
import { DEMO_AREAS, PUDUCHERRY_CENTER } from '../data/areas'
import type { CrimeCategory, CrimeIncident } from '../types'

interface CriticalSituationModalProps {
  isOpen: boolean
  onClose: () => void
  onDispatch: (incident: CrimeIncident) => void
  existingIncidentsCount: number
}

interface CriticalScenario {
  id: string
  label: string
  category: CrimeCategory
  area: string
  headline: string
  message: string
}

const CRITICAL_SCENARIOS: CriticalScenario[] = [
  {
    id: 'armed-threat',
    label: 'Armed Suspect / Weapon Threat',
    category: 'Assault',
    area: 'Mission Street',
    headline: 'CODE RED: Armed Suspect Sighted',
    message:
      'CRITICAL PRIORITY: Armed individual sighted in commercial area. Threat to public safety. All CPOs in vicinity set 300m perimeter and divert pedestrians.',
  },
  {
    id: 'robbery-progress',
    label: 'Armed Robbery in Progress',
    category: 'Robbery',
    area: 'Muthialpet',
    headline: 'HEIST IN PROGRESS: Commercial Robbery',
    message:
      'ARMED ROBBERY: Multiple perpetrators reported inside commercial bank/jewelry establishment. Weapons displayed. CPOs on rapid response and cordon.',
  },
  {
    id: 'violent-riot',
    label: 'Civil Disorder / Riot Disturbance',
    category: 'Other',
    area: 'Nellithope',
    headline: 'LEVEL-1 RIOT ALERT: Rapid Containment',
    message:
      'MOB UNREST: Large hostile crowd gathering with stone pelting reported. Sector CPOs and anti-riot teams mobilize immediately to restore order.',
  },
  {
    id: 'high-speed-pursuit',
    label: 'High-Speed Vehicle Pursuit',
    category: 'Vehicle Theft',
    area: 'Lawspet',
    headline: 'TACTICAL PURSUIT: Fleeing Suspect Vehicle',
    message:
      'PURSUIT IN PROGRESS: Dark SUV fleeing at high speed towards East Coast Road. Suspects dangerous. Station CPOs to deploy spike strips and roadblocks.',
  },
  {
    id: 'coastal-breach',
    label: 'Coastal Security Breach',
    category: 'Other',
    area: 'White Town',
    headline: 'COASTAL RED ALERT: High Security Area',
    message:
      'COASTAL BREACH: Unidentified suspicious speed vessel approaching Goubert Promenade. Marine Police CPOs on high alert with coastal patrol intercept.',
  },
  {
    id: 'hostage-threat',
    label: 'Active Hostage / Life Threat',
    category: 'Assault',
    area: 'Mudaliarpet',
    headline: 'CRITICAL CODE BLACK: Hostage Situation',
    message:
      'LIFE THREAT EMERGENCY: Individuals held hostage inside residential structure. Negotiator and tactical intervention CPO units dispatched.',
  },
]

export function CriticalSituationModal({
  isOpen,
  onClose,
  onDispatch,
  existingIncidentsCount,
}: CriticalSituationModalProps) {
  const [selectedScenario, setSelectedScenario] = useState<CriticalScenario>(CRITICAL_SCENARIOS[0])
  const [area, setArea] = useState<string>(CRITICAL_SCENARIOS[0].area)
  const [customMessage, setCustomMessage] = useState<string>(CRITICAL_SCENARIOS[0].message)

  if (!isOpen) return null

  const handleSelectScenario = (scenario: CriticalScenario) => {
    setSelectedScenario(scenario)
    setArea(scenario.area)
    setCustomMessage(scenario.message)
  }

  const handleSendDispatch = (e: React.FormEvent) => {
    e.preventDefault()

    const targetArea = DEMO_AREAS.find((a) => a.name === area)
    const lat = targetArea ? targetArea.lat : PUDUCHERRY_CENTER.lat
    const lng = targetArea ? targetArea.lng : PUDUCHERRY_CENTER.lng
    const year = new Date().getFullYear()
    const incidentId = `CRM-${year}-${String(existingIncidentsCount + 1).padStart(4, '0')}`

    const criticalIncident: CrimeIncident = {
      id: incidentId,
      category: selectedScenario.category,
      severity: 'Critical',
      status: 'Reported',
      area,
      occurredAt: new Date().toISOString(),
      description: `[CRITICAL SITUATION ALERT] ${selectedScenario.headline} - ${customMessage}`,
      lat,
      lng,
      isDemo: true,
    }

    onDispatch(criticalIncident)
    onClose()
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="critical-modal-title"
      className="fixed inset-0 z-[10000] flex items-center justify-center p-3 sm:p-5 font-sans"
    >
      {/* Dark backdrop with emergency pulse */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 flex flex-col w-full max-w-2xl max-h-[92vh] overflow-hidden rounded-2xl border-2 border-amber-400 bg-[#081220] shadow-[0_0_60px_rgba(245,158,11,0.5)] text-white">
        {/* Animated Emergency Beacon Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-red-600 via-amber-400 to-blue-600 animate-pulse" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1e2f47] bg-[#0b1a30] px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3 min-w-0">
            <div className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-red-600 to-amber-600 text-white shadow-[0_0_20px_rgba(239,68,68,0.6)] animate-pulse shrink-0">
              <Siren className="size-6 text-white" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 id="critical-modal-title" className="text-[16px] sm:text-[17px] font-black tracking-tight text-white">
                  Critical Situation Alert Message
                </h3>
                <span className="inline-flex items-center gap-1 rounded bg-red-600 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-white animate-pulse">
                  <Zap className="size-3" />
                  LEVEL-1 RED
                </span>
              </div>
              <p className="text-[11px] font-semibold text-amber-300/90 truncate">
                Instant Priority Radio &amp; Terminal Broadcast to All 16 Community Police Officers (CPOs)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-steel-400 hover:bg-navy-800 hover:text-white transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSendDispatch} className="flex-1 overflow-y-auto scroll-thin p-4 sm:p-6 space-y-4">
          {/* Instructions banner */}
          <div className="rounded-xl border border-amber-500/50 bg-[#15233c] p-3 flex items-start gap-3">
            <AlertTriangle className="size-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-[12px] leading-relaxed text-steel-200">
              <strong className="text-white">Emergency Dispatch Protocol:</strong> Tapping dispatch will instantly sound tactical sirens and push a priority alert to all 16 CPOs in Town, Marine, Muthialpet, Mudaliarpet, Lawspet, Oulgaret, and all rural stations.
            </div>
          </div>

          {/* Quick-Tap Scenarios */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-amber-300 mb-2">
              Select Critical Emergency Scenario:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {CRITICAL_SCENARIOS.map((sc) => {
                const isSelected = selectedScenario.id === sc.id
                return (
                  <button
                    key={sc.id}
                    type="button"
                    onClick={() => handleSelectScenario(sc)}
                    className={`flex items-start gap-2.5 rounded-xl border p-2.5 text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-amber-400 bg-[#162a4d] shadow-md ring-1 ring-amber-400/80 text-white'
                        : 'border-[#1e2f47] bg-[#0b1a30] text-steel-300 hover:border-slate-500 hover:bg-[#102340] hover:text-white'
                    }`}
                  >
                    <div
                      className={`grid size-7 place-items-center rounded-lg shrink-0 ${
                        isSelected
                          ? 'bg-amber-500 text-slate-950 font-black'
                          : 'bg-navy-950 text-steel-400 border border-navy-800'
                      }`}
                    >
                      <Flame className="size-3.5" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[12px] font-black leading-tight truncate">
                        {sc.label}
                      </span>
                      <span className="block text-[10px] text-steel-400 truncate mt-0.5">
                        Default: {sc.area}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Locality Dropdown */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-steel-300 mb-1.5">
              Incident Locality / Beat Area:
            </label>
            <select
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="w-full rounded-lg border border-[#1e2f47] bg-[#0c1d35] px-3 py-2 text-[13px] font-bold text-white outline-none focus:border-amber-400"
            >
              {DEMO_AREAS.map((a) => (
                <option key={a.name} value={a.name}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>

          {/* Critical Message Body */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-steel-300 mb-1.5">
              Critical Alert Dispatch Message (Broadcast to CPOs):
            </label>
            <textarea
              rows={3}
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              className="w-full rounded-lg border border-[#1e2f47] bg-[#0c1d35] p-3 text-[12px] font-medium text-white placeholder-steel-500 outline-none focus:border-amber-400 leading-relaxed font-sans"
              placeholder="Enter exact critical dispatch details..."
            />
          </div>

          {/* Telemetry preview */}
          <div className="rounded-lg bg-[#0a1626] border border-[#1e2f47] p-2.5 flex items-center justify-between text-[11px] text-steel-300">
            <span className="flex items-center gap-1.5">
              <Radio className="size-3.5 text-amber-400 animate-pulse" />
              CAD Frequency: <strong>154.650 MHz / MDT Encrypted</strong>
            </span>
            <span className="text-emerald-400 font-bold">
              16 / 16 CPOs Online &bull; 11 Stations
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#1e2f47]">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-[12px] font-bold text-steel-300 hover:text-white hover:bg-navy-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-600 via-amber-500 to-red-600 px-6 py-2.5 text-[13px] font-black text-white shadow-[0_0_25px_rgba(239,68,68,0.6)] hover:shadow-[0_0_35px_rgba(239,68,68,0.8)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <Siren className="size-4 animate-bounce text-white" />
              <span>BROADCAST CRITICAL ALERT TO ALL CPOs</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
