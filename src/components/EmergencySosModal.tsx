import {
  CheckCircle2,
  ExternalLink,
  MapPin,
  Phone,
  PhoneCall,
  Radio,
  Send,
  ShieldAlert,
  Smartphone,
  X,
} from 'lucide-react'
import { useState } from 'react'
import type { CrimeIncident } from '../types'

interface EmergencySosModalProps {
  isOpen: boolean
  onClose: () => void
  onDispatchSos?: (incident: CrimeIncident) => void
}

const EMERGENCY_SERVICES = [
  {
    name: 'National Emergency ERSS',
    number: '112',
    desc: 'All-in-one Police, Fire & Medical hotline across India',
    badge: 'Primary 24x7',
    color: 'from-red-600 to-rose-700',
    tel: 'tel:112',
  },
  {
    name: 'Police Control Room (PCR)',
    number: '100 / 0413-2231301',
    desc: 'Direct line to Puducherry Central Police Dispatch',
    badge: 'Police PCR',
    color: 'from-blue-700 to-indigo-800',
    tel: 'tel:100',
  },
  {
    name: 'Women & Child Helpline',
    number: '1091 / 1098',
    desc: 'Immediate protective assistance & emergency escort',
    badge: 'Women Safety',
    color: 'from-purple-700 to-pink-800',
    tel: 'tel:1091',
  },
  {
    name: 'Fire & Emergency Rescue',
    number: '101',
    desc: 'Puducherry Fire Service & Hazmat Response',
    badge: 'Fire Rescue',
    color: 'from-amber-600 to-orange-700',
    tel: 'tel:101',
  },
  {
    name: 'Ambulance / Medical EMS',
    number: '108',
    desc: 'Government General Hospital Emergency Unit',
    badge: 'Medical EMS',
    color: 'from-emerald-700 to-teal-800',
    tel: 'tel:108',
  },
  {
    name: 'Coastal Marine Police',
    number: '1093',
    desc: 'Promenade beach and maritime distress response',
    badge: 'Coastal Patrol',
    color: 'from-cyan-700 to-blue-800',
    tel: 'tel:1093',
  },
]

