import {
  Bell,
  Moon,
  LogOut,
  PlusCircle,
  Radio,
  ShieldCheck,
  Siren,
  Sun,
  X,
} from 'lucide-react'
import type { AppView, AuthUser, ThemeMode } from '../types'
import { NAV_ITEMS } from '../data/navigation'

interface SidebarNavProps {
  activeView: AppView
  onNavigate: (view: AppView) => void
  theme?: ThemeMode
  onToggleTheme?: () => void
  user?: AuthUser | null
  onLogout?: () => void
  mobileOpen?: boolean
  onMobileClose?: () => void
  onOpenReportCrime?: () => void
  onOpenCpoDispatch?: () => void
  onOpenCriticalAlert?: () => void
  unreadCpoAlertsCount?: number
}

/**
 * Left Sidebar Navigation - Fixed & Unscrolled on the left side of the screen.
 * Displays all ordered navigation buttons as small little boxes under the topic
 * "CRIMEMAP • Crime Data Explorer".
 */
export function SidebarNav({
  activeView,
  onNavigate,
  theme = 'dark',
  onToggleTheme,
  user,
  onLogout,
  mobileOpen = false,
  onMobileClose = () => {},
  onOpenReportCrime,
  onOpenCpoDispatch,
  onOpenCriticalAlert,
  unreadCpoAlertsCount = 0,
}: SidebarNavProps) {
  const isLight = theme === 'light'

  const sidebarContent = (
    <div className="flex h-full flex-col justify-between p-3 sm:p-4 select-none overflow-y-auto scroll-thin">
      {/* ------------------------------------------------------------- */}
      {/* 1. Header / Topic Brand: CRIMEMAP • Crime Data Explorer       */}
      {/* ------------------------------------------------------------- */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src="/pp-logo-2.webp"
              alt="Puducherry Police Emblem"
              className="size-9 shrink-0 object-contain drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 leading-none">
                <span
                  className={`text-[17px] font-black tracking-tight font-sans ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  CRIMEMAP
                </span>
              </div>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-extrabold font-sans uppercase tracking-wider bg-amber-500/15 text-amber-400 border border-amber-500/30 mt-1">
                Crime Data Explorer
              </span>
            </div>
          </div>

          {/* Close button on mobile drawer */}
          <button
            type="button"
            onClick={onMobileClose}
            className="lg:hidden rounded-lg p-1 text-steel-400 hover:text-white hover:bg-navy-800"
            aria-label="Close navigation"
          >
            <X className="size-5" />
          </button>
        </div>

        <p
          className={`text-[10px] font-semibold leading-tight pb-2.5 border-b ${
            isLight ? 'text-slate-600 border-slate-200' : 'text-steel-400 border-[#1e2f47]'
          }`}
        >
          Puducherry Police Department &middot; Crime Analytics Registry
        </p>

        {/* ------------------------------------------------------------- */}
        {/* Action Controls: Critical Alert, Report Crime & CPO Feed      */}
        {/* ------------------------------------------------------------- */}
        <div className="flex flex-col gap-1.5">
          {onOpenCriticalAlert && (
            <button
              type="button"
              onClick={() => {
                onOpenCriticalAlert()
                onMobileClose()
              }}
              className="flex items-center justify-between rounded-lg border-2 border-amber-400 bg-gradient-to-r from-[#7f1d1d] via-[#991b1b] to-[#7f1d1d] px-3 py-2 text-[12px] font-black text-white shadow-[0_0_15px_rgba(245,158,11,0.5)] hover:shadow-[0_0_25px_rgba(245,158,11,0.8)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="relative flex size-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-300 opacity-80" />
                  <span className="relative inline-flex size-2 rounded-full bg-amber-400" />
                </span>
                <Siren className="size-4 text-amber-300 animate-pulse" />
                <span className="uppercase tracking-wider">Alert Message</span>
              </div>
              <span className="text-[10px] font-black uppercase bg-amber-400 px-1.5 py-0.5 rounded text-slate-950">
                CRITICAL
              </span>
            </button>
          )}
          {onOpenReportCrime && (
            <button
              type="button"
              onClick={() => {
                onOpenReportCrime()
                onMobileClose()
              }}
              className="flex items-center justify-between rounded-lg border border-blue-400 bg-blue-600 px-3 py-2 text-[12px] font-bold text-white shadow-md hover:bg-blue-500 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <PlusCircle className="size-4 text-white" />
                <span>Report Crime Incident</span>
              </div>
              <span className="text-[10px] font-extrabold uppercase bg-blue-900/80 px-1.5 py-0.5 rounded text-amber-300">
                + FIR
              </span>
            </button>
          )}

          {onOpenCpoDispatch && (
            <button
              type="button"
              onClick={() => {
                onOpenCpoDispatch()
                onMobileClose()
              }}
              className={`flex items-center justify-between rounded-lg border px-3 py-1.5 text-[11px] font-bold transition-all cursor-pointer ${
                unreadCpoAlertsCount > 0
                  ? 'border-blue-400/80 bg-[#0e223f] text-sky-200 hover:bg-[#132c52]'
                  : 'border-[#1e2f47] bg-[#0b1a30] text-steel-200 hover:bg-[#12233f] hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <Radio className="size-3.5 text-sky-400 animate-pulse" />
                <span>CPO Alert Dispatch</span>
              </div>
              <span className="inline-flex items-center gap-1 rounded bg-blue-600/40 border border-blue-400/40 px-1.5 py-0.5 text-[10px] font-mono font-bold text-sky-300">
                <Bell className="size-2.5 text-amber-300" />
                16 CPOs
              </span>
            </button>
          )}
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 2. Ordered Navigation Buttons as "Small Little Boxes"         */}
        {/* ------------------------------------------------------------- */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-steel-400 font-sans px-1">
            Navigation Modules
          </span>

          <nav className="flex flex-col gap-1.5" aria-label="Main Navigation">
            {NAV_ITEMS.map((item, index) => {
              const active = item.id === activeView
              const Icon = item.icon

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onNavigate(item.id)
                    onMobileClose()
                  }}
                  aria-current={active ? 'page' : undefined}
                  title={item.label}
                  className={`group flex items-center justify-between rounded-lg border px-3 py-2 text-[12px] font-sans font-bold transition-all shadow-xs cursor-pointer text-left ${
                    active
                      ? isLight
                        ? 'border-blue-600 bg-blue-600 text-white shadow-sm ring-1 ring-blue-500'
                        : 'border-blue-500 bg-blue-600 text-white shadow-md shadow-blue-950/50 ring-1 ring-blue-400/60'
                      : isLight
                      ? 'border-slate-300 bg-white text-slate-800 hover:border-slate-400 hover:bg-slate-100 hover:text-slate-950'
                      : 'border-[#1e2f47] bg-[#0b1a30] text-steel-100 hover:border-blue-500/60 hover:bg-[#12233f] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    {/* Number Box Badge */}
                    <span
                      className={`grid size-5 place-items-center rounded text-[10px] font-mono font-bold shrink-0 ${
                        active
                          ? 'bg-white/20 text-white'
                          : isLight
                          ? 'bg-slate-100 text-slate-700'
                          : 'bg-navy-950 text-amber-400 border border-navy-800'
                      }`}
                    >
                      {index + 1}
                    </span>

                    {/* Icon */}
                    <Icon
                      className={`size-4 shrink-0 transition-colors ${
                        active
                          ? 'text-white'
                          : isLight
                          ? 'text-blue-700'
                          : 'text-sky-400 group-hover:text-sky-300'
                      }`}
                      aria-hidden
                    />

                    {/* Label */}
                    <span className="truncate">{item.label}</span>
                  </div>

                  {/* Active dot indicator */}
                  {active && (
                    <span className="size-1.5 rounded-full bg-white shadow-xs shrink-0" />
                  )}
                </button>
              )
            })}
          </nav>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. Footer: Theme Toggle & Officer Info / Sign Out             */}
      {/* ------------------------------------------------------------- */}
      <div
        className={`pt-3 border-t flex flex-col gap-2.5 ${
          isLight ? 'border-slate-200' : 'border-[#1e2f47]'
        }`}
      >
        {/* Officer Badge if logged in */}
        {user ? (
          <div
            className={`flex items-center justify-between rounded-lg border p-2 ${
              isLight
                ? 'border-slate-200 bg-slate-50 text-slate-900'
                : 'border-[#1e2f47] bg-navy-950/80 text-white'
            }`}
          >
            <div className="flex items-center gap-2 min-w-0">
              <div className="grid size-7 place-items-center rounded-full bg-blue-600/20 border border-blue-400/40 text-blue-300 shrink-0">
                <ShieldCheck className="size-4 text-emerald-400" />
              </div>
              <div className="min-w-0 leading-tight">
                <span className="block truncate text-[11px] font-bold">
                  {user.name}
                </span>
                <span className="text-[9px] font-mono text-steel-400">
                  {user.badgeNumber}
                </span>
              </div>
            </div>

            {onLogout && (
              <button
                type="button"
                onClick={onLogout}
                title="Sign out of CrimeMap Command Center"
                className="rounded p-1 text-red-400 hover:bg-red-950/40 hover:text-red-300 transition-colors cursor-pointer"
              >
                <LogOut className="size-3.5" />
              </button>
            )}
          </div>
        ) : null}

        {/* Theme Toggle Button */}
        {onToggleTheme && (
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isLight ? 'Switch to Dark Theme' : 'Switch to Light Theme'}
            className={`w-full inline-flex items-center justify-center gap-2 rounded-lg border px-3 py-1.5 text-[11px] font-bold font-sans shadow-2xs transition-all cursor-pointer ${
              isLight
                ? 'border-gray-300 bg-white text-slate-800 hover:border-gray-500 hover:text-slate-950'
                : 'border-[#1e2f47] bg-[#0b1a30] text-steel-200 hover:border-slate-500 hover:text-white'
            }`}
          >
            {isLight ? (
              <>
                <Moon className="size-3.5 text-blue-600" aria-hidden />
                <span>Switch to Dark Theme</span>
              </>
            ) : (
              <>
                <Sun className="size-3.5 text-amber-500" aria-hidden />
                <span>Switch to Light Theme</span>
              </>
            )}
          </button>
        )}

        <div className="text-center text-[9px] font-mono text-steel-500">
          v2.6 &middot; Puducherry Police CDE
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* ------------------------------------------------------------- */}
      {/* Desktop Sidebar: Stable & Unscrolled on Left Side of Screen   */}
      {/* ------------------------------------------------------------- */}
      <aside
        className={`hidden lg:flex w-64 xl:w-72 shrink-0 flex-col h-full z-30 border-r transition-colors duration-250 select-none ${
          isLight ? 'bg-white border-slate-200' : 'bg-[#081220] border-[#1e2f47]'
        }`}
        style={{
          boxShadow: isLight
            ? '4px 0 20px rgba(0,0,0,0.05)'
            : '4px 0 25px rgba(0,0,0,0.5)',
        }}
      >
        {sidebarContent}
      </aside>

      {/* ------------------------------------------------------------- */}
      {/* Mobile Drawer Backdrop & Slide-out Menu                       */}
      {/* ------------------------------------------------------------- */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
            onClick={onMobileClose}
          />
          <aside
            className={`relative z-10 w-72 max-w-[85vw] flex-col h-full border-r shadow-2xl transition-colors ${
              isLight ? 'bg-white border-slate-200' : 'bg-[#081220] border-[#1e2f47]'
            }`}
          >
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  )
}
