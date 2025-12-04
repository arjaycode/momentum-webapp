// // Store original values
// const originalValues = {
//     habitName: document.getElementById('habitName').value,
//     description: document.getElementById('description').value,
//     status: document.getElementById('status').value,
//     color: document.querySelector('input[name="color"]:checked')?.value || null,
//     icon: document.querySelector('input[name="icon"]:checked')?.value || null
// };

// // Form elements
// const form = document.getElementById('editCategoryForm');
// const habitName = document.getElementById('habitName');
// const description = document.getElementById('description');
// const status = document.getElementById('status');
// const cancelBtn = document.getElementById('cancelBtn');

// // Track current selections
// let currentColor = originalValues.color;
// let currentIcon = originalValues.icon;

// // Track changes on form fields
// function trackChanges() {
//     habitName.addEventListener('input', function() {
//         if (this.value !== originalValues.habitName) {
//             this.classList.add('changed');
//         } else {
//             this.classList.remove('changed');
//         }
//     });

//     description.addEventListener('input', function() {
//         if (this.value !== originalValues.description) {
//             this.classList.add('changed');
//         } else {
//             this.classList.remove('changed');
//         }
//     });

//     status.addEventListener('change', function() {
//         if (this.value !== originalValues.status) {
//             this.classList.add('changed');
//         } else {
//             this.classList.remove('changed');
//         }
//     });
// }

// // Color selection
// const colorRadios = document.querySelectorAll('input[name="color"]');
// colorRadios.forEach(radio => {
//     radio.addEventListener('change', function() {
//         currentColor = this.value;

//         // Highlight if changed
//         const colorOptions = document.querySelectorAll('.color-option');
//         colorOptions.forEach(option => option.classList.remove('changed'));

//         if (currentColor !== originalValues.color) {
//             this.nextElementSibling.classList.add('changed');
//         }

//         console.log('Selected color:', currentColor);
//     });
// });

// // Icon selection
// const iconRadios = document.querySelectorAll('input[name="icon"]');
// iconRadios.forEach(radio => {
//     radio.addEventListener('change', function() {
//         currentIcon = this.value;

//         // Highlight if changed
//         const iconOptions = document.querySelectorAll('.icon-option');
//         iconOptions.forEach(option => option.classList.remove('changed'));

//         if (currentIcon !== originalValues.icon) {
//             this.nextElementSibling.classList.add('changed');
//         }

//         console.log('Selected icon:', currentIcon);
//     });
// });

// // Check if any changes were made
// function hasChanges() {
//     return (
//         habitName.value !== originalValues.habitName ||
//         description.value !== originalValues.description ||
//         status.value !== originalValues.status ||
//         currentColor !== originalValues.color ||
//         currentIcon !== originalValues.icon
//     );
// }

// // Form validation
// function validateForm() {
//     let isValid = true;

//     // Clear previous errors
//     clearErrors();

//     // Validate habit name
//     if (!habitName.value.trim()) {
//         showError(habitName, 'Habit name is required');
//         isValid = false;
//     }

//     // Validate description
//     if (!description.value.trim()) {
//         showError(description, 'Description is required');
//         isValid = false;
//     }

//     // Validate status
//     if (!status.value) {
//         showError(status, 'Please select a status');
//         isValid = false;
//     }

//     // Validate color selection
//     if (!currentColor) {
//         showError(document.querySelector('.color-picker'), 'Please select a color theme');
//         isValid = false;
//     }

//     // Validate icon selection
//     if (!currentIcon) {
//         showError(document.querySelector('.icon-picker'), 'Please select an icon');
//         isValid = false;
//     }

//     return isValid;
// }

// // Show error
// function showError(element, message) {
//     element.classList.add('error');

//     const errorDiv = document.createElement('div');
//     errorDiv.className = 'error-message';
//     errorDiv.textContent = message;

//     if (element.classList.contains('color-picker') || element.classList.contains('icon-picker')) {
//         element.parentElement.appendChild(errorDiv);
//     } else {
//         element.parentElement.appendChild(errorDiv);
//     }
// }

// // Clear errors
// function clearErrors() {
//     const errorMessages = document.querySelectorAll('.error-message');
//     errorMessages.forEach(msg => msg.remove());

//     const errorInputs = document.querySelectorAll('.error');
//     errorInputs.forEach(input => input.classList.remove('error'));
// }

// // Form submit
// form.addEventListener('submit', function(e) {
//     e.preventDefault();

//     // Check if there are changes
//     if (!hasChanges()) {
//         showNotification('No changes detected', 'info');
//         return;
//     }

//     if (!validateForm()) {
//         return;
//     }

//     // Collect changed data
//     const changes = {};

//     if (habitName.value !== originalValues.habitName) {
//         changes.habitName = habitName.value.trim();
//     }
//     if (description.value !== originalValues.description) {
//         changes.description = description.value.trim();
//     }
//     if (status.value !== originalValues.status) {
//         changes.status = status.value;
//     }
//     if (currentColor !== originalValues.color) {
//         changes.color = currentColor;
//     }
//     if (currentIcon !== originalValues.icon) {
//         changes.icon = currentIcon;
//     }

