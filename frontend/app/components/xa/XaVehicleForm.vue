<script setup lang="ts">
import type { Vehicle } from '~/types'

interface Props {
  initial?: Partial<Vehicle>
  loading?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits(['submit', 'cancel'])

const form = reactive({
  title: '',
  slug: '',
  make: '',
  model: '',
  year: new Date().getFullYear(),
  price: 0,
  priceLabel: '',
  categoryId: 'suv', // Maps to bodyType
  status: 'available',
  featured: false,
  mileage: '',
  transmission: 'automatic',
  fuelType: 'petrol',
  engine: '',
  seats: 5,
  driveType: '2WD',
  colour: '', // Maps to color
  condition: 'used',
  description: '',
  features: [] as string[],
  images: [] as string[],
  ...props.initial
})

const categories = [
  { label: 'SUV', value: 'suv' },
  { label: 'Sedan', value: 'sedan' },
  { label: 'Pickup', value: 'pickup' },
  { label: 'Van', value: 'van' },
]

// --- Image Upload Logic ---
const fileInput = ref<HTMLInputElement | null>(null)
const uploadLoading = ref(false)

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement
  if (!target.files?.length) return

  uploadLoading.value = true
  
  // For demo: Convert files to Object URLs or Base64
  // In a real app, you would upload to server/S3 and get back URLs
  const newImages = Array.from(target.files).map(file => URL.createObjectURL(file))
  form.images = [...form.images, ...newImages]
  
  uploadLoading.value = false
  // Reset input
  target.value = ''
}

const removeImage = (index: number) => {
  form.images.splice(index, 1)
}

// --- Features Logic ---
const newFeature = ref('')
const addFeature = () => {
  if (newFeature.value && !form.features.includes(newFeature.value)) {
    form.features.push(newFeature.value)
    newFeature.value = ''
  }
}
const removeFeature = (f: string) => {
  form.features = form.features.filter(item => item !== f)
}

