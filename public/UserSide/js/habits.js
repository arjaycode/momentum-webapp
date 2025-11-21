// 1. DOM Elements
const modal = document.getElementById('deleteModal');
const closeSpan = document.querySelector('.close-btn');
const cancelBtn = document.getElementById('cancelBtn');
const confirmBtn = document.getElementById('confirmDeleteBtn');

// This variable will store the row we are about to delete
let rowToDelete = null;

// 2. Function to Open Modal
// We attach this to all existing .btn-delete buttons
document.querySelectorAll('.btn-delete').forEach((button) => {
  button.addEventListener('click', function (e) {
    // Find the closest table row (tr) to the button clicked
    rowToDelete = e.target.closest('tr');

    // Show the modal (using Flex to center it via CSS)
    modal.style.display = 'flex';
  });
});

// 3. Functions to Close Modal
function closeModal() {
  modal.style.display = 'none';
  rowToDelete = null; // Clear the stored row
}

// Close when clicking (X) or Cancel
closeSpan.onclick = closeModal;
cancelBtn.onclick = closeModal;

// Close when clicking outside the modal content
window.onclick = function (event) {
  if (event.target == modal) {
    closeModal();
  }
};

// 4. Logic for Confirming Delete
confirmBtn.onclick = function () {
  if (rowToDelete) {
    // Remove the row from the DOM
    rowToDelete.remove();

    // Close the modal
    closeModal();

    // Optional: Alert for feedback
    console.log('Habit deleted successfully.');
  }
};
