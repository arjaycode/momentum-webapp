// Search functionality
const searchInput = document.getElementById('userSearch');
const tableRows = document.querySelectorAll('.user-table tbody tr');

searchInput.addEventListener('input', function () {
  const searchTerm = this.value.toLowerCase();

  tableRows.forEach((row) => {
    const userName =
      row.querySelector('.user-name')?.textContent.toLowerCase() || '';
    const userEmail =
      row.querySelector('td:nth-child(3)')?.textContent.toLowerCase() || '';

    if (userName.includes(searchTerm) || userEmail.includes(searchTerm)) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });

  updateTableInfo();
});

// Filter functionality
const roleFilter = document.getElementById('roleFilter');
const statusFilter = document.getElementById('statusFilter');

function filterTable() {
  const roleValue = roleFilter.value.toLowerCase();
  const statusValue = statusFilter.value.toLowerCase();
  const searchTerm = searchInput.value.toLowerCase();

  tableRows.forEach((row) => {
    const userName =
      row.querySelector('.user-name')?.textContent.toLowerCase() || '';
    const userEmail =
      row.querySelector('td:nth-child(3)')?.textContent.toLowerCase() || '';
    const role =
      row.querySelector('.role-badge')?.textContent.toLowerCase() || '';
    const status =
      row.querySelector('.status-badge')?.textContent.toLowerCase() || '';

    const matchesSearch =
      userName.includes(searchTerm) || userEmail.includes(searchTerm);
    const matchesRole = !roleValue || role.includes(roleValue);
    const matchesStatus = !statusValue || status.includes(statusValue);

    if (matchesSearch && matchesRole && matchesStatus) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });

  updateTableInfo();
}

roleFilter.addEventListener('change', filterTable);
statusFilter.addEventListener('change', filterTable);

// Action buttons
document.querySelectorAll('.btn-edit').forEach((btn) => {
  btn.addEventListener('click', function () {
    const row = this.closest('tr');
    const userName = row.querySelector('.user-name').textContent;
    // alert(`Edit user: ${userName}`);
    window.location.href = 'edit-user.html';
  });
});

// document.querySelectorAll('.btn-delete').forEach((btn) => {
//   btn.addEventListener('click', function () {
//     const row = this.closest('tr');
//     const userName = row.querySelector('.user-name').textContent;

//     if (confirm(`Are you sure you want to delete ${userName}?`)) {
//       row.style.opacity = '0';
//       row.style.transform = 'translateX(-20px)';

//       setTimeout(() => {
//         row.remove();
//         updateTableInfo();
//       }, 300);
//     }
//   });
// });

// Modal variables
const deleteModal = document.getElementById('deleteModal');
const deleteModalOverlay = document.getElementById('deleteModalOverlay');
const deleteModalCancel = document.getElementById('deleteModalCancel');
const deleteModalConfirm = document.getElementById('deleteModalConfirm');
let currentRowToDelete = null;

// Open Delete Modal
function openDeleteModal(userData) {
  document.getElementById('deleteUserName').textContent = userData.name;
  document.getElementById('deleteUserId').textContent = userData.id;
  document.getElementById('deleteUserEmail').textContent = userData.email;
  document.getElementById('deleteUserAvatar').src = userData.avatar;
  currentRowToDelete = userData.row;

  deleteModal.classList.add('active');
  deleteModalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Close Delete Modal
function closeDeleteModal() {
  deleteModal.classList.add('closing');
  setTimeout(() => {
    deleteModal.classList.remove('active', 'closing');
    deleteModalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    currentRowToDelete = null;
  }, 200);
}

// Cancel button
deleteModalCancel.addEventListener('click', closeDeleteModal);
deleteModalOverlay.addEventListener('click', closeDeleteModal);

// Confirm delete
deleteModalConfirm.addEventListener('click', function () {
  if (currentRowToDelete) {
    currentRowToDelete.style.opacity = '0';
    currentRowToDelete.style.transform = 'translateX(-20px)';
    setTimeout(() => {
      currentRowToDelete.remove();
      updateTableInfo();
      closeDeleteModal();
    }, 300);
  }
});

// Close on Escape
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && deleteModal.classList.contains('active')) {
    closeDeleteModal();
  }
});

// Delete button handler
document.querySelectorAll('.btn-delete').forEach((btn) => {
  btn.addEventListener('click', function () {
    const row = this.closest('tr');
    const userName = row.querySelector('.user-name').textContent;
    const userId = row.querySelector('.user-id')?.textContent || 'ID: #001';
    const userEmail = row.cells[2]?.textContent || 'email@example.com';
    const userAvatar =
      row.querySelector('.user-avatar')?.src ||
      'https://i.pravatar.cc/48?img=1';

    openDeleteModal({
      name: userName,
      id: userId,
      email: userEmail,
      avatar: userAvatar,
      row: row,
    });
  });
});

// document.querySelectorAll('.btn-ban').forEach((btn) => {
//   btn.addEventListener('click', function () {
//     const row = this.closest('tr');
//     const userName = row.querySelector('.user-name').textContent;
//     const statusBadge = row.querySelector('.status-badge');

