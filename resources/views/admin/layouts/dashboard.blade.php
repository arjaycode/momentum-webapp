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
    <div class="stat-card">
      <div class="stat-header">
        <span class="stat-label">Total Users</span>
        <div class="stat-icon blue">
          <i class="fas fa-users"></i>
        </div>
      </div>
      <div class="stat-value">{{ $users->count()}}</div>
    </div>

    <div class="stat-card">
      <div class="stat-header">
        <span class="stat-label">Created Habits</span>
        <div class="stat-icon purple">
          <i class="fas fa-heart"></i>
        </div>
      </div>
      <div class="stat-value">8,234</div>
    </div>

    <div class="stat-card">
      <div class="stat-header">
        <span class="stat-label">Notes Created</span>
        <div class="stat-icon yellow">
          <i class="fas fa-sticky-note"></i>
        </div>
      </div>
      <div class="stat-value">24,567</div>
    </div>

    <div class="stat-card">
      <div class="stat-header">
        <span class="stat-label">Inactive Users</span>
        <div class="stat-icon orange">
          <i class="fas fa-user-slash"></i>
        </div>
      </div>
      <div class="stat-value">{{ $users->where('status', 'inactive')->count() }}</div>
    </div>

    <div class="stat-card">
      <div class="stat-header">
        <span class="stat-label">Banned Users</span>
        <div class="stat-icon red">
          <i class="fas fa-user-times"></i>
        </div>
      </div>
      <div class="stat-value">{{ $users->where('status', 'blocked')->count() }}</div>
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
      <canvas id="habitCompletionChart"></canvas>
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
      <canvas id="userActivityChart"></canvas>
    </div>
  </div>

  <!-- Bottom Section -->
  <div class="bottom-grid">
    <div class="card">
      <h3 class="card-title">Popular Habits</h3>
      <div class="habits-list">
        <div class="habit-item">
          <div class="habit-icon green">
            <i class="fas fa-running"></i>
          </div>
          <div class="habit-info">
            <div class="habit-name">Daily Exercise</div>
            <div class="habit-users">2,847 users</div>
          </div>
          <div class="habit-completion">85%</div>
        </div>
        <div class="habit-item">
          <div class="habit-icon blue">
            <i class="fas fa-book"></i>
          </div>
          <div class="habit-info">
            <div class="habit-name">Reading</div>
            <div class="habit-users">1,856 users</div>
          </div>
          <div class="habit-completion">72%</div>
        </div>
        <div class="habit-item">
          <div class="habit-icon purple">
            <i class="fas fa-spa"></i>
          </div>
          <div class="habit-info">
            <div class="habit-name">Meditation</div>
            <div class="habit-users">1,567 users</div>
          </div>
          <div class="habit-completion">68%</div>
        </div>
        <div class="habit-item">
          <div class="habit-icon yellow">
            <i class="fas fa-glass-water"></i>
          </div>
          <div class="habit-info">
            <div class="habit-name">Drink Water</div>
            <div class="habit-users">3,124 users</div>
          </div>
          <div class="habit-completion">91%</div>
        </div>
      </div>
    </div>

    <div class="card">
      <h3 class="card-title">Recent Users</h3>
      <div class="users-list">
        <div class="user-item">
          <img src="https://i.pravatar.cc/40?img=1" alt="Sarah Johnson" class="user-avatar" />
          <div class="user-info">
            <div class="user-name">Sarah Johnson</div>
            <div class="user-joined">Joined 2 hours ago</div>
          </div>
          <div class="user-status online"></div>
        </div>
        <div class="user-item">
          <img src="https://i.pravatar.cc/40?img=3" alt="Mike Chen" class="user-avatar" />
          <div class="user-info">
            <div class="user-name">Mike Chen</div>
            <div class="user-joined">Joined 5 hours ago</div>
          </div>
          <div class="user-status online"></div>
        </div>
        <div class="user-item">
          <img src="https://i.pravatar.cc/40?img=5" alt="Emma Davis" class="user-avatar" />
          <div class="user-info">
            <div class="user-name">Emma Davis</div>
            <div class="user-joined">Joined 1 day ago</div>
          </div>
          <div class="user-status away"></div>
        </div>
        <div class="user-item">
          <img src="https://i.pravatar.cc/40?img=7" alt="Alex Rodriguez" class="user-avatar" />
          <div class="user-info">
            <div class="user-name">Alex Rodriguez</div>
            <div class="user-joined">Joined 2 days ago</div>
          </div>
          <div class="user-status offline"></div>
        </div>
      </div>
    </div>

    <div class="card">
      <h3 class="card-title">Notes Analytics</h3>
      <div class="notes-analytics">
        <div class="note-stat">
          <div class="note-label">Daily Notes</div>
          <div class="note-bar">
            <div class="note-progress" style="width: 90%; background: #667eea"></div>
          </div>
          <div class="note-value">847</div>
        </div>
        <div class="note-stat">
          <div class="note-label">Habbit Notes</div>
          <div class="note-bar">
            <div class="note-progress" style="width: 75%; background: #764ba2"></div>
          </div>
          <div class="note-value">1,234</div>
        </div>
        <div class="note-stat">
          <div class="note-label">Goal Notes</div>
          <div class="note-bar">
            <div class="note-progress" style="width: 50%; background: #10b981"></div>
          </div>
          <div class="note-value">567</div>
        </div>
        <div class="completion-stat">
          <div class="completion-value">92%</div>
          <div class="completion-label">Notes with habits</div>
        </div>
      </div>
    </div>
  </div>
</main>
@endsection
