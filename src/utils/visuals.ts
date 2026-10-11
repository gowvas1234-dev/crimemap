import type { CrimeCategory, RiskLevel } from '../types'

export const CRIME_CATEGORY_COLORS: Record<CrimeCategory, string> = {
  Theft: '#2c5282', // Classic Slate Navy
  Robbery: '#8b263e', // Deep Madder Claret
  Assault: '#b85d19', // Earthen Terracotta
  Burglary: '#5d4b75', // Muted Amethyst Plum
  'Vehicle Theft': '#9a782c', // Antique Muted Bronze
  Fraud: '#2a6f78', // Pine Spruce Mineral
  Other: '#64748b', // Neutral Slate Charcoal
}

export const RISK_LEVEL_COLORS: Record<RiskLevel, string> = {
  Low: '#2d6a4f', // Natural Forest Sage
  Medium: '#b45309', // Warm Natural Ochre
  High: '#c2410c', // Burnt Terracotta Rust
  Critical: '#991b1b', // Deep Brick Crimson
}

export const STATUS_COLORS: Record<string, string> = {
  Reported: '#2c5282',
  'Under Investigation': '#b45309',
  Closed: '#2d6a4f',
  Active: '#991b1b',
  Monitoring: '#b45309',
  Contained: '#2d6a4f',
  Rising: '#991b1b',
  Stable: '#b45309',
  Declining: '#2d6a4f',
}

export function riskLevelClass(level: RiskLevel): string {
  switch (level) {
    case 'Low':
      return 'border-[#2d6a4f]/40 bg-[#2d6a4f]/10 text-[#1b4d3e]'
    case 'Medium':
      return 'border-[#b45309]/40 bg-[#b45309]/10 text-[#92400e]'
    case 'High':
      return 'border-[#c2410c]/40 bg-[#c2410c]/10 text-[#9a3412]'
    case 'Critical':
      return 'border-[#991b1b]/40 bg-[#991b1b]/10 text-[#7f1d1d]'
  }
}

export function trendGlyph(trend: 'Rising' | 'Stable' | 'Declining'): string {
  if (trend === 'Rising') return '▲'
  if (trend === 'Declining') return '▼'
  return '■'
}
