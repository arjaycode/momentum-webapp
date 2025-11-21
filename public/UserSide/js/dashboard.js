// Calendar functionality
class Calendar {
  constructor() {
    this.currentDate = new Date();
    this.selectedDate = new Date();
    this.init();
  }

  init() {
    this.renderCalendar();
    this.attachEventListeners();
  }

  attachEventListeners() {
    const prevBtn = document.querySelector(
      '.calendar-nav .nav-btn:first-child'
    );
    const nextBtn = document.querySelector('.calendar-nav .nav-btn:last-child');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => this.previousMonth());
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.nextMonth());
    }
  }

  previousMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.renderCalendar();
  }

  nextMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.renderCalendar();
  }

  renderCalendar() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    // Update calendar title
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const calendarTitle = document.querySelector('.calendar-title');
    if (calendarTitle) {
      calendarTitle.textContent = `${monthNames[month]} ${year}`;
    }

    // Get first day of month and number of days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    // Get today's date for comparison
    const today = new Date();
    const isCurrentMonth =
      today.getMonth() === month && today.getFullYear() === year;
    const todayDate = today.getDate();

    // Clear existing calendar days
    const calendarDays = document.querySelector('.calendar-days');
    if (!calendarDays) return;

    calendarDays.innerHTML = '';

    // Add previous month's trailing days
    for (let i = firstDay - 1; i >= 0; i--) {
      const day = document.createElement('div');
      day.className = 'day prev-month';
      day.textContent = daysInPrevMonth - i;
      calendarDays.appendChild(day);
    }

    // Add current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      const day = document.createElement('div');
      day.className = 'day';
      day.textContent = i;

      // Mark today
      if (isCurrentMonth && i === todayDate) {
        day.classList.add('today');
      }

      // Mark completed days (randomly for demo - you can replace with actual data)
      if (i <= todayDate - 1 && isCurrentMonth) {
        if (Math.random() > 0.3) {
          // 70% chance of completion
          day.classList.add('completed');
        }
      }

      // Add click event
      day.addEventListener('click', () => this.selectDate(i));

      calendarDays.appendChild(day);
    }

    // Add next month's leading days
    const totalCells = calendarDays.children.length;
    const remainingCells = 42 - totalCells; // 6 rows * 7 days
    for (let i = 1; i <= remainingCells; i++) {
      const day = document.createElement('div');
      day.className = 'day next-month';
      day.textContent = i;
      calendarDays.appendChild(day);
    }
  }

  selectDate(day) {
    this.selectedDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
      day
    );
    console.log('Selected date:', this.selectedDate.toDateString());
    // You can add custom logic here for date selection
  }

  // Method to mark a day as completed
  markDayCompleted(day) {
    const days = document.querySelectorAll('.calendar-days .day');
    days.forEach((dayElement) => {
      if (
        dayElement.textContent == day &&
        !dayElement.classList.contains('prev-month') &&
        !dayElement.classList.contains('next-month')
      ) {
        dayElement.classList.add('completed');
      }
    });
  }

  // Method to get current month and year
  getCurrentMonthYear() {
    return {
      month: this.currentDate.getMonth(),
      year: this.currentDate.getFullYear(),
    };
  }
}

// Initialize calendar when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const calendar = new Calendar();

  // Make calendar instance globally available if needed
  window.habitCalendar = calendar;
});

// Optional: Add resize handling
window.addEventListener('resize', () => {
  // Calendar automatically adjusts with CSS, but you can add custom logic here if needed
  console.log('Window resized');
});
