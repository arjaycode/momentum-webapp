@extends('user.main')

@section('title', 'My Habits | ' . Auth::user()->firstname . ' ' . Auth::user()->lastname)
@section('active-link', 'habits')
@section('page-title', 'Add New Habit')
@section('page-description', 'Create a new habit to master')
@section('css-file', 'habits.css')
@section('js-file', 'habits_edit.js')

@section('content')
@if (session('success'))
<div class="success-alert" style="margin: 20px; background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb; padding: 15px; border-radius: 5px; display: flex; align-items: center;">
  <span class="success-icon" style="font-weight: bold; font-size: 1.2em; margin-right: 10px;">✓</span>
  {{ session('success') }}
</div>
@endif
@if ($errors->any())
<div style="margin: 20px;">
  <ul class="msg" style="list-style-type: none; padding: 0;">
    @foreach ($errors->all() as $error)
    <li class="msg error" style="display: block; padding: 10px; border-radius: 8px; margin-top: 8px; font-size: 13px; background: #fff0f0; color: #9b2b2b;">{{ $error }}</li>
    @endforeach
  </ul>
</div>
@endif
<form action="{{ route('user.habits.store') }}" method="POST" id="habitForm">
  @csrf
  @if(request('redirect_to'))
  <input type="hidden" name="redirect_to" value="{{ request('redirect_to') }}" />
  @endif
  <div class="content-area">
    <div class="details-section">
      <div class="form-group">
        <label class="form-label">Habit Title</label>
        <input type="text" class="form-input" id="habitTitle" name="name" value="{{ old('name') }}" required />
      </div>

      <div class="form-group">
        <label class="form-label">Habit Category</label>
        <select class="form-input" name="category_id" id="habit-category">
            <option value="" selected>Select Category (Optional)</option>
      
            <option value="study">Study</option>
            <option value="workout">Workout</option>
            <option value="read">Read</option>
            <option value="meditation">Meditation</option>
            <option value="sleep">Sleep</option>
            <option value="eat_healthy">Eat Healthy</option>
            <option value="drink_water">Drink Water</option>
            <option value="meditate">Meditate</option>
            <option value="exercise">Exercise</option>
      
            @foreach($categories as $category)
                <option value="{{ $category->id }}" 
                  {{ old('category_id') == $category->id ? 'selected' : '' }}>
                    {{ $category->title }}
                </option>
            @endforeach
        </select>
      </div>
      

      <div class="form-group">
        <label class="form-label">Description</label>
        <textarea class="form-textarea" id="habitDesc" name="description">{{ old('description') }}</textarea>
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
          <input type="checkbox" id="notifToggle" name="enable_push_notifications" value="1" {{ old('enable_push_notifications') ? 'checked' : '' }} />
          <span class="toggle-slider"></span>
        </label>
      </div>
      <div class="notification-time">⏰ Daily at 7:00 AM</div>
    </div>

    <div class="notes-section">
      <div class="notes-header">
        <h2 class="notes-title">Quick Notes</h2>
        <button type="button" class="add-note-btn" id="addNoteBtn">+</button>
      </div>

      <div class="note-input-area" id="noteInputArea" style="display: none">
        <textarea class="note-textarea" id="noteInput" placeholder="What's on your mind?"></textarea>
        <div class="note-toolbar">
          <div class="toolbar-buttons">
            <button class="toolbar-btn">B</button>
            <button class="toolbar-btn">I</button>
            <button class="toolbar-btn">≡</button>
          </div>
          <button type="button" class="save-note-btn" id="saveNoteBtn">Save</button>
        </div>
      </div>

      <div class="notes-list" id="notesList"></div>
    </div>
  </div>

  <div class="stats-panel">
    <div class="days-selector" style="margin-bottom: 24px;">
      <div class="form-label">Target Days</div>
      <div class="days-grid" id="daysGrid" style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 8px; margin-top: 8px;">
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
      <div class="day-label" style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 8px; font-size: 10px; color: #999; margin-top: 4px;">
        <span style="text-align: center">Mon</span>
        <span style="text-align: center">Tue</span>
        <span style="text-align: center">Wed</span>
        <span style="text-align: center">Thu</span>
        <span style="text-align: center">Fri</span>
        <span style="text-align: center">Sat</span>
        <span style="text-align: center">Sun</span>
      </div>
      <div class="days-info" style="margin-top: 8px; font-size: 12px; color: #666;">0 days per week</div>
      <!-- Hidden inputs for each selected day - Laravel will convert to array -->
      <div id="targetDaysContainer"></div>
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
<button type="submit" class="save-changes-btn" id="saveChangesBtn">Add Habit</button>
</form>
@endsection
