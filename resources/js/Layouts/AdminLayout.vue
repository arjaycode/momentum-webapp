<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Sidebar -->
    <Sidebar :active="activeLink" />

    <!-- Main Content wrapper -->
    <div class="flex-1 ml-64 flex flex-col min-h-screen">
      <!-- Header -->
      <Header :pageTitle="pageTitle" :description="pageDescription" />

      <!-- Page Content -->
      <main class="flex-1 p-8">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '@/Components/Admin/Sidebar.vue';
import Header from '@/Components/Admin/Header.vue';

defineProps({
  activeLink: {
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
