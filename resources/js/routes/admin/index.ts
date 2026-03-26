import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
import dashboard074181 from './dashboard'
import userManagement18eeb0 from './user-management'
import habitManagement7aea7c from './habit-management'
import habits from './habits'
import noteManagement0aeb36 from './note-management'
import settings69f00b from './settings'
import notifications1ce82a from './notifications'
/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/admin/signin'
 */
export const signin = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: signin.url(options),
    method: 'get',
})

signin.definition = {
    methods: ["get","head"],
    url: '/admin/signin',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/admin/signin'
 */
signin.url = (options?: RouteQueryOptions) => {
    return signin.definition.url + queryParams(options)
}

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/admin/signin'
 */
signin.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: signin.url(options),
    method: 'get',
})
/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/admin/signin'
 */
signin.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: signin.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\AdminDashboardController::dashboard
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:16
 * @route '/admin/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/admin/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AdminDashboardController::dashboard
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:16
 * @route '/admin/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminDashboardController::dashboard
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:16
 * @route '/admin/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AdminDashboardController::dashboard
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:16
 * @route '/admin/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\User\UserController::userManagement
 * @see app/Http/Controllers/User/UserController.php:15
 * @route '/admin/user-management'
 */
export const userManagement = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: userManagement.url(options),
    method: 'get',
})

userManagement.definition = {
    methods: ["get","head"],
    url: '/admin/user-management',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\User\UserController::userManagement
 * @see app/Http/Controllers/User/UserController.php:15
 * @route '/admin/user-management'
 */
userManagement.url = (options?: RouteQueryOptions) => {
    return userManagement.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\User\UserController::userManagement
 * @see app/Http/Controllers/User/UserController.php:15
 * @route '/admin/user-management'
 */
userManagement.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: userManagement.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\User\UserController::userManagement
 * @see app/Http/Controllers/User/UserController.php:15
 * @route '/admin/user-management'
 */
userManagement.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: userManagement.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Habit\HabitCategoryController::habitManagement
 * @see app/Http/Controllers/Habit/HabitCategoryController.php:13
 * @route '/admin/habit-management'
 */
export const habitManagement = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: habitManagement.url(options),
    method: 'get',
})

habitManagement.definition = {
    methods: ["get","head"],
    url: '/admin/habit-management',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Habit\HabitCategoryController::habitManagement
 * @see app/Http/Controllers/Habit/HabitCategoryController.php:13
 * @route '/admin/habit-management'
 */
habitManagement.url = (options?: RouteQueryOptions) => {
    return habitManagement.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Habit\HabitCategoryController::habitManagement
 * @see app/Http/Controllers/Habit/HabitCategoryController.php:13
 * @route '/admin/habit-management'
 */
habitManagement.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: habitManagement.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Habit\HabitCategoryController::habitManagement
 * @see app/Http/Controllers/Habit/HabitCategoryController.php:13
 * @route '/admin/habit-management'
 */
habitManagement.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: habitManagement.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Notes\NoteController::noteManagement
 * @see app/Http/Controllers/Notes/NoteController.php:14
 * @route '/admin/note-management'
 */
export const noteManagement = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: noteManagement.url(options),
    method: 'get',
})

noteManagement.definition = {
    methods: ["get","head"],
    url: '/admin/note-management',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Notes\NoteController::noteManagement
 * @see app/Http/Controllers/Notes/NoteController.php:14
 * @route '/admin/note-management'
 */
noteManagement.url = (options?: RouteQueryOptions) => {
    return noteManagement.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Notes\NoteController::noteManagement
 * @see app/Http/Controllers/Notes/NoteController.php:14
 * @route '/admin/note-management'
 */
noteManagement.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: noteManagement.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Notes\NoteController::noteManagement
 * @see app/Http/Controllers/Notes/NoteController.php:14
 * @route '/admin/note-management'
 */
noteManagement.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: noteManagement.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\AdminSettingsController::settings
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:18
 * @route '/admin/settings'
 */
export const settings = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: settings.url(options),
    method: 'get',
})

settings.definition = {
    methods: ["get","head"],
    url: '/admin/settings',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AdminSettingsController::settings
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:18
 * @route '/admin/settings'
 */
settings.url = (options?: RouteQueryOptions) => {
    return settings.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminSettingsController::settings
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:18
 * @route '/admin/settings'
 */
settings.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: settings.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AdminSettingsController::settings
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:18
 * @route '/admin/settings'
 */
settings.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: settings.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\AdminNotificationController::notifications
 * @see app/Http/Controllers/Admin/AdminNotificationController.php:21
 * @route '/admin/notifications'
 */
export const notifications = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: notifications.url(options),
    method: 'get',
})

notifications.definition = {
    methods: ["get","head"],
    url: '/admin/notifications',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AdminNotificationController::notifications
 * @see app/Http/Controllers/Admin/AdminNotificationController.php:21
 * @route '/admin/notifications'
 */
notifications.url = (options?: RouteQueryOptions) => {
    return notifications.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminNotificationController::notifications
 * @see app/Http/Controllers/Admin/AdminNotificationController.php:21
 * @route '/admin/notifications'
 */
notifications.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: notifications.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AdminNotificationController::notifications
 * @see app/Http/Controllers/Admin/AdminNotificationController.php:21
 * @route '/admin/notifications'
 */
notifications.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: notifications.url(options),
    method: 'head',
})
const admin = {
    signin: Object.assign(signin, signin),
dashboard: Object.assign(dashboard, dashboard074181),
userManagement: Object.assign(userManagement, userManagement18eeb0),
habitManagement: Object.assign(habitManagement, habitManagement7aea7c),
habits: Object.assign(habits, habits),
noteManagement: Object.assign(noteManagement, noteManagement0aeb36),
settings: Object.assign(settings, settings69f00b),
notifications: Object.assign(notifications, notifications1ce82a),
}

export default admin