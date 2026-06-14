<script setup lang="ts">
import services from '~~/data/services.json'

interface Props {
  max?: number
}

const props = defineProps<Props>()
const displayedServices = computed(() => props.max ? services.slice(0, props.max) : services)
</script>

<template>
  <section class="py-20 lg:py-24 bg-white">
    <div class="max-w-7xl mx-auto px-6">
      <SectionHeader
        align="center"
        eyebrow="What We Offer"
        title="More Than Just Vehicle Sales"
        subtitle="From daily car hire to full vehicle import, we handle it all."
      />

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        <ServiceCard
          v-for="service in displayedServices"
          :key="service.id"
          :service="service"
        />
      </div>
    </div>
  </section>
</template>
