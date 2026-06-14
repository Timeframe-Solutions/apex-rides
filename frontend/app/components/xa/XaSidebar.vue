<script setup lang="ts">
const route = useRoute()

const navItems = [
  { label: 'Dashboard', to: '/xa/dashboard', icon: 'lucide:layout-dashboard' },
  { label: 'Vehicles', to: '/xa/vehicles', icon: 'lucide:car' },
  { label: 'Inquiries', to: '/xa/inquiries', icon: 'lucide:mail' },
  { label: 'Categories', to: '/xa/categories', icon: 'lucide:tag' },
  { label: 'Content', to: '/xa/content', icon: 'lucide:file-text' },
]

const handleLogout = async () => {
  try {
    await $fetch('/api/admin/logout', { method: 'POST' })
    navigateTo('/xa/login')
  } catch (e) {
    console.error('Logout failed', e)
  }
}
</script>

<template>
  <aside class="w-64 bg-[#0F172A] flex flex-col h-full shrink-0">
    <!-- Header -->
    <div class="h-16 flex items-center px-6 border-b border-white/5">
      <NuxtLink to="/xa/dashboard" class="text-white font-display font-bold text-lg tracking-tight">
        APEX<span class="text-ar-yellow">ADMIN</span>
      </NuxtLink>
    </div>

    <!-- Nav -->
    <nav class="flex-1 py-6 px-3 space-y-1">
      <NuxtLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group"
        active-class="bg-white/10 text-ar-yellow shadow-inner"
        inactive-class="text-white/60 hover:text-white hover:bg-white/5"
      >
        <Icon :name="item.icon" class="w-5 h-5 shrink-0" />
        {{ item.label }}
      </NuxtLink>
    </nav>

    <!-- Footer -->
    <div class="p-4 border-t border-white/5">
      <button 
        @click="handleLogout"
        class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/60 hover:text-ar-sold hover:bg-white/5 transition-all"
      >
        <Icon name="lucide:log-out" class="w-5 h-5 shrink-0" />
        Sign Out
      </button>
    </div>
  </aside>
</template>
