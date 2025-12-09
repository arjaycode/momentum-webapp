@extends('admin.main')

@section('title', 'Notes Management - Momentum')
@section('active-link', 'notes')
@section('page-title', 'Notes Management')
@section('page-description', 'Monitor, Manage, and organize notes created by users')
@section('css-file', 'notes-management.css')
@section('js-file', 'notes-management.js')

@section('content')
<!-- Main Content -->
<main class="main-content">
  @if (session('success'))
  <div class="success-alert" style="margin-bottom: 20px; background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb; padding: 15px; border-radius: 5px; display: flex; align-items: center;">
    <span class="success-icon" style="font-weight: bold; font-size: 1.2em; margin-right: 10px;">✓</span>
    {{ session('success') }}
  </div>
  @endif
  @if ($errors->any())
  <div style="margin-bottom: 20px;">
    <ul class="msg" style="list-style-type: none; padding: 0;">
      @foreach ($errors->all() as $error)
      <li class="msg error" style="display: block; padding: 10px; border-radius: 8px; margin-top: 8px; font-size: 13px; background: #fff0f0; color: #9b2b2b;">{{ $error }}</li>
      @endforeach
    </ul>
  </div>
  @endif
  <!-- Stats Card -->
  <div class="stats-section">
    <div class="stat-card-single">
      <div class="stat-info">
        <span class="stat-label">Total Created Notes</span>
        <div class="stat-value">{{ $notes->count() }}</div>
      </div>
      <div class="stat-icon blue">
        <i class="fas fa-file-alt"></i>
      </div>
    </div>
  </div>

  <!-- Search and Add Button -->
  <div class="controls-section">
    <div class="search-box-container">
      <i class="fas fa-search"></i>
      <input type="text" placeholder="Search categories..." id="notesSearch" />
    </div>
    <a class="btn-primary" href=" {{ route('admin.note-management.create') }}"><i class="fas fa-plus"></i> Add New Note</a>
  </div>

  <!-- Notes List -->
  <div class="notes-list" id="notesList">
    @forelse($notes as $note)
    @php
      $user = $note->user;
      $habit = $note->habit;
      $category = $habit ? $habit->category : null;
      $categoryCount = $habit && $category ? \App\Models\Note::where('habit_id', $habit->id)->count() : 0;
    @endphp
    <div class="note-item">
      <div class="note-header">
        <div class="user-info">
          <img src="{{ $user->avatar ? asset('storage/' . $user->avatar) : 'https://ui-avatars.com/api/?name=' . urlencode($user->firstname . ' ' . $user->lastname) . '&background=random' }}" alt="{{ $user->firstname }}" class="user-avatar" />
          <div class="user-details">
            <div class="user-name">{{ $user->firstname }} {{ $user->lastname }}</div>
            <div class="user-id">ID: #{{ str_pad($user->id, 4, '0', STR_PAD_LEFT) }}</div>
          </div>
        </div>
        <div class="user-email">{{ $user->email }}</div>
        <div class="note-actions">
          <a class="action-btn edit-btn" title="Edit" href="{{ route('admin.note-management.edit', $note->id) }}"><i class="fas fa-edit"></i></a>
          <button type="button" class="action-btn delete-btn" title="Delete" 
            data-note-id="{{ $note->id }}" 
            data-delete-url="{{ route('admin.note-management.destroy', $note->id) }}" 
            data-user-name="{{ $user->firstname }} {{ $user->lastname }}" 
            data-user-id="{{ $user->id }}" 
            data-habit-name="{{ $category ? $category->title : 'General Note' }}" 
            data-note-text="{{ Str::limit($note->message, 100) }}" 
            data-user-avatar="{{ $user->avatar ? asset('storage/' . $user->avatar) : 'https://ui-avatars.com/api/?name=' . urlencode($user->firstname . ' ' . $user->lastname) . '&background=random' }}"
            onclick="event.preventDefault(); event.stopPropagation(); const btn = this; const noteId = btn.getAttribute('data-note-id'); const userName = btn.getAttribute('data-user-name') || ''; const userId = btn.getAttribute('data-user-id') || ''; const habitName = btn.getAttribute('data-habit-name') || 'General Note'; const noteText = btn.getAttribute('data-note-text') || ''; const userAvatar = btn.getAttribute('data-user-avatar') || ''; if (noteId && typeof window.showDeleteModal === 'function') { window.showDeleteModal(noteId, userName, userId, habitName, noteText, userAvatar); } else { console.error('Delete function not available'); alert('Delete functionality is loading. Please try again in a moment.'); }">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>

      <div class="note-content">
        @if($category)
        <div class="note-category">
          <div class="category-icon {{ $category->color }}">
            <i class="fas fa-{{ $category->icon }}"></i>
          </div>
          <span class="category-name">{{ $category->title }}</span>
        </div>
        @else
        <div class="note-category">
          <div class="category-icon blue">
            <i class="fas fa-sticky-note"></i>
          </div>
          <span class="category-name">General Note</span>
        </div>
        @endif

        <div class="note-text">
          <span class="note-label">Note:</span>
          <span class="note-description">{{ $note->message }}</span>
        </div>

        <div class="note-footer">
          <span class="note-meta">{{ $categoryCount > 1 ? ($categoryCount - 1) . ' other notes in the same category' : 'Created ' . $note->created_at->diffForHumans() }}</span>
          <span class="status-badge active">Active</span>
        </div>
      </div>
    </div>
    @empty
    <div class="note-item">
      <div class="note-content" style="text-align: center; padding: 40px;">
        <p style="color: #999;">No notes found</p>
        <a href="{{ route('admin.note-management.create') }}" class="btn-primary" style="margin-top: 16px; display: inline-block;">Add First Note</a>
      </div>
    </div>
    @endforelse
  </div>
