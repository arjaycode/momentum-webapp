@extends('user.main')

@section('title', 'Settings | ' . $user->firstname . ' ' . $user->lastname)
@section('active-link', 'settings')
@section('page-title', 'Settings')
@section('page-description', 'Set you app preferences, change password, edit profile, etc.')
@section('css-file', 'settings.css')
@section('js-file', 'settings.js')

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
<div class="screen" id="privacy-screen">
  <div class="tabs">
    <div class="tab" data-screen="profile-screen" onclick="showScreen('profile-screen', this)">
      Profile
    </div>
    <div class="tab" data-screen="notifications-screen" onclick="showScreen('notifications-screen', this)">
      Notifications
    </div>
  </div>

  <div class="content">
    <div class="section">
      <div class="security-item">
        <div class="security-info">        
        </div>
      </div>

      <div class="security-item">
        <div class="security-info">
        </div>
      </div>
    </div>
  </div>
</div>

<div class="screen" id="password-screen">
  <div class="content">
    <button class="back-btn" onclick="showScreen('profile-screen', document.querySelector('.tabs .tab[data-screen=\'profile-screen\']'))">
      ← Back
    </button>

    <div class="section" style="max-width: 600px">
      <form action="{{ route('user.profile.password') }}" method="POST">
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
          <h2 style="
                      margin-bottom: 24px;
                      font-size: 16px;
                      font-weight: 600;
                    ">
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
              <label for="avatarInput" class="btn btn-secondary" style="
                          margin-top: 8px;
                          padding: 6px 12px;
                          font-size: 12px;
                          cursor: pointer;
                          display: inline-block;
                        ">
                Change photo
              </label>
            </div>
          </div>

          <form action="{{ route('user.profile.update') }}" method="POST">
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
          <h2 style="
                      margin-bottom: 24px;
                      font-size: 16px;
                      font-weight: 600;
                    ">
            Account Statistics
          </h2>
          
          @php
            $totalHabits = \App\Models\Habit::where('user_id', $user->id)->count();
            $totalCompletions = \App\Models\HabitLog::whereHas('habit', function($q) use ($user) {
              $q->where('user_id', $user->id);
            })->count();
            $accountAge = $user->created_at->diffInDays(now());
          @endphp
          
          <div style="display: grid; gap: 16px; margin-bottom: 24px;">
            <div style="padding: 16px; background: #f8f9fa; border-radius: 8px;">
              <div style="font-size: 12px; color: #666; margin-bottom: 4px;">Total Habits</div>
              <div style="font-size: 24px; font-weight: 600; color: #333;">{{ $totalHabits }}</div>
            </div>
            <div style="padding: 16px; background: #f8f9fa; border-radius: 8px;">
              <div style="font-size: 12px; color: #666; margin-bottom: 4px;">Total Completions</div>
              <div style="font-size: 24px; font-weight: 600; color: #333;">{{ $totalCompletions }}</div>
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
          <h2 style="
                      margin-bottom: 24px;
                      font-size: 16px;
                      font-weight: 600;
                    ">
            Preferences
          </h2>

          <div class="preference-item">
            <div>
              <h3 style="
                          font-size: 14px;
                          font-weight: 500;
                          margin-bottom: 4px;
                        ">
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

        <div class="danger-zone">
          <div class="danger-zone-title">Danger Zone</div>

          <div class="preference-item">
            <div>
              <h3 style="
                          font-size: 14px;
                          font-weight: 500;
                          margin-bottom: 4px;
                        ">
                
                Delete Account
              </h3>
              <p style="font-size: 12px; color: #666">
                Permanently delete your account and all data
              </p>
            </div>
            <button class="btn btn-danger" onclick="showDeleteModal()">Delete Account</button>
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
          <div class="preference-item">
            <div>
              <h3 style="
                          font-size: 15px;
                          font-weight: 500;
                          margin-bottom: 4px;
                        ">
      <div class="notification-timing">
        <div class="section">
          <h2 style="
                      margin-bottom: 24px;
                      font-size: 16px;
                      font-weight: 600;
                    ">
            Notification Timing
          </h2>

          <div class="form-group">
            <label class="form-label">Global Reminder Time (Daily Reminders)</label>
            <input type="time" class="form-input" value="09:00" />
            <p style="font-size: 12px; color: #666; margin-top: 8px">
              Habits without a specific time will use this.
            </p>
          </div>

          <div class="form-group">
            <label class="form-label">Quiet Hours</label>
            <div class="time-range">
              <input type="time" class="form-input" style="width: 120px" value="22:00" />
              <span>to</span>
              <input type="time" class="form-input" style="width: 120px" value="07:00" />
            </div>
            <p style="font-size: 12px; color: #666; margin-top: 8px">
              Silence all notifications during this period.
            </p>
          </div>

          <form id="notificationForm" onsubmit="saveNotificationSettings(event)">
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

