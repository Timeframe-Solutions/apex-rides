<script setup lang="ts">
interface Props {
  items: Array<{ label: string; to?: string }>
}

defineProps<Props>()
</script>

<template>
  <nav class="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-ar-muted mb-8 overflow-x-auto whitespace-nowrap scrollbar-hide">
    <NuxtLink to="/" class="hover:text-ar-yellow transition-colors shrink-0">Home</NuxtLink>
    
    <template v-for="(item, index) in items" :key="item.label">
      <Icon name="lucide:chevron-right" class="w-3 h-3 shrink-0" />
      <NuxtLink 
        v-if="item.to" 
        :to="item.to" 
        class="hover:text-ar-yellow transition-colors shrink-0"
      >
        {{ item.label }}
      </NuxtLink>
      <span v-else class="text-ar-black shrink-0">{{ item.label }}</span>
    </template>
  </nav>
</template>
