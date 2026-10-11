import { ArrowRight, Radar, X } from 'lucide-react'
import type { ChangeReport, ChangeSignal } from '../types'
import { formatNumber, formatPercent } from '../utils/format'
import { DemoChip } from './ui/Badge'

const SEVERITY_STYLES: Record<ChangeSignal['severity'], { dot: string; border: string; text: string }> = {
  high: { dot: 'bg-risk-critical', border: 'border-risk-critical/40', text: 'text-risk-critical' },
  medium: { dot: 'bg-risk-high', border: 'border-risk-high/40', text: 'text-risk-high' },
  low: { dot: 'bg-risk-medium', border: 'border-risk-medium/40', text: 'text-risk-medium' },
}

const KIND_LABEL: Record<ChangeSignal['kind'], string> = {
  rising: 'Rising',
  emerging: 'Emerging',
  declining: 'Declining',
}

interface WhatChangedPanelProps {
  report: ChangeReport
  onFocusArea: (area: string) => void
  onClose?: () => void
}

/** "What changed?" - significant differences between the two analysis windows. */
export function WhatChangedPanel({ report, onFocusArea, onClose }: WhatChangedPanelProps) {
  const rising = report.signals.filter((signal) => signal.kind === 'rising').length
  const emerging = report.signals.filter((signal) => signal.kind === 'emerging').length
  const declining = report.signals.filter((signal) => signal.kind === 'declining').length

  return (
    <section className="rounded-xl border border-slate-200/90 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.25)] text-slate-900 font-serif">
      <header className="flex items-start justify-between gap-3 border-b border-slate-100 px-4 py-3">
        <div className="min-w-0">
          <h2 className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.14em] text-blue-950 font-serif">
            <span className="grid size-5 place-items-center rounded bg-amber-500/15 text-amber-700">
              <Radar className="size-3.5" aria-hidden />
            </span>
            Significant changes
          </h2>
          <p className="mt-1 text-[11px] text-slate-500 font-serif">
            {report.window.recentLabel} compared with {report.window.previousLabel}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span
            className={`rounded-md border px-2 py-1 text-[11px] font-bold ${
              report.overallDeltaPercent > 0
                ? 'border-risk-critical/40 bg-risk-critical/10 text-risk-critical'
                : report.overallDeltaPercent < 0
                  ? 'border-risk-low/40 bg-risk-low/10 text-risk-low'
                  : 'border-slate-200 bg-slate-100 text-slate-700'
            }`}
            title="City-wide change between the two windows"
          >
            {formatPercent(report.overallDeltaPercent)} city-wide
          </span>
          {onClose ? (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close changes panel"
              className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            >
              <X className="size-4" />
            </button>
          ) : null}
        </div>
      </header>

      <div className="p-4">
        <p className="text-[12px] leading-relaxed text-slate-600 font-serif">
          {formatNumber(report.recentTotal)} incidents in the recent window vs{' '}
          {formatNumber(report.previousTotal)} in the previous window · {rising} rising,{' '}
          {emerging} emerging, {declining} declining.
        </p>

        {report.signals.length === 0 ? (
          <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-6 text-center font-serif">
            <p className="text-[13px] font-bold text-slate-800">No significant changes</p>
            <p className="mt-1 text-[11px] text-slate-500">
              Every locality is within the significance thresholds for this window.
            </p>
          </div>
        ) : (
          <ul className="mt-3 space-y-2 font-serif">
            {report.signals.map((signal) => {
              const style = SEVERITY_STYLES[signal.severity]
              return (
                <li
                  key={signal.id}
                  className={`flex flex-wrap items-center gap-x-3 gap-y-2 rounded-lg border ${style.border} bg-slate-50/90 px-3 py-2.5 shadow-xs`}
                >
                  <span className={`size-2.5 shrink-0 rounded-full ${style.dot}`} aria-hidden />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[13px] font-bold text-slate-900">{signal.area}</span>
                      <span
                        className={`rounded border border-slate-200 px-1.5 py-px text-[9px] font-bold uppercase tracking-[0.12em] ${style.text}`}
                      >
                        {KIND_LABEL[signal.kind]}
                      </span>
                      <span className="font-mono text-[10px] text-slate-500 font-bold">
                        {signal.kind === 'declining'
                          ? formatPercent(signal.deltaPercent)
                          : signal.kind === 'emerging'
                            ? 'NEW'
                            : formatPercent(signal.deltaPercent)}
                      </span>
                    </div>
                    <p className="mt-0.5 truncate text-[12px] font-medium text-slate-800">{signal.headline}</p>
                    <p className="mt-0.5 text-[10px] leading-snug text-slate-500">{signal.detail}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onFocusArea(signal.area)}
                    className="inline-flex shrink-0 items-center gap-1 text-[10px] font-semibold text-blue-400 hover:text-blue-300"
                  >
                    View on map <ArrowRight className="size-3" aria-hidden />
                  </button>
                </li>
              )
            })}
          </ul>
        )}

        <div className="mt-3 flex items-center justify-between gap-2 border-t border-navy-700 pt-2">
          <span className="text-[10px] leading-relaxed text-steel-600">
            Thresholds: rise ≥ 25%, decline ≥ 15%, emerging = no incidents previously.
          </span>
          <DemoChip compact />
        </div>
      </div>
    </section>
  )
}
