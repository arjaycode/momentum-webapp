<template>
  <GuestLayout subtitle="Start your habit-building journey today">
    <Head title="Create Account" />

    <div class="bg-white py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border border-gray-100">
      <form @submit.prevent="submit" class="space-y-6">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="firstname" class="block text-sm font-medium text-gray-700">First Name</label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <input id="firstname" type="text" v-model="form.firstname" required 
                class="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-lg py-2.5 border outline-none px-3" 
                placeholder="John" />
            </div>
            <p v-if="form.errors.firstname" class="mt-2 text-sm text-red-600">{{ form.errors.firstname }}</p>
          </div>

          <div>
            <label for="lastname" class="block text-sm font-medium text-gray-700">Last Name</label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <input id="lastname" type="text" v-model="form.lastname" required 
                class="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-lg py-2.5 border outline-none px-3" 
                placeholder="Doe" />
            </div>
            <p v-if="form.errors.lastname" class="mt-2 text-sm text-red-600">{{ form.errors.lastname }}</p>
          </div>
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
          <div class="mt-1 relative rounded-md shadow-sm">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i class="fas fa-envelope text-gray-400"></i>
            </div>
            <input id="email" type="email" v-model="form.email" required 
              class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-lg py-2.5 border outline-none px-3" 
              placeholder="john@example.com" />
          </div>
          <p v-if="form.errors.email" class="mt-2 text-sm text-red-600">{{ form.errors.email }}</p>
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <div class="mt-1 relative rounded-md shadow-sm">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i class="fas fa-lock text-gray-400"></i>
            </div>
            <input :type="showPassword ? 'text' : 'password'" id="password" v-model="form.password" required 
              class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-lg py-2.5 border outline-none px-3" 
              placeholder="Create a strong password" />
            <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
              <button type="button" @click="showPassword = !showPassword" class="text-gray-400 hover:text-gray-500 focus:outline-none">
                <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </button>
            </div>
          </div>
          <p class="mt-1 text-xs text-gray-500">Password should be at least 8 characters long</p>
          <p v-if="form.errors.password" class="mt-2 text-sm text-red-600">{{ form.errors.password }}</p>
        </div>

        <div>
          <button type="submit" :disabled="form.processing" class="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-50">
            Create Account
          </button>
        </div>
      </form>

      <div class="mt-6">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-gray-500"> Or continue with </span>
          </div>
        </div>

        <div class="mt-6">
          <a :href="google.auth().url" class="w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <svg class="h-5 w-5 mr-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Sign up with Google
          </a>
        </div>
      </div>

      <div class="mt-6 text-center text-sm">
        <span class="text-gray-600">Already have an account? </span>
        <Link :href="user.signin().url" class="font-medium text-indigo-600 hover:text-indigo-500">Sign in here</Link>
      </div>
    </div>
  </GuestLayout>
</template>

<script setup>
import GuestLayout from '@/Layouts/GuestLayout.vue';
import { Head, Link, useForm, usePage } from '@inertiajs/vue3';
import { ref } from 'vue';
import user from '@/routes/user';
import google from '@/routes/google';

const showPassword = ref(false);

const form = useForm({
  firstname: '',
  lastname: '',
  email: '',
  password: '',
});

const submit = () => {
  form.post(user.signup.submit().url, {
    onFinish: () => form.reset('password', 'password_confirmation'),
  });
};
</script>
