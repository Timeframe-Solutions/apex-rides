export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) throw createError({ statusCode: 400, message: 'ID required' })
  const body = await readBody(event)
  return await updateVehicle(id, body)
})
