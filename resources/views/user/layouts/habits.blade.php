@extends('user.main')

@section('title', 'My Habits | ' . Auth::user()->firstname . ' ' . Auth::user()->lastname)
@section('active-link', 'habits')
@section('page-title', 'Habits')
@section('page-description', 'Create, Edit, Delete your habits')
@section('css-file', 'habits.css')
@section('js-file', 'habits.js')

@section('content')
@if (session('success'))
<div class="success-alert" style="margin: 20px; background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb; padding: 15px; border-radius: 5px; display: flex; align-items: center;">
  <span class="success-icon" style="font-weight: bold; font-size: 1.2em; margin-right: 10px;">✓</span>
  {{ session('success') }}
</div>
@endif
<!-- Stats Grid -->
<div class="stats-grid">
  <div class="stat-card">
    <div class="stat-header">
      <span class="stat-label">Active Habits</span>
      <div class="stat-icon green-icon">
        <i class="fas fa-list"></i>
      </div>
    </div>
    <div class="stat-value">{{ $activeHabits ?? 0 }}</div>
  </div>

  <div class="stat-card">
    <div class="stat-header">
      <span class="stat-label">Current Streak</span>
      <div class="stat-icon orange-icon">
        <i class="fas fa-fire"></i>
      </div>
    </div>
    <div class="stat-value">{{ $currentStreak ?? 0 }} days</div>
  </div>
</div>
<!-- Habit List -->
<div class="habit-container">
  @if($habits->count() > 0)
  <table class="habit-table">
    <thead>
      <tr>
        <th>Category</th>
        <th>Habit Name</th>
        <th>Description</th>
        <th>Streak</th>
        <th class="flex-between">
          Actions
          <a class="add-btn" href="{{ route('user.habits.add') }}"><i class="fas fa-plus"></i>Add Habit</a>
        </th>
      </tr>
    </thead>
    <tbody>
      @foreach($habits as $habit)
      @php
        $streak = 0;
        $logs = $habit->logs()->orderBy('completed_at', 'desc')->get();
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
        $categoryName = $habit->category ? $habit->category->title : 'Uncategorized';
        $categoryColor = $habit->category ? $habit->category->color : 'gray';
      @endphp
      <tr data-habit-id="{{ $habit->id }}">
        <td>
          <span class="badge {{ $categoryColor }}" style="background-color: {{ $habit->category && $habit->category->color ? 'var(--' . $habit->category->color . '-color, #' . $habit->category->color . ')' : '#999' }};">
            {{ $categoryName }}
          </span>
        </td>
        <td><strong>{{ $habit->name }}</strong></td>
        <td>{{ $habit->description ?: 'No description' }}</td>
        <td class="streak">
          @if($streak > 0)
            🔥 {{ $streak }}
          @else
            ❄️ 0
          @endif
        </td>
        <td>
          <div class="action-container">
            <div class="action-buttons">
              <a class="btn btn-view" href="{{ route('user.habits.view', $habit->id) }}">
                <i class="fa-solid fa-expand"></i> View
              </a>
              <a class="btn btn-edit" href="{{ route('user.habits.edit', $habit->id) }}">
                <i class="fa-regular fa-pen-to-square"></i> Edit
              </a>
              <button type="button" class="btn btn-delete" data-habit-id="{{ $habit->id }}" onclick="showDeleteModal({{ $habit->id }})">
                <i class="fa-solid fa-xmark"></i> Delete
              </button>
            </div>
            <div class="mark-as-done-container">
              @php
                $today = \Carbon\Carbon::today()->toDateString();
                $isCompleted = $habit->logs()->where('completed_at', $today)->exists();
              @endphp
              @if($isCompleted)
              <button class="btn btn-completed" disabled style="background: #10b981; color: white; cursor: default;">
                <i class="fa-solid fa-check-circle"></i> Completed
              </button>
              @else
              <button class="btn btn-done" onclick="markAsDone({{ $habit->id }})">
                <i class="fa-solid fa-check"></i> Mark As Done
              </button>
              @endif
            </div>
          </div>
        </td>
      </tr>
      @endforeach
    </tbody>
  </table>
  @else
  <div style="text-align: center; padding: 60px 20px;">
    <p style="font-size: 18px; color: #666; margin-bottom: 20px;">You don't have any habits yet!</p>
    <a class="add-btn" href="{{ route('user.habits.add') }}" style="display: inline-block;">
      <i class="fas fa-plus"></i> Add Your First Habit
    </a>
  </div>
  @endif
</div>
@endsection

@section('modals')
<div id="deleteModal" class="modal-overlay" style="display: none;">
  <div class="modal-content">
    <div class="modal-header">
      <h3 class="modal-title">Delete Habit</h3>
      <span class="close-btn" onclick="closeDeleteModal()">&times;</span>
    </div>

    <div class="modal-body">
      <p>Are you sure you want to delete this habit?</p>
      <p class="modal-description">
        This action will permanently remove the habit and its streak
        history.
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
  if (!habitId) {
    console.error('No habit ID provided');
    return;
  }
  habitIdToDelete = habitId;
  const modal = document.getElementById('deleteModal');
  if (modal) {
    modal.style.display = 'flex';
  } else {
    console.error('Delete modal not found');
    alert('Error: Delete modal not found. Please refresh the page.');
  }
}

