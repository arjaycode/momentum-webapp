@props([
'pageTitle' => 'Page Title',
'description' => ''
])

<header class="header">
  <div class="header-left">
    <h1 class="page-title">{!! $pageTitle !!}</h1>

    @if ($description)
    <p class="page-subtitle">
      {!! $description !!}
    </p>
    @endif
  </div>

  <div class="header-right">
    <div class="notification-wrapper">
      <button class="icon-btn notification-btn" id="notificationBtn" onclick="toggleNotificationPanel()">
        <i class="fas fa-bell"></i>
        <span class="notification-badge" id="notificationBadge" style="display: none;">0</span>
      </button>
      <div class="notification-panel" id="notificationPanel">
        <div class="notification-header">
          <h3>Notifications</h3>
          <button class="clear-btn" onclick="clearNotifications()">Clear All</button>
        </div>
        <div class="notification-list" id="notificationList">
          <div class="notification-loading">Loading notifications...</div>
        </div>
        <div class="notification-empty" id="notificationEmpty" style="display: none;">
          <i class="fas fa-bell-slash"></i>
          <p>No notifications</p>
        </div>
      </div>
    </div>

    <span class="date-display">
      {{ now()->format('l, F d, Y') }}
    </span>
  </div>
</header>
