import type { Vehicle, Inquiry, CreateVehiclePayload, UpdateVehiclePayload, UpdateInquiryPayload, VehicleFilter, InquiryPayload } from '~/types'

// Use Nitro Storage for Persistence
const getStorage = () => useStorage('data')

export const readVehiclesRaw = async (): Promise<Vehicle[]> => {
  const storage = getStorage()
  const keys = await storage.getKeys('vehicles')
  const vehicles: Vehicle[] = []
  
  for (const key of keys) {
    const vehicle = await storage.getItem<Vehicle>(key)
    if (vehicle) vehicles.push(vehicle)
  }
  
  return vehicles
}

export const readVehicles = async (params: Partial<VehicleFilter> & { limit?: number, featured?: boolean }) => {
  const { page = 1, limit = 20, search = '', category = '', status = '', sort = 'newest', featured } = params
  let filtered = await readVehiclesRaw()

  if (search) {
    const s = search.toLowerCase()
    filtered = filtered.filter(v => 
      v.title.toLowerCase().includes(s) || 
      v.make.toLowerCase().includes(s) || 
      v.model.toLowerCase().includes(s)
    )
  }
  if (category && category !== 'all') {
    filtered = filtered.filter(v => v.categoryId === category)
  }
  if (status && status !== 'all') {
    filtered = filtered.filter(v => v.status === status)
  }
  if (featured !== undefined) {
    filtered = filtered.filter(v => v.featured === featured)
  }

  // Sorting
  if (sort === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price)
  } else if (sort === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price)
  } else {
    // Newest first
    filtered.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
  }

  const total = filtered.length
  const totalPages = Math.ceil(total / limit)
  const start = (page - 1) * limit
  
  return {
    vehicles: filtered.slice(start, start + limit),
    total,
    page,
    totalPages
  }
}

export const readVehicleBySlug = async (slug: string): Promise<Vehicle | null> => {
  const vehicles = await readVehiclesRaw()
  return vehicles.find(v => v.slug === slug) || null
}

export const readVehicleById = async (id: string): Promise<Vehicle | null> => {
  const storage = getStorage()
  return await storage.getItem<Vehicle>(`vehicles:${id}`)
}

export const createVehicle = async (data: CreateVehiclePayload) => {
  const storage = getStorage()
  const id = Math.random().toString(36).slice(2, 9)
  const newVehicle: Vehicle = {
    ...data,
    id,
    dateAdded: new Date().toISOString()
  }
  await storage.setItem(`vehicles:${id}`, newVehicle)
  return newVehicle
}

export const updateVehicle = async (id: string, data: UpdateVehiclePayload) => {
  const storage = getStorage()
  const existing = await storage.getItem<Vehicle>(`vehicles:${id}`)
  if (!existing) return undefined
  
  const updatedVehicle: Vehicle = { 
    ...existing, 
    ...data,
    id // Ensure ID remains unchanged
  } as Vehicle
  
  await storage.setItem(`vehicles:${id}`, updatedVehicle)
  return updatedVehicle
}

export const deleteVehicle = async (id: string) => {
  const storage = getStorage()
  await storage.removeItem(`vehicles:${id}`)
}

// Inquiries persistence
export const createInquiry = async (data: InquiryPayload) => {
  const storage = getStorage()
  const id = Math.random().toString(36).slice(2, 9)
  const newInquiry: Inquiry = {
    ...data,
    id,
    status: 'new',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  await storage.setItem(`inquiries:${id}`, newInquiry)
  return newInquiry
}

export const readInquiries = async () => {
  const storage = getStorage()
  const keys = await storage.getKeys('inquiries')
  const items: Inquiry[] = []
  for (const key of keys) {
    const item = await storage.getItem<Inquiry>(key)
    if (item) items.push(item)
  }
  return items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export const updateInquiry = async (id: string, data: UpdateInquiryPayload) => {
  const storage = getStorage()
  const existing = await storage.getItem<Inquiry>(`inquiries:${id}`)
  if (!existing) return undefined
  
  const updatedInquiry: Inquiry = { 
    ...existing, 
    ...data, 
    id, 
    updatedAt: new Date().toISOString() 
  } as Inquiry
  
  await storage.setItem(`inquiries:${id}`, updatedInquiry)
  return updatedInquiry
}
