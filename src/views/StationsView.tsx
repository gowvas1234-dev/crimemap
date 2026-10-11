import { MapPin } from 'lucide-react'
import { Panel } from '../components/ui/Panel'
import { DemoChip } from '../components/ui/Badge'
import type { CrimeIncident, PoliceStation } from '../types'

interface StationsViewProps {
  stations: PoliceStation[]
  incidents: CrimeIncident[]
  onFocusArea: (area: string) => void
}

export function StationsView({ stations, onFocusArea }: StationsViewProps) {
  return (
    <div className="scroll-thin p-3 pb-6 xl:p-4">
      <Panel title="Police stations" subtitle="Fictional demo locations for mapping only">
        <div className="space-y-2 md:hidden font-serif">
          {stations.map((station) => (
            <div
              key={station.id}
              className="rounded-lg border border-slate-200 bg-slate-50/80 p-3 shadow-xs"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-[14px] font-bold text-slate-900">{station.name}</span>
                <span className="shrink-0 font-mono text-[10px] text-slate-500 font-bold">{station.id}</span>
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-[12px] text-slate-600">
                <span className="inline-flex items-center gap-1 text-slate-900 font-semibold">
                  <MapPin className="size-3.5 text-blue-600" aria-hidden />
                  {station.area}
                </span>
                <span className="font-mono text-[10px] text-slate-500">
                  {station.lat.toFixed(4)}, {station.lng.toFixed(4)}
                </span>
              </div>
              <p className="mt-1.5 text-[11px] leading-snug text-slate-600">
                {station.jurisdiction.join(', ')}
              </p>
              <button
                type="button"
                onClick={() => onFocusArea(station.area)}
                className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-800"
              >
                <MapPin className="size-3.5" /> Show on map
              </button>
            </div>
          ))}
        </div>

        <div className="hidden overflow-x-auto md:block font-serif">
          <table className="w-full min-w-[900px] text-[12px]">
            <thead>
              <tr className="border-b border-slate-200 text-left text-[10px] uppercase tracking-[0.12em] text-slate-500">
                <th className="px-4 py-2">Station ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Area</th>
                <th className="px-4 py-2">Jurisdiction</th>
                <th className="px-4 py-2">Coordinates</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {stations.map((station) => (
                <tr key={station.id} className="border-b border-slate-100 hover:bg-slate-50/70">
                  <td className="px-4 py-2 font-mono text-[10px] text-slate-600 font-bold">{station.id}</td>
                  <td className="px-4 py-2 font-bold text-slate-900">{station.name}</td>
                  <td className="px-4 py-2 text-slate-800 font-semibold">{station.area}</td>
                  <td className="max-w-[520px] px-4 py-2 text-slate-600">{station.jurisdiction.join(', ')}</td>
                  <td className="px-4 py-2 font-mono text-[10px] text-slate-500">
                    {station.lat.toFixed(4)}, {station.lng.toFixed(4)}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      type="button"
                      onClick={() => onFocusArea(station.area)}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-800"
                    >
                      <MapPin className="size-3.5" /> Show on map
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 text-[10px] text-slate-500 font-serif border-t border-slate-100 pt-2">
          <DemoChip compact /> No contact, capacity or operational status provided.
        </div>
      </Panel>
    </div>
  )
}

