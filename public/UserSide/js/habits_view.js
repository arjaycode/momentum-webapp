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

  // Notes functionality
  const addNoteBtn = document.getElementById('addNoteBtn');
  const noteInputArea = document.getElementById('noteInputArea');
  const noteInput = document.getElementById('noteInput');
  const saveNoteBtn = document.getElementById('saveNoteBtn');

  // Get habit ID from multiple sources
  let habitId = null;
  const contentArea = document.querySelector('.content-area');
  if (contentArea && contentArea.dataset.habitId) {
    habitId = contentArea.dataset.habitId;
  }
  // Fallback to URL
  if (!habitId) {
    const urlMatch = window.location.pathname.match(/\/habits\/view\/(\d+)/);
    if (urlMatch) {
      habitId = urlMatch[1];
    }
  }
  
  console.log('Habit ID for notes:', habitId);

  // Debug: Check if elements exist
  console.log('Notes elements found:', {
    addNoteBtn: !!addNoteBtn,
    noteInputArea: !!noteInputArea,
    noteInput: !!noteInput,
    saveNoteBtn: !!saveNoteBtn,
    habitId: habitId
  });

  // Toggle note input area
  if (addNoteBtn && noteInputArea) {
    addNoteBtn.addEventListener('click', function() {
      const isHidden = noteInputArea.style.display === 'none' || noteInputArea.style.display === '';
      noteInputArea.style.display = isHidden ? 'block' : 'none';
      if (isHidden && noteInput) {
        setTimeout(() => noteInput.focus(), 100);
      }
    });
  } else {
    console.error('Notes elements not found:', {
      addNoteBtn: !!addNoteBtn,
      noteInputArea: !!noteInputArea
    });
  }

  // Save note
  if (saveNoteBtn && noteInput) {
    saveNoteBtn.addEventListener('click', async function(e) {
      e.preventDefault();
      const noteText = noteInput.value.trim();
      
      if (!noteText) {
        alert('Please enter a note before saving.');
        return;
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
});

// Delete note function (global for onclick)
window.deleteNote = async function(habitId, noteId, btn) {
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

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Delete note error:', response.status, errorText);
      throw new Error(`Server error: ${response.status}`);
    }

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
};

