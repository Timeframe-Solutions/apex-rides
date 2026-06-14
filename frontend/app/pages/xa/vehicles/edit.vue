<script setup lang="ts">
import type { Vehicle } from '~/types'

definePageMeta({ layout: 'xa' })

const route = useRoute()
const id = route.query.id as string

const { data: vehicle, pending } = await useFetch<Vehicle>(`/api/vehicles/${id}`) // Using public API for fetch as it's sufficient

const { updateVehicle } = useAdminVehicles()

const handleSubmit = async (payload: Partial<Vehicle>) => {
  await updateVehicle(id, payload)
}
</script>

<template>
  <div class="space-y-8">
    <div class="flex items-center gap-4">
      <NuxtLink to="/xa/vehicles" class="p-2 hover:bg-ar-off-white rounded-lg transition-colors">
        <Icon name="lucide:arrow-left" class="w-6 h-6 text-ar-muted" />
      </NuxtLink>
      <h2 class="text-2xl font-display font-bold text-ar-black">Edit Vehicle</h2>
    </div>

    <div v-if="pending" class="flex items-center justify-center py-20">
      <AppSpinner size="lg" />
    </div>
    <XaVehicleForm v-else :initial="vehicle" @submit="handleSubmit" @cancel="navigateTo('/xa/vehicles')" />
  </div>
</template>
