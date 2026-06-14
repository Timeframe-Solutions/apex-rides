export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  if (!body.name || !body.phone || !body.message) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields'
    })
  }

  const inquiry = await createInquiry(body)
  
  // In a real app, send email here via server/utils/emailer.ts
  
  return { success: true, id: inquiry.id }
})
