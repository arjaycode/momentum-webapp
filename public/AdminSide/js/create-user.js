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
