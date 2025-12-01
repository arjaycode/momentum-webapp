<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Admin Sign In - Momentum</title>
  <link rel="stylesheet" href="{{ asset('AdminSide/css/admin_signin.css') }}" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
</head>
<body>
  <div class="auth-container">
    <!-- Login Form -->
    <div class="auth-card" id="loginCard">
      <div class="auth-logo">
        <i class="fas fa-chart-line"></i>
      </div>

      <h1 class="auth-title">Momentum Admin</h1>
      <p class="auth-subtitle">Secure admin panel access</p>

      <form id="signinForm" class="auth-form active" action="{{ route('user.signin.submit') }}" method="POST">
        @csrf
        <div class="form-group">
          <label for="signinEmail">Email or Username</label>
          <div class="input-wrapper">
            <i class="fas fa-user input-icon"></i>
            <input type="text" id="signinEmail" name="email" placeholder="Enter email or username" class="auth-input" required />
          </div>
        </div>

        <div class="form-group">
          <label for="signinPassword">Password</label>
          <div class="input-wrapper">
            <i class="fas fa-lock input-icon"></i>
            <input type="password" id="signinPassword" name="password" placeholder="Enter password" class="auth-input" required />
            <button type="button" class="password-toggle" id="toggleSigninPassword">
              <i class="fas fa-eye"></i>
            </button>
          </div>
        </div>

        <div class="form-footer">
          <label class="remember-me">
            <input type="checkbox" id="rememberMe" />
            <span>Remember me</span>
          </label>
          <a href="#" class="forgot-link" type="submit">Forgot password?</a>
        </div>
        <!-- <a href="./dashboard.html" class="auth-btn">Sign In</a> -->
        <button type="submit" class="auth-btn">Sign In</button>
      </form>
    </div>
  </div>

  {{-- <script src="{{ asset('AdminSide/js/admin_signin.js') }}"></script> --}}
</body>
</html>
