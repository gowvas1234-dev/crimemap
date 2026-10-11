import { X } from 'lucide-react'
import { useEffect, useMemo } from 'react'
import { Circle, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import type { RiskZone } from '../../types'
import { formatPercent } from '../../utils/format'
import { RISK_LEVEL_COLORS } from '../../utils/visuals'
import { RiskBadge, TrendIndicator } from '../ui/Badge'

interface RiskZoneLayerProps {
  zones: RiskZone[]
  selectedZoneId: string | null
  onSelect: (zoneId: string) => void
}

/**
 * Pulse speed by risk level:
 * - Critical: 0.75s (super fast urgent alert pulse)
 * - High: 1.2s
 * - Medium: 2.0s
 * - Low: 3.0s
 */
const RISK_PULSE_DURATIONS: Record<string, string> = {
  Critical: '0.75s',
  High: '1.2s',
  Medium: '2.0s',
  Low: '3.0s',
}

/**
 * Center icon marker for risk zones:
 * - Critical zones: urgent siren icon (<i class="ti ti-siren"></i>)
 * - Hotspot zones: flame icon (<i class="ti ti-flame"></i>)
 * - Pulsing ring around marker that pulses faster for higher risk
 */
function createZoneCenterIcon(zone: RiskZone, selected: boolean): L.DivIcon {
  const isCritical = zone.riskLevel === 'Critical'
  const color = RISK_LEVEL_COLORS[zone.riskLevel]
  const pulseDuration = RISK_PULSE_DURATIONS[zone.riskLevel] ?? '1.5s'
  const iconClass = isCritical ? 'ti-siren' : 'ti-flame'

  return L.divIcon({
    className: 'zone-center-marker-wrap',
    html: `
      <div class="zone-center-pin" role="button" aria-label="${zone.area} ${zone.riskLevel} hotspot" style="
        position: relative;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      ">
        <!-- Pulsing Ring: faster for higher risk -->
        <span class="pulsing-risk-ring" style="
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 2px solid ${color};
          animation: zonePulse ${pulseDuration} cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
          pointer-events: none;
        "></span>
        <!-- Center Icon Badge -->
        <div style="
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background-color: ${color};
          border: ${selected ? '2.5px solid #ffffff' : '2px solid #ffffff'};
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
          position: relative;
          z-index: 2;
          transform: ${selected ? 'scale(1.15)' : 'scale(1)'};
          transition: transform 0.15s ease;
        ">
          <i class="ti ${iconClass}" style="font-size: 17px; color: #ffffff; line-height: 1;"></i>
        </div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -18],
  })
}

/** Translucent risk zone circles with flame/siren center icons and risk-timed pulsing rings. */
export function RiskZoneLayer({ zones, selectedZoneId, onSelect }: RiskZoneLayerProps) {
  const map = useMap()

  /** Dismiss the zone popup whenever the selected zone is cleared. */
  useEffect(() => {
    if (selectedZoneId === null) {
      map.closePopup()
    }
  }, [selectedZoneId, map])

  const centerIcons = useMemo(
    () => new Map(zones.map((zone) => [zone.id, createZoneCenterIcon(zone, zone.id === selectedZoneId)])),
    [zones, selectedZoneId],
  )

  return (
    <>
      {zones.map((zone) => {
        const color = RISK_LEVEL_COLORS[zone.riskLevel]
        const selected = zone.id === selectedZoneId
        const handleSelect = () => onSelect(zone.id)

        return (
          <div key={zone.id}>
            {/* Spatial Risk Circle */}
            <Circle
              center={[zone.lat, zone.lng]}
              radius={zone.radiusMeters}
              eventHandlers={{ click: handleSelect }}
              pathOptions={{
                color: selected ? '#ffffff' : color,
                weight: selected ? 2.5 : 1.5,
                dashArray: zone.status === 'Contained' ? '4 6' : undefined,
                fillColor: color,
                fillOpacity: selected ? 0.28 : 0.16,
              }}
            />

            {/* Center Flame / Siren Icon with Pulsing Ring */}
            <Marker
              position={[zone.lat, zone.lng]}
              icon={centerIcons.get(zone.id)}
              zIndexOffset={500}
              eventHandlers={{ click: handleSelect }}
            >
              <Popup minWidth={260}>
                <div className="popup-title flex items-center gap-2">
                  <i className={`ti ${zone.riskLevel === 'Critical' ? 'ti-siren text-red-400' : 'ti-flame text-amber-400'}`}></i>
                  <span>{zone.area}</span>
                  <span className="text-steel-400 font-mono text-xs">({zone.id})</span>
                </div>
                <div className="popup-sub">
                  {zone.riskLevel === 'Critical' ? 'Urgent High-Risk Hotspot' : 'Detected Risk Hotspot Zone'}
                </div>
                <div className="popup-row">
                  <span>Risk score</span>
                  <span style={{ color, fontWeight: 800 }}>
                    {zone.riskScore} / 100 ({zone.riskLevel})
                  </span>
                </div>
                <div className="popup-row">
                  <span>Recent incidents</span>
                  <span>
                    {zone.crimeCount} (prev {zone.previousCount})
                  </span>
                </div>
                <div className="popup-row">
                  <span>Trend</span>
                  <span>
                    {zone.trend} ({formatPercent(zone.trendPercent)})
                  </span>
                </div>
                <div className="popup-row">
                  <span>Dominant crime</span>
                  <span>{zone.dominantCrime}</span>
                </div>
                <div className="popup-row">
                  <span>Peak time</span>
                  <span>{zone.peakWindow}</span>
                </div>
                <div className="popup-row">
                  <span>Zone radius</span>
                  <span>{zone.radiusMeters} m</span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <RiskBadge level={zone.riskLevel} />
                  <TrendIndicator trend={zone.trend} percent={zone.trendPercent} />
                </div>
                <div className="popup-demo">DEMO DATA - NOT REAL CRIME INFORMATION</div>
                <button
                  type="button"
                  onClick={() => map.closePopup()}
                  className="mt-2 flex w-full items-center justify-center gap-1 rounded border border-navy-600 bg-navy-800 px-2 py-1.5 text-[11px] font-semibold text-steel-200 transition-colors hover:bg-navy-700 hover:text-white"
                >
                  <X className="size-3.5" aria-hidden /> Close hotspot
                </button>
              </Popup>
            </Marker>
          </div>
        )
      })}
    </>
  )
}
