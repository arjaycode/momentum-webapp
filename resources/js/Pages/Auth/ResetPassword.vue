<template>
  <GuestLayout subtitle="Create a new secure password">
    <Head title="Reset Password" />

    <div class="bg-white py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border border-gray-100">
      
      <div v-if="$page.props.flash?.status || $page.props.flash?.success" class="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl relative" role="alert">
        <span class="block sm:inline">{{ $page.props.flash.status || $page.props.flash.success }}</span>
      </div>

      <div v-if="!token" class="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl relative text-sm" role="alert">
        Invalid or expired reset token. Please request a new link.
        <Link :href="passwordRouter.request().url" class="font-bold underline ml-1">Request new link</Link>
      </div>

      <form @submit.prevent="submit" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
          <div class="mt-1 relative rounded-md shadow-sm">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i class="fas fa-envelope text-gray-400"></i>
            </div>
            <input id="email" type="email" v-model="form.email" required readonly
              class="bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-lg py-2.5 border outline-none px-3" />
          </div>
          <p v-if="form.errors.email" class="mt-2 text-sm text-red-600">{{ form.errors.email }}</p>
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">New Password</label>
          <div class="mt-1 relative rounded-md shadow-sm">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i class="fas fa-lock text-gray-400"></i>
            </div>
            <input :type="showPassword ? 'text' : 'password'" id="password" v-model="form.password" required 
              :disabled="!token"
              class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-lg py-2.5 border outline-none px-3 disabled:bg-gray-100" 
              placeholder="Enter new password" />
            <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
              <button type="button" @click="showPassword = !showPassword" class="text-gray-400 hover:text-gray-500 focus:outline-none" :disabled="!token">
                <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </button>
            </div>
          </div>
          <p v-if="form.errors.password" class="mt-2 text-sm text-red-600">{{ form.errors.password }}</p>
        </div>

        <div>
           <label for="password_confirmation" class="block text-sm font-medium text-gray-700">Confirm Password</label>
          <div class="mt-1 relative rounded-md shadow-sm">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i class="fas fa-lock text-gray-400"></i>
            </div>
            <input :type="showPasswordConfirmation ? 'text' : 'password'" id="password_confirmation" v-model="form.password_confirmation" required 
              :disabled="!token"
              class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-lg py-2.5 border outline-none px-3 disabled:bg-gray-100" 
              placeholder="Confirm new password" />
            <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
              <button type="button" @click="showPasswordConfirmation = !showPasswordConfirmation" class="text-gray-400 hover:text-gray-500 focus:outline-none" :disabled="!token">
                <i :class="showPasswordConfirmation ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </button>
            </div>
          </div>
          <p v-if="form.errors.password_confirmation" class="mt-2 text-sm text-red-600">{{ form.errors.password_confirmation }}</p>
        </div>

        <div>
          <button type="submit" :disabled="form.processing || !token" class="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-50">
            Reset Password
          </button>
        </div>
      </form>
    </div>
  </GuestLayout>
</template>

<script setup>
import GuestLayout from '@/Layouts/GuestLayout.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';
import * as passwordRouter from '@/routes/password';
import { ref } from 'vue';

const props = defineProps({
  email: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

const showPassword = ref(false);
const showPasswordConfirmation = ref(false);

const form = useForm({
  token: props.token,
  email: props.email,
  password: '',
  password_confirmation: '',
});

const submit = () => {
  form.post(passwordRouter.update().url, {
    onFinish: () => form.reset('password', 'password_confirmation'),
  });
};
</script>
