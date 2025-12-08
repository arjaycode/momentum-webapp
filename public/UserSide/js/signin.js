// Toggle password visibility
function togglePassword() {
  const passwordInput = document.getElementById('password');
  const toggleButton = document.querySelector('.toggle-password');
  
  if (passwordInput && toggleButton) {
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      toggleButton.textContent = '🙈'; // Eye with slash icon
      toggleButton.setAttribute('aria-label', 'Hide password');
    } else {
      passwordInput.type = 'password';
      toggleButton.textContent = '👁'; // Eye icon
      toggleButton.setAttribute('aria-label', 'Show password');
    }
  }
}

// Auto-hide success alerts after 5 seconds
document.addEventListener('DOMContentLoaded', function() {
  const successAlert = document.getElementById('successAlertSignin');
  const statusAlert = document.getElementById('statusAlertSignin');
  
  if (successAlert) {
    setTimeout(() => {
      successAlert.style.transition = 'opacity 0.3s ease';
      successAlert.style.opacity = '0';
      setTimeout(() => successAlert.remove(), 300);
    }, 5000);
  }
  
  if (statusAlert) {
    setTimeout(() => {
      statusAlert.style.transition = 'opacity 0.3s ease';
      statusAlert.style.opacity = '0';
      setTimeout(() => statusAlert.remove(), 300);
    }, 5000);
  }
});

