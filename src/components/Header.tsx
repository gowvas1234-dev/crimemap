import { Bell, Calendar, ChevronDown, MapPin, Search } from 'lucide-react'
import { ALL_AREAS } from '../utils/filters'
import type { DateRange } from '../types'

interface HeaderProps {
  area: string
  areas: string[]
  onAreaChange: (area: string) => void
  searchQuery: string
  onSearchChange: (query: string) => void
  dateRange: DateRange
  onDateRangeChange: (range: DateRange) => void
  compact?: boolean
}

const CONTROL_CLASS =
  'h-9 rounded-lg border border-navy-600 bg-navy-800 text-[13px] text-steel-200 outline-none transition-colors hover:border-navy-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/40 font-sans'

export function Header({
  area,
  areas,
  onAreaChange,
  searchQuery,
  onSearchChange,
  dateRange,
  onDateRangeChange,
  compact = false,
}: HeaderProps) {
  return (
    <header
      className="border-b px-3 py-3 sm:px-4 font-sans transition-colors duration-250"
      style={{
        backgroundColor: 'var(--header-bg)',
        borderColor: 'var(--header-border)',
      }}
    >
      <div className="flex items-center gap-2.5">
        <div className="relative shrink-0">
          <div className="absolute -inset-1 rounded-full bg-amber-500/20 blur-xs" />
          <img
            src="/pp-logo-2.webp"
            alt="Puducherry Police Emblem"
            className="relative size-9 object-contain drop-shadow-[0_0_8px_rgba(217,119,6,0.5)]"
          />
        </div>
        <div className="min-w-0 flex-1">
          <h1
            className="truncate text-[15px] font-bold leading-tight tracking-wider font-sans sm:text-[16px] transition-colors"
            style={{ color: 'var(--text-main)' }}
          >
            Puducherry Crime Intelligence
          </h1>
          <p
            className="mt-0.5 flex items-center gap-1 truncate text-[12px] transition-colors"
            style={{ color: 'var(--text-muted)' }}
          >
            <MapPin className="size-3.5 shrink-0 text-amber-500" aria-hidden />
            Viewing:{' '}
            <span
              className="font-bold uppercase tracking-wider transition-colors"
              style={{ color: 'var(--text-main)' }}
            >
              {area}
            </span>
          </p>
        </div>

        <div
          className="hidden items-center gap-1 rounded-lg border p-2 md:flex transition-colors"
          style={{
            borderColor: 'var(--header-border)',
            backgroundColor: 'var(--header-bg)',
            color: 'var(--text-muted)',
          }}
        >
          <Bell className="size-4" aria-hidden />
        </div>

        <div className="flex shrink-0 items-center gap-2 rounded-lg border border-navy-600 bg-navy-800 py-1 pl-1 pr-1 sm:pr-3">
          <span className="grid size-7 place-items-center rounded-md bg-gradient-to-br from-[#1e3a8a] to-[#0b1a30] text-[11px] font-bold text-amber-300 font-sans">
            DA
          </span>
          <span className="hidden leading-tight sm:block font-sans">
            <span className="block text-[12px] font-bold text-steel-100">Demo Analyst</span>
            <span className="block text-[10px] text-steel-200 font-medium">Analysis Cell</span>
          </span>
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
        <label className="relative w-full sm:w-56">
          <Search
            className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-steel-200"
            aria-hidden
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search incidents, areas, IDs…"
            aria-label="Search incidents"
            className={`${CONTROL_CLASS} w-full pl-8 pr-3`}
          />
        </label>

        {compact ? null : (
          <>
            <label className="relative w-full sm:w-auto">
              <select
                value={area}
                onChange={(event) => onAreaChange(event.target.value)}
                aria-label="Select area"
                className={`${CONTROL_CLASS} w-full appearance-none py-0 pl-3 pr-8 sm:w-auto`}
              >
                <option value={ALL_AREAS}>{ALL_AREAS}</option>
                {areas.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-2 top-1/2 size-3.5 -translate-y-1/2 text-steel-200"
                aria-hidden
              />
            </label>

            <div className="flex w-full items-center gap-1.5 rounded-lg border border-navy-600 bg-navy-800 px-2.5 py-1.5 sm:w-auto font-sans">
              <Calendar className="size-3.5 shrink-0 text-steel-200" aria-hidden />
              <input
                type="date"
                value={dateRange.from}
                max={dateRange.to}
                onChange={(event) => onDateRangeChange({ ...dateRange, from: event.target.value })}
                aria-label="Date range start"
                className="min-w-0 flex-1 bg-transparent text-[12px] text-steel-100 outline-none sm:w-[7.6rem] sm:flex-none font-sans font-bold"
              />
              <span className="text-[12px] text-steel-200 font-bold">→</span>
              <input
                type="date"
                value={dateRange.to}
                min={dateRange.from}
                onChange={(event) => onDateRangeChange({ ...dateRange, to: event.target.value })}
                aria-label="Date range end"
                className="min-w-0 flex-1 bg-transparent text-[12px] text-steel-100 outline-none sm:w-[7.6rem] sm:flex-none font-sans font-bold"
              />
            </div>
          </>
        )}
      </div>
    </header>
  )
}
