<script setup lang="ts">
interface Props {
  modelValue: boolean
  images: string[]
  startIndex?: number
}

const props = withDefaults(defineProps<Props>(), {
  startIndex: 0,
})

const emit = defineEmits(['update:modelValue'])
const currentIndex = ref(props.startIndex)

watch(() => props.startIndex, (val) => {
  currentIndex.value = val
})

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % props.images.length
}

const prev = () => {
  currentIndex.value = (currentIndex.value - 1 + props.images.length) % props.images.length
}
</script>

<template>
  <AppModal
    :model-value="modelValue"
    max-width="100vw"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <div class="h-screen w-screen bg-ar-black flex items-center justify-center relative p-4 lg:p-12">
      <!-- Nav Buttons -->
      <button 
        class="absolute left-4 lg:left-8 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all"
        @click="prev"
      >
        <Icon name="lucide:chevron-left" class="w-8 h-8" />
      </button>

      <button 
        class="absolute right-4 lg:right-8 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all"
        @click="next"
      >
        <Icon name="lucide:chevron-right" class="w-8 h-8" />
      </button>

      <!-- Main Image -->
      <div class="max-w-7xl max-h-full w-full h-full flex items-center justify-center">
        <NuxtImg
          :src="images[currentIndex]"
          class="max-w-full max-h-full object-contain shadow-2xl"
          format="webp"
          quality="100"
        />
      </div>

      <!-- Counter -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm font-bold tracking-widest">
        {{ currentIndex + 1 }} / {{ images.length }}
      </div>
    </div>
  </AppModal>
</template>
