<template>
  <div class="min-h-screen flex flex-col font-body text-ar-text bg-white">
    <AppNav />
    <main class="flex-grow">
      <slot />
    </main>
    <AppFooter />
    <WhatsAppFAB />
    <AppScrollTop />
    <AppToast />
  </div>
</template>
