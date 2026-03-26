<template>
  <UserLayout>
    <Head title="Settings" />

    <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-4xl mx-auto">
      
      <div v-if="$page.props.flash?.success" class="mb-8 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl relative flex items-center shadow-sm" role="alert">
        <i class="fas fa-check-circle text-green-500 mr-2 text-xl"></i>
        <span class="block sm:inline font-medium">{{ $page.props.flash.success }}</span>
      </div>

      <div class="mb-8">
        <h1 class="text-2xl md:text-3xl text-gray-800 font-bold tracking-tight">Account Settings ⚙️</h1>
        <p class="text-sm text-gray-500 mt-1">Manage your personal information and preferences.</p>
      </div>

      <div class="space-y-8">
        
        <!-- Profile Form -->
        <div class="bg-white shadow-sm rounded-2xl border border-gray-100 overflow-hidden">
          <div class="px-6 py-5 border-b border-gray-100">
            <h2 class="text-lg font-bold text-gray-800">Profile Information</h2>
          </div>
          <form @submit.prevent="updateProfile" class="p-6">
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label for="firstname" class="block text-sm font-medium text-gray-700">First Name</label>
                <input type="text" id="firstname" v-model="profileForm.firstname" required
                  class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-lg py-2.5 border outline-none px-3" />
                <p v-if="profileForm.errors.firstname" class="mt-2 text-sm text-red-600">{{ profileForm.errors.firstname }}</p>
              </div>
              <div>
                <label for="lastname" class="block text-sm font-medium text-gray-700">Last Name</label>
                <input type="text" id="lastname" v-model="profileForm.lastname" required
                  class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-lg py-2.5 border outline-none px-3" />
                <p v-if="profileForm.errors.lastname" class="mt-2 text-sm text-red-600">{{ profileForm.errors.lastname }}</p>
              </div>
              <div class="sm:col-span-2">
                <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
                <input type="email" id="email" v-model="profileForm.email" required 
                  class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-lg py-2.5 border outline-none px-3" />
                <p v-if="profileForm.errors.email" class="mt-2 text-sm text-red-600">{{ profileForm.errors.email }}</p>
              </div>
            </div>
            <div class="mt-6 flex justify-end">
              <button type="submit" :disabled="profileForm.processing"
                class="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors">
                <i v-if="profileForm.processing" class="fas fa-spinner fa-spin mr-2 mt-0.5"></i>
                Save Changes
              </button>
            </div>
          </form>
        </div>

        <!-- Password Update Form -->
        <div class="bg-white shadow-sm rounded-2xl border border-gray-100 overflow-hidden">
          <div class="px-6 py-5 border-b border-gray-100">
            <h2 class="text-lg font-bold text-gray-800">Change Password</h2>
          </div>
          <form @submit.prevent="updatePassword" class="p-6">
            <div class="grid grid-cols-1 gap-6">
              <div>
                <label for="current_password" class="block text-sm font-medium text-gray-700">Current Password</label>
                <input type="password" id="current_password" v-model="passwordForm.current_password" required
                  class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-lg py-2.5 border outline-none px-3" />
                <p v-if="passwordForm.errors.current_password" class="mt-2 text-sm text-red-600">{{ passwordForm.errors.current_password }}</p>
              </div>
              <div>
                <label for="password" class="block text-sm font-medium text-gray-700">New Password</label>
                <input type="password" id="password" v-model="passwordForm.password" required
                  class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-lg py-2.5 border outline-none px-3" />
                <p v-if="passwordForm.errors.password" class="mt-2 text-sm text-red-600">{{ passwordForm.errors.password }}</p>
              </div>
              <div>
                <label for="password_confirmation" class="block text-sm font-medium text-gray-700">Confirm New Password</label>
                <input type="password" id="password_confirmation" v-model="passwordForm.password_confirmation" required
                  class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-lg py-2.5 border outline-none px-3" />
              </div>
            </div>
            <div class="mt-6 flex justify-end">
              <button type="submit" :disabled="passwordForm.processing"
                class="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors">
                <i v-if="passwordForm.processing" class="fas fa-spinner fa-spin mr-2 mt-0.5"></i>
                Update Password
              </button>
            </div>
          </form>
        </div>
        
        <!-- Danger Zone -->
        <div class="bg-red-50 shadow-sm rounded-2xl border border-red-100 overflow-hidden">
          <div class="px-6 py-5 border-b border-red-200">
            <h2 class="text-lg font-bold text-red-800">Danger Zone</h2>
          </div>
          <div class="p-6">
            <p class="text-sm text-red-700 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
            <form @submit.prevent="deleteAccount" class="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <input type="password" v-model="deleteForm.password" required placeholder="Enter password to confirm"
                  class="focus:ring-red-500 focus:border-red-500 block w-full sm:max-w-xs sm:text-sm border-red-300 rounded-lg py-2.5 border outline-none px-3 bg-white" />
              <button type="submit" :disabled="deleteForm.processing"
                class="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-xl text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 transition-colors flex-shrink-0">
                <i v-if="deleteForm.processing" class="fas fa-spinner fa-spin mr-2 mt-0.5"></i>
                Delete Account
              </button>
            </form>
            <p v-if="deleteForm.errors.password" class="mt-2 text-sm text-red-600 font-medium">{{ deleteForm.errors.password }}</p>
          </div>
        </div>

      </div>

    </div>
  </UserLayout>
</template>

<script setup>
import UserLayout from '@/Layouts/UserLayout.vue';
import { Head, useForm } from '@inertiajs/vue3';
import user from '@/routes/user';

const props = defineProps({
  user: Object,
});

const profileForm = useForm({
  firstname: props.user.firstname,
  lastname: props.user.lastname,
  email: props.user.email,
});

const passwordForm = useForm({
  current_password: '',
  password: '',
  password_confirmation: '',
});

const deleteForm = useForm({
  password: '',
});

const updateProfile = () => {
  profileForm.put(user.profile.update().url);
};

const updatePassword = () => {
  passwordForm.put(user.profile.password().url, {
    preserveScroll: true,
    onSuccess: () => passwordForm.reset(),
  });
};

const deleteAccount = () => {
  if (confirm('Are you absolutely sure you want to delete your account? All habits and logs will be permanently deleted.')) {
    deleteForm.delete(user.profile.deleteMethod().url);
  }
};
</script>
