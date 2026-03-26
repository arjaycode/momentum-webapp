<template>
  <Head title="Habits Management - Momentum" />

  <AdminLayout 
    activeLink="habits" 
    pageTitle="Habits Management" 
    pageDescription="Manage all user habits across the platform"
  >
    <div class="space-y-6">
      
      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Total Habits -->
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition-shadow">
          <div>
            <div class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Total Habits</div>
            <div class="text-3xl font-bold text-gray-900">{{ habits.length }}</div>
          </div>
          <div class="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center transform group-hover:scale-110 transition-transform">
            <i class="fas fa-heart text-2xl"></i>
          </div>
        </div>

        <!-- Active Users (Users with habits) -->
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition-shadow">
          <div>
            <div class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Active Users</div>
            <div class="text-3xl font-bold text-gray-900">{{ new Set(habits.map(h => h.user_id)).size }}</div>
          </div>
          <div class="w-14 h-14 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center transform group-hover:scale-110 transition-transform">
            <i class="fas fa-users text-2xl"></i>
          </div>
        </div>

        <!-- Categories Used -->
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition-shadow">
          <div>
            <div class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Categories Used</div>
            <div class="text-3xl font-bold text-gray-900">{{ new Set(habits.filter(h => h.category_id).map(h => h.category_id)).size }}</div>
          </div>
          <div class="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center transform group-hover:scale-110 transition-transform">
            <i class="fas fa-layer-group text-2xl"></i>
          </div>
        </div>
      </div>

      <!-- Main Content Block -->
      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col pt-2">
        <!-- Header & Actions -->
        <div class="p-6 pb-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-gray-100">
          <div class="relative flex-1 max-w-md">
            <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input type="text" v-model="searchQuery" placeholder="Search habits..." class="w-full pl-11 pr-4 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
          </div>
          
          <div class="flex flex-col sm:flex-row gap-3">
            <select v-model="categoryFilter" class="px-3 py-2 border border-gray-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none transition-all cursor-pointer text-gray-700 min-w-[150px]">
              <option value="">All Categories</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.title }}</option>
            </select>
            
            <select v-model="userFilter" class="px-3 py-2 border border-gray-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none transition-all cursor-pointer text-gray-700 min-w-[150px]">
              <option value="">All Users</option>
              <option v-for="user in users" :key="user.id" :value="user.id">{{ user.firstname }} {{ user.lastname }}</option>
            </select>
            
            <Link :href="admin.habitManagement.index().url" class="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors shrink-0 tooltip-trigger" title="Manage Categories">
              <i class="fas fa-layer-group"></i> Categories
            </Link>
            <Link :href="admin.habits.create().url" class="inline-flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition-colors shrink-0">
              <i class="fas fa-plus"></i> Add Habit
            </Link>
          </div>
        </div>

        <!-- Habits Table -->
        <div class="overflow-x-auto">
          <table class="w-full text-left whitespace-nowrap">
            <thead>
              <tr class="bg-gray-50/50 text-xs font-semibold tracking-wide text-gray-500 uppercase border-b border-gray-100">
                <th class="px-6 py-4">Habit Name</th>
                <th class="px-6 py-4">User</th>
                <th class="px-6 py-4">Category</th>
                <th class="px-6 py-4 text-center">Target Days</th>
                <th class="px-6 py-4 text-center">Notifications</th>
                <th class="px-6 py-4 text-center">Created</th>
                <th class="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="habit in filteredHabits" :key="habit.id" class="hover:bg-gray-50/50 transition-colors group">
                <td class="px-6 py-4">
                  <div class="text-sm font-bold text-gray-900">{{ habit.name }}</div>
                  <div v-if="habit.description" class="text-xs text-gray-500 truncate max-w-[200px]">{{ habit.description }}</div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm font-bold text-gray-900" v-if="habit.user">{{ habit.user.firstname }} {{ habit.user.lastname }}</div>
                  <div class="text-xs text-gray-500" v-if="habit.user">{{ habit.user.email }}</div>
                </td>
                <td class="px-6 py-4">
                  <div v-if="habit.category" :class="[
                    'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider',
                    getCategoryBadgeClass(habit.category.color)
                  ]">
                    <i :class="`fas fa-${habit.category.icon || 'star'}`"></i>
                    {{ habit.category.title }}
                  </div>
                  <div v-else class="inline-flex items-center px-2.5 py-1 rounded-md bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-wider">
                    Uncategorized
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="flex items-center justify-center gap-1">
                    <span v-for="day in ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']" :key="day" :class="[
                      'w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold',
                      (habit.target_days || []).includes(day) ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-400'
                    ]">
                      {{ day.charAt(0) }}
                    </span>
                  </div>
                </td>
                <td class="px-6 py-4 text-center">
                  <span v-if="habit.enable_push_notifications" class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-green-50 text-green-700 text-xs font-bold uppercase tracking-wider border border-green-100">
                    <i class="fas fa-bell"></i> On
                  </span>
                  <span v-else class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-50 text-gray-600 text-xs font-bold uppercase tracking-wider border border-gray-200">
                    <i class="fas fa-bell-slash"></i> Off
                  </span>
                </td>
                <td class="px-6 py-4 text-center text-sm text-gray-500">
                  {{ new Date(habit.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }}
                </td>
                <td class="px-6 py-4 text-right space-x-2">
                  <Link :href="admin.habits.edit(habit.id).url" class="inline-flex items-center justify-center p-2 rounded-lg text-indigo-600 hover:bg-indigo-50 transition-colors">
                    <i class="fas fa-edit"></i>
                  </Link>
                  <button @click="openDeleteModal(habit)" class="inline-flex items-center justify-center p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors">
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
              <tr v-if="filteredHabits.length === 0">
                <td colspan="7" class="px-6 py-12 text-center text-gray-500">
                  <div class="flex flex-col items-center">
                    <i class="fas fa-heart text-3xl mb-3 text-gray-300"></i>
                    <p class="text-sm">No habits found matching your criteria</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Delete Modal -->
    <Modal :show="showDeleteModal" @close="showDeleteModal = false" maxWidth="md">
      <div class="p-6">
        <div class="flex flex-col items-center text-center">
          <div class="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-4">
            <i class="fas fa-trash-alt text-2xl"></i>
          </div>
          <h3 class="text-lg font-bold text-gray-900 mb-2">Delete Habit?</h3>
          <p class="text-sm text-gray-500 mb-6">Are you sure you want to delete <span class="font-bold text-gray-700">{{ selectedHabit?.name }}</span>? All associated notes and logs will be permanently deleted.</p>
          
          <div class="flex gap-3 w-full">
            <button @click="showDeleteModal = false" class="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <Link :href="admin.habits.destroy(selectedHabit?.id).url" method="delete" as="button" class="flex-1 px-4 py-2.5 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transition-colors" @success="showDeleteModal = false">
              Delete
            </Link>
          </div>
        </div>
      </div>
    </Modal>

  </AdminLayout>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Head, Link } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import Modal from '@/Components/Modal.vue';
