// Habits Edit Page JavaScript
// Note: Habit data is already loaded from server in the blade template

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  // Initialize target days from server data (already set in blade template)
  updateDaysCount();
  updateTargetDaysInput();
  
  // Auto-hide success alerts
  const successAlert = document.querySelector('.success-alert');
  if (successAlert) {
    setTimeout(() => {
      successAlert.style.transition = 'opacity 0.3s ease';
      successAlert.style.opacity = '0';
      setTimeout(() => successAlert.remove(), 300);
    }, 5000);
  }
});

// Render Notes Helper
function renderNotes(notes = []) {
  const notesList = document.getElementById('notesList');
  notesList.innerHTML = '';

  notes.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // Sort by newest first

  notes.forEach((note) => {
    const noteItem = document.createElement('div');
    noteItem.className = 'note-item';
    noteItem.setAttribute('data-timestamp', note.timestamp);
    noteItem.innerHTML = `
                    <div class="note-text">${note.text}</div>
                    <div class="note-footer">
                        <div class="note-time">${note.time}</div>
                        <div class="note-actions">
                            <button class="delete-note-btn" onclick="deleteNoteFromDOM(this)">🗑️</button>
                        </div>
                    </div>
                `;
    notesList.appendChild(noteItem);
  });
}

// Delete note function (from DOM)
function deleteNoteFromDOM(btn) {
  if (
    confirm('Delete this note? This will be permanent once you save changes.')
  ) {
    btn.closest('.note-item').remove();
  }
  return false; // Prevent any form submission
}

// Add note functionality
const addNoteBtn = document.getElementById('addNoteBtn');
const noteInputArea = document.getElementById('noteInputArea');
// const saveNoteBtn = document.getElementById('saveNoteBtn');
const noteInput = document.getElementById('noteInput');

if (addNoteBtn) {
  addNoteBtn.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    noteInputArea.style.display =
      noteInputArea.style.display === 'none' ? 'block' : 'none';
    if (noteInputArea.style.display === 'block') {
      noteInput.focus();
    }
  });
}

if (saveNoteBtn) {
  saveNoteBtn.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    const noteText = noteInput.value.trim();
    if (noteText) {
      const now = new Date();
      const timeStr =
        now.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }) +
        ' at ' +
        now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
      const timestamp = now.toISOString();

      const newNoteItem = document.createElement('div');
      newNoteItem.className = 'note-item';
      newNoteItem.setAttribute('data-timestamp', timestamp);
      newNoteItem.innerHTML = `
                      <div class="note-text">${noteText}</div>
                      <div class="note-footer">
                          <div class="note-time">${timeStr}</div>
                          <div class="note-actions">
                              <button type="button" class="delete-note-btn" onclick="deleteNoteFromDOM(this)">🗑️</button>
                          </div>
                      </div>
                  `;

      const notesList = document.getElementById('notesList');
      if (notesList) {
        notesList.insertBefore(
          newNoteItem,
          notesList.firstChild
        );
      }
      noteInput.value = '';
      noteInputArea.style.display = 'none';
    }
  });
}

// Update target days input when days are selected
function updateTargetDaysInput() {
  const selectedDays = Array.from(
    document.querySelectorAll('.day-circle.active')
  ).map((circle) => circle.getAttribute('data-day'));
  
  const container = document.getElementById('targetDaysContainer');
  if (container) {
    // Clear existing inputs
    container.innerHTML = '';
    // Create hidden inputs for each selected day (Laravel expects array format)
    selectedDays.forEach(day => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = 'target_days[]';
      input.value = day;
      container.appendChild(input);
    });
  }
}

// Day selector toggle
document.querySelectorAll('.day-circle').forEach((day) => {
  day.addEventListener('click', function () {
    this.classList.toggle('active');
    this.classList.toggle('inactive');
    updateDaysCount();
    updateTargetDaysInput();
  });
});

<<<<<<< HEAD
function updateDaysCount() {
  const activeDays = document.querySelectorAll('.day-circle.active').length;
  const daysInfo = document.querySelector('.days-info');
  if (daysInfo) {
    daysInfo.textContent = `${activeDays} days per week`;
  }
  updateTargetDaysInput();
}

