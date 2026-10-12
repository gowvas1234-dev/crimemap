import {
  Bell,
  CheckCircle2,
  Clock,
  Landmark,
  MapPin,
  Radio,
  Search,
  ShieldAlert,
  UserCheck,
  X,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import type { CPONotification } from '../types'

const SEVERITY_BADGE: Record<string, { bg: string; border: string; text: string }> = {
  Low: { bg: 'rgba(45, 106, 79, 0.2)', border: 'rgba(45, 106, 79, 0.5)', text: '#6ee7b7' },
  Medium: { bg: 'rgba(180, 83, 9, 0.2)', border: 'rgba(180, 83, 9, 0.5)', text: '#fde047' },
  High: { bg: 'rgba(194, 65, 12, 0.2)', border: 'rgba(194, 65, 12, 0.5)', text: '#fdba74' },
  Critical: { bg: 'rgba(153, 27, 27, 0.2)', border: 'rgba(153, 27, 27, 0.5)', text: '#fca5a5' },
}

interface CpoNotificationModalProps {
  isOpen: boolean
  notification: CPONotification | null
  notificationsList: CPONotification[]
  onSelectNotification?: (notification: CPONotification) => void
  onClose: () => void
}

/**
 * Tactical Central Emergency Dispatch Modal.
 * Displays detailed confirmation of all Community Police Officers (CPOs)
 * receiving real-time notifications for newly reported crimes.
 */
export function CpoNotificationModal({
  isOpen,
  notification,
  notificationsList,
  onSelectNotification,
  onClose,
}: CpoNotificationModalProps) {
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState<'roster' | 'history'>('roster')

  const currentNotification = notification || notificationsList[0] || null

  const filteredRecipients = useMemo(() => {
    if (!currentNotification) return []
    const term = search.toLowerCase().trim()
    if (!term) return currentNotification.recipients
    return currentNotification.recipients.filter(
      (r) =>
        r.cpoName.toLowerCase().includes(term) ||
        r.stationName.toLowerCase().includes(term) ||
        r.beatArea.toLowerCase().includes(term) ||
        r.badgeNumber.toLowerCase().includes(term) ||
        r.callsign.toLowerCase().includes(term),
    )
  }, [currentNotification, search])

  if (!isOpen || !currentNotification) return null

  const severityStyle = SEVERITY_BADGE[currentNotification.severity] || SEVERITY_BADGE.Medium

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cpo-modal-title"
      className="fixed inset-0 z-[10000] flex items-center justify-center p-3 sm:p-5 font-sans"
    >
      {/* Dark backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 flex flex-col w-full max-w-4xl max-h-[92vh] overflow-hidden rounded-2xl border-2 border-blue-500/60 bg-[#081220] shadow-[0_20px_70px_rgba(0,0,0,0.9)] text-white">
        {/* Top Emergency Flash Header */}
        <div className="flex items-center justify-between border-b border-[#1e2f47] bg-[#0b1a30] px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src="/pp-logo-2.webp"
              alt="Puducherry Police"
              className="size-9 object-contain drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] shrink-0"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 id="cpo-modal-title" className="text-[16px] font-black tracking-tight text-white">
                  CPO Central Emergency Dispatch Network
                </h3>
                <span className="inline-flex items-center gap-1 rounded bg-blue-600 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-white">
                  <Radio className="size-3 animate-pulse" />
                  Live Broadcast
                </span>
              </div>
              <p className="text-[11px] font-semibold text-steel-400 truncate">
                Puducherry Police Department &middot; Automated Dispatch to All Community Police Officers
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

        {/* Telemetry Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 border-b border-[#1e2f47] bg-[#0d1f38] p-3 text-[12px] font-sans">
          <div className="flex items-center gap-2 rounded-lg bg-[#081220] p-2 border border-[#1e2f47]">
            <UserCheck className="size-4 text-emerald-400 shrink-0" />
            <div className="min-w-0">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-steel-400">
                All CPOs Alerted
              </span>
              <strong className="text-[13px] font-black text-white">
                {currentNotification.totalCposNotified} Officers (100%)
              </strong>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-lg bg-[#081220] p-2 border border-[#1e2f47]">
            <Landmark className="size-4 text-sky-400 shrink-0" />
            <div className="min-w-0">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-steel-400">
                Stations Reached
              </span>
              <strong className="text-[13px] font-black text-white">
                {currentNotification.totalStationsAlerted} Police Stations
              </strong>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-lg bg-[#081220] p-2 border border-[#1e2f47]">
            <Radio className="size-4 text-amber-400 shrink-0" />
            <div className="min-w-0">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-steel-400">
                CAD Frequency
              </span>
              <strong className="text-[13px] font-black text-white">
                154.650 MHz / MDT Mesh
              </strong>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-lg bg-[#081220] p-2 border border-[#1e2f47]">
            <Clock className="size-4 text-blue-400 shrink-0" />
            <div className="min-w-0">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-steel-400">
                Delivery Latency
              </span>
              <strong className="text-[13px] font-black text-emerald-400">
                &lt; 0.5s (Instant)
              </strong>
            </div>
          </div>
        </div>

        {/* Current Incident Highlight Card */}
        <div className="p-3 sm:p-4 border-b border-[#1e2f47] bg-[#091629]">
          <div className="rounded-xl border border-blue-500/40 bg-[#0c1e38] p-3 sm:p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="grid size-7 place-items-center rounded-lg bg-blue-600 text-white shadow-xs">
                  <ShieldAlert className="size-4" />
                </span>
                <div>
                  <span className="text-[11px] font-mono font-bold text-sky-300">
                    FIR / Incident #{currentNotification.incidentId}
                  </span>
                  <h4 className="text-[15px] font-black text-white leading-tight">
                    {currentNotification.category} Incident
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className="rounded-full px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wider border shadow-xs"
                  style={{
                    backgroundColor: severityStyle.bg,
                    borderColor: severityStyle.border,
                    color: severityStyle.text,
                  }}
                >
                  {currentNotification.severity} Severity
                </span>
                <span className="rounded bg-navy-950 px-2 py-0.5 text-[11px] font-mono font-bold text-amber-400 border border-navy-800">
                  Risk: {currentNotification.riskScore}
                </span>
              </div>
            </div>

            <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-steel-200">
              <span className="flex items-center gap-1.5 font-bold">
                <MapPin className="size-3.5 text-amber-400 shrink-0" />
                Locality: <strong className="text-white">{currentNotification.area}</strong>
              </span>
              <span className="flex items-center gap-1.5 text-steel-300">
                <Clock className="size-3.5 text-sky-400 shrink-0" />
                Occurred: {new Date(currentNotification.occurredAt).toLocaleString()}
              </span>
            </div>

            <p className="mt-2 rounded-lg bg-[#07111e] p-2.5 text-[12px] font-medium text-steel-200 leading-relaxed border border-[#192b45]">
              {currentNotification.description}
            </p>
          </div>
        </div>

        {/* Tab Switcher & Search Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 border-b border-[#1e2f47] bg-[#081220]">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('roster')}
              className={`rounded-lg px-3 py-1.5 text-[12px] font-bold transition-all cursor-pointer ${
                activeTab === 'roster'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-steel-400 hover:text-white hover:bg-navy-800'
              }`}
            >
              All CPO Recipients ({currentNotification.recipients.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('history')}
              className={`rounded-lg px-3 py-1.5 text-[12px] font-bold transition-all cursor-pointer ${
                activeTab === 'history'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-steel-400 hover:text-white hover:bg-navy-800'
              }`}
            >
              Broadcast History ({notificationsList.length})
            </button>
          </div>

          {activeTab === 'roster' && (
            <div className="relative min-w-[200px] flex-1 sm:max-w-xs">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-steel-400" />
              <input
                type="text"
                placeholder="Search CPO, station, or beat..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-[#1e2f47] bg-[#0b1a30] pl-8 pr-3 py-1 text-[12px] text-white placeholder-steel-500 outline-none focus:border-blue-500"
              />
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto scroll-thin p-3 sm:p-4">
          {activeTab === 'roster' ? (
            <div className="grid gap-2 sm:grid-cols-2">
              {filteredRecipients.map((recipient) => {
                const isResponding = recipient.status === 'Responding'

                return (
                  <div
                    key={recipient.cpoId}
                    className={`rounded-xl border p-3 transition-all ${
                      isResponding
                        ? 'border-amber-500/60 bg-[#162136] shadow-md shadow-amber-950/20'
                        : 'border-[#1e2f47] bg-[#0b1a30] hover:border-blue-500/40'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div
                          className={`grid size-8 place-items-center rounded-lg font-mono text-[11px] font-black shrink-0 ${
                            isResponding
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                              : 'bg-blue-600/20 text-sky-300 border border-blue-500/40'
                          }`}
                        >
                          CPO
                        </div>
                        <div className="min-w-0">
                          <h5 className="truncate text-[13px] font-black text-white">
                            {recipient.cpoName}
                          </h5>
                          <span className="block text-[10px] font-semibold text-steel-400">
                            {recipient.rank} &middot; {recipient.badgeNumber}
                          </span>
                        </div>
                      </div>

                      {/* Delivery Status Badge */}
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide shrink-0 ${
                          isResponding
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                        }`}
                      >
                        <CheckCircle2 className="size-3" />
                        {recipient.status}
                      </span>
                    </div>

                    <div className="mt-2.5 grid grid-cols-2 gap-1.5 text-[11px] border-t border-[#192b45] pt-2">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-steel-400 block">
                          Station
                        </span>
                        <span className="text-white font-bold truncate block">
                          {recipient.stationName}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-steel-400 block">
                          Callsign / Device
                        </span>
                        <span className="text-sky-300 font-mono font-bold truncate block">
                          {recipient.callsign} &middot; {recipient.device}
                        </span>
                      </div>
                    </div>

                    <div className="mt-1.5 flex items-center justify-between text-[10px] text-steel-400">
                      <span className="truncate">Beat: {recipient.beatArea}</span>
                      <span className="font-mono text-emerald-400 shrink-0">
                        Delivered: {recipient.deliveredAt}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="space-y-2">
              {notificationsList.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectNotification && onSelectNotification(item)}
                  className={`flex flex-wrap items-center justify-between gap-3 rounded-xl border p-3 cursor-pointer transition-all ${
                    item.id === currentNotification.id
                      ? 'border-blue-500 bg-[#10223d]'
                      : 'border-[#1e2f47] bg-[#0b1a30] hover:bg-[#0f2444]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="grid size-8 place-items-center rounded-lg bg-blue-600/30 border border-blue-500 text-sky-300">
                      <Bell className="size-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] font-black text-white">{item.category}</span>
                        <span className="text-[11px] font-mono text-steel-400 font-bold">
                          {item.incidentId}
                        </span>
                      </div>
                      <span className="text-[11px] text-steel-300 font-semibold">
                        Locality: {item.area} &middot; Broadcasted to all {item.totalCposNotified} CPOs
                      </span>
                    </div>
                  </div>

                  <span className="text-[11px] font-mono text-steel-400">
                    {new Date(item.dispatchedAt).toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between border-t border-[#1e2f47] bg-[#0b1a30] px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2 text-[11px] text-steel-400 font-medium">
            <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Puducherry Central CAD: All Community Police Officers Linked</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-blue-600 px-4 py-2 text-[13px] font-bold text-white hover:bg-blue-500 transition-colors cursor-pointer"
          >
            Close Broadcast View
          </button>
        </div>
      </div>
    </div>
  )
}
