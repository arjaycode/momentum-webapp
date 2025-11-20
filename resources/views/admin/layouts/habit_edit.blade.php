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
    <button class="back-btn" onclick="window.history.back()">
      <i class="fas fa-arrow-left"></i>
      Back to Habit Management
    </button>
  </div>

  <!-- Edit Category Form -->
  <div class="form-container">
    <form id="editCategoryForm" class="category-form">
      <!-- Habit Name -->
      <div class="form-group">
        <label for="habitName">Habit Name</label>
        <input type="text" id="habitName" name="habitName" value="Mental Health" class="form-input" required />
      </div>

      <!-- Description -->
      <div class="form-group">
        <label for="description">Description</label>
        <textarea id="description" name="description" rows="5" class="form-textarea" required>
Mindfulness, meditation and mental wellness</textarea>
      </div>

      <!-- Status -->
      <div class="form-group">
        <label for="status">Status</label>
        <select id="status" name="status" class="form-select" required>
          <option value="">Select status</option>
          <option value="active" selected>Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <!-- Color Theme -->
      <div class="form-group">
        <label>Color Theme</label>
        <div class="color-picker">
          <input type="radio" name="color" id="color-blue" value="blue" class="color-radio" />
          <label for="color-blue" class="color-option blue" title="Blue">
            <span class="color-circle"></span>
          </label>

          <input type="radio" name="color" id="color-green" value="green" class="color-radio" />
          <label for="color-green" class="color-option green" title="Green">
            <span class="color-circle"></span>
          </label>

          <input type="radio" name="color" id="color-purple" value="purple" class="color-radio" checked />
          <label for="color-purple" class="color-option purple" title="Purple">
            <span class="color-circle"></span>
          </label>

          <input type="radio" name="color" id="color-red" value="red" class="color-radio" />
          <label for="color-red" class="color-option red" title="Red">
            <span class="color-circle"></span>
          </label>

          <input type="radio" name="color" id="color-orange" value="orange" class="color-radio" />
          <label for="color-orange" class="color-option orange" title="Orange">
            <span class="color-circle"></span>
          </label>
        </div>
      </div>

      <!-- Icon -->
      <div class="form-group">
        <label>Icon</label>
        <div class="icon-picker">
          <input type="radio" name="icon" id="icon-heart" value="heart" class="icon-radio" />
          <label for="icon-heart" class="icon-option" title="Heart">
            <i class="fas fa-heart"></i>
          </label>

          <input type="radio" name="icon" id="icon-brain" value="brain" class="icon-radio" checked />
          <label for="icon-brain" class="icon-option" title="Brain">
            <i class="fas fa-brain"></i>
          </label>

          <input type="radio" name="icon" id="icon-book" value="book" class="icon-radio" />
          <label for="icon-book" class="icon-option" title="Book">
            <i class="fas fa-book"></i>
          </label>

          <input type="radio" name="icon" id="icon-star" value="star" class="icon-radio" />
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
