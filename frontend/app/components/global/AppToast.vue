<script setup lang="ts">
const store = useToastStore()
const { remove } = store

const icons = {
  success: 'lucide:check-circle',
  error: 'lucide:x-circle',
  info: 'lucide:info',
}

const colors = {
  success: 'bg-ar-available text-white',
  error: 'bg-ar-sold text-white',
  info: 'bg-ar-charcoal text-white',
}
</script>

<template>
  <Teleport to="body">
    <div class="fixed top-6 right-6 z-[2000] flex flex-col gap-3 pointer-events-none">
      <TransitionGroup
        enter-active-class="transition-all duration-300 ease-out"
        leave-active-class="transition-all duration-200 ease-in"
        enter-from-class="opacity-0 translate-x-10 scale-95"
        leave-to-class="opacity-0 translate-x-10 scale-95"
      >
        <div
          v-for="toast in store.toasts"
          :key="toast.id"
          class="flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg pointer-events-auto min-w-[300px] max-w-md"
          :class="colors[toast.type]"
        >
          <Icon :name="icons[toast.type]" class="w-5 h-5 shrink-0" />
          <p class="text-sm font-medium">{{ toast.message }}</p>
          <button 
            class="ml-auto hover:opacity-70 transition-opacity" 
            @click="remove(toast.id)"
          >
            <Icon name="lucide:x" class="w-4 h-4" />
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>
