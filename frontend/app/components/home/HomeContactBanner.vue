<script setup lang="ts">
const { generalLink } = useWhatsApp()
const config = useRuntimeConfig()
</script>

<template>
  <CallToAction
    title="Ready to Find Your Next Vehicle?"
    subtitle="Talk to us on WhatsApp or give us a call — we reply fast."
    :primary-cta="{
      label: 'WhatsApp Us',
      href: generalLink(),
      variant: 'whatsapp'
    }"
    :secondary-cta="{
      label: `Call ${config.public.phoneNumber}`,
      href: `tel:${config.public.phoneNumber}`,
      variant: 'ghost'
    }"
  />
</template>
