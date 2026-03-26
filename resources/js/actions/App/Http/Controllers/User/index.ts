import UserController from './UserController'
import DashboardController from './DashboardController'
import HabitController from './HabitController'
import NotificationController from './NotificationController'
import ProfileController from './ProfileController'
const User = {
    UserController: Object.assign(UserController, UserController),
DashboardController: Object.assign(DashboardController, DashboardController),
HabitController: Object.assign(HabitController, HabitController),
NotificationController: Object.assign(NotificationController, NotificationController),
ProfileController: Object.assign(ProfileController, ProfileController),
}

export default User