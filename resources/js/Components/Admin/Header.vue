<template>
  <header class="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8 sticky top-0 z-40">
    <div class="flex flex-col">
      <h1 class="text-xl font-bold text-gray-800 tracking-tight" v-html="pageTitle"></h1>
      <p v-if="description" class="text-sm text-gray-500 mt-0.5" v-html="description"></p>
    </div>

    <div class="flex items-center gap-4">
      <div class="flex items-center gap-2 text-sm text-gray-600 font-medium px-4 py-1.5 bg-gray-50 rounded-full border border-gray-100 shadow-sm">
        <i class="far fa-calendar-alt text-indigo-500"></i>
        <span>{{ currentDate }}</span>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue';

defineProps({
  pageTitle: {
    type: String,
    default: 'Page Title'
  },
  description: {
    type: String,
    default: ''
  }
});

const currentDate = computed(() => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return new Date().toLocaleDateString('en-US', options);
});
</script>
