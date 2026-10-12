import { Layers, X } from 'lucide-react'
import { useState } from 'react'
import { CRIME_TYPE_ICONS, SEVERITY_COLORS } from '../../utils/crimeIcons'
import { DemoChip } from '../ui/Badge'

interface MapLegendProps {
  defaultOpen?: boolean
}

/**
 * Interactive icon legend for map layers:
 * - Crime types identified by shape (Tabler icons)
 * - Severity levels identified by background color
 * - Police stations, patrol units, and hotspot symbols
 */
export function MapLegend({ defaultOpen = false }: MapLegendProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="pointer-events-auto absolute bottom-9 left-3 z-[1200] font-sans">
      {open ? (
        <div
          className="w-72 max-w-[calc(100vw-24px)] rounded-xl border backdrop-blur-md font-sans transition-all max-h-[80vh] overflow-y-auto scroll-thin"
          style={{
            backgroundColor: 'var(--card-bg)',
            borderColor: 'var(--card-border)',
            boxShadow: 'var(--card-shadow)',
            color: 'var(--card-text-body)',
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between gap-2 border-b px-3.5 py-2.5 sticky top-0 z-10"
            style={{
              backgroundColor: 'var(--card-bg)',
              borderColor: 'var(--card-header-border)',
            }}
          >
            <span
              className="inline-flex items-center gap-1.5 text-[12px] font-extrabold uppercase tracking-wider"
              style={{ color: 'var(--card-text-title)' }}
            >
              <Layers className="size-4 text-blue-500" aria-hidden />
              Map Icon &amp; Layer Legend
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close legend"
              className="rounded p-1 text-steel-400 hover:bg-navy-700 hover:text-white cursor-pointer"
            >
              <X className="size-4" />
            </button>
          </div>

          <div className="p-3.5 space-y-3.5 text-xs">
            {/* 1. SEVERITY BY COLOR */}
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-steel-300 mb-2">
                Severity (Marker Background Color)
              </p>
              <div className="grid grid-cols-3 gap-1.5">
                <div className="flex items-center gap-1.5 rounded-lg border border-red-500/40 bg-red-950/40 px-2 py-1.5">
                  <span
                    className="size-3.5 shrink-0 rounded-full border border-white shadow-2xs"
                    style={{ backgroundColor: SEVERITY_COLORS.High }}
                  ></span>
                  <div>
                    <div className="font-bold text-[11px] text-white">High</div>
                    <div className="text-[9px] font-mono text-red-300">#E24B4A</div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 rounded-lg border border-amber-500/40 bg-amber-950/40 px-2 py-1.5">
                  <span
                    className="size-3.5 shrink-0 rounded-full border border-white shadow-2xs"
                    style={{ backgroundColor: SEVERITY_COLORS.Medium }}
                  ></span>
                  <div>
                    <div className="font-bold text-[11px] text-white">Medium</div>
                    <div className="text-[9px] font-mono text-amber-300">#EF9F27</div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 rounded-lg border border-blue-500/40 bg-blue-950/40 px-2 py-1.5">
                  <span
                    className="size-3.5 shrink-0 rounded-full border border-white shadow-2xs"
                    style={{ backgroundColor: SEVERITY_COLORS.Low }}
                  ></span>
                  <div>
                    <div className="font-bold text-[11px] text-white">Low</div>
                    <div className="text-[9px] font-mono text-sky-300">#378ADD</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. CRIME TYPE BY SHAPE */}
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-steel-300 mb-2">
                Crime Type (Identified by Icon Shape)
              </p>
              <div className="grid grid-cols-2 gap-x-2 gap-y-1.5">
                {Object.entries(CRIME_TYPE_ICONS)
                  .filter(([type]) => type !== 'Vehicle theft') // Deduplicate alias
                  .map(([type, icon]) => (
                    <div key={type} className="flex items-center gap-2 text-[11px] font-medium text-white">
                      <span className="size-5 rounded-full bg-[#1e293b] text-sky-300 flex items-center justify-center shrink-0 shadow-2xs border border-sky-400/40">
                        <i className={`ti ti-${icon} text-[11px] leading-none`}></i>
                      </span>
                      <span className="truncate">{type}</span>
                    </div>
                  ))}
              </div>
            </div>

            {/* 3. OTHER MAP SYMBOLS */}
            <div className="border-t border-navy-700 pt-3">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-steel-300 mb-2">
                Other Map Symbols
              </p>
              <ul className="space-y-2 text-[11px]">
                {/* Video Badge */}
                <li className="flex items-center gap-2 text-white">
                  <div className="relative size-5 rounded-full bg-[#E24B4A] border border-white flex items-center justify-center shrink-0">
                    <i className="ti ti-home text-[10px] text-white"></i>
                    <span className="absolute -top-1 -right-1 size-3 rounded-full bg-slate-900 border border-white flex items-center justify-center text-sky-400">
                      <i className="ti ti-video text-[6px]"></i>
                    </span>
                  </div>
                  <span>
                    <strong className="text-white">Video Badge:</strong> CCTV Clip Available
                  </span>
                </li>

                {/* Police Station */}
                <li className="flex items-center gap-2 text-white">
                  <span className="size-5 rounded-full bg-[#16a34a] border border-white flex items-center justify-center shrink-0 text-white shadow-2xs">
                    <i className="ti ti-shield-check text-[11px]"></i>
                  </span>
                  <span>
                    <strong className="text-white">Police Station:</strong> Shield-Check (Green)
                  </span>
                </li>

                {/* Patrol Units */}
                <li className="flex items-center gap-2 text-white">
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#081220] px-2 py-0.5 border border-sky-400 text-white text-[9px] font-bold">
                    <i className="ti ti-car text-sky-300"></i>
                    <span className="size-1.5 rounded-full bg-red-500 animate-pulse"></span>
                    <span>REC</span>
                  </span>
                  <span>
                    <strong className="text-white">Patrol Units:</strong> Car + Blinking REC
                  </span>
                </li>

                {/* Hotspot Zones */}
                <li className="flex items-center gap-2 text-white">
                  <span className="size-5 rounded-full bg-amber-500 border border-white flex items-center justify-center shrink-0 text-white shadow-2xs">
                    <i className="ti ti-flame text-[11px]"></i>
                  </span>
                  <span>
                    <strong className="text-white">Hotspot Zones:</strong> Flame + Pulsing Ring
                  </span>
                </li>

                {/* Critical Zones */}
                <li className="flex items-center gap-2 text-white">
                  <span className="size-5 rounded-full bg-red-600 border border-white flex items-center justify-center shrink-0 text-white shadow-2xs">
                    <i className="ti ti-siren text-[11px]"></i>
                  </span>
                  <span>
                    <strong className="text-white">Critical Zones:</strong> Urgent Siren (Fast Pulse)
                  </span>
                </li>

                {/* Cluster Bubble */}
                <li className="flex items-center gap-2 text-white">
                  <span className="size-5 rounded-full bg-[#0b1a30] border border-blue-400 flex items-center justify-center shrink-0 text-white text-[10px] font-extrabold">
                    12
                  </span>
                  <span>
                    <strong className="text-white">Numbered Cluster:</strong> Merged Zoom Bubble
                  </span>
                </li>
              </ul>
            </div>

            <div className="border-t border-navy-700 pt-2">
              <DemoChip />
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open map legend and icon guide"
          title="Map Icon & Layer Legend"
          className="flex items-center gap-2 rounded-full border border-navy-600 bg-navy-900/95 px-3.5 py-2 text-steel-200 shadow-[0_8px_24px_rgba(0,0,0,0.45)] backdrop-blur-md transition-all hover:text-white hover:border-navy-500 hover:scale-105 cursor-pointer font-bold text-xs"
        >
          <Layers className="size-4 text-blue-400" aria-hidden />
          <span>Icon Legend</span>
        </button>
      )}
    </div>
  )
}
