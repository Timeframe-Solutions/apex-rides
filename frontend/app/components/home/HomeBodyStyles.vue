<script setup lang="ts">
const bodyStyles = [
  { label: 'SUV', icon: 'lucide:car', slug: 'suv' },
  { label: 'Sedan', icon: 'lucide:car', slug: 'sedan' },
  { label: 'Pickup', icon: 'lucide:truck', slug: 'pickup' },
  { label: 'Van', icon: 'lucide:bus', slug: 'van' },
  { label: 'Hatchback', icon: 'lucide:car', slug: 'hatchback' },
]
</script>

<template>
  <section class="py-16 lg:py-24 bg-ar-off-white">
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center mb-12">
        <h2 class="font-display text-2xl lg:text-3xl font-black uppercase tracking-tighter text-ar-black mb-4">
          Select a Body Style
        </h2>
        <div class="w-20 h-1 bg-ar-yellow mx-auto"></div>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-5 gap-6 lg:gap-10">
        <NuxtLink 
          v-for="style in bodyStyles" 
          :key="style.label"
          :to="`/vehicles?category=${style.slug}`"
          class="group flex flex-col items-center gap-4"
        >
          <div class="w-full aspect-[2/1] bg-white rounded-xl border border-ar-border flex items-center justify-center p-8 transition-all duration-300 group-hover:border-ar-yellow group-hover:shadow-lg group-hover:-translate-y-1">
            <!-- Simplified Car Silhouette Placeholder -->
            <Icon :name="style.icon" class="w-16 h-16 text-ar-black/20 group-hover:text-ar-yellow transition-colors" />
          </div>
          <span class="text-[11px] font-black uppercase tracking-widest text-ar-muted group-hover:text-ar-black transition-colors">
            {{ style.label }}
          </span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
