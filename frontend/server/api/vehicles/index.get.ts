export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const q = query.q as string
  const category = query.category as string
  const status = query.status as string
  const featured = query.featured === 'true' ? true : query.featured === 'false' ? false : undefined
  const sort = (query.sort as any) || 'newest'
  const page = parseInt(query.page as string) || 1
  const limit = parseInt(query.limit as string) || 12

  return await readVehicles({
    search: q,
    category,
    status,
    featured,
    sort,
    page,
    limit
  })
})
