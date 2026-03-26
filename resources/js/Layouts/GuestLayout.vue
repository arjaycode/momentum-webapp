<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8 font-sans">
    <div class="sm:mx-auto sm:w-full sm:max-w-md mb-6">
      <div class="flex justify-center flex-col items-center">
        <!-- Replace with generic or app logo as needed -->
        <div class="h-16 w-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg mb-4">
          <i class="fas fa-chart-line text-white text-3xl"></i>
        </div>
        <h2 class="text-center text-3xl font-extrabold text-gray-900 tracking-tight">MOMENTUM</h2>
        <p class="mt-2 text-center text-sm text-gray-600" v-if="subtitle">
          {{ subtitle }}
        </p>
      </div>
    </div>

    <div class="sm:mx-auto sm:w-full sm:max-w-md w-full px-4 sm:px-0 relative z-10 text-gray-800">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  subtitle: {
    type: String,
    default: ''
  }
});
</script>
