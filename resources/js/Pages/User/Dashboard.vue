<script setup lang="ts">
import { computed } from 'vue';
import { usePage } from '@inertiajs/vue3';
import UserLayout from '@/Layouts/UserLayout.vue';
import { useUserDashboard, type CalendarDayHabit } from '@/composables/useUserDashboard';
import userRoutes from '@/routes/user';
import { add as habitsAdd, view } from '@/routes/user/habits';
import type { SharedProps } from '@/types/global';
import type { Habit } from '@/types/models';

const page = usePage<SharedProps>();

defineProps<{
    habits: Habit[];
    notes: unknown[];
    activeHabits: number;
    currentStreak: number;
    completionRate: number;
    todayHabits: { habit: Habit; completed: boolean }[];
    calendarData: Record<number, CalendarDayHabit[]>;
}>();

const title = computed(() => {
    const u = page.props.auth.user;
    return u ? `Dashboard | ${u.firstname} ${u.lastname}` : 'Dashboard';
});

const todayProgress = computed(() => {
    const raw = page.props as unknown as {
        todayHabits?: { habit: Habit; completed: boolean }[];
    };
    const th = raw.todayHabits;
    if (!th?.length) return '0/0';
    const done = th.filter((x) => x.completed).length;
    return `${done}/${th.length}`;
});

const p = page.props as unknown as {
    calendarData: Record<number, CalendarDayHabit[]>;
};

useUserDashboard(
    p.calendarData ?? {},
    userRoutes.todayHabits.url(),
    userRoutes.habits.calendarData.url(),
);
</script>

<template>
    <UserLayout
        :title="title"
        page-css="dashboard.css"
        active-page="dashboard"
        page-title="Dashboard"
        page-description="Track your habits and capture your thoughts"
    >
        <div v-if="page.props.flash?.success" class="success-alert" style="margin: 20px">
            <span class="success-icon" style="font-weight: bold; font-size: 1.2em; margin-right: 10px">✓</span>
            {{ page.props.flash.success }}
        </div>

        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-header">
                    <span class="stat-label">Habits</span>
                    <div class="stat-icon green-icon">
                        <i class="fas fa-list"></i>
                    </div>
                </div>
                <div class="stat-value">{{ activeHabits ?? 0 }}</div>
            </div>
            <div class="stat-card">
                <div class="stat-header">
                    <span class="stat-label">Completion Rate</span>
                    <div class="stat-icon blue-icon">
                        <i class="fas fa-chart-line"></i>
                    </div>
                </div>
                <div class="stat-value">{{ completionRate ?? 0 }}%</div>
            </div>
            <div class="stat-card">
                <div class="stat-header">
                    <span class="stat-label">Current Streak</span>
                    <div class="stat-icon orange-icon">
                        <i class="fas fa-fire"></i>
                    </div>
                </div>
                <div class="stat-value">{{ currentStreak ?? 0 }} days</div>
            </div>
            <div class="stat-card">
                <div class="stat-header">
                    <span class="stat-label">Today's Progress</span>
                    <div class="stat-icon purple-icon">
                        <i class="fas fa-calendar-check"></i>
                    </div>
                </div>
                <div class="stat-value">{{ todayProgress }}</div>
            </div>
        </div>

        <div class="content-grid">
            <div class="calendar-section">
                <div class="calendar-card">
                    <div class="calendar-header">
                        <h2 id="dashboardCalendarTitle" class="calendar-title"></h2>
                        <div class="calendar-nav">
                            <button id="dashboardPrevMonth" type="button" class="nav-btn">
                                <i class="fas fa-chevron-left"></i>
                            </button>
                            <button id="dashboardNextMonth" type="button" class="nav-btn">
                                <i class="fas fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                    <div class="calendar-body">
                        <div class="calendar-weekdays">
                            <div class="weekday">S</div>
                            <div class="weekday">M</div>
                            <div class="weekday">T</div>
                            <div class="weekday">W</div>
                            <div class="weekday">T</div>
                            <div class="weekday">F</div>
                            <div class="weekday">S</div>
                        </div>
                        <div id="dashboardCalendarDays" class="calendar-days"></div>
                        <div class="calendar-legend">
                            <div class="legend-item">
                                <span class="legend-dot completed-dot"></span>
                                <span class="legend-text">Completed</span>
                            </div>
                            <div class="legend-item">
                                <span class="legend-dot today-dot"></span>
                                <span class="legend-text">Today</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="habits-section">
                <div class="habits-card">
                    <div class="habits-header">
                        <h2 id="habitsSectionTitle" class="habits-title">Today's Habits</h2>
                        <span id="habitsCount" class="habits-count"> </span>
                    </div>
                    <div id="habitsListContainer" class="habits-list"></div>
                </div>
            </div>
        </div>
    </UserLayout>
</template>
