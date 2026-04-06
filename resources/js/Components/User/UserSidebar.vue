<script setup lang="ts">
import { Link, router, usePage } from '@inertiajs/vue3';
import { computed } from 'vue';
import { dashboard, habits, calendar, settings } from '@/routes/user';
import { logout as logoutRoute } from '@/actions/App/Http/Controllers/Auth/LoginController';
import type { SharedProps } from '@/types/global';

const props = defineProps<{
    activePage: string;
}>();

const page = usePage<SharedProps>();
const user = computed(() => page.props.auth.user);

function submitLogout() {
    router.post(logoutRoute.url());
}

const avatarUrl = computed(() => {
    const u = user.value;
    if (!u) return '';
    if (u.avatar) return `/storage/${u.avatar}`;
    const name = encodeURIComponent(`${u.firstname} ${u.lastname}`);
    return `https://ui-avatars.com/api/?name=${name}&background=random`;
});
</script>

<template>
    <nav class="sidebar">
        <div class="sidebar-header">
            <div class="logo">
                <img src="/UserSide/img/Logo.png" alt="Logo" />
            </div>
            <h1 class="app-name">MOMENTUM</h1>
        </div>

        <ul class="nav-menu">
            <li :class="['nav-item', { active: activePage === 'dashboard' }]">
                <Link
                    :href="dashboard.url()"
                    style="display: flex; align-items: center; color: inherit; text-decoration: none; width: 100%"
                >
                    <i class="fas fa-chart-line"></i>
                    <span>Dashboard</span>
                </Link>
            </li>
            <li :class="['nav-item', { active: activePage === 'habits' }]">
                <Link
                    :href="habits.url()"
                    style="display: flex; align-items: center; color: inherit; text-decoration: none; width: 100%"
                >
                    <i class="fas fa-list-check"></i>
                    <span>Habits</span>
                </Link>
            </li>
            <li :class="['nav-item', { active: activePage === 'calendar' }]">
                <Link
                    :href="calendar.url()"
                    style="display: flex; align-items: center; color: inherit; text-decoration: none; width: 100%"
                >
                    <i class="far fa-calendar"></i>
                    <span>Calendar</span>
                </Link>
            </li>
            <li :class="['nav-item', { active: activePage === 'settings' }]">
                <Link
                    :href="settings.url()"
                    style="display: flex; align-items: center; color: inherit; text-decoration: none; width: 100%"
                >
                    <i class="fas fa-gear"></i>
                    <span>Settings</span>
                </Link>
            </li>
        </ul>

        <div v-if="user" class="user-profile">
            <Link :href="settings.url()" class="user-profile-link" title="Go to Settings">
                <img :src="avatarUrl" alt="User Avatar" class="avatar" />
                <div class="user-info">
                    <div class="user-name">{{ user.firstname }} {{ user.lastname }}</div>
                    <div class="user-role">{{ user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : '' }}</div>
                </div>
                <i class="fas fa-chevron-right profile-arrow"></i>
            </Link>
            <form @submit.prevent="submitLogout">
                <button type="submit" title="logout" class="logout-btn">
                    <i class="fa-solid fa-arrow-right-from-bracket"></i>
                </button>
            </form>
        </div>
    </nav>
</template>
