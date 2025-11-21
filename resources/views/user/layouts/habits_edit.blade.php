@extends('user.main')

@section('title', 'My Habits | Username')
@section('active-link', 'habits')
@section('page-title', 'Edit Habit')
@section('page-description', 'Modify your habit, according to your needs')
@section('css-file', 'habits.css')
@section('js-file', 'habits_edit.js')

@section('content')
<div class="content-area">
  <div class="details-section">
    <div class="form-group">
      <label class="form-label">Habit Title</label>
      <input type="text" class="form-input" id="habitTitle" value="" />
    </div>

    <div class="form-group">
      <label class="form-label">Habit Category</label>
      <select class="form-input" name="habit-category" id="habit-category">
        <option value="" selected>Select Category</option>
      </select>
    </div>

    <div class="form-group">
      <label class="form-label">Description</label>
      <textarea class="form-textarea" id="habitDesc"></textarea>
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
          <input type="checkbox" id="notifToggle" />
          <span class="toggle-slider"></span>
        </label>
      </div>
      <div class="notification-time">⏰ Daily at 7:00 AM</div>
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

  <div class="stats-panel">
    <div class="days-selector">
      <div class="form-label">Target Days</div>
      <div class="days-grid" id="daysGrid">
        <div class="day-circle inactive" data-day="Mon">
          <span class="day-initial">M</span>
        </div>
        <div class="day-circle inactive" data-day="Tue">
          <span class="day-initial">T</span>
        </div>
        <div class="day-circle inactive" data-day="Wed">
          <span class="day-initial">W</span>
        </div>
        <div class="day-circle inactive" data-day="Thu">
          <span class="day-initial">T</span>
        </div>
        <div class="day-circle inactive" data-day="Fri">
          <span class="day-initial">F</span>
        </div>
        <div class="day-circle inactive" data-day="Sat">
          <span class="day-initial">S</span>
        </div>
        <div class="day-circle inactive" data-day="Sun">
          <span class="day-initial">S</span>
        </div>
      </div>
      <div class="day-label" style="
                  display: grid;
                  grid-template-columns: repeat(7, 1fr);
                  gap: 8px;
                  font-size: 10px;
                  color: #999;
                ">
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

<button class="save-changes-btn" id="saveChangesBtn">
  Save Changes
</button>
@endsection
