document.addEventListener('DOMContentLoaded', function() {
  // Modal elements
  const deleteModal = document.getElementById('deleteModal');
  if (!deleteModal) {
    console.error('Delete modal not found');
    return;
  }
  
  const closeBtn = deleteModal.querySelector('.close-btn');
  const cancelBtn = document.getElementById('cancelBtn');
  const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
  
  let habitToDelete = null;

  // Delete button handlers
  const deleteButtons = document.querySelectorAll('.btn-delete');
  deleteButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      habitToDelete = this.dataset.habitId;
      deleteModal.style.display = 'flex';
    });
  });

  // Function to reset delete modal state
  function resetDeleteModal() {
    habitToDelete = null;
    confirmDeleteBtn.disabled = false;
    confirmDeleteBtn.innerHTML = originalDeleteBtnText;
  }

  // Close modal handlers
  closeBtn.addEventListener('click', () => {
    deleteModal.style.display = 'none';
    resetDeleteModal();
  });

  cancelBtn.addEventListener('click', () => {
    deleteModal.style.display = 'none';
    resetDeleteModal();
  });

  // Click outside modal to close
  deleteModal.addEventListener('click', function(e) {
    if (e.target === deleteModal) {
      deleteModal.style.display = 'none';
      resetDeleteModal();
    }
  });

  // Store original button text
  const originalDeleteBtnText = confirmDeleteBtn.innerHTML;

  // Confirm delete
  confirmDeleteBtn.addEventListener('click', async function() {
    if (!habitToDelete) return;

    // Disable button during request
    this.disabled = true;
    this.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Deleting...';

    try {
      const response = await fetch(`/user/habits/delete/${habitToDelete}`, {
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
        // Store the ID before resetting
        const deletedHabitId = habitToDelete;
        
        // Success - remove row from table with animation
        deleteModal.style.display = 'none';
        
        // Reset button state immediately for next use
        this.disabled = false;
        this.innerHTML = originalDeleteBtnText;
        habitToDelete = null;
        
        const row = document.querySelector(`tr[data-habit-id="${deletedHabitId}"]`);
        if (row) {
          row.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
          row.style.opacity = '0';
          row.style.transform = 'translateX(-20px)';
          
          setTimeout(() => {
            row.remove();
            updateActiveHabitsCount();
            
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #10b981; color: white; padding: 1rem 1.5rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); z-index: 9999; animation: slideIn 0.3s ease;';
            successMsg.innerHTML = '<i class="fa-solid fa-check-circle"></i> ' + (data.message || 'Habit deleted successfully!');
            document.body.appendChild(successMsg);
            
            setTimeout(() => {
              successMsg.remove();
            }, 3000);
            
            // Refresh notifications if function exists
            if (typeof window.refreshNotifications === 'function') {
              window.refreshNotifications();
            }
          }, 300);
        } else {
          // Fallback to reload if row not found
          window.location.reload();
        }
      } else {
        alert(data.message || 'Failed to delete habit');
        this.disabled = false;
        this.innerHTML = originalDeleteBtnText;
        habitToDelete = null;
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while deleting the habit. Please try again.');
      this.disabled = false;
      this.innerHTML = originalDeleteBtnText;
      habitToDelete = null;
    }
  });

  // Mark as done handlers - only attach to buttons that are not already completed
  const doneButtons = document.querySelectorAll('.btn-done:not(.btn-completed)');
  doneButtons.forEach(button => {
    button.addEventListener('click', async function() {
      // Prevent double-clicking
      if (this.disabled || this.classList.contains('btn-completed')) {
        return;
      }
      
      const habitId = this.dataset.habitId;
      const originalText = this.innerHTML;
      const originalClasses = this.className;
      
      // Disable button during request
      this.disabled = true;
      this.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';

      try {
        const response = await fetch(`/user/habits/${habitId}/mark-done`, {
          method: 'POST',
          headers: {
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          }
        });

        const data = await response.json();

        if (data.success) {
          // Change button to "Completed" state
          this.innerHTML = '<i class="fa-solid fa-check-circle"></i> Completed';
          this.classList.remove('btn-done');
          this.classList.add('btn-completed');
          this.disabled = true;
          this.style.backgroundColor = '#10b981';
          this.style.color = 'white';
          this.style.cursor = 'default';
          
          // Update streak in the table row
          const row = this.closest('tr');
          const streakCell = row.querySelector('.streak');
          if (streakCell && data.streak !== undefined) {
            streakCell.innerHTML = (data.streak > 0 ? '🔥 ' : '❄️ ') + data.streak;
          }
          
          // Update current streak stat card
          updateCurrentStreak();
          
          // Show success message with streak
          const successMsg = document.createElement('div');
          successMsg.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #10b981; color: white; padding: 1rem 1.5rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); z-index: 9999; animation: slideIn 0.3s ease;';
          successMsg.innerHTML = '<i class="fa-solid fa-check-circle"></i> ' + data.message;
          document.body.appendChild(successMsg);
          
          setTimeout(() => {
            successMsg.remove();
          }, 3000);
          
          // Refresh notifications if function exists
          if (typeof window.refreshNotifications === 'function') {
            window.refreshNotifications();
          }
        } else {
          // Handle "already completed" or other errors
          if (data.message && data.message.includes('already')) {
            // If already completed, change button to completed state
            this.innerHTML = '<i class="fa-solid fa-check-circle"></i> Completed';
            this.classList.remove('btn-done');
            this.classList.add('btn-completed');
            this.disabled = true;
            this.style.backgroundColor = '#10b981';
            this.style.color = 'white';
            this.style.cursor = 'default';
          } else {
            alert(data.message || 'Failed to mark habit as done');
            this.innerHTML = originalText;
            this.className = originalClasses;
            this.disabled = false;
          }
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while marking the habit as done. Please try again.');
        this.innerHTML = originalText;
        this.className = originalClasses;
        this.disabled = false;
      }
    });
  });
  
  // Function to update active habits count
  function updateActiveHabitsCount() {
    const habitRows = document.querySelectorAll('tbody tr[data-habit-id]');
    const activeHabitsCount = habitRows.length;
    const statValue = document.querySelector('.stat-value');
    if (statValue && statValue.closest('.stat-card').querySelector('.stat-label').textContent.trim() === 'Active Habits') {
      statValue.textContent = activeHabitsCount;
    }
  }
  
  // Function to update current streak stat
  function updateCurrentStreak() {
    const streakCells = document.querySelectorAll('.streak');
    let maxStreak = 0;
    
    streakCells.forEach(cell => {
      const streakText = cell.textContent.trim();
      const streakMatch = streakText.match(/(\d+)/);
      if (streakMatch) {
        const streak = parseInt(streakMatch[1]);
        if (streak > maxStreak) {
          maxStreak = streak;
        }
      }
    });
    
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
      const label = card.querySelector('.stat-label');
      if (label && label.textContent.trim() === 'Current Streak') {
        const statValue = card.querySelector('.stat-value');
        if (statValue) {
          statValue.textContent = maxStreak + ' ' + (maxStreak === 1 ? 'day' : 'days');
        }
      }
    });
  }
});