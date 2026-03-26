<template>
  <Head title="Create New User - Momentum" />

  <AdminLayout 
    activeLink="users" 
    pageTitle="Create New User" 
    pageDescription="Add a new user to the Momentum platform"
  >
    <div class="max-w-3xl mx-auto">
      
      <!-- Back Button -->
      <div class="mb-6">
        <Link :href="admin.userManagement.index().url" class="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
          <i class="fas fa-arrow-left"></i>
          Back to User Management
        </Link>
      </div>

      <!-- Form Card -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="p-6 md:p-8">
          
          <form @submit.prevent="submit" class="space-y-6">
            <!-- Name Fields -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1.5">First Name</label>
                <input type="text" v-model="form.firstname" placeholder="Enter first name" class="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" required />
                <div v-if="form.errors.firstname" class="text-sm text-red-600 mt-1">{{ form.errors.firstname }}</div>
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1.5">Last Name</label>
                <input type="text" v-model="form.lastname" placeholder="Enter last name" class="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" required />
                <div v-if="form.errors.lastname" class="text-sm text-red-600 mt-1">{{ form.errors.lastname }}</div>
              </div>
            </div>

            <!-- Email Address -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
              <input type="email" v-model="form.email" placeholder="Enter email address" class="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" required />
              <div v-if="form.errors.email" class="text-sm text-red-600 mt-1">{{ form.errors.email }}</div>
            </div>

            <!-- Password -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
                <div class="relative">
                  <input :type="showPassword ? 'text' : 'password'" v-model="form.password" placeholder="Enter password" class="w-full pl-4 pr-12 py-2.5 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" required />
                  <button type="button" @click="showPassword = !showPassword" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none">
                    <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                  </button>
                </div>
                <div v-if="form.errors.password" class="text-sm text-red-600 mt-1">{{ form.errors.password }}</div>
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1.5">Confirm Password</label>
                <div class="relative">
                  <input :type="showConfirmPassword ? 'text' : 'password'" v-model="form.password_confirmation" placeholder="Confirm password" class="w-full pl-4 pr-12 py-2.5 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" required />
                  <button type="button" @click="showConfirmPassword = !showConfirmPassword" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none">
                    <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                  </button>
                </div>
              </div>
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
            <div class="pt-6 mt-6 border-t border-gray-100 flex items-center justify-end gap-4">
              <Link :href="admin.userManagement.index().url" class="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors">
                Cancel
              </Link>
              <button type="submit" :disabled="form.processing" class="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-100 transition-all disabled:opacity-75">
                <i class="fas fa-plus"></i>
                Create User
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref } from 'vue';
import { Head, Link, useForm } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import admin from '@/routes/admin';

const showPassword = ref(false);
const showConfirmPassword = ref(false);

const form = useForm({
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  password_confirmation: '',
  role: '',
  status: ''
});

const submit = () => {
  if(form.password !== form.password_confirmation) {
    form.setError('password', 'Passwords do not match');
    return;
  }
  form.post(admin.userManagement.create.submit().url);
};
</script>
