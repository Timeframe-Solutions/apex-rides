export type InquiryStatus = "new" | "contacted" | "closed"

export interface Inquiry {
  id:          string
  vehicleId?:  string
  vehicleRef?: string
  name:        string
  phone:       string
  email?:      string
  message:     string
  status:      InquiryStatus
  createdAt:   string
  updatedAt:   string
}

export type UpdateInquiryPayload = Partial<Omit<Inquiry, 'id' | 'createdAt' | 'updatedAt'>>

export interface InquiryPayload {
  vehicleId?: string
  name:       string
  phone:      string
  email?:     string
  message:    string
}
