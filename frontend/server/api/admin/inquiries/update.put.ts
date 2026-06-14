export default defineEventHandler(async (event) => {
  const { id, status } = await readBody(event)
  const inquiry = await updateInquiry(id, { status })
  await writeAuditLog(event, 'inquiry.status_update', id, { status })
  return { success: true, inquiry }
})
