@extends('user.main')

@section('title', 'Dashboard | ' . Auth::user()->firstname . ' ' . Auth::user()->lastname)
@section('active-link', 'dashboard')
@section('page-title', 'Dashboard')
@section('page-description', 'Track your habits and capture your thoughts')
@section('css-file', 'dashboard.css')
@section('js-file', 'dashboard.js')

@section('content')
@if (session('success'))
<div class="success-alert" style="margin: 20px; background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb; padding: 15px; border-radius: 5px; display: flex; align-items: center;">
  <span class="success-icon" style="font-weight: bold; font-size: 1.2em; margin-right: 10px;">✓</span>
  {{ session('success') }}
</div>
@endif
<!-- Stats Cards -->
<div class="stats-grid">
  <div class="stat-card">
    <div class="stat-header">
      <span class="stat-label">Habits</span>
      <div class="stat-icon green-icon">
        <i class="fas fa-list"></i>
      </div>
    </div>

    <div class="stat-value">{{ $activeHabits ?? 0 }}</div>

  </div>

  <div class="stat-card">
    <div class="stat-header">
      <span class="stat-label">Completion Rate</span>
      <div class="stat-icon blue-icon">
        <i class="fas fa-chart-line"></i>
      </div>
    </div>
    <div class="stat-value">{{ $completionRate ?? 0 }}%</div>
  </div>

  <div class="stat-card">
    <div class="stat-header">
      <span class="stat-label">Current Streak</span>
      <div class="stat-icon orange-icon">
        <i class="fas fa-fire"></i>
      </div>
    </div>

    <div class="stat-value">{{ $currentStreak ?? 0 }} days</div>

  </div>

  <div class="stat-card">
    <div class="stat-header">
      <span class="stat-label">Today's Progress</span>
      <div class="stat-icon purple-icon">
        <i class="fas fa-calendar-check"></i>
      </div>
    </div>

    <div class="stat-value">{{ isset($todayHabits) ? $todayHabits->where('completed', true)->count() . '/' . $todayHabits->count() : '0/0' }}</div>

  </div>
</div>

<!-- Main Content Grid -->
<div class="content-grid">
  <!-- Calendar Section -->
  <div class="calendar-section">
    <div class="calendar-card">
      <div class="calendar-header">
        <h2 class="calendar-title" id="dashboardCalendarTitle">{{ now()->format('F Y') }}</h2>
        <div class="calendar-nav">
          <button class="nav-btn" id="dashboardPrevMonth">
            <i class="fas fa-chevron-left"></i>
          </button>
          <button class="nav-btn" id="dashboardNextMonth">
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
        <div class="calendar-days" id="dashboardCalendarDays">
          <!-- Calendar days will be populated by JavaScript -->
        </div>
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

  <!-- Today's Habits Section -->
  <div class="habits-section">
    <div class="habits-card">
      <div class="habits-header">
        <h2 class="habits-title" id="habitsSectionTitle">Today's Habits</h2>
        <span class="habits-count" id="habitsCount">
          @if(isset($todayHabits) && $todayHabits->count() > 0)
          {{ $todayHabits->where('completed', true)->count() }} of {{ $todayHabits->count() }} completed
          @else
          0 of 0 completed
          @endif
        </span>
      </div>
      <div class="habits-list" id="habitsListContainer">
        @if(isset($todayHabits) && $todayHabits->count() > 0)
        @foreach($todayHabits as $item)
        <div class="habit-item {{ $item['completed'] ? 'completed' : '' }}" data-habit-id="{{ $item['habit']->id }}">
          <div class="habit-checkbox {{ $item['completed'] ? 'checked' : '' }}">
            @if($item['completed'])
            <i class="fas fa-check"></i>
            @endif
          </div>
          <div class="habit-info">
            <div class="habit-name">{{ $item['habit']->name }}</div>
            <div class="habit-desc">{{ $item['habit']->description ?: 'No description' }}</div>
          </div>
          @if($item['completed'])
          <span class="habit-status completed-status">Completed</span>
          @else
          <button class="mark-done-btn" onclick="markAsDone({{ $item['habit']->id }})">Mark Done</button>
          @endif
        </div>
        @endforeach
        @else
        <div style="text-align: center; padding: 40px 20px; color: #999;">
          <p>No habits scheduled for today.</p>
          <a href="{{ route('user.habits.add') }}?redirect_to=dashboard" style="display: inline-block; margin-top: 10px; color: #007bff; text-decoration: none;">
            <i class="fas fa-plus"></i> Add a habit
          </a>
        </div>
        @endif
      </div>
    </div>
  </div>
