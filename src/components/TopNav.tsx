import {
  Brain,
  Car,
  FileText,
  Flame,
  LayoutDashboard,
  Landmark,
  Map,
  Moon,
  ShieldAlert,
  Sun,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'
import { useRef, useState, type MouseEvent, type PointerEvent } from 'react'
import type { AppView, ThemeMode } from '../types'

interface NavItem {
  id: AppView
  label: string
  icon: LucideIcon
}

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Data Explorer', icon: LayoutDashboard },
  { id: 'trends', label: 'Reported Crime Trends', icon: TrendingUp },
  { id: 'hotspots', label: 'Risk Zones', icon: Flame },
  { id: 'map', label: 'Interactive Map', icon: Map },
  { id: 'predictive-risk', label: 'Risk Forecast', icon: ShieldAlert },
  { id: 'intelligence', label: 'Intelligence', icon: Brain },
  { id: 'patrol', label: 'Patrol Simulation', icon: Car },
  { id: 'stations', label: 'Police Stations', icon: Landmark },
  { id: 'reports', label: 'Documents & Reports', icon: FileText },
]

interface TopNavProps {
  activeView: AppView
  onNavigate: (view: AppView) => void
  theme?: ThemeMode
  onToggleTheme?: () => void
}

interface DragState {
  pointerId: number
  startX: number
  startScroll: number
  moved: boolean
}

/** Top navigation bar with a swipe/drag-scrollable tab strip. */
export function TopNav({ activeView, onNavigate, theme = 'dark', onToggleTheme }: TopNavProps) {
  const stripRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<DragState | null>(null)
  const didDragRef = useRef(false)
  const [dragging, setDragging] = useState(false)

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    didDragRef.current = false
    if (event.pointerType !== 'mouse') return
    const strip = stripRef.current
    if (!strip) return
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScroll: strip.scrollLeft,
      moved: false,
    }
  }

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const state = dragRef.current
    const strip = stripRef.current
    if (!state || !strip || state.pointerId !== event.pointerId) return
    const delta = event.clientX - state.startX
    if (!state.moved && Math.abs(delta) > 4) {
      state.moved = true
      setDragging(true)
      strip.setPointerCapture(event.pointerId)
    }
    if (state.moved) strip.scrollLeft = state.startScroll - delta
  }

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const state = dragRef.current
    const strip = stripRef.current
    if (!state || !strip || state.pointerId !== event.pointerId) return
    if (state.moved) {
      didDragRef.current = true
      strip.releasePointerCapture(event.pointerId)
    }
    dragRef.current = null
    setDragging(false)
  }

  const handleSelect = (view: AppView, event: MouseEvent<HTMLButtonElement>) => {
    if (didDragRef.current) {
      didDragRef.current = false
      return
    }
    onNavigate(view)
    event.currentTarget.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    })
  }

  const isLight = theme === 'light'

  return (
    <nav
      className="sticky top-0 z-30 backdrop-blur-md border-b transition-colors duration-250 bg-[#081220]/95 border-[#1e293b]"
      aria-label="Primary navigation"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between px-3 py-2.5 sm:px-4 md:py-2 gap-2">
        <div className="flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <img
              src="/pp-logo-2.webp"
              alt="Puducherry Police Emblem"
              className="size-10 shrink-0 object-contain drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]"
            />
            <div className="min-w-0 flex items-baseline gap-2.5">
              <span className="text-[20px] sm:text-[22px] font-black leading-none tracking-tight font-sans text-white">
                CRIMEMAP
              </span>
              <div className="hidden sm:block border-l border-slate-500/70 pl-2.5">
                <div className="text-[10px] uppercase tracking-[0.18em] font-extrabold text-amber-500 font-sans leading-none">
                  Crime Data Explorer
                </div>
                <div className="text-[9px] uppercase tracking-[0.12em] font-semibold font-sans leading-none mt-1 text-slate-300">
                  Puducherry Police Department
                </div>
              </div>
            </div>
          </div>

          {/* Theme Toggle Button (Mobile) */}
          <div className="flex items-center gap-1.5 md:hidden">
            {onToggleTheme ? (
              <button
                type="button"
                onClick={onToggleTheme}
                aria-label={isLight ? 'Switch to Dark Theme' : 'Switch to Light Theme'}
                title={isLight ? 'Switch to Dark Police Theme' : 'Switch to Light Police Theme'}
                className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold font-sans shadow-2xs transition-all border-gray-400 bg-white text-slate-800 hover:border-gray-600 hover:text-slate-950"
              >
                {isLight ? (
                  <>
                    <Moon className="size-3.5 text-blue-600" aria-hidden />
                    <span>Dark</span>
                  </>
                ) : (
                  <>
                    <Sun className="size-3.5 text-amber-500" aria-hidden />
                    <span>Light</span>
                  </>
                )}
              </button>
            ) : null}
          </div>
        </div>

        <div className="flex items-center gap-2 min-w-0 flex-1 md:flex-initial justify-between md:justify-end">
          <div
            ref={stripRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className={`scroll-thin flex touch-pan-x select-none gap-1.5 overflow-x-auto py-1 md:flex-wrap md:justify-end ${
              dragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
          >
            {NAV_ITEMS.map((item) => {
              const active = item.id === activeView
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={(event) => handleSelect(item.id, event)}
                  aria-current={active ? 'page' : undefined}
                  className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1.5 text-[12px] font-bold font-sans transition-all shadow-2xs ${
                    active
                      ? 'border-gray-600 bg-gray-800 text-white shadow-md ring-2 ring-gray-400'
                      : 'border-gray-400 bg-white text-slate-800 hover:border-gray-600 hover:text-slate-950 hover:bg-slate-50'
                  }`}
                >
                  <Icon
                    className={`size-3.5 shrink-0 ${active ? 'text-white' : 'text-slate-600'}`}
                    aria-hidden
                  />
                  {item.label}
                </button>
              )
            })}
          </div>

          {/* Theme Toggle Button (Desktop) */}
          {onToggleTheme ? (
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={isLight ? 'Switch to Dark Theme' : 'Switch to Light Theme'}
              title={isLight ? 'Switch to Dark Police Theme' : 'Switch to Light Police Theme'}
              className="hidden md:inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12px] font-bold font-sans shadow-2xs transition-all border-gray-400 bg-white text-slate-800 hover:border-gray-600 hover:text-slate-950"
            >
              {isLight ? (
                <>
                  <Moon className="size-3.5 text-blue-600" aria-hidden />
                  <span>Dark Theme</span>
                </>
              ) : (
                <>
                  <Sun className="size-3.5 text-amber-500" aria-hidden />
                  <span>Light Theme</span>
                </>
              )}
            </button>
          ) : null}
        </div>
      </div>
    </nav>
  )
}
