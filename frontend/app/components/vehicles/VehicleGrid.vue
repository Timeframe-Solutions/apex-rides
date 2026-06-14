<script setup lang="ts">
import type { Vehicle } from '~/types'

interface Props {
  vehicles: Vehicle[]
  loading?: boolean
}

defineProps<Props>()
</script>

<template>
  <div>
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="i in 3" :key="i" class="bg-ar-off-white rounded-xl aspect-[4/5] animate-pulse" />
    </div>
    
    <div v-else-if="vehicles.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      <VehicleCard
        v-for="vehicle in vehicles"
        :key="vehicle.id"
        :vehicle="vehicle"
      />
    </div>

    <div v-else class="text-center py-20 bg-ar-off-white rounded-2xl border-2 border-dashed border-ar-border">
      <Icon name="lucide:search-x" class="w-16 h-16 text-ar-muted mx-auto mb-4" />
      <h3 class="text-xl font-bold text-ar-black mb-2">No vehicles found</h3>
      <p class="text-ar-muted">Try adjusting your filters or search term.</p>
    </div>
  </div>
</template>
