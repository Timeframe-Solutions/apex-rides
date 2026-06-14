<template>
  <div class="min-h-screen flex flex-col font-body bg-white">
    <main class="flex-grow">
      <slot />
    </main>
    <footer class="py-8 bg-ar-off-white text-center">
      <div class="max-w-7xl mx-auto px-6">
        <p class="text-sm text-ar-muted">
          © {{ new Date().getFullYear() }} Apex Rides Nairobi | Privacy Policy
        </p>
      </div>
    </footer>
  </div>
</template>
