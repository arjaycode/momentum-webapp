<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Momentum — Create Account</title>
  <link rel="stylesheet" href="{{ asset('UserSide/css/signup.css') }}" />
</head>
<body style="background: url('{{ asset('UserSide/img/figma.jpg')}}') center/cover no-repeat fixed;">
  <div class="bg-rings" aria-hidden="true"></div>
  <div class="container" role="main">
    <section class="promo" aria-label="Marketing">
      <div class="logo">
        <div class="brand-square"><svg viewBox="0 0 24 24">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
          </svg></div>
        <div style="color: rgba(255, 255, 255, 0.95); font-weight: 700">
          Momentum
        </div>
      </div>

      <h1>Build Better Habits, Track<br />Your Progress</h1>
      <p class="lead">
        Join thousands of users who transformed their lives through consistent
        habit tracking and progress-focused features.
      </p>

      <ul>
        <li><span class="dot">✓</span> Daily habit tracking & reminders</li>
        <li><span class="dot">✓</span> Visual progress analytics</li>
        <li><span class="dot">✓</span> Social accountability features</li>
      </ul>
    </section>

    <aside class="card" aria-label="Create Account">
      <div class="brand">
        <div class="brand-square" style="width: 30px; height: 30px; font-size: 13px">
          <svg viewBox="0 0 24 24">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
          </svg>
        </div>
      </div>

      <h2>Create Account</h2>
      <p class="subtitle">Start your habit-building journey today</p>

      <form action="{{ route('user.signup.submit') }}" method="POST">
        @csrf
        <div class="form-grid" role="group" aria-label="Name and email">
          <div>
            <label for="firstName">First Name</label>
            <input id="firstName" name="firstname" type="text" placeholder="John" value="" />
          </div>
          <div>
            <label for="lastName">Last Name</label>
            <input id="lastName" name="lastname" type="text" placeholder="Doe" value="" />
          </div>

          <div class="full-row">
            <label for="email">Email Address</label>
            <input id="email" name="email" type="email" placeholder="john@example.com" value="" />
          </div>

          <div class="full-row pw-row">
            <label for="password">Password</label>
            <input id="password" name="password" type="password" placeholder="Create a strong password" aria-describedby="pwHelp" />
            <button type="button" class="pw-toggle" id="togglePw" aria-pressed="false" title="Show password">
              Show
            </button>
            <div id="pwHelp" style="font-size: 12px; color: var(--muted); margin-top: 6px">
              Password should be at least 8 characters long
            </div>
          </div>
        </div>
        @if ($errors->any())
        <div>
          <ul class="msg">
            @foreach ($errors->all() as $error)
            <li class="msg error">{{ $error }}</li>
            @endforeach
          </ul>
        </div>
        @endif
        <div>
          <button class="btn btn-primary" id="createBtn" type="Submit">
            Create Account
          </button>
        </div>

        <div id="message" class="msg" role="status" aria-live="polite"></div>

        <div class="or-row" aria-hidden="true" style="margin-top: 10px">
          <div class="line"></div>
          <div>Or continue with</div>
          <div class="line"></div>
        </div>

        <div class="socials" aria-hidden="true">
          <button type="button" class="social-btn" id="googleBtn">
            G Google
          </button>
        </div>

        <div class="signin">
          Already have an account? <a href="{{ route('user.signin') }}">Sign in here</a>
        </div>
      </form>
    </aside>
  </div>

  <script src="{{ asset('UserSide/js/signup.js') }}"></script>
</body>
</html>
