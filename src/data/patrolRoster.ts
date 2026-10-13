import type { PatrolOfficer, PatrolVehicle } from '../types'

export interface PatrolRosterEntry {
  officer: PatrolOfficer
  partnerOfficer: PatrolOfficer
  vehicle: PatrolVehicle
  baseSector: string
  tacticalRole: string
}

/**
 * Puducherry Police Department
 * Tactical Patrol Fleet Roster & Vehicle Assignments.
 * Contains patrolling cop details, designations, vehicles in use, and patrol areas.
 */
export const PATROL_FLEET_ROSTER: PatrolRosterEntry[] = [
  {
    officer: {
      name: 'Insp. R. Anbarasan',
      designation: 'Inspector of Police / Sector In-Charge',
      badgeNumber: 'PY-PD-4102',
      contactRadio: 'TAC-CH-01 (VHF 154.25 MHz)',
      phone: '+91 94892 01001',
    },
    partnerOfficer: {
      name: 'HC P. Murugan',
      designation: 'Head Constable / Interceptor Pilot',
      badgeNumber: 'PY-PD-7082',
      contactRadio: 'TAC-CH-01',
    },
    vehicle: {
      name: 'Mahindra Bolero Interceptor 4x4',
      type: 'Tactical SUV Interceptor',
      registrationNumber: 'PY-01-G-2481',
      equipment: [
        'Roof LED Lightbar',
        'VHF TETRA Radio',
        'PA Megaphone',
        'Dashcam Recorder',
        'Medical Trauma Kit',
        'Speed Radar',
      ],
    },
    baseSector: 'White Town & Promenade Beach Heritage Corridor',
    tacticalRole: 'VIP & Beachfront Anti-Crime Interceptor',
  },
  {
    officer: {
      name: 'SI S. Vignesh',
      designation: 'Sub-Inspector of Police / Mobile Beat Lead',
      badgeNumber: 'PY-PD-3844',
      contactRadio: 'TAC-CH-02 (VHF 154.35 MHz)',
      phone: '+91 94892 01002',
    },
    partnerOfficer: {
      name: 'PC K. Senthil',
      designation: 'Police Constable / Wireless Operator',
      badgeNumber: 'PY-PD-8114',
      contactRadio: 'TAC-CH-02',
    },
    vehicle: {
      name: 'Tata Xenon Tactical Patrol Cruiser',
      type: 'Heavy Tactical Cruiser',
      registrationNumber: 'PY-01-G-3109',
      equipment: [
        'Dual Strobe Lightbar',
        'ANPR License Plate Camera',
        'Strobe Spotlight',
        'Breathalyzer',
        'GPS Transponder',
      ],
    },
    baseSector: 'Muthialpet Commercial Market & East Coast Highway',
    tacticalRole: 'Commercial Grid & ECR Transit Security',
  },
  {
    officer: {
      name: 'SI M. Selvam',
      designation: 'Sub-Inspector of Police / Night Surveillance Unit',
      badgeNumber: 'PY-PD-5219',
      contactRadio: 'TAC-CH-03 (VHF 154.45 MHz)',
      phone: '+91 94892 01003',
    },
    partnerOfficer: {
      name: 'HC T. Balaji',
      designation: 'Head Constable / Sector Guard',
      badgeNumber: 'PY-PD-6932',
      contactRadio: 'TAC-CH-03',
    },
    vehicle: {
      name: 'Maruti Suzuki Ertiga PCR Mobile Van',
      type: 'PCR Mobile Dispatch Van',
      registrationNumber: 'PY-01-G-1904',
      equipment: [
        'Emergency Siren',
        '360° Floodlight',
        'Barrier Cones',
        'Incident Log Tablet',
        'First Aid Trauma Pack',
      ],
    },
    baseSector: 'Lawspet Educational Institutional Hub & Airport Road',
    tacticalRole: 'Campus & Airport Zone Rapid Response',
  },
  {
    officer: {
      name: 'Insp. K. Saravanan',
      designation: 'Inspector of Police / Anti-Crime Flying Squad',
      badgeNumber: 'PY-PD-4088',
      contactRadio: 'TAC-CH-04 (VHF 154.55 MHz)',
      phone: '+91 94892 01004',
    },
    partnerOfficer: {
      name: 'PC A. Dinesh',
      designation: 'Police Constable / Tactical Driver',
      badgeNumber: 'PY-PD-8420',
      contactRadio: 'TAC-CH-04',
    },
    vehicle: {
      name: 'Mahindra Scorpio-N Pursuit Interceptor',
      type: 'High-Speed Pursuit SUV',
      registrationNumber: 'PY-01-G-4050',
      equipment: [
        'Reinforced Bull-Bar',
        'High-Speed ANPR Camera',
        'Night-Vision Spotlight',
        'Tactical Spike Strips',
      ],
    },
    baseSector: 'Nellithope Main Junction & Marapalam Ring Road',
    tacticalRole: 'Arterial Ring Road & Heavy Traffic Intercept',
  },
  {
    officer: {
      name: 'SI V. Priya',
      designation: 'Sub-Inspector of Police / Rapid Action Beat',
      badgeNumber: 'PY-PD-3920',
      contactRadio: 'TAC-CH-05 (VHF 154.65 MHz)',
      phone: '+91 94892 01005',
    },
    partnerOfficer: {
      name: 'HC G. Manikandan',
      designation: 'Head Constable / Tactical Officer',
      badgeNumber: 'PY-PD-7241',
      contactRadio: 'TAC-CH-05',
    },
    vehicle: {
      name: 'Toyota Innova Crysta Command Van',
      type: 'Tactical Sector Command Van',
      registrationNumber: 'PY-01-G-5512',
      equipment: [
        'Multi-Channel Radio Terminal',
        'Tactical Cordon Ribbon',
        'PA Megaphone',
        'Riot Shield Pack',
      ],
    },
    baseSector: 'Mudaliarpet Industrial Grid & Cuddalore Road',
    tacticalRole: 'Industrial Sector & Highway Gateway Patrol',
  },
  {
    officer: {
      name: 'ASI E. Mohan',
      designation: 'Assistant Sub-Inspector / Quick Response Squad',
      badgeNumber: 'PY-PD-4610',
      contactRadio: 'TAC-CH-06 (VHF 154.75 MHz)',
      phone: '+91 94892 01006',
    },
    partnerOfficer: {
      name: 'PC S. Karthik',
      designation: 'Police Constable / Rapid Rider',
      badgeNumber: 'PY-PD-8805',
      contactRadio: 'TAC-CH-06',
    },
    vehicle: {
      name: 'Royal Enfield Bullet 350 Twin Interceptor (Bike Duo)',
      type: 'Quick Response Beat Bike',
      registrationNumber: 'PY-01-E-7822',
      equipment: [
        'Dual Strobe Flashers',
        'Wireless Helmet Comm',
        'Bodycam HD Recording',
        'Emergency First Aid Bag',
      ],
    },
    baseSector: 'Villianur Temple Town & West Arterial Corridor',
    tacticalRole: 'Congested Alleyways & Fast Highway Pursuit',
  },
]
