<script setup lang="ts">
const { generalLink } = useWhatsApp()
const router = useRouter()

const filters = ref({
  category: 'all',
  make: '',
  model: '',
  year: ''
})

const categories = [
  { label: 'All Body Styles', value: 'all' },
  { label: 'SUV', value: 'suv' },
  { label: 'Sedan', value: 'sedan' },
  { label: 'Pickup', value: 'pickup' },
  { label: 'Van', value: 'van' },
]

const handleSearch = () => {
  router.push({
    path: '/vehicles',
    query: {
      category: filters.value.category !== 'all' ? filters.value.category : undefined,
      q: filters.value.make || filters.value.model ? `${filters.value.make} ${filters.value.model}`.trim() : undefined
    }
  })
}

const quickFeatures = [
  { icon: 'lucide:shopping-cart', label: 'Buy Online', to: '/vehicles' },
  { icon: 'lucide:banknote', label: 'Get Financing', to: '/contact' },
  { icon: 'lucide:key', label: 'Sell Your Car', to: '/contact' },
  { icon: 'lucide:wrench', label: 'Service Coupons', to: '/services' },
]
</script>

<template>
  <div class="relative">
    <section class="relative h-[80vh] lg:h-[85vh] flex flex-col lg:flex-row overflow-hidden bg-black">
      <!-- Left Panel: Inventory -->
      <div class="relative flex-1 group cursor-pointer overflow-hidden lg:clip-hero-left" @click="router.push('/vehicles')">
        <NuxtImg 
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1600" 
          alt="Inventory" 
          class="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-60 lg:opacity-100"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent lg:from-black/60 lg:via-transparent lg:to-transparent" />
        
        <div class="relative h-full flex flex-col items-center justify-center text-center px-6 pt-20 lg:pt-0">
          <h2 class="font-display text-4xl lg:text-7xl font-black text-white uppercase tracking-tighter mb-2 animate-fade-in-up">
            Inventory
          </h2>
          <p class="text-white/80 font-bold tracking-[0.3em] uppercase text-xs lg:text-sm mb-8 animate-fade-in-up delay-100">
            Search Now
          </p>

          <!-- Integrated Filter Bar (Desktop) -->
          <div class="hidden lg:flex items-center bg-white/10 backdrop-blur-md p-1.5 rounded-sm border border-white/20 w-full max-w-2xl animate-fade-in-up delay-200" @click.stop>
            <div class="grid grid-cols-3 gap-1 flex-grow">
              <select v-model="filters.category" class="bg-transparent text-white text-[10px] font-bold uppercase tracking-wider px-4 py-3 outline-none cursor-pointer hover:bg-white/5 transition-colors">
                <option v-for="cat in categories" :key="cat.value" :value="cat.value" class="bg-ar-charcoal">{{ cat.label }}</option>
              </select>
              <input 
                v-model="filters.make" 
                type="text" 
                placeholder="ANY MAKE" 
                class="bg-transparent text-white text-[10px] font-bold uppercase tracking-wider px-4 py-3 outline-none border-l border-white/10 placeholder:text-white/40"
              />
              <input 
                v-model="filters.model" 
                type="text" 
                placeholder="ANY MODEL" 
                class="bg-transparent text-white text-[10px] font-bold uppercase tracking-wider px-4 py-3 outline-none border-l border-white/10 placeholder:text-white/40"
              />
            </div>
            <button 
              @click="handleSearch"
              class="bg-ar-yellow hover:bg-ar-yellow-dark text-black font-black uppercase tracking-widest text-[10px] px-8 py-3 transition-colors shrink-0"
            >
              Search
            </button>
          </div>
          
          <AppButton to="/vehicles" variant="ghost" class="lg:hidden">Browse Inventory</AppButton>
        </div>
      </div>

      <!-- Right Panel: Service -->
      <div class="relative flex-1 lg:flex-[0.45] group cursor-pointer overflow-hidden" @click="router.push('/services')">
        <NuxtImg 
          src="https://images.unsplash.com/photo-1486006396193-47106ac93e27?auto=format&fit=crop&q=80&w=1600" 
          alt="Service" 
          class="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-40 lg:opacity-100"
        />
        <div class="absolute inset-0 bg-white/10 lg:bg-transparent" />
        <div class="absolute inset-0 bg-gradient-to-l from-black/60 via-transparent to-transparent hidden lg:block" />
        
        <div class="relative h-full flex flex-col items-center justify-center text-center px-6">
          <h2 class="font-display text-4xl lg:text-7xl font-black text-white uppercase tracking-tighter mb-2 animate-fade-in-up delay-200">
            Service
          </h2>
          <div class="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center animate-fade-in-up delay-300">
            <Icon name="lucide:arrow-right" class="text-white w-6 h-6 transition-transform group-hover:translate-x-1" />
          </div>
          
          <AppButton to="/services" variant="ghost" class="mt-8 lg:hidden">View Services</AppButton>
        </div>
      </div>
    </section>

    <!-- Quick Features Bar -->
    <div class="relative z-20 bg-white border-b border-ar-border">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-2 md:grid-cols-4 divide-x divide-ar-border">
          <NuxtLink 
            v-for="feature in quickFeatures" 
            :key="feature.label"
            :to="feature.to"
            class="flex flex-col md:flex-row items-center justify-center gap-3 py-6 md:py-8 hover:bg-ar-off-white transition-colors group"
          >
            <Icon :name="feature.icon" class="w-6 h-6 text-ar-black group-hover:scale-110 transition-transform" />
            <span class="text-[11px] font-black uppercase tracking-widest text-ar-black">{{ feature.label }}</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
  .clip-hero-left {
    clip-path: polygon(0 0, 100% 0, 85% 100%, 0% 100%);
    margin-right: -15%;
    z-index: 10;
  }
}
</style>
