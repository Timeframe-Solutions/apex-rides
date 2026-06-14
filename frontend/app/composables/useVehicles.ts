import type { Vehicle, CreateVehiclePayload, UpdateVehiclePayload } from '~/types'

export const useVehicles = () => {
  const store = useVehicleStore()
  const { success, error: toastError } = useToast()

  const fetchVehicles = async () => {
    await store.fetchVehicles()
  }

  const fetchVehicle = async (slug: string): Promise<Vehicle | null> => {
    try {
      return await $fetch<Vehicle>(`/api/vehicles/${slug}`)
    } catch (error) {
      console.error('Error fetching vehicle:', error)
      return null
    }
  }

  // Admin CRUD
  const createVehicle = async (payload: CreateVehiclePayload) => {
    try {
      const data = await $fetch('/api/admin/vehicles', {
        method: 'POST',
        body: payload
      })
      success('Vehicle created successfully')
      return data
    } catch (e) {
      toastError('Error creating vehicle')
      throw e
    }
  }

  const updateVehicle = async (id: string, payload: UpdateVehiclePayload) => {
    try {
      const data = await $fetch(`/api/admin/vehicles/${id}`, {
        method: 'PUT',
        body: payload
      })
      success('Vehicle updated successfully')
      return data
    } catch (e) {
      toastError('Error updating vehicle')
      throw e
    }
  }

  const deleteVehicle = async (id: string) => {
    try {
      await $fetch(`/api/admin/vehicles/${id}`, {
        method: 'DELETE'
      })
      success('Vehicle deleted successfully')
    } catch (e) {
      toastError('Error deleting vehicle')
      throw e
    }
  }

  return {
    ...storeToRefs(store),
    setFilters: store.setFilters,
    fetchVehicles,
    fetchVehicle,
    createVehicle,
    updateVehicle,
    deleteVehicle
  }
}
