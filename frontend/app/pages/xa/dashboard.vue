<script setup lang="ts">
definePageMeta({ layout: 'xa' })

const stats = [
  { label: 'Total Vehicles', value: 24, icon: 'lucide:car', color: 'bg-blue-500' },
  { label: 'Available Now', value: 18, icon: 'lucide:check-circle', color: 'bg-ar-available' },
  { label: 'Total Inquiries', value: 142, icon: 'lucide:mail', color: 'bg-purple-500' },
  { label: 'New This Week', value: 12, icon: 'lucide:trending-up', color: 'bg-ar-yellow' },
]

const recentInquiries = [
  { id: '1', name: 'John Kariuki', vehicle: '2021 Toyota Corolla Cross', date: '2 mins ago', status: 'new' },
  { id: '2', name: 'James Mwangi', vehicle: 'General Inquiry', date: '45 mins ago', status: 'contacted' },
  { id: '3', name: 'Sarah Achieng', vehicle: '2019 Mitsubishi Pajero', date: '2 hours ago', status: 'new' },
]
</script>

<template>
  <div class="space-y-8">
    <!-- Stat Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <AppCard 
        v-for="stat in stats" 
        :key="stat.label" 
        padding="md"
        class="flex items-center gap-4"
      >
        <div :class="[stat.color, 'w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg']">
          <Icon :name="stat.icon" class="w-6 h-6" />
        </div>
        <div>
          <p class="text-xs text-ar-muted font-bold uppercase tracking-widest">{{ stat.label }}</p>
          <p class="text-3xl font-display font-extrabold text-ar-black">{{ stat.value }}</p>
        </div>
      </AppCard>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Recent Activity -->
      <div class="lg:col-span-2 space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="font-display font-bold text-xl text-ar-black">Recent Inquiries</h3>
          <NuxtLink to="/xa/inquiries" class="text-sm font-bold text-ar-yellow hover:underline">View All</NuxtLink>
        </div>
        
        <AppCard padding="none" class="overflow-hidden">
          <table class="w-full text-left border-collapse">
            <thead class="bg-ar-off-white text-[10px] font-bold uppercase tracking-widest text-ar-muted border-b border-ar-border">
              <tr>
                <th class="px-6 py-4">Customer</th>
                <th class="px-6 py-4">Vehicle / Subject</th>
                <th class="px-6 py-4">Received</th>
                <th class="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-ar-border">
              <tr v-for="iq in recentInquiries" :key="iq.id" class="hover:bg-ar-off-white transition-colors cursor-pointer">
                <td class="px-6 py-4">
                  <p class="font-bold text-ar-black text-sm">{{ iq.name }}</p>
                </td>
                <td class="px-6 py-4 text-sm text-ar-text">{{ iq.vehicle }}</td>
                <td class="px-6 py-4 text-xs text-ar-muted">{{ iq.date }}</td>
                <td class="px-6 py-4">
                  <span 
                    class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                    :class="iq.status === 'new' ? 'bg-ar-yellow/20 text-ar-yellow-dark' : 'bg-ar-available/20 text-ar-available'"
                  >
                    {{ iq.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </AppCard>
      </div>

      <!-- Quick Actions -->
      <div class="space-y-4">
        <h3 class="font-display font-bold text-xl text-ar-black">Quick Actions</h3>
        <AppCard class="space-y-3">
          <AppButton to="/xa/vehicles/new" block icon-left="lucide:plus">Add New Vehicle</AppButton>
          <AppButton to="/xa/content" variant="secondary" block icon-left="lucide:edit">Edit Home Copy</AppButton>
          <AppButton to="/xa/inquiries" variant="ghost" block class="!text-ar-black !border-ar-border" icon-left="lucide:mail">Manage Leads</AppButton>
        </AppCard>

        <div class="bg-ar-charcoal p-6 rounded-xl text-white">
          <h4 class="font-bold mb-2 flex items-center gap-2">
            <Icon name="lucide:info" class="text-ar-yellow w-5 h-5" />
            System Status
          </h4>
          <p class="text-xs text-white/60 leading-relaxed">
            All systems operational. Database last backed up 4 hours ago. Nuxt 4 Engine: v4.4.8.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
