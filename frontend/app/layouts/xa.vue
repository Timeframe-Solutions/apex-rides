<template>
  <div class="flex h-screen bg-ar-off-white overflow-hidden font-body">
    <!-- Sidebar -->
    <XaSidebar />

    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Topbar -->
      <XaTopbar />

      <!-- Main Content -->
      <main class="flex-1 overflow-y-auto p-6 lg:p-8">
        <slot />
      </main>
    </div>

    <!-- Admin Toasts -->
    <AppToast />
  </div>
</template>
