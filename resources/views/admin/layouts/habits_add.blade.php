@extends('admin.main')

@section('title', 'Add New Habit - Momentum')
@section('active-link', 'habits-management')
@section('page-title', 'Add New Habit')
@section('page-description', 'Create a new habit for a user')
@section('css-file', 'add_habit.css')
@section('js-file', 'add_habit.js')

@section('content')
<!-- Main Content -->
<main class="main-content">
  <!-- Back Button -->
  <div class="back-section">
    <a class="back-btn" href="{{ route('admin.habits.index') }}"><i class="fas fa-arrow-left"></i>
      Back to Habits Management</a>
  </div>

  <!-- Add Habit Form -->
  <div class="form-container">
    <form class="habit-form" action="{{ route('admin.habits.store') }}" method="POST">
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

      <!-- User Selection -->
      <div class="form-group">
        <label for="user_id">User <span class="required">*</span></label>
        <select id="user_id" name="user_id" class="form-select" required>
          <option value="">Select User</option>
          @foreach($users as $user)
          <option value="{{ $user->id }}" {{ old('user_id') == $user->id ? 'selected' : '' }}>
            {{ $user->firstname }} {{ $user->lastname }} ({{ $user->email }})
          </option>
          @endforeach
        </select>
      </div>

      <!-- Habit Name -->
      <div class="form-group">
        <label for="name">Habit Name <span class="required">*</span></label>
        <input type="text" id="name" name="name" placeholder="Enter habit name..." class="form-input" value="{{ old('name') }}" required />
      </div>

      <!-- Category -->
      <div class="form-group">
        <label for="category_id">Category</label>
        <select id="category_id" name="category_id" class="form-select">
          <option value="">Select Category (Optional)</option>
          @foreach($categories as $category)
          <option value="{{ $category->id }}" {{ old('category_id') == $category->id ? 'selected' : '' }}>
            {{ $category->title }}
          </option>
          @endforeach
        </select>
      </div>

      <!-- Description -->
      <div class="form-group">
        <label for="description">Description</label>
        <textarea id="description" name="description" placeholder="Enter description..." rows="5" class="form-textarea">{{ old('description') }}</textarea>
      </div>

      <!-- Target Days -->
      <div class="form-group">
        <label>Target Days <span class="required">*</span></label>
        <div class="days-selector">
          <div class="days-grid">
            <label class="day-circle inactive">
              <input type="checkbox" name="target_days[]" value="Mon" {{ in_array('Mon', old('target_days', [])) ? 'checked' : '' }}>
              <span class="day-initial">M</span>
            </label>
            <label class="day-circle inactive">
              <input type="checkbox" name="target_days[]" value="Tue" {{ in_array('Tue', old('target_days', [])) ? 'checked' : '' }}>
              <span class="day-initial">T</span>
            </label>
            <label class="day-circle inactive">
              <input type="checkbox" name="target_days[]" value="Wed" {{ in_array('Wed', old('target_days', [])) ? 'checked' : '' }}>
              <span class="day-initial">W</span>
            </label>
            <label class="day-circle inactive">
              <input type="checkbox" name="target_days[]" value="Thu" {{ in_array('Thu', old('target_days', [])) ? 'checked' : '' }}>
              <span class="day-initial">T</span>
            </label>
            <label class="day-circle inactive">
              <input type="checkbox" name="target_days[]" value="Fri" {{ in_array('Fri', old('target_days', [])) ? 'checked' : '' }}>
              <span class="day-initial">F</span>
            </label>
            <label class="day-circle inactive">
              <input type="checkbox" name="target_days[]" value="Sat" {{ in_array('Sat', old('target_days', [])) ? 'checked' : '' }}>
              <span class="day-initial">S</span>
            </label>
            <label class="day-circle inactive">
              <input type="checkbox" name="target_days[]" value="Sun" {{ in_array('Sun', old('target_days', [])) ? 'checked' : '' }}>
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
      </div>

      <!-- Push Notifications -->
      <div class="form-group">
        <label class="checkbox-label">
          <input type="checkbox" name="enable_push_notifications" value="1" {{ old('enable_push_notifications') ? 'checked' : '' }}>
          <span>Enable Push Notifications</span>
        </label>
      </div>

      <!-- Form Actions -->
      <div class="form-actions">
        <button type="button" class="btn-cancel" onclick="window.location.href='{{ route('admin.habits.index') }}'">
          Cancel
        </button>
        <button type="submit" class="btn-create">
          <i class="fas fa-plus"></i>
          Create Habit
        </button>
      </div>
    </form>
  </div>
</main>
@endsection




