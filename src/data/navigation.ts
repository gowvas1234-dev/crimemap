import {
  Brain,
  Car,
  FileText,
  Flame,
  LayoutDashboard,
  Landmark,
  Map,
  ShieldAlert,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'
import type { AppView } from '../types'

export interface NavItem {
  id: AppView
  label: string
  icon: LucideIcon
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Data Explorer', icon: LayoutDashboard },
  { id: 'trends', label: 'Crime Trends', icon: TrendingUp },
  { id: 'map', label: 'Interactive Map', icon: Map },
  { id: 'hotspots', label: 'Risk Zones', icon: Flame },
  { id: 'predictive-risk', label: 'Risk Forecast', icon: ShieldAlert },
  { id: 'intelligence', label: 'Intelligence', icon: Brain },
  { id: 'patrol', label: 'Patrol Simulation', icon: Car },
  { id: 'stations', label: 'Police Stations', icon: Landmark },
  { id: 'reports', label: 'Reports & Docs', icon: FileText },
]
