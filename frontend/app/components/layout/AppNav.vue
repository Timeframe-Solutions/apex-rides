<script setup lang="ts">
const route = useRoute()
const isScrolled = ref(false)
const isMobileOpen = ref(false)
const { generalLink } = useWhatsApp()

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Vehicles', to: '/vehicles' },
  { label: 'Services', to: '/services' },
  { label: 'About Us', to: '/about' },
  { label: 'Testimonials', to: '/testimonials' },
  { label: 'Contact', to: '/contact' },
]

// Determine if we are on a vehicle detail page or any page that needs a solid nav immediately
const isVehicleDetailPage = computed(() => route.path.startsWith('/vehicles/'))
const isElevated = computed(() => isScrolled.value || isVehicleDetailPage.value)

onMounted(() => {
  // Check initial scroll position
  isScrolled.value = window.scrollY > 20
  
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 20
  }, { passive: true })
})
</script>

<template>
  <header class="fixed top-0 left-0 w-full z-50 transition-all duration-500">
    <!-- Top Info Bar (Desktop only) -->
    <div 
      class="hidden lg:block bg-black/80 backdrop-blur-md border-b border-white/5 py-2 text-[10px] text-white/60 font-semibold uppercase tracking-widest transition-all duration-500"
      :class="{ 'h-0 opacity-0 overflow-hidden py-0': isScrolled }"
    >
      <div class="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div class="flex items-center gap-8">
          <div class="flex items-center gap-2">
            <span class="text-ar-yellow">SALES:</span>
            <a href="tel:+254700000000" class="hover:text-white transition-colors">+254 700 000 000</a>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-ar-yellow">SERVICE:</span>
            <a href="tel:+254700000000" class="hover:text-white transition-colors">+254 700 000 001</a>
          </div>
        </div>
        <div class="flex items-center gap-8">
          <div class="flex items-center gap-2">
            <Icon name="lucide:clock" class="w-3 h-3 text-ar-yellow" />
            <span>OPEN TODAY: 8:00 AM - 6:00 PM</span>
          </div>
          <div class="flex items-center gap-4 border-l border-white/10 pl-8">
            <NuxtLink to="/contact" class="flex items-center gap-2 hover:text-white transition-colors">
              <Icon name="lucide:map-pin" class="w-3 h-3 text-ar-yellow" />
              <span>LOCATIONS</span>
            </NuxtLink>
            <NuxtLink to="/xa/login" class="flex items-center gap-2 hover:text-white transition-colors">
              <Icon name="lucide:user" class="w-3 h-3 text-ar-yellow" />
              <span>LOGIN</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Navigation -->
    <nav
      class="transition-all duration-500 h-14 md:h-16"
      :class="[
        isElevated 
          ? 'bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.25)]' 
          : 'bg-transparent border-b border-transparent'
      ]"
    >
      <div class="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center group">
          <span class="text-white font-display font-extrabold text-xl lg:text-2xl tracking-tighter">
            APEX<span class="text-ar-yellow group-hover:text-ar-yellow-dark transition-colors">RIDES</span>
          </span>
        </NuxtLink>

        <!-- Desktop Links -->
        <div class="hidden lg:flex items-center gap-10 h-full">
          <div class="flex items-center gap-7 h-full">
            <NuxtLink
              v-for="link in navLinks"
              :key="link.to"
              :to="link.to"
              class="text-white/80 hover:text-white font-medium transition-all text-[0.7rem] uppercase tracking-[0.15em] h-full flex items-center border-b-2 border-transparent hover:border-ar-yellow/40"
              active-class="text-ar-yellow !border-ar-yellow"
            >
              {{ link.label }}
            </NuxtLink>
          </div>
          
          <div class="pl-6 border-l border-white/10 py-1">
            <AppButton 
              variant="whatsapp" 
              size="sm" 
              :href="generalLink()"
              target="_blank"
              class="!py-2 !px-5 hover:-translate-y-0.5"
            >
              WhatsApp Us
            </AppButton>
          </div>
        </div>

        <!-- Mobile Toggle -->
        <button 
          class="lg:hidden text-white p-2"
          @click="isMobileOpen = true"
        >
          <Icon name="lucide:menu" class="w-7 h-7" />
        </button>
      </div>

      <!-- Mobile Nav Drawer -->
      <AppNavMobile v-model="isMobileOpen" :links="navLinks" />
    </nav>
  </header>
</template>

