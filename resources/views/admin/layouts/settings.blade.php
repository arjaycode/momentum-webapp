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
  @if (session('success'))
  <div id="toast-notification" class="toast-notification toast-success">
    <div class="toast-content">
      <i class="fas fa-check-circle toast-icon"></i>
      <span class="toast-message">{{ session('success') }}</span>
    </div>
    <button class="toast-close" onclick="closeToast()">
      <i class="fas fa-times"></i>
    </button>
  </div>
  @endif

  @if ($errors->any())
  <div class="error-container">
    <ul class="error-list">
      @foreach ($errors->all() as $error)
      <li class="error-item">{{ $error }}</li>
      @endforeach
    </ul>
  </div>
  @endif

  <div class="screen" id="password-screen">
    <div class="content">
      <button class="back-btn" onclick="showScreen('profile-screen', document.querySelector('.tabs .tab[data-screen=\'profile-screen\']'))">
        ← Back
      </button>

      <div class="section password-section">
        <h2>Change Password</h2>
        <form action="{{ route('admin.settings.password') }}" method="POST">
          @csrf
          @method('PUT')
          <div class="form-group">
            <label class="form-label">Current Password</label>
            <input type="password" name="current_password" class="form-input" placeholder="Enter current password" required />
            @error('current_password')
              <span class="error-text">{{ $message }}</span>
            @enderror
          </div>

          <div class="form-group">
            <label class="form-label">New Password</label>
            <input type="password" name="password" class="form-input" placeholder="Enter new password" required />
            @error('password')
              <span class="error-text">{{ $message }}</span>
            @enderror
          </div>

          <div class="form-group">
            <label class="form-label">Confirm New Password</label>
            <input type="password" name="password_confirmation" class="form-input" placeholder="Confirm new password" required />
          </div>

          <div class="form-actions">
            <button type="button" class="btn btn-secondary" onclick="showScreen('profile-screen', document.querySelector('.tabs .tab[data-screen=\'profile-screen\']'))">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary">
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <div class="active screen" id="profile-screen">
    <div class="tabs">
      <div class="tab active" data-screen="profile-screen" onclick="showScreen('profile-screen', this)">
        Profile
      </div>
      <div class="tab" data-screen="notifications-screen" onclick="showScreen('notifications-screen', this)">
        Notifications
      </div>
    </div>

    <div class="profile-content">
      <div class="profile-section">
        <div class="profile-left">
          <div class="section">
            <h2>
              Profile Information
            </h2>

            <div class="profile-header">
              <div class="profile-avatar">
                <img id="profileAvatar" src="{{ $user->avatar ? asset('storage/' . $user->avatar) : 'https://ui-avatars.com/api/?name=' . urlencode($user->firstname . ' ' . $user->lastname) . '&background=random' }}" alt="Profile" class="avatar-image" />
                <input type="file" id="avatarInput" accept="image/*" style="display: none;" onchange="handleAvatarUpload(event)" />
              </div>
              <div>
                <div class="profile-name">{{ $user->firstname }} {{ $user->lastname }}</div>
                <div class="profile-member">Member since {{ $user->created_at->format('F Y') }}</div>
                <label for="avatarInput" class="btn btn-secondary btn-change-photo">
                  Change photo
                </label>
              </div>
            </div>

            <form action="{{ route('admin.settings.update') }}" method="POST">
              @csrf
              @method('PUT')
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">First Name</label>
                  <input type="text" name="firstname" class="form-input" value="{{ old('firstname', $user->firstname) }}" required />
                  @error('firstname')
                    <span style="color: #ef4444; font-size: 12px; margin-top: 4px; display: block;">{{ $message }}</span>
                  @enderror
                </div>
                <div class="form-group">
                  <label class="form-label">Last Name</label>
                  <input type="text" name="lastname" class="form-input" value="{{ old('lastname', $user->lastname) }}" required />
                @error('lastname')
                    <span class="error-text">{{ $message }}</span>
                @enderror
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Email</label>
                <input id="email" type="email" name="email" class="form-input" value="{{ old('email', $user->email) }}" required />
                @error('email')
                  <span style="color: #ef4444; font-size: 12px; margin-top: 4px; display: block;">{{ $message }}</span>
                @enderror
              </div>

              <div class="form-actions">
                <button type="button" class="btn btn-secondary" onclick="location.reload()">Cancel</button>
                <button type="submit" class="btn btn-primary">Save Changes</button>
              </div>
            </form>
          </div>
        </div>

        <div class="profile-right">
          <div class="section">
            <h2>
              Account Statistics
            </h2>
            
            @php
              $totalUsers = \App\Models\User::where('role', 'user')->count();
              $totalHabits = \App\Models\Habit::count();
              $totalNotes = \App\Models\Note::count();
              $accountAge = $user->created_at->diffInDays(now());
            @endphp
            
            <div class="stats-grid">
              <div class="stat-card">
                <div class="stat-label">Total Users</div>
                <div class="stat-value">{{ number_format($totalUsers) }}</div>
              </div>
              <div class="stat-card">
                <div class="stat-label">Total Habits</div>
                <div class="stat-value">{{ number_format($totalHabits) }}</div>
              </div>
              <div class="stat-card">
                <div class="stat-label">Total Notes</div>
                <div class="stat-value">{{ number_format($totalNotes) }}</div>
              </div>
              <div class="stat-card">
                <div class="stat-label">Account Age</div>
                <div class="stat-value">
                  {{ number_format($accountAge) }}
                  <span class="stat-unit">days</span>
                </div>
                <div class="stat-subtitle">
                  Member since {{ $user->created_at->format('M j, Y') }}
                </div>
              </div>
            </div>
          </div>
          
          <div class="section">
            <h2>
              Preferences
            </h2>

            <div class="preference-item">
              <div>
                <h3>
                  Change Password
                </h3>
                <p>
                  You can change your password here
                </p>
              </div>
              <button class="btn btn-secondary" onclick="showScreen('password-screen', document.querySelector('.tabs .tab[data-screen=\'profile-screen\']'))">
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="screen" id="notifications-screen">
    <div class="tabs">
      <div class="tab" data-screen="profile-screen" onclick="showScreen('profile-screen', this)">
        Profile
      </div>
      <div class="tab active" data-screen="notifications-screen" onclick="showScreen('notifications-screen', this)">
        Notifications
      </div>
    </div>

    <div class="notification-content">
      <div class="notification-settings">
        <div class="notification-list">
          <div class="section">
            <h2>
              Notification Timing
            </h2>

            <form id="notificationForm" onsubmit="saveNotificationSettings(event)">
              @csrf
              <div class="form-group">
                <label class="form-label">Global Reminder Time (Daily Reminders)</label>
                <input type="time" id="globalReminderTime" name="global_reminder_time" class="form-input" value="09:00" />
                <p>
                  Habits without a specific time will use this.
                </p>
              </div>

              <div class="form-group">
                <label class="form-label">Quiet Hours</label>
                <div class="time-range">
                  <input type="time" id="quietHoursStart" name="quiet_hours_start" class="form-input" style="width: 120px" value="22:00" />
                  <span>to</span>
                  <input type="time" id="quietHoursEnd" name="quiet_hours_end" class="form-input" style="width: 120px" value="07:00" />
                </div>
                <p>
                  Silence all notifications during this period.
                </p>
              </div>

              <div class="form-actions">
                <button type="submit" class="btn btn-primary">Save Changes</button>
                <button type="button" class="btn btn-secondary" onclick="resetNotificationForm()">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>
