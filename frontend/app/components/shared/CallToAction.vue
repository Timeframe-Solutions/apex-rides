<script setup lang="ts">
interface CTA {
  label: string
  to?: string
  href?: string
  variant: string
}

interface Props {
  title: string
  subtitle?: string
  primaryCta: CTA
  secondaryCta?: CTA
}

defineProps<Props>()
</script>

<template>
  <section class="full-width bg-ar-charcoal py-20 lg:py-24 text-center">
    <div class="max-w-7xl mx-auto px-6">
      <div class="max-w-2xl mx-auto">
        <h2 class="font-display text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
          {{ title }}
        </h2>
        <p v-if="subtitle" class="text-white/70 text-lg mb-10 leading-relaxed">
          {{ subtitle }}
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <AppButton
            v-bind="primaryCta"
            :variant="primaryCta.variant as any"
            size="lg"
          >
            {{ primaryCta.label }}
          </AppButton>
          
          <AppButton
            v-if="secondaryCta"
            v-bind="secondaryCta"
            :variant="secondaryCta.variant as any"
            size="lg"
          >
            {{ secondaryCta.label }}
          </AppButton>
        </div>
      </div>
    </div>
  </section>
</template>
