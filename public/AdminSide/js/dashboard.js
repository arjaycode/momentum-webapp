// Chart.js Configuration
Chart.defaults.font.family =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
Chart.defaults.color = '#666';

// Habit Completion Rate Chart
const habitCtx = document.getElementById('habitCompletionChart');
const habitChart = new Chart(habitCtx, {
  type: 'line',
  data: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Completion Rate',
        data: [85, 78, 88, 92, 87, 82, 86],
        borderColor: '#667eea',
        backgroundColor: 'rgba(102, 126, 234, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#667eea',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        align: 'start',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 13,
          },
        },
      },
      tooltip: {
        backgroundColor: '#1a1a1a',
        padding: 12,
        titleFont: {
          size: 13,
        },
        bodyFont: {
          size: 14,
          weight: 'bold',
        },
        displayColors: false,
        callbacks: {
          label: function (context) {
            return context.parsed.y + '%';
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 0,
        max: 100,
        ticks: {
          stepSize: 25,
          callback: function (value) {
            return value;
          },
          font: {
            size: 12,
          },
        },
        grid: {
          color: '#f0f0f0',
          drawBorder: false,
        },
        border: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          font: {
            size: 12,
          },
        },
        border: {
          display: false,
        },
      },
    },
  },
});

// User Activity Chart
const activityCtx = document.getElementById('userActivityChart');
const activityChart = new Chart(activityCtx, {
  type: 'bar',
  data: {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
    datasets: [
      {
        label: 'Active Users',
        data: [150, 0, 500, 520, 650, 480],
        backgroundColor: '#ff7849',
        borderRadius: 6,
        barThickness: 60,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        align: 'start',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 13,
          },
        },
      },
      tooltip: {
        backgroundColor: '#1a1a1a',
        padding: 12,
        titleFont: {
          size: 13,
        },
        bodyFont: {
          size: 14,
          weight: 'bold',
        },
        displayColors: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 800,
        ticks: {
          stepSize: 200,
          font: {
            size: 12,
          },
        },
        grid: {
          color: '#f0f0f0',
          drawBorder: false,
        },
        border: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          font: {
            size: 12,
          },
        },
        border: {
          display: false,
        },
      },
    },
  },
});

// Chart Tabs Functionality
const chartTabs = document.querySelectorAll('.chart-tab');
chartTabs.forEach((tab) => {
  tab.addEventListener('click', function () {
    chartTabs.forEach((t) => t.classList.remove('active'));
    this.classList.add('active');

    // Update chart data based on selected tab
    const tabText = this.textContent;
    if (tabText === 'Daily') {
      activityChart.data.labels = [
        '00:00',
        '04:00',
        '08:00',
        '12:00',
        '16:00',
        '20:00',
      ];
      activityChart.data.datasets[0].data = [150, 0, 500, 520, 650, 480];
    } else if (tabText === 'Weekly') {
      activityChart.data.labels = [
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat',
        'Sun',
      ];
      activityChart.data.datasets[0].data = [
        3200, 3400, 3800, 4100, 3900, 2800, 2500,
      ];
    } else if (tabText === 'Monthly') {
      activityChart.data.labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
      activityChart.data.datasets[0].data = [18500, 19200, 20100, 19800];
    }
    activityChart.update();
  });
});

// Dropdown functionality
const chartSelect = document.querySelector('.chart-select');
chartSelect.addEventListener('change', function () {
  // Update habit completion chart based on selected time range
  if (this.value === 'Last 7 days') {
    habitChart.data.labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    habitChart.data.datasets[0].data = [85, 78, 88, 92, 87, 82, 86];
  } else if (this.value === 'Last 30 days') {
    habitChart.data.labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    habitChart.data.datasets[0].data = [82, 85, 88, 86];
  } else if (this.value === 'Last 90 days') {
    habitChart.data.labels = ['Month 1', 'Month 2', 'Month 3'];
    habitChart.data.datasets[0].data = [80, 85, 87];
  }
  habitChart.update();
});

// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
      });
    }
  });
});

// Animation on scroll for stat cards
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.stat-card, .chart-card, .card').forEach((el) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// Initialize animations after page load
window.addEventListener('load', function () {
  setTimeout(() => {
    document
      .querySelectorAll('.stat-card, .chart-card, .card')
      .forEach((el, index) => {
        setTimeout(() => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, index * 50);
      });
  }, 100);
});

// Wait for the document to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
  // Find the logout button by its ID
  const logoutBtn = document.getElementById('logoutButton');

  // Add a click event listener
  logoutBtn.addEventListener('click', function (e) {
    // Prevent the default link behavior (jumping to the top)
    e.preventDefault();

    // Show the alert message
    window.location.href = 'admin_signin.html';

    // Optional: After the user clicks "OK", you can redirect them
    // window.location.href = '/login.html';
  });
});
