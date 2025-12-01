@props(['activePage' => 'dashboard'])

<nav class="sidebar">
  <div class="sidebar-header">
    <div class="logo">
      {{-- Ensure the asset path exists in your public folder --}}
      <img src="{{ asset('UserSide/img/Logo.png') }}" alt="Logo" />
    </div>
    <h1 class="app-name">MOMENTUM</h1>
  </div>

  <ul class="nav-menu">
    {{-- Dashboard Item --}}
    <li @class(['nav-item', 'active'=> $activePage === 'dashboard'])>
      <a href="{{ route('user.dashboard') }}" style="display: flex; align-items: center; color: inherit; text-decoration: none; width: 100%;">
        <i class="fas fa-chart-line"></i>
        <span>Dashboard</span>
      </a>
    </li>

    {{-- Habits Item --}}
    <li @class(['nav-item', 'active'=> $activePage === 'habits'])>
      <a href="{{ route('user.habits') }}" style="display: flex; align-items: center; color: inherit; text-decoration: none; width: 100%;">
        <i class="fas fa-list-check"></i>
        <span>Habits</span>
      </a>
    </li>

    {{-- Calendar Item --}}
    <li @class(['nav-item', 'active'=> $activePage === 'calendar'])>
      <a href="{{ route('user.calendar') }}" style="display: flex; align-items: center; color: inherit; text-decoration: none; width: 100%;">
        <i class="far fa-calendar"></i>
        <span>Calendar</span>
      </a>
    </li>

    {{-- Settings Item --}}
    <li @class(['nav-item', 'active'=> $activePage === 'settings'])>
      <a href="{{ route('user.settings') }}" style="display: flex; align-items: center; color: inherit; text-decoration: none; width: 100%;">
        <i class="fas fa-gear"></i>
        <span>Settings</span>
      </a>
    </li>
  </ul>

  <div class="user-profile">
    <img src="https://i.pravatar.cc/150?img=12" alt="User Avatar" class="avatar" />
    <div class="user-info">
      <div class="user-name">{{ Auth::user()->firstname." ".Auth::user()->lastname}}</div>
      <div class="user-role">{{ Auth::user()->role }}</div>
    </div>
    <form method="POST" action="{{ route('logout') }}">
      @csrf
      <button type="submit" title="logout" class="logout-btn"><i class="fa-solid fa-arrow-right-from-bracket"></i></button>
    </form>
  </div>
</nav>
