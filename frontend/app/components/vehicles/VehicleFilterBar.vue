<script setup lang="ts">
interface Filters {
  q: string
  category: string
  status: string
  sort: string
}

interface Props {
  modelValue: Filters
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])

const localFilters = ref({ ...props.modelValue })

watch(() => props.modelValue, (val) => {
  localFilters.value = { ...val }
}, { deep: true })

const updateFilters = () => {
  emit('update:modelValue', { ...localFilters.value })
}

const categories = [
  { label: 'All Categories', value: 'all' },
  { label: 'SUV', value: 'suv' },
  { label: 'Sedan', value: 'sedan' },
  { label: 'Pickup', value: 'pickup' },
  { label: 'Van', value: 'van' },
  { label: 'Motorcycle', value: 'motorcycle' },
  { label: 'Equipment', value: 'equipment' },
]

const statuses = [
  { label: 'All Status', value: 'all' },
  { label: 'Available', value: 'available' },
  { label: 'Reserved', value: 'reserved' },
]

const sortOptions = [
  { label: 'Newest First', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
]
</script>

<template>
  <div class="bg-white p-4 lg:p-6 rounded-xl border border-ar-border shadow-sm flex flex-col lg:flex-row gap-4 lg:items-end">
    <div class="flex-grow">
      <AppInput
        v-model="localFilters.q"
        label="Search"
        placeholder="Make, model, or year..."
        icon-left="lucide:search"
        @update:model-value="updateFilters"
      />
    </div>

    <div class="grid grid-cols-2 md:grid-cols-3 gap-4 lg:flex lg:gap-4 shrink-0">
      <AppSelect
        v-model="localFilters.category"
        label="Category"
        :options="categories"
        @update:model-value="updateFilters"
      />
      <AppSelect
        v-model="localFilters.status"
        label="Status"
        :options="statuses"
        @update:model-value="updateFilters"
      />
      <AppSelect
        v-model="localFilters.sort"
        label="Sort By"
        :options="sortOptions"
        class="col-span-2 md:col-span-1"
        @update:model-value="updateFilters"
      />
    </div>
  </div>
</template>
