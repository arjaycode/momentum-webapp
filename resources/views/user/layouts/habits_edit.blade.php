@extends('user.main')

@section('title', 'Edit Habit: ' . $habit->name . ' | ' . Auth::user()->firstname . ' ' . Auth::user()->lastname)
@section('active-link', 'habits')
@section('page-title', 'Edit Habit')
@section('page-description', 'Modify your habit, according to your needs')
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
<form action="{{ route('user.habits.update', $habit->id) }}" method="POST" id="habitForm" data-habit-id="{{ $habit->id }}">
  @csrf
  @method('PUT')
  <div class="content-area">
    <div class="details-section">
      <div class="form-group">
        <label class="form-label">Habit Title</label>
        <input type="text" class="form-input" id="habitTitle" name="name" value="{{ old('name', $habit->name) }}" required />
      </div>

      <div class="form-group">
        <label class="form-label">Habit Category</label>
        <select class="form-input" name="category_id" id="habit-category">
          <option value="">Select Category (Optional)</option>
          @foreach($categories as $category)
          <option value="{{ $category->id }}" {{ old('category_id', $habit->category_id) == $category->id ? 'selected' : '' }}>
            {{ $category->title }}
          </option>
          @endforeach
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">Description</label>
        <textarea class="form-textarea" id="habitDesc" name="description">{{ old('description', $habit->description) }}</textarea>
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
            <input type="checkbox" id="notifToggle" name="enable_push_notifications" value="1" {{ old('enable_push_notifications', $habit->enable_push_notifications) ? 'checked' : '' }} />
            <span class="toggle-slider"></span>
          </label>
        </div>
        <div class="notification-time">⏰ {{ $habit->enable_push_notifications ? 'Enabled' : 'Disabled' }}</div>
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
              <button type="button" class="toolbar-btn">B</button>
              <button type="button" class="toolbar-btn">I</button>
              <button type="button" class="toolbar-btn">≡</button>
            </div>
            <button type="button" class="save-note-btn" id="saveNoteBtn">Save</button>
          </div>
        </div>

        <div class="notes-list" id="notesList">
          @if(isset($notes) && $notes->count() > 0)
            @foreach($notes as $note)
            <div class="note-item" data-note-id="{{ $note->id }}">
              <div class="note-text">{{ $note->message }}</div>
              <div class="note-footer">
                <div class="note-time">{{ $note->created_at->format('M j, Y \a\t g:i A') }}</div>
                <div class="note-actions">
                  <button type="button" class="delete-note-btn" onclick="deleteNote({{ $habit->id }}, {{ $note->id }}, this)">🗑️</button>
                </div>
              </div>
            </div>
            @endforeach
          @endif
        </div>
      </div>
    </div>

    <div class="stats-panel">
      <div class="days-selector">
        <div class="form-label">Target Days</div>
        <div class="days-grid" id="daysGrid">
          @php
            $days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            $dayInitials = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
            $oldTargetDays = old('target_days', $targetDays);
          @endphp
          @foreach($days as $index => $day)
          <div class="day-circle {{ in_array($day, $oldTargetDays) ? 'active' : 'inactive' }}" data-day="{{ $day }}">
            <span class="day-initial">{{ $dayInitials[$index] }}</span>
          </div>
          @endforeach
        </div>
        <div class="day-label">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>
        <div class="days-info" id="daysInfo">{{ count($oldTargetDays) }} {{ count($oldTargetDays) == 1 ? 'day' : 'days' }} per week</div>
        
        <!-- Hidden inputs for target days -->
        <div id="targetDaysContainer">
          @foreach($days as $day)
            @if(in_array($day, $oldTargetDays))
              <input type="hidden" name="target_days[]" value="{{ $day }}">
            @endif
          @endforeach
        </div>
      </div>

      <div class="progress-stats">
        <div class="stat-label">Progress Overview</div>
        <div class="stats-row">
          @php
            $logs = $habit->logs()->orderBy('completed_at', 'desc')->get();
            $streak = 0;
            if ($logs->count() > 0) {
              $today = \Carbon\Carbon::today();
              $checkDate = $today->copy();
              $logDates = $logs->pluck('completed_at')->map(function($date) {
                return \Carbon\Carbon::parse($date)->format('Y-m-d');
              })->toArray();
              
              if (in_array($today->format('Y-m-d'), $logDates)) {
                $streak = 1;
                $checkDate->subDay();
                while (in_array($checkDate->format('Y-m-d'), $logDates)) {
                  $streak++;
                  $checkDate->subDay();
                }
              }
            }
            $totalDays = $logs->count();
            
            // Calculate success rate
            $targetDays = $habit->target_days ?? [];
            $createdAt = \Carbon\Carbon::parse($habit->created_at);
            $now = \Carbon\Carbon::now();
            $totalPossible = 0;
            $currentDate = $createdAt->copy();
            while ($currentDate->lte($now)) {
              $dayName = $currentDate->format('D');
              $dayShort = substr($dayName, 0, 3);
              if (in_array($dayShort, $targetDays)) {
                $totalPossible++;
              }
              $currentDate->addDay();
            }
            $successRate = $totalPossible > 0 ? round(($totalDays / $totalPossible) * 100) : 0;
          @endphp
          <div class="stat-item">
            <div class="stat-value blue" id="currentStreak">{{ $streak }}</div>
            <div class="stat-description">Current Streak</div>
          </div>
          <div class="stat-item">
            <div class="stat-value purple">{{ $successRate }}%</div>
            <div class="stat-description">Success Rate</div>
          </div>
          <div class="stat-item">
            <div class="stat-value green" id="totalDays">{{ $totalDays }}</div>
            <div class="stat-description">Total Days</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <button type="submit" class="save-changes-btn" id="saveChangesBtn">
    Save Changes
  </button>
</form>
@endsection