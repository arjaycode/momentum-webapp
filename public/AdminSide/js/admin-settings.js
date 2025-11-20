// Tab Navigation
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach((button) => {
  button.addEventListener('click', function () {
    const tabName = this.getAttribute('data-tab');

    // Remove active class from all tabs
    tabButtons.forEach((btn) => btn.classList.remove('active'));
    tabContents.forEach((content) => content.classList.remove('active'));

    // Add active class to clicked tab
    this.classList.add('active');
    document.getElementById(`${tabName}-tab`).classList.add('active');
  });
});

// Profile Form Submit
const profileForm = document.querySelector('.profile-form');
profileForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const email = document.getElementById('email').value;

  console.log('Profile Updated:', { firstName, lastName, email });

  // Show success message
  showNotification('Profile updated successfully!', 'success');
});

// Cancel Button
const cancelButton = document.querySelector('.btn-cancel');
cancelButton.addEventListener('click', function () {
  if (
    confirm(
      'Are you sure you want to cancel? Any unsaved changes will be lost.'
    )
  ) {
    profileForm.reset();
    showNotification('Changes cancelled', 'info');
  }
});

// Change Photo Button
const changePhotoBtn = document.querySelector('.link-btn');
changePhotoBtn.addEventListener('click', function () {
  // In a real app, this would open a file picker
  alert('File picker would open here to select a new profile photo');
});

// Toggle Switches
const toggleSwitches = document.querySelectorAll('.toggle-switch input');
toggleSwitches.forEach((toggle) => {
  toggle.addEventListener('change', function () {
    const toggleItem = this.closest('.toggle-item');
    const label = toggleItem.querySelector('.toggle-label').textContent;
    const status = this.checked ? 'enabled' : 'disabled';

    console.log(`${label}: ${status}`);
    showNotification(`${label} ${status}`, 'info');
  });
});

// Save Changes Buttons
const saveButtons = document.querySelectorAll('.btn-save-full');
saveButtons.forEach((button) => {
  button.addEventListener('click', function () {
    // Collect all form data
    const settings = collectSettings();
    console.log('Settings saved:', settings);
    showNotification('Settings saved successfully!', 'success');
  });
});

// Collect all settings
function collectSettings() {
  return {
    passwordPolicy: {
      minLength: document.getElementById('minLength')?.value || 8,
      expiry: document.getElementById('expiry')?.value || 90,
      requireUppercase:
        document.querySelectorAll('.toggle-switch input')[0]?.checked || false,
      requireSpecialChars:
        document.querySelectorAll('.toggle-switch input')[1]?.checked || false,
      requireNumbers:
        document.querySelectorAll('.toggle-switch input')[2]?.checked || false,
      preventReuse:
        document.querySelectorAll('.toggle-switch input')[3]?.checked || false,
    },
    sessionManagement: {
      timeout: document.getElementById('sessionTimeout')?.value || 30,
      maxSessions: document.getElementById('maxSessions')?.value || 3,
      rememberDuration:
        document.getElementById('rememberDuration')?.value || 30,
      forceLogout:
        document.querySelectorAll('.toggle-switch input')[4]?.checked || false,
      trackActivity:
        document.querySelectorAll('.toggle-switch input')[5]?.checked || false,
    },
    userRegistration: {
      defaultRole: document.getElementById('defaultRole')?.value || 'user',
      allowSelfRegistration:
        document.querySelectorAll('.toggle-switch input')[6]?.checked || false,
      emailVerification:
        document.querySelectorAll('.toggle-switch input')[7]?.checked || false,
    },
  };
}

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

// Input validation
const numberInputs = document.querySelectorAll('input[type="number"]');
numberInputs.forEach((input) => {
  input.addEventListener('input', function () {
    if (this.value < 0) {
      this.value = 0;
    }
  });
});

// Email validation
const emailInput = document.getElementById('email');
emailInput.addEventListener('blur', function () {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(this.value)) {
    this.style.borderColor = '#ef4444';
    showNotification('Please enter a valid email address', 'error');
  } else {
    this.style.borderColor = '#e0e0e0';
  }
});

// Keyboard shortcuts
document.addEventListener('keydown', function (e) {
  // Ctrl/Cmd + S to save
  if ((e.ctrlKey || e.metaKey) && e.key === 's') {
    e.preventDefault();
    const activeTab = document.querySelector('.tab-content.active');
    const saveButton = activeTab.querySelector('.btn-save, .btn-save-full');
    if (saveButton) {
      saveButton.click();
    }
  }

  // Escape to cancel
  if (e.key === 'Escape') {
    const cancelBtn = document.querySelector('.btn-cancel');
    if (cancelBtn) {
      cancelBtn.click();
    }
  }
});

// Auto-save indicator
let autoSaveTimer;
const formInputs = document.querySelectorAll(
  '.form-input, .form-select, .toggle-switch input'
);

formInputs.forEach((input) => {
  input.addEventListener('change', function () {
    clearTimeout(autoSaveTimer);

    // Show saving indicator
    const savingIndicator = document.createElement('span');
    savingIndicator.textContent = 'Saving...';
    savingIndicator.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 8px 16px;
            background: #666;
            color: white;
            border-radius: 6px;
            font-size: 12px;
            z-index: 1000;
        `;
    document.body.appendChild(savingIndicator);

    autoSaveTimer = setTimeout(() => {
      savingIndicator.remove();
      console.log('Auto-saved at', new Date().toLocaleTimeString());
    }, 1000);
  });
});

// Page load animation
window.addEventListener('load', function () {
  const cards = document.querySelectorAll('.settings-card');

  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';

    setTimeout(() => {
      card.style.transition = 'all 0.5s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 100);
  });
});

// Log initialization
console.log('Admin Settings page loaded successfully!');
console.log('Keyboard shortcuts:');
console.log('  - Ctrl/Cmd+S: Save changes');
console.log('  - Escape: Cancel changes');

// Export settings function for external use
window.exportSettings = function () {
  const settings = collectSettings();
  const dataStr = JSON.stringify(settings, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'admin-settings.json';
  link.click();

  showNotification('Settings exported successfully!', 'success');
};

// Import settings function
window.importSettings = function (jsonData) {
  try {
    const settings = JSON.parse(jsonData);

    // Apply settings to form
    if (settings.passwordPolicy) {
      document.getElementById('minLength').value =
        settings.passwordPolicy.minLength;
      document.getElementById('expiry').value = settings.passwordPolicy.expiry;
    }

    if (settings.sessionManagement) {
      document.getElementById('sessionTimeout').value =
        settings.sessionManagement.timeout;
      document.getElementById('maxSessions').value =
        settings.sessionManagement.maxSessions;
      document.getElementById('rememberDuration').value =
        settings.sessionManagement.rememberDuration;
    }

    if (settings.userRegistration) {
      document.getElementById('defaultRole').value =
        settings.userRegistration.defaultRole;
    }

    showNotification('Settings imported successfully!', 'success');
  } catch (error) {
    showNotification('Failed to import settings', 'error');
    console.error('Import error:', error);
  }
};
