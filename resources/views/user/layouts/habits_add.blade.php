@extends('user.main')

@section('title', 'My Habits | ' . Auth::user()->firstname . ' ' . Auth::user()->lastname)
@section('active-link', 'habits')
@section('page-title', 'Add New Habit')
@section('page-description', 'Create a new habit to master')
@section('css-file', 'habits.css')
@section('js-file', '')

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
          <option value="">Select Category (Optional)</option>
          @foreach($categories as $category)
          <option value="{{ $category->id }}" {{ old('category_id') == $category->id ? 'selected' : '' }}>
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
            <input name="enable_push_notifications" type="checkbox" id="notifToggle" value="1" {{ old('enable_push_notifications') ? 'checked' : '' }} />
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

        <div class="notes-list" id="notesList">
          {{-- Notes will be loaded here after habit is created --}}
        </div>

      </div>
    </div>

    <div class="stats-panel">
      <div class="days-selector">
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
        <div class="day-label">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
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

  <button type="submit" class="save-changes-btn" id="saveChangesBtn">Add Habit</button>
  </form>
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

    // Notes functionality for add page
    const addNoteBtnAdd = document.getElementById('addNoteBtn');
    const noteInputAreaAdd = document.getElementById('noteInputArea');
    const noteInputAdd = document.getElementById('noteInput');
    const saveNoteBtnAdd = document.getElementById('saveNoteBtn');
    const notesListAdd = document.getElementById('notesList');
    
    // Store notes temporarily before habit is created
    let temporaryNotes = JSON.parse(localStorage.getItem('temp_habit_notes') || '[]');

    // Load temporary notes on page load
    if (temporaryNotes.length > 0 && notesListAdd) {
      temporaryNotes.forEach(note => {
        const noteItem = document.createElement('div');
        noteItem.className = 'note-item';
        noteItem.setAttribute('data-temp-note', 'true');
        
        // Create elements safely to prevent XSS
        const noteTextDiv = document.createElement('div');
        noteTextDiv.className = 'note-text';
        noteTextDiv.textContent = note.message; // Use textContent to prevent XSS
        
        const noteFooter = document.createElement('div');
        noteFooter.className = 'note-footer';
        
        const noteTime = document.createElement('div');
        noteTime.className = 'note-time';
        noteTime.textContent = note.created_at;
        
        const noteActions = document.createElement('div');
        noteActions.className = 'note-actions';
        
        const deleteBtn = document.createElement('button');
        deleteBtn.type = 'button';
        deleteBtn.className = 'delete-note-btn';
        deleteBtn.textContent = '🗑️';
        deleteBtn.onclick = function() { deleteTempNote(this); };
        
        noteActions.appendChild(deleteBtn);
        noteFooter.appendChild(noteTime);
        noteFooter.appendChild(noteActions);
        noteItem.appendChild(noteTextDiv);
        noteItem.appendChild(noteFooter);
        
        notesListAdd.appendChild(noteItem);
      });
    }

    // Toggle note input area
    if (addNoteBtnAdd && noteInputAreaAdd) {
      addNoteBtnAdd.addEventListener('click', function(e) {
        e.preventDefault();
        noteInputAreaAdd.style.display = noteInputAreaAdd.style.display === 'none' ? 'block' : 'none';
        if (noteInputAreaAdd.style.display === 'block') {
          noteInputAdd.focus();
        }
      });
    }

    // Save temporary note
    if (saveNoteBtnAdd) {
      saveNoteBtnAdd.addEventListener('click', function(e) {
        e.preventDefault();
        const noteText = noteInputAdd.value.trim();
        
        if (!noteText) {
          alert('Please enter a note before saving.');
          return;
        }

        const now = new Date();
        const timeStr = now.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }) + ' at ' + now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

        const note = {
          message: noteText,
          created_at: timeStr,
          timestamp: now.toISOString()
        };

        temporaryNotes.push(note);
        localStorage.setItem('temp_habit_notes', JSON.stringify(temporaryNotes));

        // Add note to DOM safely to prevent XSS
        const noteItem = document.createElement('div');
        noteItem.className = 'note-item';
        noteItem.setAttribute('data-temp-note', 'true');
        
        const noteTextDiv = document.createElement('div');
        noteTextDiv.className = 'note-text';
        noteTextDiv.textContent = noteText; // Use textContent to prevent XSS
        
        const noteFooter = document.createElement('div');
        noteFooter.className = 'note-footer';
        
        const noteTime = document.createElement('div');
        noteTime.className = 'note-time';
        noteTime.textContent = timeStr;
        
        const noteActions = document.createElement('div');
        noteActions.className = 'note-actions';
        
        const deleteBtn = document.createElement('button');
        deleteBtn.type = 'button';
        deleteBtn.className = 'delete-note-btn';
        deleteBtn.textContent = '🗑️';
        deleteBtn.onclick = function() { deleteTempNote(this); };
        
        noteActions.appendChild(deleteBtn);
        noteFooter.appendChild(noteTime);
        noteFooter.appendChild(noteActions);
        noteItem.appendChild(noteTextDiv);
        noteItem.appendChild(noteFooter);

        if (notesListAdd) {
          notesListAdd.insertBefore(noteItem, notesListAdd.firstChild);
          noteItem.style.opacity = '0';
          setTimeout(() => {
            noteItem.style.transition = 'opacity 0.3s ease';
            noteItem.style.opacity = '1';
          }, 10);
        }

        noteInputAdd.value = '';
        noteInputAreaAdd.style.display = 'none';
      });
    }

    // Delete temporary note
    window.deleteTempNote = function(btn) {
      if (!confirm('Are you sure you want to delete this note?')) {
        return;
      }

      const noteItem = btn.closest('.note-item');
      const noteText = noteItem.querySelector('.note-text').textContent;
      
      // Remove from temporary storage
      temporaryNotes = temporaryNotes.filter(note => note.message !== noteText);
      localStorage.setItem('temp_habit_notes', JSON.stringify(temporaryNotes));

      // Remove from DOM
      noteItem.style.transition = 'opacity 0.3s ease';
      noteItem.style.opacity = '0';
      setTimeout(() => {
        noteItem.remove();
      }, 300);
    };

    // Save temporary notes when form is submitted
    const habitForm = document.getElementById('habitForm');
    if (habitForm) {
      habitForm.addEventListener('submit', function(e) {
        // Add temporary notes as hidden inputs
        if (temporaryNotes.length > 0) {
          temporaryNotes.forEach((note, index) => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = `temp_notes[${index}]`;
            input.value = note.message;
            habitForm.appendChild(input);
          });
        }
        // Clear localStorage after submission
        localStorage.removeItem('temp_habit_notes');
      });
    }
  });

</script>
@endsection