const handleSubmit = () => {
  form.price = Number(form.price)
  form.mileage = Number(form.mileage)
  form.priceLabel = `KSh ${form.price.toLocaleString()}`
  // Generate slug if empty
  if (!form.slug) {
    form.slug = form.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
  }
  emit('submit', { ...form })
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-8 max-w-5xl">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Main Info -->
      <AppCard class="lg:col-span-2 space-y-6">
        <h3 class="font-bold text-lg border-b border-ar-border pb-4">Basic Information</h3>
        <AppInput v-model="form.title" label="Listing Title" placeholder="e.g. 2021 Toyota Corolla Cross" required />
        
        <div class="grid grid-cols-2 gap-4">
          <AppInput v-model="form.make" label="Make" placeholder="Toyota" required />
          <AppInput v-model="form.model" label="Model" placeholder="Corolla Cross" required />
          <AppInput v-model="form.year" label="Year" type="number" required />
          <AppInput v-model="form.price" label="Price (KSh)" type="number" required />
        </div>

        <AppTextarea v-model="form.description" label="Description" :rows="6" required />
      </AppCard>

      <!-- Sidebar Info -->
      <div class="space-y-6">
        <AppCard class="space-y-6">
          <h3 class="font-bold text-lg border-b border-ar-border pb-4">Classification</h3>
          <AppSelect v-model="form.categoryId" label="Category / Body Type" :options="categories" required />
          <AppSelect v-model="form.status" label="Status" :options="[
            { label: 'Available', value: 'available' },
            { label: 'Reserved', value: 'reserved' },
            { label: 'Sold', value: 'sold' }
          ]" required />
          
          <div class="flex items-center gap-2 px-1">
            <input type="checkbox" v-model="form.featured" id="featured" class="w-4 h-4 accent-ar-yellow">
            <label for="featured" class="text-sm font-bold text-ar-black cursor-pointer">Featured Listing</label>
          </div>
        </AppCard>

        <!-- Image Upload Section -->
        <AppCard class="space-y-6">
          <h3 class="font-bold text-lg border-b border-ar-border pb-4">Images</h3>
          
          <!-- Upload Trigger -->
          <div 
            @click="triggerFileInput"
            class="group cursor-pointer text-center py-8 border-2 border-dashed border-ar-border hover:border-ar-yellow rounded-xl bg-ar-off-white hover:bg-ar-yellow/5 transition-all"
          >
            <Icon 
              name="lucide:image-plus" 
              class="w-10 h-10 text-ar-muted group-hover:text-ar-yellow mx-auto mb-2 transition-colors" 
            />
            <p class="text-sm font-bold text-ar-black">Add Vehicle Photos</p>
            <p class="text-[10px] text-ar-muted mt-1 px-4 uppercase tracking-wider">PNG, JPG, WEBP up to 5MB</p>
          </div>

          <input
            ref="fileInput"
            type="file"
            multiple
            accept="image/png, image/jpeg, image/jpg, image/webp"
            class="hidden"
            @change="handleFileChange"
          />

          <!-- Preview Grid -->
          <div v-if="form.images.length > 0" class="grid grid-cols-2 gap-3 pt-2">
            <div 
              v-for="(img, index) in form.images" 
              :key="index"
              class="relative aspect-[4/3] rounded-lg overflow-hidden border border-ar-border shadow-sm group"
            >
              <NuxtImg :src="img" class="w-full h-full object-cover" />
              <button 
                type="button"
                @click="removeImage(index)"
                class="absolute top-1.5 right-1.5 w-6 h-6 bg-ar-sold text-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Icon name="lucide:x" class="w-4 h-4" />
              </button>
            </div>
          </div>
        </AppCard>
      </div>
    </div>

    <!-- Technical Specs -->
    <AppCard class="space-y-6">
      <h3 class="font-bold text-lg border-b border-ar-border pb-4">Technical Specifications</h3>
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <AppInput v-model="form.mileage" label="Mileage (km)" />
        <AppSelect v-model="form.transmission" label="Transmission" :options="[{label:'Automatic',value:'automatic'},{label:'Manual',value:'manual'}]" />
        <AppSelect v-model="form.fuelType" label="Fuel Type" :options="[{label:'Petrol',value:'petrol'},{label:'Diesel',value:'diesel'},{label:'Hybrid',value:'hybrid'}]" />
        <AppInput v-model="form.engine" label="Engine Size" placeholder="e.g. 2.0L" />
        <AppInput v-model="form.seats" label="Seats" type="number" />
        <AppSelect v-model="form.driveType" label="Drive Type" :options="[{label:'2WD',value:'2WD'},{label:'4WD',value:'4WD'},{label:'AWD',value:'AWD'}]" />
        <AppInput v-model="form.colour" label="Exterior Colour" />
        <AppSelect v-model="form.condition" label="Condition" :options="[{label:'New',value:'new'},{label:'Used',value:'used'},{label:'Certified',value:'certified-pre-owned'}]" />
      </div>
    </AppCard>

    <!-- Features -->
    <AppCard class="space-y-6">
      <h3 class="font-bold text-lg border-b border-ar-border pb-4">Features & Extras</h3>
      <div class="flex flex-wrap gap-2 mb-4">
        <div 
          v-for="f in form.features" 
          :key="f"
          class="flex items-center gap-2 px-3 py-1 bg-ar-charcoal text-white rounded-full text-sm"
        >
          {{ f }}
          <button type="button" @click="removeFeature(f)" class="hover:text-ar-sold">
            <Icon name="lucide:x" class="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div class="flex gap-2 max-w-sm">
        <AppInput v-model="newFeature" placeholder="Add feature (e.g. Sunroof)" @keyup.enter="addFeature" />
        <AppButton type="button" variant="secondary" @click="addFeature">Add</AppButton>
      </div>
    </AppCard>

    <!-- Actions -->
    <div class="flex justify-end gap-4 pt-8 border-t border-ar-border">
      <AppButton type="button" variant="ghost" class="!text-ar-black" @click="$emit('cancel')">Cancel</AppButton>
      <AppButton type="submit" variant="primary" :loading="loading" class="px-12">
        {{ initial?.id ? 'Update Vehicle' : 'Create Vehicle' }}
      </AppButton>
    </div>
  </form>
</template>