//     console.log('Updating category with changes:', changes);

//     // Show loading state
//     const submitBtn = form.querySelector('.btn-save');
//     const originalText = submitBtn.innerHTML;
//     submitBtn.classList.add('loading');
//     submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';

//     // Simulate API call
//     setTimeout(() => {
//         submitBtn.classList.remove('loading');
//         submitBtn.innerHTML = originalText;

//         // Show success notification
//         showNotification('Habit category updated successfully!', 'success');

//         // Update original values
//         originalValues.habitName = habitName.value;
//         originalValues.description = description.value;
//         originalValues.status = status.value;
//         originalValues.color = currentColor;
//         originalValues.icon = currentIcon;

//         // Remove changed indicators
//         document.querySelectorAll('.changed').forEach(el => el.classList.remove('changed'));

//         // Optionally redirect after 1.5 seconds
//         setTimeout(() => {
//             // window.history.back();
//         }, 1500);
//     }, 2000);
// });

// // Cancel button
// cancelBtn.addEventListener('click', function() {
//     if (hasChanges()) {
//         if (confirm('You have unsaved changes. Are you sure you want to cancel?')) {
//             // Reset to original values
//             habitName.value = originalValues.habitName;
//             description.value = originalValues.description;
//             status.value = originalValues.status;

//             // Reset color
//             if (originalValues.color) {
//                 document.getElementById(`color-${originalValues.color}`).checked = true;
//             }
//             currentColor = originalValues.color;

//             // Reset icon
//             if (originalValues.icon) {
//                 document.getElementById(`icon-${originalValues.icon}`).checked = true;
//             }
//             currentIcon = originalValues.icon;

//             // Clear all changed indicators
//             document.querySelectorAll('.changed').forEach(el => el.classList.remove('changed'));
//             clearErrors();

//             showNotification('Changes cancelled', 'info');

//             // Optionally redirect back
//             // window.history.back();
//         }
//     } else {
//         window.history.back();
//     }
// });

// // Show notification
// function showNotification(message, type = 'success') {
//     const notification = document.createElement('div');
//     notification.textContent = message;
//     notification.style.cssText = `
//         position: fixed;
//         top: 20px;
//         right: 20px;
//         padding: 16px 24px;
//         background: ${type === 'success' ? '#10b981' : type === 'info' ? '#667eea' : '#ef4444'};
//         color: white;
//         border-radius: 8px;
//         box-shadow: 0 4px 12px rgba(0,0,0,0.15);
//         z-index: 10001;
//         animation: slideIn 0.3s ease;
//         font-size: 14px;
//         font-weight: 500;
//     `;

//     document.body.appendChild(notification);

//     setTimeout(() => {
//         notification.style.animation = 'slideOut 0.3s ease';
//         setTimeout(() => notification.remove(), 300);
//     }, 3000);
// }

// // Add notification animations
// const style = document.createElement('style');
// style.textContent = `
//     @keyframes slideIn {
//         from {
//             transform: translateX(400px);
//             opacity: 0;
//         }
//         to {
//             transform: translateX(0);
//             opacity: 1;
//         }
//     }

//     @keyframes slideOut {
//         from {
//             transform: translateX(0);
//             opacity: 1;
//         }
//         to {
//             transform: translateX(400px);
//             opacity: 0;
//         }
//     }
// `;
// document.head.appendChild(style);

// // Keyboard shortcuts
// document.addEventListener('keydown', function(e) {
//     // Ctrl/Cmd + S to save
//     if ((e.ctrlKey || e.metaKey) && e.key === 's') {
//         e.preventDefault();
//         if (hasChanges()) {
//             form.dispatchEvent(new Event('submit'));
//         } else {
//             showNotification('No changes to save', 'info');
//         }
//     }

//     // Escape to cancel
//     if (e.key === 'Escape') {
//         cancelBtn.click();
//     }
// });

// // Warn before leaving if there are unsaved changes
// window.addEventListener('beforeunload', function(e) {
//     if (hasChanges()) {
//         e.preventDefault();
//         e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
//         return e.returnValue;
//     }
// });

// // Page load animation
// window.addEventListener('load', function() {
//     const formContainer = document.querySelector('.form-container');
//     formContainer.style.opacity = '0';
//     formContainer.style.transform = 'translateY(20px)';

//     setTimeout(() => {
//         formContainer.style.transition = 'all 0.5s ease';
//         formContainer.style.opacity = '1';
//         formContainer.style.transform = 'translateY(0)';
//     }, 100);
// });

// // Initialize change tracking
// trackChanges();

// // Auto-focus first input and move cursor to end
// habitName.focus();
// habitName.setSelectionRange(habitName.value.length, habitName.value.length);

// console.log('Edit Habit Category page loaded successfully!');
// console.log('Original values:', originalValues);
// console.log('Keyboard shortcuts:');
// console.log('  - Ctrl/Cmd+S: Save changes');
// console.log('  - Escape: Cancel');