import admin from '@/routes/admin';

const props = defineProps({
  habits: Array,
  categories: Array,
  users: Array
});

const searchQuery = ref('');
const categoryFilter = ref('');
const userFilter = ref('');

const filteredHabits = computed(() => {
  return props.habits.filter(habit => {
    const matchesSearch = habit.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          (habit.description && habit.description.toLowerCase().includes(searchQuery.value.toLowerCase()));
    const matchesCategory = categoryFilter.value === '' || habit.category_id == categoryFilter.value;
    const matchesUser = userFilter.value === '' || habit.user_id == userFilter.value;
    return matchesSearch && matchesCategory && matchesUser;
  });
});

const showDeleteModal = ref(false);
const selectedHabit = ref(null);

const openDeleteModal = (habit) => {
  selectedHabit.value = habit;
  showDeleteModal.value = true;
};

const getCategoryBadgeClass = (colorName) => {
  const map = {
    'green': 'bg-emerald-100 text-emerald-700 border border-emerald-200',
    'blue': 'bg-blue-100 text-blue-700 border border-blue-200',
    'purple': 'bg-purple-100 text-purple-700 border border-purple-200',
    'yellow': 'bg-amber-100 text-amber-700 border border-amber-200',
    'orange': 'bg-orange-100 text-orange-700 border border-orange-200',
    'red': 'bg-rose-100 text-rose-700 border border-rose-200',
  };
  return map[colorName] || 'bg-gray-100 text-gray-700 border border-gray-200';
};
</script>
