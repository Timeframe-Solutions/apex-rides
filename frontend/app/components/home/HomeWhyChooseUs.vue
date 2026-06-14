<script setup lang="ts">
const features = [
  {
    icon: 'lucide:shield-check',
    title: 'Well-Maintained Vehicles',
    desc: 'Every vehicle is inspected before listing — no surprises.'
  },
  {
    icon: 'lucide:zap',
    title: 'Easy Booking Process',
    desc: 'Browse, inquire via WhatsApp, and confirm in under 30 minutes.'
  },
  {
    icon: 'lucide:tag',
    title: 'Affordable Pricing',
    desc: 'Competitive rates with transparent pricing. No hidden fees.'
  },
  {
    icon: 'lucide:clock',
    title: '24/7 Support',
    desc: 'Our team responds on WhatsApp day and night.'
  }
]
</script>

<template>
  <section class="py-20 lg:py-24 bg-white">
    <div class="max-w-7xl mx-auto px-6">
      <SectionHeader
        align="center"
        eyebrow="Why Choose Us"
        title="Enjoy flexibility and unbeatable rates with our city car rentals"
      />

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        <div 
          v-for="item in features" 
          :key="item.title"
          class="flex flex-col items-center text-center group"
        >
          <div class="w-20 h-20 rounded-2xl bg-ar-off-white flex items-center justify-center mb-6 group-hover:bg-ar-yellow group-hover:rotate-6 transition-all duration-300">
            <Icon :name="item.icon" class="w-10 h-10 text-ar-yellow group-hover:text-ar-black transition-colors" />
          </div>
          <h3 class="font-display font-bold text-xl text-ar-black mb-3">{{ item.title }}</h3>
          <p class="text-ar-muted text-sm leading-relaxed">{{ item.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
