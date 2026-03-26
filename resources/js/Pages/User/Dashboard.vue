<template>
  <UserLayout>
    <Head title="Dashboard" />

    <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      
      <!-- Welcome Banne -->
      <div v-if="$page.props.flash?.success" class="mb-8 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl relative flex items-center shadow-sm" role="alert">
        <i class="fas fa-check-circle text-green-500 mr-2 text-xl"></i>
        <span class="block sm:inline font-medium">{{ $page.props.flash.success }}</span>
      </div>

      <!-- Header -->
      <div class="sm:flex sm:justify-between sm:items-center mb-8">
        <div class="mb-4 sm:mb-0">
          <h1 class="text-2xl md:text-3xl text-gray-800 font-bold tracking-tight">Dashboard 👋</h1>
          <p class="text-sm text-gray-500 mt-1">Track your habits and capture your thoughts.</p>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <!-- Card 1 -->
        <div class="flex flex-col bg-white shadow-sm rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
          <div class="flex justify-between items-center mb-2">
            <h2 class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Active Habits</h2>
            <div class="w-8 h-8 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center">
              <i class="fas fa-list text-sm"></i>
            </div>
          </div>
          <div class="text-3xl font-bold text-gray-800">{{ activeHabits || 0 }}</div>
        </div>
        
        <!-- Card 2 -->
        <div class="flex flex-col bg-white shadow-sm rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
          <div class="flex justify-between items-center mb-2">
            <h2 class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Completion Rate</h2>
            <div class="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
              <i class="fas fa-chart-line text-sm"></i>
            </div>
          </div>
          <div class="text-3xl font-bold text-gray-800">{{ completionRate || 0 }}%</div>
        </div>

        <!-- Card 3 -->
        <div class="flex flex-col bg-white shadow-sm rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
          <div class="flex justify-between items-center mb-2">
            <h2 class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Current Streak</h2>
            <div class="w-8 h-8 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center">
              <i class="fas fa-fire text-sm"></i>
            </div>
          </div>
          <div class="text-3xl font-bold text-gray-800">{{ currentStreak || 0 }} <span class="text-sm font-medium text-gray-500">days</span></div>
        </div>

        <!-- Card 4 -->
        <div class="flex flex-col bg-white shadow-sm rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
          <div class="flex justify-between items-center mb-2">
            <h2 class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Today's Progress</h2>
            <div class="w-8 h-8 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center">
              <i class="fas fa-calendar-check text-sm"></i>
            </div>
          </div>
          <div class="text-3xl font-bold text-gray-800">{{ todaysCompletedCount }}/{{ todayHabits.length }}</div>
        </div>
      </div>

      <!-- Main Columns -->
      <div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        <!-- Left Column: Calendar (2/3 width on xl) -->
        <div class="xl:col-span-2 space-y-8">
          
          <div class="bg-white shadow-sm rounded-2xl border border-gray-100">
            <div class="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 class="text-lg font-bold text-gray-800">{{ formattedCurrentMonth }}</h2>
              <div class="flex space-x-2">
                <button @click="prevMonth" class="w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-600 transition-colors">
                  <i class="fas fa-chevron-left text-xs"></i>
                </button>
                <button @click="nextMonth" class="w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-600 transition-colors">
                  <i class="fas fa-chevron-right text-xs"></i>
                </button>
              </div>
            </div>
            <div class="p-6">
              <!-- Days Header -->
              <div class="grid grid-cols-7 gap-1 mb-2">
                <div v-for="day in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']" :key="day" class="text-center text-xs font-semibold text-gray-400 py-2">
                  {{ day }}
                </div>
              </div>
              <!-- Calendar Grid -->
              <div class="grid grid-cols-7 gap-1 lg:gap-2">
                <!-- Empty padding days -->
                <div v-for="empty in monthPaddingDays" :key="'empty-'+empty" class="aspect-square rounded-xl flex items-center justify-center text-gray-300 font-medium text-sm">
                  <!-- Previous month days can go here -->
                </div>
                <!-- Actual days -->
                <div v-for="day in calendarArray" :key="day.dayNum" 
                     @click="day.hasHabits ? selectDate(day.dateObj) : null"
                     :class="[
                       'relative aspect-square rounded-xl flex items-center justify-center font-medium text-sm transition-all',
                       day.isToday ? 'bg-indigo-50 text-indigo-700 ring-2 ring-indigo-500 ring-inset' : 'text-gray-700',
                       day.hasHabits ? 'cursor-pointer hover:bg-gray-50' : '',
                       day.isCompleted ? 'bg-emerald-50 text-emerald-700 font-bold' : ''
                     ]">
                  {{ day.dayNum }}
                  <div v-if="day.hasHabits && day.isCompleted" class="absolute bottom-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  <div v-else-if="day.hasHabits" class="absolute bottom-1.5 w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                </div>
              </div>

              <!-- Legend -->
              <div class="mt-6 flex items-center space-x-4 text-xs font-medium text-gray-500 justify-end">
                <div class="flex items-center">
                  <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 mr-2"></span> Completed
                </div>
                <div class="flex items-center">
                  <span class="w-2.5 h-2.5 rounded-full bg-gray-300 mr-2"></span> Pending
                </div>
                <div class="flex items-center">
                  <span class="block w-4 h-4 rounded border-2 border-indigo-500 mr-2"></span> Today
                </div>
              </div>
            </div>
          </div>
          
        </div>

        <!-- Right Column: Today's Habits -->
        <div class="space-y-8 xl:col-span-1">
          <!-- Today's Habits Card -->
          <div class="bg-white shadow-sm rounded-2xl border border-gray-100 flex flex-col h-[calc(100vh-12rem)] min-h-[500px]">
            <div class="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white rounded-t-2xl z-10">
              <h2 class="text-lg font-bold text-gray-800">{{ selectedDateLabel }} Habits</h2>
              <span class="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                {{ selectedDateCompletedCount }} of {{ displayedHabits.length }}
              </span>
            </div>
            
            <div class="p-4 flex-1 overflow-y-auto bg-gray-50/50">
              <div v-if="displayedHabits.length === 0" class="text-center py-12">
                <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                  <i class="fas fa-clipboard-list text-2xl"></i>
                </div>
                <h3 class="text-sm font-medium text-gray-900 mb-1">No habits scheduled</h3>
                <p class="text-xs text-gray-500 mb-4">You have a clear day today.</p>
                <Link :href="user.habits.add().url" class="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                  <i class="fas fa-plus mr-1.5 mb-[1px]"></i> Add Habit
                </Link>
              </div>

              <div v-else class="space-y-3">
                <div v-for="item in displayedHabits" :key="item.habit ? item.habit.id : item.id" 
                     class="bg-white border rounded-xl p-4 transition-all duration-200"
                     :class="item.completed ? 'border-emerald-200 shadow-sm bg-emerald-50/30' : 'border-gray-200 shadow-sm hover:border-gray-300 hover:shadow'">
                  <div class="flex items-start">
                    <div class="flex-1 flex items-center min-w-0 pr-4 cursor-pointer" @click="goToHabit(item.habit ? item.habit.id : item.id)">
                      <div class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors"
                           :class="item.completed ? 'bg-emerald-100 text-emerald-600' : 'bg-indigo-50 text-indigo-600'">
                        <i v-if="item.completed" class="fas fa-check"></i>
                        <i v-else class="fas fa-bullseye"></i>
                      </div>
                      <div class="ml-4 truncate">
                        <h3 class="text-sm font-bold text-gray-900 truncate" :class="item.completed ? 'text-emerald-900' : ''">
                          {{ item.habit ? item.habit.name : item.name }}
                        </h3>
                        <p class="text-xs text-gray-500 truncate mt-0.5">
                          {{ item.habit ? (item.habit.description || 'No description') : 'Click to view' }}
                        </p>
                      </div>
                    </div>
                    
                    <div class="flex-shrink-0 ml-auto flex flex-col items-end">
                      <span v-if="item.completed" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                        Done
                      </span>
                      <button v-else-if="isSelectedDateToday" @click="markAsDone(item.habit ? item.habit.id : item.id)" :disabled="isMarking === (item.habit ? item.habit.id : item.id)"
                              class="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-lg shadow-sm text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-50">
                        <i v-if="isMarking === (item.habit ? item.habit.id : item.id)" class="fas fa-spinner fa-spin mr-1.5"></i>
                        <i v-else class="fas fa-check text-gray-400 mr-1.5 group-hover:text-indigo-500"></i>
                        Mark Done
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </UserLayout>
</template>

