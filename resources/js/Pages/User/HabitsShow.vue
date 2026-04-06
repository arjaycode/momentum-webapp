<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';
import UserLayout from '@/Layouts/UserLayout.vue';
import { edit as habitsEdit } from '@/routes/user/habits';
import type { Habit } from '@/types/models';

const props = defineProps<{
    habit: Habit & { category?: { title?: string; color?: string } | null; enable_push_notifications?: boolean };
    logs: { completed_at: string }[];
    streak: number;
    totalDays: number;
    notes: { id: number; message: string; created_at?: string }[];
}>();

const page = usePage();

let scriptEl: HTMLScriptElement | null = null;
onMounted(() => {
    scriptEl = document.createElement('script');
    scriptEl.src = '/UserSide/js/habits_view.js';
    document.body.appendChild(scriptEl);
});
onUnmounted(() => scriptEl?.remove());
</script>

<template>
    <UserLayout
        :title="`View Habit: ${props.habit.name}`"
        page-css="habits.css"
        active-page="habits"
        page-title="View Habit"
        page-description="See your habit details and progress"
    >
        <div v-if="page.props.flash?.success" class="success-alert" style="margin: 20px">{{ page.props.flash.success }}</div>

        <div class="content-area" :data-habit-id="props.habit.id">
            <div class="details-section">
                <div class="form-group">
                    <label class="form-label">Habit Title</label>
                    <input type="text" class="form-input" :value="props.habit.name" readonly />
                </div>
                <div class="form-group">
                    <label class="form-label">Habit Category</label>
                    <input
                        type="text"
                        class="form-input"
                        readonly
                        :value="props.habit.category?.title ?? 'Uncategorized'"
                    />
                </div>
                <div class="form-group">
                    <label class="form-label">Description</label>
                    <textarea class="form-textarea" readonly>{{ props.habit.description || 'No description provided' }}</textarea>
                </div>
                <p style="margin: 12px 0">
                    <strong>Streak:</strong> {{ props.streak }} &nbsp; <strong>Total days logged:</strong>
                    {{ props.totalDays }}
                </p>
                <Link :href="habitsEdit.url(props.habit.id)" class="btn btn-edit">Edit habit</Link>
            </div>

            <div class="completion-history-section" style="margin-top: 30px">
                <h2 class="notes-title">Completion History</h2>
                <div v-if="props.logs?.length" class="logs-list" style="max-height: 300px; overflow-y: auto; margin-top: 15px">
                    <div
                        v-for="(log, i) in props.logs"
                        :key="i"
                        class="log-item"
                        style="padding: 12px; border-bottom: 1px solid #eee; display: flex; align-items: center; gap: 12px"
                    >
                        <div
                            style="
                                width: 40px;
                                height: 40px;
                                border-radius: 50%;
                                background: #10b981;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                color: white;
                                font-size: 18px;
                            "
                        >
                            <i class="fas fa-check"></i>
                        </div>
                        <div style="flex: 1">
                            <div style="font-weight: 600; font-size: 14px">Completed</div>
                            <div style="font-size: 12px; color: #666">{{ log.completed_at }}</div>
                        </div>
                    </div>
                </div>
                <div v-else style="text-align: center; padding: 40px 20px; color: #999">
                    <p>No completion history yet.</p>
                </div>
            </div>

            <div class="notes-section" style="margin-top: 30px">
                <h2 class="notes-title">Notes</h2>
                <div v-for="n in props.notes" :key="n.id" style="padding: 8px 0; border-bottom: 1px solid #eee">
                    {{ n.message }}
                </div>
            </div>
        </div>
    </UserLayout>
</template>
