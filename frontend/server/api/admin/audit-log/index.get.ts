export default defineEventHandler(async (event) => {
  // Mock audit log data
  return [
    { id: '1', action: 'vehicle.update', resource: '2021 Toyota Corolla Cross', user: 'Admin', date: new Date().toISOString() },
    { id: '2', action: 'inquiry.status_update', resource: 'John Kariuki', user: 'Admin', date: new Date().toISOString() },
    { id: '3', action: 'category.create', resource: 'Pickup', user: 'Admin', date: new Date().toISOString() },
  ]
})
