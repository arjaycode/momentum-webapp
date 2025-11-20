@props(['active' => 'dashboard'])

<!-- Sidebar -->
<aside class="sidebar">
  <div class="logo">
    <div class="logo-icon">
      <i class="fas fa-chart-line"></i>
    </div>
    <span class="logo-text">MOMENTUM</span>
  </div>

  <nav class="nav-menu">

    {{-- Dashboard --}}
    <a href="{{ route('dashboard') }}" class="nav-item {{ $active === 'dashboard' ? 'active' : '' }}">
      <i class="fas fa-chart-line"></i>
      <span>Dashboard</span>
    </a>

    {{-- Users --}}
    <a href="{{ route('user-management') }}" class="nav-item {{ $active === 'users' ? 'active' : '' }}">
      <i class="fas fa-users"></i>
      <span>Users</span>
    </a>

    {{-- Habits --}}
    <a href="#" class="nav-item {{ $active === 'habits' ? 'active' : '' }}">
      <i class="fas fa-heart"></i>
      <span>Habits</span>
    </a>

    {{-- Notes --}}
    <a href="#" class="nav-item {{ $active === 'notes' ? 'active' : '' }}">
      <i class="fas fa-sticky-note"></i>
      <span>Notes</span>
    </a>

    {{-- Settings --}}
    <a href="#" class="nav-item {{ $active === 'settings' ? 'active' : '' }}">
      <i class="fas fa-cog"></i>
      <span>Settings</span>
    </a>

    {{-- Logout --}}
    <a href="#" class="nav-item">
      <i class="fas fa-sign-out-alt"></i>
      <span>Logout</span>
    </a>

  </nav>

  <div class="user-profile">
    <img src="https://i.pravatar.cc/40?img=12" alt="John Admin" class="profile-img" />
    <div class="profile-info">
      <div class="profile-name">John Admin</div>
      <div class="profile-role">Administrator</div>
    </div>
  </div>
</aside>
