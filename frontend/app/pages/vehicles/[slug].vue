<script setup lang="ts">
const route = useRoute()
const { fetchVehicle } = useVehicles()
const slug = route.params.slug as string

const { data: vehicle, error } = await useAsyncData(`vehicle-${slug}`, () => fetchVehicle(slug))

if (error.value || !vehicle.value) {
  throw createError({ statusCode: 404, statusMessage: 'Vehicle not found', fatal: true })
}

// SEO
useSeoMeta({
  title: vehicle.value.metaTitle || `${vehicle.value.year} ${vehicle.value.make} ${vehicle.value.model} for Sale`,
  description: vehicle.value.metaDesc || `${vehicle.value.title} — ${vehicle.value.mileage} km, ${vehicle.value.transmission}, KSh ${vehicle.value.priceLabel}. Available at Apex Rides Nairobi.`,
  ogTitle: vehicle.value.metaTitle,
  ogDescription: vehicle.value.metaDesc,
  ogImage: vehicle.value.images[0]
})

const breadcrumbItems = [
  { label: 'Vehicles', to: '/vehicles' },
  { label: vehicle.value.title }
]
</script>

<template>
  <div v-if="vehicle" class="bg-white">
    <div class="max-w-7xl mx-auto px-6 py-8">
      <VehicleBreadcrumb :items="breadcrumbItems" />

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <!-- Main Content -->
        <div class="lg:col-span-7 space-y-12">
          <VehicleGallery 
            :images="vehicle.images" 
            :title="vehicle.title" 
          />

          <div class="lg:hidden">
            <VehicleSidebar :vehicle="vehicle" />
          </div>

          <div class="space-y-6">
            <h2 class="text-2xl font-display font-bold text-ar-black">Vehicle Overview</h2>
            <p class="text-ar-text leading-relaxed text-lg">
              {{ vehicle.description }}
            </p>
          </div>

          <div class="space-y-6">
            <h2 class="text-2xl font-display font-bold text-ar-black">Key Specifications</h2>
            <VehicleSpecsTable :vehicle="vehicle" />
          </div>

          <div class="space-y-6">
            <h2 class="text-2xl font-display font-bold text-ar-black">Features & Extras</h2>
            <div class="flex flex-wrap gap-2">
              <AppChip 
                v-for="feature in vehicle.features" 
                :key="feature" 
                :label="feature" 
                icon="lucide:check-circle"
                variant="default"
              />
            </div>
          </div>

          <hr class="border-ar-border" />

          <VehicleInquiryForm :vehicle="vehicle" />
        </div>

        <!-- Sidebar (Desktop) -->
        <div class="hidden lg:block lg:col-span-5">
          <VehicleSidebar :vehicle="vehicle" />
        </div>
      </div>
    </div>

    <!-- Related Vehicles -->
    <section class="py-20 bg-ar-off-white border-t border-ar-border mt-20">
      <div class="max-w-7xl mx-auto px-6">
        <SectionHeader
          title="You Might Also Like"
          subtitle="Similar vehicles currently available in our collection."
        />
        <HomeFeaturedVehicles /> 
      </div>
    </section>

    <HomeContactBanner />
  </div>
</template>
