<script setup lang="ts">
interface Props {
  size?: 'sm' | 'md' | 'lg'
  color?: 'yellow' | 'white' | 'dark'
}

withDefaults(defineProps<Props>(), {
  size: 'md',
  color: 'yellow',
})

const sizeClasses = {
  sm: 'h-4 w-4 border-2',
  md: 'h-8 w-8 border-3',
  lg: 'h-12 w-12 border-4',
}

const colorClasses = {
  yellow: 'border-ar-yellow border-t-transparent',
  white: 'border-white border-t-transparent',
  dark: 'border-ar-black border-t-transparent',
}
</script>

<template>
  <div
    class="animate-spin rounded-full"
    :class="[sizeClasses[size], colorClasses[color]]"
  />
</template>
