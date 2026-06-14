<script setup lang="ts">
import type { Vehicle } from '~/types'

interface Props {
  vehicle: Vehicle
}

const props = defineProps<Props>()

const specs = computed(() => [
  { label: 'Year', value: props.vehicle.year, icon: 'lucide:calendar' },
  { label: 'Mileage', value: `${props.vehicle.mileage} km`, icon: 'lucide:gauge' },
  { label: 'Transmission', value: props.vehicle.transmission, icon: 'lucide:settings' },
  { label: 'Fuel Type', value: props.vehicle.fuelType, icon: 'lucide:fuel' },
  { label: 'Engine', value: props.vehicle.engine, icon: 'lucide:zap' },
  { label: 'Seats', value: props.vehicle.seats, icon: 'lucide:users' },
  { label: 'Drive Type', value: props.vehicle.driveType, icon: 'lucide:cog' },
  { label: 'Colour', value: props.vehicle.colour, icon: 'lucide:palette' },
])
</script>

<template>
  <div class="grid grid-cols-2 gap-px bg-ar-border border border-ar-border rounded-xl overflow-hidden shadow-sm">
    <div 
      v-for="spec in specs" 
      :key="spec.label"
      class="bg-white p-4 flex flex-col gap-1 hover:bg-ar-off-white transition-colors"
    >
      <div class="flex items-center gap-2 text-ar-muted">
        <Icon :name="spec.icon" class="w-4 h-4" />
        <span class="text-[10px] font-bold uppercase tracking-widest">{{ spec.label }}</span>
      </div>
      <span class="text-ar-black font-bold uppercase text-sm">{{ spec.value }}</span>
    </div>
  </div>
</template>
