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

    {{-- Habits Management --}}
    <a href="{{ route('admin.habits.index') }}" class="nav-item {{ $active === 'habits-management' ? 'active' : '' }}">
      <i class="fas fa-list-check"></i>
      <span>Habits Management</span>
    </a>

    {{-- Habit Categories --}}
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

  <a href="{{ route('admin.settings') }}" class="user-profile" title="Go to Settings">
    <img src="{{ Auth::user()->avatar ? asset('storage/' . Auth::user()->avatar) : 'https://ui-avatars.com/api/?name=' . urlencode(Auth::user()->firstname . ' ' . Auth::user()->lastname) . '&background=random' }}" alt="{{ Auth::user()->firstname }}" class="profile-img" />
    <div class="profile-info">
      <div class="profile-name">{{ Auth::user()->firstname }} {{ Auth::user()->lastname }}</div>
      <div class="profile-role">{{ ucfirst(Auth::user()->role) }}</div>
    </div>
    <i class="fas fa-chevron-right profile-arrow"></i>
  </a>
</aside>
