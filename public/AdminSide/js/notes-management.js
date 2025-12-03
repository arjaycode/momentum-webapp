// Search functionality
const searchInput = document.getElementById('notesSearch');
const noteItems = document.querySelectorAll('.note-item');

searchInput.addEventListener('input', function () {
  const searchTerm = this.value.toLowerCase();

  noteItems.forEach((note) => {
    const userName = note.querySelector('.user-name').textContent.toLowerCase();
    const userEmail = note
      .querySelector('.user-email')
      .textContent.toLowerCase();
    const categoryName = note
      .querySelector('.category-name')
      .textContent.toLowerCase();
    const noteDescription = note
      .querySelector('.note-description')
      .textContent.toLowerCase();

    if (
      userName.includes(searchTerm) ||
      userEmail.includes(searchTerm) ||
      categoryName.includes(searchTerm) ||
      noteDescription.includes(searchTerm)
    ) {
      note.style.display = '';
      note.style.animation = 'fadeIn 0.3s ease';
    } else {
      note.style.display = 'none';
    }
  });

  updateStats();
});

// --- FIX 1: Prevent Enter key in search from reloading page ---
searchInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault();
  }
});

// delete functionality
document.addEventListener('DOMContentLoaded', function () {
  // Global variable to store the note being deleted
  let noteToDelete = null;

  // Get references to modal elements
  const modalBackdrop = document.getElementById('deleteModal');
  const modalConfirmButton = document.getElementById('modalConfirm');
  const modalCancelButton = document.getElementById('modalCancel');
  // We will inject the HTML into this container
  const modalNotePreview = modalBackdrop.querySelector('.note-preview');

  // --- Functions ---

  // Function to open the modal
  function openDeleteModal(noteElement) {
    // 1. Store the note element for later use
    noteToDelete = noteElement;

    // 2. Extract data from the note item
    const userName = noteElement.querySelector('.user-name').textContent;
    const userId = noteElement.querySelector('.user-id').textContent;
    const userAvatar = noteElement.querySelector('.user-avatar').src;
    const habitName = noteElement.querySelector('.category-name').textContent;
    // Get the icon HTML (the <i> tag)
    const habitIconInner =
      noteElement.querySelector('.category-icon').innerHTML;
    const noteDescription =
      noteElement.querySelector('.note-description').textContent;

    // 3. Populate the modal preview using Template Literal
    // We rebuild the structure inside .note-preview
    modalNotePreview.innerHTML = `
      <div class="preview-header">
        <img src="${userAvatar}" alt="User" class="user-avatar" />
        <div>
          <div class="preview-user">${userName}</div>
          <div class="preview-id">${userId}</div>
        </div>
      </div>

      <div class="preview-habit">
        <span class="habit-icon">${habitIconInner}</span>
        <span class="habit-name">${habitName}</span>
      </div>

      <div class="preview-note">
        <span class="note-label">Note:</span>
        <span>${noteDescription}</span>
      </div>
    `;

    // 4. Show the modal
    modalBackdrop.classList.add('show');
  }

  // Function to close the modal
  function closeDeleteModal() {
    modalBackdrop.classList.remove('show');
    // Clear the stored reference after a short delay to allow fade out
    setTimeout(() => {
      noteToDelete = null;
    }, 200);
  }

  // --- Event Listeners ---

  // 1. Listeners for the Note Delete button clicks
  document.querySelectorAll('.delete-btn').forEach((btn) => {
    btn.addEventListener('click', function (e) {
      e.preventDefault(); // Stop link navigation
      e.stopPropagation(); // Stop bubbling
      const noteItem = this.closest('.note-item');
      openDeleteModal(noteItem);
    });
  });

  // 2. Listener for the Modal Confirm button
  // --- FIX 2: Added 'e' parameter and preventDefault() ---
  modalConfirmButton.addEventListener('click', function (e) {
    e.preventDefault(); // <--- THIS STOPS THE RELOAD

    if (noteToDelete) {
      // Apply fade-out animation
      noteToDelete.style.transition = 'all 0.3s ease';
      noteToDelete.style.opacity = '0';
      noteToDelete.style.transform = 'translateX(20px)';

      // Remove the item after the animation
      setTimeout(() => {
        noteToDelete.remove();
        closeDeleteModal();
      }, 300);
    }
  });

  // 3. Listener for the Modal Cancel button
  modalCancelButton.addEventListener('click', closeDeleteModal);

  // 4. Listener for Backdrop click to close
  window.addEventListener('click', function (e) {
    // Only close if the click is directly on the backdrop container
    if (e.target === modalBackdrop) {
      closeDeleteModal();
    }
  });
});

