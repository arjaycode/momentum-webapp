<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue';
import { Link, router } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import adminRoutes from '@/routes/admin';
import { destroy } from '@/actions/App/Http/Controllers/Admin/AdminHabitController';

type HabitRow = {
    id: number;
    name: string;
    description: string | null;
    user_id: number;
    category_id: number | null;
    target_days: string[] | null;
    enable_push_notifications: boolean;
    created_at: string;
    user: { firstname: string; lastname: string; email: string };
    category: { title: string; color: string; icon: string } | null;
};

const props = defineProps<{
    habits: HabitRow[];
    categories: { id: number; title: string }[];
    users: { id: number; firstname: string; lastname: string; email: string }[];
}>();

const dayLabels: Record<string, string> = {
    Mon: 'M',
    Tue: 'T',
    Wed: 'W',
    Thu: 'T',
    Fri: 'F',
    Sat: 'S',
    Sun: 'S',
};
const weekOrder = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const uniqueUsers = computed(() => new Set(props.habits.map((h) => h.user_id)).size);
const categoriesUsed = computed(
    () => new Set(props.habits.filter((h) => h.category_id).map((h) => h.category_id)).size,
);

let scriptEl: HTMLScriptElement | null = null;
onMounted(() => {
    scriptEl = document.createElement('script');
    scriptEl.src = '/AdminSide/js/habits-management.js';
    document.body.appendChild(scriptEl);
});
onUnmounted(() => scriptEl?.remove());

function del(id: number) {
    if (!confirm('Are you sure you want to delete this habit?')) return;
    router.delete(destroy.delete({ id }));
}
</script>

<template>
    <AdminLayout
        title="Habits Management - Momentum"
        page-css="habits-management.css"
        active="habits-management"
        page-title="Habits Management"
        page-description="Manage all user habits"
    >
        <main class="main-content">
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-info">
                        <span class="stat-label">Total Habits</span>
                        <div class="stat-value">{{ habits.length }}</div>
                    </div>
                    <div class="stat-icon blue">
                        <i class="fas fa-heart"></i>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-info">
                        <span class="stat-label">Active Users</span>
                        <div class="stat-value">{{ uniqueUsers }}</div>
                    </div>
                    <div class="stat-icon green">
                        <i class="fas fa-users"></i>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-info">
                        <span class="stat-label">Categories Used</span>
                        <div class="stat-value">{{ categoriesUsed }}</div>
                    </div>
                    <div class="stat-icon purple">
                        <i class="fas fa-layer-group"></i>
                    </div>
                </div>
            </div>

            <div class="controls-section">
                <div class="search-box-container">
                    <i class="fas fa-search"></i>
                    <input id="habitSearch" type="text" placeholder="Search habits..." />
                </div>
                <div class="controls-right">
                    <select id="categoryFilter" class="filter-select">
                        <option value="">All Categories</option>
                        <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                            {{ cat.title }}
                        </option>
                    </select>
                    <select id="userFilter" class="filter-select">
                        <option value="">All Users</option>
                        <option v-for="u in users" :key="u.id" :value="u.id">
                            {{ u.firstname }} {{ u.lastname }}
                        </option>
                    </select>
                    <Link :href="adminRoutes.habits.create.url()" class="btn-primary">
                        <i class="fas fa-plus"></i> Add Habit
                    </Link>
                </div>
            </div>

            <div class="table-container">
                <table class="habits-table">
                    <thead>
                        <tr>
                            <th>Habit Name</th>
                            <th>User</th>
                            <th>Category</th>
                            <th>Target Days</th>
                            <th>Notifications</th>
                            <th>Created</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="habitsTableBody">
                        <tr
                            v-for="habit in habits"
                            :key="habit.id"
                            :data-category-id="habit.category_id ?? ''"
                            :data-user-id="habit.user_id"
                        >
                            <td>
                                <div class="habit-name-cell">
                                    <strong>{{ habit.name }}</strong>
                                    <span v-if="habit.description" class="habit-description">{{
                                        habit.description.length > 50
                                            ? habit.description.slice(0, 50) + '…'
                                            : habit.description
                                    }}</span>
                                </div>
                            </td>
                            <td>
                                <div class="user-cell">
                                    <span>{{ habit.user.firstname }} {{ habit.user.lastname }}</span>
                                    <span class="user-email">{{ habit.user.email }}</span>
                                </div>
                            </td>
                            <td>
                                <span
                                    v-if="habit.category"
                                    class="category-badge"
                                    :style="{
                                        backgroundColor: `var(--${habit.category.color}-light)`,
                                        color: `var(--${habit.category.color}-dark)`,
                                    }"
                                >
                                    <i :class="'fas fa-' + habit.category.icon"></i>
                                    {{ habit.category.title }}
                                </span>
                                <span v-else class="category-badge">Uncategorized</span>
                            </td>
                            <td>
                                <div class="target-days">
                                    <span
                                        v-for="day in weekOrder"
                                        :key="day"
                                        class="day-badge"
                                        :class="
                                            (habit.target_days || []).includes(day) ? 'active' : 'inactive'
                                        "
                                    >
                                        {{ dayLabels[day] }}
                                    </span>
                                </div>
                            </td>
                            <td>
                                <span v-if="habit.enable_push_notifications" class="badge badge-success">
                                    <i class="fas fa-bell"></i> Enabled
                                </span>
                                <span v-else class="badge badge-secondary">
                                    <i class="fas fa-bell-slash"></i> Disabled
                                </span>
                            </td>
                            <td>{{ new Date(habit.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) }}</td>
                            <td>
                                <div class="action-buttons">
                                    <Link
                                        :href="adminRoutes.habits.edit.url({ id: habit.id })"
                                        class="action-btn edit-btn"
                                        title="Edit"
                                    >
                                        <i class="fas fa-edit"></i>
                                    </Link>
                                    <button
                                        type="button"
                                        class="action-btn delete-btn"
                                        title="Delete"
                                        @click="del(habit.id)"
                                    >
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div v-if="habits.length === 0" class="empty-state">
                    <i class="fas fa-heart"></i>
                    <p>No habits found</p>
                    <Link :href="adminRoutes.habits.create.url()" class="btn-primary">Add First Habit</Link>
                </div>
            </div>
        </main>
    </AdminLayout>
</template>
