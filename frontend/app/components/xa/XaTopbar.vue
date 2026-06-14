<script setup lang="ts">
const route = useRoute()
const title = computed(() => {
  if (route.path.includes('/vehicles')) return 'Vehicle Inventory'
  if (route.path.includes('/inquiries')) return 'Customer Inquiries'
  if (route.path.includes('/categories')) return 'Vehicle Categories'
  if (route.path.includes('/content')) return 'Page Content'
  return 'Admin Dashboard'
})
</script>

<template>
  <header class="h-16 bg-white border-b border-ar-border flex items-center justify-between px-8 shrink-0">
    <h1 class="font-display font-bold text-ar-black text-lg">
      {{ title }}
    </h1>

    <div class="flex items-center gap-4">
      <div class="text-right hidden sm:block">
        <p class="text-xs font-bold text-ar-black">System Admin</p>
        <p class="text-[10px] text-ar-muted">admin@apex.co.ke</p>
      </div>
      <div class="w-8 h-8 rounded-full bg-ar-charcoal flex items-center justify-center text-white text-xs font-bold">
        AD
      </div>
    </div>
  </header>
</template>
