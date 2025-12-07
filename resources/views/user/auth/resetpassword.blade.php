<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Momentum - Reset Password</title>
  <link rel="stylesheet" href="{{ asset('UserSide/css/signin.css') }}" />
  <script src="https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.min.js"></script>
</head>
<body style="background: url('{{ asset('UserSide/img/figma.jpg') }}') center/cover no-repeat fixed;">
  <div class="container">
    <div class="left-section">
      <div class="logo-icon">
        <svg viewBox="0 0 24 24">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
        </svg>
      </div>
      <h1>Reset Your<br />Password</h1>
      <p>
        Create a new secure password to continue your<br />habit-building journey.
      </p>
      <div class="features">
        <div class="feature-item">
          <div class="check-icon"></div>
          <span>Choose a strong password</span>
        </div>
        <div class="feature-item">
          <div class="check-icon"></div>
          <span>At least 8 characters long</span>
        </div>
        <div class="feature-item">
          <div class="check-icon"></div>
          <span>Keep it secure and memorable</span>
        </div>
      </div>
    </div>

    <div class="login-card">
      <div class="card-logo">
        <svg viewBox="0 0 24 24">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
        </svg>
      </div>
      <h2>Momentum</h2>
      <p class="subtitle">Reset your password</p>
      
      @if (session('success'))
      <div class="success-alert" id="successAlertReset" style="display: block;">
        <span class="success-icon">✓</span>
        {{ session('success') }}
        <button onclick="document.getElementById('successAlertReset').style.display='none'" style="background: none; border: none; float: right; cursor: pointer; font-size: 18px; color: inherit;">×</button>
      </div>
      <script>
        setTimeout(function() {
          const alert = document.getElementById('successAlertReset');
          if (alert) alert.style.display = 'none';
        }, 5000);
      </script>
      @endif

      @if (!$token)
      <div class="msg error" style="margin-bottom: 20px;">
        Invalid or expired reset token. Please request a new password reset link.
        <a href="{{ route('password.request') }}" style="color: #4285f4; text-decoration: underline;">Request new link</a>
      </div>
      @endif

      <div class="welcome-title">Create New Password</div>
      <p class="subtitle" style="margin-bottom: 20px">
        Enter your new password below
      </p>

      <form action="{{ route('password.update') }}" method="POST" @if(!$token) onsubmit="return false;" @endif>
        @csrf
        <input type="hidden" name="token" value="{{ $token ?? '' }}">
        
        <div class="form-group">
          <label>Email Address</label>
          <div class="input-wrapper">
            <span class="input-icon">✉</span>
            <input 
              type="email" 
              name="email" 
              value="{{ $email ?? old('email') }}" 
              placeholder="Enter your email" 
              required 
              readonly
              @if(!$token) disabled @endif
            />
          </div>
          @error('email')
            <p style="color: #ff4d4d; font-size: 12px; margin-top: 5px;">{{ $message }}</p>
          @enderror
        </div>

        <div class="form-group">
          <label>New Password</label>
          <div class="input-wrapper">
            <span class="input-icon">🔒</span>
            <input 
              type="password" 
              id="password" 
              name="password" 
              placeholder="Enter your new password (min. 8 characters)" 
              required 
              minlength="8"
              @if(!$token) disabled @endif
              onkeyup="checkPasswordStrength(this.value)"
            />
            <button type="button" class="toggle-password" onclick="togglePassword()" @if(!$token) disabled @endif>
              👁
            </button>
          </div>
          <div id="passwordStrength" style="margin-top: 5px; font-size: 12px; display: none;">
            <div style="height: 4px; background: #e0e0e0; border-radius: 2px; overflow: hidden; margin-bottom: 5px;">
              <div id="strengthBar" style="height: 100%; width: 0%; transition: all 0.3s;"></div>
            </div>
            <span id="strengthText"></span>
          </div>
          @error('password')
            <p style="color: #ff4d4d; font-size: 12px; margin-top: 5px;">{{ $message }}</p>
          @enderror
        </div>

        <div class="form-group">
          <label>Confirm Password</label>
          <div class="input-wrapper">
            <span class="input-icon">🔒</span>
            <input 
              type="password" 
              id="password_confirmation" 
              name="password_confirmation" 
              placeholder="Confirm your new password" 
              required 
              @if(!$token) disabled @endif
            />
            <button type="button" class="toggle-password" onclick="togglePasswordConfirmation()" @if(!$token) disabled @endif>
              👁
            </button>
          </div>
        </div>

        @if ($errors->any())
        <div>
          <ul class="msg">
            @foreach ($errors->all() as $error)
            <li class="msg error">
              {{ $error }}
              @if (str_contains(strtolower($error), 'token') || str_contains(strtolower($error), 'expired'))
                <a href="{{ route('password.request') }}" style="color: #4285f4; text-decoration: underline; margin-left: 5px;">Request new link</a>
              @endif
            </li>
            @endforeach
          </ul>
        </div>
        @endif

        <button type="submit" class="sign-in-btn" @if(!$token) disabled style="opacity: 0.5; cursor: not-allowed;" @endif>Reset Password</button>
      </form>

      <div class="sign-up-link">
        Remember your password? <a href="{{ route('user.signin') }}">Sign in here</a>
      </div>
    </div>
  </div>

  <script src="{{ asset('UserSide/js/signin.js') }}"></script>
  <script>
    function togglePasswordConfirmation() {
      const passwordInput = document.getElementById('password_confirmation');
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
      } else {
        passwordInput.type = 'password';
      }
    }

    function checkPasswordStrength(password) {
      const strengthDiv = document.getElementById('passwordStrength');
      const strengthBar = document.getElementById('strengthBar');
      const strengthText = document.getElementById('strengthText');
      
      if (!password) {
        strengthDiv.style.display = 'none';
        return;
      }
      
      strengthDiv.style.display = 'block';
      
      let strength = 0;
      let feedback = [];
      
      // Length check
      if (password.length >= 8) strength += 1;
      else feedback.push('At least 8 characters');
      
      // Lowercase check
      if (/[a-z]/.test(password)) strength += 1;
      else feedback.push('lowercase letter');
      
      // Uppercase check
      if (/[A-Z]/.test(password)) strength += 1;
      else feedback.push('uppercase letter');
      
      // Number check
      if (/[0-9]/.test(password)) strength += 1;
      else feedback.push('number');
      
      // Special character check
      if (/[^A-Za-z0-9]/.test(password)) strength += 1;
      else feedback.push('special character');
      
      // Update UI
      const percentage = (strength / 5) * 100;
      strengthBar.style.width = percentage + '%';
      
      if (strength <= 2) {
        strengthBar.style.background = '#ff4d4d';
        strengthText.textContent = 'Weak' + (feedback.length > 0 ? ' - Add: ' + feedback.slice(0, 2).join(', ') : '');
        strengthText.style.color = '#ff4d4d';
      } else if (strength <= 3) {
        strengthBar.style.background = '#ffa500';
        strengthText.textContent = 'Fair' + (feedback.length > 0 ? ' - Add: ' + feedback[0] : '');
        strengthText.style.color = '#ffa500';
      } else if (strength <= 4) {
        strengthBar.style.background = '#4CAF50';
        strengthText.textContent = 'Good';
        strengthText.style.color = '#4CAF50';
      } else {
        strengthBar.style.background = '#2e7d32';
        strengthText.textContent = 'Strong';
        strengthText.style.color = '#2e7d32';
      }
    }

    // Check password match
    document.getElementById('password_confirmation')?.addEventListener('keyup', function() {
      const password = document.getElementById('password').value;
      const confirm = this.value;
      const errorMsg = this.parentElement.nextElementSibling;
      
      if (confirm && password !== confirm) {
        if (!errorMsg || !errorMsg.classList.contains('password-match-error')) {
          const p = document.createElement('p');
          p.className = 'password-match-error';
          p.style.cssText = 'color: #ff4d4d; font-size: 12px; margin-top: 5px;';
          p.textContent = 'Passwords do not match';
          this.parentElement.parentElement.appendChild(p);
        }
      } else {
        const errorMsg = this.parentElement.parentElement.querySelector('.password-match-error');
        if (errorMsg) errorMsg.remove();
      }
    });
  </script>
</body>
</html>

