import L from 'leaflet'

/**
 * Police station marker:
 * - 32px circular icon
 * - White 2px border
 * - Green background (#16a34a)
 * - White Tabler shield-check icon (18px)
 */
export const policeStationIcon = L.divIcon({
  className: 'crimemap-police-station-icon',
  html: `
    <div class="police-station-pin" role="img" aria-label="Police station" style="
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: #16a34a;
      border: 2px solid #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.45);
      cursor: pointer;
      transition: transform 0.15s ease;
    ">
      <i class="ti ti-shield-check" style="font-size: 18px; color: #ffffff; line-height: 1;"></i>
    </div>
  `,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -18],
})
