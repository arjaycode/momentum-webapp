<template>
  <Head title="Habit Categories - Momentum" />

  <AdminLayout 
    activeLink="habits" 
    pageTitle="Habit Category Management" 
    pageDescription="Manage and organize your platform's habit categories"
  >
    <div class="space-y-6">
      
      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Total Categories -->
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition-shadow">
          <div>
            <div class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Total Categories</div>
            <div class="text-3xl font-bold text-gray-900">{{ categories.length }}</div>
          </div>
          <div class="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center transform group-hover:scale-110 transition-transform">
            <i class="fas fa-layer-group text-2xl"></i>
          </div>
        </div>

        <!-- Active Categories -->
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition-shadow">
          <div>
            <div class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Active</div>
            <div class="text-3xl font-bold text-gray-900">{{ categories.filter(c => c.status === 'active').length }}</div>
          </div>
          <div class="w-14 h-14 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center transform group-hover:scale-110 transition-transform">
            <i class="fas fa-check-circle text-2xl"></i>
          </div>
        </div>

        <!-- Inactive Categories -->
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition-shadow">
          <div>
            <div class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Inactive</div>
            <div class="text-3xl font-bold text-gray-900">{{ categories.filter(c => c.status === 'inactive').length }}</div>
          </div>
          <div class="w-14 h-14 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center transform group-hover:scale-110 transition-transform">
            <i class="fas fa-circle-xmark text-2xl"></i>
          </div>
        </div>
      </div>

      <!-- Main Content Block -->
      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col pt-2">
        <!-- Header & Actions -->
        <div class="p-6 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100">
          <div class="relative flex-1 max-w-md">
            <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input type="text" v-model="searchQuery" placeholder="Search categories..." class="w-full pl-11 pr-4 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
          </div>
          
          <div class="flex flex-col sm:flex-row gap-3">
            <select v-model="statusFilter" class="px-3 py-2 border border-gray-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none transition-all cursor-pointer text-gray-700">
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <Link :href="admin.habits.index().url" class="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors shrink-0">
              <i class="fas fa-list"></i> Manage Habits
            </Link>
            <Link :href="admin.habitManagement.create().url" class="inline-flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition-colors shrink-0">
              <i class="fas fa-plus"></i> Add Category
            </Link>
          </div>
        </div>

        <!-- Categories Grid -->
        <div class="p-6">
          <div v-if="filteredCategories.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div v-for="category in filteredCategories" :key="category.id" class="bg-gray-50 rounded-2xl p-5 border border-gray-100 hover:border-indigo-200 hover:shadow-md transition-all group flex flex-col h-full">
              
              <div class="flex items-start justify-between mb-4">
                <div :class="`w-12 h-12 rounded-xl flex items-center justify-center shrink-0`" :style="getIconStyle(category.color)">
                  <i :class="`fas fa-${category.icon || 'heart'} text-xl`"></i>
                </div>
                
                <div class="flex gap-2">
                  <Link :href="admin.habitManagement.edit(category.id).url" class="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors">
                    <i class="fas fa-edit"></i>
                  </Link>
                  <button @click="openDeleteModal(category)" class="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </div>

              <div class="flex-1">
                <h3 class="text-lg font-bold text-gray-900 mb-1">{{ category.title }}</h3>
                <p class="text-sm text-gray-500 line-clamp-2">{{ category.description || 'No description provided.' }}</p>
              </div>

              <div class="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                <div class="text-sm font-medium text-gray-600">
                  <i class="fas fa-chart-bar mr-1.5 opacity-50"></i>
                  {{ category.habits_count || 0 }} {{ (category.habits_count || 0) === 1 ? 'habit' : 'habits' }}
                </div>
                <span :class="[
                  'inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider',
                  category.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                ]">
                  {{ category.status }}
                </span>
              </div>

            </div>
          </div>
          
          <div v-else class="py-12 flex flex-col items-center justify-center text-gray-400">
            <i class="fas fa-search text-4xl mb-4 text-gray-300"></i>
            <p class="text-lg font-medium text-gray-900">No categories found</p>
            <p class="text-sm">Try adjusting your filters or search query.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Modal -->
    <Modal :show="showDeleteModal" @close="showDeleteModal = false" maxWidth="md">
      <div class="p-6">
        <div class="flex flex-col items-center text-center">
          <div class="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-4">
            <i class="fas fa-exclamation-triangle text-2xl"></i>
          </div>
          <h3 class="text-lg font-bold text-gray-900 mb-2">Delete Category?</h3>
          <p class="text-sm text-gray-500 mb-6">Are you sure you want to delete <span class="font-bold text-gray-700">{{ selectedCategory?.title }}</span>? This will NOT delete associated habits, but they will be orphaned. This action cannot be undone.</p>
          
          <div class="flex gap-3 w-full">
            <button @click="showDeleteModal = false" class="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <Link :href="admin.habitManagement.delete(selectedCategory?.id).url" method="delete" as="button" class="flex-1 px-4 py-2.5 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transition-colors" @success="showDeleteModal = false">
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
  categories: Array
});

const searchQuery = ref('');
const statusFilter = ref('');

const filteredCategories = computed(() => {
  return props.categories.filter(category => {
    const matchesSearch = category.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          (category.description && category.description.toLowerCase().includes(searchQuery.value.toLowerCase()));
    const matchesStatus = statusFilter.value === '' || category.status === statusFilter.value;
    return matchesSearch && matchesStatus;
  });
});

const showDeleteModal = ref(false);
const selectedCategory = ref(null);

const openDeleteModal = (category) => {
  selectedCategory.value = category;
  showDeleteModal.value = true;
};

// Map color classes
const getIconStyle = (colorName) => {
  const map = {
    'green': 'bg-emerald-100 text-emerald-600',
    'blue': 'bg-blue-100 text-blue-600',
    'purple': 'bg-purple-100 text-purple-600',
    'yellow': 'bg-amber-100 text-amber-600',
    'orange': 'bg-orange-100 text-orange-600',
    'red': 'bg-rose-100 text-rose-600',
  };
  return map[colorName] || 'bg-gray-200 text-gray-600';
};
</script>
