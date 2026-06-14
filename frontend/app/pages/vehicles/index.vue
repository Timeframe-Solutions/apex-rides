<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const { vehicles, total, loading, filters, fetchVehicles, setFilters } = useVehicles()

// Sync URL query to store on mount
onMounted(async () => {
  const query = route.query
  setFilters({
    search: (query.q as string) || '',
    category: (query.category as string) || 'all',
    status: (query.status as string) || 'all',
    sort: (query.sort as any) || 'newest',
    page: parseInt(query.page as string) || 1
  })
  await fetchVehicles()
})

// Watch for filter changes and update URL + fetch
watch(filters, (newFilters) => {
  const query: any = {}
  if (newFilters.search) query.q = newFilters.search
  if (newFilters.category !== 'all') query.category = newFilters.category
  if (newFilters.status !== 'all') query.status = newFilters.status
  if (newFilters.sort !== 'newest') query.sort = newFilters.sort
  if (newFilters.page > 1) query.page = newFilters.page
  
  router.push({ query })
  fetchVehicles()
}, { deep: true })

// Handle pagination
const handleLoadMore = () => {
  setFilters({ page: filters.page + 1 })
}

useHead({
  title: 'Our Vehicle Collection',
  meta: [
    { name: 'description', content: 'Browse our verified inventory of cars, SUVs, vans, and pickups available for sale or hire in Nairobi.' }
  ]
})
</script>

<template>
  <div>
    <PageHeader 
      title="Our Vehicle Collection" 
      subtitle="Browse our verified inventory. Updated regularly."
    />

    <section class="py-12 lg:py-20 bg-white">
      <div class="max-w-7xl mx-auto px-6">
        <!-- Filter Bar -->
        <VehicleFilterBar 
          :model-value="{ 
            q: filters.search, 
            category: filters.category, 
            status: filters.status, 
            sort: filters.sort 
          }" 
          @update:model-value="setFilters({ 
            search: $event.q, 
            category: $event.category, 
            status: $event.status, 
            sort: $event.sort 
          })"
          class="mb-10 lg:mb-16" 
        />

        <!-- Grid -->
        <VehicleGrid 
          :vehicles="vehicles" 
          :loading="loading && filters.page === 1"
        />

        <!-- Empty State -->
        <div v-if="!loading && vehicles.length === 0" class="py-20 text-center text-ar-muted">
          <Icon name="lucide:search-x" class="w-16 h-16 mx-auto mb-4 opacity-20" />
          <p class="text-xl font-bold text-ar-black mb-2">No vehicles found</p>
          <p>Try adjusting your filters or search term.</p>
          <AppButton @click="setFilters({ search: '', category: 'all', status: 'all' })" variant="ghost" class="mt-6">Clear All Filters</AppButton>
        </div>

        <!-- Pagination (Load More Style) -->
        <VehiclePagination
          v-if="vehicles.length > 0"
          :total="total"
          :loaded="vehicles.length"
          :loading="loading"
          @load-more="handleLoadMore"
        />
      </div>
    </section>

    <HomeContactBanner />
  </div>
</template>