<script setup>
import UserLayout from '@/Layouts/UserLayout.vue';
import { Head, Link, router } from '@inertiajs/vue3';
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import user from '@/routes/user';

const props = defineProps({
  habits: Array,
  notes: Array,
  activeHabits: Number,
  currentStreak: Number,
  completionRate: Number,
  todayHabits: Array,
  calendarData: Object,
});

const isMarking = ref(null);
const currentDate = ref(new Date());
const selectedDate = ref(new Date()); // The date selected to display habits for
const remoteCalendarData = ref(props.calendarData || {});

// Stats computed
const todaysCompletedCount = computed(() => {
  return props.todayHabits?.filter(h => h.completed).length || 0;
});

// Calendar Computed
const formattedCurrentMonth = computed(() => {
  return currentDate.value.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
});

const monthPaddingDays = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  return Array.from({ length: firstDay }, (_, i) => i);
});

const calendarArray = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  const todayString = today.toDateString();
  
  const days = [];
  for (let d = 1; d <= daysInMonth; d++) {
    const curObj = new Date(year, month, d);
    const dayHabits = remoteCalendarData.value[d] || [];
    
    // Check if it's a past date
    const isPast = curObj.setHours(0,0,0,0) < today.setHours(0,0,0,0);
    
    const visibleHabits = dayHabits.filter(h => !isPast || h.completed);
    const isCompleted = visibleHabits.some(h => h.completed) && visibleHabits.length > 0;
    
    days.push({
      dayNum: d,
      dateObj: new Date(year, month, d), // Keep purely local clean object
      isToday: curObj.toDateString() === todayString,
      isCompleted: isCompleted,
      hasHabits: visibleHabits.length > 0,
      habits: visibleHabits,
    });
  }
  return days;
});

