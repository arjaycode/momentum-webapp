// Tab Switching
const tabButtons = document.querySelectorAll('.tab-btn');
const signinForm = document.getElementById('signinForm');
const signupForm = document.getElementById('signupForm');

tabButtons.forEach((button) => {
  button.addEventListener('click', function () {
    const tab = this.getAttribute('data-tab');

    // Remove active class from all tabs
    tabButtons.forEach((btn) => btn.classList.remove('active'));

    // Add active class to clicked tab
    this.classList.add('active');

    // Show corresponding form
    if (tab === 'signin') {
      signinForm.classList.add('active');
      signupForm.classList.remove('active');
    } else {
      signupForm.classList.add('active');
      signinForm.classList.remove('active');
    }
  });
});

// Password Toggle for Sign In
const toggleSigninPassword = document.getElementById('toggleSigninPassword');
const signinPasswordInput = document.getElementById('signinPassword');

toggleSigninPassword.addEventListener('click', function () {
  const type =
    signinPasswordInput.getAttribute('type') === 'password'
      ? 'text'
      : 'password';
  signinPasswordInput.setAttribute('type', type);

  const icon = this.querySelector('i');
  icon.classList.toggle('fa-eye');
  icon.classList.toggle('fa-eye-slash');
});

// Password Toggle for Sign Up
const toggleSignupPassword = document.getElementById('toggleSignupPassword');
const signupPasswordInput = document.getElementById('signupPassword');

toggleSignupPassword.addEventListener('click', function () {
  const type =
    signupPasswordInput.getAttribute('type') === 'password'
      ? 'text'
      : 'password';
  signupPasswordInput.setAttribute('type', type);

  const icon = this.querySelector('i');
  icon.classList.toggle('fa-eye');
  icon.classList.toggle('fa-eye-slash');
});

// Sign In Form Submit
signinForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('signinEmail').value;
  const password = document.getElementById('signinPassword').value;
  const rememberMe = document.getElementById('rememberMe').checked;

  // Clear previous errors
  clearErrors();

  // Validate
  let isValid = true;

  if (!email) {
    showError(
      document.getElementById('signinEmail'),
      'Email or username is required'
    );
    isValid = false;
  }

  if (!password) {
    showError(
      document.getElementById('signinPassword'),
      'Password is required'
    );
    isValid = false;
  }

  if (isValid) {
    submitSignIn(email, password, rememberMe);
  }
});

// Sign Up Form Submit
signupForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('signupName').value;
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;

  // Clear previous errors
  clearErrors();

  // Validate
  let isValid = true;

  if (!name || name.length < 2) {
    showError(
      document.getElementById('signupName'),
      'Please enter your full name'
    );
    isValid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    showError(document.getElementById('signupEmail'), 'Email is required');
    isValid = false;
  } else if (!emailRegex.test(email)) {
    showError(
      document.getElementById('signupEmail'),
      'Please enter a valid email'
    );
    isValid = false;
  }

  if (!password) {
    showError(
      document.getElementById('signupPassword'),
      'Password is required'
    );
    isValid = false;
  } else if (password.length < 8) {
    showError(
      document.getElementById('signupPassword'),
      'Password must be at least 8 characters'
    );
    isValid = false;
  }

  if (isValid) {
    submitSignUp(name, email, password);
  }
});

// // Submit Sign In
// function submitSignIn(email, password, rememberMe) {
//   const submitBtn = signinForm.querySelector('.auth-btn');
//   const originalText = submitBtn.textContent;

//   // Show loading state
//   submitBtn.classList.add('loading');
//   submitBtn.textContent = 'Signing In';

//   // Simulate API call
//   setTimeout(() => {
//     console.log('Sign In:', { email, password, rememberMe });

//     submitBtn.classList.remove('loading');
//     submitBtn.textContent = originalText;

//     // Show success message
//     showNotification('Sign in successful! Redirecting...', 'success');

//     // Redirect after 1.5 seconds
//     setTimeout(() => {
//       window.location.href = '/admin/dashboard';
//       console.log('Redirect to dashboard');
//     }, 1500);
//   }, 2000);
// }

// // Submit Sign Up
// function submitSignUp(name, email, password) {
//   const submitBtn = signupForm.querySelector('.auth-btn');
//   const originalText = submitBtn.textContent;

//   // Show loading state
//   submitBtn.classList.add('loading');
//   submitBtn.textContent = 'Creating Account';

//   // Simulate API call
//   setTimeout(() => {
//     console.log('Sign Up:', { name, email, password });

//     submitBtn.classList.remove('loading');
//     submitBtn.textContent = originalText;

//     // Show success message
//     showNotification('Account created successfully!', 'success');

//     // Switch to sign in tab after 1.5 seconds
//     setTimeout(() => {
//       document.querySelector('[data-tab="signin"]').click();
//       signupForm.reset();
//     }, 1500);
//   }, 2000);
// }

// Show Error
function showError(input, message) {
  input.classList.add('error');

  // Remove existing error message
  const existingError =
    input.parentElement.parentElement.querySelector('.error-message');
  if (existingError) {
    existingError.remove();
  }

  // Add error message
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.textContent = message;
  input.parentElement.parentElement.appendChild(errorDiv);
}

// Clear Errors
function clearErrors() {
  const inputs = document.querySelectorAll('.auth-input');
  inputs.forEach((input) => {
    input.classList.remove('error', 'success');
  });

  const errorMessages = document.querySelectorAll('.error-message');
  errorMessages.forEach((msg) => msg.remove());
}

// Show Notification
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.4s ease;
        font-size: 14px;
        font-weight: 500;
    `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideOut 0.4s ease';
    setTimeout(() => notification.remove(), 400);
  }, 3000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Real-time validation for email
const signupEmailInput = document.getElementById('signupEmail');
signupEmailInput.addEventListener('blur', function () {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (this.value && !emailRegex.test(this.value)) {
    showError(this, 'Please enter a valid email address');
  }
});

// Keyboard shortcut - Enter to submit
document.addEventListener('keydown', function (e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    const activeForm = document.querySelector('.auth-form.active');
    if (activeForm && document.activeElement.tagName !== 'BUTTON') {
      e.preventDefault();
      activeForm.querySelector('.auth-btn').click();
    }
  }
});

// Auto-focus first input
setTimeout(() => {
  document.getElementById('signinEmail').focus();
}, 100);

console.log('Admin Sign In page loaded successfully!');
console.log('Demo credentials: Any email/password will work after 2 seconds');
