@extends('admin.main')

@section('title', 'Admin Settings - Momentum')
@section('active-link', 'settings')
@section('page-title', 'Admin Settings')
@section('page-description', 'Manage your account and app preferences')
@section('css-file', 'admin-settings.css')
@section('js-file', 'admin-settings.js')

@section('content')
<!-- Main Content -->
<main class="main-content">
  <!-- Tabs -->
  <div class="tabs">
    <button class="tab-btn active" data-tab="profile">Profile</button>
    <button class="tab-btn" data-tab="notifications">
      Notifications
    </button>
    <button class="tab-btn" data-tab="privacy">Privacy</button>
  </div>

  <!-- Tab Content -->
  <div class="tab-content active" id="profile-tab">
    <div class="settings-grid">
      <!-- Profile Information -->
      <div class="settings-card">
        <h3 class="card-title">Profile Information</h3>

        <div class="profile-section">
          <div class="avatar-section">
            <img src="https://i.pravatar.cc/80?img=12" alt="John Admin" class="profile-avatar" />
            <div class="avatar-badge">
              <i class="fas fa-camera"></i>
            </div>
          </div>
          <div class="profile-details">
            <h4 class="profile-name">John Admin</h4>
            <p class="profile-since">Member since August 2025</p>
            <button class="link-btn">Change photo</button>
          </div>
        </div>

        <form class="profile-form">
          <div class="form-row">
            <div class="form-group">
              <label for="firstName">First Name</label>
              <input type="text" id="firstName" value="John" class="form-input" />
            </div>
            <div class="form-group">
              <label for="lastName">Last Name</label>
              <input type="text" id="lastName" value="Admin" class="form-input" />
            </div>
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" value="JohnAdmin@email.com" class="form-input" />
          </div>

          <div class="form-actions">
            <button type="button" class="btn-cancel">Cancel</button>
            <button type="submit" class="btn-save">Save Changes</button>
          </div>
        </form>
      </div>

      <!-- Password Policy -->
      <div class="settings-card">
        <h3 class="card-title">Password Policy</h3>
        <p class="card-subtitle">
          Set password requirements and security rules
        </p>

        <div class="form-row">
          <div class="form-group">
            <label for="minLength">Minimum Password Length</label>
            <input type="number" id="minLength" value="8" class="form-input" />
          </div>
          <div class="form-group">
            <label for="expiry">Password Expiry (Days)</label>
            <input type="number" id="expiry" value="90" class="form-input" />
          </div>
        </div>

        <div class="toggle-group">
          <div class="toggle-item">
            <div class="toggle-info">
              <div class="toggle-label">Require Uppercase Letters</div>
              <div class="toggle-description">
                At least one uppercase letter
              </div>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" checked />
              <span class="toggle-slider"></span>
            </label>
          </div>

          <div class="toggle-item">
            <div class="toggle-info">
              <div class="toggle-label">Require Special Characters</div>
              <div class="toggle-description">
                At least one special character
              </div>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" />
              <span class="toggle-slider"></span>
            </label>
          </div>

          <div class="toggle-item">
            <div class="toggle-info">
              <div class="toggle-label">Require Numbers</div>
              <div class="toggle-description">
                At least one numeric character
              </div>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" checked />
              <span class="toggle-slider"></span>
            </label>
          </div>

          <div class="toggle-item">
            <div class="toggle-info">
              <div class="toggle-label">Prevent Password Reuse</div>
              <div class="toggle-description">
                Remember last 5 passwords
              </div>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" checked />
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>

      <!-- Session Management -->
      <div class="settings-card">
        <h3 class="card-title">Session Management</h3>
        <p class="card-subtitle">
          Configure user session behavior and timeouts
        </p>

        <div class="form-row-three">
          <div class="form-group">
            <label for="sessionTimeout">Session Timeout (Minutes)</label>
            <input type="number" id="sessionTimeout" value="30" class="form-input" />
          </div>
          <div class="form-group">
            <label for="maxSessions">Max Concurrent Sessions</label>
            <input type="number" id="maxSessions" value="3" class="form-input" />
          </div>
          <div class="form-group">
            <label for="rememberDuration">Remember Me Duration (Days)</label>
            <input type="number" id="rememberDuration" value="30" class="form-input" />
          </div>
        </div>

        <div class="toggle-group">
          <div class="toggle-item">
            <div class="toggle-info">
              <div class="toggle-label">
                Force Logout on Password Change
              </div>
              <div class="toggle-description">
                End all sessions when password is changed
              </div>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" checked />
              <span class="toggle-slider"></span>
            </label>
          </div>

          <div class="toggle-item">
            <div class="toggle-info">
              <div class="toggle-label">Track User Activity</div>
              <div class="toggle-description">
                Log user login and activity times
              </div>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" checked />
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>

      <!-- User Registration -->
      <div class="settings-card">
        <h3 class="card-title">User Registration</h3>
        <p class="card-subtitle">
          Configure how new users can register
        </p>

        <div class="form-group">
          <label for="defaultRole">Default Role for New Users</label>
          <select id="defaultRole" class="form-select">
            <option value="user" selected>User</option>
            <option value="moderator">Moderator</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div class="toggle-group">
          <div class="toggle-item">
            <div class="toggle-info">
              <div class="toggle-label">Allow Self Registration</div>
              <div class="toggle-description">
                Users can create their own accounts
              </div>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" checked />
              <span class="toggle-slider"></span>
            </label>
          </div>

          <div class="toggle-item">
            <div class="toggle-info">
              <div class="toggle-label">
                Email Verification Required
              </div>
              <div class="toggle-description">
                Users must verify their email before access
              </div>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" checked />
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>

        <div class="form-actions">
          <button type="button" class="btn-save-full">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="tab-content" id="notifications-tab">
    <div class="settings-card">
      <h3 class="card-title">Notification Settings</h3>
      <p class="card-subtitle">Manage your notification preferences</p>
      <p style="padding: 40px; text-align: center; color: #999">
        Still in development...
      </p>
    </div>
  </div>

  <div class="tab-content" id="privacy-tab">
    <div class="settings-card">
      <h3 class="card-title">Privacy Settings</h3>
      <p class="card-subtitle">
        Control your privacy and data settings
      </p>
      <p style="padding: 40px; text-align: center; color: #999">
        Still in development...
      </p>
    </div>
  </div>
</main>
@endsection