@endsection

@section('scripts')
<script>
/* ============================================
   ADMIN SETTINGS JAVASCRIPT
   ============================================ */

// ============================================
// 1. SCREEN NAVIGATION
// ============================================
function showScreen(screenId, tabElement) {
  // Hide all screens
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });
  
  // Show selected screen
  document.getElementById(screenId).classList.add('active');
  
  // Update tab active states
  if (tabElement) {
    document.querySelectorAll('.tabs .tab').forEach(tab => {
      tab.classList.remove('active');
    });
    tabElement.classList.add('active');
  }
}

// ============================================
// 2. AVATAR UPLOAD
// ============================================
function handleAvatarUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  // Validate file size (2MB max)
  if (file.size > 2048 * 1024) {
    alert('File size must be less than 2MB');
    event.target.value = '';
    return;
  }

  // Validate file type
  if (!file.type.match('image.*')) {
    alert('Please select an image file');
    event.target.value = '';
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
      showToastMessage(data.message || 'Avatar updated successfully!');
    } else {
      avatarImg.src = originalSrc;
      alert('Failed to upload avatar. Please try again.');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    avatarImg.src = originalSrc;
    avatarImg.style.opacity = '1';
    alert('An error occurred while uploading the avatar.');
  });
}

// ============================================
// 3. NOTIFICATION SETTINGS
// ============================================
function loadNotificationSettings() {
  fetch('{{ route("admin.settings.notifications.get") }}', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRF-TOKEN': '{{ csrf_token() }}'
    },
    credentials: 'same-origin'
  })
  .then(response => response.json())
  .then(data => {
    if (data.success && data.settings) {
      if (data.settings.global_reminder_time) {
        document.getElementById('globalReminderTime').value = data.settings.global_reminder_time;
      }
      if (data.settings.quiet_hours_start) {
        document.getElementById('quietHoursStart').value = data.settings.quiet_hours_start;
      }
      if (data.settings.quiet_hours_end) {
        document.getElementById('quietHoursEnd').value = data.settings.quiet_hours_end;
      }
    }
  })
  .catch(error => {
    console.error('Error loading notification settings:', error);
  });
}

