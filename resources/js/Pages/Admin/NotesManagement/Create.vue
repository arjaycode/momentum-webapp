<template>
  <Head title="Add New Note - Momentum" />

  <AdminLayout 
    activeLink="notes" 
    pageTitle="Add New Note" 
    pageDescription="Create a new note for a user or specific habit"
  >
    <div class="max-w-3xl mx-auto">
      
      <!-- Back Button -->
      <div class="mb-6">
        <Link :href="admin.noteManagement.index().url" class="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
          <i class="fas fa-arrow-left"></i>
          Back to Notes Management
        </Link>
      </div>

      <!-- Form Card -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="p-6 md:p-8">
          
          <form @submit.prevent="submit" class="space-y-6">
            
            <div class="grid grid-cols-1 gap-6">
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- User Selection -->
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-1.5">For User <span class="text-red-500">*</span></label>
                  <select v-model="form.user_id" class="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" required>
                    <option value="" disabled>Select User</option>
                    <option v-for="user in users" :key="user.id" :value="user.id">
                      {{ user.firstname }} {{ user.lastname }} ({{ user.email }})
                    </option>
                  </select>
                  <div v-if="form.errors.user_id" class="text-sm text-red-600 mt-1">{{ form.errors.user_id }}</div>
                </div>

                <!-- Habit Selection -->
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-1.5">For Habit <span class="text-gray-400 font-normal ml-1">(Optional)</span></label>
                  <select v-model="form.habit_id" class="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors">
                    <option value="">Select Habit (Optional)</option>
                    <option v-for="habit in filteredHabits" :key="habit.id" :value="habit.id">
                      {{ habit.name }} {{ habit.category ? `(${habit.category.title})` : '' }}
                    </option>
                  </select>
                  <div v-if="form.errors.habit_id" class="text-sm text-red-600 mt-1">{{ form.errors.habit_id }}</div>
                </div>
              </div>

              <!-- Note Message -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1.5">Note Content <span class="text-red-500">*</span></label>
                <textarea v-model="form.message" rows="6" placeholder="Write your note here..." class="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" required></textarea>
                <div v-if="form.errors.message" class="text-sm text-red-600 mt-1">{{ form.errors.message }}</div>
              </div>

            </div>

            <!-- Form Actions -->
            <div class="pt-6 mt-6 border-t border-gray-100 flex items-center justify-end gap-4">
              <Link :href="admin.noteManagement.index().url" class="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors">
                Cancel
              </Link>
              <button type="submit" :disabled="form.processing" class="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-100 transition-all disabled:opacity-75">
                <i class="fas fa-plus"></i>
                Create Note
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { computed } from 'vue';
import { Head, Link, useForm } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import admin from '@/routes/admin';

const props = defineProps({
  users: Array,
  habits: Array
});

const form = useForm({
  user_id: '',
  habit_id: '',
  message: ''
});

// Filter habits to only show the ones belonging to the selected user (if a user is selected)
const filteredHabits = computed(() => {
  if (!form.user_id) return props.habits;
  return props.habits.filter(habit => habit.user_id === form.user_id);
});

const submit = () => {
  form.post(admin.noteManagement.store().url);
};
</script>
