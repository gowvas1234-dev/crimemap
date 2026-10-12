import { ChevronDown, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import { CriticalAlertButton } from './CriticalAlertButton'

interface OfficialGovBannerProps {
  onOpenCriticalAlert?: () => void
}

/** Official Government Top Banner matching the federal/state police portal standard in bk-image.png */
export function OfficialGovBanner({ onOpenCriticalAlert }: OfficialGovBannerProps = {}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="bg-[#0b1320] text-slate-200 border-b border-slate-800 text-[11px] sm:text-[12px] font-sans">
      <div className="max-w-[1920px] mx-auto px-3 sm:px-4 py-1.5 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-[13px] leading-none shrink-0" aria-hidden>
            🇮🇳
          </span>
          <span className="font-medium text-slate-300 truncate">
            An official portal of the{' '}
            <strong className="font-bold text-white">Puducherry Police Department</strong> |
            Government of Puducherry
          </span>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {onOpenCriticalAlert && (
            <CriticalAlertButton onClick={onOpenCriticalAlert} />
          )}

          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="hidden sm:inline-flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer select-none"
          >
            <span>Official Intelligence Portal</span>
            <ChevronDown
              className={`size-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
              aria-hidden
            />
          </button>
        </div>
      </div>

      {open ? (
        <div className="bg-[#070e18] border-t border-slate-800/80 px-4 py-2.5 text-[11px] text-slate-300">
          <div className="max-w-7xl mx-auto flex items-start gap-2.5">
            <ShieldCheck className="size-4 text-emerald-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Official government domain:</strong> This portal provides authorized crime
              intelligence data, incident trends, and patrol telemetry for Puducherry Union
              Territory. All records presented are verified for police decision-support.
            </p>
          </div>
        </div>
      ) : null}
    </div>
  )
}