function saveNotificationSettings(event) {
  event.preventDefault();
  
  const formData = {
    global_reminder_time: document.getElementById('globalReminderTime').value,
    quiet_hours_start: document.getElementById('quietHoursStart').value,
    quiet_hours_end: document.getElementById('quietHoursEnd').value,
  };

  fetch('{{ route("admin.settings.notifications.update") }}', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRF-TOKEN': '{{ csrf_token() }}'
    },
    body: JSON.stringify(formData),
    credentials: 'same-origin'
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      showToastMessage(data.message || 'Notification settings saved successfully!');
    } else {
      alert('Failed to save notification settings: ' + (data.message || 'Unknown error'));
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('An error occurred while saving notification settings.');
  });
}

function resetNotificationForm() {
  loadNotificationSettings();
}

// ============================================
// 4. TOAST NOTIFICATIONS
// ============================================
function showToastMessage(message) {
  // Create toast element
  const toast = document.createElement('div');
  toast.id = 'toast-notification';
  toast.className = 'toast-notification toast-success';
  toast.innerHTML = `
    <div class="toast-content">
      <i class="fas fa-check-circle toast-icon"></i>
      <span class="toast-message">${message}</span>
    </div>
    <button class="toast-close" onclick="closeToast()">
      <i class="fas fa-times"></i>
    </button>
  `;
  document.body.appendChild(toast);
  
  // Show toast
  setTimeout(() => {
    toast.classList.add('show');
  }, 100);
  
  // Auto hide after 5 seconds
  setTimeout(() => {
    closeToast();
  }, 5000);
}

function closeToast() {
  const toast = document.getElementById('toast-notification');
  if (toast) {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }
}

// ============================================
// 5. INITIALIZE ON PAGE LOAD
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  // Load notification settings
  loadNotificationSettings();
  
  // Show toast if exists (from session success message)
  const toast = document.getElementById('toast-notification');
  if (toast) {
    setTimeout(() => {
      toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
      closeToast();
    }, 5000);
  }
});
</script>
@endsection
