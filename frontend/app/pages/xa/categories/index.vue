<script setup lang="ts">
import type { Category } from '~/types'

definePageMeta({ layout: 'xa' })

const { data: categories, pending, refresh } = await useFetch<any[]>('/api/admin/categories/list')

const isModalOpen = ref(false)
const selectedCategory = ref<Category | null>(null)

const openCreate = () => {
  selectedCategory.value = null
  isModalOpen.value = true
}

const openEdit = (cat: Category) => {
  selectedCategory.value = cat
  isModalOpen.value = true
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-display font-bold text-ar-black">Vehicle Categories</h2>
        <p class="text-sm text-ar-muted">Classification system for your inventory.</p>
      </div>
      <AppButton @click="openCreate" icon-left="lucide:plus">New Category</AppButton>
    </div>

    <AppCard padding="none" class="overflow-hidden">
      <table class="w-full text-left border-collapse">
        <thead class="bg-ar-off-white text-[10px] font-bold uppercase tracking-widest text-ar-muted border-b border-ar-border">
          <tr>
            <th class="px-6 py-4">Name</th>
            <th class="px-6 py-4">Slug</th>
            <th class="px-6 py-4">Listing Count</th>
            <th class="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-ar-border">
          <tr v-for="cat in categories" :key="cat.id" class="hover:bg-ar-off-white transition-colors">
            <td class="px-6 py-4 font-bold text-ar-black text-sm">{{ cat.name }}</td>
            <td class="px-6 py-4 text-sm text-ar-muted">{{ cat.slug }}</td>
            <td class="px-6 py-4">
              <span class="px-2 py-1 bg-ar-off-white border border-ar-border rounded text-xs font-bold">{{ cat.count }} items</span>
            </td>
            <td class="px-6 py-4 text-right">
              <button @click="openEdit(cat)" class="p-2 hover:bg-ar-yellow/10 text-ar-muted hover:text-ar-yellow-dark rounded-lg">
                <Icon name="lucide:pencil" class="w-5 h-5" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </AppCard>

    <XaCategoryForm
      v-model="isModalOpen"
      :initial="selectedCategory"
      @saved="refresh"
    />
  </div>
</template>
