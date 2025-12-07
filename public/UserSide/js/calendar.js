// Use the current date for initialization for a truly dynamic feel
let currentDate = new Date();
currentDate.setDate(1); // Set to the 1st to ensure proper month calculation

// Real habit data from database
let currentHabitData = {};
let habitCategories = {};

// Fetch real habit data from the server
async function fetchHabitData(year, month) {
  try {
    const response = await fetch(`/user/habits/calendar-data?year=${year}&month=${month}`, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
      },
      credentials: 'same-origin'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch habit data');
    }

    const data = await response.json();
    currentHabitData = data;
    
    // Update legend with real habits
    updateLegend(data);
    
    return data;
  } catch (error) {
    console.error('Error fetching habit data:', error);
    currentHabitData = {};
    return {};
  }
}

// Update legend with real habits
function updateLegend(habitData) {
  const legendContainer = document.querySelector('.legend-items');
  if (!legendContainer) return;

  // Collect unique habits from the data
  const uniqueHabits = {};
  Object.values(habitData).forEach(dayHabits => {
    dayHabits.forEach(habit => {
      if (!uniqueHabits[habit.id]) {
        uniqueHabits[habit.id] = habit;
      }
    });
  });

  // Clear existing legend (except title)
  legendContainer.innerHTML = '';

  // Add legend items for each habit
  Object.values(uniqueHabits).forEach(habit => {
    const legendItem = document.createElement('div');
    legendItem.className = 'legend-item';
    legendItem.setAttribute('data-habit-id', habit.id);
    legendItem.setAttribute('tabindex', '0');
    
    const colorClass = habit.color || 'blue';
    legendItem.innerHTML = `
      <div class="legend-dot ${colorClass}"></div>
      <span class="legend-label">${habit.name}</span>
    `;
    
    legendItem.addEventListener('click', function() {
      document.getElementById('calendarGrid').classList.toggle(`filter-${habit.id}`);
      this.classList.toggle('active-filter');
    });
    
    legendContainer.appendChild(legendItem);
  });

  // If no habits, show empty message
  if (Object.keys(uniqueHabits).length === 0) {
    legendContainer.innerHTML = '<p style="color: #999; font-size: 14px;">No habits yet. Add your first habit to see it here!</p>';
  }
}

// function updateHeaderDate() {
//   const headerDateElement = document.getElementById('headerDate');
//   headerDateElement.textContent = new Date().toLocaleDateString('en-US', {
//     weekday: 'long',
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//   });
// }

async function renderCalendar() {
  const grid = document.getElementById('calendarGrid');
  const month = currentDate.getMonth() + 1; // JavaScript months are 0-indexed, but API expects 1-indexed
  const year = currentDate.getFullYear();

  // Fetch real data for the new month
  await fetchHabitData(year, month);
  
  // Use 0-indexed month for JavaScript Date operations
  const jsMonth = month - 1;

  // Update month display
  document.getElementById('currentMonth').textContent =
    currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  // Get first day of month (0=Sun, 6=Sat) and number of days
  const firstDayIndex = new Date(year, jsMonth, 1).getDay();
  const daysInMonth = new Date(year, jsMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, jsMonth, 0).getDate();
  const today = new Date();
  const isCurrentMonth =
    year === today.getFullYear() && jsMonth === today.getMonth();

  // Clear existing days (keep headers)
  const headers = Array.from(grid.querySelectorAll('.calendar-day-header'));
  grid.innerHTML = '';
  headers.forEach((header) => grid.appendChild(header));

  // 1. Add previous month days
  for (let i = 0; i < firstDayIndex; i++) {
    const day = daysInPrevMonth - firstDayIndex + i + 1;
    const dayElement = createDayElement(day, true);
    grid.appendChild(dayElement);
  }

  // 2. Add current month days
  for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = createDayElement(day, false);

    // Highlight today
    if (isCurrentMonth && day === today.getDate()) {
      dayElement.classList.add('today');
    }

    // Add habit dots
    const habits = currentHabitData[day] || [];
    if (habits.length > 0) {
      const dots = document.createElement('div');
      dots.className = 'habit-dots';

      habits.forEach((habit) => {
        const dot = document.createElement('div');
        const colorClass = habit.color || 'blue';
        dot.className = `habit-dot ${colorClass}`;
        dot.title = habit.name;
        if (habit.completed) {
          dot.classList.add('completed');
        }
        dots.appendChild(dot);
      });

      dayElement.appendChild(dots);
    }

    // Add click listener - fetch habits for this specific day
    dayElement.addEventListener('click', () => {
      // Get habits for this specific day from currentHabitData
      const dayHabits = currentHabitData[day] || [];
      showDayDetail(day, dayHabits);
    });
    grid.appendChild(dayElement);
  }

  // 3. Add next month days (to fill the grid)
  const totalCells = grid.children.length - 7;
  const remainingCells = 42 - totalCells; // Max 6 rows * 7 days = 42

  for (let day = 1; day <= remainingCells; day++) {
    const dayElement = createDayElement(day, true);
    grid.appendChild(dayElement);
  }
}

