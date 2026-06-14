export default defineEventHandler(async (event) => {
  // Mock categories
  return [
    { id: 'suv', name: 'SUV', slug: 'suv', count: 12 },
    { id: 'sedan', name: 'Sedan', slug: 'sedan', count: 8 },
    { id: 'pickup', name: 'Pickup', slug: 'pickup', count: 4 },
  ]
})
