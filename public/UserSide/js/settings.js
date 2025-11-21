// Data for search function
const searchItems = [
  {
    title: 'Two-Factor Authentication',
    category: 'Privacy Settings',
    screen: 'privacy-screen',
  },
  {
    title: 'Session Management',
    category: 'Privacy Settings',
    screen: 'privacy-screen',
  },
  {
    title: 'Dark Mode',
    category: 'Profile Preferences',
    screen: 'profile-screen',
  },
  {
    title: 'Start of Week',
    category: 'Profile Preferences',
    screen: 'profile-screen',
  },
  {
    title: 'Change Password',
    category: 'Profile Preferences',
    screen: 'profile-screen',
  },
  {
    title: 'Push Notifications',
    category: 'Notification Settings',
    screen: 'notifications-screen',
  },
  {
    title: 'Daily Reminders',
    category: 'Notification Settings',
    screen: 'notifications-screen',
  },
  {
    title: 'Streak Celebrations',
    category: 'Notification Settings',
    screen: 'notifications-screen',
  },
  {
    title: 'Global Reminder Time',
    category: 'Notification Timing',
    screen: 'notifications-screen',
  },
  {
    title: 'Quiet Hours',
    category: 'Notification Timing',
    screen: 'notifications-screen',
  },
  { title: 'Export Data', category: 'Danger Zone', screen: 'profile-screen' },
  {
    title: 'Delete Account',
    category: 'Danger Zone',
    screen: 'profile-screen',
  },
  {
    title: 'First Name',
    category: 'Profile Information',
    screen: 'profile-screen',
  },
  { title: 'Email', category: 'Profile Information', screen: 'profile-screen' },
];

function showScreen(screenId, tabElement) {
  document.querySelectorAll('.screen').forEach((screen) => {
    screen.classList.remove('active');
  });
  document.getElementById(screenId).classList.add('active');

  // Update tab active state based on the clicked tab's parent screen
  const activeTabContainer = document
    .querySelector(`#${screenId}`)
    .querySelector('.tabs');
  if (activeTabContainer) {
    activeTabContainer.querySelectorAll('.tab').forEach((tab) => {
      tab.classList.remove('active');
    });
    if (tabElement) {
      tabElement.classList.add('active');
    }
  }
}

function toggleSwitch(element) {
  element.classList.toggle('active');
}

function changePassword() {
  alert('Password changed successfully!');
  showScreen(
    'profile-screen',
    document.querySelector(".tabs .tab[data-screen='profile-screen']")
  );
}
