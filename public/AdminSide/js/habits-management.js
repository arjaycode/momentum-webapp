document.addEventListener('DOMContentLoaded', function() {
  const habitSearch = document.getElementById('habitSearch');
  const categoryFilter = document.getElementById('categoryFilter');
  const userFilter = document.getElementById('userFilter');
  const habitsTableBody = document.getElementById('habitsTableBody');
  const rows = habitsTableBody ? Array.from(habitsTableBody.querySelectorAll('tr')) : [];

  function filterHabits() {
    const searchTerm = habitSearch ? habitSearch.value.toLowerCase().trim() : '';
    const categoryId = categoryFilter ? categoryFilter.value : '';
    const userId = userFilter ? userFilter.value : '';

    rows.forEach(row => {
      const habitName = row.querySelector('.habit-name-cell strong')?.textContent.toLowerCase() || '';
      const habitDescription = row.querySelector('.habit-description')?.textContent.toLowerCase() || '';
      const rowCategoryId = row.getAttribute('data-category-id') || '';
      const rowUserId = row.getAttribute('data-user-id') || '';

      const matchesSearch = !searchTerm || 
        habitName.includes(searchTerm) || 
        habitDescription.includes(searchTerm);

      const matchesCategory = !categoryId || rowCategoryId === categoryId;
      const matchesUser = !userId || rowUserId === userId;

      if (matchesSearch && matchesCategory && matchesUser) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  }

  if (habitSearch) {
    habitSearch.addEventListener('input', filterHabits);
  }

  if (categoryFilter) {
    categoryFilter.addEventListener('change', filterHabits);
  }

  if (userFilter) {
    userFilter.addEventListener('change', filterHabits);
  }
});



