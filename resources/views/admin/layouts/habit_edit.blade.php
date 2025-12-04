@extends('admin.main')

@section('title', 'Edit Habit Category - Momentum')
@section('active-link', 'habits')
@section('page-title', 'Edit Habit Category')
@section('page-description', 'Manage and organize your habit categories')
@section('css-file', 'edit_habit_category.css')
@section('js-file', 'edit_habit_category.js')

@section('content')
<!-- Main Content -->
<main class="main-content">
  <!-- Back Button -->
  <div class="back-section">
    <a href="{{ route('admin.habit-management') }}" class="back-btn">
      <i class="fas fa-arrow-left"></i>
      Back to Habit Management
    </a>
  </div>

  <!-- Edit Category Form -->
  <div class="form-container">
    <form id="editCategoryForm" class="category-form" action="{{ route('admin.habit-management.edit.submit', $category->id) }}" method="POST">
      @csrf
      @method('PATCH')
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
      <!-- Habit Name -->
      <div class="form-group">
        <label for="title">Habit Category Name</label>
        <input type="text" id="habitName" name="title" value="{{ $category->title }}" class="form-input" required />
      </div>

      <!-- Description -->
      <div class="form-group">
        <label for="description">Description</label>
        <textarea id="description" name="description" rows="5" class="form-textarea">{{ $category->description ?? "" }}</textarea>
      </div>

      <!-- Status -->
      <div class="form-group">
        <label for="status">Status</label>
        <select id="status" name="status" class="form-select" required>
          <option value="">Select status</option>
          <option value="active" {{ $category->status == "active" ? "selected": "" }}>Active</option>
          <option value="inactive" {{ $category->status == "inactive" ? "selected": "" }}>Inactive</option>
        </select>
      </div>

      <!-- Color Theme -->
      <div class="form-group">
        <label>Color Theme</label>
        <div class="color-picker">
          <input type="radio" name="color" id="color-blue" value="blue" class="color-radio" {{ $category->color == "blue" ? "checked": ""}} />
          <label for="color-blue" class="color-option blue" title="Blue">
            <span class="color-circle"></span>
          </label>

          <input type="radio" name="color" id="color-green" value="green" class="color-radio" {{ $category->color == "green" ? "checked": ""}} />
          <label for="color-green" class="color-option green" title="Green">
            <span class="color-circle"></span>
          </label>

          <input type="radio" name="color" id="color-purple" value="purple" class="color-radio" {{ $category->color == "purple" ? "checked": ""}} />
          <label for="color-purple" class="color-option purple" title="Purple">
            <span class="color-circle"></span>
          </label>

          <input type="radio" name="color" id="color-red" value="red" class="color-radio" {{ $category->color == "red" ? "checked": ""}} />
          <label for="color-red" class="color-option red" title="Red">
            <span class="color-circle"></span>
          </label>

          <input type="radio" name="color" id="color-orange" value="orange" class="color-radio" {{ $category->color == "orange" ? "checked": ""}} />
          <label for="color-orange" class="color-option orange" title="Orange">
            <span class="color-circle"></span>
          </label>
        </div>
      </div>

      <!-- Icon -->
      <div class="form-group">
        <label>Icon</label>
        <div class="icon-picker">
          <input type="radio" name="icon" id="icon-heart" value="heart" class="icon-radio" {{ $category->icon == "heart" ? "checked": "" }} />
          <label for="icon-heart" class="icon-option" title="Heart">
            <i class="fas fa-heart"></i>
          </label>

          <input type="radio" name="icon" id="icon-dumbbell" value="dumbbell" class="icon-radio" {{ $category->icon == "dumbbell" ? "checked": "" }} />
          <label for="icon-dumbbell" class="icon-option" title="Bumbbell">
            <i class="fas fa-dumbbell"></i>
          </label>

          <input type="radio" name="icon" id="icon-brain" value="brain" class="icon-radio" {{ $category->icon == "brain" ? "checked": "" }} />
          <label for="icon-brain" class="icon-option" title="Brain">
            <i class="fas fa-brain"></i>
          </label>

          <input type="radio" name="icon" id="icon-book" value="book" class="icon-radio" {{ $category->icon == "book" ? "checked": "" }} />
          <label for="icon-book" class="icon-option" title="Book">
            <i class="fas fa-book"></i>
          </label>

          <input type="radio" name="icon" id="icon-star" value="star" class="icon-radio" {{ $category->icon == "star" ? "checked": "" }} />
          <label for="icon-star" class="icon-option" title="Star">
            <i class="fas fa-star"></i>
          </label>
        </div>
      </div>

      <!-- Form Actions -->
      <div class="form-actions">
        <button type="button" class="btn-cancel" id="cancelBtn">
          Cancel
        </button>
        <button type="submit" class="btn-save">
          <i class="fas fa-check"></i>
          Save Changes
        </button>
      </div>
    </form>
  </div>
</main>
@endsection
