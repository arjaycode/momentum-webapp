document.addEventListener('DOMContentLoaded', function() {
  // Select all the checkboxes inside the day circles
  const checkboxes = document.querySelectorAll('.day-circle input[type="checkbox"]');

  function updateClasses(checkbox) {
    const parentLabel = checkbox.closest('.day-circle');

    if (checkbox.checked) {
      parentLabel.classList.remove('inactive');
      parentLabel.classList.add('active');
    } else {
      parentLabel.classList.add('inactive');
      parentLabel.classList.remove('active');
    }

    updateDaysCount();
  }

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      updateClasses(this);
    });

    // Initialize state
    if (checkbox.checked) {
      updateClasses(checkbox);
    }
  });

  function updateDaysCount() {
    const count = document.querySelectorAll('.day-circle input:checked').length;
    const daysInfo = document.querySelector('.days-info');
    if (daysInfo) {
      daysInfo.textContent = `${count} days per week`;
    }
  }

  // Form validation
  const form = document.querySelector('.habit-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      const checkedDays = document.querySelectorAll('.day-circle input:checked');
      if (checkedDays.length === 0) {
        e.preventDefault();
        alert('Please select at least one target day.');
        return false;
      }
    });
  }

  // Initialize days count
  updateDaysCount();
});







