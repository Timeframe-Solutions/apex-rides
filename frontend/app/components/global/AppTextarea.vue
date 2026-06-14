<script setup lang="ts">
interface Props {
  modelValue: string
  label?: string
  placeholder?: string
  rows?: number | string
  maxLength?: number
  error?: string
  required?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  rows: 4,
})

const emit = defineEmits(['update:modelValue'])

const onInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
}

const currentLength = computed(() => props.modelValue?.length || 0)
</script>

<template>
  <div class="flex flex-col gap-1.5 w-full">
    <label v-if="label" class="text-sm font-semibold text-ar-black flex items-center gap-1">
      {{ label }}
      <span v-if="required" class="text-ar-sold">*</span>
    </label>
    
    <div class="relative">
      <textarea
        :value="modelValue"
        :placeholder="placeholder"
        :rows="rows"
        :required="required"
        :maxlength="maxLength"
        class="w-full bg-white border rounded-md px-4 py-2.5 text-ar-text font-body transition-all duration-200 outline-none placeholder:text-ar-muted focus:border-ar-yellow focus:ring-4 focus:ring-ar-yellow/10 disabled:opacity-50 disabled:bg-ar-off-white resize-none"
        :class="[
          error ? 'border-ar-sold' : 'border-ar-border'
        ]"
        @input="onInput"
      />
      
      <div v-if="maxLength" class="absolute bottom-2 right-3 text-[10px] font-medium text-ar-muted">
        {{ currentLength }} / {{ maxLength }}
      </div>
    </div>
    
    <p v-if="error" class="text-xs text-ar-sold font-medium">
      {{ error }}
    </p>
  </div>
</template>