function createDayElement(day, otherMonth) {
  const dayElement = document.createElement('div');
  dayElement.className = 'calendar-day';
  if (otherMonth) dayElement.classList.add('other-month');

  const dayNumber = document.createElement('div');
  dayNumber.className = 'day-number';
  dayNumber.textContent = day;
  dayElement.appendChild(dayNumber);

  return dayElement;
}

function showDayDetail(day, habits) {
  const popup = document.getElementById('dayDetailPopup');
  const overlay = document.getElementById('popupOverlay');
  const title = document.getElementById('popupTitle');
  const habitsContainer = document.getElementById('popupHabits');
  
  const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
  const dateStr = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  title.textContent = dateStr;
  habitsContainer.innerHTML = '';

  if (habits.length === 0) {
    habitsContainer.innerHTML =
      '<p class="empty-habits">No habits scheduled for this day.</p>';
  } else {
    habits.forEach((habit) => {
      const habitItem = document.createElement('div');
      habitItem.className = 'popup-habit-item';
      const colorClass = habit.color || 'blue';
      habitItem.setAttribute('data-habit-id', habit.id);
      habitItem.innerHTML = `
                        <div class="popup-habit-dot ${colorClass} ${habit.completed ? 'completed' : ''}"></div>
                        <div class="popup-habit-info">
                            <div class="popup-habit-name">${habit.name}</div>
                            <div class="popup-habit-status">${habit.completed ? '✓ Completed' : '○ Pending'}</div>
                        </div>
                    `;
      // Interactive element in popup
      habitItem.addEventListener('click', () => {
        window.location.href = `/user/habits/view/${habit.id}`;
      });
      habitsContainer.appendChild(habitItem);
    });
  }

  popup.classList.add('active');
  overlay.classList.add('active');
}

function closeDayDetail() {
  document.getElementById('dayDetailPopup').classList.remove('active');
  document.getElementById('popupOverlay').classList.remove('active');
}

// // --- NEW INTERACTIVITY FUNCTIONS ---
// const searchBtn = document.getElementById('searchBtn');
// const searchPopover = document.getElementById('searchPopover');
// // const notificationBtn = document.getElementById('notificationBtn');
// const notificationPopover = document.getElementById('notificationPopover');

// function togglePopover(popover, button) {
//   const isActive = popover.classList.contains('active');

//   // Close other popover if open
//   if (
//     popover === searchPopover &&
//     notificationPopover.classList.contains('active')
//   ) {
//     notificationPopover.classList.remove('active');
//     notificationBtn.classList.remove('active-btn');
//   } else if (
//     popover === notificationPopover &&
//     searchPopover.classList.contains('active')
//   ) {
//     searchPopover.classList.remove('active');
//     searchBtn.classList.remove('active-btn');
//   }

//   // Toggle current popover
//   popover.classList.toggle('active');
//   button.classList.toggle('active-btn');

//   // Focus on search input when active
//   if (popover === searchPopover && popover.classList.contains('active')) {
//     document.getElementById('searchInput').focus();
//   }
// }

// // Function to close popovers when clicking outside
// function closePopovers(event) {
//   const isClickInsideSearch =
//     searchPopover.contains(event.target) || searchBtn.contains(event.target);
//   const isClickInsideNotif =
//     notificationPopover.contains(event.target) ||
//     notificationBtn.contains(event.target);

//   if (!isClickInsideSearch) {
//     searchPopover.classList.remove('active');
//     searchBtn.classList.remove('active-btn');
//   }
//   if (!isClickInsideNotif) {
//     notificationPopover.classList.remove('active');
//     notificationBtn.classList.remove('active-btn');
//   }
// }