</div>

<script>
  // Dashboard Calendar Data
  const dashboardCalendarData = @json($calendarData ?? []);
  let dashboardCurrentDate = new Date();
  dashboardCurrentDate.setDate(1);

  // Render Dashboard Calendar
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

    // Update title
    if (title) {
      title.textContent = dashboardCurrentDate.toLocaleDateString('en-US', {
        month: 'long'
        , year: 'numeric'
      });
    }

    container.innerHTML = '';

    // Add empty cells for days before month starts
    for (let i = 0; i < firstDayIndex; i++) {
      const emptyDay = document.createElement('div');
      emptyDay.className = 'day';
      container.appendChild(emptyDay);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayElement = document.createElement('div');
      dayElement.className = 'day';
      dayElement.textContent = day;

      // Highlight today
      if (isCurrentMonth && day === today.getDate()) {
        dayElement.classList.add('today');
      }

      // Check if day has habits
      const dayHabits = dashboardCalendarData[day] || [];
      const hasCompleted = dayHabits.some(h => h.completed);
      const hasHabits = dayHabits.length > 0;

      if (hasCompleted) {
        dayElement.classList.add('completed');
      } else if (hasHabits) {
        // Show that day has habits scheduled (even if not completed)
        dayElement.style.border = '2px solid #007bff';
        dayElement.style.borderRadius = '50%';
      }

      // Add click handler - make all days with habits clickable
      if (hasHabits) {
        dayElement.style.cursor = 'pointer';
        dayElement.addEventListener('click', function() {
          showDayHabits(day, dayHabits);
        });
      }

      container.appendChild(dayElement);
    }
  }

  // Show habits for selected day in Today's Habits section
  function showDayHabits(day, habits) {
    const habitsList = document.getElementById('habitsListContainer');
    const habitsHeader = document.getElementById('habitsCount');
    const habitsTitle = document.getElementById('habitsSectionTitle');

    if (!habitsList || !habitsHeader) return;

    // Update title to show selected date
    const selectedDate = new Date(dashboardCurrentDate.getFullYear(), dashboardCurrentDate.getMonth(), day);
    const today = new Date();
    const isToday = selectedDate.toDateString() === today.toDateString();

    if (habitsTitle) {
      if (isToday) {
        habitsTitle.textContent = "Today's Habits";
      } else {
        const dateStr = selectedDate.toLocaleDateString('en-US', {
          weekday: 'long'
          , month: 'long'
          , day: 'numeric'
        });
        habitsTitle.textContent = dateStr + ' Habits';
      }
    }

    // Clear existing habits
    habitsList.innerHTML = '';

    if (habits.length === 0) {
      habitsList.innerHTML = '<div style="text-align: center; padding: 40px 20px; color: #999;"><p>No habits scheduled for this day.</p><a href="{{ route("user.habits.add") }}?redirect_to=dashboard" style="display: inline-block; margin-top: 10px; color: #007bff; text-decoration: none;"><i class="fas fa-plus"></i> Add a habit</a></div>';
      habitsHeader.textContent = '0 of 0 completed';
      return;
    }

    const completedCount = habits.filter(h => h.completed).length;
    habitsHeader.textContent = `${completedCount} of ${habits.length} completed`;

    // Add habits to list
    habits.forEach(habit => {
      const habitItem = document.createElement('div');
      habitItem.className = `habit-item ${habit.completed ? 'completed' : ''}`;
      habitItem.setAttribute('data-habit-id', habit.id);
      habitItem.innerHTML = `
      <div class="habit-checkbox ${habit.completed ? 'checked' : ''}">
        ${habit.completed ? '<i class="fas fa-check"></i>' : ''}
      </div>
      <div class="habit-info">
        <div class="habit-name">${habit.name}</div>
        <div class="habit-desc">Click to view details</div>
      </div>
      ${habit.completed ? 
        '<span class="habit-status completed-status">Completed</span>' : 
        `<button class="mark-done-btn" onclick="markAsDone(${habit.id})">Mark Done</button>`
      }
    `;

      // Make habit item clickable to view details
      habitItem.style.cursor = 'pointer';
      habitItem.addEventListener('click', function(e) {
        if (!e.target.classList.contains('mark-done-btn') && !e.target.closest('.mark-done-btn')) {
          window.location.href = `/user/habits/view/${habit.id}`;
        }
      });

      habitsList.appendChild(habitItem);
    });

    // Scroll to habits section smoothly
    document.querySelector('.habits-section').scrollIntoView({
      behavior: 'smooth'
      , block: 'nearest'
    });
  }

  // Month navigation
  document.getElementById('dashboardPrevMonth') ? .addEventListener('click', function() {
    dashboardCurrentDate.setMonth(dashboardCurrentDate.getMonth() - 1);
    fetchDashboardCalendarData();
  });

  document.getElementById('dashboardNextMonth') ? .addEventListener('click', function() {
    dashboardCurrentDate.setMonth(dashboardCurrentDate.getMonth() + 1);
    fetchDashboardCalendarData();
  });

  // Fetch calendar data for dashboard
  async function fetchDashboardCalendarData() {
    const year = dashboardCurrentDate.getFullYear();
    const month = dashboardCurrentDate.getMonth() + 1;

    try {
      const response = await fetch(`/user/habits/calendar-data?year=${year}&month=${month}`, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
          , 'Accept': 'application/json'
        , }
        , credentials: 'same-origin'
      });

      if (response.ok) {
        const data = await response.json();
        // Clear existing calendar data
        Object.keys(dashboardCalendarData).forEach(key => delete dashboardCalendarData[key]);
        // Update with new data
        Object.assign(dashboardCalendarData, data);
        // Re-render calendar with updated data
        renderDashboardCalendar();

        // If viewing current month and today, show today's habits
        const today = new Date();
        if (year === today.getFullYear() && month === today.getMonth()) {
          const todayDay = today.getDate();
          const todayHabits = dashboardCalendarData[todayDay] || [];
          const habitsTitle = document.getElementById('habitsSectionTitle');
          // Only update if we're showing today's habits
          if (habitsTitle && habitsTitle.textContent.includes("Today")) {
            if (todayHabits.length > 0) {
              showDayHabits(todayDay, todayHabits);
            } else {
              // Refresh today's habits to get latest data
              fetchTodayHabits();
            }
          }
        }
      }
    } catch (error) {
      console.error('Error fetching calendar data:', error);
    }
  }

  // Fetch and update today's habits
  async function fetchTodayHabits() {
    try {
      const response = await fetch('{{ route("user.today-habits") }}', {
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
          , 'Accept': 'application/json'
        , }
        , credentials: 'same-origin'
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          updateTodayHabits(data.habits);
          updateDashboardStats(data.stats);
        }
      }
    } catch (error) {
      console.error('Error fetching today habits:', error);
    }
  }

  function updateTodayHabits(habits) {
    const habitsList = document.getElementById('habitsListContainer');
    const habitsCount = document.getElementById('habitsCount');
    const habitsTitle = document.getElementById('habitsSectionTitle');

    if (!habitsList || !habitsCount) return;

    // Only update if we're showing today's habits
    if (habitsTitle && habitsTitle.textContent.includes("Today")) {
      const completedCount = habits.filter(h => h.completed).length;
      habitsCount.textContent = `${completedCount} of ${habits.length} completed`;

      habitsList.innerHTML = '';

      if (habits.length === 0) {
        habitsList.innerHTML = '<div style="text-align: center; padding: 40px 20px; color: #999;"><p>No habits scheduled for today.</p><a href="{{ route("user.habits.add") }}?redirect_to=dashboard" style="display: inline-block; margin-top: 10px; color: #007bff; text-decoration: none;"><i class="fas fa-plus"></i> Add a habit</a></div>';
        return;
      }

      habits.forEach(habit => {
        const habitItem = document.createElement('div');
        habitItem.className = `habit-item ${habit.completed ? 'completed' : ''}`;
        habitItem.setAttribute('data-habit-id', habit.id);
        habitItem.innerHTML = `
        <div class="habit-checkbox ${habit.completed ? 'checked' : ''}">
          ${habit.completed ? '<i class="fas fa-check"></i>' : ''}
        </div>
        <div class="habit-info">
          <div class="habit-name">${habit.name}</div>
          <div class="habit-desc">${habit.description}</div>
        </div>
        ${habit.completed ? 
          '<span class="habit-status completed-status">Completed</span>' : 
          `<button class="mark-done-btn" onclick="markAsDone(${habit.id})">Mark Done</button>`
        }
      `;

        habitItem.style.cursor = 'pointer';
        habitItem.addEventListener('click', function(e) {
          if (!e.target.classList.contains('mark-done-btn') && !e.target.closest('.mark-done-btn')) {
            window.location.href = `/user/habits/view/${habit.id}`;
          }
        });

        habitsList.appendChild(habitItem);
      });
    }
  }

  function updateDashboardStats(stats) {
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
      const label = card.querySelector('.stat-label');
      if (label) {
        if (label.textContent.trim() === 'Active Habits') {
          const valueEl = card.querySelector('.stat-value');
          if (valueEl) valueEl.textContent = stats.activeHabits;
        } else if (label.textContent.trim() === 'Completion Rate') {
          const valueEl = card.querySelector('.stat-value');
          if (valueEl) valueEl.textContent = stats.completionRate + '%';
        } else if (label.textContent.trim() === 'Current Streak') {
          const valueEl = card.querySelector('.stat-value');
          if (valueEl) valueEl.textContent = stats.currentStreak + ' days';
        } else if (label.textContent.trim() === "Today's Progress") {
          const valueEl = card.querySelector('.stat-value');
          if (valueEl) valueEl.textContent = stats.todayProgress;
        }
      }
    });
  }

  // Initialize dashboard calendar
  document.addEventListener('DOMContentLoaded', function() {
    renderDashboardCalendar();
    fetchTodayHabits(); // Fetch today's habits on load
    fetchDashboardCalendarData(); // Fetch calendar data on load

    // Auto-refresh every 30 seconds
    setInterval(() => {
      fetchTodayHabits();
      const today = new Date();
      if (dashboardCurrentDate.getFullYear() === today.getFullYear() &&
        dashboardCurrentDate.getMonth() === today.getMonth()) {
        fetchDashboardCalendarData();
      }
    }, 30000);

    // Also refresh when page becomes visible (user switches tabs back)
    document.addEventListener('visibilitychange', function() {
      if (!document.hidden) {
        fetchTodayHabits();
        const today = new Date();
        if (dashboardCurrentDate.getFullYear() === today.getFullYear() &&
          dashboardCurrentDate.getMonth() === today.getMonth()) {
          fetchDashboardCalendarData();
        }
      }
    });

    // Refresh after coming back from adding a habit (check URL params)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('habit_added')) {
      // Small delay to ensure server has processed the new habit
      setTimeout(() => {
        fetchTodayHabits();
        fetchDashboardCalendarData();
      }, 500);
      // Clean URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }

  });

  function markAsDone(habitId) {
    const button = event.target.closest('.mark-done-btn');
    const habitItem = button.closest('.habit-item');
    const originalText = button.innerHTML;

    // Disable button and show loading state
    button.disabled = true;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Marking...';

    fetch(`/user/habits/${habitId}/mark-done`, {
        method: 'POST'
        , headers: {
          'Content-Type': 'application/json'
          , 'X-CSRF-TOKEN': '{{ csrf_token() }}'
          , 'X-Requested-With': 'XMLHttpRequest'
        }
        , credentials: 'same-origin'
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // Change button to completed state
          button.className = 'mark-done-btn completed';
          button.innerHTML = '<i class="fas fa-check-circle"></i> Completed';
          button.disabled = true;
          button.style.background = '#10b981';
          button.style.color = 'white';
          button.style.cursor = 'default';

          // Update habit item
          if (habitItem) {
            habitItem.classList.add('completed');
            const checkbox = habitItem.querySelector('.habit-checkbox');
            if (checkbox) {
              checkbox.classList.add('checked');
              checkbox.innerHTML = '<i class="fas fa-check"></i>';
            }

            // Replace button with completed status
            const statusSpan = document.createElement('span');
            statusSpan.className = 'habit-status completed-status';
            statusSpan.textContent = 'Completed';
            button.replaceWith(statusSpan);
          }

          // Update count
          const countElement = document.getElementById('habitsCount');
          if (countElement) {
            const match = countElement.textContent.match(/(\d+) of (\d+)/);
            if (match) {
              const completed = parseInt(match[1]) + 1;
              const total = parseInt(match[2]);
              countElement.textContent = `${completed} of ${total} completed`;
            }
          }

          // Refresh today's habits and stats
          fetchTodayHabits();
          // Refresh calendar data
          fetchDashboardCalendarData();

          // Refresh notifications
          if (typeof window.refreshNotifications === 'function') {
            window.refreshNotifications();
          }

          // Show success message
          const successMsg = document.createElement('div');
          successMsg.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #10b981; color: white; padding: 12px 20px; border-radius: 8px; z-index: 10000; box-shadow: 0 4px 12px rgba(0,0,0,0.15);';
          successMsg.innerHTML = '<i class="fas fa-check-circle"></i> ' + data.message;
          document.body.appendChild(successMsg);
          setTimeout(() => successMsg.remove(), 3000);

        } else {
          button.disabled = false;
          button.innerHTML = originalText;
          alert(data.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        button.disabled = false;
        button.innerHTML = originalText;
        alert('An error occurred. Please try again.');
      });
  }

</script>
@endsection
