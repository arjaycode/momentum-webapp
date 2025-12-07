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
      <span class="stat-label">Habits</span>
      <div class="stat-icon green-icon">
        <i class="fas fa-list"></i>
      </div>
    </div>
    <div class="stat-value">{{$habits->count()}}</div>
  </div>

  <div class="stat-card">
    <div class="stat-header">
      <span class="stat-label">Current Streak</span>
      <div class="stat-icon orange-icon">
        <i class="fas fa-fire"></i>
      </div>
    </div>
    <div class="stat-value">{{ $withHighest->streak_days ?? 0 }} days</div>
  </div>
</div>
<!-- Habit List -->
<div class="habit-container">
  <table class="habit-table">
    <thead>
      <tr>
        <th>Category</th>
        <th>Description</th>
        <th>Streak</th>
        <th class="flex-between">
          Actions
          <a class="add-btn" href="{{ route('user.habits.add') }}"><i class="fas fa-plus"></i>Add Habit</a>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><span class="badge health">Health</span></td>
        <td>Drink 2 liters of water</td>
        <td class="streak">🔥 12</td>
        <td>
          <div class="action-container">
            <div class="action-buttons">
              <a class="btn btn-view" href="{{ route('user.habits.view') }}">
                <i class="fa-solid fa-expand"></i> View
              </a>
              <a class="btn btn-edit" href="{{ route('user.habits.edit') }}">
                <i class="fa-regular fa-pen-to-square"></i> Edit
              </a>
              <a class="btn btn-delete">
                <i class="fa-solid fa-xmark"></i> Delete
              </a>
            </div>
            <div class="mark-as-done-container">
              <a class="btn btn-done">
                <i class="fa-solid fa-check"></i> Mark As Done
              </a>
            </div>
          </div>
        </td>
      </tr>

      <tr>
        <td><span class="badge learning">Learning</span></td>
        <td>Read 10 pages of a book</td>
        <td class="streak">🔥 5</td>
        <td>
          <div class="action-container">
            <div class="action-buttons">
              <a class="btn btn-view" href="{{ route('user.habits.view') }}">
                <i class="fa-solid fa-expand"></i> View
              </a>
              <a class="btn btn-edit" href="{{ route('user.habits.edit') }}">
                <i class="fa-regular fa-pen-to-square"></i> Edit
              </a>
              <a class="btn btn-delete">
                <i class="fa-solid fa-xmark"></i> Delete
              </a>
            </div>
            <div class="mark-as-done-container">
              <button class="btn btn-done">
                <i class="fa-solid fa-check"></i> Mark As Done
              </button>
            </div>
          </div>
        </td>
      </tr>

      <tr>
        <td><span class="badge work">Work</span></td>
        <td>Clear email inbox</td>
        <td class="streak">❄️ 0</td>
        <td>
          <div class="action-container">
            <div class="action-buttons">
              <a class="btn btn-view" href="{{ route('user.habits.view') }}">
                <i class="fa-solid fa-expand"></i> View
              </a>
              <a class="btn btn-edit" href="{{ route('user.habits.edit') }}">
                <i class="fa-regular fa-pen-to-square"></i> Edit
              </a>
              <a class="btn btn-delete">
                <i class="fa-solid fa-xmark"></i> Delete
              </a>
            </div>
            <div class="mark-as-done-container">
              <button class="btn btn-done">
                <i class="fa-solid fa-check"></i> Mark As Done
              </button>
            </div>
          </div>
        </td>
      </tr>
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
