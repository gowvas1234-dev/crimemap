import { useEffect, useRef } from 'react'
import {
  CircleMarker,
  LayerGroup,
  LayersControl,
  MapContainer,
  Pane,
  Polygon,
  ScaleControl,
  TileLayer,
  ZoomControl,
  useMap,
} from 'react-leaflet'
import type { LeafletMouseEvent } from 'leaflet'
import { DEMO_AREAS, PUDUCHERRY_CENTER } from '../../data/areas'
import boundary from '../../data/puducherry-boundary.json'
import type {
  CrimeIncident,
  GeoPoint,
  PoliceStation,
  RiskZone,
} from '../../types'
import { ALL_AREAS } from '../../utils/filters'
import { IncidentLayer } from './ClusterLayer'
import { PatrolLayer } from './PatrolLayer'
import { PoliceStationMarker } from './PoliceStationMarker'
import { RiskZoneLayer } from './RiskZoneLayer'



/**
 * Outer max-bounds to keep user comfortably within Pondicherry territory.
 */
const PUDUCHERRY_MAX_BOUNDS: [[number, number], [number, number]] = [
  [11.72, 79.58],
  [12.12, 79.98],
]

/**
 * District outline converted from [longitude, latitude]
 * in the JSON asset to [latitude, longitude] for Leaflet.
 */
const BOUNDARY_POSITIONS: [number, number][] =
  boundary.outer.map(([lng, lat]) => [lat, lng])

/**
 * Outer ring for the outside-area mask covering the world.
 */
const WORLD_RING: [number, number][] = [
  [-85, -180],
  [-85, 180],
  [85, 180],
  [85, -180],
]

/**
 * Return true if the supplied coordinate is inside the
 * exterior boundary ring in puducherry-boundary.json.
 */
function isInsidePuducherry(lat: number, lng: number): boolean {
  const ring = boundary.outer
  let inside = false

  for (let i = 0, j = ring.length - 1; i < ring.length; j = i, i += 1) {
    const [xi, yi] = ring[i]
    const [xj, yj] = ring[j]

    const crosses =
      (yi > lat) !== (yj > lat) &&
      lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi

    if (crosses) {
      inside = !inside
    }
  }

  return inside
}

interface CrimeMapProps {
  incidents: CrimeIncident[]
  zones: RiskZone[]
  stations: PoliceStation[]
  selectedArea: string
  searchQuery: string
  selectedZoneId: string | null
  onSelectZone: (zoneId: string) => void
  onSelectIncident: (incident: CrimeIncident) => void
  onDeselectIncident: () => void
  pickingLocation: boolean
  onPickLocation: (point: GeoPoint) => void
}

/**
 * Smoothly pan/zoom to the selected Pondicherry area.
 */
function AreaCameraController({
  selectedArea,
}: {
  selectedArea: string
}) {
  const map = useMap()

  useEffect(() => {
    if (selectedArea === ALL_AREAS) {
      map.flyTo([11.933, 79.828], 13, { duration: 0.45 })
      return
    }

    const area = DEMO_AREAS.find((entry) => entry.name === selectedArea)
    if (area) {
      map.flyTo([area.lat, area.lng], 15, { duration: 0.45 })
    }
  }, [map, selectedArea])

  return null
}

/**
 * Focus the camera on an in-bound incident when search changes.
 */
function SearchFocusController({
  query,
  incidents,
}: {
  query: string
  incidents: CrimeIncident[]
}) {
  const map = useMap()
  const lastQuery = useRef('')

  useEffect(() => {
    const trimmed = query.trim()
    if (!trimmed) {
      lastQuery.current = ''
      return
    }

    if (trimmed === lastQuery.current) return
    lastQuery.current = trimmed

    const match = incidents.find((incident) =>
      isInsidePuducherry(incident.lat, incident.lng),
    )

    if (match) {
      map.flyTo([match.lat, match.lng], Math.max(map.getZoom(), 15), {
        duration: 0.5,
      })
    }
  }, [query, incidents, map])

  return null
}

/**
 * Close incident sheet on map click.
 */
function TapToDismiss({ onDeselect }: { onDeselect: () => void }) {
  const map = useMap()

  useEffect(() => {
    map.on('click', onDeselect)
    return () => {
      map.off('click', onDeselect)
    }
  }, [map, onDeselect])

  return null
}

/**
 * Capture a map click for new incident reporting within Pondicherry.
 */
function LocationPicker({
  active,
  onPick,
}: {
  active: boolean
  onPick: (point: GeoPoint) => void
}) {
  const map = useMap()

  useEffect(() => {
    if (!active) return

    const handleClick = (event: LeafletMouseEvent) => {
      const { lat, lng } = event.latlng
      if (!isInsidePuducherry(lat, lng)) return
      onPick({ lat, lng })
    }

    map.on('click', handleClick)
    return () => {
      map.off('click', handleClick)
    }
  }, [active, map, onPick])

  return null
}

/**
 * Crystal-Clear Pondicherry Crime Map.
 */
