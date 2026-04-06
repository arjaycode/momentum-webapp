import AdminDashboardController from './AdminDashboardController'
import AdminHabitController from './AdminHabitController'
import AdminSettingsController from './AdminSettingsController'
import AdminNotificationController from './AdminNotificationController'
const Admin = {
    AdminDashboardController: Object.assign(AdminDashboardController, AdminDashboardController),
AdminHabitController: Object.assign(AdminHabitController, AdminHabitController),
AdminSettingsController: Object.assign(AdminSettingsController, AdminSettingsController),
AdminNotificationController: Object.assign(AdminNotificationController, AdminNotificationController),
}

export default Admin