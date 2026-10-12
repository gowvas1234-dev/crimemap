import { Bell, Radio, ShieldAlert, X } from 'lucide-react'
import { useState } from 'react'
import { DEMO_AREAS, PUDUCHERRY_CENTER } from '../data/areas'
import type { CrimeCategory, CrimeIncident, Severity } from '../types'
import { CRIME_CATEGORIES, SEVERITIES } from '../types'

interface ReportCrimeModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (incident: CrimeIncident) => void
  existingIncidentsCount: number
}

/** Allocates the next sequential CRM-YYYY-NNNN id for a new record. */
function generateIncidentId(count: number): string {
  const year = new Date().getFullYear()
  const num = String(count + 1).padStart(4, '0')
  return `CRM-${year}-${num}`
}

export function ReportCrimeModal({
  isOpen,
  onClose,
  onSave,
  existingIncidentsCount,
}: ReportCrimeModalProps) {
  const [category, setCategory] = useState<CrimeCategory>('Robbery')
  const [severity, setSeverity] = useState<Severity>('High')
  const [area, setArea] = useState<string>('Mission Street')
  const [description, setDescription] = useState<string>('')
  const [datetime, setDatetime] = useState<string>(() => {
    const d = new Date()
    const pad = (n: number) => String(n).padStart(2, '0')
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
  })

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const targetArea = DEMO_AREAS.find((a) => a.name === area)
    const lat = targetArea ? targetArea.lat : PUDUCHERRY_CENTER.lat
    const lng = targetArea ? targetArea.lng : PUDUCHERRY_CENTER.lng

    const newIncident: CrimeIncident = {
      id: generateIncidentId(existingIncidentsCount),
      category,
      severity,
      status: 'Reported',
      area,
      occurredAt: new Date(datetime).toISOString(),
      description: description || `Reported ${category} incident in ${area}. Officer on dispatch.`,
      lat,
      lng,
      isDemo: true,
    }

    onSave(newIncident)
    onClose()
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="report-crime-title"
      className="fixed inset-0 z-[10000] flex items-center justify-center p-3 sm:p-5 font-sans"
    >
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border-2 border-blue-500 bg-[#081220] shadow-[0_20px_70px_rgba(0,0,0,0.9)] text-white">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1e2f47] bg-[#0b1a30] px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="grid size-9 place-items-center rounded-lg bg-blue-600 text-white shadow-md">
              <ShieldAlert className="size-5" />
            </div>
            <div>
              <h3 id="report-crime-title" className="text-[16px] font-black text-white">
                File Crime Incident & Notify CPOs
              </h3>
              <p className="text-[11px] font-semibold text-steel-400">
                Automatic real-time broadcast will be dispatched to all 16 CPOs
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-steel-400 hover:bg-navy-800 hover:text-white transition-colors cursor-pointer"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Category & Severity Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-steel-300 mb-1.5">
                Crime Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CrimeCategory)}
                className="w-full rounded-lg border border-[#1e2f47] bg-[#0c1d35] px-3 py-2 text-[13px] font-bold text-white outline-none focus:border-blue-500"
              >
                {CRIME_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-steel-300 mb-1.5">
                Severity Level
              </label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value as Severity)}
                className="w-full rounded-lg border border-[#1e2f47] bg-[#0c1d35] px-3 py-2 text-[13px] font-bold text-white outline-none focus:border-blue-500"
              >
                {SEVERITIES.map((sev) => (
                  <option key={sev} value={sev}>
                    {sev}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Area & Date Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-steel-300 mb-1.5">
                Locality / Area
              </label>
              <select
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full rounded-lg border border-[#1e2f47] bg-[#0c1d35] px-3 py-2 text-[13px] font-bold text-white outline-none focus:border-blue-500"
              >
                {DEMO_AREAS.map((a) => (
                  <option key={a.name} value={a.name}>
                    {a.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-steel-300 mb-1.5">
                Incident Time
              </label>
              <input
                type="datetime-local"
                value={datetime}
                onChange={(e) => setDatetime(e.target.value)}
                className="w-full rounded-lg border border-[#1e2f47] bg-[#0c1d35] px-3 py-2 text-[12px] font-bold text-white outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-steel-300 mb-1.5">
              Incident Description & Field Notes
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Commercial break-in reported at Muthialpet bazaar. Perpetrators breached rear shutter. Officer unit en route."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-lg border border-[#1e2f47] bg-[#0c1d35] p-3 text-[12px] text-white placeholder-steel-500 outline-none focus:border-blue-500 font-sans leading-relaxed"
            />
          </div>

          {/* CPO Broadcast Callout */}
          <div className="rounded-xl border border-blue-500/50 bg-[#0e223f] p-3 flex items-start gap-3">
            <Radio className="size-5 text-sky-400 shrink-0 mt-0.5 animate-pulse" />
            <div className="text-[12px] leading-snug">
              <strong className="block text-white font-black">
                Automated CPO Emergency Dispatch Trigger
              </strong>
              <span className="text-steel-300 text-[11px]">
                Submitting will instantly broadcast an encrypted radio/terminal alert to all 16 Community Police Officers across all 11 territorial police stations.
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-[12px] font-bold text-steel-300 hover:text-white hover:bg-navy-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-[13px] font-bold text-white shadow-lg hover:bg-blue-500 hover:shadow-blue-500/30 transition-all cursor-pointer"
            >
              <Bell className="size-4 text-amber-300" />
              <span>Add Crime & Notify All CPOs</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
