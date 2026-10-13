import { CriticalAlertButton } from './CriticalAlertButton'
import { EmergencySosButton } from './EmergencySosButton'

interface OfficialGovBannerProps {
  onOpenCriticalAlert?: () => void
  onOpenEmergencySos?: () => void
}

/** Top Header Banner for Puducherry Police Department and Critical Alert / Emergency SOS dispatch */
export function OfficialGovBanner({
  onOpenCriticalAlert,
  onOpenEmergencySos,
}: OfficialGovBannerProps = {}) {
  return (
    <div className="bg-[#0b1320] text-slate-200 border-b border-slate-800 text-[11px] sm:text-[12px] font-sans">
      <div className="max-w-[1920px] mx-auto px-3 sm:px-4 py-1.5 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-[13px] leading-none shrink-0" aria-hidden>
            🇮🇳
          </span>
          <span className="font-medium text-slate-300 truncate">
            <strong className="font-bold text-white">Puducherry Police Department</strong> | Government of Puducherry
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {onOpenEmergencySos && (
            <EmergencySosButton onClick={onOpenEmergencySos} compact />
          )}
          {onOpenCriticalAlert && (
            <CriticalAlertButton onClick={onOpenCriticalAlert} />
          )}
        </div>
      </div>
    </div>
  )
}
