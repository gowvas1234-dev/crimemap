import L from 'leaflet'
import { Marker, Popup } from 'react-leaflet'
import { useMemo } from 'react'
import type { GeoPoint } from '../../types'
import { usePatrol } from '../../patrol/usePatrol'

const STATUS_COLORS: Record<string, string> = {
  Standby: '#94a3b8',
  Deploying: '#facc15',
  Patrolling: '#22c55e',
}

/**
 * Patrol unit icon marker:
 * - Tabler car icon (<i class="ti ti-car"></i>)
 * - Blinking red REC dot
 * - Callsign label (e.g. Guardian-1, Hunter-1, Falcon-1)
 */
function patrolIcon(callsign: string, status: string): L.DivIcon {
  const color = STATUS_COLORS[status] ?? '#38bdf8'

  return L.divIcon({
    className: 'patrol-marker-wrap',
    html: `
      <div class="patrol-marker-bubble" style="
        display: inline-flex;
        align-items: center;
        gap: 5px;
        padding: 3px 9px 3px 7px;
        border-radius: 999px;
        background: rgba(8, 18, 32, 0.94);
        border: 1.5px solid ${color};
        color: #ffffff;
        font-size: 11px;
        font-weight: 700;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.55);
        cursor: pointer;
        user-select: none;
      ">
        <i class="ti ti-car" style="font-size: 15px; color: #38bdf8; line-height: 1;"></i>
        <span style="display: inline-flex; align-items: center; gap: 3px;">
          <span class="blinking-rec-dot" style="
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background-color: #ef4444;
            display: inline-block;
            box-shadow: 0 0 6px #ef4444;
            animation: recBlink 1s ease-in-out infinite;
          "></span>
          <span style="font-size: 9px; font-weight: 800; color: #ef4444; letter-spacing: 0.04em;">REC</span>
        </span>
        <b style="color: #ffffff; font-size: 11px; letter-spacing: 0.02em;">${callsign}</b>
      </div>
    `,
    iconSize: [85, 26],
    iconAnchor: [42, 13],
  })
}

interface PatrolLayerProps {
  /** Optional boundary test; units outside the city boundary are hidden. */
  isInside?: (point: GeoPoint) => boolean
}

/** Animated patrol units driven by the simulation context. */
export function PatrolLayer({ isInside }: PatrolLayerProps = {}) {
  const { units } = usePatrol()
  const visibleUnits = useMemo(
    () => (isInside ? units.filter((unit) => isInside({ lat: unit.displayLat, lng: unit.displayLng })) : units),
    [units, isInside],
  )
  const icons = useMemo(
    () => new Map(visibleUnits.map((unit) => [unit.id, patrolIcon(unit.callsign, unit.displayStatus)])),
    [visibleUnits],
  )

  return (
    <>
      {visibleUnits.map((unit) => (
        <Marker
          key={unit.id}
          position={[unit.displayLat, unit.displayLng]}
          icon={icons.get(unit.id)}
          zIndexOffset={600}
        >
          <Popup minWidth={240}>
            <div className="popup-title">
              {unit.callsign} <span className="text-steel-400">({unit.id})</span>
            </div>
            <div className="popup-sub flex items-center gap-1.5 mt-0.5">
              <span className="size-2 rounded-full bg-red-500 animate-pulse"></span>
              <span className="text-red-400 font-bold text-[11px]">LIVE DASHCAM RECORDING</span>
            </div>
            <div className="popup-row mt-2">
              <span>Status</span>
              <span style={{ color: STATUS_COLORS[unit.displayStatus] }}>{unit.displayStatus}</span>
            </div>
            <div className="popup-row">
              <span>Base</span>
              <span>{unit.stationName}</span>
            </div>
            <div className="popup-row">
              <span>Assigned zone</span>
              <span>{unit.zoneArea}</span>
            </div>
            <div className="popup-row">
              <span>ETA</span>
              <span>{unit.etaMinutes > 0 ? `${unit.etaMinutes} min` : 'On station'}</span>
            </div>
            <div className="popup-demo">SIMULATED PATROL UNIT - CAMERA ONLINE</div>
          </Popup>
        </Marker>
      ))}
    </>
  )
}
