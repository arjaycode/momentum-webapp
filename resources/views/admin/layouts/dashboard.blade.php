@extends('admin.main')

@section('title', 'Admin Dashboard - Momentum')
@section('active-link', 'dashboard')
@section('page-title', 'Dashboard')
@section('page-description', 'Monitor your platform\'s performance and user engagement')
@section('css-file', 'dashboard.css')
@section('js-file', 'dashboard.js')

@section('content')
<!-- Main Content -->
<main class="main-content">
  <!-- Stats Cards -->
  <div class="stats-grid">
    <div class="stat-card" data-stat="total_users">
      <div class="stat-header">
        <span class="stat-label">Total Users</span>
        <div class="stat-icon blue">
          <i class="fas fa-users"></i>
        </div>
      </div>
      <div class="stat-value" data-value="{{ $users->count() }}">{{ $users->count() }}</div>
    </div>

    <div class="stat-card" data-stat="created_habits">
      <div class="stat-header">
        <span class="stat-label">Created Habits</span>
        <div class="stat-icon purple">
          <i class="fas fa-heart"></i>
        </div>
      </div>
      <div class="stat-value" data-value="{{ $habits->count() }}">{{ number_format($habits->count()) }}</div>
    </div>

    <div class="stat-card" data-stat="notes_created">
      <div class="stat-header">
        <span class="stat-label">Notes Created</span>
        <div class="stat-icon yellow">
          <i class="fas fa-sticky-note"></i>
        </div>
      </div>
      <div class="stat-value" data-value="{{ $notes->count() }}">{{ number_format($notes->count()) }}</div>
    </div>

    <div class="stat-card" data-stat="inactive_users">
      <div class="stat-header">
        <span class="stat-label">Inactive Users</span>
        <div class="stat-icon orange">
          <i class="fas fa-user-slash"></i>
        </div>
      </div>
      <div class="stat-value" data-value="{{ $users->where('status', 'inactive')->count() }}">{{ $users->where('status', 'inactive')->count() }}</div>
    </div>

    <div class="stat-card" data-stat="banned_users">
      <div class="stat-header">
        <span class="stat-label">Banned Users</span>
        <div class="stat-icon red">
          <i class="fas fa-user-times"></i>
        </div>
      </div>
      <div class="stat-value" data-value="{{ $users->where('status', 'blocked')->count() }}">{{ $users->where('status', 'blocked')->count() }}</div>
    </div>
  </div>

  <!-- Charts Section -->
  <div class="charts-grid">
    <div class="chart-card large">
      <div class="chart-header">
        <h3 class="chart-title">Habit Completion Rate</h3>
        <select class="chart-select">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 90 days</option>
        </select>
      </div>
      <canvas id="habitCompletionChart" data-labels="{{ json_encode($labels) }}" data-data="{{ json_encode($completionData) }}"></canvas>
    </div>

    <div class="chart-card">
      <div class="chart-header">
        <h3 class="chart-title">User Activity</h3>
        <div class="chart-tabs">
          <button class="chart-tab active">Daily</button>
          <button class="chart-tab">Weekly</button>
          <button class="chart-tab">Monthly</button>
        </div>
      </div>
      <canvas id="userActivityChart" data-labels="{{ json_encode($activityLabels) }}" data-data="{{ json_encode($activityData) }}"></canvas>
    </div>
  </div>

  <!-- Bottom Section -->
  <div class="bottom-grid">
    <div class="card">
      <h3 class="card-title">Popular Habits</h3>
      <div class="habits-list">
        @forelse($popularHabits as $habit)
        <div class="habit-item">
          <div class="habit-icon {{ $habit['color'] }}">
            <i class="fas fa-{{ $habit['icon'] }}"></i>
          </div>
          <div class="habit-info">
            <div class="habit-name">{{ $habit['name'] }}</div>
            <div class="habit-users">{{ number_format($habit['user_count']) }} {{ $habit['user_count'] == 1 ? 'user' : 'users' }}</div>
          </div>
          <div class="habit-completion">{{ $habit['completion_rate'] }}%</div>
        </div>
        @empty
        <div class="habit-item">
          <div class="habit-info">
            <div class="habit-name">No habits yet</div>
          </div>
        </div>
        @endforelse
      </div>
    </div>

    <div class="card">
      <h3 class="card-title">Recent Users</h3>
      <div class="users-list">
        @forelse($recentUsers as $user)
        <div class="user-item">
          <img src="{{ $user['avatar'] }}" alt="{{ $user['name'] }}" class="user-avatar" />
          <div class="user-info">
            <div class="user-name">{{ $user['name'] }}</div>
            <div class="user-joined">Joined {{ $user['joined'] }}</div>
          </div>
          <div class="user-status {{ $user['status'] === 'active' ? 'online' : ($user['status'] === 'inactive' ? 'away' : 'offline') }}"></div>
        </div>
        @empty
        <div class="user-item">
          <div class="user-info">
            <div class="user-name">No users yet</div>
          </div>
        </div>
        @endforelse
      </div>
    </div>

    <div class="card">
      <h3 class="card-title">Notes Analytics</h3>
      <div class="notes-analytics">
        @php
          $totalNotes = $notes->count();
          $dailyPercent = $totalNotes > 0 ? min(100, round(($dailyNotes / max(1, $totalNotes)) * 100)) : 0;
          $habitPercent = $totalNotes > 0 ? min(100, round(($habitNotes / max(1, $totalNotes)) * 100)) : 0;
          $goalPercent = $totalNotes > 0 ? min(100, round(($goalNotes / max(1, $totalNotes)) * 100)) : 0;
        @endphp
        <div class="note-stat">
          <div class="note-label">Daily Notes</div>
          <div class="note-bar">
            <div class="note-progress" style="width: {{ $dailyPercent }}%; background: #667eea"></div>
          </div>
          <div class="note-value">{{ number_format($dailyNotes) }}</div>
        </div>
        <div class="note-stat">
          <div class="note-label">Habit Notes</div>
          <div class="note-bar">
            <div class="note-progress" style="width: {{ $habitPercent }}%; background: #764ba2"></div>
          </div>
          <div class="note-value">{{ number_format($habitNotes) }}</div>
        </div>
        <div class="note-stat">
          <div class="note-label">Goal Notes</div>
          <div class="note-bar">
            <div class="note-progress" style="width: {{ $goalPercent }}%; background: #10b981"></div>
          </div>
          <div class="note-value">{{ number_format($goalNotes) }}</div>
        </div>
        <div class="completion-stat">
          <div class="completion-value">{{ $notesWithHabitsPercent }}%</div>
          <div class="completion-label">Notes with habits</div>
        </div>
      </div>
    </div>
  </div>
</main>
@endsection
