import {
  AlertCircle,
  BadgeCheck,
  Building2,
  CheckCircle2,
  Eye,
  EyeOff,
  Fingerprint,
  Info,
  LoaderCircle,
  Lock,
  Moon,
  Shield,
  ShieldCheck,
  Sparkles,
  Sun,
  UserCheck,
} from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { AnimatedBackground } from '../components/AnimatedBackground'
import { OfficialGovBanner } from '../components/OfficialGovBanner'
import type { AuthUser, ThemeMode } from '../types'

interface LoginViewProps {
  onLogin: (user: AuthUser) => void
  theme?: ThemeMode
  onToggleTheme?: () => void
}

interface DemoAccount {
  id: string
  name: string
  badgeNumber: string
  role: string
  station: string
  department: string
  pin: string
}

const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    id: 'PY-4082',
    name: 'Inspector R. Kumar',
    badgeNumber: 'PY-POL-4082',
    role: 'Senior Crime Investigator',
    station: 'Central Division (Grand Bazaar PS)',
    department: 'Crime Branch CID',
    pin: 'CrimeMap@2026',
  },
  {
    id: 'PY-1104',
    name: 'Sub-Inspector S. Anitha',
    badgeNumber: 'PY-POL-1104',
    role: 'Patrol Dispatch Lead',
    station: 'East Division (Lawspet PS)',
    department: 'Field Tactical Unit',
    pin: 'Patrol@2026',
  },
  {
    id: 'PY-7721',
    name: 'Analyst M. Vasanth',
    badgeNumber: 'PY-CYBER-7721',
    role: 'Intelligence & Cyber Officer',
    station: 'Command Control Center (PCR)',
    department: 'Cyber Crime Cell',
    pin: 'Intel@2026',
  },
]

const STATIONS = [
  'Central Division (Grand Bazaar PS & HQ)',
  'East Division (Lawspet & Muthialpet)',
  'West Division (Villianur & Reddiarpalayam)',
  'South Division (Ariyankuppam & Bahour)',
  'Cyber Crime & Intelligence Cell',
  'Command Control Center (PCR)',
]

