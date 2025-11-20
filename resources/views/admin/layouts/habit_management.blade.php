@extends('admin.main')

@section('title', 'Habits Management - Momentum')
@section('active-link', 'habits')
@section('page-title', 'Habits Category Management')
@section('page-description', 'Manage and organize your habit categories')
@section('css-file', 'habit-management.css')
@section('js-file', 'habit-management.js')

@section('content')
<!-- Main Content -->
<main class="main-content">
  <!-- Stats Cards -->
  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-info">
        <span class="stat-label">Total Categories</span>
        <div class="stat-value">6</div>
      </div>
      <div class="stat-icon blue">
        <i class="fas fa-layer-group"></i>
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-info">
        <span class="stat-label">Active Categories</span>
        <div class="stat-value">5</div>
      </div>
      <div class="stat-icon green">
        <i class="fas fa-check-circle"></i>
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-info">
        <span class="stat-label">Total Habits</span>
        <div class="stat-value">55</div>
      </div>
      <div class="stat-icon purple">
        <i class="fas fa-list"></i>
      </div>
    </div>
  </div>

  <!-- Search and Filter -->
  <div class="controls-section">
    <div class="search-box-container">
      <i class="fas fa-search"></i>
      <input type="text" placeholder="Search categories..." id="categorySearch" />
    </div>
    <div class="controls-right">
      <select class="filter-select" id="categoryFilter">
        <option value="">All Categories</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
      <button class="btn-primary">
        <i class="fas fa-plus"></i> Add Category
      </button>
    </div>
  </div>

  <!-- Categories Grid -->
  <div class="categories-grid" id="categoriesGrid">
    <!-- Fitness Category -->
    <div class="category-card" data-category="fitness" data-status="active">
      <div class="category-header">
        <div class="category-icon blue">
          <i class="fas fa-dumbbell"></i>
        </div>
        <div class="category-actions">
          <button class="action-icon" title="Edit">
            <i class="fas fa-edit"></i>
          </button>
          <button class="action-icon" title="Delete">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
      <h3 class="category-title">Fitness</h3>
      <p class="category-description">
        Physical health and exercise related habits
      </p>
      <div class="category-footer">
        <span class="habit-count">12 habits</span>
        <span class="status-badge active">Active</span>
      </div>
    </div>

    <!-- Mental Health Category -->
    <div class="category-card" data-category="mental-health" data-status="active">
      <div class="category-header">
        <div class="category-icon purple">
          <i class="fas fa-brain"></i>
        </div>
        <div class="category-actions">
          <button class="action-icon" title="Edit">
            <i class="fas fa-edit"></i>
          </button>
          <button class="action-icon" title="Delete">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
      <h3 class="category-title">Mental Health</h3>
      <p class="category-description">
        Mindfulness, meditation and mental wellness
      </p>
      <div class="category-footer">
        <span class="habit-count">8 habits</span>
        <span class="status-badge active">Active</span>
      </div>
    </div>

    <!-- Learning Category -->
    <div class="category-card" data-category="learning" data-status="active">
      <div class="category-header">
        <div class="category-icon green">
          <i class="fas fa-graduation-cap"></i>
        </div>
        <div class="category-actions">
          <button class="action-icon" title="Edit">
            <i class="fas fa-edit"></i>
          </button>
          <button class="action-icon" title="Delete">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
      <h3 class="category-title">Learning</h3>
      <p class="category-description">
        Educational and skill development habits
      </p>
      <div class="category-footer">
        <span class="habit-count">15 habits</span>
        <span class="status-badge active">Active</span>
      </div>
    </div>

    <!-- Productivity Category -->
    <div class="category-card" data-category="productivity" data-status="active">
      <div class="category-header">
        <div class="category-icon orange">
          <i class="fas fa-briefcase"></i>
        </div>
        <div class="category-actions">
          <button class="action-icon" title="Edit">
            <i class="fas fa-edit"></i>
          </button>
          <button class="action-icon" title="Delete">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
      <h3 class="category-title">Productivity</h3>
      <p class="category-description">
        Work efficiency and time management
      </p>
      <div class="category-footer">
        <span class="habit-count">7 habits</span>
        <span class="status-badge active">Active</span>
      </div>
    </div>

    <!-- Health Category -->
    <div class="category-card" data-category="health" data-status="inactive">
      <div class="category-header">
        <div class="category-icon red">
          <i class="fas fa-heart"></i>
        </div>
        <div class="category-actions">
          <button class="action-icon" title="Edit">
            <i class="fas fa-edit"></i>
          </button>
          <button class="action-icon" title="Delete">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
      <h3 class="category-title">Health</h3>
      <p class="category-description">
        General health and wellness habits
      </p>
      <div class="category-footer">
        <span class="habit-count">10 habits</span>
        <span class="status-badge inactive">Inactive</span>
      </div>
    </div>

    <!-- Social Category -->
    <div class="category-card" data-category="social" data-status="active">
      <div class="category-header">
        <div class="category-icon indigo">
          <i class="fas fa-users"></i>
        </div>
        <div class="category-actions">
          <button class="action-icon" title="Edit">
            <i class="fas fa-edit"></i>
          </button>
          <button class="action-icon" title="Delete">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
      <h3 class="category-title">Social</h3>
      <p class="category-description">
        Relationships and social interaction habits
      </p>
      <div class="category-footer">
        <span class="habit-count">5 habits</span>
        <span class="status-badge active">Active</span>
      </div>
    </div>
  </div>
</main>
@endsection
