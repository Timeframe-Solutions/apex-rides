import type { Vehicle } from '~/types'

export const useAdminVehicles = () => {
  const { success, error: toastError } = useToast()

  const createVehicle = async (payload: Partial<Vehicle>) => {
    try {
      await $fetch('/api/admin/vehicles', {
        method: 'POST',
        body: payload
      })
      success('Vehicle created successfully')
      navigateTo('/xa/vehicles')
    } catch (e) {
      toastError('Error creating vehicle')
    }
  }

  const updateVehicle = async (id: string, payload: Partial<Vehicle>) => {
    try {
      await $fetch(`/api/admin/vehicles/${id}`, {
        method: 'PUT',
        body: payload
      })
      success('Vehicle updated successfully')
      navigateTo('/xa/vehicles')
    } catch (e) {
      toastError('Error updating vehicle')
    }
  }

  return {
    createVehicle,
    updateVehicle
  }
}
