<script setup lang="ts">
import testimonials from '~/../data/testimonials.json'

// Mocking a larger set for the grid as per content.txt
const expandedTestimonials = [
  ...testimonials,
  {
    name: "Susan Wanjiku",
    role: "NGO Logistics",
    rating: 5,
    text: "Fleet of 8 vehicles. Apex handles maintenance and replacements. Life is easier."
  },
  {
    name: "Kevin Omondi",
    role: "Ride-hailing Driver",
    rating: 5,
    text: "Bought a Corolla for my work. Best value in Nairobi. I've sent three friends here."
  },
  {
    name: "Mary Njeri",
    role: "Small Business Owner",
    rating: 5,
    text: "Car hire for client meetings monthly. They always have something ready."
  },
  {
    name: "Ali Mohammed",
    role: "Car Dealer Partner",
    rating: 5,
    text: "Import service is excellent. Brian keeps you updated at every step."
  },
  {
    name: "Caroline Auma",
    role: "HR Manager",
    rating: 5,
    text: "Staff transport sorted in one call. The fleet team is professional."
  },
  {
    name: "Daniel Otieno",
    role: "First-time Buyer",
    rating: 5,
    text: "I was nervous buying a used car. They walked me through everything. Recommend."
  }
]

useHead({
  title: 'Client Stories',
  meta: [
    { name: 'description', content: 'Over 1,200 clients served across Nairobi and Kenya. Here\'s what some of them say.' }
  ]
})
</script>

<template>
  <div>
    <PageHeader 
      title="What Our Clients Say" 
      subtitle="Over 1,200 clients served across Nairobi and Kenya. Here's what some of them say."
    />

    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TestimonialCard
            v-for="t in expandedTestimonials"
            :key="t.name"
            :testimonial="t"
          />
        </div>

        <div class="mt-20 p-8 lg:p-12 bg-ar-off-white rounded-2xl border border-ar-border flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div>
            <div class="flex items-center justify-center md:justify-start gap-2 mb-2">
              <span class="text-3xl font-extrabold text-ar-black">4.8</span>
              <div class="flex">
                <Icon v-for="i in 5" :key="i" name="lucide:star" class="w-5 h-5 text-ar-yellow fill-ar-yellow" />
              </div>
            </div>
            <p class="text-ar-muted text-sm font-bold uppercase tracking-widest">Based on 140+ Google Reviews</p>
          </div>

          <AppButton variant="secondary" href="https://google.com" target="_blank">
            Read our Google Reviews
            <Icon name="lucide:external-link" class="ml-2 w-4 h-4" />
          </AppButton>
        </div>
      </div>
    </section>

    <HomeContactBanner />
  </div>
</template>
