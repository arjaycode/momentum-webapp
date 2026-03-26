<template>
  <UserLayout>
    <Head :title="habit.name" />

    <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-5xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <Link :href="user.habits().url" class="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center mb-4">
          <i class="fas fa-arrow-left mr-1.5"></i> Back to Habits
        </Link>
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 class="text-2xl md:text-3xl text-gray-800 font-bold tracking-tight">{{ habit.name }}</h1>
            <p class="text-sm text-gray-500 mt-1 max-w-2xl">{{ habit.description || 'No description provided' }}</p>
            <div class="mt-2 text-xs font-medium text-gray-400">
               Target Days: <span class="text-gray-600">{{ Array.isArray(habit.target_days) ? habit.target_days.join(', ') : 'Everyday' }}</span>
            </div>
          </div>
          <div class="mt-4 sm:mt-0">
             <Link :href="user.habits.edit({ id: habit.id }).url" 
                class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                <i class="fas fa-pen-to-square mr-2"></i> Edit Habit
             </Link>
          </div>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <!-- Log Count -->
        <div class="flex flex-col bg-white shadow-sm rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Total Completions</h2>
            <div class="w-10 h-10 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center">
              <i class="fas fa-check-double text-lg"></i>
            </div>
          </div>
          <div class="text-4xl font-black text-gray-800">{{ logs.length }}</div>
        </div>
        
        <!-- Total Days (Age) -->
        <div class="flex flex-col bg-white shadow-sm rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Days Active</h2>
            <div class="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
              <i class="fas fa-calendar-alt text-lg"></i>
            </div>
          </div>
          <div class="text-4xl font-black text-gray-800">{{ totalDays }}</div>
        </div>

        <!-- Current Streak -->
        <div class="flex flex-col bg-white shadow-sm rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Current Streak</h2>
            <div class="w-10 h-10 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center">
              <i class="fas fa-fire text-lg"></i>
            </div>
          </div>
          <div class="text-4xl font-black text-gray-800">{{ streak }} <span class="text-base font-medium text-gray-500">days</span></div>
        </div>
      </div>

      <!-- Logs Map or Table -->
      <div class="bg-white shadow-sm rounded-2xl border border-gray-100 overflow-hidden mb-8">
        <div class="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
          <h2 class="text-lg font-bold text-gray-800">Recent Logs</h2>
        </div>
        
        <div v-if="logs && logs.length > 0" class="overflow-x-auto">
          <table class="w-full text-sm text-left">
            <thead class="text-xs text-gray-500 bg-gray-50/50 uppercase border-b border-gray-100">
              <tr>
                <th class="px-6 py-4 font-semibold">Date Completed</th>
                <th class="px-6 py-4 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="log in logs" :key="log.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 font-medium text-gray-900">
                  {{ new Date(log.completed_at).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}
                </td>
                <td class="px-6 py-4 text-right">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                     <i class="fas fa-check mr-1.5"></i> Logged
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else class="p-8 text-center text-gray-500">
          <div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
             <i class="fas fa-ghost text-2xl"></i>
          </div>
          <p class="font-medium text-gray-900">No logs yet</p>
          <p class="text-sm mt-1">Start tracking to see your progress here.</p>
        </div>
      </div>

    </div>
  </UserLayout>
</template>

<script setup>
import UserLayout from '@/Layouts/UserLayout.vue';
import { Head, Link } from '@inertiajs/vue3';
import user from '@/routes/user';

const props = defineProps({
  habit: Object,
  logs: Array,
  streak: Number,
  totalDays: Number,
  notes: Array,
});
</script>