// // --- Event Listeners and Interaction ---

// // Search and Notification Toggles
// searchBtn.addEventListener('click', (e) => {
//   e.stopPropagation();
//   togglePopover(searchPopover, searchBtn);
// });

// notificationBtn.addEventListener('click', (e) => {
//   e.stopPropagation();
//   togglePopover(notificationPopover, notificationBtn);
// });

// // Close popovers when clicking anywhere on the document (unless inside a popover/button)
// document.addEventListener('click', (e) => {
//   closePopovers(e);
//   // Also keep the existing day detail close logic
//   if (document.getElementById('popupOverlay').classList.contains('active')) {
//     // Do nothing if day detail is open, it has its own overlay/close logic
//   } else if (
//     !document.querySelector('.calendar-day').contains(e.target) &&
//     !document.getElementById('dayDetailPopup').contains(e.target)
//   ) {
//     // If clicked outside day details, do nothing here. The existing logic handles the calendar popover.
//   }
// });

// // Prevent clicking inside the popover from closing it immediately
// searchPopover.addEventListener('click', (e) => e.stopPropagation());
// notificationPopover.addEventListener('click', (e) => e.stopPropagation());

// // Search Input Interaction (Simple logging)
// document.getElementById('searchInput').addEventListener('input', function () {
//   const query = this.value;
//   const resultsDiv = document.querySelector('.search-results');
//   if (query.length > 0) {
//     resultsDiv.innerHTML = `Searching for: **${query}**...<br>_Simulated search found 3 items._`;
//   } else {
//     resultsDiv.innerHTML = 'Try searching for "reading" or "December".';
//   }
// });

// Month Navigation
document.getElementById('prevMonth').addEventListener('click', async () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  await renderCalendar();
});

document.getElementById('nextMonth').addEventListener('click', async () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  await renderCalendar();
});

// Popup Close
document.getElementById('closePopup').addEventListener('click', closeDayDetail);
document
  .getElementById('popupOverlay')
  .addEventListener('click', closeDayDetail);

// View Toggle Interaction
document.querySelectorAll('.view-btn').forEach((btn) => {
  btn.addEventListener('click', function () {
    document
      .querySelectorAll('.view-btn')
      .forEach((b) => b.classList.remove('active'));
    this.classList.add('active');
    // Simulate view change (professional: don't use 'alert' in final app)
    console.log(`Switched to ${this.dataset.view} view.`);
  });
});

// Legend Item Interaction (Filter/Highlight) - handled in updateLegend function

// // Keyboard Accessibility
// document.addEventListener('keydown', (e) => {
//   if (e.key === 'Escape') {
//     closeDayDetail();
//     // Also close the popovers on escape
//     searchPopover.classList.remove('active');
//     searchBtn.classList.remove('active-btn');
//     notificationPopover.classList.remove('active');
//     notificationBtn.classList.remove('active-btn');
//   } else if (
//     e.key === 'ArrowLeft' &&
//     !document.getElementById('popupOverlay').classList.contains('active') &&
//     !searchPopover.classList.contains('active') &&
//     !notificationPopover.classList.contains('active')
//   ) {
//     document.getElementById('prevMonth').click();
//   } else if (
//     e.key === 'ArrowRight' &&
//     !document.getElementById('popupOverlay').classList.contains('active') &&
//     !searchPopover.classList.contains('active') &&
//     !notificationPopover.classList.contains('active')
//   ) {
//     document.getElementById('nextMonth').click();
//   }
// });

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
  // Initial render
  renderCalendar();
  
  // Check for success message and refresh if habit was just added
  if (document.querySelector('.success-alert') || window.location.search.includes('success')) {
    setTimeout(function() {
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();
      fetchHabitData(year, month).then(() => {
        renderCalendar();
      });
    }, 1000);
  }
});

// Auto-refresh calendar when page becomes visible (e.g., after adding a habit)
document.addEventListener('visibilitychange', function() {
  if (!document.hidden) {
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    fetchHabitData(year, month).then(() => {
      renderCalendar();
    });
  }
});

// Refresh calendar data periodically (every 30 seconds) to catch new habits
setInterval(function() {
  if (!document.hidden) {
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    fetchHabitData(year, month).then(() => {
      renderCalendar();
    });
  }
}, 30000); // 30 seconds
