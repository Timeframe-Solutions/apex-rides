<script setup lang="ts">
import type { Inquiry, InquiryStatus } from '~/types'

interface Props {
  modelValue: boolean
  inquiry: Inquiry | null
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue', 'status-updated'])

const close = () => emit('update:modelValue', false)

const { success, error } = useToast()
const loading = ref(false)

const updateStatus = async (status: InquiryStatus) => {
  if (!props.inquiry) return
  loading.value = true
  try {
    await $fetch('/api/admin/inquiries/update', {
      method: 'PUT',
      body: { id: props.inquiry.id, status }
    })
    success(`Status updated to ${status}`)
    emit('status-updated')
  } catch (e) {
    error('Failed to update status')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300"
      leave-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div v-if="modelValue" class="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]" @click="close" />
    </Transition>

    <Transition
      enter-active-class="transition-transform duration-300 ease-out"
      leave-active-class="transition-transform duration-200 ease-in"
      enter-from-class="translate-x-full"
      leave-to-class="translate-x-full"
    >
      <div v-if="modelValue" class="fixed top-0 right-0 w-full max-w-lg h-full bg-white z-[101] shadow-2xl flex flex-col">
        <div class="h-16 flex items-center justify-between px-6 border-b border-ar-border">
          <h3 class="font-display font-bold text-ar-black">Inquiry Details</h3>
          <button @click="close" class="p-2 hover:bg-ar-off-white rounded-lg transition-colors">
            <Icon name="lucide:x" class="w-6 h-6 text-ar-muted" />
          </button>
        </div>

        <div v-if="inquiry" class="flex-1 overflow-y-auto p-8 space-y-8">
          <!-- Header Info -->
          <div class="flex items-start justify-between">
            <div>
              <p class="text-2xl font-display font-extrabold text-ar-black">{{ inquiry.name }}</p>
              <p class="text-sm text-ar-muted">{{ new Date(inquiry.createdAt).toLocaleString() }}</p>
            </div>
            <span 
              class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest"
              :class="inquiry.status === 'new' ? 'bg-ar-yellow/20 text-ar-yellow-dark' : 'bg-ar-available/20 text-ar-available'"
            >
              {{ inquiry.status }}
            </span>
          </div>

          <!-- Contact Channels -->
          <div class="grid grid-cols-2 gap-4">
            <a :href="`tel:${inquiry.phone}`" class="p-4 bg-ar-off-white rounded-xl border border-ar-border hover:border-ar-yellow transition-colors group">
              <Icon name="lucide:phone" class="w-5 h-5 text-ar-yellow mb-2" />
              <p class="text-[10px] font-bold uppercase text-ar-muted mb-1">Phone</p>
              <p class="text-sm font-bold text-ar-black group-hover:text-ar-yellow transition-colors">{{ inquiry.phone }}</p>
            </a>
            <a v-if="inquiry.email" :href="`mailto:${inquiry.email}`" class="p-4 bg-ar-off-white rounded-xl border border-ar-border hover:border-ar-yellow transition-colors group">
              <Icon name="lucide:mail" class="w-5 h-5 text-ar-yellow mb-2" />
              <p class="text-[10px] font-bold uppercase text-ar-muted mb-1">Email</p>
              <p class="text-sm font-bold text-ar-black group-hover:text-ar-yellow transition-colors truncate">{{ inquiry.email }}</p>
            </a>
          </div>

          <!-- Message -->
          <div class="space-y-3">
            <h4 class="text-xs font-bold uppercase tracking-widest text-ar-muted">Message Content</h4>
            <div class="p-6 bg-ar-off-white rounded-2xl border border-ar-border text-ar-text leading-relaxed italic">
              "{{ inquiry.message }}"
            </div>
          </div>

          <!-- Status Actions -->
          <div class="pt-8 border-t border-ar-border space-y-4">
            <h4 class="text-xs font-bold uppercase tracking-widest text-ar-muted">Management Actions</h4>
            <div class="flex gap-3">
              <AppButton 
                variant="secondary" 
                size="sm" 
                block 
                :loading="loading && inquiry.status === 'contacted'"
                @click="updateStatus('contacted')"
              >
                Mark as Contacted
              </AppButton>
              <AppButton 
                variant="ghost" 
                size="sm" 
                block 
                class="!text-ar-black !border-ar-border"
                :loading="loading && inquiry.status === 'closed'"
                @click="updateStatus('closed')"
              >
                Close Inquiry
              </AppButton>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
