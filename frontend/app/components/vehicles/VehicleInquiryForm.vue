<script setup lang="ts">
import type { Vehicle } from '~/types'

interface Props {
  vehicle: Vehicle
}

const props = defineProps<Props>()
const { success, error: toastError } = useToast()

const form = reactive({
  name: '',
  phone: '',
  email: '',
  message: `Hi, I'm interested in the ${props.vehicle.title} (Ref: AR-${props.vehicle.id}). Is it still available?`
})

const loading = ref(false)
const submitted = ref(false)

const handleSubmit = async () => {
  loading.value = true
  try {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    submitted.value = true
    success('Inquiry sent! We\'ll get back to you shortly.')
  } catch (e) {
    toastError('Something went wrong. Please try WhatsApp.')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div id="inquiry-form" class="scroll-mt-24">
    <AppCard v-if="submitted" class="text-center py-12 flex flex-col items-center">
      <div class="w-20 h-20 rounded-full bg-ar-available/10 text-ar-available flex items-center justify-center mb-6 animate-bounce">
        <Icon name="lucide:check-circle" class="w-12 h-12" />
      </div>
      <h3 class="text-2xl font-display font-bold text-ar-black mb-2">Inquiry Received!</h3>
      <p class="text-ar-muted max-w-sm mx-auto mb-8">
        Thank you for your interest. Our team will contact you on WhatsApp or via phone within the next hour.
      </p>
      <AppButton variant="secondary" @click="submitted = false">Send Another Message</AppButton>
    </AppCard>

    <div v-else class="space-y-8">
      <div class="flex flex-col gap-2">
        <h3 class="text-2xl font-display font-bold text-ar-black">Send an Inquiry</h3>
        <p class="text-ar-muted">Prefer to type? Fill in the form and we'll get back to you same day.</p>
      </div>

      <form @submit.prevent="handleSubmit" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AppInput
          v-model="form.name"
          label="Your Name"
          placeholder="John Kariuki"
          required
        />
        <AppInput
          v-model="form.phone"
          label="Phone Number"
          placeholder="0712 345 678"
          type="tel"
          required
        />
        <AppInput
          v-model="form.email"
          label="Email (optional)"
          placeholder="you@email.com"
          type="email"
          class="md:col-span-2"
        />
        <AppTextarea
          v-model="form.message"
          label="Message"
          placeholder="Tell us what you want to know..."
          class="md:col-span-2"
          required
        />
        
        <div class="md:col-span-2">
          <AppButton 
            type="submit" 
            block 
            size="lg" 
            :loading="loading"
          >
            Send Inquiry
          </AppButton>
        </div>
      </form>
    </div>
  </div>
</template>
