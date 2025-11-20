// Search functionality
const searchInput = document.getElementById('categorySearch');
const categoryCards = document.querySelectorAll('.category-card');

searchInput.addEventListener('input', function () {
  const searchTerm = this.value.toLowerCase();

  categoryCards.forEach((card) => {
    const title = card
      .querySelector('.category-title')
      .textContent.toLowerCase();
    const description = card
      .querySelector('.category-description')
      .textContent.toLowerCase();

    if (title.includes(searchTerm) || description.includes(searchTerm)) {
      card.style.display = '';
      card.style.animation = 'fadeIn 0.3s ease';
    } else {
      card.style.display = 'none';
    }
  });
});

// Filter functionality
const categoryFilter = document.getElementById('categoryFilter');

categoryFilter.addEventListener('change', function () {
  const filterValue = this.value.toLowerCase();

  categoryCards.forEach((card) => {
    const status = card.dataset.status;

    if (!filterValue || status === filterValue) {
      card.style.display = '';
      card.style.animation = 'fadeIn 0.3s ease';
    } else {
      card.style.display = 'none';
    }
  });
});

// Edit button functionality
document.querySelectorAll('.action-icon[title="Edit"]').forEach((btn) => {
  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    // const card = this.closest('.category-card');
    // const title = card.querySelector('.category-title').textContent;
    // alert(`Edit category: ${title}`);
    window.location.href = 'edit_habit_category.html';
  });
});

// Delete button functionality
// document.querySelectorAll('.action-icon[title="Delete"]').forEach((btn) => {
//   btn.addEventListener('click', function (e) {
//     e.stopPropagation();
//     const card = this.closest('.category-card');
//     const title = card.querySelector('.category-title').textContent;

//     if (confirm(`Are you sure you want to delete "${title}" category?`)) {
//       card.style.animation = 'fadeOut 0.3s ease';

//       setTimeout(() => {
//         card.remove();
//         updateStats();
//       }, 300);
//     }
//   });
// });

// Global variables to store the card and title of the category being deleted
let categoryToDelete = null;

// Get references to modal elements
const modalBackdrop = document.getElementById('deleteConfirmationModal');
const modalConfirmButton = document.getElementById('modalConfirmButton');
const modalCancelButton = document.getElementById('modalCancelButton');
const modalCategoryPreview = document.getElementById('modalCategoryPreview');

// Function to open the modal
function openDeleteModal(cardElement) {
  // 1. Store the card element for later use
  categoryToDelete = cardElement;

  // 2. Extract data from the category card
  const title = cardElement.querySelector('.category-title').textContent;
  // You'll need to adjust selectors based on your actual card structure for details/habits
  const details = cardElement.querySelector('.category-description')
    ? cardElement.querySelector('.category-description').textContent
    : 'No details available';
  const habitsText = cardElement.querySelector('.habit-count')
    ? cardElement.querySelector('.habit-count').textContent
    : 'N/A habits';
  const isActive = cardElement.querySelector('.status-badge.active'); // Assuming a class of 'category-status' and 'Active'

  // 3. Populate the modal preview
  modalCategoryPreview.innerHTML = `
        <div class="category-icon-bg">
            <div class="category-icon"></div>
        </div>
        <p class="preview-title">${title}</p>
        <p class="preview-details">${details}</p>
        <p class="preview-habits">${habitsText}</p>
        <span class="preview-status ${isActive ? 'active' : ''}">${
    isActive ? 'Active' : 'Inactive'
  }</span>
    `;

  // 4. Show the modal
  modalBackdrop.classList.add('is-visible');
}

// Function to close the modal
function closeDeleteModal() {
  modalBackdrop.classList.remove('is-visible');
  // Clear the stored reference
  categoryToDelete = null;
}

// --- Event Listeners ---

// 1. Listeners for the Category Delete button clicks
document.querySelectorAll('.action-icon[title="Delete"]').forEach((btn) => {
  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    const card = this.closest('.category-card'); // Assuming your card has class 'category-card'
    openDeleteModal(card);
  });
});

