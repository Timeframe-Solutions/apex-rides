<script setup lang="ts">
interface Props {
  status: 'available' | 'reserved' | 'sold'
  size?: 'sm' | 'md'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'sm',
})

const config = {
  available: {
    label: '✓ Available',
    class: 'bg-ar-available text-white',
  },
  reserved: {
    label: '⏳ Reserved',
    class: 'bg-ar-reserved text-white',
  },
  sold: {
    label: '✗ Sold',
    class: 'bg-ar-sold text-white',
  },
}

const current = computed(() => config[props.status])
</script>

<template>
  <span
    class="inline-flex items-center font-semibold tracking-wide rounded-full uppercase"
    :class="[
      current.class,
      size === 'sm' ? 'px-2.5 py-0.5 text-[0.7rem]' : 'px-3 py-1 text-xs'
    ]"
  >
    {{ current.label }}
  </span>
</template>
