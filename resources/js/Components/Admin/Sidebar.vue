<template>
  <aside class="w-64 bg-gray-900 text-white flex flex-col h-screen fixed top-0 left-0 shadow-xl transition-all duration-300 z-50">
    <div class="h-16 flex items-center px-6 border-b border-gray-800 bg-gray-900">
      <div class="flex items-center gap-3 text-indigo-400">
        <i class="fas fa-chart-line text-xl"></i>
        <span class="font-bold text-lg tracking-wider text-white">MOMENTUM</span>
      </div>
    </div>

    <nav class="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
      <Link :href="admin.dashboard().url" :class="['flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group', active === 'dashboard' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white']">
        <i :class="['fas fa-chart-line text-lg w-6 flex justify-center transition-colors', active === 'dashboard' ? 'text-indigo-200' : 'group-hover:text-indigo-400']"></i>
        <span class="font-medium">Dashboard</span>
      </Link>

      <Link :href="admin.userManagement.index().url" :class="['flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group', active === 'users' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white']">
        <i :class="['fas fa-users text-lg w-6 flex justify-center transition-colors', active === 'users' ? 'text-indigo-200' : 'group-hover:text-indigo-400']"></i>
        <span class="font-medium">Users</span>
      </Link>

      <Link :href="admin.habits.index().url" :class="['flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group', active === 'habits-management' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white']">
        <i :class="['fas fa-list-check text-lg w-6 flex justify-center transition-colors', active === 'habits-management' ? 'text-indigo-200' : 'group-hover:text-indigo-400']"></i>
        <span class="font-medium">Habits Management</span>
      </Link>

      <Link :href="admin.habitManagement.index().url" :class="['flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group', active === 'habits' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white']">
        <i :class="['fas fa-heart text-lg w-6 flex justify-center transition-colors', active === 'habits' ? 'text-indigo-200' : 'group-hover:text-indigo-400']"></i>
        <span class="font-medium">Habit Categories</span>
      </Link>

      <Link :href="admin.noteManagement.index().url" :class="['flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group', active === 'notes' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white']">
        <i :class="['fas fa-sticky-note text-lg w-6 flex justify-center transition-colors', active === 'notes' ? 'text-indigo-200' : 'group-hover:text-indigo-400']"></i>
        <span class="font-medium">Notes</span>
      </Link>

      <Link :href="admin.settings.show().url" :class="['flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group', active === 'settings' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white']">
        <i :class="['fas fa-cog text-lg w-6 flex justify-center transition-colors', active === 'settings' ? 'text-indigo-200' : 'group-hover:text-indigo-400']"></i>
        <span class="font-medium">Settings</span>
      </Link>

      <Link :href="logoutRoute().url" method="post" as="button" class="w-full text-left flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-colors group mt-2">
        <i class="fas fa-sign-out-alt text-lg w-6 flex justify-center group-hover:text-red-400 transition-colors"></i>
        <span class="font-medium">Logout</span>
      </Link>
    </nav>

    <div class="p-4 border-t border-gray-800">
      <Link :href="admin.settings.show().url" class="flex items-center gap-3 p-2 -mx-2 rounded-xl hover:bg-gray-800 transition-colors group">
        <img :src="$page.props.auth.user.avatar ? '/storage/' + $page.props.auth.user.avatar : 'https://ui-avatars.com/api/?name=' + encodeURIComponent($page.props.auth.user.firstname + ' ' + $page.props.auth.user.lastname) + '&background=random'" :alt="$page.props.auth.user.firstname" class="w-10 h-10 rounded-full object-cover border-2 border-transparent group-hover:border-indigo-500 transition-colors" />
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-white truncate">{{ $page.props.auth.user.firstname }} {{ $page.props.auth.user.lastname }}</p>
          <p class="text-xs text-gray-400 capitalize">{{ $page.props.auth.user.role }}</p>
        </div>
        <i class="fas fa-chevron-right text-gray-500 group-hover:text-white transition-colors text-sm"></i>
      </Link>
    </div>
  </aside>
</template>

<script setup>
import { Link } from '@inertiajs/vue3';
import admin from '@/routes/admin';
import { logout as logoutRoute } from '@/routes';

defineProps({
  active: {
    type: String,
    default: 'dashboard'
  }
});
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #374151;
  border-radius: 4px;
}
.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background: #4B5563;
}
</style>
