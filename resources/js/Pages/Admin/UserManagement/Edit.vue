<template>
  <Head title="Edit User - Momentum" />

  <AdminLayout 
    activeLink="users" 
    pageTitle="Edit User" 
    pageDescription="Update user information and permissions"
  >
    <div class="max-w-3xl mx-auto flex gap-6">
      
      <!-- Form Content -->
      <div class="flex-1 space-y-6">
        <!-- Back Button -->
        <div>
          <Link :href="admin.userManagement.index().url" class="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
            <i class="fas fa-arrow-left"></i>
            Back to User Management
          </Link>
        </div>

        <!-- Form Card -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-6 md:p-8">
          <form @submit.prevent="submit" class="space-y-6">
            
            <!-- User Profile Summary (Read Only Header) -->
            <div class="flex items-center gap-4 mb-8">
              <img :src="user.avatar ? '/storage/' + user.avatar : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.firstname + ' ' + user.lastname)}&background=random`" 
                   alt="Avatar" class="w-16 h-16 rounded-full border border-gray-100 shadow-sm" />
              <div>
                <h3 class="text-xl font-bold text-gray-900">{{ user.firstname }} {{ user.lastname }}</h3>
                <p class="text-sm text-gray-500">Member since {{ new Date(user.created_at).toLocaleDateString() }}</p>
              </div>
            </div>
            
            <!-- Name Fields -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1.5">First Name</label>
                <input type="text" v-model="form.firstname" class="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" required />
                <div v-if="form.errors.firstname" class="text-sm text-red-600 mt-1">{{ form.errors.firstname }}</div>
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1.5">Last Name</label>
                <input type="text" v-model="form.lastname" class="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" required />
                <div v-if="form.errors.lastname" class="text-sm text-red-600 mt-1">{{ form.errors.lastname }}</div>
              </div>
            </div>

            <!-- Email Address -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
              <input type="email" v-model="form.email" class="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" required />
              <div v-if="form.errors.email" class="text-sm text-red-600 mt-1">{{ form.errors.email }}</div>
            </div>

            <!-- Password -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">Change Password <span class="text-gray-400 font-normal ml-1">(Optional)</span></label>
              <div class="relative">
                <input type="password" v-model="form.password" placeholder="Leave blank to keep current password" class="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>
              <div v-if="form.errors.password" class="text-sm text-red-600 mt-1">{{ form.errors.password }}</div>
            </div>

            <!-- Role and Status -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1.5">Role</label>
                <select v-model="form.role" class="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" required>
                  <option value="" disabled>Select role</option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
                <div v-if="form.errors.role" class="text-sm text-red-600 mt-1">{{ form.errors.role }}</div>
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1.5">Status</label>
                <select v-model="form.status" class="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" required>
                  <option value="" disabled>Select status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="blocked">Blocked</option>
                </select>
                <div v-if="form.errors.status" class="text-sm text-red-600 mt-1">{{ form.errors.status }}</div>
              </div>
            </div>

            <!-- Form Actions -->
            <div class="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between gap-4">
              <Link :href="admin.userManagement.index().url" class="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors">
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
  user: Object
});

const form = useForm({
  firstname: props.user.firstname,
  lastname: props.user.lastname,
  email: props.user.email,
  password: '', // Optional
  role: props.user.role,
  status: props.user.status || 'active'
});

const submit = () => {
  form.put(admin.userManagement.edit.submit(props.user.id).url);
};
</script>
