<script setup lang="ts">
const stats = [
  { label: 'Years in Business', value: '10+' },
  { label: 'Vehicles Sold', value: '500+' },
  { label: 'Happy Clients', value: '1,200+' },
  { label: 'Fleet Vehicles', value: '80+' },
]

const trustBadges = [
  { icon: 'lucide:award', label: 'Licensed Dealer', desc: 'NTSA Registered' },
  { icon: 'lucide:smartphone', label: 'M-Pesa Accepted', desc: 'Secure Payments' },
  { icon: 'lucide:package', label: 'KRA Cleared', desc: 'All Imports Verified' },
  { icon: 'lucide:clock', label: '10 Years', desc: 'Trusted Experience' },
]

useHead({
  title: 'About Us',
  meta: [
    { name: 'description', content: 'Apex Rides Nairobi — 10+ years in vehicle sales and hire. Trusted by 1,200+ clients across Kenya.' }
  ]
})
</script>

<template>
  <div>
    <PageHeader 
      title="About Apex Rides Nairobi" 
      subtitle="Nairobi's trusted vehicle partner since 2015."
    />

    <!-- Our Story -->
    <section class="py-20 lg:py-24 bg-white">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div class="space-y-6">
            <SectionHeader
              eyebrow="Our Story"
              title="Built for Nairobi. Built for Value."
            />
            <div class="text-ar-text text-lg leading-relaxed space-y-4">
              <p>
                Apex Rides Nairobi started with three vehicles and a simple idea: make car hire and vehicle sales simple, honest, and affordable for Nairobians.
              </p>
              <p>
                Ten years later, we operate one of Nairobi's largest privately-owned vehicle inventories — from compact sedans to heavy-duty pickups. Our clients range from students buying their first car to logistics companies managing fleets of 50+ vehicles.
              </p>
              <p>
                We run on WhatsApp, move fast, and we don't charge what we can't justify.
              </p>
            </div>
            
            <div class="pt-6">
              <AppButton to="/contact" variant="primary" size="lg">Talk to Our Team</AppButton>
            </div>
          </div>
          
          <div class="relative">
            <div class="absolute -top-4 -left-4 w-24 h-24 bg-ar-yellow rounded-2xl -z-10" />
            <div class="absolute -bottom-4 -right-4 w-24 h-24 bg-ar-charcoal rounded-2xl -z-10" />
            <NuxtImg 
              src="/hero-bg.jpg" 
              alt="Our Showroom" 
              class="rounded-2xl shadow-2xl object-cover aspect-[4/3] w-full"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Bar -->
    <section class="py-16 bg-ar-black text-white">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="stat in stats" :key="stat.label" class="text-center">
            <div class="text-4xl lg:text-5xl font-display font-extrabold text-ar-yellow mb-2">{{ stat.value }}</div>
            <div class="text-white/60 text-sm uppercase tracking-widest">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Trust Badges -->
    <section class="py-20 bg-ar-off-white">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div 
            v-for="badge in trustBadges" 
            :key="badge.label"
            class="bg-white p-8 rounded-xl border border-ar-border text-center group hover:border-ar-yellow transition-colors"
          >
            <div class="w-12 h-12 rounded-full bg-ar-yellow/10 text-ar-yellow flex items-center justify-center mx-auto mb-4 group-hover:bg-ar-yellow group-hover:text-ar-black transition-all">
              <Icon :name="badge.icon" class="w-6 h-6" />
            </div>
            <h4 class="font-bold text-ar-black mb-1">{{ badge.label }}</h4>
            <p class="text-xs text-ar-muted uppercase tracking-widest">{{ badge.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <HomeContactBanner />
  </div>
</template>