</main>
@endsection

@section('modals')
@if (session('success'))
<div class="success-alert" style="position: fixed; top: 20px; right: 20px; background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb; padding: 15px; border-radius: 5px; z-index: 10000; display: flex; align-items: center;">
  <span class="success-icon" style="font-weight: bold; font-size: 1.2em; margin-right: 10px;">✓</span>
  {{ session('success') }}
</div>
@endif
<!-- Delete Confirmation Modal -->
<div id="deleteModal" class="modal">
  <div class="modal-content">
    <div class="modal-icon">❗</div>
    <p class="modal-title">Are you sure to delete note for this user?</p>

    <div class="note-preview">
      <div class="preview-header">
        <img id="modalUserAvatar" src="" alt="User" class="user-avatar" />
        <div>
          <div class="preview-user" id="modalUserName">Johnson</div>
          <div class="preview-id" id="modalUserId">ID: 4001</div>
        </div>
      </div>

      <div class="preview-habit">
        <span class="habit-icon" id="modalHabitIcon">💪</span>
        <span class="habit-name" id="modalHabitName">Fitness</span>
      </div>

      <div class="preview-note">
        <span class="note-label">Note:</span>
        <span id="modalNoteText">Felt more energized than usual. Form on squats improving. Need to
          increase push-up reps next session.</span>
      </div>
    </div>

    <form id="deleteNoteForm" method="POST" action="" onsubmit="return window.validateDeleteForm(event)">
      @csrf
      @method('DELETE')
      <div class="modal-actions">
        <button type="button" class="btn btn-cancel" id="modalCancel" onclick="window.hideDeleteModal()">Cancel</button>
        <button type="submit" class="btn btn-confirm" id="modalConfirm">
          <span id="confirmText">Confirm Delete</span>
          <span id="confirmLoading" style="display: none;">Deleting...</span>
        </button>
      </div>
    </form>
  </div>
</div>
@endsection

@section('scripts')
<script>
console.log('Notes management scripts loading...');

// Make functions globally available
window.noteIdToDelete = null;

window.showDeleteModal = function(id, userName, userId, habitName, noteText, userAvatar) {
  console.log('showDeleteModal called with id:', id);
  window.noteIdToDelete = id;
  const modal = document.getElementById('deleteModal');
  
  if (!modal) {
    console.error('Delete modal not found');
    return;
  }
  
  // Update modal content
  const userNameEl = document.getElementById('modalUserName');
  const userIdEl = document.getElementById('modalUserId');
  const habitNameEl = document.getElementById('modalHabitName');
  const noteTextEl = document.getElementById('modalNoteText');
  const userAvatarEl = document.getElementById('modalUserAvatar');
  
  if (userNameEl) userNameEl.textContent = userName || 'Unknown User';
  if (userIdEl) userIdEl.textContent = 'ID: #' + String(userId || '').padStart(4, '0');
  if (habitNameEl) habitNameEl.textContent = habitName || 'General Note';
  if (noteTextEl) noteTextEl.textContent = noteText || 'No description';
  if (userAvatarEl && userAvatar) {
    userAvatarEl.src = userAvatar;
  }
  
  // Set form action - get the delete URL from the button's data attribute
  const form = document.getElementById('deleteNoteForm');
  const deleteButton = document.querySelector(`[data-note-id="${id}"]`);
  
  if (form) {
    if (deleteButton) {
      const deleteUrl = deleteButton.getAttribute('data-delete-url');
      if (deleteUrl) {
        form.action = deleteUrl;
        console.log('Delete form action set to:', form.action);
      } else {
        // Fallback: build URL manually
        const baseUrl = '{{ url("/") }}';
        form.action = baseUrl + '/admin/note-management/' + id;
        console.log('Using fallback URL:', form.action);
      }
    } else {
      // Fallback if button not found
      const baseUrl = '{{ url("/") }}';
      form.action = baseUrl + '/admin/note-management/' + id;
      console.log('Using fallback URL (button not found):', form.action);
    }
  } else {
    console.error('Delete form not found');
  }
  
  modal.classList.add('show');
  console.log('Modal shown');
};

