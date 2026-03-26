<template>
  <Head title="Create Habit - Momentum" />

  <AdminLayout 
    activeLink="habits" 
    pageTitle="Create New Habit" 
    pageDescription="Create a new habit and assign it to a user"
  >
    <div class="max-w-4xl mx-auto">
      
      <!-- Back Button -->
      <div class="mb-6">
        <Link :href="admin.habits.index().url" class="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
          <i class="fas fa-arrow-left"></i>
          Back to Habits Management
        </Link>
      </div>

      <!-- Form Card -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="p-6 md:p-8">
          
          <form @submit.prevent="submit" class="space-y-6">
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- User Selection -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1.5">User <span class="text-red-500">*</span></label>
                <select v-model="form.user_id" class="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" required>
                  <option value="" disabled>Select User</option>
                  <option v-for="user in users" :key="user.id" :value="user.id">
                    {{ user.firstname }} {{ user.lastname }} ({{ user.email }})
                  </option>
                </select>
                <div v-if="form.errors.user_id" class="text-sm text-red-600 mt-1">{{ form.errors.user_id }}</div>
              </div>

              <!-- Category -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1.5">Category <span class="text-gray-400 font-normal ml-1">(Optional)</span></label>
                <select v-model="form.category_id" class="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors">
                  <option value="">No Category</option>
                  <option v-for="category in categories" :key="category.id" :value="category.id">
                    {{ category.title }}
                  </option>
                </select>
                <div v-if="form.errors.category_id" class="text-sm text-red-600 mt-1">{{ form.errors.category_id }}</div>
              </div>

              <!-- Habit Name -->
              <div class="md:col-span-2">
                <label class="block text-sm font-semibold text-gray-700 mb-1.5">Habit Name <span class="text-red-500">*</span></label>
                <input type="text" v-model="form.name" placeholder="e.g., Morning Jog" class="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" required />
                <div v-if="form.errors.name" class="text-sm text-red-600 mt-1">{{ form.errors.name }}</div>
              </div>

              <!-- Description -->
              <div class="md:col-span-2">
                <label class="block text-sm font-semibold text-gray-700 mb-1.5">Description</label>
                <textarea v-model="form.description" rows="3" placeholder="Enter description..." class="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"></textarea>
                <div v-if="form.errors.description" class="text-sm text-red-600 mt-1">{{ form.errors.description }}</div>
              </div>

              <!-- Target Days -->
              <div class="md:col-span-2">
                <label class="block text-sm font-semibold text-gray-700 mb-2">Target Days <span class="text-red-500">*</span></label>
                <div class="flex flex-wrap gap-3">
                  <label v-for="day in ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']" :key="day" class="cursor-pointer">
                    <input type="checkbox" :value="day" v-model="form.target_days" class="hidden peer" />
                    <div class="w-12 h-12 rounded-xl border-2 flex items-center justify-center font-bold text-sm transition-colors peer-checked:bg-indigo-600 peer-checked:border-indigo-600 peer-checked:text-white border-gray-200 text-gray-400 hover:border-indigo-300">
                      {{ day.charAt(0) }}
                    </div>
                    <div class="text-center text-xs mt-1 text-gray-500 font-medium">{{ day }}</div>
                  </label>
                </div>
                <div class="mt-2 text-sm text-gray-500 font-medium flex items-center gap-2">
                  <i class="fas fa-calendar-check text-indigo-500"></i>
                  {{ form.target_days.length }} days per week
                </div>
                <div v-if="form.errors.target_days" class="text-sm text-red-600 mt-1">{{ form.errors.target_days }}</div>
              </div>

              <!-- Push Notifications -->
              <div class="md:col-span-2 mt-2">
                <label class="flex items-center gap-3 cursor-pointer p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
                  <input type="checkbox" v-model="form.enable_push_notifications" class="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                  <div>
                    <div class="text-sm font-semibold text-gray-900">Enable Push Notifications</div>
                    <div class="text-xs text-gray-500 mt-0.5">Send reminders for this habit</div>
                  </div>
                </label>
              </div>
            </div>

            <!-- Form Actions -->
            <div class="pt-6 mt-6 border-t border-gray-100 flex items-center justify-end gap-4">
              <Link :href="admin.habits.index().url" class="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors">
                Cancel
              </Link>
              <button type="submit" :disabled="form.processing || form.target_days.length === 0" class="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-100 transition-all disabled:opacity-75">
                <i class="fas fa-plus"></i>
                Create Habit
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import admin from '@/routes/admin';

const props = defineProps({
  users: Array,
  categories: Array
});

const form = useForm({
  user_id: '',
  name: '',
  category_id: '',
  description: '',
  target_days: [],
  enable_push_notifications: false
});

const submit = () => {
  form.post(admin.habits.store().url);
};
</script>
