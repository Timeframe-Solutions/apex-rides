<script setup lang="ts">
interface Props {
  total: number
  loaded: number
  loading?: boolean
}

defineProps<Props>()
defineEmits(['load-more'])
</script>

<template>
  <div class="flex flex-col items-center gap-4 py-12">
    <p class="text-sm text-ar-muted">
      Showing {{ loaded }} of {{ total }} vehicles
    </p>
    
    <AppButton
      v-if="loaded < total"
      variant="secondary"
      :loading="loading"
      @click="$emit('load-more')"
    >
      Load More Vehicles
    </AppButton>
  </div>
</template>
