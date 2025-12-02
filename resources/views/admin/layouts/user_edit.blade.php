@extends('admin.main')

@section('title', 'Create New User - Momentum')
@section('active-link', 'users')
@section('page-title', 'Edit User')
@section('page-description', 'Edit the details of this user')
@section('css-file', 'create-user.css')
@section('js-file', 'create-user.js')

@section('content')
<!-- Main Content -->
<main class="main-content">
  <!-- Back Button -->
  <div class="back-section">
    <a href="{{ route('admin.user-management') }}" class="back-btn">
      <i class="fas fa-arrow-left"></i>
      Back to User Management
    </a>


  </div>

  <!-- Create User Form -->
  <div class="form-container">
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
    <form id="createUserForm" class="user-form" action="{{ route('admin.user-management.edit.submit', $user->id) }}" method="POST">
      @csrf
      @method('PUT')
      <!-- Name Fields -->
      <div class="form-row">
        <div class="form-group">
          <label for="firstName">First Name</label>
          <input type="text" id="firstName" name="firstname" placeholder="Enter first name" class="form-input" required value="{{ $user->firstname }}" />
        </div>
        <div class="form-group">
          <label for="lastName">Last Name</label>
          <input type="text" id="lastName" name="lastname" placeholder="Enter last name" class="form-input" required value="{{ $user->lastname }}" />
        </div>
      </div>

      <!-- Email Address -->
      <div class="form-group">
        <label for="email">Email Address</label>
        <input type="email" id="email" name="email" placeholder="Enter email address" class="form-input" required value="{{ $user->email }}" />
      </div>

      <!-- Password -->
      <div class="form-group">
        <label for="password">Password</label>
        <div class="password-input-wrapper">
          <input type="password" id="password" name="password" placeholder="Leave blank to keep the current password..." class="form-input" />
          <button type="button" class="password-toggle" id="togglePassword">
            <i class="fas fa-eye"></i>
          </button>
        </div>
      </div>

      <!-- Confirm Password -->
      <div class="form-group">
        <label for="confirmPassword">Confirm Password</label>
        <div class="password-input-wrapper">
          <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Leave blank to keep the current password..." class="form-input" />
          <button type="button" class="password-toggle" id="toggleConfirmPassword">
            <i class="fas fa-eye"></i>
          </button>
        </div>
      </div>

      <!-- Role and Status -->
      <div class="form-row">
        <div class="form-group">
          <label for="role">Role</label>
          <select id="role" name="role" class="form-select" required>
            <option value="">Select role</option>
            <option value="user" {{ $user->role == 'user' ? 'selected' : "" }}>User</option>
            <option value="admin" {{ $user->role == 'admin' ? 'selected' : "" }}>Admin</option>
          </select>
        </div>
        <div class="form-group">
          <label for="status">Status</label>
          <select id="status" name="status" class="form-select" required>
            <option value="">Select status</option>
            <option value="active" {{ $user->status == 'active' ? 'selected' : "" }}>Active</option>
            <option value="inactive" {{ $user->status == 'inactive' ? 'selected' : "" }}>Inactive</option>
            <option value="blocked" {{ $user->status == 'blocked' ? 'selected' : "" }}>Blocked</option>
          </select>
        </div>
      </div>

      <!-- Form Actions -->
      <div class="form-actions">
        <button type="button" class="btn-cancel" id="cancelBtn">
          Cancel
        </button>
        <button type="submit" class="btn-create">
          <i class="fas fa-check"></i>
          Save Changes
        </button>
      </div>
    </form>
  </div>
</main>
@endsection
