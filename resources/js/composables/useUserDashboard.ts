/**
 * Ports the previous dashboard inline script: calendar rendering, month navigation,
 * today habits refresh, mark-as-done. Uses DOM ids from the dashboard template.
 */
import { onMounted, onUnmounted } from 'vue';
import userRoutes from '@/routes/user';
import { markDone } from '@/routes/user/habits';
import { add as habitsAdd } from '@/routes/user/habits';

export type CalendarDayHabit = {
    id: number;
    name: string;
    completed: boolean;
};

export function useUserDashboard(
    calendarDataInitial: Record<number, CalendarDayHabit[]>,
    todayHabitsUrl: string,
    calendarDataUrlBase: string,
) {
    const dashboardCalendarData: Record<number, CalendarDayHabit[]> = { ...calendarDataInitial };
    let dashboardCurrentDate = new Date();
    dashboardCurrentDate.setDate(1);

    function csrf(): string {
        return document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content ?? '';
    }

    function renderDashboardCalendar() {
        const container = document.getElementById('dashboardCalendarDays');
        const title = document.getElementById('dashboardCalendarTitle');
        if (!container) return;

        const year = dashboardCurrentDate.getFullYear();
        const month = dashboardCurrentDate.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayIndex = new Date(year, month, 1).getDay();
        const today = new Date();
        const isCurrentMonth = year === today.getFullYear() && month === today.getMonth();

        const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const daysInPrevMonth = new Date(year, month, 0).getDate();

        if (title) {
            title.textContent = dashboardCurrentDate.toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric',
            });
        }

        container.innerHTML = '';

        for (let i = 0; i < firstDayIndex; i++) {
            const day = daysInPrevMonth - firstDayIndex + i + 1;
            const emptyDay = document.createElement('div');
            emptyDay.className = 'day';

            const prevMonthDate = new Date(year, month - 1, day);
            const prevMonthDateOnly = new Date(
                prevMonthDate.getFullYear(),
                prevMonthDate.getMonth(),
                prevMonthDate.getDate(),
            );
            const isPastDate = prevMonthDateOnly < todayDateOnly;

            const dayHabits = dashboardCalendarData[day] || [];
            if (dayHabits.length > 0) {
                const visibleHabits = dayHabits.filter((h) => !isPastDate || h.completed);
                const hasCompleted = visibleHabits.some((h) => h.completed);
                const hasHabits = visibleHabits.length > 0;

                if (hasCompleted) {
                    emptyDay.classList.add('completed');
                }

                if (hasHabits) {
                    emptyDay.style.cursor = 'pointer';
                    emptyDay.addEventListener('click', function () {
                        showDayHabits(day, visibleHabits);
                    });
                }
            }

            container.appendChild(emptyDay);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'day';
            dayElement.textContent = String(day);

            if (isCurrentMonth && day === today.getDate()) {
                dayElement.classList.add('today');
            }

            const currentDateObj = new Date(year, month, day);
            const currentDateOnly = new Date(
                currentDateObj.getFullYear(),
                currentDateObj.getMonth(),
                currentDateObj.getDate(),
            );
            const isPastDate = currentDateOnly < todayDateOnly;

            const dayHabits = dashboardCalendarData[day] || [];
            const visibleHabits = dayHabits.filter((h) => !isPastDate || h.completed);
            const hasCompleted = visibleHabits.some((h) => h.completed);
            const hasHabits = visibleHabits.length > 0;

            if (hasCompleted) {
                dayElement.classList.add('completed');
            }

            if (hasHabits) {
                dayElement.style.cursor = 'pointer';
                dayElement.addEventListener('click', function () {
                    showDayHabits(day, visibleHabits);
                });
            }

            container.appendChild(dayElement);
        }
    }

    function showDayHabits(day: number, habits: CalendarDayHabit[]) {
        const habitsList = document.getElementById('habitsListContainer');
        const habitsHeader = document.getElementById('habitsCount');
        const habitsTitle = document.getElementById('habitsSectionTitle');

        if (!habitsList || !habitsHeader) return;

        const selectedDate = new Date(dashboardCurrentDate.getFullYear(), dashboardCurrentDate.getMonth(), day);
        const today = new Date();
        const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const selectedDateOnly = new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            selectedDate.getDate(),
        );
        const isToday = selectedDateOnly.getTime() === todayDateOnly.getTime();
        const isPastDate = selectedDateOnly < todayDateOnly;

        if (habitsTitle) {
            if (isToday) {
                habitsTitle.textContent = "Today's Habits";
            } else {
                const dateStr = selectedDate.toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                });
                habitsTitle.textContent = dateStr + ' Habits';
            }
        }

        const visibleHabits = habits.filter((habit) => {
            if (!isPastDate) return true;
            return habit.completed;
        });

        habitsList.innerHTML = '';

        if (visibleHabits.length === 0) {
            habitsList.innerHTML = `<div style="text-align: center; padding: 40px 20px; color: #999;"><p>No habits scheduled for this day.</p><a href="${habitsAdd.url()}?redirect_to=dashboard" style="display: inline-block; margin-top: 10px; color: #007bff; text-decoration: none;"><i class="fas fa-plus"></i> Add a habit</a></div>`;
            habitsHeader.textContent = '0 of 0 completed';
            return;
        }

        const completedCount = visibleHabits.filter((h) => h.completed).length;
        habitsHeader.textContent = `${completedCount} of ${visibleHabits.length} completed`;

        visibleHabits.forEach((habit) => {
            const habitItem = document.createElement('div');
            habitItem.className = `habit-item ${habit.completed ? 'completed' : ''}`;
            habitItem.setAttribute('data-habit-id', String(habit.id));
            habitItem.innerHTML = `
      <div class="habit-checkbox ${habit.completed ? 'checked' : ''}">
        ${habit.completed ? '<i class="fas fa-check"></i>' : ''}
      </div>
      <div class="habit-info">
        <div class="habit-name">${habit.name}</div>
        <div class="habit-desc">Click to view details</div>
      </div>
      ${habit.completed ? '<span class="habit-status completed-status">Completed</span>' : `<button type="button" class="mark-done-btn" data-habit-id="${habit.id}">Mark Done</button>`}
    `;

            habitItem.style.cursor = 'pointer';
            habitItem.addEventListener('click', function (e) {
                const t = e.target as HTMLElement;
                if (!t.classList.contains('mark-done-btn') && !t.closest('.mark-done-btn')) {
                    window.location.href = `/user/habits/view/${habit.id}`;
                }
            });

            const btn = habitItem.querySelector('.mark-done-btn');
            if (btn) {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    markAsDone(habit.id);
                });
            }

            habitsList.appendChild(habitItem);
        });

        document.querySelector('.habits-section')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    async function fetchDashboardCalendarData() {
        const year = dashboardCurrentDate.getFullYear();
        const month = dashboardCurrentDate.getMonth() + 1;

        try {
            const response = await fetch(`${calendarDataUrlBase}?year=${year}&month=${month}`, {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    Accept: 'application/json',
                },
                credentials: 'same-origin',
            });

            if (response.ok) {
                const data = await response.json();
                Object.keys(dashboardCalendarData).forEach((key) => delete dashboardCalendarData[Number(key)]);
                Object.assign(dashboardCalendarData, data);
                renderDashboardCalendar();

                const today = new Date();
                if (year === today.getFullYear() && month === today.getMonth() + 1) {
                    const todayDay = today.getDate();
                    const todayH = dashboardCalendarData[todayDay] || [];
                    const habitsTitle = document.getElementById('habitsSectionTitle');
                    if (habitsTitle && habitsTitle.textContent?.includes('Today')) {
                        if (todayH.length > 0) {
                            showDayHabits(todayDay, todayH);
                        } else {
                            fetchTodayHabits();
                        }
                    }
                }
            }
        } catch (e) {
            console.error('Error fetching calendar data:', e);
        }
    }

    async function fetchTodayHabits() {
        try {
            const response = await fetch(todayHabitsUrl, {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    Accept: 'application/json',
                },
                credentials: 'same-origin',
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    updateTodayHabits(data.habits);
                    updateDashboardStats(data.stats);
                }
            }
        } catch (e) {
            console.error('Error fetching today habits:', e);
        }
    }

    function updateTodayHabits(
        habits: { id: number; name: string; description: string; completed: boolean }[],
    ) {
        const habitsList = document.getElementById('habitsListContainer');
        const habitsCount = document.getElementById('habitsCount');
        const habitsTitle = document.getElementById('habitsSectionTitle');

        if (!habitsList || !habitsCount) return;

        if (habitsTitle && habitsTitle.textContent?.includes('Today')) {
            const completedCount = habits.filter((h) => h.completed).length;
            habitsCount.textContent = `${completedCount} of ${habits.length} completed`;

            habitsList.innerHTML = '';

            if (habits.length === 0) {
                habitsList.innerHTML = `<div style="text-align: center; padding: 40px 20px; color: #999;"><p>No habits scheduled for today.</p><a href="${habitsAdd.url()}?redirect_to=dashboard" style="display: inline-block; margin-top: 10px; color: #007bff; text-decoration: none;"><i class="fas fa-plus"></i> Add a habit</a></div>`;
                return;
            }

            habits.forEach((habit) => {
                const habitItem = document.createElement('div');
                habitItem.className = `habit-item ${habit.completed ? 'completed' : ''}`;
                habitItem.setAttribute('data-habit-id', String(habit.id));
                habitItem.innerHTML = `
        <div class="habit-checkbox ${habit.completed ? 'checked' : ''}">
          ${habit.completed ? '<i class="fas fa-check"></i>' : ''}
        </div>
        <div class="habit-info">
          <div class="habit-name">${habit.name}</div>
          <div class="habit-desc">${habit.description}</div>
        </div>
        ${habit.completed ? '<span class="habit-status completed-status">Completed</span>' : `<button type="button" class="mark-done-btn" data-habit-id="${habit.id}">Mark Done</button>`}
      `;

                habitItem.style.cursor = 'pointer';
                habitItem.addEventListener('click', function (e) {
                    const t = e.target as HTMLElement;
                    if (!t.classList.contains('mark-done-btn') && !t.closest('.mark-done-btn')) {
                        window.location.href = `/user/habits/view/${habit.id}`;
                    }
                });

                const btn = habitItem.querySelector('.mark-done-btn');
                if (btn) {
                    btn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        markAsDone(habit.id);
                    });
                }

                habitsList.appendChild(habitItem);
            });
        }
    }

    function updateDashboardStats(stats: {
        activeHabits: number;
        completionRate: number;
        currentStreak: number;
        todayProgress: string;
    }) {
        const statCards = document.querySelectorAll('.stat-card');
        statCards.forEach((card) => {
            const label = card.querySelector('.stat-label');
            if (label) {
                const valueEl = card.querySelector('.stat-value');
                if (label.textContent?.trim() === 'Habits' && valueEl) {
                    valueEl.textContent = String(stats.activeHabits);
                } else if (label.textContent?.trim() === 'Completion Rate' && valueEl) {
                    valueEl.textContent = `${stats.completionRate}%`;
                } else if (label.textContent?.trim() === 'Current Streak' && valueEl) {
                    valueEl.textContent = `${stats.currentStreak} days`;
                } else if (label.textContent?.trim() === "Today's Progress" && valueEl) {
                    valueEl.textContent = stats.todayProgress;
                }
            }
        });
    }

    function markAsDone(habitId: number) {
        fetch(markDone.url(habitId), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrf(),
                'X-Requested-With': 'XMLHttpRequest',
            },
            credentials: 'same-origin',
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    fetchTodayHabits();
                    fetchDashboardCalendarData();
                    const w = window as unknown as { refreshNotifications?: () => void };
                    w.refreshNotifications?.();
                } else {
                    alert(data.message);
                }
            })
            .catch(() => alert('An error occurred. Please try again.'));
    }

    let intervalId: ReturnType<typeof setInterval>;

    onMounted(() => {
        const prev = document.getElementById('dashboardPrevMonth');
        const next = document.getElementById('dashboardNextMonth');
        prev?.addEventListener('click', () => {
            dashboardCurrentDate.setMonth(dashboardCurrentDate.getMonth() - 1);
            fetchDashboardCalendarData();
        });
        next?.addEventListener('click', () => {
            dashboardCurrentDate.setMonth(dashboardCurrentDate.getMonth() + 1);
            fetchDashboardCalendarData();
        });

        renderDashboardCalendar();
        fetchTodayHabits();
        fetchDashboardCalendarData();

        intervalId = setInterval(() => {
            fetchTodayHabits();
            const today = new Date();
            if (
                dashboardCurrentDate.getFullYear() === today.getFullYear() &&
                dashboardCurrentDate.getMonth() === today.getMonth()
            ) {
                fetchDashboardCalendarData();
            }
        }, 30000);

        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                fetchTodayHabits();
                const today = new Date();
                if (
                    dashboardCurrentDate.getFullYear() === today.getFullYear() &&
                    dashboardCurrentDate.getMonth() === today.getMonth()
                ) {
                    fetchDashboardCalendarData();
                }
            }
        });

        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('habit_added')) {
            setTimeout(() => {
                fetchTodayHabits();
                fetchDashboardCalendarData();
            }, 500);
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    });

    onUnmounted(() => {
        clearInterval(intervalId);
    });
}
