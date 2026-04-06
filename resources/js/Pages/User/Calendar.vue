<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { usePage } from '@inertiajs/vue3';
import UserLayout from '@/Layouts/UserLayout.vue';
import { add as habitsAdd } from '@/routes/user/habits';
import type { SharedProps } from '@/types/global';

const page = usePage<SharedProps>();

let scriptEl: HTMLScriptElement | null = null;

onMounted(() => {
    scriptEl = document.createElement('script');
    scriptEl.src = '/UserSide/js/calendar.js';
    scriptEl.async = true;
    document.body.appendChild(scriptEl);
});

onUnmounted(() => {
    scriptEl?.remove();
});
</script>

<template>
    <UserLayout
        title="Calendar"
        page-css="calendar.css"
        active-page="calendar"
        page-title="Calendar"
        page-description="See your Calendar"
    >
        <div v-if="page.props.flash?.success" class="success-alert" style="margin: 20px">
            <span class="success-icon" style="font-weight: bold; font-size: 1.2em; margin-right: 10px">✓</span>
            {{ page.props.flash.success }}
        </div>
        <div class="calendar-content">
            <div style="margin-bottom: 20px; text-align: right">
                <a
                    :href="`${habitsAdd.url()}?redirect_to=calendar`"
                    class="btn btn-primary"
                    style="display: inline-block; padding: 10px 20px; background: #007bff; color: white; text-decoration: none; border-radius: 5px"
                >
                    <i class="fas fa-plus"></i> Add New Habit
                </a>
            </div>
            <div class="calendar-container">
                <div class="calendar-header">
                    <div class="month-navigation">
                        <button id="prevMonth" type="button" class="nav-btn" title="Previous Month">‹</button>
                        <h2 id="currentMonth" class="current-month"></h2>
                        <button id="nextMonth" type="button" class="nav-btn" title="Next Month">›</button>
                    </div>
                </div>

                <div id="calendarGrid" class="calendar-grid">
                    <div class="calendar-day-header">Sun</div>
                    <div class="calendar-day-header">Mon</div>
                    <div class="calendar-day-header">Tue</div>
                    <div class="calendar-day-header">Wed</div>
                    <div class="calendar-day-header">Thu</div>
                    <div class="calendar-day-header">Fri</div>
                    <div class="calendar-day-header">Sat</div>
                </div>
            </div>

            <div class="legend-section">
                <h3 class="legend-title">Active Habits Key</h3>
                <div class="legend-items">
                    <p style="color: #999; font-size: 14px">Loading habits...</p>
                </div>
            </div>
        </div>

        <div id="popupOverlay" class="popup-overlay"></div>
        <div id="dayDetailPopup" class="day-detail-popup" role="dialog" aria-modal="true" aria-labelledby="popupTitle">
            <div class="popup-header">
                <h3 id="popupTitle" class="popup-title"></h3>
                <button id="closePopup" type="button" class="close-popup" title="Close (Escape)">×</button>
            </div>
            <div id="popupHabits" class="popup-habits"></div>
        </div>
    </UserLayout>
</template>
