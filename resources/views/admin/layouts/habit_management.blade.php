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
        <div class="stat-value">{{ $categories->count() }}</div>
      </div>
      <div class="stat-icon blue">
        <i class="fas fa-layer-group"></i>
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-info">
        <span class="stat-label">Active Categories</span>
        <div class="stat-value">{{ $categories->where('status', 'active')->count() }}</div>
      </div>
      <div class="stat-icon green">
        <i class="fas fa-check-circle"></i>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-info">
        <span class="stat-label">Inactive Categories</span>
        <div class="stat-value">{{ $categories->where('status', 'inactive')->count() }}</div>
      </div>
      <div class="stat-icon orange">
        <i class="fas fa-circle-xmark"></i>
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
      <a class="btn-secondary" href="{{ route('admin.habits.index') }}"><i class="fas fa-list"></i> Manage Habits</a>
      <a class="btn-primary" href="{{ route('admin.habit-management.create') }}"><i class="fas fa-plus"></i> Add Category</a>
    </div>
  </div>

  <!-- Categories Grid -->
  <div class="categories-grid" id="categoriesGrid">
    @foreach ($categories as $category)
    <div class="category-card" data-category="fitness" data-status="active">
      <input name="category-id" type="number" hidden value="{{ $category->id }}">
      <div class="category-header">
        <div class="category-icon {{ $category->color }}">
          <i class="fas fa-{{ $category->icon }}"></i>
        </div>
        <div class="category-actions">
          <a class="action-icon" title="Edit" href="{{ route('admin.habit-management.edit', $category->id) }}"><i class="fas fa-edit"></i></a>
          <div class="action-icon" title="Delete"><i class="fas fa-trash"></i></div>
        </div>
      </div>
      <h3 class="category-title">{{ $category->title }}</h3>
      <p class="category-description">
        {{ $category->description }}
      </p>
      <div class="category-footer">
        <span class="habit-count">{{ $category->habits_count }} {{ $category->habits_count == 1 ? 'habit' : 'habits' }}</span>
        <span class="status-badge {{ $category->status }}">{{ $category->status }}</span>
      </div>
    </div>
    @endforeach
  </div>
</main>
@endsection

@section('modals')
<!-- MODAL -->
<div id="deleteConfirmationModal" class="modal-backdrop">
  <div class="modal-content">
    <div class="modal-header">
      <div class="icon-container">&#33;</div>
      <p>Are you sure to **delete this category**?</p>
    </div>

    <div id="modalCategoryPreview" class="category-preview"></div>

    <div class="modal-actions">
      <button id="modalCancelButton" class="btn btn-cancel">Cancel</button>
      <button id="modalConfirmButton" class="btn btn-confirm">
        Confirm
      </button>
    </div>
  </div>
</div>
@endsection
