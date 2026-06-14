import type { Inquiry } from './inquiry'

export interface DashboardStats {
  totalVehicles:    number
  availableVehicles:number
  totalInquiries:   number
  newInquiries:     number
  totalCategories:  number
  recentInquiries:  Inquiry[]
}

export interface AuditLog {
  id:        string
  userId:    string
  action:    string
  resource:  string
  meta:      Record<string, unknown>
  createdAt: string
}

export interface AdminUser {
  id:    string
  name:  string
  email: string
  role:  "super_admin" | "editor"
}
