<script setup lang="ts">
interface Props {
  modelValue: string
  label?: string
  options: Array<{ label: string; value: string }>
  placeholder?: string
  error?: string
  required?: boolean
}

defineProps<Props>()
const emit = defineEmits(['update:modelValue'])

const onChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="flex flex-col gap-1.5 w-full">
    <label v-if="label" class="text-sm font-semibold text-ar-black flex items-center gap-1">
      {{ label }}
      <span v-if="required" class="text-ar-sold">*</span>
    </label>
    
    <div class="relative">
      <select
        :value="modelValue"
        :required="required"
        class="w-full bg-white border rounded-md pl-4 pr-10 py-2.5 text-ar-text font-body transition-all duration-200 outline-none appearance-none focus:border-ar-yellow focus:ring-4 focus:ring-ar-yellow/10 disabled:opacity-50 disabled:bg-ar-off-white"
        :class="[
          error ? 'border-ar-sold' : 'border-ar-border'
        ]"
        @change="onChange"
      >
        <option v-if="placeholder" value="" disabled selected>{{ placeholder }}</option>
        <option v-for="opt in options" :key="opt.value" :value="opt.value">
          {{ opt.label }}
        </option>
      </select>
      
      <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-ar-muted">
        <Icon name="lucide:chevron-down" class="w-4 h-4" />
      </div>
    </div>
    
    <p v-if="error" class="text-xs text-ar-sold font-medium">
      {{ error }}
    </p>
  </div>
</template>
