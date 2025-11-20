@extends('admin.main')

@section('title', 'Edit New User Note - Momentum')
@section('active-link', 'notes')
@section('page-title', 'Edit Note')
@section('page-description', 'Manage and organize user notes')
@section('css-file', 'note_add.css')
@section('js-file', 'note_add.js')

@section('content')
<!-- Main Content -->
<main class="main-content">
  <!-- Back Button -->
  <div class="back-section">
    <a class="back-btn" href="{{ route('note-management') }}"><i class="fas fa-arrow-left"></i>
      Back to Notes Management</a>
  </div>
  <div class="form-container">
    <div class="form-row">
      <div class="form-group">
        <label>For User</label>
        <select id="userSelect" class="select-input">
          <option value="">Select User</option>
          <option value="johnson">Johnson (ID: 4001)</option>
          <option value="smith">Smith (ID: 4002)</option>
          <option value="davis">Davis (ID: 4003)</option>
        </select>
      </div>

      <div class="form-group">
        <label>For Habit</label>
        <select id="habitSelect" class="select-input">
          <option value="">Select Habit</option>
          <option value="fitness">Fitness</option>
          <option value="reading">Reading</option>
          <option value="meditation">Meditation</option>
        </select>
      </div>
    </div>

    <div class="form-group">
      <label>Note</label>
      <textarea id="noteText" class="textarea-input" placeholder="Put your note here..."></textarea>
    </div>

    <div class="form-group">
      <label>Color Theme</label>
      <div class="color-options">
        <button class="color-btn" data-color="blue" style="background-color: #3b82f6"></button>
        <button class="color-btn" data-color="green" style="background-color: #10b981"></button>
        <button class="color-btn" data-color="pink" style="background-color: #ec4899"></button>
        <button class="color-btn" data-color="purple" style="background-color: #8b5cf6"></button>
        <button class="color-btn" data-color="orange" style="background-color: #f97316"></button>
      </div>
    </div>

    <div class="form-group">
      <label>Icon</label>
      <div class="icon-options">
        <button class="note-icon-btn" data-icon="heart">❤️</button>
        <button class="note-icon-btn" data-icon="dumbbell">💪</button>
        <button class="note-icon-btn" data-icon="calendar">📅</button>
        <button class="note-icon-btn" data-icon="star">⭐</button>
      </div>
    </div>

    <div class="form-actions">
      <button class="btn btn-cancel">Cancel</button>
      <button class="btn btn-primary" id="saveBtn"><i class="fas fa-check"></i>Save Changes</button>
    </div>
  </div>
</main>
@endsection
