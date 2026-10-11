import type { CrimeIncident, Severity } from '../types'
import { severityOf } from './severity'

/**
 * ============================================================================
 * CRIME TYPE TO TABLER ICON MAPPING (1-LINE EXTENSION POINT)
 * ============================================================================
 * To add a new crime type in one line, simply add a key-value pair below:
 * e.g., "Extortion": "cash",
 */
export const CRIME_TYPE_ICONS: Record<string, string> = {
  Theft: 'shopping-bag',
  Assault: 'alert-octagon',
  Burglary: 'home',
  Accident: 'car-crash',
  Cybercrime: 'lock',
  'Vehicle theft': 'car',
  'Vehicle Theft': 'car',
  Vandalism: 'spray',
  Robbery: 'mask',
  Drugs: 'pill',
  Fraud: 'lock',
  Other: 'alert-circle',
}

/**
 * Severity to color (marker background):
 * - High: #E24B4A
 * - Medium: #EF9F27
 * - Low: #378ADD
 * - Critical: #E24B4A
 */
export const SEVERITY_COLORS: Record<string, string> = {
  High: '#E24B4A',
  Critical: '#E24B4A',
  Medium: '#EF9F27',
  Low: '#378ADD',
}

/**
 * Retrieve Tabler icon name for a given crime type.
 */
export function getCrimeIcon(category: string): string {
  return CRIME_TYPE_ICONS[category] ?? 'alert-circle'
}

/**
 * Retrieve marker background color for a given severity.
 */
export function getSeverityColor(severity: string): string {
  return SEVERITY_COLORS[severity] ?? '#EF9F27'
}

/**
 * Determine the severity for an incident (uses incident.severity if set,
 * or derives deterministically from incident category).
 */
export function getIncidentSeverity(incident: CrimeIncident): Severity {
  if (incident.severity) return incident.severity
  return severityOf(incident.category) ?? 'Medium'
}

/**
 * Checks if an incident has a video surveillance clip available.
 * Supports explicit incident.hasVideo, videoUrl, or demo camera coverage.
 */
export function hasIncidentVideo(incident: CrimeIncident): boolean {
  if (typeof incident.hasVideo === 'boolean') return incident.hasVideo
  if (incident.videoUrl) return true
  // Deterministic camera distribution for demo records: ~30% have video coverage
  const lastChar = incident.id.slice(-1)
  return lastChar === '2' || lastChar === '5' || lastChar === '8'
}
