<script setup lang="ts">
interface Props {
  modelValue: string | number
  label?: string
  placeholder?: string
  type?: 'text' | 'tel' | 'email' | 'password' | 'number'
  error?: string
  hint?: string
  required?: boolean
  disabled?: boolean
  iconLeft?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
})

const emit = defineEmits(['update:modelValue', 'blur', 'focus'])

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
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
      <div v-if="iconLeft" class="absolute left-3 top-1/2 -translate-y-1/2 text-ar-muted">
        <Icon :name="iconLeft" class="w-5 h-5" />
      </div>
      
      <input
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        class="w-full bg-white border rounded-md px-4 py-2.5 text-ar-text font-body transition-all duration-200 outline-none placeholder:text-ar-muted focus:border-ar-yellow focus:ring-4 focus:ring-ar-yellow/10 disabled:opacity-50 disabled:bg-ar-off-white"
        :class="[
          error ? 'border-ar-sold' : 'border-ar-border',
          iconLeft ? 'pl-10' : ''
        ]"
        @input="onInput"
        @blur="emit('blur', $event)"
        @focus="emit('focus', $event)"
      >
    </div>
    
    <p v-if="error" class="text-xs text-ar-sold font-medium">
      {{ error }}
    </p>
    <p v-else-if="hint" class="text-xs text-ar-muted">
      {{ hint }}
    </p>
  </div>
</template>
