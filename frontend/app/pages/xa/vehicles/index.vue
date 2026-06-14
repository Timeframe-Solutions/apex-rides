<script setup lang="ts">
import type { Vehicle } from '~/types'

definePageMeta({ layout: 'xa' })

const { data, pending, refresh } = await useFetch<{ vehicles: Vehicle[], total: number }>('/api/admin/vehicles')
const vehicles = computed(() => data.value?.vehicles || [])

const { success, error } = useToast()
const isDeleteModalOpen = ref(false)
const vehicleToDelete = ref<Vehicle | null>(null)
const deleteLoading = ref(false)

const confirmDelete = (v: Vehicle) => {
  vehicleToDelete.value = v
  isDeleteModalOpen.value = true
}

const handleDelete = async () => {
  if (!vehicleToDelete.value) return
  deleteLoading.value = true
  try {
    await $fetch(`/api/admin/vehicles/${vehicleToDelete.value.id}`, {
      method: 'DELETE'
    })
    success('Vehicle deleted successfully')
    refresh()
    isDeleteModalOpen.value = false
  } catch (e) {
    error('Error deleting vehicle')
  } finally {
    deleteLoading.value = false
  }
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-display font-bold text-ar-black">Vehicle Inventory</h2>
        <p class="text-sm text-ar-muted">Manage your showroom listings and rental fleet.</p>
      </div>
      <AppButton to="/xa/vehicles/new" icon-left="lucide:plus">Add New Vehicle</AppButton>
    </div>

    <AppCard padding="none" class="overflow-hidden">
      <table class="w-full text-left border-collapse">
        <thead class="bg-ar-off-white text-[10px] font-bold uppercase tracking-widest text-ar-muted border-b border-ar-border">
          <tr>
            <th class="px-6 py-4">Vehicle</th>
            <th class="px-6 py-4">Category</th>
            <th class="px-6 py-4">Price</th>
            <th class="px-6 py-4">Status</th>
            <th class="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-ar-border">
          <tr v-if="pending" v-for="i in 5" :key="i" class="animate-pulse">
            <td colspan="5" class="px-6 py-4 h-16 bg-white/50" />
          </tr>
          
          <tr v-for="v in vehicles" :key="v.id" class="hover:bg-ar-off-white transition-colors">
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <NuxtImg :src="v.images[0]" class="w-12 h-8 object-cover rounded" />
                <div>
                  <p class="font-bold text-ar-black text-sm">{{ v.title }}</p>
                  <p class="text-[10px] text-ar-muted uppercase tracking-widest">Ref: AR-{{ v.id }}</p>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 text-sm text-ar-text uppercase font-medium">{{ v.category }}</td>
            <td class="px-6 py-4 font-bold text-ar-black text-sm">{{ v.priceLabel }}</td>
            <td class="px-6 py-4">
              <AppBadge :status="v.status" />
            </td>
            <td class="px-6 py-4 text-right">
              <div class="flex justify-end gap-2">
                <NuxtLink 
                  :to="`/xa/vehicles/edit?id=${v.id}`"
                  class="p-2 hover:bg-ar-yellow/10 text-ar-muted hover:text-ar-yellow-dark transition-colors rounded-lg"
                  title="Edit"
                >
                  <Icon name="lucide:pencil" class="w-5 h-5" />
                </NuxtLink>
                <button 
                  @click="confirmDelete(v)"
                  class="p-2 hover:bg-ar-sold/10 text-ar-muted hover:text-ar-sold transition-colors rounded-lg"
                  title="Delete"
                >
                  <Icon name="lucide:trash-2" class="w-5 h-5" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </AppCard>

    <!-- Delete Confirmation -->
    <AppModal v-model="isDeleteModalOpen" max-width="400px">
      <div class="text-center py-4">
        <div class="w-16 h-16 rounded-full bg-ar-sold/10 text-ar-sold flex items-center justify-center mx-auto mb-6">
          <Icon name="lucide:alert-triangle" class="w-8 h-8" />
        </div>
        <h3 class="text-xl font-bold text-ar-black mb-2">Are you sure?</h3>
        <p class="text-ar-muted text-sm mb-8">
          You are about to delete <strong>{{ vehicleToDelete?.title }}</strong>. This action cannot be undone.
        </p>
        <div class="flex gap-4">
          <AppButton variant="ghost" block class="!text-ar-black" @click="isDeleteModalOpen = false">Cancel</AppButton>
          <AppButton variant="danger" block :loading="deleteLoading" @click="handleDelete">Delete Vehicle</AppButton>
        </div>
      </div>
    </AppModal>
  </div>
</template>
