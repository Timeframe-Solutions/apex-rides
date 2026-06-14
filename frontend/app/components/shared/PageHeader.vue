<script setup lang="ts">
interface Props {
  title: string
  subtitle?: string
  bg?: 'dark' | 'light'
}

withDefaults(defineProps<Props>(), {
  bg: 'dark',
})
</script>

<template>
  <header 
    class="py-16 lg:py-24"
    :class="[
      bg === 'dark' ? 'bg-ar-black text-white' : 'bg-ar-off-white text-ar-black'
    ]"
  >
    <div class="max-w-7xl mx-auto px-6 text-center">
      <h1 class="font-display text-4xl lg:text-5xl font-extrabold mb-6 tracking-tight">
        {{ title }}
      </h1>
      <p 
        v-if="subtitle" 
        class="text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed"
        :class="bg === 'dark' ? 'text-white/70' : 'text-ar-text'"
      >
        {{ subtitle }}
      </p>
    </div>
  </header>
</template>