window.hideDeleteModal = function() {
  const modal = document.getElementById('deleteModal');
  const confirmBtn = document.getElementById('modalConfirm');
  const confirmText = document.getElementById('confirmText');
  const confirmLoading = document.getElementById('confirmLoading');
  
  if (modal) {
    modal.classList.remove('show');
  }
  
  // Reset button state
  if (confirmBtn) {
    confirmBtn.disabled = false;
  }
  if (confirmText) confirmText.style.display = 'inline';
  if (confirmLoading) confirmLoading.style.display = 'none';
  
  window.noteIdToDelete = null;
};

window.validateDeleteForm = function(event) {
  const form = document.getElementById('deleteNoteForm');
  const confirmBtn = document.getElementById('modalConfirm');
  const confirmText = document.getElementById('confirmText');
  const confirmLoading = document.getElementById('confirmLoading');
  
  if (!form || !form.action || form.action === '') {
    event.preventDefault();
    alert('Error: Delete URL not set. Please refresh the page and try again.');
    return false;
  }
  
  // Show loading state
  if (confirmBtn) {
    confirmBtn.disabled = true;
    if (confirmText) confirmText.style.display = 'none';
    if (confirmLoading) confirmLoading.style.display = 'inline';
  }
  
  console.log('Submitting delete form to:', form.action);
  return true;
};

// Initialize delete button handlers and modal functionality
function initializeDeleteButtons() {
  // Set up delete button click handlers
  const deleteButtons = document.querySelectorAll('.delete-btn');
  console.log('Found delete buttons:', deleteButtons.length);
  
  deleteButtons.forEach((btn) => {
    // Remove any existing listeners to avoid duplicates
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
    
    newBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      console.log('Delete button clicked');
      
      const noteId = this.getAttribute('data-note-id');
      const userName = this.getAttribute('data-user-name') || '';
      const userId = this.getAttribute('data-user-id') || '';
      const habitName = this.getAttribute('data-habit-name') || 'General Note';
      const noteText = this.getAttribute('data-note-text') || '';
      const userAvatar = this.getAttribute('data-user-avatar') || '';
      
      console.log('Note ID:', noteId);
      
      if (noteId && typeof window.showDeleteModal === 'function') {
        window.showDeleteModal(noteId, userName, userId, habitName, noteText, userAvatar);
      } else {
        console.error('showDeleteModal function not found or noteId missing', {
          noteId: noteId,
          showDeleteModal: typeof window.showDeleteModal
        });
        alert('Error: Delete functionality not available. Please refresh the page.');
      }
    });
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing delete buttons...');
    initializeDeleteButtons();
  });
} else {
  // DOM is already ready
  console.log('DOM already ready, initializing delete buttons...');
  initializeDeleteButtons();
}

// Also try after a short delay to catch dynamically loaded content
setTimeout(function() {
  console.log('Delayed initialization of delete buttons...');
  initializeDeleteButtons();
}, 500);

console.log('Delete modal functions available:', {
  showDeleteModal: typeof window.showDeleteModal,
  hideDeleteModal: typeof window.hideDeleteModal,
  validateDeleteForm: typeof window.validateDeleteForm
});

// Close modal when clicking outside
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('deleteModal');
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === this) {
        window.hideDeleteModal();
      }
    });
  }

  // Handle Escape key to close modal
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      const modal = document.getElementById('deleteModal');
      if (modal && modal.classList.contains('show')) {
        window.hideDeleteModal();
      }
    }
  });

  // Auto-hide success message after 3 seconds
  setTimeout(function() {
    const successAlert = document.querySelector('.success-alert');
    if (successAlert) {
      successAlert.style.transition = 'opacity 0.5s';
      successAlert.style.opacity = '0';
      setTimeout(() => successAlert.remove(), 500);
    }
  }, 3000);
});
</script>
@endsection
