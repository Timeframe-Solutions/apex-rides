export default defineNitroPlugin(async (nitroApp) => {
  try {
    await seedVehicles()
  } catch (error) {
    console.error('Error seeding vehicles:', error)
  }
})
