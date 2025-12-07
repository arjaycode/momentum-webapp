@extends('user.main')

@section('title', 'My Habits | Username')
@section('active-link', 'habits')
@section('page-title', 'Add New Habit')
@section('page-description', 'Create a new habit to master')
@section('css-file', 'habits.css')
@section('js-file', '')

@section('content')
<div class="content-area">
  <form action="{{ route('user.habits.add.submit') }}" method="POST">
    @csrf
    @if (session('success'))
    <div class="success-alert">
      <span class="success-icon">✓</span>
      {{ session('success') }}
    </div>
    @endif
    @if ($errors->any())
    <div>
      <ul class="msg">
        @foreach ($errors->all() as $error)
        <li class="msg error">{{ $error }}</li>
        @endforeach
      </ul>
    </div>
    @endif
    <div class="details-section">
      <div class="form-group">
        <label class="form-label">Habit Name</label>
        <input type="text" class="form-input" id="habitTitle" name="habit_name" value="" />
      </div>
      <div class="form-group">
        <input type="number" class="form-input" name="user_id" value="{{ $user_id }}" hidden />
      </div>
      <div class="form-group">
        <label class="form-label">Habit Category</label>
        <select class="form-input" name="category_id" id="habit-category">
          <option value="" selected>Select Category</option>
          @foreach ($habits_category as $habitCategory)
          <option value="{{ $habitCategory->id }}">{{ $habitCategory->title}}</option>
          @endforeach
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">Description</label>
        <textarea name="description" class="form-textarea" id="habitDesc"></textarea>
      </div>

      <div class="notification-section">
        <div class="notification-header">
          <div class="notification-icon">🔔</div>
          <div class="notification-content">
            <div class="notification-title">Push Notifications</div>
            <div class="notification-text">
              Get reminder when it's time for your habit
            </div>
          </div>
          <label class="notification-toggle">
            <input name="enable_push_notifications" type="checkbox" id="notifToggle" />
            <span class="toggle-slider"></span>
          </label>
        </div>
        <div class="notification-time">⏰ Daily at 7:00 AM</div>
      </div>

      <div class="days-selector" style="{margin-top: 30px;}">
        <div class="form-label">Target Days</div>

        <div class="days-grid" id="daysGrid">
          <label class="day-circle inactive">
            <input type="checkbox" name="target_days[]" value="Mon" hidden>
            <span class="day-initial">M</span>
          </label>

          <label class="day-circle inactive">
            <input type="checkbox" name="target_days[]" value="Tue" hidden>
            <span class="day-initial">T</span>
          </label>

          <label class="day-circle inactive">
            <input type="checkbox" name="target_days[]" value="Wed" hidden>
            <span class="day-initial">W</span>
          </label>

          <label class="day-circle inactive">
            <input type="checkbox" name="target_days[]" value="Thu" hidden>
            <span class="day-initial">T</span>
          </label>

          <label class="day-circle inactive">
            <input type="checkbox" name="target_days[]" value="Fri" hidden>
            <span class="day-initial">F</span>
          </label>

          <label class="day-circle inactive">
            <input type="checkbox" name="target_days[]" value="Sat" hidden>
            <span class="day-initial">S</span>
          </label>

          <label class="day-circle inactive">
            <input type="checkbox" name="target_days[]" value="Sun" hidden>
            <span class="day-initial">S</span>
          </label>
        </div>

        <div class="day-label" style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 8px; font-size: 10px; color: #999;">
          <span style="text-align: center">Mon</span>
          <span style="text-align: center">Tue</span>
          <span style="text-align: center">Wed</span>
          <span style="text-align: center">Thu</span>
          <span style="text-align: center">Fri</span>
          <span style="text-align: center">Sat</span>
          <span style="text-align: center">Sun</span>
        </div>

        <div class="days-info">0 days per week</div>
      </div>

      <div class="notes-section">
        <div class="notes-header">
          <h2 class="notes-title">Quick Notes</h2>
          <button class="add-note-btn" id="addNoteBtn">+</button>
        </div>

        <div class="note-input-area" id="noteInputArea" style="display: none">
          <textarea class="note-textarea" id="noteInput" placeholder="What's on your mind?"></textarea>
          <div class="note-toolbar">
            <div class="toolbar-buttons">
              <button class="toolbar-btn">B</button>
              <button class="toolbar-btn">I</button>
              <button class="toolbar-btn">≡</button>
            </div>
            <button class="save-note-btn" id="saveNoteBtn">Save</button>
          </div>
        </div>

        <div class="notes-list" id="notesList"></div>
      </div>
    </div>

    <button type="submit" class="save-changes-btn" id="saveChangesBtn">Add Habit</button>

  </form>
  <div class="stats-panel">


    <div class="progress-stats">
      <div class="stat-label">Progress Overview</div>
      <div class="stats-row">
        <div class="stat-item">
          <div class="stat-value blue" id="currentStreak">0</div>
          <div class="stat-description">Current Streak</div>
        </div>
        <div class="stat-item">
          <div class="stat-value purple">0%</div>
          <div class="stat-description">Success Rate</div>
        </div>
        <div class="stat-item">
          <div class="stat-value green" id="totalDays">0</div>
          <div class="stat-description">Total Days</div>
        </div>
      </div>
    </div>
  </div>

</div>

<script>
  document.addEventListener("DOMContentLoaded", function() {

    // Select all the checkboxes inside the day circles
    const checkboxes = document.querySelectorAll('.day-circle input[type="checkbox"]');

    function updateClasses(checkbox) {
      const parentLabel = checkbox.closest('.day-circle');

      if (checkbox.checked) {
        // If checked: Make it look Active
        parentLabel.classList.remove('inactive');
        parentLabel.classList.add('active');
      } else {
        // If unchecked: Make it look Inactive
        parentLabel.classList.add('inactive');
        parentLabel.classList.remove('active');
      }

      // Update the text counter
      updateDaysCount();
    }

    // 1. Attach the click listener to every box
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', function() {
        updateClasses(this);
      });
    });

    // 2. Helper to update the text count
    function updateDaysCount() {
      const count = document.querySelectorAll('.day-circle input:checked').length;
      document.querySelector('.days-info').textContent = `${count} days per week`;
    }
  });

</script>
@endsection
