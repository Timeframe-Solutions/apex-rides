<script setup lang="ts">
import services from '~/../data/services.json'

useHead({
  title: 'Our Services',
  meta: [
    { name: 'description', content: 'Car hire, vehicle import from Japan/UK/UAE, fleet management, and equipment rental in Nairobi.' }
  ]
})
</script>

<template>
  <div>
    <PageHeader 
      title="Our Services" 
      subtitle="From daily car hire to full vehicle import — we've got you covered."
    />

    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ServiceCard
            v-for="service in services"
            :key="service.id"
            :service="service"
            class="!p-8 lg:!p-12"
          />
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="py-20 bg-ar-off-white">
      <div class="max-w-7xl mx-auto px-6 text-center">
        <SectionHeader
          align="center"
          eyebrow="Process"
          title="How It Works"
        />

        <div class="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          <!-- Desktop Connector Line -->
          <div class="hidden md:block absolute top-10 left-1/4 right-1/4 h-0.5 bg-ar-border -z-0" />

          <div class="relative z-10 flex flex-col items-center">
            <div class="w-20 h-20 rounded-full bg-ar-yellow text-ar-black flex items-center justify-center font-display font-extrabold text-2xl mb-6 shadow-lg">1</div>
            <h4 class="font-bold text-xl mb-3">Browse or Inquire</h4>
            <p class="text-ar-muted text-sm">Find a vehicle on our site or tell us what you need via WhatsApp.</p>
          </div>

          <div class="relative z-10 flex flex-col items-center">
            <div class="w-20 h-20 rounded-full bg-ar-yellow text-ar-black flex items-center justify-center font-display font-extrabold text-2xl mb-6 shadow-lg">2</div>
            <h4 class="font-bold text-xl mb-3">We Confirm</h4>
            <p class="text-ar-muted text-sm">We respond within minutes with availability, pricing, and photos.</p>
          </div>

          <div class="relative z-10 flex flex-col items-center">
            <div class="w-20 h-20 rounded-full bg-ar-yellow text-ar-black flex items-center justify-center font-display font-extrabold text-2xl mb-6 shadow-lg">3</div>
            <h4 class="font-bold text-xl mb-3">Agree & Go</h4>
            <p class="text-ar-muted text-sm">Confirm the deal, make payment, and we handle the rest.</p>
          </div>
        </div>
      </div>
    </section>

    <HomeContactBanner />
  </div>
</template>
