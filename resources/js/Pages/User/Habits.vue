<template>
  <UserLayout>
    <Head title="My Habits" />

    <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      
      <!-- Welcome Banner -->
      <div v-if="$page.props.flash?.success" class="mb-8 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl relative flex items-center shadow-sm" role="alert">
        <i class="fas fa-check-circle text-green-500 mr-2 text-xl"></i>
        <span class="block sm:inline font-medium">{{ $page.props.flash.success }}</span>
      </div>

      <!-- Header -->
      <div class="sm:flex sm:justify-between sm:items-center mb-8">
        <div class="mb-4 sm:mb-0">
          <h1 class="text-2xl md:text-3xl text-gray-800 font-bold tracking-tight">Habits 📝</h1>
          <p class="text-sm text-gray-500 mt-1">Create, Edit, Delete your habits.</p>
        </div>
        <div class="flex items-center space-x-3">
           <Link :href="user.habits.add().url" class="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl shadow-sm transition-colors border border-transparent">
             <i class="fas fa-plus mr-2"></i>
             New Habit
           </Link>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <!-- Card 1 -->
        <div class="flex flex-col bg-white shadow-sm rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
          <div class="flex justify-between items-center mb-2">
            <h2 class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Active Habits</h2>
            <div class="w-8 h-8 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center">
              <i class="fas fa-list text-sm"></i>
            </div>
          </div>
          <div class="text-3xl font-bold text-gray-800">{{ activeHabits || 0 }}</div>
        </div>
        
        <!-- Card 2 -->
        <div class="flex flex-col bg-white shadow-sm rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
          <div class="flex justify-between items-center mb-2">
            <h2 class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Current Streak</h2>
            <div class="w-8 h-8 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center">
              <i class="fas fa-fire text-sm"></i>
            </div>
          </div>
          <div class="text-3xl font-bold text-gray-800">{{ currentStreak || 0 }} <span class="text-sm font-medium text-gray-500">{{ currentStreak === 1 ? 'day' : 'days' }}</span></div>
        </div>
      </div>

      <!-- Habits Table -->
      <div class="bg-white shadow-sm rounded-2xl border border-gray-100 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left whitespace-nowrap">
            <thead class="text-xs text-slate-500 bg-slate-50/50 uppercase border-b border-gray-100">
              <tr>
                <th class="px-6 py-4 font-semibold">Habit</th>
                <th class="px-6 py-4 font-semibold">Category</th>
                <th class="px-6 py-4 font-semibold">Streak</th>
                <th class="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="habit in habits" :key="habit.id" class="hover:bg-gray-50 transition-colors">
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <div class="w-10 h-10 flex-shrink-0 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center ml-1">
                       <i class="fas fa-bullseye"></i>
                    </div>
                    <div class="ml-4">
                      <div class="font-medium text-gray-900">{{ habit.name }}</div>
                      <div class="text-xs text-gray-500 mt-0.5 max-w-xs truncate">{{ habit.description || 'No description' }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {{ habit.category ? habit.category.title : 'Uncategorized' }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <span class="inline-flex items-center font-medium" :class="(habit.streak || 0) > 0 ? 'text-orange-500' : 'text-gray-400'">
                    <i :class="(habit.streak || 0) > 0 ? 'fas fa-fire' : 'fas fa-snowflake'" class="mr-1.5"></i>
                    {{ habit.streak || 0 }}
                  </span>
                </td>
                <td class="px-6 py-4 text-right">
                  <div class="flex items-center justify-end space-x-2">
                    
                    <Link :href="user.habits.view({ id: habit.id }).url" 
                      class="inline-flex items-center px-2.5 py-1.5 border border-gray-200 rounded text-xs font-medium text-gray-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                      <i class="fas fa-expand mr-1.5"></i> View
                    </Link>
                    
                    <Link :href="user.habits.edit({ id: habit.id }).url" 
                      class="inline-flex items-center px-2.5 py-1.5 border border-gray-200 rounded text-xs font-medium text-gray-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                      <i class="fas fa-pen-to-square mr-1.5"></i> Edit
                    </Link>
                    
                    <button @click="confirmDelete(habit)" 
                      class="inline-flex items-center px-2.5 py-1.5 border border-red-200 rounded text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors">
                      <i class="fas fa-xmark mr-1.5"></i> Delete
                    </button>
                    
                    <!-- Mark As Done -->
                    <button v-if="habit.isCompletedToday" disabled
                      class="inline-flex items-center px-3 py-1.5 border border-transparent rounded text-xs font-medium text-white bg-emerald-500 opacity-80 cursor-default ml-2">
                       <i class="fas fa-check-circle mr-1.5"></i> Completed
                    </button>
                    <button v-else @click="markAsDone(habit.id)" :disabled="isMarking === habit.id"
                      class="inline-flex items-center px-3 py-1.5 border border-transparent rounded text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ml-2 disabled:opacity-50">
                      <i v-if="isMarking === habit.id" class="fas fa-spinner fa-spin mr-1.5"></i>
                      <i v-else class="fas fa-check mr-1.5 text-indigo-200"></i> Mark As Done
                    </button>
                    
                  </div>
                </td>
              </tr>
              <tr v-if="habits.length === 0">
                <td colspan="4" class="px-6 py-12 text-center text-gray-500">
                  <div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                    <i class="fas fa-clipboard-list text-2xl"></i>
                  </div>
                  <p class="text-sm font-medium text-gray-900 mb-1">No habits yet</p>
                  <p class="text-xs text-gray-500 mb-4">Create your first habit to get started!</p>
                  <Link :href="user.habits.add().url" class="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    Create Habit <i class="fas fa-arrow-right ml-1.5 text-xs"></i>
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
    </div>

    <!-- Delete Modal -->
    <div v-show="deleteModalOpen" class="fixed z-50 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        
        <!-- Background overlay -->
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="closeModal" aria-hidden="true"></div>

        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div class="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <i class="fas fa-exclamation-triangle text-red-600"></i>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">Delete Habit</h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">Are you sure you want to delete <span class="font-bold text-gray-800">"{{ habitToDelete?.name }}"</span>?</p>
                  <p class="text-xs text-gray-400 mt-2">This action will permanently remove the habit and its streak history.</p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse border-t border-gray-100">
            <button type="button" @click="deleteHabit" :disabled="isDeleting"
              class="w-full inline-flex justify-center rounded-xl border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm transition-colors disabled:opacity-50">
              <i v-if="isDeleting" class="fas fa-spinner fa-spin mr-2 mt-0.5"></i> Yes, Delete
            </button>
            <button type="button" @click="closeModal"
              class="mt-3 w-full inline-flex justify-center rounded-xl border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-colors">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>

  </UserLayout>
</template>

<script setup>
import UserLayout from '@/Layouts/UserLayout.vue';
import { Head, Link, router } from '@inertiajs/vue3';
import { ref } from 'vue';
import axios from 'axios';
import user from '@/routes/user';

const props = defineProps({
  habits: Array,
  activeHabits: Number,
  currentStreak: Number,
});

const isMarking = ref(null);
const isDeleting = ref(false);
const deleteModalOpen = ref(false);
const habitToDelete = ref(null);

const confirmDelete = (habit) => {
  habitToDelete.value = habit;
  deleteModalOpen.value = true;
};

const closeModal = () => {
  deleteModalOpen.value = false;
  setTimeout(() => { habitToDelete.value = null; }, 200);
};

const deleteHabit = () => {
  if (!habitToDelete.value) return;
  
  isDeleting.value = true;
  router.delete(user.habits.deleteMethod({ id: habitToDelete.value.id }).url, {
    preserveScroll: true,
    onSuccess: () => {
      closeModal();
      isDeleting.value = false;
    },
    onError: () => {
      isDeleting.value = false;
    }
  });
};

const markAsDone = async (habitId) => {
  isMarking.value = habitId;
  try {
    const res = await axios.post(`/user/habits/${habitId}/mark-done`);
    if (res.data.success) {
      router.reload({ only: ['habits', 'activeHabits', 'currentStreak'] });
    }
  } catch (error) {
    console.error('Error marking done:', error);
  } finally {
    isMarking.value = null;
  }
};
</script>
