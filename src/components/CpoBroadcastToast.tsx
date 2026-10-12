import { Bell, Radio, ShieldAlert, X } from 'lucide-react'
import { useEffect } from 'react'
import type { CPONotification } from '../types'

interface CpoBroadcastToastProps {
  notification: CPONotification | null
  onOpenDetails: (notification: CPONotification) => void
  onDismiss: () => void
}

/**
 * High-visibility tactical alert toast displayed immediately when a new crime is added.
 * Informs the user that all Community Police Officers (CPOs) across all stations have been notified.
 */
export function CpoBroadcastToast({
  notification,
  onOpenDetails,
  onDismiss,
}: CpoBroadcastToastProps) {
  useEffect(() => {
    if (!notification) return

    // Automatically auto-dismiss after 10 seconds if not clicked
    const timer = setTimeout(() => {
      onDismiss()
    }, 10000)

    return () => clearTimeout(timer)
  }, [notification, onDismiss])

  if (!notification) return null

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="fixed top-3 right-3 sm:top-5 sm:right-5 z-[9999] max-w-md w-[calc(100vw-24px)] pointer-events-auto select-none animate-in fade-in slide-in-from-top-4 duration-300 font-sans"
    >
      <div className="relative overflow-hidden rounded-xl border-2 border-blue-400 bg-[#081220] p-4 shadow-[0_15px_50px_rgba(0,0,0,0.85)] ring-1 ring-blue-500/50">
        {/* Animated Police Flash Bar */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-blue-500 via-sky-300 to-amber-400 animate-pulse" />

        <div className="flex items-start justify-between gap-3 pt-1">
          <div className="flex items-start gap-3 min-w-0">
            {/* Siren Beacon Icon */}
            <div className="grid size-10 place-items-center rounded-lg bg-blue-600 border border-blue-400/80 text-white shrink-0 shadow-[0_0_15px_rgba(59,130,246,0.6)]">
              <ShieldAlert className="size-6 animate-pulse" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-black uppercase tracking-wider bg-blue-500/20 text-sky-300 border border-blue-500/40">
                  <Radio className="size-3 animate-spin text-sky-400" />
                  CAD CPO Broadcast
                </span>
                <span className="text-[11px] font-mono text-steel-400 font-bold">
                  {notification.incidentId}
                </span>
              </div>

              <h4 className="mt-1 text-[14px] font-black leading-tight text-white">
                🚨 New Crime Dispatched to All CPOs!
              </h4>

              <p className="mt-1 text-[12px] font-semibold text-steel-200 leading-snug">
                <strong className="text-amber-300">{notification.category}</strong> reported in{' '}
                <strong className="text-white">{notification.area}</strong>.
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[11px] font-bold text-sky-300">
                <span className="inline-flex items-center gap-1 rounded bg-[#0f2444] px-2 py-0.5 border border-blue-500/30">
                  <Bell className="size-3 text-amber-400" />
                  {notification.totalCposNotified} CPOs Notified
                </span>
                <span className="inline-flex items-center gap-1 rounded bg-[#0f2444] px-2 py-0.5 border border-blue-500/30">
                  {notification.totalStationsAlerted} Stations Alerted
                </span>
              </div>
            </div>
          </div>

          {/* Dismiss button */}
          <button
            type="button"
            onClick={onDismiss}
            className="rounded-md p-1 text-steel-400 hover:text-white hover:bg-navy-800 transition-colors cursor-pointer"
            aria-label="Dismiss alert"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Action Button */}
        <div className="mt-3.5 flex items-center justify-between gap-2 border-t border-[#1e2f47] pt-2.5">
          <span className="text-[10px] font-mono text-steel-400">
            Puducherry Police Real-Time Dispatch
          </span>
          <button
            type="button"
            onClick={() => onOpenDetails(notification)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-[12px] font-bold text-white shadow-md hover:bg-blue-500 hover:shadow-blue-500/30 transition-all cursor-pointer"
          >
            <span>View All CPOs Status</span>
            <span aria-hidden>&rarr;</span>
          </button>
        </div>
      </div>
    </div>
  )
}
