<template>
  <div class="min-h-screen bg-gray-50 flex font-sans text-gray-900">
    <!-- Sidebar -->
    <Sidebar :activePage="activePage" />

    <!-- Main Content wrapper -->
    <div class="flex-1 ml-64 flex flex-col min-h-screen relative">
      <!-- Header -->
      <Header :pageTitle="pageTitle" :pageDescription="pageDescription" />

      <!-- Page Content -->
      <main class="flex-1 p-8 overflow-x-hidden">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '@/Components/User/Sidebar.vue';
import Header from '@/Components/User/Header.vue';

defineProps({
  activePage: {
    type: String,
    default: 'dashboard'
  },
  pageTitle: {
    type: String,
    default: 'Dashboard'
  },
  pageDescription: {
    type: String,
    default: ''
  }
});
</script>
