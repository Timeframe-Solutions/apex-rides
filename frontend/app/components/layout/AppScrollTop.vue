<script setup lang="ts">
const isVisible = ref(false)

const handleScroll = () => {
  isVisible.value = window.scrollY > 400
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-300"
    leave-active-class="transition-all duration-300"
    enter-from-class="opacity-0 scale-50"
    leave-to-class="opacity-0 scale-50"
  >
    <button
      v-if="isVisible"
      class="fixed bottom-24 right-6 z-40 w-10 h-10 bg-ar-black/50 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:bg-ar-black transition-colors"
      @click="scrollToTop"
    >
      <Icon name="lucide:chevron-up" class="w-6 h-6" />
    </button>
  </Transition>
</template>
