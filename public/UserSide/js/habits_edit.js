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

// Render Notes Helper (legacy function - kept for compatibility)
function renderNotes(notes = []) {
  const notesList = document.getElementById('notesList');
  if (!notesList) return;
  
  notesList.innerHTML = '';

  notes.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // Sort by newest first

  notes.forEach((note) => {
    const noteItem = document.createElement('div');
    noteItem.className = 'note-item';
    noteItem.setAttribute('data-timestamp', note.timestamp);
    
    // Create elements safely to prevent XSS
    const noteTextDiv = document.createElement('div');
    noteTextDiv.className = 'note-text';
    noteTextDiv.textContent = note.text; // Use textContent to prevent XSS
    
    const noteFooter = document.createElement('div');
    noteFooter.className = 'note-footer';
    
    const noteTime = document.createElement('div');
    noteTime.className = 'note-time';
    noteTime.textContent = note.time;
    
    const noteActions = document.createElement('div');
    noteActions.className = 'note-actions';
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-note-btn';
    deleteBtn.textContent = '🗑️';
    deleteBtn.onclick = function() { 
      if (confirm('Delete this note? This will be permanent once you save changes.')) {
        noteItem.remove();
      }
    };
    
    noteActions.appendChild(deleteBtn);
    noteFooter.appendChild(noteTime);
    noteFooter.appendChild(noteActions);
    noteItem.appendChild(noteTextDiv);
    noteItem.appendChild(noteFooter);
    
    notesList.appendChild(noteItem);
  });
}

// Delete note function (from database)
async function deleteNote(habitId, noteId, btn) {
  if (!confirm('Are you sure you want to delete this note? This action cannot be undone.')) {
    return false;
  }

  try {
    const response = await fetch(`/user/habits/${habitId}/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
    });

    const data = await response.json();

    if (data.success) {
      // Remove note from DOM
      const noteItem = btn.closest('.note-item');
      if (noteItem) {
        noteItem.style.transition = 'opacity 0.3s ease';
        noteItem.style.opacity = '0';
        setTimeout(() => {
          noteItem.remove();
        }, 300);
      }
    } else {
      alert(data.message || 'Failed to delete note');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while deleting the note. Please try again.');
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

const saveNoteBtn = document.getElementById('saveNoteBtn');

if (saveNoteBtn) {
  saveNoteBtn.addEventListener('click', async function (e) {
    e.preventDefault();
    e.stopPropagation();
    const noteText = noteInput.value.trim();
    
    if (!noteText) {
      alert('Please enter a note before saving.');
      return;
    }

    // Get habit ID from the form action, URL, or data attribute
    let habitId = null;
    const form = document.getElementById('habitForm');
    if (form) {
      // Try to get from form action
      const actionMatch = form.action.match(/\/habits\/edit\/(\d+)/);
      if (actionMatch) {
        habitId = actionMatch[1];
      }
      // Try to get from data attribute
      if (!habitId && form.dataset.habitId) {
        habitId = form.dataset.habitId;
      }
    }
    // Try to get from URL as fallback
    if (!habitId) {
      const urlMatch = window.location.pathname.match(/\/habits\/edit\/(\d+)/);
      if (urlMatch) {
        habitId = urlMatch[1];
      }
    }
    
    if (!habitId) {
      alert('Unable to determine habit ID. Please refresh the page and try again.');
      return;
    }

    // Disable button during request
    const originalText = this.innerHTML;
    this.disabled = true;
    this.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving...';

    try {
      const response = await fetch(`/user/habits/${habitId}/notes`, {
        method: 'POST',
        headers: {
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({
          message: noteText
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server error:', response.status, errorText);
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.note) {
        // Create new note item
        const newNoteItem = document.createElement('div');
        newNoteItem.className = 'note-item';
        newNoteItem.setAttribute('data-note-id', data.note.id);
        
        // Create elements safely to prevent XSS
        const noteTextDiv = document.createElement('div');
        noteTextDiv.className = 'note-text';
        noteTextDiv.textContent = data.note.message; // Use textContent to prevent XSS
        
        const noteFooter = document.createElement('div');
        noteFooter.className = 'note-footer';
        
        const noteTime = document.createElement('div');
        noteTime.className = 'note-time';
        noteTime.textContent = data.note.created_at;
        
        const noteActions = document.createElement('div');
        noteActions.className = 'note-actions';
        
        const deleteBtn = document.createElement('button');
        deleteBtn.type = 'button';
        deleteBtn.className = 'delete-note-btn';
        deleteBtn.textContent = '🗑️';
        deleteBtn.onclick = function() { deleteNote(habitId, data.note.id, this); };
        
        noteActions.appendChild(deleteBtn);
        noteFooter.appendChild(noteTime);
        noteFooter.appendChild(noteActions);
        newNoteItem.appendChild(noteTextDiv);
        newNoteItem.appendChild(noteFooter);

        const notesList = document.getElementById('notesList');
        if (notesList) {
          // Insert at the beginning
          notesList.insertBefore(newNoteItem, notesList.firstChild);
          
          // Add fade-in animation
          newNoteItem.style.opacity = '0';
          setTimeout(() => {
            newNoteItem.style.transition = 'opacity 0.3s ease';
            newNoteItem.style.opacity = '1';
          }, 10);
        }
        
        noteInput.value = '';
        noteInputArea.style.display = 'none';
      } else {
        alert(data.message || 'Failed to save note');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while saving the note. Please try again.');
    } finally {
      // Re-enable button
      this.disabled = false;
      this.innerHTML = originalText;
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
