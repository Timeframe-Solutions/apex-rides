<script setup lang="ts">
import type { Category } from '~/types'

interface Props {
  modelValue: boolean
  initial?: Category | null
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue', 'saved'])

const form = reactive({
  name: props.initial?.name || '',
  slug: props.initial?.slug || '',
  description: props.initial?.description || ''
})

watch(() => props.initial, (val) => {
  if (val) {
    form.name = val.name
    form.slug = val.slug
    form.description = val.description || ''
  } else {
    form.name = ''
    form.slug = ''
    form.description = ''
  }
})

const { success, error } = useToast()
const loading = ref(false)

const handleSubmit = async () => {
  loading.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    success('Category saved')
    emit('saved')
    emit('update:modelValue', false)
  } catch (e) {
    error('Error saving category')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <AppModal
    :model-value="modelValue"
    max-width="500px"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <div class="space-y-6">
      <div>
        <h3 class="text-xl font-display font-bold text-ar-black">{{ initial ? 'Edit' : 'Create' }} Category</h3>
        <p class="text-sm text-ar-muted">Organize your vehicles into logical groups.</p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <AppInput v-model="form.name" label="Category Name" placeholder="e.g. Pickup" required />
        <AppInput v-model="form.slug" label="URL Slug" placeholder="pickup" required />
        <AppTextarea v-model="form.description" label="Description" :rows="3" />
        
        <div class="pt-4 flex gap-3">
          <AppButton type="button" variant="ghost" block class="!text-ar-black" @click="emit('update:modelValue', false)">Cancel</AppButton>
          <AppButton type="submit" variant="primary" block :loading="loading">Save Category</AppButton>
        </div>
      </form>
    </div>
  </AppModal>
</template>
