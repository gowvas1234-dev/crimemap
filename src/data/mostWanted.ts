export interface WantedPerson {
  id: string
  name: string
  alias: string
  photo: string
  gender: 'Male' | 'Female'
  age: number
  height: string
  identifyingMarks: string
  charges: string[]
  primaryCategory: 'Violent Crimes' | 'Armed Robbery' | 'Extortion & Gangs' | 'Financial & Cyber' | 'Narcotics'
  warrantNumber: string
  warrantDate: string
  issuingAuthority: string
  lastKnownArea: string
  rewardAmount: string
  threatLevel: 'Critical' | 'High' | 'Moderate'
  cautionNotice: string
  status: 'At Large' | 'Interpol Red Notice' | 'Surveillance Active'
}

export const MOST_WANTED_LIST: WantedPerson[] = [
  {
    id: "PY-WNT-2025-01",
    name: "K. Murugan",
    alias: "Black Cobra",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
    gender: "Male",
    age: 38,
    height: "5'9\" (175 cm)",
    identifyingMarks: "Deep scar on left jawline, scorpion tattoo on right forearm",
    charges: [
      "Section 395 IPC (Armed Dacoity)",
      "Section 307 IPC (Attempt to Murder)",
      "Explosives Substances Act (Sec 3 & 5)"
    ],
    primaryCategory: "Violent Crimes",
    warrantNumber: "NBW-PY-2025-0842",
    warrantDate: "14 Aug 2025",
    issuingAuthority: "Chief Judicial Magistrate Court, Puducherry",
    lastKnownArea: "Muthialpet / Lawspet Border",
    rewardAmount: "₹1,50,000",
    threatLevel: "Critical",
    cautionNotice: "Considered armed and dangerous. Known to carry illegal firearms.",
    status: "At Large"
  },
  {
    id: "PY-WNT-2025-02",
    name: "Antony Rozario",
    alias: "Tony Ghost",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
    gender: "Male",
    age: 36,
    height: "6'0\" (183 cm)",
    identifyingMarks: "Burn mark on right shoulder, speaks French, Tamil and English",
    charges: [
      "NDPS Act Sec 21(c) (Commercial Narcotics Syndicate)",
      "Maritime Smuggling Regulations",
      "Hawala Remittance (PMLA Act)"
    ],
    primaryCategory: "Narcotics",
    warrantNumber: "NBW-PY-2026-0092",
    warrantDate: "22 Jan 2026",
    issuingAuthority: "Special NDPS Court, Puducherry",
    lastKnownArea: "Ariyankuppam / Coastal Belt",
    rewardAmount: "₹2,00,000",
    threatLevel: "Critical",
    cautionNotice: "Maritime lookout bulletin issued. May attempt sea-route escape.",
    status: "Interpol Red Notice"
  },
  {
    id: "PY-WNT-2025-03",
    name: "S. Dinesh Kumar",
    alias: "Kattari",
    photo: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=300&auto=format&fit=crop&q=80",
    gender: "Male",
    age: 41,
    height: "5'7\" (170 cm)",
    identifyingMarks: "Missing tip of right index finger, trident tattoo on neck",
    charges: [
      "Section 386 IPC (Extortion by putting person in fear of death)",
      "Arms Act 25(1B)",
      "Organized Crime Syndicate Act"
    ],
    primaryCategory: "Extortion & Gangs",
    warrantNumber: "NBW-PY-2025-0417",
    warrantDate: "09 May 2025",
    issuingAuthority: "Sub-Divisional Magistrate, Oulgaret",
    lastKnownArea: "Oulgaret / Villianur Junction",
    rewardAmount: "₹1,00,000",
    threatLevel: "High",
    cautionNotice: "Extortion network operating across real estate and transit hubs.",
    status: "At Large"
  },
  {
    id: "PY-WNT-2025-04",
    name: "Vikram Sharma",
    alias: "Wireman",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80",
    gender: "Male",
    age: 33,
    height: "5'11\" (180 cm)",
    identifyingMarks: "Spectacles, mole near right ear, proficient in multiple VPN networks",
    charges: [
      "IT Act Sec 66C & 66D (Identity Theft & Financial Fraud)",
      "Section 420 IPC (Cheating & Forgery ₹4.2 Cr)",
      "Ransomware Distribution Syndicate"
    ],
    primaryCategory: "Financial & Cyber",
    warrantNumber: "NBW-PY-2025-1109",
    warrantDate: "18 Oct 2025",
    issuingAuthority: "Cyber Crime Police Station, Puducherry",
    lastKnownArea: "White Town / Boulevard",
    rewardAmount: "₹75,000",
    threatLevel: "High",
    cautionNotice: "Suspected in cross-border phishing operations targeting banking institutions.",
    status: "At Large"
  },
  {
    id: "PY-WNT-2025-05",
    name: "M. Selvaraj",
    alias: "Keymaster",
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80",
    gender: "Male",
    age: 46,
    height: "5'8\" (173 cm)",
    identifyingMarks: "Limp in right leg, surgical scar across upper abdomen",
    charges: [
      "Section 457 & 380 IPC (Lurking House-trespass & Grand Theft)",
      "Receiver of Stolen Bullion Goods",
      "Repeated Habitual Offender Act"
    ],
    primaryCategory: "Armed Robbery",
    warrantNumber: "NBW-PY-2025-1433",
    warrantDate: "03 Dec 2025",
    issuingAuthority: "Judicial Magistrate I, Puducherry",
    lastKnownArea: "Gorimedu / JIPMER Perimeter",
    rewardAmount: "₹50,000",
    threatLevel: "Moderate",
    cautionNotice: "Expert lock bypass operator targeting locked residences and jewelers.",
    status: "Surveillance Active"
  },
  {
    id: "PY-WNT-2025-06",
    name: "R. Vigneshwaran",
    alias: "Shadow",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80",
    gender: "Male",
    age: 29,
    height: "5'10\" (178 cm)",
    identifyingMarks: "Dragon tattoo on left shoulder, birthmark below collarbone",
    charges: [
      "Section 379 IPC (Interstate Luxury Vehicle Theft)",
      "Section 468 & 471 IPC (Forged Engine Number & Registration)",
      "Tampering with Electronic Vehicle GPS"
    ],
    primaryCategory: "Violent Crimes",
    warrantNumber: "NBW-PY-2026-0315",
    warrantDate: "11 Feb 2026",
    issuingAuthority: "Traffic & Crime Investigation Wing, Puducherry",
    lastKnownArea: "Reddiarpalayam / Indira Gandhi Square",
    rewardAmount: "₹50,000",
    threatLevel: "Moderate",
    cautionNotice: "Runs vehicle cloning racket across East Coast Road (ECR) corridors.",
    status: "At Large"
  }
]
