<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { Link, router, usePage } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import adminRoutes from '@/routes/admin';
import { edit as userEdit } from '@/routes/admin/user-management';

const props = defineProps<{
    totalUsers: number;
    totalActiveUsers: number;
    totalInactiveUsers: number;
    totalBlockedUsers: number;
    users: {
        id: number;
        firstname: string;
        lastname: string;
        email: string;
        role: string;
        status: string;
    }[];
}>();

const page = usePage();

let scriptEl: HTMLScriptElement | null = null;
onMounted(() => {
    scriptEl = document.createElement('script');
    scriptEl.src = '/AdminSide/js/user-management.js';
    document.body.appendChild(scriptEl);
});
onUnmounted(() => scriptEl?.remove());

function deleteUser(id: number) {
    if (!confirm('Delete this user?')) return;
    router.delete(`/admin/user-management/delete/${id}`);
}
</script>

<template>
    <AdminLayout
        title="User Management - Momentum"
        page-css="user-management.css"
        active="users"
        page-title="User Management"
        page-description="Manage users, roles, and permissions"
    >
        <main class="main-content">
            <div v-if="page.props.flash?.success" class="success-alert" style="margin: 16px">{{ page.props.flash.success }}</div>
            <div v-if="page.props.flash?.error" class="msg error" style="margin: 16px">{{ page.props.flash.error }}</div>

            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-header">
                        <div class="stat-info">
                            <span class="stat-label">Total Users</span>
                            <div class="stat-value">{{ props.totalUsers }}</div>
                        </div>
                        <div class="stat-icon blue"><i class="fas fa-users"></i></div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-header">
                        <div class="stat-info">
                            <span class="stat-label">Active Users</span>
                            <div class="stat-value">{{ props.totalActiveUsers }}</div>
                        </div>
                        <div class="stat-icon green"><i class="fas fa-user-check"></i></div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-header">
                        <div class="stat-info">
                            <span class="stat-label">Inactive Users</span>
                            <div class="stat-value">{{ props.totalInactiveUsers }}</div>
                        </div>
                        <div class="stat-icon orange"><i class="fas fa-user-plus"></i></div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-header">
                        <div class="stat-info">
                            <span class="stat-label">Blocked Users</span>
                            <div class="stat-value">{{ props.totalBlockedUsers }}</div>
                        </div>
                        <div class="stat-icon red"><i class="fas fa-user-times"></i></div>
                    </div>
                </div>
            </div>

            <div class="table-card">
                <div class="table-header">
                    <div class="table-title-section">
                        <h3 class="table-title">All Users</h3>
                        <p class="table-subtitle">Manage user accounts and permissions</p>
                    </div>
                    <button class="btn-primary" type="button">
                        <Link class="adduser" :href="adminRoutes.userManagement.create.url()">
                            <i class="fas fa-plus"></i> Add New User
                        </Link>
                    </button>
                </div>

                <div class="table-controls">
                    <div class="search-box-container">
                        <i class="fas fa-search"></i>
                        <input id="userSearch" type="text" placeholder="Search users..." />
                    </div>
                    <div class="filters">
                        <select id="roleFilter" class="filter-select">
                            <option value="">All Roles</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                        <select id="statusFilter" class="filter-select">
                            <option value="">All Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="blocked">Blocked</option>
                        </select>
                    </div>
                </div>

                <div class="table-wrapper">
                    <table class="user-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="u in props.users" :key="u.id">
                                <td>{{ u.firstname }} {{ u.lastname }}</td>
                                <td>{{ u.email }}</td>
                                <td>{{ u.role }}</td>
                                <td>{{ u.status }}</td>
                                <td>
                                    <Link :href="userEdit.url(u.id)" class="btn-sm">Edit</Link>
                                    <button type="button" class="btn-sm danger" @click="deleteUser(u.id)">Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    </AdminLayout>
</template>
