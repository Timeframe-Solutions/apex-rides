<script setup lang="ts">
definePageMeta({ layout: 'xa' })

const contentBlocks = ref([
  { key: 'hero_h1', label: 'Home Hero Headline', value: 'Quick and Affordable Car Rentals & Sales', type: 'text' },
  { key: 'hero_sub', label: 'Home Hero Subtext', value: 'Browse our verified inventory of cars, SUVs, pickups, and vans. Get in touch via WhatsApp and get a response in minutes.', type: 'richtext' },
  { key: 'services_intro', label: 'Services Section Title', value: 'More Than Just Vehicle Sales', type: 'text' },
])

const { success } = useToast()
const loadingKey = ref('')

const saveBlock = async (key: string) => {
  loadingKey.value = key
  await new Promise(resolve => setTimeout(resolve, 800))
  loadingKey.value = ''
  success('Block updated successfully')
}
</script>

<template>
  <div class="space-y-8 max-w-4xl">
    <div>
      <h2 class="text-2xl font-display font-bold text-ar-black">Page Content</h2>
      <p class="text-sm text-ar-muted">Manage the copy and headlines across the public website.</p>
    </div>

    <div class="space-y-6">
      <AppCard v-for="block in contentBlocks" :key="block.key" class="space-y-4">
        <div class="flex items-center justify-between">
          <label class="text-xs font-bold uppercase tracking-widest text-ar-muted">{{ block.label }}</label>
          <span class="text-[10px] bg-ar-off-white px-2 py-0.5 rounded border border-ar-border font-mono">{{ block.key }}</span>
        </div>

        <AppInput v-if="block.type === 'text'" v-model="block.value" />
        <AppTextarea v-if="block.type === 'richtext'" v-model="block.value" :rows="3" />

        <div class="flex justify-end">
          <AppButton 
            variant="secondary" 
            size="sm" 
            :loading="loadingKey === block.key"
            @click="saveBlock(block.key)"
          >
            Update Block
          </AppButton>
        </div>
      </AppCard>
    </div>
  </div>
</template>
