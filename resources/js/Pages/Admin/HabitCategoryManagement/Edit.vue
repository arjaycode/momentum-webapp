<template>
  <Head title="Edit Habit Category - Momentum" />

  <AdminLayout 
    activeLink="habits" 
    pageTitle="Edit Habit Category" 
    pageDescription="Modify existing habit category details"
  >
    <div class="max-w-3xl mx-auto">
      
      <!-- Back Button -->
      <div class="mb-6">
        <Link :href="admin.habitManagement.index().url" class="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
          <i class="fas fa-arrow-left"></i>
          Back to Categories
        </Link>
      </div>

      <!-- Form Card -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="p-6 md:p-8">
          
          <form @submit.prevent="submit" class="space-y-6">
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="md:col-span-2">
                <label class="block text-sm font-semibold text-gray-700 mb-1.5">Category Title</label>
                <input type="text" v-model="form.title" class="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" required />
                <div v-if="form.errors.title" class="text-sm text-red-600 mt-1">{{ form.errors.title }}</div>
              </div>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">Description</label>
              <textarea v-model="form.description" rows="3" class="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"></textarea>
              <div v-if="form.errors.description" class="text-sm text-red-600 mt-1">{{ form.errors.description }}</div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1.5">Status</label>
                <select v-model="form.status" class="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" required>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <div v-if="form.errors.status" class="text-sm text-red-600 mt-1">{{ form.errors.status }}</div>
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1.5">Color Theme</label>
                <select v-model="form.color" class="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" required>
                  <option value="green">Emerald Green</option>
                  <option value="blue">Ocean Blue</option>
                  <option value="purple">Royal Purple</option>
                  <option value="yellow">Amber Yellow</option>
                  <option value="orange">Sunset Orange</option>
                  <option value="red">Rose Red</option>
                </select>
                <div v-if="form.errors.color" class="text-sm text-red-600 mt-1">{{ form.errors.color }}</div>
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1.5">Icon Class</label>
                <div class="relative">
                  <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <i :class="form.icon ? `fas fa-${form.icon}` : 'fas fa-icons'"></i>
                  </span>
                  <input type="text" v-model="form.icon" class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" required />
                </div>
                <div v-if="form.errors.icon" class="text-sm text-red-600 mt-1">{{ form.errors.icon }}</div>
                <p class="text-xs text-gray-400 mt-1.5 ml-1">FontAwesome solid name.</p>
              </div>
            </div>

            <!-- Form Actions -->
            <div class="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between gap-4">
              <Link :href="admin.habitManagement.index().url" class="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors">
                Cancel
              </Link>
              <button type="submit" :disabled="form.processing" class="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-100 transition-all disabled:opacity-75">
                <i class="fas fa-save"></i>
                Save Changes
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
  category: Object
});

const form = useForm({
  title: props.category.title,
  description: props.category.description,
  status: props.category.status,
  color: props.category.color,
  icon: props.category.icon
});

const submit = () => {
  form.patch(admin.habitManagement.edit.submit(props.category.id).url);
};
</script>
