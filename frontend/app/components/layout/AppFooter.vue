<script setup lang="ts">
const { generalLink } = useWhatsApp()
const config = useRuntimeConfig()

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'Vehicles', to: '/vehicles' },
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

const categories = [
  { label: 'SUVs', to: '/vehicles?category=suv' },
  { label: 'Sedans', to: '/vehicles?category=sedan' },
  { label: 'Pickups', to: '/vehicles?category=pickup' },
  { label: 'Vans', to: '/vehicles?category=van' },
  { label: 'Motorcycles', to: '/vehicles?category=motorcycle' },
  { label: 'Equipment', to: '/vehicles?category=equipment' },
]
</script>

<template>
  <footer class="bg-ar-black text-white pt-20 pb-10">
    <div class="max-w-7xl mx-auto px-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <!-- Col 1: Brand -->
        <div class="space-y-6">
          <NuxtLink to="/" class="text-2xl font-display font-extrabold">
            APEX<span class="text-ar-yellow">RIDES</span>
          </NuxtLink>
          <p class="text-white/60 text-sm leading-relaxed max-w-xs">
            Quick and affordable vehicle solutions. Your trusted vehicle partner in Nairobi.
          </p>
          <div class="flex gap-4">
            <a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-ar-yellow hover:text-ar-black transition-all">
              <Icon name="lucide:facebook" class="w-5 h-5" />
            </a>
            <a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-ar-yellow hover:text-ar-black transition-all">
              <Icon name="lucide:instagram" class="w-5 h-5" />
            </a>
            <a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-ar-yellow hover:text-ar-black transition-all">
              <Icon name="lucide:music-2" class="w-5 h-5" />
            </a>
          </div>
        </div>

        <!-- Col 2: Quick Links -->
        <div>
          <h4 class="font-display font-bold text-lg mb-6 uppercase tracking-wider">Quick Links</h4>
          <ul class="space-y-4">
            <li v-for="link in quickLinks" :key="link.to">
              <NuxtLink :to="link.to" class="text-white/60 hover:text-ar-yellow transition-colors text-sm">
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Col 3: Categories -->
        <div>
          <h4 class="font-display font-bold text-lg mb-6 uppercase tracking-wider">Categories</h4>
          <ul class="space-y-4">
            <li v-for="cat in categories" :key="cat.to">
              <NuxtLink :to="cat.to" class="text-white/60 hover:text-ar-yellow transition-colors text-sm">
                {{ cat.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Col 4: Contact -->
        <div>
          <h4 class="font-display font-bold text-lg mb-6 uppercase tracking-wider">Contact Info</h4>
          <ul class="space-y-4 text-sm text-white/60">
            <li class="flex items-start gap-3">
              <Icon name="lucide:phone" class="w-5 h-5 text-ar-yellow shrink-0" />
              <a :href="`tel:${config.public.phoneNumber}`" class="hover:text-white transition-colors">{{ config.public.phoneNumber }}</a>
            </li>
            <li class="flex items-start gap-3">
              <Icon name="logos:whatsapp-icon" class="w-5 h-5 shrink-0" />
              <a :href="generalLink()" target="_blank" class="hover:text-white transition-colors">WhatsApp Us</a>
            </li>
            <li class="flex items-start gap-3">
              <Icon name="lucide:mail" class="w-5 h-5 text-ar-yellow shrink-0" />
              <a href="mailto:info@apexridesnairobi.co.ke" class="hover:text-white transition-colors">info@apexridesnairobi.co.ke</a>
            </li>
            <li class="flex items-start gap-3">
              <Icon name="lucide:map-pin" class="w-5 h-5 text-ar-yellow shrink-0" />
              <span>Mombasa Road, Industrial Area, Nairobi</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
        <p>© {{ new Date().getFullYear() }} Apex Rides Nairobi. All rights reserved.</p>
        <div class="flex gap-6">
          <NuxtLink to="/privacy" class="hover:text-white">Privacy Policy</NuxtLink>
          <span>Website by Timeframe Solutions</span>
        </div>
      </div>
    </div>
  </footer>
</template>
