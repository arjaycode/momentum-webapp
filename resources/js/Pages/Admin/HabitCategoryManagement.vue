<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { Link, router } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import adminRoutes from '@/routes/admin';

defineProps<{
    categories: {
        id: number;
        title: string;
        status: string;
        habits_count?: number;
    }[];
}>();

let scriptEl: HTMLScriptElement | null = null;
onMounted(() => {
    scriptEl = document.createElement('script');
    scriptEl.src = '/AdminSide/js/habit-management.js';
    document.body.appendChild(scriptEl);
});
onUnmounted(() => scriptEl?.remove());

function del(id: number) {
    if (!confirm('Delete category?')) return;
    router.delete(adminRoutes.habitManagement.delete.url({ id }));
}
</script>

<template>
    <AdminLayout
        title="Habit Categories"
        page-css="habit-management.css"
        active="habits"
        page-title="Habit Categories"
        page-description="Manage habit categories"
    >
        <main class="main-content">
            <div style="margin: 16px">
                <Link :href="adminRoutes.habitManagement.create.url()" class="btn-primary"
                    >Add Category</Link
                >
            </div>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Habits</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="c in categories" :key="c.id">
                        <td>{{ c.title }}</td>
                        <td>{{ c.status }}</td>
                        <td>{{ c.habits_count ?? 0 }}</td>
                        <td>
                            <Link :href="adminRoutes.habitManagement.edit.url({ id: c.id })">Edit</Link>
                            <button type="button" @click="del(c.id)">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </main>
    </AdminLayout>
</template>
