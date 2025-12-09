// Chart.js Configuration
Chart.defaults.font.family =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
Chart.defaults.color = '#666';

// Global chart variables
let habitChart = null;
let activityChart = null;

// Initialize charts
function initializeCharts() {
  // Habit Completion Rate Chart
  const habitCtx = document.getElementById('habitCompletionChart');
  if (!habitCtx) return;
  
  const habitLabels = habitCtx ? JSON.parse(habitCtx.getAttribute('data-labels') || '[]') : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const habitData = habitCtx ? JSON.parse(habitCtx.getAttribute('data-data') || '[]') : [85, 78, 88, 92, 87, 82, 86];

  // Destroy existing chart if it exists
  if (habitChart) {
    habitChart.destroy();
  }

  habitChart = new Chart(habitCtx, {
  type: 'line',
  data: {
    labels: habitLabels,
    datasets: [
      {
        label: 'Completion Rate',
        data: habitData,
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
  if (!activityCtx) return;
  
  const activityLabels = activityCtx ? JSON.parse(activityCtx.getAttribute('data-labels') || '[]') : ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'];
  const activityData = activityCtx ? JSON.parse(activityCtx.getAttribute('data-data') || '[]') : [150, 0, 500, 520, 650, 480];
  const maxActivity = activityData.length > 0 ? Math.max(...activityData) : 800;

  // Destroy existing chart if it exists
  if (activityChart) {
    activityChart.destroy();
  }

  activityChart = new Chart(activityCtx, {
  type: 'bar',
  data: {
    labels: activityLabels,
    datasets: [
      {
        label: 'Active Users',
        data: activityData,
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
        max: Math.max(800, Math.ceil(maxActivity / 200) * 200),
        ticks: {
          stepSize: Math.max(200, Math.ceil(maxActivity / 4)),
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

  // Initialize chart tabs and dropdown after charts are created
  setupChartControls();
}

// Setup chart controls (dropdown and tabs)
function setupChartControls() {
  // Chart Tabs Functionality
  const chartTabs = document.querySelectorAll('.chart-tab');
  if (chartTabs.length > 0) {
    chartTabs.forEach((tab) => {
      tab.addEventListener('click', function () {
        chartTabs.forEach((t) => t.classList.remove('active'));
        this.classList.add('active');

        const tabText = this.textContent.toLowerCase();
        fetchChartData(null, tabText);
      });
    });
  }

  // Dropdown functionality
  const chartSelect = document.querySelector('.chart-select');
  if (chartSelect) {
    chartSelect.addEventListener('change', function () {
      const selectedValue = this.value;
      let days = 7;
      if (selectedValue.includes('30')) days = 30;
      else if (selectedValue.includes('90')) days = 90;
      
      fetchChartData(days, null);
    });
  }
}

// Fetch chart data from API
function fetchChartData(period = null, activityType = null) {
  const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
  const currentPeriod = period || document.querySelector('.chart-select')?.value || 'Last 7 days';
  const currentActivityType = activityType || document.querySelector('.chart-tab.active')?.textContent.toLowerCase() || 'daily';
  
  // Extract days from period text
  let days = 7;
  if (currentPeriod.includes('30')) days = 30;
  else if (currentPeriod.includes('90')) days = 90;
  
  const url = `/admin/dashboard/chart-data?period=${days}&activity_type=${currentActivityType}`;
  
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRF-TOKEN': csrfToken || ''
    },
    credentials: 'same-origin'
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    if (data.success) {
      // Update habit completion chart
      if (habitChart && data.completion) {
        habitChart.data.labels = data.completion.labels;
        habitChart.data.datasets[0].data = data.completion.data;
        habitChart.update('active');
      }
      
      // Update user activity chart
      if (activityChart && data.activity) {
        activityChart.data.labels = data.activity.labels;
        activityChart.data.datasets[0].data = data.activity.data;
        
        // Update max value for y-axis
        const maxActivity = data.activity.data.length > 0 ? Math.max(...data.activity.data) : 800;
        activityChart.options.scales.y.max = Math.max(800, Math.ceil(maxActivity / 200) * 200);
        activityChart.options.scales.y.ticks.stepSize = Math.max(200, Math.ceil(maxActivity / 4));
        
        activityChart.update('active');
      }
    }
  })
  .catch(error => {
    console.error('Error fetching chart data:', error);
  });
}

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

// Live Statistics Update
(function() {
  'use strict';
  
  const statsUpdateInterval = 30000; // Update every 30 seconds
  let updateTimer = null;
  
  // Function to format numbers with commas
  function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  
  // Function to animate number change
  function animateValue(element, start, end, duration = 500) {
    const startTime = performance.now();
    const isNumber = typeof end === 'number';
    
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      if (isNumber) {
        const current = Math.round(start + (end - start) * easeOut);
        element.textContent = formatNumber(current);
      } else {
        element.textContent = formatNumber(end);
      }
      
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = formatNumber(end);
      }
    }
    
    requestAnimationFrame(update);
  }
  
  // Function to update a stat card
  function updateStatCard(statKey, newValue) {
    const statCard = document.querySelector(`[data-stat="${statKey}"]`);
    if (!statCard) return;
    
    const valueElement = statCard.querySelector('.stat-value');
    if (!valueElement) return;
    
    const currentValue = parseInt(valueElement.getAttribute('data-value')) || 0;
    const newValueInt = parseInt(newValue) || 0;
    
    if (currentValue !== newValueInt) {
      // Add highlight animation
      statCard.style.transition = 'all 0.3s ease';
      statCard.style.transform = 'scale(1.05)';
      statCard.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
      
      setTimeout(() => {
        statCard.style.transform = 'scale(1)';
        statCard.style.boxShadow = '';
      }, 300);
      
      // Animate the value change
      animateValue(valueElement, currentValue, newValueInt);
      valueElement.setAttribute('data-value', newValueInt);
    }
  }
  
  // Function to fetch and update statistics
  function updateStatistics() {
    const statsUrl = '/admin/dashboard/stats';
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    
    fetch(statsUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN': csrfToken || ''
      },
      credentials: 'same-origin'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (data.success && data.stats) {
        // Update each stat card
        updateStatCard('total_users', data.stats.total_users);
        updateStatCard('created_habits', data.stats.created_habits);
        updateStatCard('notes_created', data.stats.notes_created);
        updateStatCard('inactive_users', data.stats.inactive_users);
        updateStatCard('banned_users', data.stats.banned_users);
        
        console.log('Statistics updated successfully');
      } else {
        console.error('Failed to update statistics:', data.message || 'Unknown error');
      }
    })
    .catch(error => {
      console.error('Error fetching statistics:', error);
      // Don't show error to user, just log it
    });
  }
  
  // Start auto-update when page loads
  function startLiveUpdates() {
    // Update immediately on load
    updateStatistics();
    
    // Then update every 30 seconds
    updateTimer = setInterval(updateStatistics, statsUpdateInterval);
    
    console.log('Live statistics updates started (every ' + (statsUpdateInterval / 1000) + ' seconds)');
  }
  
  // Stop auto-update (useful if page becomes hidden)
  function stopLiveUpdates() {
    if (updateTimer) {
      clearInterval(updateTimer);
      updateTimer = null;
      console.log('Live statistics updates stopped');
    }
  }
  
  // Start updates when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startLiveUpdates);
  } else {
    startLiveUpdates();
  }
  
  // Pause updates when page is hidden (to save resources)
  document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
      stopLiveUpdates();
    } else {
      startLiveUpdates();
    }
  });
  
  // Clean up on page unload
  window.addEventListener('beforeunload', stopLiveUpdates);
  
  // Expose update function globally for manual updates if needed
  window.updateDashboardStats = updateStatistics;
  
  // Also update charts periodically
  function updateCharts() {
    fetchChartData();
  }
  
  // Update charts every 60 seconds
  setInterval(updateCharts, 60000);
  
  // Expose chart update function
  window.updateDashboardCharts = updateCharts;
})();

// Initialize charts when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initializeCharts, 100); // Small delay to ensure canvas is rendered
  });
} else {
  setTimeout(initializeCharts, 100);
}
