<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, shallowRef } from 'vue';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import Chart from 'chart.js/auto'; // Ensure you've run: npm install chart.js

interface PopularHabit {
    name: string;
    user_count: number;
    completion_rate: number;
    icon: string;
    color: string;
}

interface RecentUser {
    name: string;
    avatar: string;
    joined: string;
    status: string;
}

const props = defineProps<{
    users: { status?: string }[];
    habits: unknown[];
    notes: unknown[];
    popularHabits: PopularHabit[];
    recentUsers: RecentUser[];
    notesWithHabitsPercent: number;
    dailyNotes: number;
    habitNotes: number;
    goalNotes: number;
    completionData: number[];
    labels: string[];
    activityData: number[];
    activityLabels: string[];
}>();

// --- Chart Refs ---
const habitChartCanvas = ref<HTMLCanvasElement | null>(null);
const activityChartCanvas = ref<HTMLCanvasElement | null>(null);
const habitChart = shallowRef<Chart | null>(null);
const activityChart = shallowRef<Chart | null>(null);

// --- State for Live Updates ---
const selectedPeriod = ref('7');
const statsInterval = ref<ReturnType<typeof setInterval> | null>(null);
const chartsInterval = ref<ReturnType<typeof setInterval> | null>(null);

// --- Computed Stats ---
const totalUsers = computed(() => props.users?.length ?? 0);
const inactiveUsers = computed(() => props.users?.filter((u) => u.status === 'inactive').length ?? 0);
const bannedUsers = computed(() => props.users?.filter((u) => u.status === 'blocked').length ?? 0);
const totalNotes = computed(() => props.notes?.length ?? 0);

const dailyPercent = computed(() => totalNotes.value > 0 ? Math.min(100, Math.round((props.dailyNotes / Math.max(1, totalNotes.value)) * 100)) : 0);
const habitPercent = computed(() => totalNotes.value > 0 ? Math.min(100, Math.round((props.habitNotes / Math.max(1, totalNotes.value)) * 100)) : 0);
const goalPercent = computed(() => totalNotes.value > 0 ? Math.min(100, Math.round((props.goalNotes / Math.max(1, totalNotes.value)) * 100)) : 0);

// --- Chart Initialization Logic ---
const initCharts = () => {
    Chart.defaults.font.family = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    Chart.defaults.color = '#666';

    // Habit Completion Chart
    if (habitChartCanvas.value) {
        habitChart.value = new Chart(habitChartCanvas.value, {
            type: 'line',
            data: {
                labels: props.labels,
                datasets: [{
                    label: 'Completion Rate',
                    data: props.completionData,
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#667eea',
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: { y: { min: 0, max: 100 }, x: { grid: { display: false } } }
            }
        });
    }

    // User Activity Chart
    if (activityChartCanvas.value) {
        const maxActivity = props.activityData.length > 0 ? Math.max(...props.activityData) : 800;
        activityChart.value = new Chart(activityChartCanvas.value, {
            type: 'bar',
            data: {
                labels: props.activityLabels,
                datasets: [{
                    label: 'Active Users',
                    data: props.activityData,
                    backgroundColor: '#ff7849',
                    borderRadius: 6,
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { 
                        beginAtZero: true,
                        max: Math.max(800, Math.ceil(maxActivity / 200) * 200) 
                    },
                    x: { grid: { display: false } }
                }
            }
        });
    }
};

// --- API Methods (Live Updates) ---
const refreshDashboardData = async () => {
    try {
        // Note: In Inertia, you can use router.reload() to refresh props, 
        // but if you have custom endpoints as in your JS file:
        const response = await fetch(`/admin/dashboard/chart-data?period=${selectedPeriod.value}`);
        const data = await response.json();
        
        if (data.success && habitChart.value && activityChart.value) {
            // Update Habit Chart
            habitChart.value.data.labels = data.completion.labels;
            habitChart.value.data.datasets[0].data = data.completion.data;
            habitChart.value.update();

            // Update Activity Chart
            activityChart.value.data.labels = data.activity.labels;
            activityChart.value.data.datasets[0].data = data.activity.data;
            activityChart.value.update();
        }
    } catch (e) {
        console.error("Failed to refresh charts", e);
    }
};

// --- Lifecycle ---
onMounted(() => {
    initCharts();

    // Replicating your dashboard.js intervals
    statsInterval.value = setInterval(() => {
        // If using Inertia, you can refresh all props:
        // router.reload({ only: ['users', 'habits', 'notes'] });
    }, 30000);

    chartsInterval.value = setInterval(refreshDashboardData, 60000);
});

onUnmounted(() => {
    if (statsInterval.value) clearInterval(statsInterval.value);
    if (chartsInterval.value) clearInterval(chartsInterval.value);
    habitChart.value?.destroy();
    activityChart.value?.destroy();
});
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
                <div class="stat-card" v-for="stat in [
                    { key: 'total_users', label: 'Total Users', val: totalUsers, icon: 'fa-users', color: 'blue' },
                    { key: 'created_habits', label: 'Created Habits', val: props.habits.length, icon: 'fa-heart', color: 'purple' },
                    { key: 'notes_created', label: 'Notes Created', val: props.notes.length, icon: 'fa-sticky-note', color: 'yellow' },
                    { key: 'inactive_users', label: 'Inactive Users', val: inactiveUsers, icon: 'fa-user-slash', color: 'orange' },
                    { key: 'banned_users', label: 'Banned Users', val: bannedUsers, icon: 'fa-user-times', color: 'red' }
                ]" :key="stat.key" :data-stat="stat.key">
                    <div class="stat-header">
                        <span class="stat-label">{{ stat.label }}</span>
                        <div :class="['stat-icon', stat.color]"><i :class="['fas', stat.icon]"></i></div>
                    </div>
                    <div class="stat-value">{{ stat.val.toLocaleString() }}</div>
                </div>
            </div>

            <div class="charts-grid">
                <div class="chart-card">
                    <div class="chart-header">
                        <h3 class="chart-title">Habit Completion Rate</h3>
                        <select v-model="selectedPeriod" @change="refreshDashboardData" class="chart-select">
                            <option value="7">Last 7 days</option>
                            <option value="30">Last 30 days</option>
                            <option value="90">Last 90 days</option>
                        </select>
                    </div>
                    <canvas ref="habitChartCanvas"></canvas>
                </div>
                <div class="chart-card">
                    <div class="chart-header">
                        <h3 class="chart-title">User Activity</h3>
                    </div>
                    <canvas ref="activityChartCanvas"></canvas>
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
                            <div class="user-status" :class="u.status === 'active' ? 'online' : u.status === 'inactive' ? 'away' : 'offline'"></div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <h3 class="card-title">Notes Analytics</h3>
                    <div class="notes-analytics">
                        <div v-for="noteStat in [
                            { label: 'Daily Notes', val: props.dailyNotes, percent: dailyPercent, color: '#667eea' },
                            { label: 'Habit Notes', val: props.habitNotes, percent: habitPercent, color: '#764ba2' },
                            { label: 'Goal Notes', val: props.goalNotes, percent: goalPercent, color: '#10b981' }
                        ]" :key="noteStat.label" class="note-stat">
                            <div class="note-label">{{ noteStat.label }}</div>
                            <div class="note-bar">
                                <div class="note-progress" :style="{ width: noteStat.percent + '%', background: noteStat.color }"></div>
                            </div>
                            <div class="note-value">{{ noteStat.val }}</div>
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

<style scope> 
    * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, sans-serif;
  background: #1a1a1a;
  color: #333;
  overflow-x: hidden;
}