// Update stats dynamically
function updateStats() {
  const visibleNotes = Array.from(noteItems).filter(
    (note) => note.style.display !== 'none'
  );
  const totalNotes = visibleNotes.length;

  document.querySelector('.stat-value').textContent = totalNotes;
}

// Note item click (expand/view details)
noteItems.forEach((note) => {
  note.addEventListener('click', function (e) {
    // Don't trigger if clicking on action buttons
    if (e.target.closest('.action-btn')) return;

    // Toggle expanded state
    this.classList.toggle('expanded');
  });
});

// Status badge toggle
document.querySelectorAll('.status-badge').forEach((badge) => {
  badge.addEventListener('click', function (e) {
    e.stopPropagation();

    if (this.classList.contains('active')) {
      this.classList.remove('active');
      this.classList.add('inactive');
      this.textContent = 'Inactive';
    } else {
      this.classList.remove('inactive');
      this.classList.add('active');
      this.textContent = 'Active';
    }
  });
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: scale(1);
        }
        to {
            opacity: 0;
            transform: scale(0.95);
        }
    }
    
    .note-item.expanded {
        background: #f8f9fa;
    }
    
    .note-item.expanded .note-description {
        display: block;
        white-space: normal;
    }
`;
document.head.appendChild(style);

// Page load animations
window.addEventListener('load', function () {
  // Animate stat card
  const statCard = document.querySelector('.stat-card-single');
  if (statCard) {
    statCard.style.opacity = '0';
    statCard.style.transform = 'translateY(20px)';

    setTimeout(() => {
      statCard.style.transition = 'all 0.5s ease';
      statCard.style.opacity = '1';
      statCard.style.transform = 'translateY(0)';
    }, 100);
  }

  // Animate note items
  noteItems.forEach((note, index) => {
    note.style.opacity = '0';
    note.style.transform = 'translateY(20px)';

    setTimeout(() => {
      note.style.transition = 'all 0.5s ease';
      note.style.opacity = '1';
      note.style.transform = 'translateY(0)';
    }, 200 + index * 50);
  });
});

// Keyboard shortcuts
document.addEventListener('keydown', function (e) {
  // Ctrl/Cmd + K to focus search
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    searchInput.focus();
  }

  // Escape to clear search
  if (e.key === 'Escape') {
    searchInput.value = '';
    searchInput.dispatchEvent(new Event('input'));
    searchInput.blur();
  }

  // Ctrl/Cmd + N to add new note
  if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
    e.preventDefault();
    document.querySelector('.btn-primary').click();
  }
});

// Tooltip for keyboard shortcuts
searchInput.setAttribute('title', 'Press Ctrl+K to focus (Cmd+K on Mac)');

// Category filter (optional enhancement)
function filterByCategory(category) {
  noteItems.forEach((note) => {
    const categoryName = note
      .querySelector('.category-name')
      .textContent.toLowerCase();

    if (!category || categoryName === category.toLowerCase()) {
      note.style.display = '';
    } else {
      note.style.display = 'none';
    }
  });

  updateStats();
}

// Export function for external use
window.filterNotesByCategory = filterByCategory;

// Log initialization
console.log('Notes Management page loaded successfully!');
console.log('Total notes:', noteItems.length);
console.log('Keyboard shortcuts:');
console.log('  - Ctrl/Cmd+K: Focus search');
console.log('  - Ctrl/Cmd+N: Add new note');
console.log('  - Escape: Clear search');

// Optional: Track user interactions
let interactionCount = 0;
document.addEventListener('click', function () {
  interactionCount++;
  if (interactionCount % 10 === 0) {
    console.log(`User interactions: ${interactionCount}`);
  }
});

// // Auto-save simulation (for future implementation)
// let autoSaveTimer;
// function simulateAutoSave() {
//   clearTimeout(autoSaveTimer);
//   autoSaveTimer = setTimeout(() => {
//     console.log('Auto-save triggered');
//     // In a real app, this would save data to backend
//   }, 2000);
// }

// // Attach auto-save to search input
// searchInput.addEventListener('input', simulateAutoSave);
