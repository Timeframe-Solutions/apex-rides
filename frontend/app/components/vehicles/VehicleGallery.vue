<script setup lang="ts">
interface Props {
  images: string[]
  title: string
}

const props = defineProps<Props>()
const activeIndex = ref(0)
const isLightboxOpen = ref(false)

const openLightbox = (index: number) => {
  activeIndex.value = index
  isLightboxOpen.value = true
}
</script>

<template>
  <div class="space-y-4">
    <!-- Main Image -->
    <div 
      class="aspect-video relative overflow-hidden rounded-2xl cursor-zoom-in group"
      @click="openLightbox(activeIndex)"
    >
      <NuxtImg
        :src="images[activeIndex]"
        :alt="`${title} - Image ${activeIndex + 1}`"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        format="webp"
        quality="90"
      />
      <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
      
      <div class="absolute bottom-4 right-4 bg-ar-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2">
        <Icon name="lucide:maximize-2" class="w-3.5 h-3.5" />
        Click to enlarge
      </div>
    </div>

    <!-- Thumbnails -->
    <div class="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
      <button
        v-for="(img, index) in images"
        :key="img"
        class="relative w-24 aspect-video shrink-0 rounded-lg overflow-hidden border-2 transition-all"
        :class="activeIndex === index ? 'border-ar-yellow scale-95' : 'border-transparent opacity-70 hover:opacity-100'"
        @click="activeIndex = index"
      >
        <NuxtImg
          :src="img"
          class="w-full h-full object-cover"
          format="webp"
          width="100"
          quality="60"
        />
      </button>
    </div>

    <!-- Lightbox -->
    <VehicleLightbox
      v-model="isLightboxOpen"
      :images="images"
      :start-index="activeIndex"
    />
  </div>
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
