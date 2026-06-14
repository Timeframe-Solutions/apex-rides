<script setup lang="ts">
interface Testimonial {
  name: string
  role: string
  rating: number
  text: string
}

interface Props {
  testimonial: Testimonial
}

defineProps<Props>()
</script>

<template>
  <AppCard class="h-full flex flex-col">
    <div class="flex gap-1 mb-4">
      <Icon 
        v-for="i in 5" 
        :key="i"
        name="lucide:star" 
        class="w-4 h-4"
        :class="i <= testimonial.rating ? 'text-ar-yellow fill-ar-yellow' : 'text-ar-border'"
      />
    </div>

    <blockquote class="text-ar-text italic leading-relaxed mb-6 flex-grow">
      "{{ testimonial.text }}"
    </blockquote>

    <div class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-full bg-ar-yellow flex items-center justify-center font-display font-bold text-ar-black">
        {{ testimonial.name.charAt(0) }}
      </div>
      <div>
        <cite class="block font-bold text-ar-black not-italic text-sm">
          {{ testimonial.name }}
        </cite>
        <span class="text-xs text-ar-muted">
          {{ testimonial.role }}
        </span>
      </div>
    </div>
  </AppCard>
</template>
