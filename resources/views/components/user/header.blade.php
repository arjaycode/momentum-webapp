@props([
'pageTitle' => 'Dashboard',
'pageDescription' => ''
])

<header class="main-header">
  <div class="header-left">
    <h1 class="header-title">{{ $pageTitle }}</h1>
    <p class="header-subtitle">
      {{ $pageDescription }}
    </p>
  </div>
  <div class="header-right">
    <div class="notification-container">
      <button class="icon-button notification-button" id="headerNotificationButton">
        <i class="fas fa-bell"></i>
        <span id="notificationBadge" class="notification-badge">0</span>
      </button>
      <div id="notificationDropdown" class="notification-dropdown">
        <div class="notification-header">
          <h3>Notifications</h3>
          <button id="clearNotifications">Clear all</button>
        </div>
        <div id="notificationList" class="notification-list">
          <!-- Notifications will be populated here -->
        </div>
        <div id="noNotifications">
          <i class="fas fa-bell-slash"></i>
          <p>No notifications</p>
        </div>
      </div>
    </div>
    <div class="header-date">{{ now()->format('l, F j, Y') }}</div>
  </div>
</header>

<script>
// Header Notification Functionality
(function() {
  const notificationButton = document.getElementById('headerNotificationButton');
  const notificationDropdown = document.getElementById('notificationDropdown');
  const notificationList = document.getElementById('notificationList');
  const notificationBadge = document.getElementById('notificationBadge');
  const noNotifications = document.getElementById('noNotifications');
  const clearNotifications = document.getElementById('clearNotifications');

  function loadNotifications() {
    fetch('{{ route("user.notifications") }}', {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
      },
      credentials: 'same-origin'
    })
    .then(response => response.json())
    .then(data => {
      if (data.success && data.notifications && data.notifications.length > 0) {
        notificationList.innerHTML = data.notifications.map(notif => `
          <div class="notification-item" style="padding: 12px 16px; border-bottom: 1px solid #f0f0f0; cursor: pointer; transition: background 0.2s;" onclick="window.location.href='${notif.link || '#'}'">
            <div style="display: flex; align-items: start; gap: 12px;">
              <div style="width: 40px; height: 40px; border-radius: 50%; background: ${notif.color || '#007bff'}; display: flex; align-items: center; justify-content: center; color: white; font-size: 18px; flex-shrink: 0;">
                <i class="${notif.icon || 'fas fa-check'}"></i>
              </div>
              <div style="flex: 1;">
                <div style="font-weight: 600; font-size: 14px; margin-bottom: 4px;">${notif.title}</div>
                <div style="font-size: 12px; color: #666; margin-bottom: 4px;">${notif.message}</div>
                <div style="font-size: 11px; color: #999;">${notif.time}</div>
              </div>
            </div>
          </div>
        `).join('');
        notificationBadge.textContent = data.unread_count || 0;
        if (data.unread_count > 0) {
          notificationBadge.style.display = 'flex';
        } else {
          notificationBadge.style.display = 'none';
        }
        noNotifications.style.display = 'none';
      } else {
        notificationList.innerHTML = '';
        notificationBadge.style.display = 'none';
        noNotifications.style.display = 'block';
      }
    })
    .catch(error => {
      console.error('Notification error:', error);
      notificationList.innerHTML = '';
      noNotifications.style.display = 'block';
    });
  }

  notificationButton.addEventListener('click', function(e) {
    e.stopPropagation();
    const isVisible = notificationDropdown.style.display === 'block' || notificationDropdown.style.display === 'flex';
    if (isVisible) {
      notificationDropdown.style.display = 'none';
    } else {
      notificationDropdown.style.display = 'block';
      loadNotifications();
    }
  });

  clearNotifications.addEventListener('click', function(e) {
    e.stopPropagation();
    fetch('{{ route("user.notifications.clear") }}', {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN': '{{ csrf_token() }}',
        'Accept': 'application/json',
      },
      credentials: 'same-origin'
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        loadNotifications();
        // Also update badge
        updateNotificationBadgeOnly();
      }
    })
    .catch(error => {
      console.error('Error clearing notifications:', error);
    });
  });

  function updateNotificationBadgeOnly() {
    fetch('{{ route("user.notifications") }}', {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
      },
      credentials: 'same-origin'
    })
    .then(response => response.json())
    .then(data => {
      notificationBadge.textContent = data.unread_count || 0;
      notificationBadge.style.display = (data.unread_count > 0) ? 'flex' : 'none';
    })
    .catch(error => {
      console.error('Error updating notification badge:', error);
    });
  }

  // Refresh notifications after page actions (add/edit/delete habits)
  // This will be called from other pages after successful actions
  window.refreshNotifications = function() {
    updateNotificationBadgeOnly();
    // If dropdown is open, reload notifications
    if (notificationDropdown.style.display === 'block' || notificationDropdown.style.display === 'flex') {
      loadNotifications();
    }
  };

  // Auto-refresh notification badge every 30 seconds
  setInterval(updateNotificationBadgeOnly, 30000);

  // Close dropdown when clicking outside
  document.addEventListener('click', function(e) {
    if (!notificationButton.contains(e.target) && !notificationDropdown.contains(e.target)) {
      notificationDropdown.style.display = 'none';
    }
  });

  // Only load badge count on page load, not the full dropdown
  // Load full notifications only when dropdown is opened
  fetch('{{ route("user.notifications") }}', {
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Accept': 'application/json',
    },
    credentials: 'same-origin'
  })
  .then(response => response.json())
  .then(data => {
    if (data.unread_count > 0) {
      notificationBadge.textContent = data.unread_count;
      notificationBadge.style.display = 'flex';
    } else {
      notificationBadge.style.display = 'none';
    }
  })
  .catch(error => {
    console.error('Notification badge error:', error);
  });
  
  // Refresh badge count every 30 seconds (but not the full dropdown)
  setInterval(function() {
    if (notificationDropdown.style.display === 'none' || !notificationDropdown.style.display) {
      fetch('{{ route("user.notifications") }}', {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Accept': 'application/json',
        },
        credentials: 'same-origin'
      })
      .then(response => response.json())
      .then(data => {
        if (data.unread_count > 0) {
          notificationBadge.textContent = data.unread_count;
          notificationBadge.style.display = 'flex';
        } else {
          notificationBadge.style.display = 'none';
        }
      })
      .catch(error => {
        console.error('Notification badge refresh error:', error);
      });
    }
  }, 30000);
})();
</script>
