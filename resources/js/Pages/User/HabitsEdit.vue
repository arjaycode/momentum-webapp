<script setup lang="ts">
import { useForm, usePage } from '@inertiajs/vue3';
import UserLayout from '@/Layouts/UserLayout.vue';
import { update } from '@/routes/user/habits';
import type { Habit } from '@/types/models';

const props = defineProps<{
    habit: Habit & { category?: { title?: string; color?: string } | null; enable_push_notifications?: boolean };
    categories: { id: number; title: string }[];
    targetDays: string[];
    notes: { id: number; message: string }[];
}>();

const page = usePage();

const form = useForm({
    name: props.habit.name,
    category_id: props.habit.category_id ?? null,
    description: props.habit.description ?? '',
    enable_push_notifications: !!props.habit.enable_push_notifications,
    target_days: [...props.targetDays],
});

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function toggleDay(d: string) {
    const i = form.target_days.indexOf(d);
    if (i >= 0) form.target_days.splice(i, 1);
    else form.target_days.push(d);
}

function dayOn(d: string) {
    return form.target_days.includes(d);
}

function submit() {
    form.put(update.put(props.habit.id));
}
</script>

<template>
    <UserLayout
        :title="`Edit Habit: ${props.habit.name}`"
        page-css="habits.css"
        active-page="habits"
        page-title="Edit Habit"
        page-description="Modify your habit, according to your needs"
    >
        <div v-if="page.props.flash?.success" class="success-alert" style="margin: 20px">{{ page.props.flash.success }}</div>

        <form id="habitForm" @submit.prevent="submit">
            <div class="content-area">
                <div class="details-section">
                    <div class="form-group">
                        <label class="form-label">Habit Title</label>
                        <input v-model="form.name" type="text" class="form-input" required />
                        <span v-if="form.errors.name" style="color: #c00">{{ form.errors.name }}</span>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Habit Category</label>
                        <select v-model="form.category_id" class="form-input">
                            <option :value="null">Select Category (Optional)</option>
                            <option v-for="c in props.categories" :key="c.id" :value="c.id">{{ c.title }}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Description</label>
                        <textarea v-model="form.description" class="form-textarea"></textarea>
                    </div>
                    <div class="notification-section">
                        <div class="notification-header">
                            <div class="notification-icon">🔔</div>
                            <div class="notification-content">
                                <div class="notification-title">Push Notifications</div>
                            </div>
                            <label class="notification-toggle">
                                <input v-model="form.enable_push_notifications" type="checkbox" />
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="stats-panel">
                    <div class="days-selector">
                        <div class="form-label">Target Days</div>
                        <div class="days-grid">
                            <label
                                v-for="d in days"
                                :key="d"
                                class="day-circle"
                                :class="{ active: dayOn(d), inactive: !dayOn(d) }"
                                @click.prevent="toggleDay(d)"
                            >
                                <input type="checkbox" :checked="dayOn(d)" hidden />
                                <span class="day-initial">{{ d[0] }}</span>
                            </label>
                        </div>
                        <div class="days-info">{{ form.target_days.length }} days per week</div>
                    </div>
                </div>
            </div>
            <button type="submit" class="save-changes-btn" :disabled="form.processing">Save Changes</button>
        </form>
    </UserLayout>
</template>
