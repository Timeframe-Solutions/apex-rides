export interface Vehicle {
  id:           string
  slug:         string
  title:        string
  make:         string
  model:        string
  year:         number
  price:        number
  priceLabel:   string
  categoryId:   string
  category:     string
  status:       "available" | "reserved" | "sold"
  featured:     boolean
  mileage:      number
  transmission: "automatic" | "manual"
  fuelType:     "petrol" | "diesel" | "hybrid" | "electric"
  engine:       string
  seats:        number
  driveType:    "4WD" | "AWD" | "2WD"
  colour:       string
  condition:    "new" | "used" | "certified-pre-owned"
  description:  string
  features:     string[]
  images:       string[]
  metaTitle:    string
  metaDesc:     string
  dateAdded:    string
}

export type CreateVehiclePayload = Omit<Vehicle, 'id' | 'dateAdded'>
export type UpdateVehiclePayload = Partial<CreateVehiclePayload>

export interface VehicleFilter {
  search:   string
  category: string
  status:   string
  sort:     "newest" | "price-asc" | "price-desc"
  page:     number
}
