<script setup lang="ts">
interface Props {
  label: string
  icon?: string
  variant?: 'default' | 'dark'
}

withDefaults(defineProps<Props>(), {
  variant: 'default',
})
</script>

<template>
  <div
    class="inline-flex items-center px-3 py-1 rounded-sm text-[0.65rem] font-semibold uppercase tracking-[0.05em] border"
    :class="[
      variant === 'default' 
        ? 'bg-ar-off-white border-ar-border text-ar-muted' 
        : 'bg-ar-charcoal border-ar-charcoal text-white'
    ]"
  >
    <Icon v-if="icon" :name="icon" class="mr-1.5 h-3 w-3" />
    {{ label }}
  </div>
</template>
