import { useMemo, useState } from 'react'
import { Marker, Popup, useMap, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import type { CrimeCategory, CrimeIncident, Severity } from '../../types'
import { CrimeMarker } from './CrimeMarker'
import { getCrimeIcon, getIncidentSeverity, getSeverityColor } from '../../utils/crimeIcons'

/** Below this zoom level incidents collapse into numbered cluster bubbles. */
const CLUSTER_ZOOM = 14

interface ClusterGroup {
  id: string
  area: string
  lat: number
  lng: number
  count: number
  dominantCategory: CrimeCategory
  dominantSeverity: Severity
  categories: { category: CrimeCategory; count: number }[]
  hasVideoCount: number
}

function createClusterBubbleIcon(group: ClusterGroup): L.DivIcon {
  const color = getSeverityColor(group.dominantSeverity)
  const iconName = getCrimeIcon(group.dominantCategory)

  return L.divIcon({
    className: 'cluster-marker-wrap',
    html: `
      <div class="cluster-bubble" role="button" aria-label="${group.count} clustered incidents in ${group.area}" style="
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: #0b1a30;
        border: 2.5px solid ${color};
        color: #ffffff;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.55);
        position: relative;
        cursor: pointer;
        transition: transform 0.18s ease;
      ">
        <span style="font-size: 13px; font-weight: 800; line-height: 1; color: #ffffff;">${group.count}</span>
        <span style="position: absolute; bottom: -4px; right: -4px; width: 14px; height: 14px; border-radius: 50%; background: ${color}; border: 1.5px solid #ffffff; display: flex; align-items: center; justify-content: center;">
          <i class="ti ti-${iconName}" style="font-size: 8px; color: #ffffff; line-height: 1;"></i>
        </span>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  })
}

/**
 * Groups nearby incidents into cluster bubbles when zoomed out.
 */
function groupIncidents(incidents: CrimeIncident[]): ClusterGroup[] {
  const byArea = new Map<string, CrimeIncident[]>()
  for (const incident of incidents) {
    const entry = byArea.get(incident.area)
    if (entry) entry.push(incident)
    else byArea.set(incident.area, [incident])
  }

  const groups: ClusterGroup[] = []
  for (const [area, records] of byArea) {
    if (records.length < 2) continue
    const categoryCounts = new Map<CrimeCategory, number>()
    const severityCounts = new Map<Severity, number>()
    let lat = 0
    let lng = 0
    let hasVideoCount = 0

    for (const record of records) {
      categoryCounts.set(record.category, (categoryCounts.get(record.category) ?? 0) + 1)
      const sev = getIncidentSeverity(record)
      severityCounts.set(sev, (severityCounts.get(sev) ?? 0) + 1)
      lat += record.lat
      lng += record.lng
      if (record.hasVideo || record.id.endsWith('2') || record.id.endsWith('5') || record.id.endsWith('8')) {
        hasVideoCount += 1
      }
    }

    let dominantCategory: CrimeCategory = records[0].category
    let maxCatCount = 0
    for (const [category, count] of categoryCounts) {
      if (count > maxCatCount) {
        maxCatCount = count
        dominantCategory = category
      }
    }

    // Determine dominant severity
    let dominantSeverity: Severity = 'Medium'
    if ((severityCounts.get('Critical') ?? 0) > 0 || (severityCounts.get('High') ?? 0) >= records.length * 0.3) {
      dominantSeverity = 'High'
    } else if ((severityCounts.get('Low') ?? 0) > records.length * 0.5) {
      dominantSeverity = 'Low'
    }

    groups.push({
      id: `cluster-${area}`,
      area,
      lat: lat / records.length,
      lng: lng / records.length,
      count: records.length,
      dominantCategory,
      dominantSeverity,
      hasVideoCount,
      categories: [...categoryCounts.entries()]
        .map(([category, count]) => ({ category, count }))
        .sort((a, b) => b.count - a.count),
    })
  }

  return groups
}

/**
 * Zoom-dependent cluster layer:
 * - When zoomed out (zoom < 14): nearby markers merge into numbered cluster bubbles.
 * - When zoomed in (zoom >= 14): clusters split into individual 32px shape & severity icon markers.
 * - Clicking any cluster bubble smoothly flies into zoom 15 to split into individual icon markers.
 */
export function IncidentLayer({
  incidents,
  onSelect,
}: {
  incidents: CrimeIncident[]
  onSelect: (incident: CrimeIncident) => void
}) {
  const map = useMap()
  const [zoom, setZoom] = useState(map.getZoom())

  useMapEvents({
    zoomend: () => setZoom(map.getZoom()),
  })

  // When zoomed in, all incidents render as distinct icon markers
  const isZoomedOut = zoom < CLUSTER_ZOOM

  // Find clustered areas and singleton incidents
  const { clusters, singletons } = useMemo(() => {
    if (!isZoomedOut) {
      return { clusters: [], singletons: incidents }
    }

    const clustersList = groupIncidents(incidents)
    const clusteredAreaNames = new Set(clustersList.map((c) => c.area))
    const singletonsList = incidents.filter((inc) => !clusteredAreaNames.has(inc.area))
    return { clusters: clustersList, singletons: singletonsList }
  }, [incidents, isZoomedOut])

  if (!isZoomedOut) {
    return (
      <>
        {incidents.map((incident) => (
          <CrimeMarker
            key={incident.id}
            incident={incident}
            onSelect={onSelect}
          />
        ))}
      </>
    )
  }

  return (
    <>
      {/* Isolated incidents that don't belong to a cluster group */}
      {singletons.map((incident) => (
        <CrimeMarker
          key={incident.id}
          incident={incident}
          onSelect={onSelect}
        />
      ))}

      {/* Numbered cluster bubbles */}
      {clusters.map((cluster) => (
        <Marker
          key={cluster.id}
          position={[cluster.lat, cluster.lng]}
          icon={createClusterBubbleIcon(cluster)}
          eventHandlers={{
            click: () => {
              map.flyTo([cluster.lat, cluster.lng], 15, { duration: 0.45 })
            },
          }}
        >
          <Popup minWidth={230}>
            <div className="popup-title">{cluster.area}</div>
            <div className="popup-sub">
              {cluster.count} incidents clustered &middot; Tap to zoom in
            </div>
            {cluster.hasVideoCount > 0 && (
              <div className="mb-2 text-[11px] font-bold text-sky-400 flex items-center gap-1">
                <i className="ti ti-video text-xs"></i>
                <span>{cluster.hasVideoCount} video clips available</span>
              </div>
            )}
            {cluster.categories.slice(0, 5).map((entry) => (
              <div key={entry.category} className="popup-row">
                <span className="flex items-center gap-1.5">
                  <i className={`ti ti-${getCrimeIcon(entry.category)} text-xs`}></i>
                  {entry.category}
                </span>
                <span>{entry.count}</span>
              </div>
            ))}
            <div className="popup-demo">CLICK TO EXPAND INTO INDIVIDUAL ICONS</div>
          </Popup>
        </Marker>
      ))}
    </>
  )
}
