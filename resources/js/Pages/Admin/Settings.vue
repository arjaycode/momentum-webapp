<template>
  <Head title="Admin Settings - Momentum" />

  <AdminLayout 
    activeLink="settings" 
    pageTitle="Admin Settings" 
    pageDescription="Manage your account and platform preferences"
  >
    <div class="max-w-6xl mx-auto space-y-6">
      
      <!-- Tabs -->
      <div class="flex gap-4 border-b border-gray-200">
        <button 
          @click="activeTab = 'profile'"
          :class="[
            'pb-4 px-2 text-sm font-medium transition-colors border-b-2',
            activeTab === 'profile' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          ]"
        >
          Profile
        </button>
        <button 
          @click="activeTab = 'password'"
          :class="[
            'pb-4 px-2 text-sm font-medium transition-colors border-b-2',
            activeTab === 'password' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          ]"
        >
          Password
        </button>
        <button 
          @click="activeTab = 'notifications'"
          :class="[
            'pb-4 px-2 text-sm font-medium transition-colors border-b-2',
            activeTab === 'notifications' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          ]"
        >
          Notifications
        </button>
      </div>

      <!-- Content -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        
        <transition name="fade" mode="out-in">
          <!-- Profile Tab -->
          <div v-if="activeTab === 'profile'" key="profile" class="space-y-8">
            <div class="flex flex-col md:flex-row gap-8">
              <!-- Left Column: Edit Form -->
              <div class="flex-1">
                <h3 class="text-lg font-bold text-gray-900 mb-6">Profile Information</h3>
                
                <div class="flex items-center gap-6 mb-8">
                  <div class="relative group">
                    <img :src="profileForm.avatar_url || (user.avatar ? '/storage/' + user.avatar : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.firstname + ' ' + user.lastname)}&background=random`)" 
                         alt="Avatar" class="w-24 h-24 rounded-full object-cover border-4 border-gray-50 shadow-sm" />
                    <label for="avatarInput" class="absolute inset-0 bg-black/50 text-white rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                      <i class="fas fa-camera text-xl mb-1"></i>
                      <span class="text-xs font-medium">Change</span>
                    </label>
                    <input type="file" id="avatarInput" accept="image/*" class="hidden" @change="handleAvatarUpload" />
                  </div>
                  <div>
                    <h4 class="text-xl font-bold text-gray-900">{{ user.firstname }} {{ user.lastname }}</h4>
                    <p class="text-sm text-gray-500">Administrator</p>
                  </div>
                </div>

                <form @submit.prevent="updateProfile" class="space-y-5">
                  <div class="grid grid-cols-2 gap-5">
                    <div>
                      <label class="block text-sm font-semibold text-gray-700 mb-1.5">First Name</label>
                      <input type="text" v-model="profileForm.firstname" class="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" required>
                      <div v-if="profileForm.errors.firstname" class="text-sm text-red-600 mt-1">{{ profileForm.errors.firstname }}</div>
                    </div>
                    <div>
                      <label class="block text-sm font-semibold text-gray-700 mb-1.5">Last Name</label>
                      <input type="text" v-model="profileForm.lastname" class="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" required>
                      <div v-if="profileForm.errors.lastname" class="text-sm text-red-600 mt-1">{{ profileForm.errors.lastname }}</div>
                    </div>
                  </div>

                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
                    <input type="email" v-model="profileForm.email" class="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" required>
                    <div v-if="profileForm.errors.email" class="text-sm text-red-600 mt-1">{{ profileForm.errors.email }}</div>
                  </div>

                  <div class="pt-4 flex justify-end gap-3">
                    <button type="submit" :disabled="profileForm.processing" class="px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-100 transition-all disabled:opacity-75">
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <!-- Password Tab -->
          <div v-else-if="activeTab === 'password'" key="password" class="max-w-2xl">
            <h3 class="text-lg font-bold text-gray-900 mb-6">Change Password</h3>
            
            <form @submit.prevent="updatePassword" class="space-y-5">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1.5">Current Password</label>
                <input type="password" v-model="passwordForm.current_password" class="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" required>
                <div v-if="passwordForm.errors.current_password" class="text-sm text-red-600 mt-1">{{ passwordForm.errors.current_password }}</div>
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1.5">New Password</label>
                <input type="password" v-model="passwordForm.password" class="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" required>
                <div v-if="passwordForm.errors.password" class="text-sm text-red-600 mt-1">{{ passwordForm.errors.password }}</div>
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1.5">Confirm New Password</label>
                <input type="password" v-model="passwordForm.password_confirmation" class="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" required>
              </div>

              <div class="pt-4 flex justify-end">
                <button type="submit" :disabled="passwordForm.processing" class="px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-100 transition-all disabled:opacity-75">
                  Update Password
                </button>
              </div>
            </form>
          </div>

          <!-- Notifications Tab -->
          <div v-else-if="activeTab === 'notifications'" key="notifications" class="max-w-2xl">
            <h3 class="text-lg font-bold text-gray-900 mb-6">Notification Timing</h3>

            <div v-if="notificationStatus" :class="`mb-4 p-4 rounded-xl text-sm ${notificationStatus.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`">
              {{ notificationStatus.message }}
            </div>

            <form @submit.prevent="updateNotifications" class="space-y-6">
              <div class="p-5 border border-indigo-100 bg-indigo-50/30 rounded-2xl">
                <div class="flex items-start gap-4">
                  <div class="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                    <i class="fas fa-clock text-lg"></i>
                  </div>
                  <div class="flex-1">
                    <label class="block text-sm font-bold text-gray-900 mb-1.5">Global Reminder Time (Daily Reminders)</label>
                    <p class="text-sm text-gray-500 mb-3">Habits without a specific time will use this.</p>
                    <input type="time" v-model="notificationForm.global_reminder_time" class="w-40 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" required>
                  </div>
                </div>
              </div>

              <div class="p-5 border border-gray-200 bg-gray-50/50 rounded-2xl">
                <div class="flex items-start gap-4">
                  <div class="w-10 h-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center shrink-0">
                    <i class="fas fa-moon text-lg"></i>
                  </div>
                  <div class="flex-1">
                    <label class="block text-sm font-bold text-gray-900 mb-1.5">Quiet Hours</label>
                    <p class="text-sm text-gray-500 mb-3">Silence all notifications during this period.</p>
                    <div class="flex items-center gap-3">
                      <input type="time" v-model="notificationForm.quiet_hours_start" class="w-32 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" required>
                      <span class="text-gray-500 font-medium">to</span>
                      <input type="time" v-model="notificationForm.quiet_hours_end" class="w-32 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" required>
                    </div>
                  </div>
                </div>
              </div>

              <div class="pt-4 flex justify-end">
                <button type="submit" :disabled="savingNotifications" class="px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-100 transition-all disabled:opacity-75">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </transition>

      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Head, useForm, usePage } from '@inertiajs/vue3';
