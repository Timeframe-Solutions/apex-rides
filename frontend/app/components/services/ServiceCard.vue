<script setup lang="ts">
interface Props {
  service: {
    icon: string
    title: string
    tagline: string
    body: string
    ctaLabel: string
    ctaLink: string
  }
}

defineProps<Props>()
</script>

<template>
  <AppCard hover class="h-full flex flex-col group">
    <div class="w-14 h-14 rounded-xl bg-ar-yellow/10 flex items-center justify-center mb-6 group-hover:bg-ar-yellow transition-colors duration-300">
      <Icon :name="service.icon" class="w-8 h-8 text-ar-yellow group-hover:text-ar-black transition-colors" />
    </div>
    
    <h3 class="font-display font-bold text-xl text-ar-black mb-2">
      {{ service.title }}
    </h3>
    <p class="text-ar-yellow text-xs font-bold uppercase tracking-widest mb-4 italic">
      {{ service.tagline }}
    </p>
    <p class="text-ar-text text-sm leading-relaxed mb-8 flex-grow">
      {{ service.body }}
    </p>
    
    <NuxtLink 
      :to="service.ctaLink" 
      class="inline-flex items-center text-sm font-bold text-ar-black hover:text-ar-yellow transition-colors group"
    >
      {{ service.ctaLabel }}
      <Icon name="lucide:chevron-right" class="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
    </NuxtLink>
  </AppCard>
</template>
