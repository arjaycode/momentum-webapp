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

<div class="screen" id="password-screen">
  <div class="content">
    <button class="back-btn" onclick="showScreen('profile-screen', document.querySelector('.tabs .tab[data-screen=\'profile-screen\']'))">
      ← Back
    </button>

    <div class="section" style="max-width: 600px">
      <form action="{{ route('admin.settings.password') }}" method="POST">
        @csrf
        @method('PUT')
        <div class="form-group">
          <label class="form-label">Current Password</label>
          <input type="password" name="current_password" class="form-input" placeholder="Enter current password" required />
          @error('current_password')
            <span style="color: #ef4444; font-size: 12px; margin-top: 4px; display: block;">{{ $message }}</span>
          @enderror
        </div>

        <div class="form-group">
          <label class="form-label">New Password</label>
          <input type="password" name="password" class="form-input" placeholder="Enter new password" required />
          @error('password')
            <span style="color: #ef4444; font-size: 12px; margin-top: 4px; display: block;">{{ $message }}</span>
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
          <h2 style="margin-bottom: 24px; font-size: 16px; font-weight: 600;">
            Profile Information
          </h2>

          <div class="profile-header">
            <div class="profile-avatar">
              <img id="profileAvatar" src="{{ $user->avatar ? asset('storage/' . $user->avatar) : 'https://ui-avatars.com/api/?name=' . urlencode($user->firstname . ' ' . $user->lastname) . '&background=random' }}" alt="Profile" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover;" />
              <input type="file" id="avatarInput" accept="image/*" style="display: none;" onchange="handleAvatarUpload(event)" />
            </div>
            <div>
              <div class="profile-name">{{ $user->firstname }} {{ $user->lastname }}</div>
              <div class="profile-member">Member since {{ $user->created_at->format('F Y') }}</div>
              <label for="avatarInput" class="btn btn-secondary" style="margin-top: 8px; padding: 6px 12px; font-size: 12px; cursor: pointer; display: inline-block;">
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
                  <span style="color: #ef4444; font-size: 12px; margin-top: 4px; display: block;">{{ $message }}</span>
                @enderror
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Email</label>
              <input type="email" name="email" class="form-input" value="{{ old('email', $user->email) }}" required />
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
          <h2 style="margin-bottom: 24px; font-size: 16px; font-weight: 600;">
            Account Statistics
          </h2>
          
          @php
            $totalUsers = \App\Models\User::where('role', 'user')->count();
            $totalHabits = \App\Models\Habit::count();
            $totalNotes = \App\Models\Note::count();
            $accountAge = $user->created_at->diffInDays(now());
          @endphp
          
          <div style="display: grid; gap: 16px; margin-bottom: 24px;">
            <div style="padding: 16px; background: #f8f9fa; border-radius: 8px;">
              <div style="font-size: 12px; color: #666; margin-bottom: 4px;">Total Users</div>
              <div style="font-size: 24px; font-weight: 600; color: #333;">{{ number_format($totalUsers) }}</div>
            </div>
            <div style="padding: 16px; background: #f8f9fa; border-radius: 8px;">
              <div style="font-size: 12px; color: #666; margin-bottom: 4px;">Total Habits</div>
              <div style="font-size: 24px; font-weight: 600; color: #333;">{{ number_format($totalHabits) }}</div>
            </div>
            <div style="padding: 16px; background: #f8f9fa; border-radius: 8px;">
              <div style="font-size: 12px; color: #666; margin-bottom: 4px;">Total Notes</div>
              <div style="font-size: 24px; font-weight: 600; color: #333;">{{ number_format($totalNotes) }}</div>
            </div>
            <div style="padding: 16px; background: #f8f9fa; border-radius: 8px;">
              <div style="font-size: 12px; color: #666; margin-bottom: 4px;">Account Age</div>
              <div style="font-size: 24px; font-weight: 600; color: #333;">
                {{ number_format($accountAge) }}
                <span style="font-size: 14px; color: #666; font-weight: 500;">days</span>
              </div>
              <div style="font-size: 11px; color: #888; margin-top: 4px;">
                Member since {{ $user->created_at->format('M j, Y') }}
              </div>
            </div>
          </div>
        </div>
        
        <div class="section">
          <h2 style="margin-bottom: 24px; font-size: 16px; font-weight: 600;">
            Preferences
          </h2>

          <div class="preference-item">
            <div>
              <h3 style="font-size: 14px; font-weight: 500; margin-bottom: 4px;">
                Change Password
              </h3>
              <p style="font-size: 12px; color: #666">
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
          <h2 style="margin-bottom: 24px; font-size: 16px; font-weight: 600;">
            Notification Timing
          </h2>

          <form id="notificationForm" onsubmit="saveNotificationSettings(event)">
            @csrf
            <div class="form-group">
              <label class="form-label">Global Reminder Time (Daily Reminders)</label>
              <input type="time" id="globalReminderTime" name="global_reminder_time" class="form-input" value="09:00" />
              <p style="font-size: 12px; color: #666; margin-top: 8px">
                Habits without a specific time will use this.
              </p>
            </div>

            <div class="form-group">
              <label class="form-label">Quiet Hours</label>
              <div class="time-range" style="display: flex; align-items: center; gap: 12px;">
                <input type="time" id="quietHoursStart" name="quiet_hours_start" class="form-input" style="width: 120px" value="22:00" />
                <span>to</span>
                <input type="time" id="quietHoursEnd" name="quiet_hours_end" class="form-input" style="width: 120px" value="07:00" />
              </div>
              <p style="font-size: 12px; color: #666; margin-top: 8px">
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
@endsection

@section('scripts')
<script>
// Screen switching functionality (similar to user settings)
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

// Handle avatar upload
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
      showSuccessMessage(data.message || 'Avatar updated successfully!');
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

// Load notification settings on page load
document.addEventListener('DOMContentLoaded', function() {
  loadNotificationSettings();
});

// Load notification settings from API
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

// Save notification settings
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
      showSuccessMessage(data.message || 'Notification settings saved successfully!');
    } else {
      alert('Failed to save notification settings: ' + (data.message || 'Unknown error'));
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('An error occurred while saving notification settings.');
  });
}

// Reset notification form
function resetNotificationForm() {
  loadNotificationSettings();
}
</script>
@endsection
