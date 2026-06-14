<script setup lang="ts">
const config = useRuntimeConfig()
const { generalLink } = useWhatsApp()
const { success, error: toastError } = useToast()

const form = reactive({
  name: '',
  phone: '',
  email: '',
  subject: 'General Inquiry',
  message: ''
})

const subjects = [
  { label: 'General Inquiry', value: 'General Inquiry' },
  { label: 'I want to buy a vehicle', value: 'Buy Vehicle' },
  { label: 'Car Hire', value: 'Car Hire' },
  { label: 'Fleet Management', value: 'Fleet' },
  { label: 'Vehicle Import', value: 'Import' },
  { label: 'Equipment Rental', value: 'Equipment' },
]

const loading = ref(false)
const submitted = ref(false)

const handleSubmit = async () => {
  loading.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1500))
    submitted.value = true
    success('Message received! We\'ll get back to you shortly.')
  } catch (e) {
    toastError('Error sending message.')
  } finally {
    loading.value = false
  }
}

useHead({
  title: 'Contact Us',
  meta: [
    { name: 'description', content: 'Get in touch with Apex Rides Nairobi. WhatsApp, call, or email us. Located on Mombasa Road, Industrial Area, Nairobi.' }
  ]
})
</script>

<template>
  <div>
    <PageHeader 
      title="Get in Touch" 
      subtitle="We respond on WhatsApp in minutes. Or fill the form below."
    />

    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <!-- Contact Info -->
          <div class="lg:col-span-5 space-y-12">
            <div class="space-y-8">
              <div class="flex gap-6">
                <div class="w-12 h-12 rounded-xl bg-ar-whatsapp/10 text-ar-whatsapp flex items-center justify-center shrink-0">
                  <Icon name="logos:whatsapp-icon" class="w-6 h-6" />
                </div>
                <div>
                  <h4 class="font-bold text-lg mb-1">Chat on WhatsApp</h4>
                  <p class="text-ar-muted text-sm mb-4">{{ config.public.whatsappNumber }}</p>
                  <AppButton variant="whatsapp" size="sm" :href="generalLink()" target="_blank">Open WhatsApp</AppButton>
                </div>
              </div>

              <div class="flex gap-6">
                <div class="w-12 h-12 rounded-xl bg-ar-yellow/10 text-ar-yellow flex items-center justify-center shrink-0">
                  <Icon name="lucide:phone" class="w-6 h-6" />
                </div>
                <div>
                  <h4 class="font-bold text-lg mb-1">Call Us</h4>
                  <p class="text-ar-muted text-sm mb-4">{{ config.public.phoneNumber }}</p>
                  <AppButton variant="secondary" size="sm" :href="`tel:${config.public.phoneNumber}`">Call Now</AppButton>
                </div>
              </div>

              <div class="flex gap-6">
                <div class="w-12 h-12 rounded-xl bg-ar-charcoal/10 text-ar-charcoal flex items-center justify-center shrink-0">
                  <Icon name="lucide:mail" class="w-6 h-6" />
                </div>
                <div>
                  <h4 class="font-bold text-lg mb-1">Email Us</h4>
                  <p class="text-ar-muted text-sm">info@apexridesnairobi.co.ke</p>
                </div>
              </div>

              <div class="flex gap-6">
                <div class="w-12 h-12 rounded-xl bg-ar-charcoal/10 text-ar-charcoal flex items-center justify-center shrink-0">
                  <Icon name="lucide:map-pin" class="w-6 h-6" />
                </div>
                <div>
                  <h4 class="font-bold text-lg mb-1">Find Us</h4>
                  <p class="text-ar-muted text-sm leading-relaxed">
                    Apex Rides Nairobi Showroom<br />
                    Mombasa Road, Industrial Area<br />
                    Nairobi, Kenya
                  </p>
                </div>
              </div>
            </div>

            <div class="p-8 bg-ar-off-white rounded-2xl border border-ar-border">
              <h4 class="font-bold mb-4 flex items-center gap-2">
                <Icon name="lucide:clock" class="text-ar-yellow w-5 h-5" />
                Business Hours
              </h4>
              <ul class="space-y-2 text-sm">
                <li class="flex justify-between">
                  <span class="text-ar-muted">Monday – Saturday</span>
                  <span class="font-bold">8:00 AM – 6:00 PM</span>
                </li>
                <li class="flex justify-between">
                  <span class="text-ar-muted">Sunday</span>
                  <span class="font-bold">10:00 AM – 4:00 PM</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Contact Form -->
          <div class="lg:col-span-7">
            <AppCard v-if="submitted" class="text-center py-20 flex flex-col items-center">
              <div class="w-20 h-20 rounded-full bg-ar-available/10 text-ar-available flex items-center justify-center mb-6 animate-bounce">
                <Icon name="lucide:check-circle" class="w-12 h-12" />
              </div>
              <h3 class="text-3xl font-display font-bold text-ar-black mb-4">Message Received!</h3>
              <p class="text-ar-muted max-w-sm mx-auto mb-10 text-lg">
                We've received your inquiry. One of our agents will get back to you within the next hour.
              </p>
              <AppButton variant="secondary" @click="submitted = false">Send Another Message</AppButton>
            </AppCard>

            <div v-else class="space-y-10">
              <SectionHeader
                title="Send Us a Message"
                subtitle="We aim to reply within 1 business hour."
                class="!mb-0"
              />

              <form @submit.prevent="handleSubmit" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AppInput v-model="form.name" label="Full Name" placeholder="Your name" required />
                <AppInput v-model="form.phone" label="Phone Number" placeholder="0712 345 678" type="tel" required />
                <AppInput v-model="form.email" label="Email Address" placeholder="you@email.com" type="email" class="md:col-span-2" />
                <AppSelect v-model="form.subject" label="What are you looking for?" :options="subjects" class="md:col-span-2" required />
                <AppTextarea v-model="form.message" label="Message" placeholder="Tell us what you need..." :rows="6" class="md:col-span-2" required />
                
                <div class="md:col-span-2">
                  <AppButton type="submit" block size="lg" :loading="loading">Send Message</AppButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Map Section -->
    <section class="h-[500px] relative overflow-hidden bg-ar-off-white border-y border-ar-border">
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.16104033835!2d36.8396000!3d-1.3031000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f11187429188d%3A0xe546b5a1532f831!2sMombasa%20Road%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1718370000000!5m2!1sen!2ske" 
        class="absolute inset-0 w-full h-full grayscale hover:grayscale-0 transition-all duration-700" 
        style="border:0;" 
        allowfullscreen="true" 
        loading="lazy" 
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </section>
  </div>
</template>
