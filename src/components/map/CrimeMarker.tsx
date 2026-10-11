import L from 'leaflet'
import { Marker } from 'react-leaflet'
import type { CrimeIncident } from '../../types'
import {
  getCrimeIcon,
  getIncidentSeverity,
  getSeverityColor,
  hasIncidentVideo,
} from '../../utils/crimeIcons'

interface CrimeMarkerProps {
  incident: CrimeIncident
  onSelect: (incident: CrimeIncident) => void
}

/**
 * Creates a 32px circular marker with:
 * - 2px white border
 * - 18px centered white Tabler icon representing crime type by shape
 * - Background color representing severity (High: #E24B4A, Medium: #EF9F27, Low: #378ADD)
 * - Corner camera badge if a video clip is available
 */
function createCrimeMarkerIcon(incident: CrimeIncident): L.DivIcon {
  const iconName = getCrimeIcon(incident.category)
  const severity = getIncidentSeverity(incident)
  const bgColor = getSeverityColor(severity)
  const hasVideo = hasIncidentVideo(incident)

  const videoBadgeHtml = hasVideo
    ? `<span class="marker-video-badge" title="Video clip available" style="
        position: absolute;
        top: -4px;
        right: -4px;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: #0f172a;
        border: 1.5px solid #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 4px rgba(0,0,0,0.5);
      "><i class="ti ti-video" style="font-size: 8px; color: #38bdf8; line-height: 1;"></i></span>`
    : ''

  return L.divIcon({
    className: 'crime-icon-marker-wrap',
    html: `
      <div class="crime-marker-pin" role="button" aria-label="${incident.category} - ${severity} severity" style="
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background-color: ${bgColor};
        border: 2px solid #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.45);
        position: relative;
        cursor: pointer;
        transition: transform 0.15s ease, box-shadow 0.15s ease;
      ">
        <i class="ti ti-${iconName}" style="font-size: 18px; color: #ffffff; line-height: 1;"></i>
        ${videoBadgeHtml}
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -18],
  })
}

/**
 * Incident marker on the map with click and hover behavior.
 * Hovering or tapping opens the incident card with details and video clip.
 */
export function CrimeMarker({ incident, onSelect }: CrimeMarkerProps) {
  const icon = createCrimeMarkerIcon(incident)
  const handleSelect = () => onSelect(incident)

  return (
    <Marker
      position={[incident.lat, incident.lng]}
      icon={icon}
      bubblingMouseEvents={false}
      eventHandlers={{
        click: handleSelect,
        mouseover: handleSelect,
      }}
    />
  )
}