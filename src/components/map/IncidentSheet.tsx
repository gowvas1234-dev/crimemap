import { Check, Maximize2, Minimize2, Navigation, Pause, Pencil, Play, Trash2, Video, Volume2, X } from 'lucide-react'
import { useState } from 'react'
import type { CrimeIncident } from '../../types'
import { formatDateTime } from '../../utils/format'
import {
  getCrimeIcon,
  getIncidentSeverity,
  getSeverityColor,
  hasIncidentVideo,
} from '../../utils/crimeIcons'
import { StatusBadge } from '../ui/Badge'

interface IncidentSheetProps {
  incident: CrimeIncident
  onClose: () => void
  onEdit: (incident: CrimeIncident) => void
  onDelete: (incidentId: string) => void
}

/** Google-Maps-style incident card shown when a marker is tapped or hovered. */
export function IncidentSheet({
  incident,
  onClose,
  onEdit,
  onDelete,
}: IncidentSheetProps) {
  const [confirming, setConfirming] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)

  const severity = getIncidentSeverity(incident)
  const iconName = getCrimeIcon(incident.category)
  const severityColor = getSeverityColor(severity)
  const hasVideo = hasIncidentVideo(incident)

  return (
    <section
      className={`incident-sheet-in pointer-events-auto scroll-thin absolute bottom-0 z-[1300] overflow-y-auto border-t border-slate-200 bg-white shadow-[0_18px_50px_rgba(0,0,0,0.35)] font-sans text-slate-900 transition-[border-radius] duration-200 ${
        expanded
          ? 'inset-x-0 top-0 rounded-none'
          : 'inset-x-0 bottom-0 max-h-[75%] rounded-t-3xl md:inset-x-auto md:bottom-3 md:right-3 md:w-[390px] md:max-h-[85vh] md:rounded-2xl md:border'
      }`}
      aria-label={`Incident ${incident.id} details`}
    >
      <button
        type="button"
        onClick={() => setExpanded((current) => !current)}
        aria-label={expanded ? 'Collapse incident details' : 'Expand incident details'}
        className="mx-auto mt-2 flex h-6 w-12 items-center justify-center rounded-full"
      >
        <span className="h-1 w-9 rounded-full bg-slate-300 transition-colors hover:bg-slate-400" aria-hidden />
      </button>

      <header className="flex items-start justify-between gap-2 px-4 pb-2 pt-1 font-sans">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            {/* 32px shape & severity badge mirroring the map marker */}
            <span
              className="inline-flex size-6 shrink-0 items-center justify-center rounded-full border border-white shadow-xs text-white"
              style={{ backgroundColor: severityColor }}
              title={`${incident.category} (${severity} severity)`}
            >
              <i className={`ti ti-${iconName} text-xs`}></i>
            </span>

            <span
              className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold text-white shadow-2xs"
              style={{ backgroundColor: severityColor }}
            >
              {incident.category} &middot; {severity}
            </span>

            <StatusBadge status={incident.status} />

            {hasVideo && (
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-extrabold text-sky-400 border border-sky-400/30">
                <i className="ti ti-video text-xs"></i> CCTV Video
              </span>
            )}
          </div>

          <h2 className="mt-2 truncate text-[16px] font-extrabold text-slate-900 font-sans">
            {incident.id} &middot; {incident.area}
          </h2>
        </div>

        <div className="flex shrink-0 items-center gap-0.5">
          <button
            type="button"
            onClick={() => setExpanded((current) => !current)}
            aria-label={expanded ? 'Collapse incident details' : 'Expand incident details'}
            title={expanded ? 'Collapse' : 'Expand to full screen'}
            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
          >
            {expanded ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close incident details"
            className="shrink-0 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="size-4" />
          </button>
        </div>
      </header>

      <div className="px-4 pb-4 font-sans space-y-3">
        {/* VIDEO CLIP PLAYER SECTION */}
        {hasVideo && (
          <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-950 text-white shadow-md">
            <div className="flex items-center justify-between bg-slate-900/90 px-3 py-1.5 text-[11px] border-b border-slate-800">
              <div className="flex items-center gap-1.5 font-mono text-emerald-400">
                <span className="size-2 rounded-full bg-red-500 animate-ping"></span>
                <span className="font-bold text-red-400">REC</span>
                <span className="text-slate-400">&middot;</span>
                <span>CAM-0{incident.id.slice(-1)} ({incident.area})</span>
              </div>
              <span className="font-mono text-[10px] text-slate-400">1080p 30fps</span>
            </div>

            {/* Video Canvas / Player Container */}
            <div className="relative aspect-video w-full bg-[#081220] flex items-center justify-center overflow-hidden">
              {incident.videoUrl ? (
                <video
                  src={incident.videoUrl}
                  controls
                  autoPlay
                  muted
                  loop
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full relative flex flex-col items-center justify-center p-4 bg-gradient-to-b from-[#0b1a30] to-[#040913]">
                  {/* Surveillance HUD Overlay */}
                  <div className="absolute top-2 left-2 font-mono text-[10px] text-emerald-400/80 bg-black/50 px-1.5 py-0.5 rounded">
                    SYS.LOG // {incident.occurredAt.replace('T', ' ').slice(0, 19)}
                  </div>
                  <div className="absolute top-2 right-2 font-mono text-[10px] text-sky-400/80 bg-black/50 px-1.5 py-0.5 rounded">
                    FOV: 112&deg; N
                  </div>

                  {/* Surveillance Target Crosshair */}
                  <div className="relative z-10 flex flex-col items-center gap-2">
                    <div className="size-16 rounded-full border-2 border-dashed border-sky-400/60 flex items-center justify-center animate-[spin_24s_linear_infinite]">
                      <div className="size-10 rounded-full border border-sky-400/40 flex items-center justify-center">
                        <i className={`ti ti-${iconName} text-xl text-sky-300`}></i>
                      </div>
                    </div>
                    <span className="text-[12px] font-bold text-slate-200 tracking-wide font-sans">
                      SURVEILLANCE EVIDENCE CLIP
                    </span>
                    <span className="text-[10px] text-slate-400 max-w-[240px] text-center font-mono">
                      Target Area: {incident.area} &middot; Tag: #{incident.id}
                    </span>
                  </div>

                  {/* Simulated Scanline Grid */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px] pointer-events-none opacity-60"></div>
                </div>
              )}

              {/* Player Floating Control Bar */}
              <div className="absolute bottom-2 inset-x-2 flex items-center justify-between rounded-lg bg-black/75 px-2.5 py-1 text-white backdrop-blur-xs text-xs">
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex items-center gap-1 text-[11px] font-bold text-sky-300 hover:text-white"
                >
                  {isPlaying ? <Pause className="size-3" /> : <Play className="size-3" />}
                  <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
                </button>
                <div className="font-mono text-[10px] text-slate-300">
                  00:14 / 00:45
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Volume2 className="size-3" />
                  <Video className="size-3 text-sky-400" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* INCIDENT SPECIFICATIONS */}
        <div className="rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-1 shadow-xs font-sans">
          <div className="flex items-center justify-between gap-3 border-b border-dashed border-slate-200 py-2 text-[12px]">
            <span className="shrink-0 text-slate-500 font-medium">Crime Type</span>
            <span className="text-right font-bold text-slate-900 flex items-center gap-1.5">
              <i className={`ti ti-${iconName} text-sm text-slate-700`}></i>
              {incident.category}
            </span>
          </div>

          <div className="flex items-center justify-between gap-3 border-b border-dashed border-slate-200 py-2 text-[12px]">
            <span className="shrink-0 text-slate-500 font-medium">Severity Classification</span>
            <span className="text-right font-bold flex items-center gap-1.5" style={{ color: severityColor }}>
              <span className="size-2 rounded-full" style={{ backgroundColor: severityColor }}></span>
              {severity} Priority
            </span>
          </div>

          <div className="flex items-center justify-between gap-3 border-b border-dashed border-slate-200 py-2 text-[12px]">
            <span className="shrink-0 text-slate-500 font-medium">Occurred</span>
            <span className="text-right font-medium text-slate-900">
              {formatDateTime(incident.occurredAt)}
            </span>
          </div>

          <div className="flex items-center justify-between gap-3 border-b border-dashed border-slate-200 py-2 text-[12px]">
            <span className="shrink-0 text-slate-500 font-medium">Coordinates</span>
            <span className="text-right font-bold font-mono text-slate-900">
              {incident.lat.toFixed(4)}, {incident.lng.toFixed(4)}
            </span>
          </div>

          {incident.description ? (
            <div className="flex items-start justify-between gap-3 border-b border-dashed border-slate-200 py-2 text-[12px]">
              <span className="shrink-0 text-slate-500 font-medium">Details</span>
              <span className="text-right font-medium text-slate-800">
                {incident.description}
              </span>
            </div>
          ) : null}

          <p className="py-2 text-center text-[10px] font-bold uppercase tracking-[0.08em] text-amber-700">
            {incident.isDemo
              ? 'DEMO DATA - NOT REAL CRIME INFORMATION'
              : 'USER-REPORTED - NOT VERIFIED'}
          </p>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col gap-1.5">
          <button
            type="button"
            onClick={() => onEdit(incident)}
            className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-amber-500/60 bg-amber-500/15 px-3 py-2.5 text-[12px] font-semibold text-amber-800 hover:bg-amber-500/25 transition-colors cursor-pointer"
          >
            <Pencil className="size-4" aria-hidden /> Edit crime &amp; location
          </button>

          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${incident.lat},${incident.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-3 py-2.5 text-[12px] font-semibold text-white transition-colors hover:bg-blue-500 cursor-pointer"
          >
            <Navigation className="size-4" aria-hidden /> Get directions
          </a>

          {confirming ? (
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => onDelete(incident.id)}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-red-500 bg-red-600 px-3 py-2.5 text-[12px] font-semibold text-white transition-colors hover:bg-red-700 cursor-pointer"
              >
                <Check className="size-4" aria-hidden /> Confirm delete
              </button>
              <button
                type="button"
                onClick={() => setConfirming(false)}
                className="rounded-xl border border-slate-300 bg-slate-100 px-3 py-2.5 text-[12px] font-semibold text-slate-700 transition-colors hover:bg-slate-200 cursor-pointer"
              >
                Keep
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setConfirming(true)}
              className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-red-300 bg-transparent px-3 py-2.5 text-[12px] font-semibold text-red-600 transition-colors hover:bg-red-50 cursor-pointer"
            >
              <Trash2 className="size-4" aria-hidden /> Delete crime
            </button>
          )}
        </div>
      </div>
    </section>
  )
}