.container {
  display: flex;
  height: 100vh;
}

/* Main Content */
.main-content {
  flex: 1;
  background: #f8f9fa;
  overflow-y: auto;
  padding: 32px 40px;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  margin-bottom: 24px;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.stat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.stat-label {
  font-size: 13px;
  color: #666;
  font-weight: 500;
}

.stat-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}

.stat-icon.blue {
  background: #e3f2fd;
  color: #2196f3;
}

.stat-icon.purple {
  background: #f3e5f5;
  color: #9c27b0;
}

.stat-icon.yellow {
  background: #fff8e1;
  color: #ffc107;
}

.stat-icon.orange {
  background: #fff3e0;
  color: #ff9800;
}

.stat-icon.red {
  background: #ffebee;
  color: #f44336;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 8px;
  transition: all 0.3s ease;
}

.stat-change {
  font-size: 12px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;
}

.stat-change.positive {
  color: #10b981;
}

.stat-change.negative {
  color: #ef4444;
}

/* Charts Grid */
.charts-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 24px;
}

.chart-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.chart-title {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
}

.chart-select {
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 13px;
  color: #666;
  background: white;
  cursor: pointer;
}

.chart-tabs {
  display: flex;
  gap: 4px;
  background: #f5f5f5;
  padding: 4px;
  border-radius: 8px;
}

.chart-tab {
  padding: 6px 16px;
  border: none;
  background: transparent;
  border-radius: 6px;
  font-size: 13px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
}

.chart-tab.active {
  background: #667eea;
  color: white;
}

/* Bottom Grid */
.bottom-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 20px;
}

/* Habits List */
.habits-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.habit-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.habit-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}

.habit-icon.green {
  background: #d1fae5;
  color: #10b981;
}

.habit-icon.blue {
  background: #dbeafe;
  color: #3b82f6;
}

.habit-icon.purple {
  background: #ede9fe;
  color: #8b5cf6;
}

.habit-icon.yellow {
  background: #fef3c7;
  color: #f59e0b;
}

.habit-info {
  flex: 1;
}

.habit-name {
  font-size: 14px;
  font-weight: 500;
  color: #1a1a1a;
  margin-bottom: 2px;
}

.habit-users {
  font-size: 12px;
  color: #999;
}

.habit-completion {
  font-size: 16px;
  font-weight: 600;
  color: #666;
}

/* Users List */
.users-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.user-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.user-info {
  flex: 1;
}

.user-name {
  font-size: 14px;
  font-weight: 500;
  color: #1a1a1a;
  margin-bottom: 2px;
}

.user-joined {
  font-size: 12px;
  color: #999;
}

.user-status {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.user-status.online {
  background: #10b981;
}

.user-status.away {
  background: #fbbf24;
}

.user-status.offline {
  background: #d1d5db;
}

/* Notes Analytics */
.notes-analytics {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.note-stat {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.note-label {
  font-size: 13px;
  color: #666;
  font-weight: 500;
}

.note-bar {
  height: 8px;
  background: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}

.note-progress {
  height: 100%;
  border-radius: 4px;
  transition: width 0.3s;
}

.note-value {
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
}

.completion-stat {
  text-align: center;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  margin-top: 8px;
}

.completion-value {
  font-size: 36px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 4px;
}

.completion-label {
  font-size: 12px;
  color: #666;
}

/* Chart Canvas */
canvas {
  max-height: 240px;
  height: 240px !important;
}

.chart-card.large canvas {
  max-height: 280px;
  height: 280px !important;
}

.main-container {
  flex: 1;
  display: flex;
  flex-direction: column;
}

</style>