import type { Vehicle, VehicleFilter } from '~/types'

export const useVehicleStore = defineStore('vehicle', () => {
  const vehicles = ref<Vehicle[]>([])
  const total = ref(0)
  const totalPages = ref(0)
  const loading = ref(false)
  
  const filters = reactive<VehicleFilter>({
    search: '',
    category: 'all',
    status: 'all',
    sort: 'newest',
    page: 1
  })

  const fetchVehicles = async () => {
    loading.value = true
    try {
      const data = await $fetch<{ vehicles: Vehicle[], total: number, totalPages: number }>('/api/vehicles', {
        query: {
          q: filters.search || undefined,
          category: filters.category !== 'all' ? filters.category : undefined,
          status: filters.status !== 'all' ? filters.status : undefined,
          sort: filters.sort,
          page: filters.page,
          limit: 12
        }
      })
      vehicles.value = data.vehicles
      total.value = data.total
      totalPages.value = data.totalPages
    } catch (error) {
      console.error('Error fetching vehicles:', error)
    } finally {
      loading.value = false
    }
  }

  const setFilters = (newFilters: Partial<VehicleFilter>) => {
    Object.assign(filters, { ...filters, ...newFilters })
    // Reset to page 1 if any filter other than page changes
    if (newFilters.page === undefined) {
      filters.page = 1
    }
  }

  return {
    vehicles,
    total,
    totalPages,
    loading,
    filters,
    fetchVehicles,
    setFilters
  }
})
