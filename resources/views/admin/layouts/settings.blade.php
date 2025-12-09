@extends('admin.main')

@section('title', 'Admin Settings - Momentum')
@section('active-link', 'settings')
@section('page-title', 'Admin Settings')
@section('page-description', 'Manage your account and app preferences')
@section('css-file', 'admin-settings.css')
@section('js-file', 'admin-settings.js')

@section('content')
@if (session('success'))
<div class="success-alert" style="margin: 20px; background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb; padding: 15px; border-radius: 5px; display: flex; align-items: center;">
  <span class="success-icon" style="font-weight: bold; font-size: 1.2em; margin-right: 10px;">✓</span>
  {{ session('success') }}
</div>
@endif
@if ($errors->any())
<div style="margin: 20px;">
  <ul class="msg" style="list-style-type: none; padding: 0;">
    @foreach ($errors->all() as $error)
    <li class="msg error" style="display: block; padding: 10px; border-radius: 8px; margin-top: 8px; font-size: 13px; background: #fff0f0; color: #9b2b2b;">{{ $error }}</li>
    @endforeach
  </ul>
</div>
@endif
<!-- Main Content -->
<main class="main-content">
  <!-- Tabs -->
  <div class="tabs">
    <button class="tab-btn active" data-tab="profile">Profile</button>
    <button class="tab-btn" data-tab="password">Password</button>
    <button class="tab-btn" data-tab="notifications">
      Notifications
    </button>
  </div>

  <!-- Tab Content -->
  <div class="tab-content active" id="profile-tab">
    <div class="settings-grid">
      <!-- Profile Information -->
      <div class="settings-card">
        <h3 class="card-title">Profile Information</h3>

        <div class="profile-section">
          <div class="avatar-section">
            <img id="profileAvatar" src="{{ $user->avatar ? asset('storage/' . $user->avatar) : 'https://ui-avatars.com/api/?name=' . urlencode($user->firstname . ' ' . $user->lastname) . '&background=random' }}" alt="{{ $user->firstname }}" class="profile-avatar" />
            <input type="file" id="avatarInput" accept="image/*" style="display: none;" onchange="handleAvatarUpload(event)" />
            <div class="avatar-badge" onclick="document.getElementById('avatarInput').click()" style="cursor: pointer;">
              <i class="fas fa-camera"></i>
            </div>
          </div>
          <div class="profile-details">
            <h4 class="profile-name">{{ $user->firstname }} {{ $user->lastname }}</h4>
            <p class="profile-since">Member since {{ $user->created_at->format('F Y') }}</p>
            <button class="link-btn" onclick="document.getElementById('avatarInput').click()">Change photo</button>
          </div>
        </div>

        <form class="profile-form" action="{{ route('admin.settings.update') }}" method="POST" id="profileForm">
          @csrf
          @method('PUT')
          <div class="form-row">
            <div class="form-group">
              <label for="firstName">First Name</label>
              <input type="text" id="firstName" name="firstname" value="{{ old('firstname', $user->firstname) }}" class="form-input" required />
              @error('firstname')
                <span style="color: #ef4444; font-size: 12px; margin-top: 4px; display: block;">{{ $message }}</span>
              @enderror
            </div>
            <div class="form-group">
              <label for="lastName">Last Name</label>
              <input type="text" id="lastName" name="lastname" value="{{ old('lastname', $user->lastname) }}" class="form-input" required />
              @error('lastname')
                <span style="color: #ef4444; font-size: 12px; margin-top: 4px; display: block;">{{ $message }}</span>
              @enderror
            </div>
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" value="{{ old('email', $user->email) }}" class="form-input" required />
            @error('email')
              <span style="color: #ef4444; font-size: 12px; margin-top: 4px; display: block;">{{ $message }}</span>
            @enderror
          </div>

          <div class="form-actions">
            <button type="button" class="btn-cancel" onclick="location.reload()">Cancel</button>
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
          <button type="button" class="btn-save-full" onclick="saveSystemSettings()">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="tab-content" id="password-tab">
    <div class="settings-card">
      <h3 class="card-title">Change Password</h3>
      <p class="card-subtitle">Update your account password</p>
      
      <form action="{{ route('admin.settings.password') }}" method="POST">
        @csrf
        @method('PUT')
        <div class="form-group">
          <label for="current_password">Current Password</label>
          <input type="password" id="current_password" name="current_password" class="form-input" placeholder="Enter current password" required />
          @error('current_password')
            <span style="color: #ef4444; font-size: 12px; margin-top: 4px; display: block;">{{ $message }}</span>
          @enderror
        </div>

        <div class="form-group">
          <label for="password">New Password</label>
          <input type="password" id="password" name="password" class="form-input" placeholder="Enter new password" required />
          @error('password')
            <span style="color: #ef4444; font-size: 12px; margin-top: 4px; display: block;">{{ $message }}</span>
          @enderror
        </div>

        <div class="form-group">
          <label for="password_confirmation">Confirm New Password</label>
          <input type="password" id="password_confirmation" name="password_confirmation" class="form-input" placeholder="Confirm new password" required />
        </div>

        <div class="form-actions">
          <button type="button" class="btn-cancel" onclick="location.reload()">Cancel</button>
          <button type="submit" class="btn-save">Change Password</button>
        </div>
      </form>
    </div>
  </div>

  <div class="tab-content" id="notifications-tab">
    <div class="settings-card">
      <h3 class="card-title">Notification Settings</h3>
      <p class="card-subtitle">Manage your notification preferences</p>
      <p style="padding: 40px; text-align: center; color: #999">
        Notification settings coming soon...
      </p>
    </div>
  </div>
