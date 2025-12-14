/* ============================================
   ADMIN NOTIFICATIONS SYSTEM
   ============================================ */

let notificationPanelOpen = false;

// ============================================
// 1. INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  loadNotifications();
  // Auto-refresh notifications every 30 seconds
  setInterval(loadNotifications, 30000);
});

// ============================================
// 2. PANEL TOGGLE
// ============================================
function toggleNotificationPanel() {
  const panel = document.getElementById('notificationPanel');
  notificationPanelOpen = !notificationPanelOpen;
  
  if (notificationPanelOpen) {
    panel.classList.add('active');
    loadNotifications();
  } else {
    panel.classList.remove('active');
  }
}

// Close panel when clicking outside
document.addEventListener('click', function(event) {
  const wrapper = document.querySelector('.notification-wrapper');
  const panel = document.getElementById('notificationPanel');
  const btn = document.getElementById('notificationBtn');
  
  if (notificationPanelOpen && 
      !wrapper.contains(event.target) && 
      !panel.contains(event.target)) {
    panel.classList.remove('active');
    notificationPanelOpen = false;
  }
});

// ============================================
// 3. LOAD NOTIFICATIONS
// ============================================
function loadNotifications() {
  const notificationsRoute = document.querySelector('meta[name="notifications-route"]')?.content || '/admin/notifications';
  fetch(notificationsRoute, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || ''
    },
    credentials: 'same-origin'
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      updateNotificationBadge(data.unread_count);
      if (notificationPanelOpen) {
        renderNotifications(data.notifications);
      }
    }
  })
  .catch(error => {
    console.error('Error loading notifications:', error);
  });
}

// ============================================
// 4. BADGE MANAGEMENT
// ============================================
function updateNotificationBadge(count) {
  const badge = document.getElementById('notificationBadge');
  if (count > 0) {
    badge.textContent = count > 99 ? '99+' : count;
    badge.style.display = 'flex';
  } else {
    badge.style.display = 'none';
  }
}

// ============================================
// 5. RENDER NOTIFICATIONS
// ============================================
function renderNotifications(notifications) {
  const list = document.getElementById('notificationList');
  const empty = document.getElementById('notificationEmpty');
  
  if (notifications.length === 0) {
    list.style.display = 'none';
    empty.style.display = 'block';
    return;
  }
  
  list.style.display = 'block';
  empty.style.display = 'none';
  
  list.innerHTML = notifications.map(notif => {
    const link = notif.link || '';
    const escapedLink = link.replace(/'/g, "\\'");
    return `
    <div class="notification-item ${notif.read ? '' : 'unread'}" onclick="markAsRead(${notif.id}, '${escapedLink}')">
      <div class="notification-item-icon" style="background: ${(notif.color || '#e67e50')}20; color: ${notif.color || '#e67e50'};">
        <i class="${notif.icon || 'fas fa-bell'}"></i>
      </div>
      <div class="notification-item-content">
        <div class="notification-item-title">${escapeHtml(notif.title || 'Notification')}</div>
        <div class="notification-item-message">${escapeHtml(notif.message || '')}</div>
        <div class="notification-item-time">${escapeHtml(notif.time || '')}</div>
      </div>
    </div>
  `;
  }).join('');
}

// Escape HTML to prevent XSS attacks
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ============================================
// 6. NOTIFICATION ACTIONS
// ============================================
function markAsRead(id, link) {
  const baseUrl = window.location.origin;
  fetch(`${baseUrl}/admin/notifications/${id}/read`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || ''
    },
    credentials: 'same-origin'
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      loadNotifications();
      if (link) {
        window.location.href = link;
      }
    }
  })
  .catch(error => {
    console.error('Error marking notification as read:', error);
    if (link) {
      window.location.href = link;
    }
  });
}

function clearNotifications() {
  if (!confirm('Are you sure you want to clear all notifications?')) {
    return;
  }
  
  const clearRoute = document.querySelector('meta[name="notifications-clear-route"]')?.content || '/admin/notifications/clear';
  fetch(clearRoute, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || ''
    },
    credentials: 'same-origin'
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      loadNotifications();
    }
  })
  .catch(error => {
    console.error('Error clearing notifications:', error);
  });
}