export function LoginView({ onLogin, theme = 'dark', onToggleTheme }: LoginViewProps) {
  const [badgeId, setBadgeId] = useState('')
  const [password, setPassword] = useState('')
  const [station, setStation] = useState('')
  const [remember, setRemember] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const isLight = theme === 'light'

  const handleSelectDemo = (acc: DemoAccount) => {
    setBadgeId(acc.badgeNumber)
    setPassword(acc.pin)
    setStation(acc.station)
    setError(null)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!badgeId.trim()) {
      setError('Officer Badge / User ID is required.')
      return
    }

    if (!password.trim()) {
      setError('Security PIN / Access password is required.')
      return
    }

    setIsLoading(true)

    // Simulate authenticating against government identity server
    setTimeout(() => {
      setIsLoading(false)

      // Find matching demo account or construct a dynamic officer profile
      const matched = DEMO_ACCOUNTS.find(
        (acc) =>
          acc.badgeNumber.toLowerCase() === badgeId.trim().toLowerCase() ||
          acc.id.toLowerCase() === badgeId.trim().toLowerCase(),
      )

      const user: AuthUser = matched
        ? {
            id: matched.id,
            name: matched.name,
            badgeNumber: matched.badgeNumber,
            role: matched.role,
            station: station || matched.station,
            department: matched.department,
            loginTime: new Date().toLocaleTimeString('en-IN', {
              hour: '2-digit',
              minute: '2-digit',
            }),
          }
        : {
            id: badgeId.trim().toUpperCase(),
            name: `Officer ${badgeId.trim().toUpperCase()}`,
            badgeNumber: badgeId.trim().toUpperCase(),
            role: 'Command Officer',
            station: station || 'Puducherry Central Station',
            department: 'Law Enforcement Intelligence',
            loginTime: new Date().toLocaleTimeString('en-IN', {
              hour: '2-digit',
              minute: '2-digit',
            }),
          }

      if (remember) {
        try {
          localStorage.setItem('crimemap_auth', JSON.stringify(user))
        } catch {}
      }

      setSuccess(true)
      setTimeout(() => {
        onLogin(user)
      }, 450)
    }, 700)
  }

  return (
    <div
      className="relative flex min-h-dvh flex-col transition-colors duration-250 overflow-x-hidden font-sans"
      style={{
        backgroundColor: 'var(--bg-app)',
        color: 'var(--text-main)',
      }}
    >
      {/* Same Animated Background as Main App */}
      <AnimatedBackground theme={theme} />

      {/* Watermark Emblem Reacting to Theme */}
      <div className="pointer-events-none fixed inset-0 flex items-center justify-center overflow-hidden z-0 select-none">
        <div className="relative flex items-center justify-center">
          <div
            className="absolute size-[550px] rounded-full blur-[120px] transition-all"
            style={{ backgroundColor: 'var(--watermark-glow-1)' }}
          />
          <div
            className="absolute size-[450px] rounded-full blur-[110px] transition-all"
            style={{ backgroundColor: 'var(--watermark-glow-2)' }}
          />
          <img
            src="/pp-logo-2.webp"
            alt="Puducherry Police"
            style={{ opacity: 'var(--emblem-opacity)' }}
            className="w-[85vw] max-w-[540px] filter drop-shadow-[0_0_25px_rgba(37,99,235,0.3)] object-contain transition-opacity duration-300"
          />
        </div>
      </div>

      {/* Main Container Shell */}
      <div className="relative z-10 flex min-h-dvh flex-col">
        {/* Top Official Government Banner */}
        <OfficialGovBanner />

        {/* Top Header Bar with Theme Toggle */}
        <header
          className="w-full border-b backdrop-blur-md transition-colors px-4 py-2.5 sm:px-6"
          style={{
            backgroundColor: isLight ? 'rgba(255, 255, 255, 0.92)' : 'rgba(8, 18, 32, 0.94)',
            borderColor: isLight ? '#cbd5e1' : '#1e293b',
          }}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <img
                src="/pp-logo-2.webp"
                alt="Emblem"
                className="size-9 shrink-0 object-contain drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className="text-[17px] sm:text-[18px] font-black tracking-tight"
                    style={{ color: isLight ? '#0f172a' : '#ffffff' }}
                  >
                    CRIMEMAP
                  </span>
                  <span className="hidden sm:inline-block rounded-xs bg-amber-500/20 px-1.5 py-0.5 text-[9px] font-bold text-amber-500 uppercase tracking-widest border border-amber-500/30">
                    PORTAL AUTH
                  </span>
                </div>
                <p
                  className="text-[11px] font-medium leading-none mt-0.5"
                  style={{ color: isLight ? '#64748b' : '#94a3b8' }}
                >
                  Puducherry Police Department • Crime Intelligence Network
                </p>
              </div>
            </div>

            {/* Quick theme switcher */}
            {onToggleTheme ? (
              <button
                type="button"
                onClick={onToggleTheme}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12px] font-semibold transition-all shadow-2xs cursor-pointer ${
                  isLight
                    ? 'border-gray-400 bg-white text-slate-800 hover:border-gray-600 hover:text-slate-950'
                    : 'border-[#1e293b] bg-[#0b1a30] text-slate-200 hover:border-slate-600 hover:text-white'
                }`}
              >
                {isLight ? (
                  <>
                    <Moon className="size-3.5 text-blue-600" aria-hidden />
                    <span className="hidden sm:inline">Dark Theme</span>
                  </>
                ) : (
                  <>
                    <Sun className="size-3.5 text-amber-500" aria-hidden />
                    <span className="hidden sm:inline">Light Theme</span>
                  </>
                )}
              </button>
            ) : null}
          </div>
        </header>

        {/* Center Login Section */}
        <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <div className="w-full max-w-[460px] animate-in fade-in zoom-in-95 duration-300">
            {/* The Professional Officer Login Card */}
            <div
              className="rounded-2xl border shadow-2xl backdrop-blur-xl overflow-hidden transition-all duration-300"
              style={{
                backgroundColor: isLight ? 'rgba(255, 255, 255, 0.98)' : 'rgba(11, 26, 48, 0.96)',
                borderColor: isLight ? '#cbd5e1' : '#334155',
                boxShadow: isLight
                  ? '0 20px 40px -15px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.05)'
                  : '0 25px 60px -15px rgba(0,0,0,0.7), 0 0 40px rgba(30,64,175,0.18)',
              }}
            >
              {/* Top Accent Strip */}
              <div className="h-1.5 w-full bg-linear-to-r from-blue-700 via-amber-500 to-blue-600" />

              <div className="p-6 sm:p-8">
                {/* Official Crest & Header */}
                <div className="flex flex-col items-center text-center pb-5 border-b border-slate-200 dark:border-slate-800">
                  <div className="relative mb-3 flex items-center justify-center">
                    <div className="absolute size-20 rounded-full bg-blue-500/15 blur-lg" />
                    <div className="absolute size-14 rounded-full bg-amber-500/10 blur-md" />
                    <img
                      src="/pp-logo-2.webp"
                      alt="Puducherry Police Seal"
                      className="relative size-16 object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.25)] transition-transform hover:scale-105 duration-200"
                    />
                  </div>

                  <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-blue-900/40 text-blue-300 border border-blue-500/30 mb-2">
                    <ShieldCheck className="size-3 text-emerald-400" />
                    Authorized Law Enforcement Portal
                  </span>

                  <h1
                    className="text-[16px] font-semibold tracking-tight"
                    style={{ color: isLight ? '#0f172a' : '#ffffff' }}
                  >
                    Officer Authentication
                  </h1>
                  <p
                    className="text-[12px] leading-relaxed mt-1"
                    style={{ color: isLight ? '#64748b' : '#94a3b8' }}
                  >
                    Enter your Department Badge ID and security credentials to access tactical crime intelligence.
                  </p>
                </div>

                {/* Feedback / Alert Banners */}
                {error ? (
                  <div className="mt-4 rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-[12px] text-red-400 flex items-start gap-2.5 animate-in fade-in">
                    <AlertCircle className="size-4 shrink-0 mt-0.5" />
                    <div className="flex-1 font-medium">{error}</div>
                  </div>
                ) : null}

                {success ? (
                  <div className="mt-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-3 text-[12px] text-emerald-400 flex items-center gap-2.5 animate-in fade-in">
                    <CheckCircle2 className="size-4 shrink-0 text-emerald-400" />
                    <div className="flex-1 font-semibold">
                      Authentication Successful. Launching Command Dashboard...
                    </div>
                  </div>
                ) : null}

                {/* Form Fields */}
                <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                  {/* Badge / Officer ID */}
                  <div>
                    <label
                      htmlFor="badge-id"
                      className="block text-[12px] font-bold tracking-wide uppercase mb-1.5"
                      style={{ color: isLight ? '#334155' : '#cbd5e1' }}
                    >
                      Officer / Badge ID
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                        <BadgeCheck className="size-4 text-blue-500" />
                      </div>
                      <input
                        id="badge-id"
                        type="text"
                        value={badgeId}
                        onChange={(e) => setBadgeId(e.target.value)}
                        placeholder="e.g. PY-POL-4082"
                        autoComplete="username"
                        required
                        className="w-full rounded-xl border py-2.5 pl-10 pr-3.5 text-[13px] font-medium outline-hidden transition-all font-mono focus:ring-2 focus:ring-blue-500/50"
                        style={{
                          backgroundColor: isLight ? '#f8fafc' : 'rgba(15, 29, 51, 0.85)',
                          borderColor: isLight ? '#cbd5e1' : '#334155',
                          color: isLight ? '#0f172a' : '#ffffff',
                        }}
                      />
                    </div>
                  </div>

                  {/* Password / Access PIN */}
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-[12px] font-bold tracking-wide uppercase mb-1.5"
                      style={{ color: isLight ? '#334155' : '#cbd5e1' }}
                    >
                      Access Password / PIN
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                        <Lock className="size-4 text-amber-500" />
                      </div>
                      <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter secure password"
                        autoComplete="current-password"
                        required
                        className="w-full rounded-xl border py-2.5 pl-10 pr-10 text-[13px] font-medium outline-hidden transition-all font-mono focus:ring-2 focus:ring-blue-500/50"
                        style={{
                          backgroundColor: isLight ? '#f8fafc' : 'rgba(15, 29, 51, 0.85)',
                          borderColor: isLight ? '#cbd5e1' : '#334155',
                          color: isLight ? '#0f172a' : '#ffffff',
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                        title={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? (
                          <EyeOff className="size-4" />
                        ) : (
                          <Eye className="size-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Station / Division Dropdown */}
                  <div>
                    <label
                      htmlFor="station"
                      className="block text-[12px] font-bold tracking-wide uppercase mb-1.5"
                      style={{ color: isLight ? '#334155' : '#cbd5e1' }}
                    >
                      Command Station / Unit
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                        <Building2 className="size-4 text-slate-400" />
                      </div>
                      <select
                        id="station"
                        value={station}
                        onChange={(e) => setStation(e.target.value)}
                        className="w-full rounded-xl border py-2.5 pl-10 pr-3.5 text-[12px] font-medium outline-hidden transition-all focus:ring-2 focus:ring-blue-500/50"
                        style={{
                          backgroundColor: isLight ? '#f8fafc' : 'rgba(15, 29, 51, 0.85)',
                          borderColor: isLight ? '#cbd5e1' : '#334155',
                          color: isLight ? '#0f172a' : '#ffffff',
                        }}
                      >
                        <option
                          value=""
                          style={{
                            backgroundColor: isLight ? '#ffffff' : '#081220',
                            color: isLight ? '#94a3b8' : '#64748b',
                          }}
                        >
                          -- Select Command Station / Unit --
                        </option>
                        {STATIONS.map((s) => (
                          <option
                            key={s}
                            value={s}
                            style={{
                              backgroundColor: isLight ? '#ffffff' : '#081220',
                              color: isLight ? '#0f172a' : '#ffffff',
                            }}
                          >
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Session Checkbox & Security notice */}
                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center gap-2 cursor-pointer select-none text-[12px]">
                      <input
                        type="checkbox"
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                        className="size-4 rounded-xs border-slate-600 text-blue-600 focus:ring-blue-500/30 accent-blue-600"
                      />
                      <span style={{ color: isLight ? '#475569' : '#cbd5e1' }}>
                        Remember session
                      </span>
                    </label>
                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Fingerprint className="size-3 text-emerald-400" />
                      Biometric Ready
                    </span>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading || success}
                    className="w-full mt-2 rounded-xl bg-linear-to-r from-blue-700 via-blue-600 to-indigo-700 py-3 px-4 text-[13px] font-bold text-white shadow-lg shadow-blue-900/30 hover:from-blue-600 hover:to-indigo-600 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <LoaderCircle className="size-4 animate-spin text-white" />
                        <span>Verifying Credentials...</span>
                      </>
                    ) : (
                      <>
                        <Shield className="size-4 text-amber-300" />
                        <span>Authenticate & Access Command Center</span>
                      </>
                    )}
                  </button>
                </form>

                {/* Demo Accounts Quick-Fill Section */}
                <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-between mb-2.5">
                    <span
                      className="text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5"
                      style={{ color: isLight ? '#475569' : '#94a3b8' }}
                    >
                      <Sparkles className="size-3 text-amber-500" />
                      Quick Test Accounts
                    </span>
                    <span className="text-[10px] text-slate-500">Click to auto-fill</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {DEMO_ACCOUNTS.map((acc) => {
                      const active = badgeId === acc.badgeNumber
                      return (
                        <button
                          key={acc.id}
                          type="button"
                          onClick={() => handleSelectDemo(acc)}
                          className={`rounded-xl border p-2 text-left transition-all text-[11px] cursor-pointer ${
                            active
                              ? 'border-blue-500 bg-blue-500/15 shadow-sm'
                              : isLight
                              ? 'border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-slate-100'
                              : 'border-slate-700/60 bg-slate-900/40 hover:border-slate-600 hover:bg-slate-850'
                          }`}
                        >
                          <div className="flex items-center gap-1 text-[11px] font-bold text-blue-400 truncate">
                            <UserCheck className="size-3 shrink-0" />
                            <span className="truncate">{acc.name}</span>
                          </div>
                          <div
                            className="font-mono text-[10px] mt-0.5 truncate"
                            style={{ color: isLight ? '#64748b' : '#94a3b8' }}
                          >
                            {acc.id}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Restricted Access Legal Disclaimer */}
                <div
                  className="mt-6 rounded-xl border p-3 text-[11px] leading-relaxed flex items-start gap-2.5"
                  style={{
                    backgroundColor: isLight ? '#f8fafc' : 'rgba(15, 23, 42, 0.6)',
                    borderColor: isLight ? '#e2e8f0' : '#1e293b',
                    color: isLight ? '#64748b' : '#94a3b8',
                  }}
                >
                  <Info className="size-4 shrink-0 text-amber-500 mt-0.5" />
                  <p>
                    <strong>Restricted System:</strong> Authorized Puducherry Police personnel only. All access requests, queries, and telemetry operations are audited under the Information Technology Act (2000).
                  </p>
                </div>

                {/* Security Badges */}
                <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-[10px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <span className="size-1.5 rounded-full bg-emerald-400" />
                    256-Bit TLS Secured
                  </span>
                  <span>•</span>
                  <span>Department Clearance: Level 4</span>
                  <span>•</span>
                  <span>Puducherry UT Police Network</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
