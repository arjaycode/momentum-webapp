<script setup lang="ts">
import { computed, onMounted } from 'vue';
import AdminLayout from '@/Layouts/AdminLayout.vue';

const props = defineProps<{
    users: { status?: string }[];
    habits: unknown[];
    notes: unknown[];
    popularHabits: {
        name: string;
        user_count: number;
        completion_rate: number;
        icon: string;
        color: string;
    }[];
    recentUsers: { name: string; avatar: string; joined: string; status: string }[];
    notesWithHabitsPercent: number;
    dailyNotes: number;
    habitNotes: number;
    goalNotes: number;
    completionData: number[];
    labels: string[];
    activityData: number[];
    activityLabels: string[];
}>();

function loadScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = src;
        s.onload = () => resolve();
        s.onerror = () => reject(new Error(src));
        document.body.appendChild(s);
    });
}

onMounted(async () => {
    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js');
    await loadScript('/AdminSide/js/dashboard.js');
});

const totalUsers = computed(() => props.users?.length ?? 0);
const inactiveUsers = computed(() => props.users?.filter((u) => u.status === 'inactive').length ?? 0);
const bannedUsers = computed(() => props.users?.filter((u) => u.status === 'blocked').length ?? 0);

const totalNotes = computed(() => props.notes?.length ?? 0);
const dailyPercent = computed(() =>
    totalNotes.value > 0 ? Math.min(100, Math.round((props.dailyNotes / Math.max(1, totalNotes.value)) * 100)) : 0,
);
const habitPercent = computed(() =>
    totalNotes.value > 0 ? Math.min(100, Math.round((props.habitNotes / Math.max(1, totalNotes.value)) * 100)) : 0,
);
const goalPercent = computed(() =>
    totalNotes.value > 0 ? Math.min(100, Math.round((props.goalNotes / Math.max(1, totalNotes.value)) * 100)) : 0,
);
</script>

<template>
    <AdminLayout
        title="Admin Dashboard - Momentum"
        page-css="dashboard.css"
        active="dashboard"
        page-title="Dashboard"
        page-description="Monitor your platform's performance and user engagement"
    >
        <main class="main-content">
            <div class="stats-grid">
                <div class="stat-card" data-stat="total_users">
                    <div class="stat-header">
                        <span class="stat-label">Total Users</span>
                        <div class="stat-icon blue"><i class="fas fa-users"></i></div>
                    </div>
                    <div class="stat-value" :data-value="totalUsers">{{ totalUsers }}</div>
                </div>
                <div class="stat-card" data-stat="created_habits">
                    <div class="stat-header">
                        <span class="stat-label">Created Habits</span>
                        <div class="stat-icon purple"><i class="fas fa-heart"></i></div>
                    </div>
                    <div class="stat-value" :data-value="props.habits.length">{{ props.habits.length }}</div>
                </div>
                <div class="stat-card" data-stat="notes_created">
                    <div class="stat-header">
                        <span class="stat-label">Notes Created</span>
                        <div class="stat-icon yellow"><i class="fas fa-sticky-note"></i></div>
                    </div>
                    <div class="stat-value" :data-value="props.notes.length">{{ props.notes.length }}</div>
                </div>
                <div class="stat-card" data-stat="inactive_users">
                    <div class="stat-header">
                        <span class="stat-label">Inactive Users</span>
                        <div class="stat-icon orange"><i class="fas fa-user-slash"></i></div>
                    </div>
                    <div class="stat-value" :data-value="inactiveUsers">{{ inactiveUsers }}</div>
                </div>
                <div class="stat-card" data-stat="banned_users">
                    <div class="stat-header">
                        <span class="stat-label">Banned Users</span>
                        <div class="stat-icon red"><i class="fas fa-user-times"></i></div>
                    </div>
                    <div class="stat-value" :data-value="bannedUsers">{{ bannedUsers }}</div>
                </div>
            </div>

            <div class="charts-grid">
                <div class="chart-card large">
                    <div class="chart-header">
                        <h3 class="chart-title">Habit Completion Rate</h3>
                        <select class="chart-select">
                            <option>Last 7 days</option>
                        </select>
                    </div>
                    <canvas
                        id="habitCompletionChart"
                        v-bind="{
                            'data-labels': JSON.stringify(props.labels),
                            'data-data': JSON.stringify(props.completionData),
                        }"
                    ></canvas>
                </div>
                <div class="chart-card">
                    <div class="chart-header">
                        <h3 class="chart-title">User Activity</h3>
                    </div>
                    <canvas
                        id="userActivityChart"
                        v-bind="{
                            'data-labels': JSON.stringify(props.activityLabels),
                            'data-data': JSON.stringify(props.activityData),
                        }"
                    ></canvas>
                </div>
            </div>

            <div class="bottom-grid">
                <div class="card">
                    <h3 class="card-title">Popular Habits</h3>
                    <div class="habits-list">
                        <div v-for="(h, i) in props.popularHabits" :key="i" class="habit-item">
                            <div class="habit-icon" :class="h.color">
                                <i :class="`fas fa-${h.icon}`"></i>
                            </div>
                            <div class="habit-info">
                                <div class="habit-name">{{ h.name }}</div>
                                <div class="habit-users">{{ h.user_count }} {{ h.user_count === 1 ? 'user' : 'users' }}</div>
                            </div>
                            <div class="habit-completion">{{ h.completion_rate }}%</div>
                        </div>
                        <div v-if="!props.popularHabits?.length" class="habit-item">
                            <div class="habit-info"><div class="habit-name">No habits yet</div></div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <h3 class="card-title">Recent Users</h3>
                    <div class="users-list">
                        <div v-for="(u, i) in props.recentUsers" :key="i" class="user-item">
                            <img :src="u.avatar" :alt="u.name" class="user-avatar" />
                            <div class="user-info">
                                <div class="user-name">{{ u.name }}</div>
                                <div class="user-joined">Joined {{ u.joined }}</div>
                            </div>
                            <div
                                class="user-status"
                                :class="
                                    u.status === 'active' ? 'online' : u.status === 'inactive' ? 'away' : 'offline'
                                "
                            ></div>
                        </div>
                        <div v-if="!props.recentUsers?.length" class="user-item">
                            <div class="user-info"><div class="user-name">No users yet</div></div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <h3 class="card-title">Notes Analytics</h3>
                    <div class="notes-analytics">
                        <div class="note-stat">
                            <div class="note-label">Daily Notes</div>
                            <div class="note-bar">
                                <div class="note-progress" :style="{ width: dailyPercent + '%', background: '#667eea' }"></div>
                            </div>
                            <div class="note-value">{{ props.dailyNotes }}</div>
                        </div>
                        <div class="note-stat">
                            <div class="note-label">Habit Notes</div>
                            <div class="note-bar">
                                <div class="note-progress" :style="{ width: habitPercent + '%', background: '#764ba2' }"></div>
                            </div>
                            <div class="note-value">{{ props.habitNotes }}</div>
                        </div>
                        <div class="note-stat">
                            <div class="note-label">Goal Notes</div>
                            <div class="note-bar">
                                <div class="note-progress" :style="{ width: goalPercent + '%', background: '#10b981' }"></div>
                            </div>
                            <div class="note-value">{{ props.goalNotes }}</div>
                        </div>
                        <div class="completion-stat">
                            <div class="completion-value">{{ props.notesWithHabitsPercent }}%</div>
                            <div class="completion-label">Notes with habits</div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </AdminLayout>
</template>