//     if (confirm(`Are you sure you want to ban ${userName}?`)) {
//       statusBadge.textContent = 'Blocked';
//       statusBadge.className = 'status-badge blocked';
//       alert(`${userName} has been banned.`);
//     }
//   });
// });

// Ban Modal variables
const banModal = document.getElementById('banModal');
const banModalOverlay = document.getElementById('banModalOverlay');
const banModalCancel = document.getElementById('banModalCancel');
const banModalConfirm = document.getElementById('banModalConfirm');
const banReasonTextarea = document.getElementById('banReason');
const banReasonError = document.getElementById('banReasonError');
let currentRowToBan = null;
let currentUserName = null;

// Open Ban Modal
function openBanModal(userData) {
  document.getElementById('banUserName').textContent = userData.name;
  document.getElementById('banUserId').textContent = userData.id;
  document.getElementById('banUserEmail').textContent = userData.email;
  document.getElementById('banUserAvatar').src = userData.avatar;
  currentRowToBan = userData.row;
  currentUserName = userData.name;

  banReasonTextarea.value = '';
  banReasonTextarea.classList.remove('error');
  banReasonError.classList.remove('show');

  banModal.classList.add('active');
  banModalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  setTimeout(() => banReasonTextarea.focus(), 100);
}

// Close Ban Modal
function closeBanModal() {
  banModal.classList.add('closing');
  setTimeout(() => {
    banModal.classList.remove('active', 'closing');
    banModalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    currentRowToBan = null;
    currentUserName = null;
  }, 200);
}

// Validate reason
function validateReason() {
  const reason = banReasonTextarea.value.trim();
  if (!reason) {
    banReasonTextarea.classList.add('error');
    banReasonError.classList.add('show');
    return false;
  }
  banReasonTextarea.classList.remove('error');
  banReasonError.classList.remove('show');
  return true;
}

// Cancel button
banModalCancel.addEventListener('click', closeBanModal);
banModalOverlay.addEventListener('click', closeBanModal);

// Clear error on input
banReasonTextarea.addEventListener('input', function () {
  if (this.value.trim()) {
    this.classList.remove('error');
    banReasonError.classList.remove('show');
  }
});

// Confirm ban
banModalConfirm.addEventListener('click', function () {
  if (!validateReason()) {
    return;
  }

  if (currentRowToBan) {
    const statusBadge = currentRowToBan.querySelector('.status-badge');
    const reason = banReasonTextarea.value.trim();

    statusBadge.textContent = 'Blocked';
    statusBadge.className = 'status-badge blocked';

    console.log('Ban reason:', reason);
    alert(`${currentUserName} has been banned.`);
    closeBanModal();
  }
});

// Close on Escape
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && banModal.classList.contains('active')) {
    closeBanModal();
  }
});

// Ban button handler
document.querySelectorAll('.btn-ban').forEach((btn) => {
  btn.addEventListener('click', function () {
    const row = this.closest('tr');
    const userName = row.querySelector('.user-name').textContent;
    const userId = row.querySelector('.user-id')?.textContent || 'ID: #001';
    const userEmail = row.cells[2]?.textContent || 'email@example.com';
    const userAvatar =
      row.querySelector('.user-avatar')?.src ||
      'https://i.pravatar.cc/48?img=1';

    openBanModal({
      name: userName,
      id: userId,
      email: userEmail,
      avatar: userAvatar,
      row: row,
    });
  });
});

// Add New User button
document.querySelector('.btn-primary').addEventListener('click', function () {
  window.location.href = 'create-user.html';
});

// Pagination
const paginationBtns = document.querySelectorAll(
  '.pagination-btn:not([disabled])'
);

paginationBtns.forEach((btn) => {
  btn.addEventListener('click', function () {
    if (this.textContent === 'Previous' || this.textContent === 'Next') {
      return;
    }

    paginationBtns.forEach((b) => b.classList.remove('active'));
    this.classList.add('active');

    // Simulate page change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

// Update table info
function updateTableInfo() {
  const visibleRows = Array.from(tableRows).filter(
    (row) => row.style.display !== 'none'
  );
  const totalRows = 2847; // Total from design
  const showing = visibleRows.length;

  document.querySelector(
    '.table-info'
  ).textContent = `Showing 1 to ${showing} of ${totalRows} results`;
}

// Row hover effect enhancement
tableRows.forEach((row) => {
  row.addEventListener('mouseenter', function () {
    this.style.transform = 'scale(1.001)';
  });

  row.addEventListener('mouseleave', function () {
    this.style.transform = 'scale(1)';
  });
});

// Animation on load
window.addEventListener('load', function () {
  const cards = document.querySelectorAll('.stat-card');

  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';

    setTimeout(() => {
      card.style.transition = 'all 0.5s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 100);
  });

  // Animate table
  const tableCard = document.querySelector('.table-card');
  tableCard.style.opacity = '0';
  tableCard.style.transform = 'translateY(20px)';

  setTimeout(() => {
    tableCard.style.transition = 'all 0.5s ease';
    tableCard.style.opacity = '1';
    tableCard.style.transform = 'translateY(0)';
  }, 400);
});
