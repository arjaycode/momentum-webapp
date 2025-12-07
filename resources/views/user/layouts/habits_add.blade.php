@extends('user.main')

@section('title', 'My Habits | ' . Auth::user()->firstname . ' ' . Auth::user()->lastname)
@section('active-link', 'habits')
@section('page-title', 'Add New Habit')
@section('page-description', 'Create a new habit to master')
@section('css-file', 'habits.css')
@section('js-file', '')

@section('content')
<<<<<<< HEAD
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
=======
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
>>>>>>> 7919d9eff6e3c7786d104ba820173a4c9e55a1b8
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
<<<<<<< HEAD
        <label class="notification-toggle">
          <input type="checkbox" id="notifToggle" name="enable_push_notifications" value="1" {{ old('enable_push_notifications') ? 'checked' : '' }} />
          <span class="toggle-slider"></span>
        </label>
=======

        <div class="notes-list" id="notesList"></div>
>>>>>>> 7919d9eff6e3c7786d104ba820173a4c9e55a1b8
      </div>
    </div>

<<<<<<< HEAD
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
=======
    <button type="submit" class="save-changes-btn" id="saveChangesBtn">Add Habit</button>
>>>>>>> 7919d9eff6e3c7786d104ba820173a4c9e55a1b8

  </form>
  <div class="stats-panel">
<<<<<<< HEAD
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
    
=======


>>>>>>> 7919d9eff6e3c7786d104ba820173a4c9e55a1b8
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
<<<<<<< HEAD
<button type="submit" class="save-changes-btn" id="saveChangesBtn">Add Habit</button>
</form>
=======

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
>>>>>>> 7919d9eff6e3c7786d104ba820173a4c9e55a1b8
@endsection
