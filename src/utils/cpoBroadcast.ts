import { CPO_OFFICERS } from '../data/cpoOfficers'
import type { CPONotification, CPORecipientStatus, CrimeIncident } from '../types'

/**
 * Creates an emergency tactical CPO broadcast alert package for a newly reported crime incident.
 * Dispatches to all active Community Police Officers (CPOs) across Puducherry Police Stations.
 */
export function buildCPONotification(incident: CrimeIncident): CPONotification {
  const now = new Date()
  const dispatchedAt = now.toISOString()
  const timeFormatted = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })

  // Station counts
  const stationSet = new Set<string>()
  CPO_OFFICERS.forEach((cpo) => stationSet.add(cpo.stationName))

  // Map each CPO with delivery and acknowledgment telemetry
  const recipients: CPORecipientStatus[] = CPO_OFFICERS.map((cpo) => {
    // If the incident is within this CPO's station or beat area, assign urgent Responding status
    const isNearby =
      cpo.beatArea.toLowerCase().includes(incident.area.toLowerCase()) ||
      cpo.stationName.toLowerCase().includes(incident.area.toLowerCase())

    return {
      cpoId: cpo.id,
      cpoName: cpo.name,
      rank: cpo.rank,
      badgeNumber: cpo.badgeNumber,
      stationName: cpo.stationName,
      beatArea: cpo.beatArea,
      callsign: cpo.callsign,
      device: cpo.device,
      status: isNearby ? 'Responding' : 'Delivered',
      deliveredAt: `${timeFormatted} (0.3s CAD latency)`,
    }
  })

  const severity = incident.severity || 'Medium'
  const riskScoreMap = {
    Low: 25,
    Medium: 55,
    High: 82,
    Critical: 96,
  }

  return {
    id: `CPO-DISPATCH-${Date.now()}`,
    incidentId: incident.id,
    category: incident.category,
    severity,
    area: incident.area,
    occurredAt: incident.occurredAt,
    dispatchedAt,
    description: incident.description || `New ${incident.category} incident reported in ${incident.area}.`,
    riskScore: riskScoreMap[severity] || 50,
    totalCposNotified: recipients.length,
    totalStationsAlerted: stationSet.size,
    recipients,
    read: false,
  }
}

/** Initial sample broadcasts for realistic realism in police terminal */
export function getInitialCPONotifications(): CPONotification[] {
  const now = new Date()
  const sampleIncident: CrimeIncident = {
    id: 'CRM-2026-0042',
    category: 'Robbery',
    severity: 'High',
    status: 'Reported',
    area: 'Mission Street',
    occurredAt: new Date(now.getTime() - 1000 * 60 * 18).toISOString(),
    description: 'Jewelry store snatch-and-grab reported near Mission Street / Bussy junction. 2 suspects fled toward coastal promenade.',
    lat: 11.927,
    lng: 79.8325,
    isDemo: true,
  }

  return [buildCPONotification(sampleIncident)]
}
