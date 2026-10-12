import {
  Brain,
  Car,
  FileText,
  Flame,
  LayoutDashboard,
  Landmark,
  Map,
  Moon,
  LogOut,
  ShieldAlert,
  ShieldCheck,
  Sun,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'
import { useRef, useState, type MouseEvent, type PointerEvent } from 'react'
import type { AppView, AuthUser, ThemeMode } from '../types'

interface NavItem {
  id: AppView
  label: string
  icon: LucideIcon
}

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Data Explorer', icon: LayoutDashboard },
  { id: 'trends', label: 'Crime Trends', icon: TrendingUp },
  { id: 'map', label: 'Interactive Map', icon: Map },
  { id: 'hotspots', label: 'Risk Zones', icon: Flame },
  { id: 'predictive-risk', label: 'Risk Forecast', icon: ShieldAlert },
  { id: 'intelligence', label: 'Intelligence', icon: Brain },
  { id: 'patrol', label: 'Patrol Simulation', icon: Car },
  { id: 'stations', label: 'Police Stations', icon: Landmark },
  { id: 'reports', label: 'Reports & Docs', icon: FileText },
]

interface TopNavProps {
  activeView: AppView
  onNavigate: (view: AppView) => void
  theme?: ThemeMode
  onToggleTheme?: () => void
  user?: AuthUser | null
  onLogout?: () => void
}

interface DragState {
  pointerId: number
  startX: number
  startScroll: number
  moved: boolean
}