// For Right Panel
const isSelectedDateToday = computed(() => {
  const today = new Date();
  return selectedDate.value.setHours(0,0,0,0) === today.setHours(0,0,0,0);
});

const selectedDateLabel = computed(() => {
  if (isSelectedDateToday.value) return "Today's";
  return selectedDate.value.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
});

// The list of habits shown on the right panel
const displayedHabits = computed(() => {
  // If showing today, use the prop which has full objects
  if (isSelectedDateToday.value) {
    return props.todayHabits || [];
  }
  
  // Otherwise, use the calendar data for that specific day
  const year = selectedDate.value.getFullYear();
  const month = selectedDate.value.getMonth();
  const day = selectedDate.value.getDate();
  
  // Only use calendar data if we're viewing that month
  if (year === currentDate.value.getFullYear() && month === currentDate.value.getMonth()) {
    const mappedDay = calendarArray.value.find(d => d.dayNum === day);
    return mappedDay ? mappedDay.habits : [];
  }
  return [];
});

const selectedDateCompletedCount = computed(() => {
  return displayedHabits.value.filter(h => h.completed).length;
});

// Methods
const selectDate = (date) => {
  selectedDate.value = date;
};

const goToHabit = (id) => {
  router.visit(user.habits.view({ id: id }).url);
};

const prevMonth = async () => {
  const newDate = new Date(currentDate.value);
  newDate.setMonth(newDate.getMonth() - 1);
  currentDate.value = newDate;
  await fetchMonthData();
};

const nextMonth = async () => {
  const newDate = new Date(currentDate.value);
  newDate.setMonth(newDate.getMonth() + 1);
  currentDate.value = newDate;
  await fetchMonthData();
};

const fetchMonthData = async () => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth() + 1;
  try {
    const res = await axios.get(`/user/habits/calendar-data?year=${year}&month=${month}`);
    if (res.data) {
      remoteCalendarData.value = res.data;
    }
  } catch (err) {
    console.error('Error fetching calendar', err);
  }
};

const markAsDone = async (habitId) => {
  isMarking.value = habitId;
  try {
    const res = await axios.post(`/user/habits/${habitId}/mark-done`);
    if (res.data.success) {
      // Refresh page data using Inertia to update props without full redirect
      router.reload({ only: ['todayHabits', 'completionRate', 'currentStreak', 'calendarData'] });
      // update local
      fetchMonthData();
    }
  } catch (error) {
    console.error('Error marking done:', error);
  } finally {
    isMarking.value = null;
  }
};
</script>
