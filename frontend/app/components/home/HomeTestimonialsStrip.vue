<script setup lang="ts">
import testimonials from '~~/data/testimonials.json'

const displayed = testimonials.slice(0, 3)
</script>

<template>
  <section class="py-20 lg:py-24 bg-ar-off-white overflow-hidden">
    <div class="max-w-7xl mx-auto px-6">
      <SectionHeader
        align="center"
        eyebrow="Client Stories"
        title="Trusted by Nairobi Businesses and Families"
      />

      <!-- Desktop Grid / Mobile Scroll -->
      <div class="flex lg:grid lg:grid-cols-3 gap-6 overflow-x-auto lg:overflow-visible snap-x snap-mandatory pb-8 lg:pb-0 scrollbar-hide">
        <div 
          v-for="t in displayed" 
          :key="t.name"
          class="min-w-[300px] w-[80vw] lg:w-auto snap-center"
        >
          <TestimonialCard :testimonial="t" />
        </div>
      </div>

      <div class="text-center mt-12">
        <NuxtLink 
          to="/testimonials" 
          class="inline-flex items-center text-ar-black font-bold hover:text-ar-yellow transition-colors group"
        >
          See all reviews
          <Icon name="lucide:arrow-right" class="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
