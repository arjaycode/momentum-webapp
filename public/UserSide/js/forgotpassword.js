// public/js/app.js

document.addEventListener('DOMContentLoaded', function() {

    // 1. Initialize Feather Icons (Relies on the locally included feather.min.js)
    if (typeof feather !== 'undefined') {
        feather.replace();
    }

    // --- 2. ALERT LOGIC (SHOWS "Successfully sent!") ---
    function showSuccessAlert() {
        const alert = document.getElementById('successAlert');
        const alertInner = document.getElementById('alertInner');

        if (alert) {
            alert.style.display = 'flex';
            // Use a slight timeout to ensure the transition is triggered
            setTimeout(() => {
                if (alertInner) {
                    alertInner.classList.add('animate-in');
                }
            }, 10);

            // Auto-hide after 8 seconds
            setTimeout(() => {
                hideAlert();
            }, 8000);
        }
    }

    function hideAlert() {
        const alert = document.getElementById('successAlert');
        const alertInner = document.getElementById('alertInner');

        if (alert && alertInner) {
            alertInner.classList.remove('animate-in');
            // Hide completely after the transition
            setTimeout(() => {
                alert.style.display = 'none';
            }, 300);
        }
    }
    
    // Show success alert on page load if it exists
    const successAlert = document.getElementById('successAlert');
    if (successAlert && successAlert.style.display !== 'none') {
        showSuccessAlert();
    }

    // Attach handler to close button
    const closeAlertButton = document.getElementById('closeAlert');
    if (closeAlertButton) {
        closeAlertButton.addEventListener('click', hideAlert);
    }

    // Error alert handlers
    function showErrorAlert() {
        const alert = document.getElementById('errorAlert');
        const alertInner = document.getElementById('errorAlertInner');

        if (alert) {
            alert.style.display = 'flex';
            setTimeout(() => {
                if (alertInner) {
                    alertInner.classList.add('animate-in');
                }
            }, 10);
        }
    }

    function hideErrorAlert() {
        const alert = document.getElementById('errorAlert');
        const alertInner = document.getElementById('errorAlertInner');

        if (alert && alertInner) {
            alertInner.classList.remove('animate-in');
            setTimeout(() => {
                alert.style.display = 'none';
            }, 300);
        }
    }

    const closeErrorAlertButton = document.getElementById('closeErrorAlert');
    if (closeErrorAlertButton) {
        closeErrorAlertButton.addEventListener('click', hideErrorAlert);
    }

    // Show and auto-hide error alert after 8 seconds
    const errorAlert = document.getElementById('errorAlert');
    if (errorAlert && errorAlert.style.display !== 'none') {
        showErrorAlert();
        setTimeout(() => {
            hideErrorAlert();
        }, 8000);
    }
    
    // Close alert when clicking outside
    document.addEventListener('click', function(e) {
        const successAlert = document.getElementById('successAlert');
        const errorAlert = document.getElementById('errorAlert');
        
        if (successAlert && !successAlert.querySelector('.alert-content-box').contains(e.target) && e.target === successAlert) {
            hideAlert();
        }
        
        if (errorAlert && !errorAlert.querySelector('.alert-content-box').contains(e.target) && e.target === errorAlert) {
            hideErrorAlert();
        }
    });
    // ----------------------------------------------------

    // --- 3. Form Submission Handler ---
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', function(e) {
            const emailInput = document.getElementById('email');
            const email = emailInput.value.trim();

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            // Client-side validation (but allow server-side validation to handle errors)
            if (!email || !emailRegex.test(email)) {
                e.preventDefault();
                emailInput.focus();
                emailInput.style.borderColor = '#ff4d4d';
                setTimeout(() => {
                    emailInput.style.borderColor = '';
                }, 3000);
                return;
            }

            // Lock the button during processing
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Sending... <i data-feather="loader" class="animate-spin submit-icon"></i>';
            
            // Re-initialize feather icons for the spinner
            if (typeof feather !== 'undefined') {
                feather.replace();
            }

            // Allow form to submit naturally - don't prevent default
            // The form will submit to the server and handle the response
        });
    }

    // --- 4. Hover Effect (Replicating original JS) ---
    const cards = document.querySelectorAll('.form-card, .steps-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // CSS handles the actual transform on :hover, but we ensure it works
            this.style.transform = 'translateY(-4px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Show success alert on page load if it exists
    const successAlertOnLoad = document.getElementById('successAlert');
    if (successAlertOnLoad && successAlertOnLoad.style.display !== 'none') {
        showSuccessAlert();
    }
});