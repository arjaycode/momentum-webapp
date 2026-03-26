<template>
  <UserLayout>
    <Head title="Calendar" />

    <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      <!-- Header -->
      <div class="sm:flex sm:justify-between sm:items-center mb-8">
        <div class="mb-4 sm:mb-0">
          <h1 class="text-2xl md:text-3xl text-gray-800 font-bold tracking-tight">Calendar 📅</h1>
          <p class="text-sm text-gray-500 mt-1">View your completion history mapped out across the month.</p>
        </div>
      </div>

      <!-- Calendar Viewer Wrapper -->
      <div class="bg-white shadow-sm rounded-2xl border border-gray-100 p-6 xl:w-2/3 mx-auto">
        <div class="p-6 border-b border-gray-100 flex justify-between items-center mb-6">
          <h2 class="text-xl font-bold text-gray-800">{{ formattedCurrentMonth }}</h2>
          <div class="flex space-x-2">
            <button @click="prevMonth" class="w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-600 transition-colors">
              <i class="fas fa-chevron-left text-xs"></i>
            </button>
            <button @click="today" class="px-3 rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-sm font-medium transition-colors">
              Today
            </button>
            <button @click="nextMonth" class="w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-600 transition-colors">
              <i class="fas fa-chevron-right text-xs"></i>
            </button>
          </div>
        </div>
        
        <!-- Days Header -->
        <div class="grid grid-cols-7 gap-2 mb-2">
          <div v-for="day in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']" :key="day" class="text-center text-sm font-bold text-gray-500 py-2">
            {{ day }}
          </div>
        </div>
        
        <!-- Calendar Grid -->
        <div class="grid grid-cols-7 gap-2">
          <!-- Empty padding days -->
          <div v-for="empty in monthPaddingDays" :key="'empty-'+empty" class="aspect-square rounded-xl bg-gray-50/50 border border-transparent"></div>
          
          <!-- Actual days -->
          <div v-for="day in calendarArray" :key="day.dayNum" 
                :class="[
                  'relative aspect-square rounded-xl flex flex-col p-2 border transition-all',
                  day.isToday ? 'bg-indigo-50 border-indigo-200' : 'bg-white border-gray-100',
                  day.isCompleted ? 'bg-emerald-50 border-emerald-100' : ''
                ]">
            <span class="text-sm font-semibold" :class="day.isToday || day.isCompleted ? 'text-gray-900' : 'text-gray-500'">{{ day.dayNum }}</span>
            <div class="mt-auto flex justify-end">
              <i v-if="day.isCompleted" class="fas fa-check-circle text-emerald-500"></i>
            </div>
          </div>
        </div>
      </div>

    </div>
  </UserLayout>
</template>

<script setup>
import UserLayout from '@/Layouts/UserLayout.vue';
import { Head } from '@inertiajs/vue3';
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

const currentDate = ref(new Date());
const calendarData = ref({});

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
    const dayHabits = calendarData.value[d] || [];
    
    // Check if it's a past date
    const isPast = curObj.setHours(0,0,0,0) < today.setHours(0,0,0,0);
    const visibleHabits = dayHabits.filter(h => !isPast || h.completed);
    const isCompleted = visibleHabits.some(h => h.completed) && visibleHabits.length > 0;
    
    days.push({
      dayNum: d,
      dateObj: new Date(year, month, d),
      isToday: curObj.toDateString() === todayString,
      isCompleted: isCompleted,
    });
  }
  return days;
});

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

const today = async () => {
  currentDate.value = new Date();
  await fetchMonthData();
};

const fetchMonthData = async () => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth() + 1;
  try {
    const res = await axios.get(`/user/habits/calendar-data?year=${year}&month=${month}`);
    if (res.data) {
      calendarData.value = res.data;
    }
  } catch (err) {
    console.error('Error fetching calendar', err);
  }
};

onMounted(() => {
  fetchMonthData();
});
</script>
