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
    <a href="{{ route('user-management') }}" class="back-btn">
      <i class="fas fa-arrow-left"></i>
      Back to User Management
    </a>


  </div>

  <!-- Create User Form -->
  <div class="form-container">
    <form id="createUserForm" class="user-form">
      <!-- Name Fields -->
      <div class="form-row">
        <div class="form-group">
          <label for="firstName">First Name</label>
          <input type="text" id="firstName" name="firstName" placeholder="Enter first name" class="form-input" required />
        </div>
        <div class="form-group">
          <label for="lastName">Last Name</label>
          <input type="text" id="lastName" name="lastName" placeholder="Enter last name" class="form-input" required />
        </div>
      </div>

      <!-- Email Address -->
      <div class="form-group">
        <label for="email">Email Address</label>
        <input type="email" id="email" name="email" placeholder="Enter email address" class="form-input" required />
      </div>

      <!-- Role and Status -->
      <div class="form-row">
        <div class="form-group">
          <label for="role">Role</label>
          <select id="role" name="role" class="form-select" required>
            <option value="">Select role</option>
            <option value="user">User</option>
            <option value="moderator">Moderator</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div class="form-group">
          <label for="status">Status</label>
          <select id="status" name="status" class="form-select" required>
            <option value="">Select status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
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
