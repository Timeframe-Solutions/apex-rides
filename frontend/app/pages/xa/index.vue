<script setup lang="ts">
definePageMeta({
  middleware: [
    function (to, from) {
      return navigateTo('/xa/dashboard')
    },
  ],
})
</script>