export function EmergencySosModal({
  isOpen,
  onClose,
  onDispatchSos,
}: EmergencySosModalProps) {
  const [distressTriggered, setDistressTriggered] = useState(false)
  const [distressLocation, setDistressLocation] = useState('White Town, Goubert Avenue')
  const [distressNotes, setDistressNotes] = useState('')

  if (!isOpen) return null

  const handleTriggerSosBeacon = () => {
    const timestamp = new Date()

    const emergencyIncident: CrimeIncident = {
      id: `sos-${Date.now()}`,
      category: 'Assault',
      severity: 'Critical',
      status: 'Under Investigation',
      occurredAt: timestamp.toISOString(),
      area: distressLocation,
      lat: 11.9338,
      lng: 79.8358,
      description: `[EMERGENCY SOS BEACON DISPATCHED] Instant distress trigger from Emergency SOS App. Location: ${distressLocation}. Distress notes: ${distressNotes || 'Immediate police intervention requested'}. Priority 1 tactical patrol units and all CPOs alerted.`,
      isDemo: true,
    }

    if (onDispatchSos) {
      onDispatchSos(emergencyIncident)
    }

    setDistressTriggered(true)
  }

  const handleResetModal = () => {
    setDistressTriggered(false)
    setDistressNotes('')
    onClose()
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="emergency-sos-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative flex flex-col max-h-[92vh] w-full max-w-3xl overflow-hidden rounded-2xl border-2 border-red-500/80 bg-[#091322] shadow-[0_0_60px_rgba(239,68,68,0.4)] text-slate-100 font-sans">
        {/* Urgent Header */}
        <div className="relative flex items-center justify-between border-b border-red-500/40 bg-gradient-to-r from-[#450a0a] via-[#1c0f18] to-[#0b1c33] px-4 sm:px-6 py-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative flex size-10 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white shadow-lg shadow-red-600/50">
              <PhoneCall className="size-5 animate-bounce" />
              <span className="absolute -top-1 -right-1 flex size-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-300 opacity-80" />
                <span className="relative inline-flex size-3 rounded-full bg-amber-400" />
              </span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2
                  id="emergency-sos-modal-title"
                  className="text-[17px] sm:text-[19px] font-black uppercase tracking-tight text-white truncate"
                >
                  Emergency SOS App Connection
                </h2>
                <span className="rounded bg-red-500/20 border border-red-400/50 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-red-300">
                  112 ERSS
                </span>
              </div>
              <p className="text-[11px] sm:text-[12px] font-medium text-slate-300 truncate">
                Emergency Response Support System &middot; Puducherry Police Control Room
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleResetModal}
            className="rounded-lg p-2 text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close emergency modal"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto scroll-thin p-4 sm:p-6 space-y-5">
          {distressTriggered ? (
            <div className="rounded-xl border-2 border-emerald-500 bg-emerald-950/60 p-5 text-center space-y-3 animate-in zoom-in-95 duration-200">
              <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/40">
                <CheckCircle2 className="size-8" />
              </div>
              <h3 className="text-xl font-black text-white">
                EMERGENCY SOS DISTRESS SIGNAL BROADCAST!
              </h3>
              <p className="text-sm font-semibold text-emerald-200 max-w-lg mx-auto">
                Signal transmitted directly to Puducherry Central Police Control Room (PCR), all 16
                Beat CPOs, and closest active patrol vehicles.
              </p>
              <div className="rounded-lg bg-black/40 border border-emerald-400/40 p-3 text-left font-mono text-xs space-y-1 text-slate-200">
                <p>
                  <strong className="text-emerald-400">Dispatch Target:</strong> Puducherry Central
                  PCR &middot; Sector CPO Grid
                </p>
                <p>
                  <strong className="text-emerald-400">Location:</strong> {distressLocation}
                </p>
                <p>
                  <strong className="text-emerald-400">Status:</strong> Priority 1 Urgent Intercept
                  Dispatched
                </p>
              </div>
              <div className="pt-2 flex justify-center gap-3">
                <a
                  href="tel:112"
                  className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg hover:bg-red-500"
                >
                  <Phone className="size-4" /> Call 112 Now
                </a>
                <button
                  type="button"
                  onClick={() => setDistressTriggered(false)}
                  className="rounded-lg bg-slate-800 border border-slate-700 px-4 py-2.5 text-sm font-bold text-slate-200 hover:bg-slate-700"
                >
                  Back to SOS Options
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Card 1: Immediate Pan-India 112 Hotline */}
              <div className="relative overflow-hidden rounded-xl border border-red-500/50 bg-gradient-to-r from-red-950/90 via-[#1f0e15] to-[#0c1a2f] p-4 sm:p-5 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <ShieldAlert className="size-5 text-red-400" />
                      <span className="text-[15px] font-black text-white tracking-wide uppercase">
                        Immediate Life &amp; Safety Hotline
                      </span>
                    </div>
                    <p className="text-xs font-medium text-slate-300 max-w-md">
                      Dial 112 to connect immediately with Puducherry Central Police dispatchers for
                      active crimes, medical crises, accidents, or urgent police intervention.
                    </p>
                  </div>
                  <a
                    href="tel:112"
                    className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 px-6 py-3.5 text-base font-black text-white shadow-xl shadow-red-600/40 hover:from-red-500 hover:to-rose-500 hover:scale-105 active:scale-95 transition-all text-center"
                  >
                    <Phone className="size-5 animate-pulse" />
                    <span>CALL 112 IMMEDIATELY</span>
                  </a>
                </div>
              </div>

              {/* Card 2: Official 112 India App Connectivity */}
              <div className="rounded-xl border border-blue-500/30 bg-[#0e1d35]/90 p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Smartphone className="size-5 text-sky-400" />
                    <h3 className="text-sm font-black uppercase tracking-wider text-white">
                      Official 112 India SOS Mobile App
                    </h3>
                  </div>
                  <span className="rounded bg-sky-500/20 px-2 py-0.5 text-[10px] font-bold text-sky-300">
                    ERSS Pan-India
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  The official <strong>112 India</strong> mobile application enables citizens in
                  Puducherry to transmit instant distress signals with live GPS coordinates, stream
                  live incident audio, and automatically alert family contacts.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                  <a
                    href="https://play.google.com/store/apps/details?id=in.cdac.erss"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between gap-2 rounded-lg border border-slate-700 bg-[#091322] px-3.5 py-2.5 text-xs font-bold text-slate-200 hover:bg-slate-800 hover:text-white hover:border-slate-500 transition-all cursor-pointer"
                  >
                    <span className="truncate">Download for Android (Google Play)</span>
                    <ExternalLink className="size-3.5 shrink-0 text-sky-400" />
                  </a>

                  <a
                    href="https://apps.apple.com/in/app/112-india/id1448833959"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between gap-2 rounded-lg border border-slate-700 bg-[#091322] px-3.5 py-2.5 text-xs font-bold text-slate-200 hover:bg-slate-800 hover:text-white hover:border-slate-500 transition-all cursor-pointer"
                  >
                    <span className="truncate">Download for iOS (App Store)</span>
                    <ExternalLink className="size-3.5 shrink-0 text-sky-400" />
                  </a>

                  <a
                    href="https://112.gov.in/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between gap-2 rounded-lg border border-slate-700 bg-[#091322] px-3.5 py-2.5 text-xs font-bold text-slate-200 hover:bg-slate-800 hover:text-white hover:border-slate-500 transition-all cursor-pointer"
                  >
                    <span className="truncate">Visit Official 112 Portal</span>
                    <ExternalLink className="size-3.5 shrink-0 text-sky-400" />
                  </a>
                </div>
              </div>

              {/* Card 3: Instant Distress Beacon Transmitter */}
              <div className="rounded-xl border border-amber-500/40 bg-gradient-to-r from-amber-950/30 via-[#151c2c] to-[#0c1a2f] p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Radio className="size-5 text-amber-400 animate-pulse" />
                    <h3 className="text-sm font-black uppercase tracking-wider text-white">
                      Instant Distress Beacon (Police &amp; Patrol Alert)
                    </h3>
                  </div>
                  <span className="rounded bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                    Live Dispatch
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  Transmit an urgent distress alert to the central system now. This triggers an
                  immediate high-priority incident, notifies all 16 Beat CPOs across Puducherry, and
                  alerts moving patrol units.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                      Distress Location (Puducherry)
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-2.5 top-2.5 size-4 text-sky-400" />
                      <input
                        type="text"
                        value={distressLocation}
                        onChange={(e) => setDistressLocation(e.target.value)}
                        className="w-full rounded-lg border border-slate-700 bg-[#081220] pl-8 pr-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-amber-400"
                        placeholder="e.g. White Town, Goubert Avenue"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                      Optional Situation Note
                    </label>
                    <input
                      type="text"
                      value={distressNotes}
                      onChange={(e) => setDistressNotes(e.target.value)}
                      className="w-full rounded-lg border border-slate-700 bg-[#081220] px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-amber-400"
                      placeholder="e.g. Stalker sighted / medical distress"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleTriggerSosBeacon}
                    className="w-full flex items-center justify-center gap-2.5 rounded-xl border border-amber-400/80 bg-gradient-to-r from-amber-600 via-red-600 to-rose-700 py-3 text-sm font-black text-white shadow-lg hover:from-amber-500 hover:to-rose-600 active:scale-[0.99] transition-all cursor-pointer"
                  >
                    <Send className="size-4" />
                    <span>TRANSMIT INSTANT DISTRESS BEACON TO ALL CPOs &amp; PATROLS</span>
                  </button>
                </div>
              </div>

              {/* Card 4: Puducherry Direct Emergency Helplines Directory */}
              <div className="space-y-2.5">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Direct Puducherry Emergency Helplines
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {EMERGENCY_SERVICES.map((service) => (
                    <a
                      key={service.name}
                      href={service.tel}
                      className="flex flex-col justify-between rounded-xl border border-slate-800 bg-[#091526] p-3 hover:border-slate-600 hover:bg-[#0d1d35] transition-all group"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="text-[11px] font-black uppercase tracking-wide text-white group-hover:text-amber-300 transition-colors">
                            {service.name}
                          </span>
                          <span className="rounded bg-white/10 px-1.5 py-0.5 text-[9px] font-bold text-slate-300">
                            {service.badge}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-tight">{service.desc}</p>
                      </div>
                      <div className="mt-2.5 flex items-center justify-between border-t border-slate-800 pt-2">
                        <span className="font-mono text-xs font-black text-amber-400">
                          {service.number}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-sky-400 group-hover:translate-x-0.5 transition-transform">
                          <Phone className="size-3" /> Tap to Call
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between border-t border-slate-800 bg-[#070f1a] px-4 sm:px-6 py-3">
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>24/7 Police Dispatch Active &middot; Puducherry</span>
          </div>

          <button
            type="button"
            onClick={handleResetModal}
            className="rounded-lg bg-slate-800 px-4 py-1.5 text-xs font-bold text-slate-200 hover:bg-slate-700 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
