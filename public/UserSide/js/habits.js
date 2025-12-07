// Habits page JavaScript
// Note: Delete functionality is handled inline in habits.blade.php
// This file is kept for any additional habits page functionality

document.addEventListener('DOMContentLoaded', function() {
  // Auto-hide success alerts after 5 seconds
  const successAlert = document.querySelector('.success-alert');
  if (successAlert) {
    setTimeout(() => {
      successAlert.style.transition = 'opacity 0.3s ease';
      successAlert.style.opacity = '0';
      setTimeout(() => successAlert.remove(), 300);
    }, 5000);
  }
  
  // Ensure delete buttons work properly
  // The inline script in habits.blade.php handles the actual delete functionality
  console.log('Habits page loaded');
});