@section('modals')
<!-- Delete Account Modal -->
<div id="deleteAccountModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 10000; align-items: center; justify-content: center;">
  <div style="background: white; padding: 30px; border-radius: 12px; max-width: 500px; width: 90%; box-shadow: 0 8px 24px rgba(0,0,0,0.2);">
    <h2 style="margin-bottom: 16px; font-size: 20px; font-weight: 600;">Delete Account</h2>
    <p style="margin-bottom: 24px; color: #666; line-height: 1.6;">
      Are you sure you want to delete your account? This action cannot be undone. All your data, habits, and progress will be permanently deleted.
    </p>
    <form action="{{ route('user.profile.delete') }}" method="POST" id="deleteAccountForm">
      @csrf
      @method('DELETE')
      <div class="form-group" style="margin-bottom: 20px;">
        <label class="form-label" style="display: block; margin-bottom: 8px; font-weight: 500;">Enter your password to confirm</label>
        <input type="password" name="password" class="form-input" placeholder="Enter your password" required />
        @error('password')
          <span style="color: #ef4444; font-size: 12px; margin-top: 4px; display: block;">{{ $message }}</span>
        @enderror
      </div>
      <div class="form-actions" style="display: flex; gap: 12px; justify-content: flex-end;">
        <button type="button" class="btn btn-secondary" onclick="hideDeleteModal()">Cancel</button>
        <button type="submit" class="btn btn-danger">Delete Account</button>
      </div>
    </form>
  </div>
</div>

<script>
function showDeleteModal() {
  document.getElementById('deleteAccountModal').style.display = 'flex';
}

function hideDeleteModal() {
  document.getElementById('deleteAccountModal').style.display = 'none';
  document.getElementById('deleteAccountForm').reset();
}

// Close modal when clicking outside
document.getElementById('deleteAccountModal').addEventListener('click', function(e) {
  if (e.target === this) {
    hideDeleteModal();
  }
});

// Notification settings save function
function saveNotificationSettings(event) {
  event.preventDefault();
  // In a real implementation, this would save to database
  alert('Notification settings saved! (Feature coming soon - settings will be saved to your account)');
}

function resetNotificationForm() {
  // Reset form to default values
  document.querySelectorAll('#notifications-screen .toggle').forEach(toggle => {
    if (toggle.classList.contains('active')) {
      // Keep active state for now
    }
  });
}

// Enhanced toggle switch with visual feedback
function toggleSwitch(element) {
  element.classList.toggle('active');
  const isActive = element.classList.contains('active');
  
  // Add visual feedback
  if (isActive) {
    element.style.opacity = '1';
  } else {
    element.style.opacity = '0.5';
  }
  
  // In a real implementation, save preference to database
  console.log('Toggle switched:', isActive);
}

// Initialize toggles on page load
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.toggle').forEach(toggle => {
    if (toggle.classList.contains('active')) {
      toggle.style.opacity = '1';
    } else {
      toggle.style.opacity = '0.5';
    }
  });
});

// Handle avatar upload
function handleAvatarUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  // Validate file size (2MB max)
  if (file.size > 2048 * 1024) {
    alert('File size must be less than 2MB');
    return;
  }

  // Validate file type
  if (!file.type.match('image.*')) {
    alert('Please select an image file');
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

  fetch('{{ route("user.profile.avatar") }}', {
    method: 'POST',
    body: formData,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
    },
    credentials: 'same-origin'
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      document.getElementById('profileAvatar').src = data.avatar_url;
      // Show success message
      const alert = document.createElement('div');
      alert.className = 'success-alert';
      alert.style.cssText = 'margin: 20px; background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb; padding: 15px; border-radius: 5px; display: flex; align-items: center; position: fixed; top: 20px; right: 20px; z-index: 10000;';
      alert.innerHTML = '<span style="font-weight: bold; font-size: 1.2em; margin-right: 10px;">✓</span>' + data.message;
      document.body.appendChild(alert);
      setTimeout(() => alert.remove(), 3000);
    } else {
      alert('Failed to upload avatar. Please try again.');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('An error occurred while uploading the avatar.');
  });
}
</script>
@endsection
