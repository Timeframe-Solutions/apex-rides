<script setup lang="ts">
import type { Vehicle } from '~/types'

definePageMeta({ layout: 'xa' })

const { createVehicle } = useAdminVehicles()

const handleSubmit = async (payload: Partial<Vehicle>) => {
  await createVehicle(payload)
}
</script>

<template>
  <div class="space-y-8">
    <div class="flex items-center gap-4">
      <NuxtLink to="/xa/vehicles" class="p-2 hover:bg-ar-off-white rounded-lg transition-colors">
        <Icon name="lucide:arrow-left" class="w-6 h-6 text-ar-muted" />
      </NuxtLink>
      <h2 class="text-2xl font-display font-bold text-ar-black">Add New Vehicle</h2>
    </div>

    <XaVehicleForm @submit="handleSubmit" @cancel="navigateTo('/xa/vehicles')" />
  </div>
</template>
