<script setup lang="ts">
interface Props {
  modelValue: boolean
  links: Array<{ label: string; to: string }>
}

defineProps<Props>()
const emit = defineEmits(['update:modelValue'])
const { generalLink } = useWhatsApp()
const config = useRuntimeConfig()

const close = () => emit('update:modelValue', false)

// Close on route change
const route = useRoute()
watch(() => route.fullPath, close)
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300"
      leave-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div v-if="modelValue" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]" @click="close" />
    </Transition>

    <Transition
      enter-active-class="transition-transform duration-300 ease-out"
      leave-active-class="transition-transform duration-200 ease-in"
      enter-from-class="translate-x-full"
      leave-to-class="translate-x-full"
    >
      <div v-if="modelValue" class="fixed top-0 right-0 w-80 h-full bg-ar-black z-[101] flex flex-col p-8 shadow-2xl">
        <button class="self-end text-white mb-8" @click="close">
          <Icon name="lucide:x" class="w-8 h-8" />
        </button>

        <div class="flex flex-col gap-6">
          <NuxtLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="text-white text-xl font-bold uppercase tracking-widest hover:text-ar-yellow transition-colors"
            active-class="text-ar-yellow"
          >
            {{ link.label }}
          </NuxtLink>
        </div>

        <div class="mt-auto border-t border-white/10 pt-8 space-y-6">
          <AppButton 
            variant="whatsapp" 
            block 
            :href="generalLink()"
            target="_blank"
          >
            WhatsApp Us
          </AppButton>
          
          <AppButton 
            variant="ghost" 
            block 
            :href="`tel:${config.public.phoneNumber}`"
          >
            <Icon name="lucide:phone" class="mr-2" />
            Call Now
          </AppButton>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
