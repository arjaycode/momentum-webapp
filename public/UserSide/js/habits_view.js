// Habits View Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Initialize any view-specific functionality
  console.log('Habits view page loaded');
  
  // Auto-hide success alerts after 5 seconds
  const successAlert = document.querySelector('.success-alert');
  if (successAlert) {
    setTimeout(() => {
      successAlert.style.transition = 'opacity 0.3s ease';
      successAlert.style.opacity = '0';
      setTimeout(() => successAlert.remove(), 300);
    }, 5000);
  }
});