export function CrimeMap({
  incidents,
  zones,
  stations,
  selectedArea,
  searchQuery,
  selectedZoneId,
  onSelectZone,
  onSelectIncident,
  onDeselectIncident,
  pickingLocation,
  onPickLocation,
}: CrimeMapProps) {
  const selectedAreaTarget =
    selectedArea !== ALL_AREAS
      ? DEMO_AREAS.find((entry) => entry.name === selectedArea) ?? null
      : null

  return (
    <MapContainer
      center={[11.933, 79.828]}
      zoom={13}
      minZoom={12}
      maxZoom={18}
      maxBounds={PUDUCHERRY_MAX_BOUNDS}
      maxBoundsViscosity={0.7}
      zoomControl={false}
      scrollWheelZoom
      dragging
      touchZoom
      doubleClickZoom
      className="h-full w-full outline-none"
      style={{ height: '100%', minHeight: '560px', width: '100%' }}
    >
      {/* Base maps with Google Maps as default */}
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="Google Maps (Roadmap)">
          <TileLayer
            url="https://mt{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
            attribution='&copy; <a href="https://maps.google.com" target="_blank" rel="noreferrer">Google Maps</a>'
            maxZoom={20}
            subdomains={['0', '1', '2', '3']}
            keepBuffer={4}
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name="Google Maps (Hybrid Satellite)">
          <TileLayer
            url="https://mt{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
            attribution='&copy; <a href="https://maps.google.com" target="_blank" rel="noreferrer">Google Maps</a>'
            maxZoom={20}
            subdomains={['0', '1', '2', '3']}
            keepBuffer={4}
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name="Google Maps (Terrain)">
          <TileLayer
            url="https://mt{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}"
            attribution='&copy; <a href="https://maps.google.com" target="_blank" rel="noreferrer">Google Maps</a>'
            maxZoom={20}
            subdomains={['0', '1', '2', '3']}
            keepBuffer={4}
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name="High-Clarity Streets (Voyager)">
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
            maxZoom={19}
            subdomains="abcd"
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name="Tactical Dark (CartoDB Dark)">
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
            maxZoom={19}
            subdomains="abcd"
          />
        </LayersControl.BaseLayer>

        {/* Crisp Puducherry boundary outline */}
        <LayersControl.Overlay checked name="Puducherry boundary">
          <LayerGroup>
            <Polygon
              positions={BOUNDARY_POSITIONS}
              pathOptions={{
                color: '#0284c7',
                weight: 2.5,
                dashArray: '6 4',
                fill: true,
                fillColor: '#38bdf8',
                fillOpacity: 0.04,
                interactive: false,
              }}
            />
          </LayerGroup>
        </LayersControl.Overlay>

        {/* Crime incidents */}
        <LayersControl.Overlay checked name="Crime incidents">
          <LayerGroup>
            <IncidentLayer
              incidents={incidents}
              onSelect={onSelectIncident}
            />
          </LayerGroup>
        </LayersControl.Overlay>

        {/* Risk zones */}
        <LayersControl.Overlay checked name="Risk zones">
          <LayerGroup>
            <RiskZoneLayer
              zones={zones}
              selectedZoneId={selectedZoneId}
              onSelect={onSelectZone}
            />
          </LayerGroup>
        </LayersControl.Overlay>

        {/* Police stations */}
        <LayersControl.Overlay checked name="Police stations">
          <LayerGroup>
            {stations.map((station) => (
              <PoliceStationMarker
                key={station.id}
                station={station}
              />
            ))}
          </LayerGroup>
        </LayersControl.Overlay>

        {/* Simulated patrol units */}
        <LayersControl.Overlay checked name="Patrol units (simulated)">
          <LayerGroup>
            <PatrolLayer />
          </LayerGroup>
        </LayersControl.Overlay>
      </LayersControl>

      {/* Elegant outside-mask: dims areas outside Pondicherry while keeping the city vivid */}
      <Pane name="area-mask" style={{ zIndex: 350 }}>
        <Polygon
          positions={[WORLD_RING, BOUNDARY_POSITIONS]}
          pathOptions={{
            stroke: false,
            fill: true,
            fillColor: '#040814',
            fillOpacity: 0.68,
            fillRule: 'evenodd',
            interactive: false,
            className: 'area-mask',
          }}
        />
      </Pane>

      {/* Selected locality glowing target */}
      {selectedAreaTarget && (
        <CircleMarker
          center={[selectedAreaTarget.lat, selectedAreaTarget.lng]}
          radius={26}
          pathOptions={{
            color: '#06b6d4',
            weight: 2.5,
            dashArray: '4 4',
            fillColor: '#06b6d4',
            fillOpacity: 0.22,
          }}
          interactive={false}
        />
      )}

      {/* Controls */}
      <ZoomControl position="bottomright" />
      <ScaleControl position="bottomleft" imperial={false} />

      {/* Interaction controllers */}
      <AreaCameraController selectedArea={selectedArea} />
      <SearchFocusController query={searchQuery} incidents={incidents} />
      <TapToDismiss onDeselect={onDeselectIncident} />
      <LocationPicker active={pickingLocation} onPick={onPickLocation} />

      {/* Puducherry reference center beacon */}
      <CircleMarker
        center={[PUDUCHERRY_CENTER.lat, PUDUCHERRY_CENTER.lng]}
        radius={4}
        pathOptions={{
          color: '#38bdf8',
          weight: 2,
          fillColor: '#38bdf8',
          fillOpacity: 0.9,
        }}
        interactive={false}
      />
    </MapContainer>
  )
}