</main>
@endsection

@section('scripts')
<script>
// Tab switching functionality
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const tabName = this.getAttribute('data-tab');
    
    // Remove active class from all tabs and content
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    
    // Add active class to clicked tab and corresponding content
    this.classList.add('active');
    document.getElementById(tabName + '-tab').classList.add('active');
  });
});

// Handle avatar upload
function handleAvatarUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  // Validate file size (2MB max)
  if (file.size > 2048 * 1024) {
    alert('File size must be less than 2MB');
    event.target.value = ''; // Clear the input
    return;
  }

  // Validate file type
  if (!file.type.match('image.*')) {
    alert('Please select an image file');
    event.target.value = ''; // Clear the input
    return;
  }

  // Show preview
  const reader = new FileReader();
  reader.onload = function(e) {
    document.getElementById('profileAvatar').src = e.target.result;
  };
  reader.readAsDataURL(file);

  // Upload to server
  const formData = new FormData();
  formData.append('avatar', file);
  formData.append('_token', '{{ csrf_token() }}');

  // Show loading state
  const avatarImg = document.getElementById('profileAvatar');
  const originalSrc = avatarImg.src;
  avatarImg.style.opacity = '0.5';

  fetch('{{ route("admin.settings.avatar") }}', {
    method: 'POST',
    body: formData,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRF-TOKEN': '{{ csrf_token() }}'
    },
    credentials: 'same-origin'
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    avatarImg.style.opacity = '1';
    if (data.success) {
      document.getElementById('profileAvatar').src = data.avatar_url;
      // Show success message
      showSuccessMessage(data.message || 'Avatar updated successfully!');
    } else {
      avatarImg.src = originalSrc; // Revert on error
      alert('Failed to upload avatar. Please try again.');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    avatarImg.src = originalSrc; // Revert on error
    avatarImg.style.opacity = '1';
    alert('An error occurred while uploading the avatar.');
  });
}

// Show success message
function showSuccessMessage(message) {
  const alert = document.createElement('div');
  alert.className = 'success-alert';
  alert.style.cssText = 'margin: 20px; background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb; padding: 15px; border-radius: 5px; display: flex; align-items: center; position: fixed; top: 20px; right: 20px; z-index: 10000;';
  alert.innerHTML = '<span style="font-weight: bold; font-size: 1.2em; margin-right: 10px;">✓</span>' + message;
  document.body.appendChild(alert);
  setTimeout(() => {
    alert.style.transition = 'opacity 0.3s';
    alert.style.opacity = '0';
    setTimeout(() => alert.remove(), 300);
  }, 3000);
}

// Save system settings (password policy, session management, user registration)
function saveSystemSettings() {
  const settings = {
    passwordPolicy: {
      minLength: document.getElementById('minLength')?.value || 8,
      expiry: document.getElementById('expiry')?.value || 90,
      requireUppercase: document.querySelectorAll('.toggle-switch input')[0]?.checked || false,
      requireSpecialChars: document.querySelectorAll('.toggle-switch input')[1]?.checked || false,
      requireNumbers: document.querySelectorAll('.toggle-switch input')[2]?.checked || false,
      preventReuse: document.querySelectorAll('.toggle-switch input')[3]?.checked || false,
    },
    sessionManagement: {
      timeout: document.getElementById('sessionTimeout')?.value || 30,
      maxSessions: document.getElementById('maxSessions')?.value || 3,
      rememberDuration: document.getElementById('rememberDuration')?.value || 30,
      forceLogout: document.querySelectorAll('.toggle-switch input')[4]?.checked || false,
      trackActivity: document.querySelectorAll('.toggle-switch input')[5]?.checked || false,
    },
    userRegistration: {
      defaultRole: document.getElementById('defaultRole')?.value || 'user',
      allowSelfRegistration: document.querySelectorAll('.toggle-switch input')[6]?.checked || false,
      emailVerification: document.querySelectorAll('.toggle-switch input')[7]?.checked || false,
    },
  };

  // For now, just show a message - these settings would need backend implementation
  console.log('System settings:', settings);
  showSuccessMessage('System settings saved successfully! (Note: Backend implementation needed for full functionality)');
  
  // In a real implementation, you would send this to the server:
  // fetch('/admin/settings/system', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'X-CSRF-TOKEN': '{{ csrf_token() }}'
  //   },
  //   body: JSON.stringify(settings)
  // });
}
</script>
@endsection
