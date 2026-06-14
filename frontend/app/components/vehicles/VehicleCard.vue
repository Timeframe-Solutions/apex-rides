<script setup lang="ts">
import type { Vehicle } from '~/types'

interface Props {
  vehicle: Vehicle
}

defineProps<Props>()
const { vehicleLink } = useWhatsApp()
</script>

<template>
  <AppCard padding="none" hover class="group h-full flex flex-col !rounded-xl overflow-hidden border-ar-border/50">
    <div class="relative aspect-[16/10] overflow-hidden">
      <!-- Status Badge -->
      <div class="absolute top-3 left-3 z-10">
        <AppBadge :status="vehicle.status" shadow />
      </div>

      <!-- Vehicle Image -->
      <NuxtImg
        :src="vehicle.images[0]"
        :alt="vehicle.title"
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
        format="webp"
        quality="85"
      />
      
      <!-- Hover Overlay -->
      <div class="absolute inset-0 bg-ar-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <!-- Sold Overlay -->
      <div v-if="vehicle.status === 'sold'" class="absolute inset-0 bg-ar-black/40 backdrop-grayscale-[0.5] flex items-center justify-center">
        <span class="bg-ar-sold text-white px-4 py-1 rounded-md font-bold uppercase tracking-widest text-sm shadow-xl">Sold</span>
      </div>
    </div>

    <div class="p-5 flex flex-col flex-grow">
      <div class="mb-3">
        <h3 class="font-display font-bold text-lg lg:text-xl text-ar-black group-hover:text-ar-yellow-dark transition-colors line-clamp-1">
          {{ vehicle.title }}
        </h3>
        <p class="text-[0.7rem] text-ar-muted uppercase tracking-widest font-semibold mt-1">
          Ref: AR-{{ vehicle.id.slice(0, 8) }}
        </p>
      </div>

      <div class="flex flex-wrap gap-2 mb-6">
        <AppChip :label="`${vehicle.mileage.toLocaleString()} km`" icon="lucide:gauge" />
        <AppChip :label="vehicle.transmission" icon="lucide:settings" />
        <AppChip :label="vehicle.fuelType" icon="lucide:fuel" />
      </div>

      <div class="mt-auto pt-4 border-t border-ar-border/50 flex items-center justify-between gap-4">
        <div>
          <span class="text-[0.65rem] text-ar-muted uppercase tracking-[0.1em] font-bold block mb-0.5">Price</span>
          <span class="text-xl lg:text-2xl font-display font-extrabold text-ar-black">
            {{ vehicle.priceLabel }}
          </span>
        </div>

        <div class="flex gap-2">
          <AppButton
            v-if="vehicle.status !== 'sold'"
            :to="`/vehicles/${vehicle.slug}`"
            size="sm"
            variant="secondary"
            class="!py-2 !px-4"
          >
            Details
          </AppButton>
          <AppButton
            v-if="vehicle.status === 'available'"
            :href="vehicleLink(vehicle)"
            target="_blank"
            size="sm"
            variant="whatsapp"
            aria-label="Inquire on WhatsApp"
            class="!py-2 !px-4"
          >
            <span class="hidden xl:inline">Inquire</span>
          </AppButton>
        </div>
      </div>
    </div>
  </AppCard>
</template>