// 2. Listener for the Modal Confirm button
modalConfirmButton.addEventListener('click', function () {
  if (categoryToDelete) {
    // Apply fade-out animation
    categoryToDelete.style.animation = 'fadeOut 0.3s ease';

    // Remove the card after the animation
    setTimeout(() => {
      categoryToDelete.remove();
      // Assuming 'updateStats' is a function in your original code
      if (typeof updateStats === 'function') {
        updateStats();
      }
      closeDeleteModal(); // Close the modal after deletion
    }, 300);
  }
});

// 3. Listener for the Modal Cancel button and Backdrop click to close
modalCancelButton.addEventListener('click', closeDeleteModal);
modalBackdrop.addEventListener('click', function (e) {
  // Only close if the click is directly on the backdrop, not the modal content
  if (e.target === modalBackdrop) {
    closeDeleteModal();
  }
});

// 4. Add the CSS animation keyframe (if not already in your CSS)
// This should be at the end of your CSS file
/*
@keyframes fadeOut {
    from { opacity: 1; transform: translateY(0); }
    to { opacity: 0; transform: translateY(10px); }
}
*/

// Add Category button
document.querySelector('.btn-primary').addEventListener('click', function () {
  window.location.href = 'add_habit_category.html';
});

// Category card click (view details)
categoryCards.forEach((card) => {
  card.addEventListener('click', function () {
    const title = this.querySelector('.category-title').textContent;
    const habitCount = this.querySelector('.habit-count').textContent;
    console.log(`View details for ${title} - ${habitCount}`);
    // In a real app, this would open a detailed view
  });
});

// Update stats dynamically
function updateStats() {
  const visibleCards = Array.from(categoryCards).filter(
    (card) => card.style.display !== 'none'
  );
  const activeCards = visibleCards.filter(
    (card) => card.dataset.status === 'active'
  );

  const totalCategories = visibleCards.length;
  const activeCategories = activeCards.length;

  // Update total categories
  document.querySelectorAll('.stat-value')[0].textContent = totalCategories;

  // Update active categories
  document.querySelectorAll('.stat-value')[1].textContent = activeCategories;

  // Calculate total habits
  let totalHabits = 0;
  visibleCards.forEach((card) => {
    const habitText = card.querySelector('.habit-count').textContent;
    const habitNum = parseInt(habitText.match(/\d+/)[0]);
    totalHabits += habitNum;
  });

  document.querySelectorAll('.stat-value')[2].textContent = totalHabits;
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: scale(0.95);
        }
        to {
            opacity: 1;
            transform: scale(1);
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
`;
document.head.appendChild(style);

// Page load animations
window.addEventListener('load', function () {
  // Animate stat cards
  const statCards = document.querySelectorAll('.stat-card');
  statCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';

    setTimeout(() => {
      card.style.transition = 'all 0.5s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 100);
  });

  // Animate category cards
  categoryCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';

    setTimeout(() => {
      card.style.transition = 'all 0.5s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 400 + index * 50);
  });
});

// Status badge toggle (click to change status)
document.querySelectorAll('.status-badge').forEach((badge) => {
  badge.addEventListener('click', function (e) {
    e.stopPropagation();

    const card = this.closest('.category-card');

    if (this.classList.contains('active')) {
      this.classList.remove('active');
      this.classList.add('inactive');
      this.textContent = 'Inactive';
      card.dataset.status = 'inactive';
    } else {
      this.classList.remove('inactive');
      this.classList.add('active');
      this.textContent = 'Active';
      card.dataset.status = 'active';
    }

    updateStats();
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
});

// Tooltip for keyboard shortcuts
searchInput.setAttribute('title', 'Press Ctrl+K to focus (Cmd+K on Mac)');

console.log('Habits Management page loaded successfully!');
console.log('Keyboard shortcuts: Ctrl/Cmd+K to search, Escape to clear');
