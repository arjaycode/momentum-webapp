<script setup lang="ts">
import { Link, router, usePage } from '@inertiajs/vue3';
import { computed } from 'vue';
import adminRoutes from '@/routes/admin';
import { logout as logoutRoute } from '@/actions/App/Http/Controllers/Auth/LoginController';
import type { SharedProps } from '@/types/global';

defineProps<{
    active: string;
}>();

const page = usePage<SharedProps>();
const user = computed(() => page.props.auth.user);

const avatarUrl = computed(() => {
    const u = user.value;
    if (!u) return '';
    if (u.avatar) return `/storage/${u.avatar}`;
    const name = encodeURIComponent(`${u.firstname} ${u.lastname}`);
    return `https://ui-avatars.com/api/?name=${name}&background=random`;
});

function submitLogout() {
    router.post(logoutRoute.url());
}
</script>

<template>
    <aside class="sidebar">
        <div class="logo">
            <div class="logo-icon">
                <i class="fas fa-chart-line"></i>
            </div>
            <span class="logo-text">MOMENTUM</span>
        </div>

        <nav class="nav-menu">
            <Link
                :href="adminRoutes.dashboard.url()"
                :class="['nav-item', { active: active === 'dashboard' }]"
            >
                <i class="fas fa-chart-line"></i>
                <span>Dashboard</span>
            </Link>

            <Link
                :href="adminRoutes.userManagement.url()"
                :class="['nav-item', { active: active === 'users' }]"
            >
                <i class="fas fa-users"></i>
                <span>Users</span>
            </Link>

            <Link
                :href="adminRoutes.habits.index.url()"
                :class="['nav-item', { active: active === 'habits-management' }]"
            >
                <i class="fas fa-list-check"></i>
                <span>Habits Management</span>
            </Link>

            <Link
                :href="adminRoutes.habitManagement.url()"
                :class="['nav-item', { active: active === 'habits' }]"
            >
                <i class="fas fa-heart"></i>
                <span>Habit Categories</span>
            </Link>

            <Link
                :href="adminRoutes.noteManagement.url()"
                :class="['nav-item', { active: active === 'notes' }]"
            >
                <i class="fas fa-sticky-note"></i>
                <span>Notes</span>
            </Link>

            <Link
                :href="adminRoutes.settings.url()"
                :class="['nav-item', { active: active === 'settings' }]"
            >
                <i class="fas fa-cog"></i>
                <span>Settings</span>
            </Link>

            <form class="nav-item" @submit.prevent="submitLogout">
                <button type="submit" class="logout-btn">
                    <i class="fas fa-sign-out-alt"></i>
                    <span>Logout</span>
                </button>
            </form>
        </nav>

        <Link
            v-if="user"
            :href="adminRoutes.settings.url()"
            class="user-profile"
            title="Go to Settings"
        >
            <img :src="avatarUrl" :alt="user.firstname" class="profile-img" />
            <div class="profile-info">
                <div class="profile-name">{{ user.firstname }} {{ user.lastname }}</div>
                <div class="profile-role">{{ user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : '' }}</div>
            </div>
            <i class="fas fa-chevron-right profile-arrow"></i>
        </Link>
    </aside>
</template>
