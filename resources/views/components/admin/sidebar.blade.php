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
    <a href="{{ route('admin.dashboard') }}" class="nav-item {{ $active === 'dashboard' ? 'active' : '' }}">
      <i class="fas fa-chart-line"></i>
      <span>Dashboard</span>
    </a>

    {{-- Users --}}
    <a href="{{ route('admin.user-management') }}" class="nav-item {{ $active === 'users' ? 'active' : '' }}">
      <i class="fas fa-users"></i>
      <span>Users</span>
    </a>

    {{-- Habits --}}
    <a href="{{ route('admin.habit-management') }}" class="nav-item {{ $active === 'habits' ? 'active' : '' }}">
      <i class="fas fa-heart"></i>
      <span>Habit Categories</span>
    </a>

    {{-- Notes --}}
    <a href="{{ route('admin.note-management') }}" class="nav-item {{ $active === 'notes' ? 'active' : '' }}">
      <i class="fas fa-sticky-note"></i>
      <span>Notes</span>
    </a>

    {{-- Settings --}}
    <a href="{{ route('admin.settings') }}" class="nav-item {{ $active === 'settings' ? 'active' : '' }}">
      <i class="fas fa-cog"></i>
      <span>Settings</span>
    </a>

    {{-- Logout --}}
    <form action="{{ route('logout') }}" class="nav-item" method="POST">
      @csrf
      <button type="submit" class="logout-btn">
        <i class="fas fa-sign-out-alt"></i>
        <span>Logout</span>
      </button>
    </form>
  </nav>

  <div class="user-profile">
    <img src="https://i.pravatar.cc/40?img=12" alt="John Admin" class="profile-img" />
    <div class="profile-info">
      <div class="profile-name">{{ Auth::user()->firstname }}</div>
      <div class="profile-role">{{ Auth::user()->role }}</div>
    </div>
  </div>
</aside>
