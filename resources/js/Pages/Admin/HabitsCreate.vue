<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { Link, router, useForm } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import adminRoutes from '@/routes/admin';
import { store } from '@/actions/App/Http/Controllers/Admin/AdminHabitController';

defineProps<{
    categories: { id: number; title: string }[];
    users: { id: number; firstname: string; lastname: string; email: string }[];
}>();

const week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;

const form = useForm({
    user_id: '' as string | number,
    category_id: '' as string | number | '',
    name: '',
    description: '',
    enable_push_notifications: false,
    target_days: [] as string[],
});

function toggleDay(day: string) {
    const i = form.target_days.indexOf(day);
    if (i === -1) {
        form.target_days.push(day);
    } else {
        form.target_days.splice(i, 1);
    }
}

function isDayOn(day: string) {
    return form.target_days.includes(day);
}

function submit() {
    form
        .transform((data) => {
            const d: Record<string, unknown> = { ...data };
            if (!data.enable_push_notifications) {
                delete d.enable_push_notifications;
            }
            if (d.category_id === '') {
                d.category_id = null;
            }
            d.user_id = Number(d.user_id);
            if (d.category_id !== null && d.category_id !== '') {
                d.category_id = Number(d.category_id);
            }
            return d;
        })
        .post(store.post());
}

let scriptEl: HTMLScriptElement | null = null;
onMounted(() => {
    scriptEl = document.createElement('script');
    scriptEl.src = '/AdminSide/js/add_habit.js';
    document.body.appendChild(scriptEl);
});
onUnmounted(() => scriptEl?.remove());
</script>

<template>
    <AdminLayout
        title="Add New Habit - Momentum"
        page-css="add_habit.css"
        active="habits-management"
        page-title="Add New Habit"
        page-description="Create a new habit for a user"
    >
        <main class="main-content">
            <div class="back-section">
                <Link :href="adminRoutes.habits.index.url()" class="back-btn">
                    <i class="fas fa-arrow-left"></i>
                    Back to Habits Management
                </Link>
            </div>

            <div class="form-container">
                <form class="habit-form" @submit.prevent="submit">
                    <div class="form-group">
                        <label for="user_id">User <span class="required">*</span></label>
                        <select id="user_id" v-model="form.user_id" class="form-select" required>
                            <option value="">Select User</option>
                            <option v-for="u in users" :key="u.id" :value="u.id">
                                {{ u.firstname }} {{ u.lastname }} ({{ u.email }})
                            </option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="name">Habit Name <span class="required">*</span></label>
                        <input
                            id="name"
                            v-model="form.name"
                            type="text"
                            class="form-input"
                            required
                        />
                    </div>
                    <div class="form-group">
                        <label for="category_id">Category</label>
                        <select id="category_id" v-model="form.category_id" class="form-select">
                            <option value="">Select Category (Optional)</option>
                            <option v-for="c in categories" :key="c.id" :value="c.id">
                                {{ c.title }}
                            </option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="description">Description</label>
                        <textarea
                            id="description"
                            v-model="form.description"
                            rows="5"
                            class="form-textarea"
                        />
                    </div>
                    <div class="form-group">
                        <label>Target Days <span class="required">*</span></label>
                        <div class="days-selector">
                            <div class="days-grid">
                                <label
                                    v-for="day in week"
                                    :key="day"
                                    class="day-circle"
                                    :class="isDayOn(day) ? 'active' : 'inactive'"
                                >
                                    <input
                                        type="checkbox"
                                        :checked="isDayOn(day)"
                                        @change="toggleDay(day)"
                                    />
                                    <span class="day-initial">{{ day.charAt(0) }}</span>
                                </label>
                            </div>
                            <div class="day-label">
                                <span>Mon</span>
                                <span>Tue</span>
                                <span>Wed</span>
                                <span>Thu</span>
                                <span>Fri</span>
                                <span>Sat</span>
                                <span>Sun</span>
                            </div>
                            <div class="days-info">{{ form.target_days.length }} days per week</div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="checkbox-label">
                            <input
                                v-model="form.enable_push_notifications"
                                type="checkbox"
                                value="1"
                            />
                            <span>Enable Push Notifications</span>
                        </label>
                    </div>
                    <div class="form-actions">
                        <button
                            type="button"
                            class="btn-cancel"
                            @click="router.visit(adminRoutes.habits.index.url())"
                        >
                            Cancel
                        </button>
                        <button type="submit" class="btn-create" :disabled="form.processing">
                            <i class="fas fa-plus"></i>
                            Create Habit
                        </button>
                    </div>
                </form>
            </div>
        </main>
    </AdminLayout>
</template>
