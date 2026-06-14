export default defineEventHandler(async (event) => {
  return [
    { id: '1', name: 'System Admin', email: 'admin@apex.co.ke', role: 'super_admin' },
    { id: '2', name: 'Sales Manager', email: 'sales@apex.co.ke', role: 'editor' },
  ]
})
