<template>
  <nav class="w-64 bg-white border-r border-gray-200 h-screen fixed top-0 left-0 flex flex-col shadow-sm z-50 transition-all duration-300">
    <div class="h-20 flex items-center justify-center border-b border-gray-100 flex-col py-4 mt-2">
      <img src="/UserSide/img/Logo.png" alt="Momentum Logo" class="h-8 object-contain mb-2" />
      <h1 class="font-bold text-gray-800 tracking-wider text-sm">MOMENTUM</h1>
    </div>

    <ul class="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
      <li>
        <Link :href="user.dashboard().url" :class="['flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium', activePage === 'dashboard' ? 'bg-indigo-50 text-indigo-600 shadow-sm' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900']">
          <i class="fas fa-chart-line text-lg w-6 flex justify-center"></i>
          <span>Dashboard</span>
        </Link>
      </li>
      <li>
        <Link :href="user.habits().url" :class="['flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium', activePage === 'habits' ? 'bg-indigo-50 text-indigo-600 shadow-sm' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900']">
          <i class="fas fa-list-check text-lg w-6 flex justify-center"></i>
          <span>Habits</span>
        </Link>
      </li>
      <li>
        <Link :href="user.calendar().url" :class="['flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium', activePage === 'calendar' ? 'bg-indigo-50 text-indigo-600 shadow-sm' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900']">
          <i class="far fa-calendar text-lg w-6 flex justify-center"></i>
          <span>Calendar</span>
        </Link>
      </li>
      <li>
        <Link :href="user.settings().url" :class="['flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium', activePage === 'settings' ? 'bg-indigo-50 text-indigo-600 shadow-sm' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900']">
          <i class="fas fa-gear text-lg w-6 flex justify-center"></i>
          <span>Settings</span>
        </Link>
      </li>
    </ul>

    <div class="p-4 border-t border-gray-100 bg-gray-50/50">
      <div class="flex items-center justify-between bg-white p-3 rounded-xl shadow-sm border border-gray-100">
        <Link :href="user.settings().url" class="flex items-center gap-3 flex-1 min-w-0 group cursor-pointer">
          <img :src="$page.props.auth.user.avatar ? '/storage/' + $page.props.auth.user.avatar : 'https://ui-avatars.com/api/?name=' + encodeURIComponent($page.props.auth.user.firstname + ' ' + $page.props.auth.user.lastname) + '&background=random'" alt="User Avatar" class="w-10 h-10 rounded-full object-cover border-2 border-transparent group-hover:border-indigo-200 transition-colors" />
          <div class="flex-1 min-w-0">
            <div class="text-sm font-semibold text-gray-800 truncate">{{ $page.props.auth.user.firstname }} {{ $page.props.auth.user.lastname }}</div>
            <div class="text-xs text-gray-500 capitalize">{{ $page.props.auth.user.role }}</div>
          </div>
        </Link>
        
        <Link :href="logoutRoute().url" method="post" as="button" class="p-2 text-gray-400 hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors ml-2" title="Logout">
          <i class="fa-solid fa-arrow-right-from-bracket"></i>
        </Link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { Link } from '@inertiajs/vue3';
import user from '@/routes/user';
import { logout as logoutRoute } from '@/routes';

defineProps({
  activePage: {
    type: String,
    default: 'dashboard'
  }
});
</script>
