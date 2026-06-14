export default defineNuxtRouteMiddleware((to) => {
  const session = useCookie("admin_session")

  const isAuthenticated = session.value === "authenticated"

  if (!to.path.startsWith("/xa")) return

  if (to.path === "/xa/login") {
    if (isAuthenticated) {
      return navigateTo("/xa")
    }
    return
  }

  if (!isAuthenticated) {
    return navigateTo("/xa/login")
  }
})
