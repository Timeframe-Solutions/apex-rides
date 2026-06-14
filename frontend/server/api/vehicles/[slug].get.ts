export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  if (!slug) throw createError({ statusCode: 400, message: 'Slug required' })
  
  const vehicle = await readVehicleBySlug(slug)
  if (!vehicle) throw createError({ statusCode: 404, message: 'Vehicle not found' })
  
  return vehicle
})