// Form submission handler
const habitForm = document.getElementById('habitForm');
if (habitForm) {
  habitForm.addEventListener('submit', function(e) {
    const selectedDays = Array.from(
      document.querySelectorAll('.day-circle.active')
    ).map((circle) => circle.getAttribute('data-day'));

    if (selectedDays.length === 0) {
      e.preventDefault();
      alert('Please select at least one target day for your habit.');
      return false;
    }

    // Update hidden inputs before submit
    updateTargetDaysInput();
  });
}

// Save Changes Function (for edit mode - if needed)
function saveChanges() {
  const habitTitle = document.getElementById('habitTitle').value.trim();
  const habitDesc = document.getElementById('habitDesc').value.trim();
  const notification = document.getElementById('notifToggle').checked;

  if (!habitTitle) {
    alert('Habit title cannot be empty.');
    return;
  }

  // Get selected days
  const selectedDays = Array.from(
    document.querySelectorAll('.day-circle.active')
  ).map((circle) => circle.getAttribute('data-day'));

  if (selectedDays.length === 0) {
    alert('Please select at least one target day.');
    return;
  }

  // If form exists, submit it
  const form = document.getElementById('habitForm');
  if (form) {
    updateTargetDaysInput();
    form.submit();
  }
}

// Event listener for the Save Changes button (if it's a button, not submit)
const saveBtn = document.getElementById('saveChangesBtn');
if (saveBtn && saveBtn.type !== 'submit') {
  saveBtn.addEventListener('click', function(e) {
    e.preventDefault();
    saveChanges();
  });
}

// Function to set the current date in the header (only if element exists)
=======
// saveNoteBtn.addEventListener('click', function () {
//   const noteText = noteInput.value.trim();
//   if (noteText) {
//     const now = new Date();
//     const timeStr =
//       now.toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'short',
//         day: 'numeric',
//       }) +
//       ' at ' +
//       now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
//     const timestamp = now.toISOString();

//     const newNoteItem = document.createElement('div');
//     newNoteItem.className = 'note-item';
//     newNoteItem.setAttribute('data-timestamp', timestamp);
//     newNoteItem.innerHTML = `
//                     <div class="note-text">${noteText}</div>
//                     <div class="note-footer">
//                         <div class="note-time">${timeStr}</div>
//                         <div class="note-actions">
//                             <button class="delete-note-btn" onclick="deleteNoteFromDOM(this)">🗑️</button>
//                         </div>
//                     </div>
//                 `;

//     document
//       .getElementById('notesList')
//       .insertBefore(
//         newNoteItem,
//         document.getElementById('notesList').firstChild
//       );
//     noteInput.value = '';
//     noteInputArea.style.display = 'none';
//   }
// });

// Delete Habit Functionality (Fulfills implicit requirement for a delete button)
document.getElementById('deleteBtn').addEventListener('click', function () {
  if (
    confirm(
      'Are you sure you want to delete this habit? This action cannot be undone.'
    )
  ) {
    const habits = JSON.parse(localStorage.getItem('habits') || '[]');
    const newHabits = habits.filter((h) => h.id !== currentHabitId);

    localStorage.setItem('habits', JSON.stringify(newHabits));
    alert('Habit deleted successfully!');
    // Redirect back to myhabit dashboard
    window.location.href = 'myhabit.html';
  }
});

// Function to set the current date in the header
>>>>>>> 7919d9eff6e3c7786d104ba820173a4c9e55a1b8
function setCurrentDate() {
  const currentDateEl = document.getElementById('currentDate');
  if (currentDateEl) {
    const dateOptions = { weekday: 'short', month: 'short', day: 'numeric' };
    currentDateEl.textContent =
      new Date().toLocaleDateString('en-US', dateOptions);
  }
}

// Expose function to global scope for use in inline HTML `onclick`
window.deleteNoteFromDOM = deleteNoteFromDOM;

document
  .querySelectorAll('.day-circle input[type="checkbox"]')
  .forEach((checkbox) => {
    checkbox.addEventListener('change', function () {
      // 1. Toggle the visual class on the parent label
      if (this.checked) {
        this.parentElement.classList.remove('inactive');
        this.parentElement.classList.add('active'); // Assuming your CSS uses 'active' for the selected color
      } else {
        this.parentElement.classList.add('inactive');
        this.parentElement.classList.remove('active');
      }

      // 2. Update the "X days per week" text
      updateDaysCount();
    });
  });

function updateDaysCount() {
  const checkedCount = document.querySelectorAll(
    '.day-circle input[type="checkbox"]:checked'
  ).length;
  document.querySelector(
    '.days-info'
  ).textContent = `${checkedCount} days per week`;
}
