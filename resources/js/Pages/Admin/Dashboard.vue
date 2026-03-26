<template>
  <Head title="Admin Dashboard - Momentum" />

  <AdminLayout 
    activeLink="dashboard" 
    pageTitle="Dashboard" 
    pageDescription="Monitor your platform's performance and user engagement"
  >
    <div class="space-y-6">
      
      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <!-- Total Users -->
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between group hover:shadow-md transition-shadow">
          <div class="flex items-start justify-between mb-4">
            <span class="text-sm font-semibold text-gray-500 uppercase tracking-wider">Total Users</span>
            <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center transform group-hover:scale-110 transition-transform">
              <i class="fas fa-users text-lg"></i>
            </div>
          </div>
          <div class="text-3xl font-bold text-gray-900">{{ users.length }}</div>
        </div>

        <!-- Created Habits -->
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between group hover:shadow-md transition-shadow">
          <div class="flex items-start justify-between mb-4">
            <span class="text-sm font-semibold text-gray-500 uppercase tracking-wider">Habits</span>
            <div class="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center transform group-hover:scale-110 transition-transform">
              <i class="fas fa-heart text-lg"></i>
            </div>
          </div>
          <div class="text-3xl font-bold text-gray-900">{{ habits.length.toLocaleString() }}</div>
        </div>

        <!-- Notes Created -->
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between group hover:shadow-md transition-shadow">
          <div class="flex items-start justify-between mb-4">
            <span class="text-sm font-semibold text-gray-500 uppercase tracking-wider">Notes Created</span>
            <div class="w-10 h-10 rounded-xl bg-yellow-50 text-yellow-600 flex items-center justify-center transform group-hover:scale-110 transition-transform">
              <i class="fas fa-sticky-note text-lg"></i>
            </div>
          </div>
          <div class="text-3xl font-bold text-gray-900">{{ notes.length.toLocaleString() }}</div>
        </div>

        <!-- Inactive Users -->
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between group hover:shadow-md transition-shadow">
          <div class="flex items-start justify-between mb-4">
            <span class="text-sm font-semibold text-gray-500 uppercase tracking-wider">Inactive Users</span>
            <div class="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center transform group-hover:scale-110 transition-transform">
              <i class="fas fa-user-slash text-lg"></i>
            </div>
          </div>
          <div class="text-3xl font-bold text-gray-900">{{ users.filter(u => u.status === 'inactive').length }}</div>
        </div>

        <!-- Banned Users -->
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between group hover:shadow-md transition-shadow">
          <div class="flex items-start justify-between mb-4">
            <span class="text-sm font-semibold text-gray-500 uppercase tracking-wider">Banned Users</span>
            <div class="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center transform group-hover:scale-110 transition-transform">
              <i class="fas fa-user-times text-lg"></i>
            </div>
          </div>
          <div class="text-3xl font-bold text-gray-900">{{ users.filter(u => u.status === 'blocked').length }}</div>
        </div>
      </div>

      <!-- Main Activity Area -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Popular Habits List -->
        <div class="lg:col-span-1 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col">
          <h3 class="text-lg font-bold text-gray-900 mb-6">Popular Habits</h3>
          
          <div class="flex-1 space-y-4">
            <template v-if="popularHabits.length > 0">
              <div v-for="(habit, idx) in popularHabits" :key="idx" class="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                <div :class="`w-12 h-12 rounded-xl flex items-center justify-center shrink-0`" :style="getIconStyle(habit.color)">
                  <i :class="`fas fa-${habit.icon} text-xl`"></i>
                </div>
                <div class="flex-1 min-w-0">
                  <h4 class="text-sm font-bold text-gray-900 truncate">{{ habit.name }}</h4>
                  <p class="text-xs text-gray-500">{{ habit.user_count.toLocaleString() }} {{ habit.user_count === 1 ? 'user' : 'users' }}</p>
                </div>
                <div class="text-right shrink-0">
                  <div class="text-sm font-bold text-indigo-600">{{ habit.completion_rate }}%</div>
                  <div class="text-[10px] text-gray-400 font-medium uppercase mt-0.5">Compl. Rate</div>
                </div>
              </div>
            </template>
            <div v-else class="flex flex-col items-center justify-center h-full text-gray-400">
              <i class="fas fa-heart text-4xl mb-3 text-gray-200"></i>
              <p class="text-sm font-medium">No habits formed yet</p>
            </div>
          </div>
        </div>

        <!-- Recent Users -->
        <div class="lg:col-span-1 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-bold text-gray-900">Recent Signups</h3>
            <Link :href="admin.userManagement.index().url" class="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">View All</Link>
          </div>

          <div class="flex-1 space-y-4">
            <template v-if="recentUsers.length > 0">
              <div v-for="user in recentUsers" :key="user.id" class="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                <div class="relative">
                  <img :src="user.avatar" :alt="user.name" class="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" />
                  <div :class="[
                    'absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white',
                    user.status === 'active' ? 'bg-green-500' : (user.status === 'inactive' ? 'bg-orange-500' : 'bg-red-500')
                  ]"></div>
                </div>
                <div class="flex-1 min-w-0">
                  <h4 class="text-sm font-bold text-gray-900 truncate">{{ user.name }}</h4>
                  <p class="text-xs text-gray-500">Joined {{ user.joined }}</p>
                </div>
              </div>
            </template>
            <div v-else class="flex flex-col items-center justify-center h-full text-gray-400">
              <i class="fas fa-users text-4xl mb-3 text-gray-200"></i>
              <p class="text-sm font-medium">No recent signups</p>
            </div>
          </div>
        </div>

        <!-- Notes Analytics -->
        <div class="lg:col-span-1 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col">
          <h3 class="text-lg font-bold text-gray-900 mb-6">Notes Analytics</h3>
          
          <div class="flex-1 flex flex-col justify-center space-y-6">
            <!-- Daily Notes Progress -->
            <div>
              <div class="flex justify-between text-sm mb-1.5">
                <span class="font-semibold text-gray-700">Daily Notes</span>
                <span class="font-bold text-indigo-600">{{ dailyNotes.toLocaleString() }}</span>
              </div>
              <div class="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                <div class="bg-indigo-500 h-2.5 rounded-full transition-all duration-500" :style="`width: ${Math.min(100, Math.round((dailyNotes / Math.max(1, notes.length)) * 100))}%`"></div>
              </div>
            </div>

            <!-- Habit Notes Progress -->
            <div>
              <div class="flex justify-between text-sm mb-1.5">
                <span class="font-semibold text-gray-700">Habit-Linked Notes</span>
                <span class="font-bold text-purple-600">{{ habitNotes.toLocaleString() }}</span>
              </div>
              <div class="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                <div class="bg-purple-500 h-2.5 rounded-full transition-all duration-500" :style="`width: ${Math.min(100, Math.round((habitNotes / Math.max(1, notes.length)) * 100))}%`"></div>
              </div>
            </div>

            <!-- Goal Notes Progress -->
            <div>
              <div class="flex justify-between text-sm mb-1.5">
                <span class="font-semibold text-gray-700">General Notes</span>
                <span class="font-bold text-emerald-500">{{ goalNotes.toLocaleString() }}</span>
              </div>
              <div class="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                <div class="bg-emerald-500 h-2.5 rounded-full transition-all duration-500" :style="`width: ${Math.min(100, Math.round((goalNotes / Math.max(1, notes.length)) * 100))}%`"></div>
              </div>
            </div>

            <div class="mt-8 p-4 bg-indigo-50/50 rounded-xl border border-indigo-100 flex items-center justify-between">
              <div>
                <p class="text-sm font-semibold text-gray-900">Notes with Habits</p>
                <p class="text-xs text-gray-500 font-medium mt-0.5">Overall percentage</p>
              </div>
              <div class="text-2xl font-bold tracking-tight text-indigo-600">{{ notesWithHabitsPercent }}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { Head, Link } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import admin from '@/routes/admin';

const props = defineProps({
  users: Array,
  habits: Array,
  notes: Array,
  popularHabits: Array,
  recentUsers: Array,
  notesWithHabitsPercent: Number,
  dailyNotes: Number,
  habitNotes: Number,
  goalNotes: Number,
  completionData: Array,
  labels: Array,
  activityData: Array,
  activityLabels: Array
});

// Helper for habit colors
const getIconStyle = (colorName) => {
  const map = {
    'green': 'bg-emerald-50 text-emerald-600',
    'blue': 'bg-blue-50 text-blue-600',
    'purple': 'bg-purple-50 text-purple-600',
    'yellow': 'bg-amber-50 text-amber-600',
    'orange': 'bg-orange-50 text-orange-600',
    'red': 'bg-rose-50 text-rose-600',
  };
  return map[colorName] || 'bg-indigo-50 text-indigo-600';
};
</script>
