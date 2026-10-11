import { BarChart3, Database, FileSpreadsheet, Map } from 'lucide-react'
import type { AppView, DashboardStats } from '../types'

interface CdeHeroSectionProps {
  stats: DashboardStats
  onNavigate: (view: AppView) => void
}

/**
 * Hero & Trends Section modeled precisely on the FBI Crime Data Explorer
 * provided in bk image.png.
 */
export function CdeHeroSection({ stats, onNavigate }: CdeHeroSectionProps) {
  return (
    <div className="flex flex-col w-full font-sans">
      {/* 1. Hero Banner Section featuring pp logo 2 as background */}
      <div className="relative overflow-hidden rounded-xl border border-slate-700/60 shadow-2xl min-h-[380px] sm:min-h-[440px] flex flex-col justify-between p-4 sm:p-8 bg-[#0b1a30]">
        {/* Puducherry Police Emblem (pp logo 2) background */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none">
          {/* Ambient backlight glow */}
          <div className="absolute size-[550px] rounded-full bg-amber-500/15 blur-[120px]" />
          <div className="absolute size-[420px] rounded-full bg-blue-600/15 blur-[100px]" />
          <img
            src="/pp-logo-2.webp"
            alt="Puducherry Police Emblem"
            className="w-[75vw] max-w-[460px] object-contain opacity-35 filter drop-shadow-[0_0_35px_rgba(234,179,8,0.45)]"
          />
        </div>
        {/* Dark contrast gradient overlay to ensure perfect text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#081220]/80 via-[#0b1a30]/70 to-[#081220]/90 pointer-events-none" />

        {/* Content over hero background */}
        <div className="relative z-10 w-full flex-1 flex flex-col justify-between gap-6 sm:gap-8">
          {/* Single Headline Portal: Territory Data */}
          <div className="flex flex-col items-center justify-center pt-2 sm:pt-4 text-center">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
              Territory Data
            </h2>
            <p className="mt-2 text-sm sm:text-base font-medium text-slate-300 max-w-xl">
              Comprehensive crime intelligence and incident analytics across Puducherry Union Territory
            </p>
            <div className="mt-4 sm:mt-5">
              <button
                type="button"
                onClick={() => onNavigate('trends')}
                className="rounded border border-white/70 bg-[#0b1a30]/80 px-8 py-2.5 text-[14px] font-bold text-white shadow-xl backdrop-blur-xs transition-all hover:bg-white hover:text-slate-900 hover:border-white focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
              >
                Explore
              </button>
            </div>
          </div>

          {/* Center Mission Statement Card (Exact reproduction from bk image.png) */}
          <div className="max-w-3xl mx-auto w-full">
            <div className="rounded-xl border border-white/20 bg-[#0f1d33]/85 p-4 sm:p-6 text-center text-white shadow-2xl backdrop-blur-md">
              <p className="text-[12px] sm:text-[14px] leading-relaxed font-normal text-slate-100">
                The Puducherry Crime Data Explorer (CDE) aims to provide transparency, create easier
                access, and expand awareness of criminal, and noncriminal, law enforcement data sharing;
                improve accountability for law enforcement; and provide a foundation to help shape
                public policy in support of a safer nation. Use the CDE to discover data through
                visualizations, downloads in .csv format, and other large data files.
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[11px] sm:text-[12px] font-semibold text-slate-200">
                <button
                  type="button"
                  onClick={() => onNavigate('trends')}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 hover:bg-white/20 transition-colors"
                >
                  <BarChart3 className="size-3.5 text-amber-400" />
                  <span>{stats.totalIncidents} Incident Trends</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('map')}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 hover:bg-white/20 transition-colors"
                >
                  <Map className="size-3.5 text-sky-400" />
                  <span>{stats.activeHotspots} Spatial Zones</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('reports')}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 hover:bg-white/20 transition-colors"
                >
                  <FileSpreadsheet className="size-3.5 text-emerald-400" />
                  <span>Downloads &amp; .CSV</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('intelligence')}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 hover:bg-white/20 transition-colors"
                >
                  <Database className="size-3.5 text-indigo-400" />
                  <span>Intelligence Analytics</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Reported Violent & Property Crime Trends Section (Exact replica of bottom half of bk image.png) */}
      <div className="mt-4 rounded-xl border border-gray-300 bg-white p-5 sm:p-7 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
          {/* Left Column: Reported Violent Crime Trends */}
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                Reported Violent Crime Trends,
                <span className="block text-slate-700 font-bold text-lg sm:text-xl">
                  June 2025 - May 2026
                </span>
              </h3>

              {/* Big Headline Percentage with Downward Green Arrow */}
              <div className="mt-4 flex items-center gap-3">
                <span className="text-5xl sm:text-6xl font-black text-[#15803d] tracking-tight leading-none">
                  -9.0%
                </span>
                <span className="text-4xl sm:text-5xl text-[#15803d] font-bold" aria-hidden>
                  ▼
                </span>
              </div>
            </div>

            {/* Sub-breakdown Columns: Murder, Assault, Robbery */}
            <div className="mt-6 pt-4 border-t border-gray-100 grid grid-cols-3 gap-3">
              <div>
                <div className="text-[12px] sm:text-[13px] font-bold text-slate-700">Murder</div>
                <div className="mt-1 flex items-center gap-1 text-base sm:text-xl font-black text-[#15803d]">
                  <span>-18.7%</span>
                  <span className="text-xs">▼</span>
                </div>
              </div>

              <div>
                <div className="text-[12px] sm:text-[13px] font-bold text-slate-700">Assault</div>
                <div className="mt-1 flex items-center gap-1 text-base sm:text-xl font-black text-[#15803d]">
                  <span>-10.0%</span>
                  <span className="text-xs">▼</span>
                </div>
              </div>

              <div>
                <div className="text-[12px] sm:text-[13px] font-bold text-slate-700">Robbery</div>
                <div className="mt-1 flex items-center gap-1 text-base sm:text-xl font-black text-[#15803d]">
                  <span>-14.2%</span>
                  <span className="text-xs">▼</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Reported Property Crime Trends */}
          <div className="flex flex-col justify-between pt-6 lg:pt-0 lg:pl-10">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                Reported Property Crime Trends,
                <span className="block text-slate-700 font-bold text-lg sm:text-xl">
                  June 2025 - May 2026
                </span>
              </h3>

              {/* Big Headline Percentage with Downward Green Arrow */}
              <div className="mt-4 flex items-center gap-3">
                <span className="text-5xl sm:text-6xl font-black text-[#15803d] tracking-tight leading-none">
                  -12.4%
                </span>
                <span className="text-4xl sm:text-5xl text-[#15803d] font-bold" aria-hidden>
                  ▼
                </span>
              </div>
            </div>

            {/* Sub-breakdown Columns: Burglary, Larceny, Vehicle Theft */}
            <div className="mt-6 pt-4 border-t border-gray-100 grid grid-cols-3 gap-3">
              <div>
                <div className="text-[12px] sm:text-[13px] font-bold text-slate-700">Burglary</div>
                <div className="mt-1 flex items-center gap-1 text-base sm:text-xl font-black text-[#15803d]">
                  <span>-16.7%</span>
                  <span className="text-xs">▼</span>
                </div>
              </div>

              <div>
                <div className="text-[12px] sm:text-[13px] font-bold text-slate-700">Larceny / Theft</div>
                <div className="mt-1 flex items-center gap-1 text-base sm:text-xl font-black text-[#15803d]">
                  <span>-9.9%</span>
                  <span className="text-xs">▼</span>
                </div>
              </div>

              <div>
                <div className="text-[12px] sm:text-[13px] font-bold text-slate-700">Vehicle Theft</div>
                <div className="mt-1 flex items-center gap-1 text-base sm:text-xl font-black text-[#15803d]">
                  <span>-6.5%</span>
                  <span className="text-xs">▼</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footnote matching government publication note */}
        <div className="mt-6 pt-3 border-t border-gray-200 flex flex-wrap items-center justify-between text-[11px] text-slate-500">
          <span>
            Puducherry Police Crime Data Explorer &middot; Preliminary Semiannual Uniform Crime Reporting
          </span>
          <button
            type="button"
            onClick={() => onNavigate('trends')}
            className="font-bold text-slate-800 hover:text-black underline cursor-pointer"
          >
            View full category breakdown &rarr;
          </button>
        </div>
      </div>
    </div>
  )
}
