import type { Vehicle, Inquiry, CreateVehiclePayload, UpdateVehiclePayload, UpdateInquiryPayload, VehicleFilter, InquiryPayload } from '~/types'

// Use Nitro Storage for Persistence
const getStorage = () => useStorage('data')

export const readVehiclesRaw = async (): Promise<Vehicle[]> => {
  const storage = getStorage()
  return (await storage.getItem<Vehicle[]>('vehicles:all')) || []
}

export const saveVehiclesRaw = async (vehicles: Vehicle[]): Promise<void> => {
  const storage = getStorage()
  await storage.setItem('vehicles:all', vehicles)
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
  const vehicles = await readVehiclesRaw()
  return vehicles.find(v => v.id === id) || null
}

export const createVehicle = async (data: CreateVehiclePayload) => {
  const vehicles = await readVehiclesRaw()
  const id = Math.random().toString(36).slice(2, 9)
  const newVehicle: Vehicle = {
    ...data,
    id,
    dateAdded: new Date().toISOString()
  }
  vehicles.push(newVehicle)
  await saveVehiclesRaw(vehicles)
  return newVehicle
}

export const updateVehicle = async (id: string, data: UpdateVehiclePayload) => {
  const vehicles = await readVehiclesRaw()
  const index = vehicles.findIndex(v => v.id === id)
  if (index === -1) return undefined
  
  const updatedVehicle: Vehicle = { 
    ...vehicles[index], 
    ...data,
    id // Ensure ID remains unchanged
  } as Vehicle
  
  vehicles[index] = updatedVehicle
  await saveVehiclesRaw(vehicles)
  return updatedVehicle
}

export const deleteVehicle = async (id: string) => {
  const vehicles = await readVehiclesRaw()
  const filtered = vehicles.filter(v => v.id !== id)
  await saveVehiclesRaw(filtered)
}

// Inquiries persistence
export const readInquiries = async (): Promise<Inquiry[]> => {
  const storage = getStorage()
  return (await storage.getItem<Inquiry[]>('inquiries:all')) || []
}

export const saveInquiries = async (items: Inquiry[]): Promise<void> => {
  const storage = getStorage()
  await storage.setItem('inquiries:all', items)
}

export const createInquiry = async (data: InquiryPayload) => {
  const items = await readInquiries()
  const id = Math.random().toString(36).slice(2, 9)
  const newInquiry: Inquiry = {
    ...data,
    id,
    status: 'new',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  items.push(newInquiry)
  await saveInquiries(items)
  return newInquiry
}

export const updateInquiry = async (id: string, data: UpdateInquiryPayload) => {
  const items = await readInquiries()
  const index = items.findIndex(i => i.id === id)
  if (index === -1) return undefined
  
  const updatedInquiry: Inquiry = { 
    ...items[index], 
    ...data, 
    id, 
    updatedAt: new Date().toISOString() 
  } as Inquiry
  
  items[index] = updatedInquiry
  await saveInquiries(items)
  return updatedInquiry
}
