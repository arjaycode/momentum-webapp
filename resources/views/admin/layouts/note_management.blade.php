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
  <!-- Stats Card -->
  <div class="stats-section">
    <div class="stat-card-single">
      <div class="stat-info">
        <span class="stat-label">Total Created Notes</span>
        <div class="stat-value">6</div>
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
    <button class="btn-primary">
      <i class="fas fa-plus"></i> Add New Note
    </button>
  </div>

  <!-- Notes List -->
  <div class="notes-list" id="notesList">
    <!-- Note Item 1 -->
    <div class="note-item">
      <div class="note-header">
        <div class="user-info">
          <img src="https://i.pravatar.cc/40?img=2" alt="Johnson" class="user-avatar" />
          <div class="user-details">
            <div class="user-name">Johnson</div>
            <div class="user-id">ID: #001</div>
          </div>
        </div>
        <div class="user-email">sarah.johnson@email.com</div>
        <div class="note-actions">
          <button class="action-btn edit-btn" title="Edit">
            <i class="fas fa-edit"></i>
          </button>
          <button class="action-btn delete-btn" title="Delete">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>

      <div class="note-content">
        <div class="note-category">
          <div class="category-icon blue">
            <i class="fas fa-dumbbell"></i>
          </div>
          <span class="category-name">Fitness</span>
        </div>

        <div class="note-text">
          <span class="note-label">Note:</span>
          <span class="note-description">Felt more energized than usual. Form on squats improving.
            Need to increase push-up reps next session.</span>
        </div>

        <div class="note-footer">
          <span class="note-meta">12 other notes is in the same category</span>
          <span class="status-badge active">Active</span>
        </div>
      </div>
    </div>

    <!-- Note Item 2 -->
    <div class="note-item">
      <div class="note-header">
        <div class="user-info">
          <img src="https://i.pravatar.cc/40?img=3" alt="Johnson" class="user-avatar" />
          <div class="user-details">
            <div class="user-name">Johnson</div>
            <div class="user-id">ID: #001</div>
          </div>
        </div>
        <div class="user-email">sarah.johnson@email.com</div>
        <div class="note-actions">
          <button class="action-btn edit-btn" title="Edit">
            <i class="fas fa-edit"></i>
          </button>
          <button class="action-btn delete-btn" title="Delete">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>

      <div class="note-content">
        <div class="note-category">
          <div class="category-icon blue">
            <i class="fas fa-dumbbell"></i>
          </div>
          <span class="category-name">Fitness</span>
        </div>

        <div class="note-text">
          <span class="note-label">Note:</span>
          <span class="note-description">Felt more energized than usual. Form on squats improving.
            Need to increase push-up reps next session.</span>
        </div>

        <div class="note-footer">
          <span class="note-meta">12 other notes is in the same category</span>
          <span class="status-badge active">Active</span>
        </div>
      </div>
    </div>

    <!-- Note Item 3 -->
    <div class="note-item">
      <div class="note-header">
        <div class="user-info">
          <img src="https://i.pravatar.cc/40?img=4" alt="Johnson" class="user-avatar" />
          <div class="user-details">
            <div class="user-name">Johnson</div>
            <div class="user-id">ID: #001</div>
          </div>
        </div>
        <div class="user-email">sarah.johnson@email.com</div>
        <div class="note-actions">
          <button class="action-btn edit-btn" title="Edit">
            <i class="fas fa-edit"></i>
          </button>
          <button class="action-btn delete-btn" title="Delete">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>

      <div class="note-content">
        <div class="note-category">
          <div class="category-icon blue">
            <i class="fas fa-dumbbell"></i>
          </div>
          <span class="category-name">Fitness</span>
        </div>

        <div class="note-text">
          <span class="note-label">Note:</span>
          <span class="note-description">Felt more energized than usual. Form on squats improving.
            Need to increase push-up reps next session.</span>
        </div>

        <div class="note-footer">
          <span class="note-meta">12 other notes is in the same category</span>
          <span class="status-badge active">Active</span>
        </div>
      </div>
    </div>

    <!-- Note Item 4 -->
    <div class="note-item">
      <div class="note-header">
        <div class="user-info">
          <img src="https://i.pravatar.cc/40?img=5" alt="Johnson" class="user-avatar" />
          <div class="user-details">
            <div class="user-name">Johnson</div>
            <div class="user-id">ID: #001</div>
          </div>
        </div>
        <div class="user-email">sarah.johnson@email.com</div>
        <div class="note-actions">
          <button class="action-btn edit-btn" title="Edit">
            <i class="fas fa-edit"></i>
          </button>
          <button class="action-btn delete-btn" title="Delete">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>

      <div class="note-content">
        <div class="note-category">
          <div class="category-icon purple">
            <i class="fas fa-brain"></i>
          </div>
          <span class="category-name">Mental Health</span>
        </div>

        <div class="note-text">
          <span class="note-label">Note:</span>
          <span class="note-description">Morning meditation helped reduce anxiety. Feeling more
            centered and focused throughout the day.</span>
        </div>

        <div class="note-footer">
          <span class="note-meta">8 other notes is in the same category</span>
          <span class="status-badge active">Active</span>
        </div>
      </div>
    </div>

    <!-- Note Item 5 -->
    <div class="note-item">
      <div class="note-header">
        <div class="user-info">
          <img src="https://i.pravatar.cc/40?img=6" alt="Johnson" class="user-avatar" />
          <div class="user-details">
            <div class="user-name">Johnson</div>
            <div class="user-id">ID: #001</div>
          </div>
        </div>
        <div class="user-email">sarah.johnson@email.com</div>
        <div class="note-actions">
          <button class="action-btn edit-btn" title="Edit">
            <i class="fas fa-edit"></i>
          </button>
          <button class="action-btn delete-btn" title="Delete">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>

      <div class="note-content">
        <div class="note-category">
          <div class="category-icon green">
            <i class="fas fa-graduation-cap"></i>
          </div>
          <span class="category-name">Learning</span>
        </div>

        <div class="note-text">
          <span class="note-label">Note:</span>
          <span class="note-description">Completed chapter 5 on JavaScript closures. Need to
            practice more with real-world examples.</span>
        </div>

        <div class="note-footer">
          <span class="note-meta">15 other notes is in the same category</span>
          <span class="status-badge active">Active</span>
        </div>
      </div>
    </div>

    <!-- Note Item 6 -->
    <div class="note-item">
      <div class="note-header">
        <div class="user-info">
          <img src="https://i.pravatar.cc/40?img=7" alt="Johnson" class="user-avatar" />
          <div class="user-details">
            <div class="user-name">Johnson</div>
            <div class="user-id">ID: #001</div>
          </div>
        </div>
        <div class="user-email">sarah.johnson@email.com</div>
        <div class="note-actions">
          <button class="action-btn edit-btn" title="Edit">
            <i class="fas fa-edit"></i>
          </button>
          <button class="action-btn delete-btn" title="Delete">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>

      <div class="note-content">
        <div class="note-category">
          <div class="category-icon orange">
            <i class="fas fa-briefcase"></i>
          </div>
          <span class="category-name">Productivity</span>
        </div>

        <div class="note-text">
          <span class="note-label">Note:</span>
          <span class="note-description">Used Pomodoro technique today. Completed 8 sessions with
            great focus. Will continue this approach.</span>
        </div>

        <div class="note-footer">
          <span class="note-meta">7 other notes is in the same category</span>
          <span class="status-badge active">Active</span>
        </div>
      </div>
    </div>
  </div>
</main>
@endsection
