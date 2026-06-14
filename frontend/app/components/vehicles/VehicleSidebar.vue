<script setup lang="ts">
import type { Vehicle } from '~/types'

interface Props {
  vehicle: Vehicle
}

defineProps<Props>()
const { vehicleLink } = useWhatsApp()
const config = useRuntimeConfig()

const scrollToForm = () => {
  const el = document.getElementById('inquiry-form')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <div class="sticky top-24 space-y-6">
    <AppCard padding="lg" class="border-2 border-ar-black shadow-xl">
      <div class="flex items-center justify-between mb-4">
        <AppBadge :status="vehicle.status" size="md" />
        <span class="text-xs text-ar-muted font-bold tracking-widest uppercase">Ref: AR-{{ vehicle.id }}</span>
      </div>

      <div class="mb-8">
        <span class="text-xs text-ar-muted font-bold uppercase tracking-widest block mb-1">Price</span>
        <span class="text-4xl font-display font-extrabold text-ar-black">
          {{ vehicle.priceLabel }}
        </span>
      </div>

      <div class="space-y-3">
        <AppButton 
          v-if="vehicle.status === 'available'"
          variant="whatsapp" 
          block 
          size="lg" 
          :href="vehicleLink(vehicle)"
          target="_blank"
        >
          WhatsApp Inquiry
        </AppButton>
        
        <AppButton 
          variant="secondary" 
          block 
          size="lg"
          :href="`tel:${config.public.phoneNumber}`"
        >
          <Icon name="lucide:phone" class="mr-2 w-5 h-5" />
          Call Showroom
        </AppButton>

        <AppButton 
          v-if="vehicle.status !== 'sold'"
          variant="ghost" 
          block 
          class="!text-ar-black !border-ar-border hover:!bg-ar-off-white"
          @click="scrollToForm"
        >
          Send Email Inquiry
        </AppButton>
      </div>

      <div class="mt-8 pt-6 border-t border-ar-border">
        <div class="flex items-center gap-3 text-sm text-ar-muted">
          <div class="w-8 h-8 rounded-full bg-ar-available/10 text-ar-available flex items-center justify-center">
            <Icon name="lucide:check-circle" class="w-5 h-5" />
          </div>
          <span>Verified Stock & Documents</span>
        </div>
      </div>
    </AppCard>

    <div class="bg-ar-yellow rounded-xl p-6 text-ar-black">
      <h4 class="font-display font-bold text-lg mb-2">Need a trade-in?</h4>
      <p class="text-sm leading-relaxed mb-4">We accept trade-ins on all our vehicles. WhatsApp us for a quick valuation.</p>
      <AppButton variant="secondary" size="sm" block :href="vehicleLink(vehicle)">
        Ask about Trade-in
      </AppButton>
    </div>
  </div>
</template>
