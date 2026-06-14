<script setup lang="ts">
const { data, pending } = await useFetch('/api/vehicles', {
  query: { featured: 'true', limit: 3 }
})

const vehicles = computed(() => data.value?.vehicles || [])
</script>

<template>
  <section class="py-20 lg:py-24 bg-ar-off-white">
    <div class="max-w-7xl mx-auto px-6">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <SectionHeader
          eyebrow="Our Collection"
          title="Our Rental Car Collection"
          class="mb-0"
        />
        
        <NuxtLink 
          to="/vehicles" 
          class="inline-flex items-center text-ar-black font-bold hover:text-ar-yellow transition-colors group"
        >
          View All Vehicles
          <Icon name="lucide:arrow-right" class="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </NuxtLink>
      </div>

      <VehicleGrid 
        :vehicles="vehicles" 
        :loading="pending"
      />
    </div>
  </section>
</template>
