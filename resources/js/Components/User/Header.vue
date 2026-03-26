<template>
  <header class="bg-white border-b border-gray-200 h-20 flex items-center justify-between px-8 sticky top-0 z-40 shadow-sm">
    <div class="flex flex-col">
      <h1 class="text-2xl font-bold text-gray-800 tracking-tight">{{ pageTitle }}</h1>
      <p v-if="pageDescription" class="text-sm text-gray-500 mt-1">{{ pageDescription }}</p>
    </div>

    <div class="flex items-center gap-6">
      <!-- Notifications -->
      <div class="relative">
        <button 
          @click="toggleNotifications" 
          class="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <i class="fas fa-bell text-xl"></i>
          <span 
            v-if="unreadCount > 0" 
            class="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full translate-x-1/2 -translate-y-1/2"
          >
            {{ unreadCount > 99 ? '99+' : unreadCount }}
          </span>
        </button>

        <!-- Dropdown -->
        <div v-if="dropdownOpen" v-click-outside="closeDropdown" class="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50 transform origin-top-right transition-all">
          <div class="flex justify-between items-center p-4 border-b border-gray-100 bg-gray-50">
            <h3 class="font-bold text-gray-800">Notifications</h3>
            <button @click="clearNotifications" class="text-sm text-indigo-600 hover:text-indigo-800 font-medium transition-colors">Clear all</button>
          </div>

          <div class="max-h-80 overflow-y-auto custom-scrollbar">
            <template v-if="notifications.length > 0">
              <a 
                v-for="notif in notifications" 
                :key="notif.id"
                :href="notif.link || '#'"
                class="block p-4 border-b border-gray-50 hover:bg-indigo-50/50 transition-colors last:border-0"
              >
                <div class="flex gap-3 items-start">
                  <div class="w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0 shadow-sm" :style="{ backgroundColor: notif.color || '#6366f1' }">
                    <i :class="notif.icon || 'fas fa-check'"></i>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-semibold text-gray-800 mb-0.5" v-html="notif.title"></p>
                    <p class="text-xs text-gray-600 mb-1 leading-snug" v-html="notif.message"></p>
                    <p class="text-xs text-gray-400 font-medium">{{ notif.time }}</p>
                  </div>
                </div>
              </a>
            </template>
            <div v-else class="p-8 text-center flex flex-col items-center justify-center text-gray-400">
              <div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                <i class="fas fa-bell-slash text-2xl text-gray-300"></i>
              </div>
              <p class="font-medium text-sm">No new notifications</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Date -->
      <div class="hidden md:flex items-center gap-2 px-4 py-2 bg-indigo-50/50 text-indigo-700 rounded-lg border border-indigo-100/50 font-medium text-sm tracking-wide">
        <i class="far fa-calendar-alt"></i>
        <span>{{ currentDate }}</span>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import axios from 'axios';
import user from '@/routes/user';

/* Directives for Click Outside */
const vClickOutside = {
  mounted(el, binding) {
    el.clickOutsideEvent = (event) => {
      // Check if click was outside the element and its children
      // We also check if it's the toggle button to prevent immediate close on toggle
      const button = el.previousElementSibling;
      if (!(el === event.target || el.contains(event.target) || (button && button.contains(event.target)))) {
        binding.value();
      }
    };
    document.addEventListener("click", el.clickOutsideEvent);
  },
  unmounted(el) {
    document.removeEventListener("click", el.clickOutsideEvent);
  },
};

defineProps({
  pageTitle: {
    type: String,
    default: 'Dashboard'
  },
  pageDescription: {
    type: String,
    default: ''
  }
});

const dropdownOpen = ref(false);
const notifications = ref([]);
const unreadCount = ref(0);
let intervalId = null;

const currentDate = computed(() => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return new Date().toLocaleDateString('en-US', options);
});

const toggleNotifications = () => {
  dropdownOpen.value = !dropdownOpen.value;
  if (dropdownOpen.value) {
    loadNotifications();
  }
};

const closeDropdown = () => {
  dropdownOpen.value = false;
};

const updateBadgeCount = async () => {
  try {
    const response = await axios.get(user.notifications().url, {
      headers: { 'Accept': 'application/json' }
    });
    if (response.data) {
      unreadCount.value = response.data.unread_count || 0;
    }
  } catch (error) {
    console.error('Failed to update badge:', error);
  }
};

const loadNotifications = async () => {
  try {
    const response = await axios.get(user.notifications().url, {
      headers: { 'Accept': 'application/json' }
    });
    if (response.data && response.data.success) {
      notifications.value = response.data.notifications || [];
      unreadCount.value = response.data.unread_count || 0;
    } else {
      notifications.value = [];
    }
  } catch (error) {
    console.error('Failed to load notifications:', error);
    notifications.value = [];
  }
};

const clearNotifications = async () => {
  try {
    const response = await axios.post(user.notifications.clear().url, {}, {
      headers: { 'Accept': 'application/json' }
    });
    if (response.data && response.data.success) {
      notifications.value = [];
      unreadCount.value = 0;
    }
  } catch (error) {
    console.error('Failed to clear notifications:', error);
  }
};

onMounted(() => {
  updateBadgeCount();
  intervalId = setInterval(() => {
    if (!dropdownOpen.value) {
      updateBadgeCount();
    }
  }, 30000); // 30 seconds

  // expose refresh method
  window.refreshNotifications = updateBadgeCount;
});

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #E5E7EB;
  border-radius: 6px;
}
.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background: #D1D5DB;
}
</style>
