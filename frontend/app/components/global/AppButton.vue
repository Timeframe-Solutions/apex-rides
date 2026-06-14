<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'whatsapp' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  to?: string
  disabled?: boolean
  loading?: boolean
  iconLeft?: string
  iconRight?: string
  block?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
})

const isLink = computed(() => !!(props.href || props.to))
const componentType = computed(() => {
  if (props.to) return resolveComponent('NuxtLink')
  if (props.href) return 'a'
  return 'button'
})

const variantClasses = {
  primary: 'bg-ar-yellow text-ar-black hover:bg-ar-yellow-dark shadow-sm hover:shadow-md',
  secondary: 'border-2 border-ar-black text-ar-black hover:bg-ar-black hover:text-white',
  whatsapp: 'bg-ar-whatsapp text-white hover:bg-ar-whatsapp/90 shadow-sm hover:shadow-md',
  ghost: 'bg-white/10 border border-white/25 text-white hover:bg-white/18',
  danger: 'bg-ar-sold text-white hover:bg-ar-sold/90',
}

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-[0.9375rem] tracking-[0.02em]',
  lg: 'px-8 py-3.5 text-base tracking-[0.02em]',
}

const baseClasses = 'inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-md disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]'
</script>

<template>
  <component
    :is="componentType"
    :to="to"
    :href="href"
    :disabled="disabled || loading"
    :class="[
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      { 'w-full': block }
    ]"
    v-bind="$attrs"
  >
    <div v-if="loading" class="mr-2 animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
    
    <Icon v-if="iconLeft && !loading" :name="iconLeft" class="mr-2" />
    <Icon v-if="variant === 'whatsapp' && !iconLeft && !loading" name="logos:whatsapp-icon" class="mr-2" />
    
    <slot />
    
    <Icon v-if="iconRight" :name="iconRight" class="ml-2" />
  </component>
</template>