function closeDeleteModal() {
  const modal = document.getElementById('deleteModal');
  if (modal) {
    modal.style.display = 'none';
  }
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
  
  // Find the row to delete
  const habitRow = document.querySelector(`tr[data-habit-id="${habitIdToDelete}"]`) || 
                   document.querySelector(`a[data-habit-id="${habitIdToDelete}"]`)?.closest('tr');
  
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
      return response.json().catch(() => ({ success: true })); // Handle HTML redirect as success
    }
    throw new Error('Delete failed');
  })
  .then(data => {
    // Close modal
    closeDeleteModal();
    
    // Remove the row from DOM with animation
    if (habitRow) {
      habitRow.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      habitRow.style.opacity = '0';
      habitRow.style.transform = 'translateX(-20px)';
      
      setTimeout(() => {
        habitRow.remove();
        
        // Update stats
        updateStatsAfterDelete();
        
        // Refresh notifications
        if (typeof window.refreshNotifications === 'function') {
          window.refreshNotifications();
        }
        
        // Show success message
        showSuccessMessage('Habit deleted successfully!.');
      }, 300);
    } else {
      // If row not found, reload page to ensure everything is updated
      window.location.reload();
    }
  })
  .catch(error => {
    console.error('Delete error:', error);
    confirmBtn.disabled = false;
    confirmBtn.innerHTML = originalText;
    alert('Failed to delete habit. Please try again.');
  });
}

function updateStatsAfterDelete() {
  // Update active habits count
  const habitRows = document.querySelectorAll('tbody tr:not([style*="display: none"])');
  const activeHabitsCount = habitRows.length;
  
  // Find the stat card with active habits and update it
  const statCards = document.querySelectorAll('.stat-card');
  statCards.forEach(card => {
    const statLabel = card.querySelector('.stat-label');
    if (statLabel && statLabel.textContent.trim() === 'Active Habits') {
      const valueElement = card.querySelector('.stat-value');
      if (valueElement) {
        valueElement.textContent = activeHabitsCount;
      }
    }
  });
  
  // If no habits left, show empty state
  if (activeHabitsCount === 0) {
    const tbody = document.querySelector('tbody');
    if (tbody) {
      tbody.innerHTML = `
        <tr>
          <td colspan="5" style="text-align: center; padding: 60px 20px;">
            <p style="font-size: 18px; color: #666; margin-bottom: 20px;">You don't have any habits yet!</p>
            <a class="add-btn" href="{{ route('user.habits.add') }}" style="display: inline-block;">
              <i class="fas fa-plus"></i> Add Your First Habit
            </a>
          </td>
        </tr>
      `;
    }
  }
}

function showSuccessMessage(message) {
  // Remove existing success message if any
  const existingMsg = document.querySelector('.delete-success-message');
  if (existingMsg) {
    existingMsg.remove();
  }
  
  const successMsg = document.createElement('div');
  successMsg.className = 'delete-success-message';
  successMsg.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #10b981; color: white; padding: 12px 20px; border-radius: 8px; z-index: 10000; box-shadow: 0 4px 12px rgba(0,0,0,0.15); display: flex; align-items: center; gap: 8px;';
  successMsg.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
  document.body.appendChild(successMsg);
  
  setTimeout(() => {
    successMsg.style.transition = 'opacity 0.3s ease';
    successMsg.style.opacity = '0';
    setTimeout(() => successMsg.remove(), 300);
  }, 3000);
}

// Close modal when clicking outside (wait for DOM to be ready)
document.addEventListener('DOMContentLoaded', function() {
  const deleteModal = document.getElementById('deleteModal');
  if (deleteModal) {
    deleteModal.addEventListener('click', function(e) {
      if (e.target === this) {
        closeDeleteModal();
      }
    });
  }
});

function markAsDone(habitId) {
  const button = event.target.closest('.btn-done');
  if (!button) return;
  
  const originalText = button.innerHTML;
  const habitRow = button.closest('tr');
  
  // Disable button and show loading state
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
      button.innerHTML = '<i class="fa-solid fa-check-circle"></i> Completed';
      button.disabled = true;
      button.style.background = '#10b981';
      button.style.color = 'white';
      button.style.cursor = 'default';
      button.onclick = null;
      
      // Update streak if visible
      if (habitRow) {
        const streakCell = habitRow.querySelector('.streak');
        if (streakCell) {
          const currentStreak = parseInt(streakCell.textContent.match(/\d+/)?.[0] || 0);
          streakCell.innerHTML = `🔥 ${currentStreak + 1}`;
        }
        
        // Add completed class to row
        habitRow.classList.add('completed');
      }
      
      // Show success message briefly
      const successMsg = document.createElement('div');
      successMsg.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #10b981; color: white; padding: 12px 20px; border-radius: 8px; z-index: 10000; box-shadow: 0 4px 12px rgba(0,0,0,0.15);';
      successMsg.innerHTML = '<i class="fas fa-check-circle"></i> ' + data.message;
      document.body.appendChild(successMsg);
      setTimeout(() => successMsg.remove(), 3000);
      
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

</script>
@endsection