import axios from 'axios';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import admin from '@/routes/admin';

const props = defineProps({
  user: Object
});

const activeTab = ref('profile');

// Forms
const profileForm = useForm({
  firstname: props.user.firstname,
  lastname: props.user.lastname,
  email: props.user.email,
  avatar_url: null
});

const passwordForm = useForm({
  current_password: '',
  password: '',
  password_confirmation: ''
});

// Notifications Form (using Axios directly because it uses API routes)
const notificationForm = ref({
  global_reminder_time: '09:00',
  quiet_hours_start: '22:00',
  quiet_hours_end: '07:00'
});
const savingNotifications = ref(false);
const notificationStatus = ref(null);

// Functions
const updateProfile = () => {
  profileForm.put(admin.settings.update().url, {
    preserveScroll: true,
  });
};

const handleAvatarUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  if (file.size > 2048 * 1024) {
    alert('File size must be less than 2MB');
    return;
  }

  const formData = new FormData();
  formData.append('avatar', file);

  try {
    const response = await axios.post(admin.settings.avatar().url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    if (response.data.success) {
      profileForm.avatar_url = response.data.avatar_url;
    }
  } catch (error) {
    console.error('Error uploading avatar', error);
  }
};

const updatePassword = () => {
  passwordForm.put(admin.settings.password().url, {
    preserveScroll: true,
    onSuccess: () => passwordForm.reset(),
  });
};

const loadNotifications = async () => {
  try {
    const response = await axios.get(admin.settings.notifications.get().url);
    if (response.data.success && response.data.settings) {
      notificationForm.value = { ...notificationForm.value, ...response.data.settings };
    }
  } catch (e) {
    console.error('Failed to load notification settings', e);
  }
};

const updateNotifications = async () => {
  savingNotifications.value = true;
  notificationStatus.value = null;
  try {
    const response = await axios.put(admin.settings.notifications.update().url, notificationForm.value);
    if (response.data.success) {
      notificationStatus.value = { type: 'success', message: 'Notification settings properly saved.' };
    } else {
      notificationStatus.value = { type: 'error', message: response.data.message || 'Error saving settings.' };
    }
  } catch (error) {
    notificationStatus.value = { type: 'error', message: 'An error occurred while saving.' };
  } finally {
    savingNotifications.value = false;
    setTimeout(() => { notificationStatus.value = null }, 3000);
  }
};

onMounted(() => {
  loadNotifications();
});

</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(5px);
}
</style>
