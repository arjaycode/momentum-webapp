@extends('admin.main')

@section('title', 'Habits Management - Momentum')
@section('active-link', 'habits-management')
@section('page-title', 'Habits Management')
@section('page-description', 'Manage all user habits')
@section('css-file', 'habits-management.css')
@section('js-file', 'habits-management.js')

@section('content')
<!-- Main Content -->
<main class="main-content">
  <!-- Stats Cards -->
  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-info">
        <span class="stat-label">Total Habits</span>
        <div class="stat-value">{{ $habits->count() }}</div>
      </div>
      <div class="stat-icon blue">
        <i class="fas fa-heart"></i>
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-info">
        <span class="stat-label">Active Users</span>
        <div class="stat-value">{{ $habits->pluck('user_id')->unique()->count() }}</div>
      </div>
      <div class="stat-icon green">
        <i class="fas fa-users"></i>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-info">
        <span class="stat-label">Categories Used</span>
        <div class="stat-value">{{ $habits->whereNotNull('category_id')->pluck('category_id')->unique()->count() }}</div>
      </div>
      <div class="stat-icon purple">
        <i class="fas fa-layer-group"></i>
      </div>
    </div>
  </div>

  <!-- Search and Filter -->
  <div class="controls-section">
    <div class="search-box-container">
      <i class="fas fa-search"></i>
      <input type="text" placeholder="Search habits..." id="habitSearch" />
    </div>
    <div class="controls-right">
      <select class="filter-select" id="categoryFilter">
        <option value="">All Categories</option>
        @foreach($categories as $category)
        <option value="{{ $category->id }}">{{ $category->title }}</option>
        @endforeach
      </select>
      <select class="filter-select" id="userFilter">
        <option value="">All Users</option>
        @foreach($users as $user)
        <option value="{{ $user->id }}">{{ $user->firstname }} {{ $user->lastname }}</option>
        @endforeach
      </select>
      <a class="btn-primary" href="{{ route('admin.habits.create') }}"><i class="fas fa-plus"></i> Add Habit</a>
    </div>
  </div>

  <!-- Habits Table -->
  <div class="table-container">
    <table class="habits-table">
      <thead>
        <tr>
          <th>Habit Name</th>
          <th>User</th>
          <th>Category</th>
          <th>Target Days</th>
          <th>Notifications</th>
          <th>Created</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody id="habitsTableBody">
        @foreach ($habits as $habit)
        <tr data-category-id="{{ $habit->category_id }}" data-user-id="{{ $habit->user_id }}">
          <td>
            <div class="habit-name-cell">
              <strong>{{ $habit->name }}</strong>
              @if($habit->description)
              <span class="habit-description">{{ Str::limit($habit->description, 50) }}</span>
              @endif
            </div>
          </td>
          <td>
            <div class="user-cell">
              <span>{{ $habit->user->firstname }} {{ $habit->user->lastname }}</span>
              <span class="user-email">{{ $habit->user->email }}</span>
            </div>
          </td>
          <td>
            @if($habit->category)
            <span class="category-badge" style="background-color: var(--{{ $habit->category->color }}-light); color: var(--{{ $habit->category->color }}-dark);">
              <i class="fas fa-{{ $habit->category->icon }}"></i>
              {{ $habit->category->title }}
            </span>
            @else
            <span class="category-badge">Uncategorized</span>
            @endif
          </td>
          <td>
            <div class="target-days">
              @php
                $days = $habit->target_days ?? [];
                $dayLabels = ['Mon' => 'M', 'Tue' => 'T', 'Wed' => 'W', 'Thu' => 'T', 'Fri' => 'F', 'Sat' => 'S', 'Sun' => 'S'];
              @endphp
              @foreach(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as $day)
              <span class="day-badge {{ in_array($day, $days) ? 'active' : 'inactive' }}">{{ $dayLabels[$day] }}</span>
              @endforeach
            </div>
          </td>
          <td>
            @if($habit->enable_push_notifications)
            <span class="badge badge-success"><i class="fas fa-bell"></i> Enabled</span>
            @else
            <span class="badge badge-secondary"><i class="fas fa-bell-slash"></i> Disabled</span>
            @endif
          </td>
          <td>{{ $habit->created_at->format('M d, Y') }}</td>
          <td>
            <div class="action-buttons">
              <a href="{{ route('admin.habits.edit', $habit->id) }}" class="action-btn edit-btn" title="Edit">
                <i class="fas fa-edit"></i>
              </a>
              <form action="{{ route('admin.habits.destroy', $habit->id) }}" method="POST" class="delete-form" style="display: inline;">
                @csrf
                @method('DELETE')
                <button type="submit" class="action-btn delete-btn" title="Delete" onclick="return confirm('Are you sure you want to delete this habit?')">
                  <i class="fas fa-trash"></i>
                </button>
              </form>
            </div>
          </td>
        </tr>
        @endforeach
      </tbody>
    </table>
    @if($habits->isEmpty())
    <div class="empty-state">
      <i class="fas fa-heart"></i>
      <p>No habits found</p>
      <a href="{{ route('admin.habits.create') }}" class="btn-primary">Add First Habit</a>
    </div>
    @endif
  </div>
</main>
@endsection



