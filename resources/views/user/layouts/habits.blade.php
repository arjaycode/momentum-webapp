@extends('user.main')

@section('title', 'My Habits | Username')
@section('active-link', 'habits')
@section('page-title', 'Habits')
@section('page-description', 'Create, Edit, Delete your habits')
@section('css-file', 'habits.css')
@section('js-file', 'habits.js')

@section('content')
<!-- Stats Grid -->
<div class="stats-grid">
  <div class="stat-card">
    <div class="stat-header">
      <span class="stat-label">Active Habits</span>
      <div class="stat-icon green-icon">
        <i class="fas fa-list"></i>
      </div>
    </div>
    <div class="stat-value">{{ $activeHabits }}</div>
  </div>

  <div class="stat-card">
    <div class="stat-header">
      <span class="stat-label">Current Streak</span>
      <div class="stat-icon orange-icon">
        <i class="fas fa-fire"></i>
      </div>
    </div>
    <div class="stat-value">{{ $currentStreak ?? 0 }} {{ ($currentStreak ?? 0) == 1 ? 'day' : 'days' }}</div>
  </div>
</div>
<!-- Habit List -->
<div class="habit-container">
  <table class="habit-table">
    <thead>
      <tr>
        <th>Habit</th>
        <th>Category</th>
        <th>Streak</th>
        <th class="flex-between">
          Actions
          <a class="add-btn" href="{{ route('user.habits.add') }}"><i class="fas fa-plus"></i>Add Habit</a>
        </th>
      </tr>
    </thead>
    <tbody>
      @forelse($habits as $habit)
        <tr data-habit-id="{{ $habit->id }}">
          <td>
            <div class="habit-title-cell">
              <div class="habit-title">{{ $habit->name }}</div>
              @if($habit->description)
                <div class="habit-description">{{ $habit->description }}</div>
              @else
                <div class="habit-description no-description">No description</div>
              @endif
            </div>
          </td>
          <td>
            @if($habit->category)
              <span class="badge {{ strtolower($habit->category->title ?? 'default') }}">{{ $habit->category->title ?? 'Uncategorized' }}</span>
            @else
              <span class="badge default">Uncategorized</span>
            @endif
          </td>
          <td class="streak">{{ ($habit->streak ?? 0) > 0 ? '🔥 ' : '❄️ ' }}{{ $habit->streak ?? 0 }}</td>
          <td>
            <div class="action-container">
              <div class="action-buttons">
                <a class="btn btn-view" href="{{ route('user.habits.view', $habit->id) }}">
                  <i class="fa-solid fa-expand"></i> View
                </a>
                <a class="btn btn-edit" href="{{ route('user.habits.edit', $habit->id) }}">
                  <i class="fa-regular fa-pen-to-square"></i> Edit
                </a>
                <a class="btn btn-delete" data-habit-id="{{ $habit->id }}">
                  <i class="fa-solid fa-xmark"></i> Delete
                </a>
              </div>
              <div class="mark-as-done-container">
                @if($habit->isCompletedToday ?? false)
                  <button class="btn btn-completed" data-habit-id="{{ $habit->id }}" disabled>
                    <i class="fa-solid fa-check-circle"></i> Completed
                  </button>
                @else
                  <button class="btn btn-done" data-habit-id="{{ $habit->id }}">
                    <i class="fa-solid fa-check"></i> Mark As Done
                  </button>
                @endif
              </div>
            </div>
          </td>
        </tr>
      @empty
        <tr>
          <td colspan="4" style="text-align: center; padding: 2rem;">
            No habits yet. <a href="{{ route('user.habits.add') }}">Create your first habit</a> to get started!
          </td>
        </tr>
      @endforelse
    </tbody>
  </table>
</div>
@endsection

@section('modals')
<div id="deleteModal" class="modal-overlay">
  <div class="modal-content">
    <div class="modal-header">
      <h3 class="modal-title">Delete Habit</h3>
      <span class="close-btn">&times;</span>
    </div>

    <div class="modal-body">
      <p>Are you sure you want to delete this habit?</p>
      <p class="modal-description">
        This action will permanently remove the habit and its streak
        history.
      </p>
    </div>

    <div class="modal-footer">
      <button id="cancelBtn" class="btn btn-secondary">Cancel</button>
      <button id="confirmDeleteBtn" class="btn btn-danger">
        Yes, Delete
      </button>
    </div>
  </div>
</div>
@endsection
