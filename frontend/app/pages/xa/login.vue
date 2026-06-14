<script setup lang="ts">
definePageMeta({ layout: false })

const form = reactive({ email: '', password: '' })
const error = ref('')
const loading = ref(false)

const handleLogin = async () => {
  loading.value = true
  error.value = ''
  try {
    const response = await $fetch('/api/admin/login', {
      method: 'POST',
      body: { email: form.email, password: form.password }
    })
    
    if (response.success) {
      navigateTo('/xa/dashboard')
    }
  } catch (e: any) {
    error.value = e.statusMessage || 'Invalid email or password'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-ar-black flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl p-8 w-full max-w-sm shadow-2xl relative overflow-hidden">
      <!-- Accent Line -->
      <div class="absolute top-0 left-0 w-full h-1.5 bg-ar-yellow" />

      <div class="text-center mb-8">
        <h2 class="text-2xl font-display font-extrabold text-ar-black uppercase tracking-tight">
          APEX<span class="text-ar-yellow">ADMIN</span>
        </h2>
        <p class="text-ar-muted text-sm mt-1 font-medium">Authorized Personnel Only</p>
      </div>

      <div class="space-y-5">
        <AppInput
          v-model="form.email"
          label="Email Address"
          placeholder="admin@apex.co.ke"
          type="email"
          icon-left="lucide:mail"
        />
        <AppInput
          v-model="form.password"
          label="Password"
          placeholder="••••••••"
          type="password"
          icon-left="lucide:lock"
        />

        <p v-if="error" class="text-ar-sold text-xs font-bold text-center bg-ar-sold/10 py-2 rounded-md">
          {{ error }}
        </p>

        <div class="pt-2">
          <AppButton 
            variant="primary" 
            block 
            size="lg" 
            :loading="loading"
            @click="handleLogin"
          >
            Sign In to Dashboard
          </AppButton>
        </div>
      </div>

      <p class="mt-8 text-center text-xs text-ar-muted">
        &copy; 2025 Apex Rides Nairobi<br />
        By Timeframe Solutions
      </p>
    </div>
  </div>
</template>
