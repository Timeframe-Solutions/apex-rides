<script setup lang="ts">
interface Props {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}

withDefaults(defineProps<Props>(), {
  align: 'left',
})
</script>

<template>
  <div :class="[align === 'center' ? 'text-center items-center' : 'text-left items-start', 'flex flex-col mb-12 lg:mb-16']">
    <span v-if="eyebrow" class="text-ar-yellow text-[0.7rem] font-bold tracking-[0.2em] uppercase mb-3">
      {{ eyebrow }}
    </span>
    <h2 class="font-display text-3xl lg:text-5xl font-extrabold text-ar-black leading-[1.1] tracking-tight">
      {{ title }}
    </h2>
    <p v-if="subtitle" class="text-ar-text text-lg lg:text-xl mt-6 max-w-2xl leading-relaxed">
      {{ subtitle }}
    </p>
  </div>
</template>