/** Top navigation bar with a swipe/drag-scrollable tab strip. */
export function TopNav({
  activeView,
  onNavigate,
  theme = 'dark',
  onToggleTheme,
  user,
  onLogout,
}: TopNavProps) {
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
      className={`sticky top-0 z-30 backdrop-blur-md border-b transition-colors duration-250 ${
        isLight ? 'bg-white/95 border-slate-200' : 'bg-[#081220]/95 border-[#1e293b]'
      }`}
      aria-label="Primary navigation"
    >
      {/* ------------------------------------------------------------- */}
      {/* Topic Bar: CRIMEMAP • Crime Data Explorer                     */}
      {/* ------------------------------------------------------------- */}
      <div className="border-b px-3 py-2 sm:px-4 border-slate-200 dark:border-slate-800/80">
        <div className="flex items-center justify-between gap-3">
          {/* Identity & Topic */}
          <div className="flex items-center gap-3 min-w-0">
            <img
              src="/pp-logo-2.webp"
              alt="Puducherry Police Emblem"
              className="size-9 sm:size-10 shrink-0 object-contain drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]"
            />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 leading-none">
                <span
                  className={`text-[18px] sm:text-[21px] font-black tracking-tight font-sans ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  CRIMEMAP
                </span>
                <span className="hidden sm:inline-block text-slate-500 font-light">•</span>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] sm:text-[12px] font-bold font-sans uppercase tracking-wider bg-amber-500/15 text-amber-500 border border-amber-500/30">
                  Crime Data Explorer
                </span>
              </div>
              <p
                className={`text-[10px] sm:text-[11px] font-semibold leading-none mt-1 truncate ${
                  isLight ? 'text-slate-700' : 'text-slate-100'
                }`}
              >
                Puducherry Police Department • Tactical Crime Intelligence Network
              </p>
            </div>
          </div>

          {/* Right Controls: Theme Toggle & Officer Info / Sign Out */}
          <div className="flex items-center gap-2 shrink-0">
            {onToggleTheme ? (
              <button
                type="button"
                onClick={onToggleTheme}
                aria-label={isLight ? 'Switch to Dark Theme' : 'Switch to Light Theme'}
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[11px] font-bold font-sans shadow-2xs transition-all cursor-pointer ${
                  isLight
                    ? 'border-gray-400 bg-white text-slate-800 hover:border-gray-600 hover:text-slate-950'
                    : 'border-[#1e293b] bg-[#0b1a30] text-slate-200 hover:border-slate-600 hover:text-white'
                }`}
              >
                {isLight ? (
                  <>
                    <Moon className="size-3.5 text-blue-600" aria-hidden />
                    <span className="hidden sm:inline">Dark</span>
                  </>
                ) : (
                  <>
                    <Sun className="size-3.5 text-amber-500" aria-hidden />
                    <span className="hidden sm:inline">Light</span>
                  </>
                )}
              </button>
            ) : null}

            {user && onLogout ? (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-700/60 shrink-0">
                <div className="hidden md:flex items-center gap-1.5">
                  <div className="size-6 rounded-full bg-blue-600/20 border border-blue-400/40 flex items-center justify-center text-blue-300">
                    <ShieldCheck className="size-3.5 text-emerald-400" />
                  </div>
                  <div className="flex flex-col text-left leading-tight">
                    <span
                      className={`text-[11px] font-bold ${
                        isLight ? 'text-slate-900' : 'text-white'
                      } flex items-center gap-1`}
                    >
                      <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {user.name}
                    </span>
                    <span className="text-[9px] font-mono text-slate-400 font-medium">
                      {user.badgeNumber}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onLogout}
                  title="Sign out of CrimeMap Command Center"
                  className="inline-flex items-center gap-1 rounded-lg border border-red-500/40 bg-red-950/40 px-2.5 py-1 text-[11px] font-bold text-red-200 hover:bg-red-900/60 hover:text-white transition-all shadow-2xs cursor-pointer"
                >
                  <LogOut className="size-3" aria-hidden />
                  <span>Exit</span>
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Ordered Small Little Box Navigation Strip                     */}
      {/* Located directly under the topic Crime Map Data Explorer      */}
      {/* ------------------------------------------------------------- */}
      <div
        className={`px-2 sm:px-4 py-1.5 transition-colors ${
          isLight ? 'bg-slate-50/90 border-b border-slate-200/80' : 'bg-[#050c18]/95 border-b border-slate-800/80'
        }`}
      >
        <div className="flex items-center gap-2">
          {/* Small Little Box Buttons Container */}
          <div
            ref={stripRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className={`scroll-thin flex touch-pan-x select-none gap-1 sm:gap-1.5 overflow-x-auto py-0.5 w-full items-center ${
              dragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
          >
            {NAV_ITEMS.map((item, index) => {
              const active = item.id === activeView
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={(event) => handleSelect(item.id, event)}
                  aria-current={active ? 'page' : undefined}
                  title={item.label}
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[11px] sm:text-[12px] font-semibold font-sans transition-all shadow-2xs cursor-pointer ${
                    active
                      ? isLight
                        ? 'border-blue-600 bg-blue-600 text-white shadow-xs ring-1 ring-blue-500 font-bold'
                        : 'border-blue-500 bg-blue-600 text-white shadow-sm shadow-blue-950 ring-1 ring-blue-400/60 font-bold'
                      : isLight
                      ? 'border-slate-300 bg-white text-slate-800 hover:border-slate-400 hover:bg-slate-100 hover:text-slate-950 font-bold'
                      : 'border-[#1e293b] bg-[#0b1a30] text-slate-100 hover:border-slate-500 hover:bg-[#12233f] hover:text-white font-bold'
                  }`}
                >
                  <span
                    className={`text-[9px] font-mono px-1 rounded-xs font-bold leading-none ${
                      active ? 'bg-white/20 text-white' : isLight ? 'text-slate-600 font-bold' : 'text-amber-400 font-bold'
                    }`}
                  >
                    {index + 1}
                  </span>
                  <Icon
                    className={`size-3.5 shrink-0 ${
                      active ? 'text-white' : isLight ? 'text-blue-700' : 'text-sky-400'
                    }`}
                    aria-hidden
                  />
                  <span className="whitespace-nowrap">{item.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
