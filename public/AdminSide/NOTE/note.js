// State management
let selectedColor = 'blue';
let selectedIcon = 'heart';
let isEditMode = false;

// DOM Elements
const userSelect = document.getElementById('userSelect');
const habitSelect = document.getElementById('habitSelect');
const noteText = document.getElementById('noteText');
const saveBtn = document.getElementById('saveBtn');
const deleteBtn = document.getElementById('deleteBtn');
const deleteModal = document.getElementById('deleteModal');
const modalCancel = document.getElementById('modalCancel');
const modalConfirm = document.getElementById('modalConfirm');

// Color theme selection
const colorBtns = document.querySelectorAll('.color-btn');
colorBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    colorBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    selectedColor = btn.dataset.color;
  });
});

// Set default color
colorBtns[0].classList.add('active');

// Icon selection
const iconBtns = document.querySelectorAll('.icon-btn');
iconBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    iconBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    selectedIcon = btn.dataset.icon;
  });
});

// Set default icon
iconBtns[0].classList.add('active');

// Check if we're in edit mode (has data)
function checkEditMode() {
  if (userSelect.value && habitSelect.value && noteText.value) {
    isEditMode = true;
    saveBtn.textContent = 'Save Changes';
    deleteBtn.style.display = 'inline-block';
  } else {
    isEditMode = false;
    saveBtn.textContent = 'Create Note';
    deleteBtn.style.display = 'none';
  }
}

// Simulate loading existing data (for demo)
function loadExistingNote() {
  userSelect.value = 'johnson';
  habitSelect.value = 'fitness';
  noteText.value =
    'Felt more energized than usual. Form on squats improving. Need to increase push-up reps next session.';
  checkEditMode();
}

// Load existing note after a short delay (simulating data fetch)
setTimeout(loadExistingNote, 500);

// Listen for changes to update button state
[userSelect, habitSelect, noteText].forEach((element) => {
  element.addEventListener('input', checkEditMode);
});

// Save button handler
saveBtn.addEventListener('click', () => {
  if (!userSelect.value || !habitSelect.value || !noteText.value) {
    alert('Please fill in all required fields');
    return;
  }

  const noteData = {
    user: userSelect.value,
    habit: habitSelect.value,
    note: noteText.value,
    color: selectedColor,
    icon: selectedIcon,
  };

  console.log('Saving note:', noteData);

  if (isEditMode) {
    alert('Note updated successfully!');
  } else {
    alert('Note created successfully!');
  }
});

// Delete button handler - opens modal
deleteBtn.addEventListener('click', () => {
  // Update modal with current form data
  const userName = userSelect.options[userSelect.selectedIndex].text;
  const habitName = habitSelect.options[habitSelect.selectedIndex].text;

  document.getElementById('modalUserName').textContent =
    userName.split(' (')[0];
  document.getElementById('modalUserId').textContent =
    userName.match(/\(([^)]+)\)/)?.[1] || 'ID: 4001';
  document.getElementById('modalHabitName').textContent = habitName;
  document.getElementById('modalNoteText').textContent = noteText.value;

  // Set habit icon based on selection
  const iconMap = {
    heart: '❤️',
    dumbbell: '💪',
    calendar: '📅',
    star: '⭐',
  };
  document.getElementById('modalHabitIcon').textContent =
    iconMap[selectedIcon] || '💪';

  deleteModal.classList.add('show');
});

// Modal cancel button
modalCancel.addEventListener('click', () => {
  deleteModal.classList.remove('show');
});

// Modal confirm button
modalConfirm.addEventListener('click', () => {
  console.log('Deleting note for user:', userSelect.value);
  alert('Note deleted successfully!');
  deleteModal.classList.remove('show');

  // Reset form
  userSelect.value = '';
  habitSelect.value = '';
  noteText.value = '';
  checkEditMode();
});

// Close modal when clicking outside
deleteModal.addEventListener('click', (e) => {
  if (e.target === deleteModal) {
    deleteModal.classList.remove('show');
  }
});

// Cancel button handler
document.querySelector('.btn-cancel').addEventListener('click', () => {
  if (
    confirm(
      'Are you sure you want to cancel? Any unsaved changes will be lost.'
    )
  ) {
    window.location.href = '#';
  }
});

// Initialize
checkEditMode();
