<template>
  <UserLayout>
    <Head title="Add Habit" />

    <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-4xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <Link :href="user.habits().url" class="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center mb-4">
          <i class="fas fa-arrow-left mr-1.5"></i> Back to Habits
        </Link>
        <h1 class="text-2xl md:text-3xl text-gray-800 font-bold tracking-tight">Create New Habit</h1>
      </div>

      <!-- Form Card -->
      <div class="bg-white shadow-sm rounded-2xl border border-gray-100 overflow-hidden">
        <form @submit.prevent="submit" class="p-6 sm:p-8">
          <div class="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-8">
            
            <div class="sm:col-span-4">
              <label for="name" class="block text-sm font-medium text-gray-700">Habit Name</label>
              <div class="mt-1 relative rounded-md shadow-sm">
                <input type="text" id="name" v-model="form.name" required
                  class="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-lg py-2.5 border outline-none px-3"
                  placeholder="e.g. Read 10 pages" />
              </div>
              <p v-if="form.errors.name" class="mt-2 text-sm text-red-600">{{ form.errors.name }}</p>
            </div>

            <div class="sm:col-span-6">
              <label for="description" class="block text-sm font-medium text-gray-700">Description (Optional)</label>
              <div class="mt-1">
                <textarea id="description" rows="3" v-model="form.description"
                  class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-lg p-3 outline-none"
                  placeholder="Briefly describe why you want to build this habit..."></textarea>
              </div>
              <p v-if="form.errors.description" class="mt-2 text-sm text-red-600">{{ form.errors.description }}</p>
            </div>

            <div class="sm:col-span-3">
              <label for="category_id" class="block text-sm font-medium text-gray-700">Category</label>
              <select id="category_id" v-model="form.category_id"
                class="mt-1 block w-full pl-3 pr-10 py-2.5 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-lg border">
                <option value="">Select a category</option>
                <option v-for="category in categories" :key="category.id" :value="category.id">
                  {{ category.title }}
                </option>
              </select>
              <p v-if="form.errors.category_id" class="mt-2 text-sm text-red-600">{{ form.errors.category_id }}</p>
            </div>

            <div class="sm:col-span-6">
              <label class="block text-sm font-medium text-gray-700 mb-3">Target Days</label>
              <div class="flex flex-wrap gap-2">
                <label v-for="day in availableDays" :key="day.value" class="cursor-pointer">
                  <input type="checkbox" :value="day.value" v-model="form.target_days" class="sr-only peer" />
                  <div class="px-4 py-2 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 bg-white peer-checked:bg-indigo-600 peer-checked:text-white peer-checked:border-indigo-600 hover:bg-gray-50 transition-colors">
                    {{ day.label }}
                  </div>
                </label>
              </div>
              <p v-if="form.errors.target_days" class="mt-2 text-sm text-red-600">{{ form.errors.target_days }}</p>
            </div>

          </div>

          <div class="pt-6 mt-8 border-t border-gray-100 flex justify-end space-x-3">
            <Link :href="user.habits().url" class="bg-white py-2.5 px-4 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Cancel
            </Link>
            <button type="submit" :disabled="form.processing"
              class="inline-flex justify-center py-2.5 px-6 border border-transparent shadow-sm text-sm font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors">
              <i v-if="form.processing" class="fas fa-spinner fa-spin mr-2 mt-0.5"></i>
              Save Habit
            </button>
          </div>
        </form>
      </div>

    </div>
  </UserLayout>
</template>

<script setup>
import UserLayout from '@/Layouts/UserLayout.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';
import user from '@/routes/user';

const props = defineProps({
  categories: Array,
  user_id: Number,
});

const availableDays = [
  { value: 'Mon', label: 'Mon' },
  { value: 'Tue', label: 'Tue' },
  { value: 'Wed', label: 'Wed' },
  { value: 'Thu', label: 'Thu' },
  { value: 'Fri', label: 'Fri' },
  { value: 'Sat', label: 'Sat' },
  { value: 'Sun', label: 'Sun' },
];

const form = useForm({
  user_id: props.user_id,
  name: '',
  description: '',
  category_id: '',
  target_days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
});

const submit = () => {
  form.post(user.habits.store().url);
};
</script>
