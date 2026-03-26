<template>
  <GuestLayout subtitle="Lost your password? Let's get you back on track.">
    <Head title="Forgot Password" />

    <div class="bg-white py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border border-gray-100">
      <div v-if="$page.props.flash?.status || $page.props.flash?.success" class="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl relative" role="alert">
        <span class="block sm:inline">{{ $page.props.flash.status || $page.props.flash.success }}</span>
      </div>

      <div class="mb-6 text-sm text-gray-600 leading-relaxed">
        Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.
      </div>

      <form @submit.prevent="submit" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
          <div class="mt-1 relative rounded-md shadow-sm">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i class="fas fa-envelope text-gray-400"></i>
            </div>
            <input id="email" type="email" v-model="form.email" required autofocus
              class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-lg py-2.5 border outline-none px-3" 
              placeholder="Enter your email" />
          </div>
          <p v-if="form.errors.email" class="mt-2 text-sm text-red-600">{{ form.errors.email }}</p>
        </div>

        <div>
          <button type="submit" :disabled="form.processing" class="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-50">
            Send Reset Link
            <i class="fas fa-paper-plane ml-2"></i>
          </button>
        </div>
      </form>

      <div class="mt-6 text-center">
        <Link :href="user.signin().url" class="text-sm font-medium text-indigo-600 hover:text-indigo-500 flex items-center justify-center">
          <i class="fas fa-arrow-left mr-2"></i>
          Back to login
        </Link>
      </div>
    </div>
  </GuestLayout>
</template>

<script setup>
import GuestLayout from '@/Layouts/GuestLayout.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';
import user from '@/routes/user';
import * as passwordRouter from '@/routes/password';

const form = useForm({
  email: '',
});

const submit = () => {
  form.post(passwordRouter.email().url);
};
</script>
