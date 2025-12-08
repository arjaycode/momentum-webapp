@extends('user.main')

@section('title', 'View Habit: ' . $habit->name . ' | ' . Auth::user()->firstname . ' ' . Auth::user()->lastname)
@section('active-link', 'habits')
@section('page-title', 'View Habit')
@section('page-description', 'See your habit details and progress')
@section('css-file', 'habits.css')
@section('js-file', 'habits_view.js')

@section('content')
@if (session('success'))
<div class="success-alert" style="margin: 20px; background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb; padding: 15px; border-radius: 5px; display: flex; align-items: center;">
  <span class="success-icon" style="font-weight: bold; font-size: 1.2em; margin-right: 10px;">✓</span>
  {{ session('success') }}
</div>
@endif

<div class="content-area" data-habit-id="{{ $habit->id }}">
  <div class="details-section">
    <div class="form-group">
      <label class="form-label">Habit Title</label>
      <input type="text" class="form-input" id="habitTitle" value="{{ $habit->name }}" readonly />
    </div>

    <div class="form-group">
      <label class="form-label">Habit Category</label>
      <input type="text" class="form-input" value="{{ $habit->category ? $habit->category->title : 'Uncategorized' }}" readonly style="background-color: {{ $habit->category && $habit->category->color ? 'var(--' . $habit->category->color . '-color, #' . $habit->category->color . ')' : '#999' }}20; color: {{ $habit->category && $habit->category->color ? 'var(--' . $habit->category->color . '-color, #' . $habit->category->color . ')' : '#999' }};" />
    </div>

    <div class="form-group">
      <label class="form-label">Description</label>
      <textarea class="form-textarea" id="habitDesc" readonly>{{ $habit->description ?: 'No description provided' }}</textarea>
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
          <input type="checkbox" id="notifToggle" {{ $habit->enable_push_notifications ? 'checked' : '' }} disabled />
          <span class="toggle-slider"></span>
        </label>
      </div>
      <div class="notification-time">⏰ {{ $habit->enable_push_notifications ? 'Enabled' : 'Disabled' }}</div>
    </div>

    <div class="completion-history-section" style="margin-top: 30px;">
      <h2 class="notes-title">Completion History</h2>
      @if($logs->count() > 0)
      <div class="logs-list" style="max-height: 300px; overflow-y: auto; margin-top: 15px;">
        @foreach($logs as $log)
        <div class="log-item" style="padding: 12px; border-bottom: 1px solid #eee; display: flex; align-items: center; gap: 12px;">
          <div style="width: 40px; height: 40px; border-radius: 50%; background: #10b981; display: flex; align-items: center; justify-content: center; color: white; font-size: 18px;">
            <i class="fas fa-check"></i>
          </div>
          <div style="flex: 1;">
            <div style="font-weight: 600; font-size: 14px;">Completed</div>
            <div style="font-size: 12px; color: #666;">{{ \Carbon\Carbon::parse($log->completed_at)->format('F j, Y') }}</div>
          </div>
        </div>
        @endforeach
      </div>
      @else
      <div style="text-align: center; padding: 40px 20px; color: #999;">
        <i class="fas fa-calendar-times" style="font-size: 48px; margin-bottom: 12px; opacity: 0.5;"></i>
        <p>No completion history yet. Start tracking your habit!</p>
      </div>
      @endif
    </div>

    <div class="notes-section" style="margin-top: 30px;">
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

    <div class="action-buttons-section" style="margin-top: 30px; display: flex; gap: 12px; flex-wrap: wrap;">
      <a href="{{ route('user.habits.edit', $habit->id) }}" class="btn btn-edit" style="display: inline-flex; align-items: center; gap: 8px; padding: 10px 20px; background: #007bff; color: white; text-decoration: none; border-radius: 6px;">
        <i class="fa-regular fa-pen-to-square"></i> Edit Habit
      </a>
      <button onclick="showDeleteModal({{ $habit->id }})" class="btn btn-delete" style="display: inline-flex; align-items: center; gap: 8px; padding: 10px 20px; background: #dc3545; color: white; border: none; border-radius: 6px; cursor: pointer;">
        <i class="fa-solid fa-xmark"></i> Delete Habit
      </button>
      @php
        $today = \Carbon\Carbon::today()->toDateString();
        $isCompleted = $habit->logs()->where('completed_at', $today)->exists();
      @endphp
      @if(!$isCompleted)
      <button onclick="markAsDoneFromView({{ $habit->id }})" class="btn btn-done" style="display: inline-flex; align-items: center; gap: 8px; padding: 10px 20px; background: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer;">
        <i class="fa-solid fa-check"></i> Mark As Done Today
      </button>
      @else
      <button disabled class="btn btn-completed" style="display: inline-flex; align-items: center; gap: 8px; padding: 10px 20px; background: #10b981; color: white; border: none; border-radius: 6px; cursor: default; opacity: 0.7;">
        <i class="fa-solid fa-check-circle"></i> Completed Today
      </button>
      @endif
    </div>
  </div>

  <div class="stats-panel">
    <div class="days-selector">
      <div class="form-label">Target Days</div>
      <div class="days-grid" id="daysGrid">
        @php
          $targetDays = $habit->target_days ?? [];
          $days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
          $dayInitials = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
        @endphp
        @foreach($days as $index => $day)
        <div class="day-circle {{ in_array($day, $targetDays) ? 'active' : 'inactive' }}" data-day="{{ $day }}">
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
      <div class="days-info">{{ count($targetDays) }} {{ count($targetDays) == 1 ? 'day' : 'days' }} per week</div>
    </div>

    <div class="progress-stats">
      <div class="stat-label">Progress Overview</div>
      <div class="stats-row">
        <div class="stat-item">
          <div class="stat-value blue" id="currentStreak">{{ $streak }}</div>
          <div class="stat-description">Current Streak</div>
        </div>
        <div class="stat-item">
          <div class="stat-value purple" id="successRate">
            @php
              $targetDays = $habit->target_days ?? [];
              $totalPossible = 0;
              $totalCompleted = $logs->count();
              
              // Calculate total possible days since habit creation
              $createdAt = \Carbon\Carbon::parse($habit->created_at);
              $now = \Carbon\Carbon::now();
              $daysSinceCreation = $createdAt->diffInDays($now);
              
              // Count how many target days have passed since creation
              $currentDate = $createdAt->copy();
              while ($currentDate->lte($now)) {
                $dayName = $currentDate->format('D');
                $dayShort = substr($dayName, 0, 3);
                if (in_array($dayShort, $targetDays)) {
                  $totalPossible++;
                }
                $currentDate->addDay();
              }
              
              $successRate = $totalPossible > 0 ? round(($totalCompleted / $totalPossible) * 100) : 0;
            @endphp
            {{ $successRate }}%
          </div>
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

