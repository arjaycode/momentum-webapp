// Store original values
const originalValues = {
  firstName: document.getElementById('firstName').value,
  lastName: document.getElementById('lastName').value,
  email: document.getElementById('email').value,
  role: document.getElementById('role').value,
  status: document.getElementById('status').value,
};

// Form elements
const form = document.getElementById('editUserForm');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const role = document.getElementById('role');
const status = document.getElementById('status');

// Track changes
function trackChanges() {
  const inputs = [firstName, lastName, email, role, status];

  inputs.forEach((input) => {
    input.addEventListener('input', function () {
      const fieldName = this.id;

      if (this.value !== originalValues[fieldName]) {
        this.classList.add('changed');
      } else {
        this.classList.remove('changed');
      }

      checkForChanges();
    });
  });
}

// Check if any changes were made
function checkForChanges() {
  const hasChanges =
    firstName.value !== originalValues.firstName ||
    lastName.value !== originalValues.lastName ||
    email.value !== originalValues.email ||
    role.value !== originalValues.role ||
    status.value !== originalValues.status;

  return hasChanges;
}

// Real-time Email Validation
email.addEventListener('blur', function () {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(this.value)) {
    showError(this, 'Please enter a valid email address');
  } else {
    showSuccess(this);
  }
});

// Show Error
function showError(input, message) {
  input.classList.add('error');
  input.classList.remove('success');

  // Remove existing error message
  const existingError = input.parentElement.querySelector('.error-message');
  if (existingError) {
    existingError.remove();
  }

  // Add error message
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.textContent = message;
  input.parentElement.appendChild(errorDiv);
}

// Show Success
function showSuccess(input) {
  input.classList.remove('error');
  input.classList.add('success');

  // Remove error message
  const existingError = input.parentElement.querySelector('.error-message');
  if (existingError) {
    existingError.remove();
  }
}

// Clear Validation
function clearValidation(input) {
  input.classList.remove('error', 'success');

  const existingError = input.parentElement.querySelector('.error-message');
  if (existingError) {
    existingError.remove();
  }
}

// Form Submit
form.addEventListener('submit', function (e) {
  e.preventDefault();

  // Check if there are changes
  if (!checkForChanges()) {
    showNotification('No changes detected', 'info');
    return;
  }

  // Clear previous validations
  const inputs = [firstName, lastName, email, role, status];
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
  const saveBtn = document.querySelector('.btn-save');
  const btnText = saveBtn.innerHTML;

  // Show loading state
  saveBtn.classList.add('loading');
  saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';

  // Collect changed data
  const changes = {};

  if (firstName.value !== originalValues.firstName) {
    changes.firstName = firstName.value;
  }
  if (lastName.value !== originalValues.lastName) {
    changes.lastName = lastName.value;
  }
  if (email.value !== originalValues.email) {
    changes.email = email.value;
  }
  if (role.value !== originalValues.role) {
    changes.role = role.value;
  }
  if (status.value !== originalValues.status) {
    changes.status = status.value;
  }

  console.log('Updating user with changes:', changes);

  // Simulate API call
  setTimeout(() => {
    saveBtn.classList.remove('loading');
    saveBtn.innerHTML = btnText;

    // Show success notification
    showNotification('User updated successfully!', 'success');

    // Update original values
    originalValues.firstName = firstName.value;
    originalValues.lastName = lastName.value;
    originalValues.email = email.value;
    originalValues.role = role.value;
    originalValues.status = status.value;

    // Remove changed indicators
    const inputs = document.querySelectorAll('.form-input, .form-select');
    inputs.forEach((input) => input.classList.remove('changed'));

    // Optionally redirect back after 1.5 seconds
    setTimeout(() => {
      // window.history.back();
    }, 1500);
  }, 2000);
}

// Cancel Button
const cancelBtn = document.getElementById('cancelBtn');
cancelBtn.addEventListener('click', function () {
  if (checkForChanges()) {
    if (confirm('You have unsaved changes. Are you sure you want to cancel?')) {
      // Reset to original values
      firstName.value = originalValues.firstName;
      lastName.value = originalValues.lastName;
      email.value = originalValues.email;
      role.value = originalValues.role;
      status.value = originalValues.status;

      // Clear all validation and changed states
      const inputs = document.querySelectorAll('.form-input, .form-select');
      inputs.forEach((input) => {
        clearValidation(input);
        input.classList.remove('changed');
      });

      showNotification('Changes cancelled', 'info');

      // Optionally redirect back
      // window.history.back();
    }
  } else {
    // No changes, just go back
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
  // Ctrl/Cmd + S to save
  if ((e.ctrlKey || e.metaKey) && e.key === 's') {
    e.preventDefault();
    if (checkForChanges()) {
      form.dispatchEvent(new Event('submit'));
    } else {
      showNotification('No changes to save', 'info');
    }
  }

  // Escape to cancel
  if (e.key === 'Escape') {
    cancelBtn.click();
  }
});

// Warn before leaving if there are unsaved changes
window.addEventListener('beforeunload', function (e) {
  if (checkForChanges()) {
    e.preventDefault();
    e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
    return e.returnValue;
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

// Initialize change tracking
trackChanges();

// Auto-focus first input
firstName.focus();
firstName.setSelectionRange(firstName.value.length, firstName.value.length);

console.log('Edit User page loaded successfully!');
console.log('Original values:', originalValues);
console.log('Keyboard shortcuts:');
console.log('  - Ctrl/Cmd+S: Save changes');
console.log('  - Escape: Cancel');
