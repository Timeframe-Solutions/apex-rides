<script setup lang="ts">
interface Props {
  modelValue: boolean
  maxWidth?: string
  closeOnBackdrop?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  maxWidth: '600px',
  closeOnBackdrop: true,
})

const emit = defineEmits(['update:modelValue', 'close'])

const close = () => {
  emit('update:modelValue', false)
  emit('close')
}

// Handle Escape key
onMounted(() => {
  const onEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && props.modelValue) close()
  }
  window.addEventListener('keydown', onEscape)
  onUnmounted(() => window.removeEventListener('keydown', onEscape))
})

// Lock body scroll
watch(() => props.modelValue, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}, { immediate: true })
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300 ease-out"
      leave-active-class="transition-opacity duration-200 ease-in"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div v-if="modelValue" class="fixed inset-0 bg-black/70 backdrop-blur-sm z-[1000] flex items-center justify-center p-4" @click="closeOnBackdrop && close()">
        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          leave-active-class="transition-all duration-200 ease-in"
          enter-from-class="opacity-0 scale-95 translate-y-4"
          leave-to-class="opacity-0 scale-95 translate-y-4"
          appear
        >
          <div
            class="bg-white rounded-xl shadow-2xl w-full relative overflow-hidden flex flex-col max-h-[90vh]"
            :style="{ maxWidth }"
            @click.stop
          >
            <div class="p-6 flex-grow overflow-y-auto">
              <slot />
            </div>
            
            <button 
              class="absolute top-4 right-4 text-ar-muted hover:text-ar-black transition-colors"
              @click="close"
            >
              <Icon name="lucide:x" class="w-6 h-6" />
            </button>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
