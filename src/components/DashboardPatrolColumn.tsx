import {
  ArrowRight,
  Car,
  Compass,
  MapPin,
  Navigation,
  Pause,
  Play,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react'
import { useState } from 'react'
import { usePatrol } from '../patrol/usePatrol'
import type { AppView } from '../types'
import { EmergencySosButton } from './EmergencySosButton'

interface DashboardPatrolColumnProps {
  onNavigate?: (view: AppView) => void
  onOpenEmergencySos?: () => void
  className?: string
}

type PatrolFilter = 'all' | 'moving' | 'deploying' | 'patrolling'

/**
 * Dedicated Dashboard Column for Patrol Units (Moving & Active).
 * Provides live telemetry, real-time simulated motion, unit routes,
 * and direct connection with the Emergency SOS App.
 */
export function DashboardPatrolColumn({
  onNavigate = () => {},
  onOpenEmergencySos,
  className = '',
}: DashboardPatrolColumnProps) {
  const { units, coveredZones, running, speed, toggleRunning, changeSpeed, reset } =
    usePatrol()

  const [filter, setFilter] = useState<PatrolFilter>('all')

  // Calculate moving units vs active units
  const movingUnits = units.filter(
    (unit) => running && (unit.displayStatus === 'Patrolling' || unit.displayStatus === 'Deploying'),
  )

  const deployingUnits = units.filter((unit) => unit.displayStatus === 'Deploying')
  const patrollingUnits = units.filter((unit) => unit.displayStatus === 'Patrolling')

  const filteredUnits = units.filter((unit) => {
    if (filter === 'moving') return running && (unit.displayStatus === 'Patrolling' || unit.displayStatus === 'Deploying')
    if (filter === 'deploying') return unit.displayStatus === 'Deploying'
    if (filter === 'patrolling') return unit.displayStatus === 'Patrolling'
    return true
  })

  return (
    <div
      className={`flex flex-col gap-3 rounded-xl border border-[#1e2f47] bg-[#081220]/95 p-3.5 sm:p-4 shadow-2xl backdrop-blur-md font-sans ${className}`}
      aria-label="Patrol moving and active column"
    >
      {/* 1. Header with Live Status & Title */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1b2b42] pb-3">
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue-600/30 border border-blue-400 text-sky-300">
            <Car className="size-4 animate-pulse" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-[14px] sm:text-[15px] font-black uppercase tracking-tight text-white truncate">
                Patrol Fleet &middot; Moving &amp; Active
              </h3>
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-wider ${
                  running
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/50'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-400/50'
                }`}
              >
                <span
                  className={`size-1.5 rounded-full ${
                    running ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'
                  }`}
                />
                {running ? 'Moving Live' : 'Simulation Paused'}
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-400 truncate">
              Real-time tactical patrol surveillance &amp; dispatch monitoring
            </p>
          </div>
        </div>

        {/* Quick Simulation Trigger */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={toggleRunning}
            className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-bold text-white transition-all shadow-md cursor-pointer ${
              running
                ? 'bg-amber-600 hover:bg-amber-500 border border-amber-400'
                : 'bg-emerald-600 hover:bg-emerald-500 border border-emerald-400'
            }`}
            title={running ? 'Pause patrol movement' : 'Start patrol movement'}
          >
            {running ? <Pause className="size-3" /> : <Play className="size-3" />}
            <span>{running ? 'Pause' : 'Run Motion'}</span>
          </button>

          <button
            type="button"
            onClick={() => changeSpeed(speed === 1 ? 2 : speed === 2 ? 3 : 1)}
            className="rounded-lg border border-[#2a3f5f] bg-[#0c1a2f] px-2 py-1.5 text-[11px] font-mono font-bold text-sky-300 hover:bg-[#132847] cursor-pointer"
            title="Toggle simulation speed"
          >
            {speed}x
          </button>

          <button
            type="button"
            onClick={reset}
            className="rounded-lg border border-[#2a3f5f] bg-[#0c1a2f] p-1.5 text-slate-400 hover:text-white hover:bg-[#132847] cursor-pointer"
            title="Reset simulation"
          >
            <RotateCcw className="size-3" />
          </button>
        </div>
      </div>

      {/* 2. Fleet Key Metrics */}
      <div className="grid grid-cols-3 gap-2">
        <div className="flex flex-col rounded-lg border border-emerald-500/30 bg-emerald-950/30 p-2.5 text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
            Moving Now
          </span>
          <div className="mt-0.5 flex items-center justify-center gap-1">
            <Navigation className="size-3.5 text-emerald-400 animate-spin" />
            <span className="text-xl font-black font-mono text-emerald-300">
              {running ? movingUnits.length : 0}
            </span>
          </div>
          <span className="text-[9px] text-slate-400">
            {running ? 'Units in motion' : 'Click Run Motion'}
          </span>
        </div>

        <div className="flex flex-col rounded-lg border border-blue-500/30 bg-blue-950/30 p-2.5 text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400">
            Active Fleet
          </span>
          <div className="mt-0.5 flex items-center justify-center gap-1">
            <Car className="size-3.5 text-sky-400" />
            <span className="text-xl font-black font-mono text-white">{units.length}</span>
          </div>
          <span className="text-[9px] text-slate-400">On-Duty Vehicles</span>
        </div>

        <div className="flex flex-col rounded-lg border border-indigo-500/30 bg-indigo-950/30 p-2.5 text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
            Zones Covered
          </span>
          <div className="mt-0.5 flex items-center justify-center gap-1">
            <ShieldCheck className="size-3.5 text-indigo-400" />
            <span className="text-xl font-black font-mono text-white">{coveredZones}</span>
          </div>
          <span className="text-[9px] text-slate-400">Risk Sectors</span>
        </div>
      </div>

      {/* 3. Emergency SOS App Connection Banner (Prominent Quick Connect) */}
      <div className="rounded-xl border border-red-500/50 bg-gradient-to-r from-red-950/80 via-[#1e0d16] to-[#0c1a2f] p-3 shadow-lg">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="relative flex size-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-90" />
                <span className="relative inline-flex size-2 rounded-full bg-red-500" />
              </span>
              <span className="text-[12px] font-black uppercase text-white tracking-wide truncate">
                Emergency SOS App Link
              </span>
            </div>
            <p className="text-[10px] text-slate-300 font-medium truncate mt-0.5">
              Connect with 112 India ERSS &middot; Instant PCR &amp; Patrol Alert
            </p>
          </div>

          {onOpenEmergencySos && (
            <EmergencySosButton onClick={onOpenEmergencySos} compact />
          )}
        </div>
      </div>

      {/* 4. Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto scroll-thin py-0.5">
        <button
          type="button"
          onClick={() => setFilter('all')}
          className={`rounded px-2.5 py-1 text-[11px] font-bold transition-colors cursor-pointer ${
            filter === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-[#0f1d33] text-slate-400 hover:text-white'
          }`}
        >
          All Units ({units.length})
        </button>
        <button
          type="button"
          onClick={() => setFilter('moving')}
          className={`rounded px-2.5 py-1 text-[11px] font-bold transition-colors cursor-pointer ${
            filter === 'moving'
              ? 'bg-emerald-600 text-white'
              : 'bg-[#0f1d33] text-slate-400 hover:text-white'
          }`}
        >
          Moving Now ({running ? movingUnits.length : 0})
        </button>
        <button
          type="button"
          onClick={() => setFilter('deploying')}
          className={`rounded px-2.5 py-1 text-[11px] font-bold transition-colors cursor-pointer ${
            filter === 'deploying'
              ? 'bg-amber-600 text-white'
              : 'bg-[#0f1d33] text-slate-400 hover:text-white'
          }`}
        >
          Deploying ({deployingUnits.length})
        </button>
        <button
          type="button"
          onClick={() => setFilter('patrolling')}
          className={`rounded px-2.5 py-1 text-[11px] font-bold transition-colors cursor-pointer ${
            filter === 'patrolling'
              ? 'bg-indigo-600 text-white'
              : 'bg-[#0f1d33] text-slate-400 hover:text-white'
          }`}
        >
          Patrolling ({patrollingUnits.length})
        </button>
      </div>

      {/* 5. Units Telemetry List */}
      <div className="flex flex-col gap-2 max-h-[380px] overflow-y-auto scroll-thin pr-0.5">
        {filteredUnits.length === 0 ? (
          <div className="rounded-lg border border-slate-800 bg-[#0c1a2f] p-4 text-center text-xs text-slate-400">
            {filter === 'moving' && !running
              ? 'Simulation is paused. Click "Run Motion" above to watch units move in real-time.'
              : 'No patrol units match this filter.'}
          </div>
        ) : (
          filteredUnits.map((unit) => {
            const isUnitMoving =
              running &&
              (unit.displayStatus === 'Patrolling' || unit.displayStatus === 'Deploying')

            return (
              <div
                key={unit.id}
                className={`relative flex flex-col gap-2 rounded-xl border p-3 transition-all ${
                  isUnitMoving
                    ? 'border-emerald-500/40 bg-[#0d2238] shadow-[0_0_12px_rgba(16,185,129,0.15)]'
                    : 'border-[#1b2c45] bg-[#091526] hover:border-slate-600'
                }`}
              >
                {/* Unit Headline */}
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-sans text-[13px] font-black text-white">
                        {unit.callsign}
                      </span>
                      <span className="font-mono text-[10px] text-slate-400">{unit.id}</span>
                      {isUnitMoving ? (
                        <span className="inline-flex items-center gap-1 rounded bg-emerald-500/20 px-1.5 py-0.5 text-[9px] font-black text-emerald-300 border border-emerald-400/40">
                          <span className="size-1.5 rounded-full bg-emerald-400 animate-ping" />
                          IN MOTION
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded bg-slate-700/50 px-1.5 py-0.5 text-[9px] font-bold text-slate-300">
                          ACTIVE READY
                        </span>
                      )}
                    </div>
                    <div className="mt-0.5 flex items-center gap-1 text-[11px] text-slate-300 font-medium">
                      <MapPin className="size-3 text-sky-400 shrink-0" />
                      <span className="truncate">
                        Target: <strong className="text-white">{unit.zoneArea}</strong> &middot; Base{' '}
                        {unit.stationName}
                      </span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span
                      className={`text-[11px] font-bold uppercase ${
                        unit.displayStatus === 'Patrolling'
                          ? 'text-indigo-400'
                          : unit.displayStatus === 'Deploying'
                            ? 'text-amber-400'
                            : 'text-slate-400'
                      }`}
                    >
                      {unit.displayStatus}
                    </span>
                    <div className="text-[10px] text-slate-400 font-mono">
                      {unit.etaMinutes > 0 ? `ETA ${unit.etaMinutes}m` : 'On Station'}
                    </div>
                  </div>
                </div>

                {/* Real-Time Coordinates & Telemetry Line */}
                <div className="flex items-center justify-between border-t border-[#17263c] pt-2 text-[10px] text-slate-400">
                  <div className="flex items-center gap-1.5 font-mono text-sky-300">
                    <Compass className="size-3 text-sky-400" />
                    <span>
                      {unit.displayLat.toFixed(4)}°N, {unit.displayLng.toFixed(4)}°E
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-mono text-slate-300">Speed: 24 km/h</span>
                    <button
                      type="button"
                      onClick={() => onNavigate('map')}
                      className="inline-flex items-center gap-0.5 text-sky-400 hover:text-white font-bold cursor-pointer"
                    >
                      <span>Map</span>
                      <ArrowRight className="size-2.5" />
                    </button>
                  </div>
                </div>

                {/* Animated Route Progress Bar */}
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                  <div
                    className={`h-full transition-all duration-300 ${
                      isUnitMoving ? 'bg-gradient-to-r from-emerald-500 to-sky-400' : 'bg-blue-600'
                    }`}
                    style={{ width: `${Math.round(unit.progress * 100)}%` }}
                  />
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* 6. Footer Navigation to Full Patrol Operations */}
      <div className="border-t border-[#1b2b42] pt-2">
        <button
          type="button"
          onClick={() => onNavigate('patrol')}
          className="w-full flex items-center justify-center gap-2 rounded-lg border border-blue-500/40 bg-blue-600/20 py-2 text-xs font-bold text-sky-300 hover:bg-blue-600/30 hover:text-white transition-colors cursor-pointer"
        >
          <span>Open Full Tactical Patrol Command</span>
          <ArrowRight className="size-3.5" />
        </button>
      </div>
    </div>
  )
}
