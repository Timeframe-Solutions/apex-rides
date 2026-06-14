<script setup lang="ts">
import type { Inquiry } from '~/types'

definePageMeta({ layout: 'xa' })

const { data: inquiries, pending, refresh } = await useFetch<Inquiry[]>('/api/admin/inquiries/list')

const isDrawerOpen = ref(false)
const selectedInquiry = ref<Inquiry | null>(null)

const openInquiry = (iq: Inquiry) => {
  selectedInquiry.value = iq
  isDrawerOpen.value = true
}

const handleUpdate = () => {
  refresh()
  // We'll keep the drawer open so the user can see the change, 
  // but update the local ref if needed
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-2xl font-display font-bold text-ar-black">Customer Inquiries</h2>
      <p class="text-sm text-ar-muted">Track and respond to leads from the website.</p>
    </div>

    <AppCard padding="none" class="overflow-hidden">
      <table class="w-full text-left border-collapse">
        <thead class="bg-ar-off-white text-[10px] font-bold uppercase tracking-widest text-ar-muted border-b border-ar-border">
          <tr>
            <th class="px-6 py-4">Customer</th>
            <th class="px-6 py-4">Contact</th>
            <th class="px-6 py-4">Received</th>
            <th class="px-6 py-4">Status</th>
            <th class="px-6 py-4 text-right">Action</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-ar-border">
          <tr v-if="pending" v-for="i in 5" :key="i" class="animate-pulse">
            <td colspan="5" class="px-6 py-4 h-16 bg-white/50" />
          </tr>
          
          <tr 
            v-for="iq in inquiries" 
            :key="iq.id" 
            class="hover:bg-ar-off-white transition-colors cursor-pointer group"
            @click="openInquiry(iq)"
          >
            <td class="px-6 py-4">
              <p class="font-bold text-ar-black text-sm">{{ iq.name }}</p>
            </td>
            <td class="px-6 py-4">
              <p class="text-sm text-ar-text">{{ iq.phone }}</p>
              <p class="text-[10px] text-ar-muted">{{ iq.email || 'No email' }}</p>
            </td>
            <td class="px-6 py-4 text-xs text-ar-muted">
              {{ new Date(iq.createdAt).toLocaleDateString() }}
            </td>
            <td class="px-6 py-4">
              <span 
                class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                :class="iq.status === 'new' ? 'bg-ar-yellow/20 text-ar-yellow-dark' : 'bg-ar-available/20 text-ar-available'"
              >
                {{ iq.status }}
              </span>
            </td>
            <td class="px-6 py-4 text-right">
              <button class="text-ar-yellow font-bold text-xs uppercase tracking-widest group-hover:underline">
                View Details
              </button>
            </td>
          </tr>

          <tr v-if="!pending && inquiries?.length === 0">
            <td colspan="5" class="px-6 py-20 text-center text-ar-muted">
              <Icon name="lucide:mail-x" class="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p>No inquiries found yet.</p>
            </td>
          </tr>
        </tbody>
      </table>
    </AppCard>

    <XaInquiryDrawer
      v-model="isDrawerOpen"
      :inquiry="selectedInquiry"
      @status-updated="handleUpdate"
    />
  </div>
</template>
