<script setup lang="ts">
interface Props {
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
  border?: boolean
}

withDefaults(defineProps<Props>(), {
  padding: 'md',
  border: true,
})

const paddingClasses = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}
</script>

<template>
  <div
    class="bg-white rounded-xl shadow-ar-card transition-all duration-300"
    :class="[
      paddingClasses[padding],
      border ? 'border border-ar-border' : '',
      hover ? 'hover:shadow-lg hover:-translate-y-0.5' : ''
    ]"
  >
    <slot />
  </div>
</template>
