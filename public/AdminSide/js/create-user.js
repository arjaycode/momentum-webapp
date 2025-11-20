// Password Toggle Functionality
const togglePassword = document.getElementById('togglePassword');
const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');

togglePassword.addEventListener('click', function () {
  const type =
    passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);

  const icon = this.querySelector('i');
  icon.classList.toggle('fa-eye');
  icon.classList.toggle('fa-eye-slash');
});

toggleConfirmPassword.addEventListener('click', function () {
  const type =
    confirmPasswordInput.getAttribute('type') === 'password'
      ? 'text'
      : 'password';
  confirmPasswordInput.setAttribute('type', type);

  const icon = this.querySelector('i');
  icon.classList.toggle('fa-eye');
  icon.classList.toggle('fa-eye-slash');
});

// Form Submit
form.addEventListener('submit', function (e) {
  e.preventDefault();

  // Clear previous validations
  const inputs = [
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    role,
    status,
  ];
  inputs.forEach((input) => clearValidation(input));

  let isValid = true;

  // Validate First Name
  if (!firstName.value.trim()) {
    showError(firstName, 'First name is required');
    isValid = false;
  }

  // Validate Last Name
  if (!lastName.value.trim()) {
    showError(lastName, 'Last name is required');
    isValid = false;
  }

  // Validate Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value.trim()) {
    showError(email, 'Email is required');
    isValid = false;
  } else if (!emailRegex.test(email.value)) {
    showError(email, 'Please enter a valid email address');
    isValid = false;
  }

  // Validate Password
  if (!password.value) {
    showError(password, 'Password is required');
    isValid = false;
  } else if (password.value.length < 8) {
    showError(password, 'Password must be at least 8 characters');
    isValid = false;
  }

  // Validate Confirm Password
  if (!confirmPassword.value) {
    showError(confirmPassword, 'Please confirm your password');
    isValid = false;
  } else if (password.value !== confirmPassword.value) {
    showError(confirmPassword, 'Passwords do not match');
    isValid = false;
  }

  // Validate Role
  if (!role.value) {
    showError(role, 'Please select a role');
    isValid = false;
  }

  // Validate Status
  if (!status.value) {
    showError(status, 'Please select a status');
    isValid = false;
  }

  // If all valid, submit
  if (isValid) {
    submitForm();
  }
});

// Submit Form
function submitForm() {
  const createBtn = document.querySelector('.btn-create');
  const btnText = createBtn.innerHTML;

  // Show loading state
  createBtn.classList.add('loading');
  createBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating...';

  // Collect form data
  const formData = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    password: password.value,
    role: role.value,
    status: status.value,
  };

  console.log('Creating user:', formData);

  // Simulate API call
  setTimeout(() => {
    createBtn.classList.remove('loading');
    createBtn.innerHTML = btnText;

    // Show success notification
    showNotification('User created successfully!', 'success');

    // Reset form after 1 second
    setTimeout(() => {
      form.reset();

      // Clear all validation states
      const inputs = document.querySelectorAll('.form-input, .form-select');
      inputs.forEach((input) => clearValidation(input));

      // Optionally redirect to user management
      // window.location.href = 'user-management.html';
    }, 1000);
  }, 2000);
}

// Cancel Button
const cancelBtn = document.getElementById('cancelBtn');
cancelBtn.addEventListener('click', function () {
  if (
    confirm('Are you sure you want to cancel? All entered data will be lost.')
  ) {
    form.reset();

    // Clear all validation states
    const inputs = document.querySelectorAll('.form-input, .form-select');
    inputs.forEach((input) => clearValidation(input));

    // Optionally redirect back
    window.history.back();
  }
});

// Show Notification
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existing = document.querySelector('.notification');
  if (existing) {
    existing.remove();
  }

  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        background: ${
          type === 'success'
            ? '#10b981'
            : type === 'error'
            ? '#ef4444'
            : '#667eea'
        };
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        animation: slideIn 0.3s ease;
        font-size: 14px;
        font-weight: 500;
    `;

  document.body.appendChild(notification);

  // Auto remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Add animation styles
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

// Keyboard shortcuts
document.addEventListener('keydown', function (e) {
  // Ctrl/Cmd + Enter to submit
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    e.preventDefault();
    form.dispatchEvent(new Event('submit'));
  }

  // Escape to cancel
  if (e.key === 'Escape') {
    cancelBtn.click();
  }
});

// Page load animation
window.addEventListener('load', function () {
  const formContainer = document.querySelector('.form-container');
  formContainer.style.opacity = '0';
  formContainer.style.transform = 'translateY(20px)';

  setTimeout(() => {
    formContainer.style.transition = 'all 0.5s ease';
    formContainer.style.opacity = '1';
    formContainer.style.transform = 'translateY(0)';
  }, 100);
});

// Auto-focus first input
firstName.focus();

console.log('Create User page loaded successfully!');
console.log('Keyboard shortcuts:');
console.log('  - Ctrl/Cmd+Enter: Submit form');
console.log('  - Escape: Cancel');
