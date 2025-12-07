<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Habit Tracker Password Recovery</title>

    <link rel="stylesheet" href="{{ asset('UserSide/css/forgotpassword.css') }}" />
    <script src="https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.min.js"></script>
</head>

<body class="body-reset">

    {{-- SUCCESS ALERT (Shown if Laravel sends reset link) --}}
    @if (session('success'))
    <div id="successAlert" class="alert-overlay">
        <div class="alert-inner-wrapper" id="alertInner">
            <div class="alert-content-box">
                <div class="alert-icon-wrapper">
                    <i data-feather="check-circle" class="alert-icon-check"></i>
                </div>
                <div class="alert-text-content">
                    <h3 class="alert-title">Successfully sent!</h3>
                    <p class="alert-message">{{ session('success') }}</p>

                    <div class="alert-action-area">
                        <a href="https://mail.google.com/" target="_blank" class="open-gmail-btn">
                            <i data-feather="external-link" class="open-gmail-icon"></i> Open Gmail
                        </a>
                    </div>
                </div>
                <button id="closeAlert" class="alert-close-btn">
                    <i data-feather="x" class="alert-close-icon"></i>
                </button>
            </div>
        </div>
    </div>
    @endif

    {{-- ERROR ALERT (Shown if there are general errors after form submission) --}}
    @if ($errors->any() && !session('success'))
    <div id="errorAlert" class="alert-overlay" style="display: block;">
        <div class="alert-inner-wrapper" id="errorAlertInner" style="background: #fff5f5; border-left: 4px solid #ff4d4d;">
            <div class="alert-content-box">
                <div class="alert-icon-wrapper" style="background: #ff4d4d;">
                    <i data-feather="alert-circle" class="alert-icon-check" style="color: white;"></i>
                </div>
                <div class="alert-text-content">
                    <h3 class="alert-title" style="color: #ff4d4d;">Error</h3>
                    <p class="alert-message" style="color: #666;">{{ $errors->first('email') ?: 'An error occurred. Please try again.' }}</p>
                </div>
                <button id="closeErrorAlert" class="alert-close-btn">
                    <i data-feather="x" class="alert-close-icon"></i>
                </button>
            </div>
        </div>
    </div>
    @endif

    <main class="main-container">

        <div class="header-section">
            <h1 class="header-title">
                Lost Your <span class="text-primary-color">Habit</span> Password?
            </h1>
            <p class="header-subtitle">
                Don't worry, we've all been there! Let's get you back on track with your habit-building journey.
            </p>
        </div>

        <div class="content-grid">
            <div class="col-left">

                {{-- FORM CARD --}}
                <div class="form-card">
                    <div class="form-header">
                        <div class="form-icon-wrapper">
                            <i data-feather="key" class="form-icon-key"></i>
                        </div>
                        <h2 class="form-title">Password Reset</h2>
                    </div>

                    {{-- PASSWORD RESET FORM --}}
                    <form id="forgotPasswordForm" class="form-body"
                          method="POST" action="{{ route('password.email') }}">
                        @csrf

                        <div>
                            <label for="email" class="form-label">
                                Enter your email address
                            </label>

                            <div class="input-container">
                                <i data-feather="mail" class="input-icon"></i>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value="{{ old('email') }}"
                                    required
                                    placeholder="habit.tracker@example.com"
                                    class="form-input"
                                >
                            </div>

                            @error('email')
                                <p class="input-help-text" style="color: #ff4d4d;">
                                    {{ $message }}
                                </p>
                            @else
                                <p class="input-help-text">
                                    We'll send a magic link to reset your password
                                </p>
                            @enderror
                        </div>

                        <button type="submit" class="submit-btn">
                            Send Reset Link
                            <i data-feather="send" class="submit-icon"></i>
                        </button>

                    </form>

                    <div class="form-footer">
                        <a href="{{ route('user.signin') }}" class="help-link">
                            <i data-feather="arrow-left" class="help-icon"></i>
                            <span>Back to Sign In</span>
                        </a>
                    </div>
                </div>

                {{-- TIPS --}}
                <div class="tip-card">
                    <h3 class="tip-title">
                        <i data-feather="shield" class="tip-icon"></i>
                        Security Tips
                    </h3>
                    <ul class="tip-list">
                        <li>
                            <i data-feather="check-circle" class="tip-check-icon"></i>
                            <span>Check your spam folder if you don't see our email</span>
                        </li>
                        <li>
                            <i data-feather="check-circle" class="tip-check-icon"></i>
                            <span>Reset links expire in 1 hour for security</span>
                        </li>
                        <li>
                            <i data-feather="check-circle" class="tip-check-icon"></i>
                            <span>Never share your password reset link</span>
                        </li>
                    </ul>
                </div>

            </div>

            {{-- RIGHT SIDE --}}
            <div class="col-right">

                <div class="promo-card">
                    <div class="promo-content">
                        <h3 class="promo-title">Your Habit Journey Awaits</h3>
                        <p class="promo-subtitle">
                            We'll get you back to building amazing habits in no time.
                        </p>

                        <div class="promo-list">
                            <div class="promo-item">
                                <div class="promo-check-wrapper">
                                    <i data-feather="check" class="promo-check-icon"></i>
                                </div>
                                <span>Daily streaks preserved</span>
                            </div>
                            <div class="promo-item">
                                <div class="promo-check-wrapper">
                                    <i data-feather="check" class="promo-check-icon"></i>
                                </div>
                                <span>Progress history safe</span>
                            </div>
                            <div class="promo-item">
                                <div class="promo-check-wrapper">
                                    <i data-feather="check" class="promo-check-icon"></i>
                                </div>
                                <span>All habits waiting for you</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="steps-card">
                    <h3 class="steps-title">
                        <i data-feather="clock" class="steps-icon"></i>
                        What Happens Next?
                    </h3>

                    <div class="steps-body">

                        <div class="step-item">
                            <div class="step-number-wrapper step-1-bg">
                                <span class="step-number step-1-text">1</span>
                            </div>
                            <div class="step-text">
                                <h4 class="step-header">Email Sent</h4>
                                <p class="step-detail">Check your inbox for the reset link</p>
                            </div>
                        </div>

                        <div class="step-item">
                            <div class="step-number-wrapper step-2-bg">
                                <span class="step-number step-2-text">2</span>
                            </div>
                            <div class="step-text">
                                <h4 class="step-header">Create New Password</h4>
                                <p class="step-detail">Choose a strong, memorable password</p>
                            </div>
                        </div>

                        <div class="step-item">
                            <div class="step-number-wrapper step-3-bg">
                                <span class="step-number step-3-text">3</span>
                            </div>
                            <div class="step-text">
                                <h4 class="step-header">Back to Your Habits</h4>
                                <p class="step-detail">Continue your routines normally</p>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    </main>

    <script src="{{ asset('UserSide/js/forgotpassword.js') }}"></script>
    <script>
        feather.replace();
    </script>

</body>
</html>