<div style="display: flex; gap: 12px; margin-top: 30px;">
  <a class="save-changes-btn" href="{{ route('user.habits') }}" style="text-decoration: none; display: inline-block;">
    <i class="fas fa-arrow-left"></i> Back to Habits
  </a>
</div>

<!-- Delete Modal -->
<div id="deleteModal" class="modal-overlay" style="display: none;">
  <div class="modal-content">
    <div class="modal-header">
      <h3 class="modal-title">Delete Habit</h3>
      <span class="close-btn" onclick="closeDeleteModal()">&times;</span>
    </div>
    <div class="modal-body">
      <p>Are you sure you want to delete "<strong>{{ $habit->name }}</strong>"?</p>
      <p class="modal-description">
        This action will permanently remove the habit and all its completion history. This cannot be undone.
      </p>
    </div>
    <div class="modal-footer">
      <button id="cancelBtn" class="btn btn-secondary" onclick="closeDeleteModal()">Cancel</button>
      <button id="confirmDeleteBtn" class="btn btn-danger" onclick="confirmDelete()">
        Yes, Delete
      </button>
    </div>
  </div>
</div>

<script>
let habitIdToDelete = null;

function showDeleteModal(habitId) {
  habitIdToDelete = habitId;
  document.getElementById('deleteModal').style.display = 'flex';
}

function closeDeleteModal() {
  document.getElementById('deleteModal').style.display = 'none';
  habitIdToDelete = null;
}

function confirmDelete() {
  if (!habitIdToDelete) {
    alert('Error: No habit selected for deletion.');
    return;
  }
  
  const confirmBtn = document.getElementById('confirmDeleteBtn');
  const originalText = confirmBtn.innerHTML;
  confirmBtn.disabled = true;
  confirmBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Deleting...';
  
  fetch(`/user/habits/delete/${habitIdToDelete}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': '{{ csrf_token() }}',
      'X-Requested-With': 'XMLHttpRequest',
      'Accept': 'application/json'
    },
    credentials: 'same-origin'
  })
  .then(response => {
    if (response.ok) {
      return response.json().catch(() => ({ success: true }));
    }
    throw new Error('Delete failed');
  })
  .then(data => {
    // Show success message
    const successMsg = document.createElement('div');
    successMsg.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #10b981; color: white; padding: 12px 20px; border-radius: 8px; z-index: 10000; box-shadow: 0 4px 12px rgba(0,0,0,0.15); display: flex; align-items: center; gap: 8px;';
    successMsg.innerHTML = '<i class="fas fa-check-circle"></i> Habit deleted successfully! Redirecting...';
    document.body.appendChild(successMsg);
    
    // Refresh notifications before redirect
    if (typeof window.refreshNotifications === 'function') {
      window.refreshNotifications();
    }
    
    // Redirect to habits list after a short delay
    setTimeout(() => {
      window.location.href = '{{ route("user.habits") }}';
    }, 1500);
  })
  .catch(error => {
    console.error('Delete error:', error);
    confirmBtn.disabled = false;
    confirmBtn.innerHTML = originalText;
    alert('Failed to delete habit. Please try again.');
  });
}

function markAsDoneFromView(habitId) {
  const button = event.target.closest('.btn-done');
  if (!button) return;
  
  const originalText = button.innerHTML;
  button.disabled = true;
  button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Marking...';
  
  fetch(`/user/habits/${habitId}/mark-done`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': '{{ csrf_token() }}',
      'X-Requested-With': 'XMLHttpRequest'
    },
    credentials: 'same-origin'
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      // Change button to completed state
      button.className = 'btn btn-completed';
      button.innerHTML = '<i class="fa-solid fa-check-circle"></i> Completed Today';
      button.disabled = true;
      button.style.opacity = '0.7';
      button.onclick = null;
      
      // Refresh notifications before reload
      if (typeof window.refreshNotifications === 'function') {
        window.refreshNotifications();
      }
      
      // Reload page to update stats and history
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      button.disabled = false;
      button.innerHTML = originalText;
      alert(data.message);
    }
  })
  .catch(error => {
    console.error('Error:', error);
    button.disabled = false;
    button.innerHTML = originalText;
    alert('An error occurred. Please try again.');
  });
}

// Close modal when clicking outside
document.getElementById('deleteModal')?.addEventListener('click', function(e) {
  if (e.target === this) {
    closeDeleteModal();
  }
});
</script>
@endsection
