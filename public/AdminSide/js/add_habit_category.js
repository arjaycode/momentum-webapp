// Form elements
const form = document.getElementById('addCategoryForm');
const habitName = document.getElementById('habitName');
const description = document.getElementById('description');
const status = document.getElementById('status');
const cancelBtn = document.getElementById('cancelBtn');

// Track selections
let selectedColor = null;
let selectedIcon = null;

// Color selection
const colorRadios = document.querySelectorAll('input[name="color"]');
colorRadios.forEach(radio => {
    radio.addEventListener('change', function() {
        selectedColor = this.value;
        console.log('Selected color:', selectedColor);
    });
});

// Icon selection
const iconRadios = document.querySelectorAll('input[name="icon"]');
iconRadios.forEach(radio => {
    radio.addEventListener('change', function() {
        selectedIcon = this.value;
        console.log('Selected icon:', selectedIcon);
    });
});

// Form validation
function validateForm() {
    let isValid = true;
    
    // Clear previous errors
    clearErrors();
    
    // Validate habit name
    if (!habitName.value.trim()) {
        showError(habitName, 'Habit name is required');
        isValid = false;
    }
    
    // Validate description
    if (!description.value.trim()) {
        showError(description, 'Description is required');
        isValid = false;
    }
    
    // Validate status
    if (!status.value) {
        showError(status, 'Please select a status');
        isValid = false;
    }
    
    // Validate color selection
    if (!selectedColor) {
        showError(document.querySelector('.color-picker'), 'Please select a color theme');
        isValid = false;
    }
    
    // Validate icon selection
    if (!selectedIcon) {
        showError(document.querySelector('.icon-picker'), 'Please select an icon');
        isValid = false;
    }
    
    return isValid;
}

// Show error
function showError(element, message) {
    element.classList.add('error');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    if (element.classList.contains('color-picker') || element.classList.contains('icon-picker')) {
        element.parentElement.appendChild(errorDiv);
    } else {
        element.parentElement.appendChild(errorDiv);
    }
}

// Clear errors
function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.remove());
    
    const errorInputs = document.querySelectorAll('.error');
    errorInputs.forEach(input => input.classList.remove('error'));
}

// Form submit
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!validateForm()) {
        return;
    }
    
    // Collect form data
    const formData = {
        habitName: habitName.value.trim(),
        description: description.value.trim(),
        status: status.value,
        color: selectedColor,
        icon: selectedIcon
    };
    
    console.log('Creating category:', formData);
    
    // Show loading state
    const submitBtn = form.querySelector('.btn-create');
    const originalText = submitBtn.innerHTML;
    submitBtn.classList.add('loading');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating...';
    
    // Simulate API call
    setTimeout(() => {
        submitBtn.classList.remove('loading');
        submitBtn.innerHTML = originalText;
        
        // Show success notification
        showNotification('Habit category created successfully!', 'success');
        
        // Reset form after 1 second
        setTimeout(() => {
            form.reset();
            selectedColor = null;
            selectedIcon = null;
            
            // Optionally redirect
            // window.history.back();
        }, 1000);
    }, 2000);
});

// Cancel button
cancelBtn.addEventListener('click', function() {
    if (form.querySelector('input, textarea, select').value || selectedColor || selectedIcon) {
        if (confirm('Are you sure you want to cancel? All entered data will be lost.')) {
            form.reset();
            selectedColor = null;
            selectedIcon = null;
            clearErrors();
            window.history.back();
        }
    } else {
        window.history.back();
    }
});

// Show notification
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
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10001;
        animation: slideIn 0.3s ease;
        font-size: 14px;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
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

// Real-time validation
habitName.addEventListener('blur', function() {
    if (!this.value.trim()) {
        this.classList.add('error');
    } else {
        this.classList.remove('error');
        const errorMsg = this.parentElement.querySelector('.error-message');
        if (errorMsg) errorMsg.remove();
    }
});

description.addEventListener('blur', function() {
    if (!this.value.trim()) {
        this.classList.add('error');
    } else {
        this.classList.remove('error');
        const errorMsg = this.parentElement.querySelector('.error-message');
        if (errorMsg) errorMsg.remove();
    }
});

status.addEventListener('change', function() {
    if (this.value) {
        this.classList.remove('error');
        const errorMsg = this.parentElement.querySelector('.error-message');
        if (errorMsg) errorMsg.remove();
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
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

// Warn before leaving if form has data
window.addEventListener('beforeunload', function(e) {
    if (habitName.value || description.value || status.value || selectedColor || selectedIcon) {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
        return e.returnValue;
    }
});

// Page load animation
window.addEventListener('load', function() {
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
habitName.focus();

console.log('Add Habit Category page loaded successfully!');
console.log('Keyboard shortcuts:');
console.log('  - Ctrl/Cmd+Enter: Submit form');
console.log('  - Escape: Cancel');