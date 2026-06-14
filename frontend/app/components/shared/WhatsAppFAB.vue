<script setup lang="ts">
const isVisible = ref(false)
const { generalLink } = useWhatsApp()

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 2000)
})
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-500 ease-out"
    leave-active-class="transition-all duration-300 ease-in"
    enter-from-class="opacity-0 translate-y-10 scale-50"
    leave-to-class="opacity-0 translate-y-10 scale-50"
  >
    <a
      v-if="isVisible"
      :href="generalLink()"
      target="_blank"
      class="fixed bottom-6 right-6 z-50 lg:hidden w-14 h-14 bg-ar-whatsapp rounded-full flex items-center justify-center text-white shadow-2xl group"
      aria-label="WhatsApp Us"
    >
      <div class="absolute inset-0 rounded-full bg-ar-whatsapp/40 animate-ping" />
      <Icon name="logos:whatsapp-icon" class="w-8 h-8 relative z-10" />
    </a>
  </Transition>
</template>
