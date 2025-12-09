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

// Delete functionality is handled in the blade template via showDeleteModal function
// This section is kept for any additional modal-related functionality if needed

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
    // Don't trigger if clicking on action buttons or their children
    if (e.target.closest('.action-btn') || e.target.closest('.note-actions')) {
      e.stopPropagation();
      return;
    }

    // Toggle expanded state
    this.classList.toggle('expanded');
  });
});

// Delete button click handlers are now handled in the blade template
// This ensures proper access to showDeleteModal function and form handling

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
