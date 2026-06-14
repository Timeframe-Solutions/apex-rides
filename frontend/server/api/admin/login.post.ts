export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@apexrides.co.ke'
  const adminPassword = process.env.ADMIN_PASSWORD || 'apexrides123'

  if (email === adminEmail && password === adminPassword) {
    setCookie(event, "admin_session", "authenticated", {
      path: "/",
      maxAge: 60 * 60 * 24,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      httpOnly: false
    })

    return {
      success: true
    }
  }

  throw createError({
    statusCode: 401,
    statusMessage: "Invalid credentials"
  })
})
