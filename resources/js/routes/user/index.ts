import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import signup7ed930 from './signup'
import signin5a08c0 from './signin'
import habits8117d6 from './habits'
import notifications1ce82a from './notifications'
import profile from './profile'
/**
* @see \App\Http\Controllers\Auth\SignupController::signup
 * @see app/Http/Controllers/Auth/SignupController.php:12
 * @route '/signup'
 */
export const signup = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: signup.url(options),
    method: 'get',
})

signup.definition = {
    methods: ["get","head"],
    url: '/signup',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\SignupController::signup
 * @see app/Http/Controllers/Auth/SignupController.php:12
 * @route '/signup'
 */
signup.url = (options?: RouteQueryOptions) => {
    return signup.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\SignupController::signup
 * @see app/Http/Controllers/Auth/SignupController.php:12
 * @route '/signup'
 */
signup.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: signup.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Auth\SignupController::signup
 * @see app/Http/Controllers/Auth/SignupController.php:12
 * @route '/signup'
 */
signup.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: signup.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Auth\SignupController::signup
 * @see app/Http/Controllers/Auth/SignupController.php:12
 * @route '/signup'
 */
    const signupForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: signup.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Auth\SignupController::signup
 * @see app/Http/Controllers/Auth/SignupController.php:12
 * @route '/signup'
 */
        signupForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: signup.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Auth\SignupController::signup
 * @see app/Http/Controllers/Auth/SignupController.php:12
 * @route '/signup'
 */
        signupForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: signup.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    signup.form = signupForm
/**
* @see \App\Http\Controllers\Auth\LoginController::signin
 * @see app/Http/Controllers/Auth/LoginController.php:12
 * @route '/signin'
 */
export const signin = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: signin.url(options),
    method: 'get',
})

signin.definition = {
    methods: ["get","head"],
    url: '/signin',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\LoginController::signin
 * @see app/Http/Controllers/Auth/LoginController.php:12
 * @route '/signin'
 */
signin.url = (options?: RouteQueryOptions) => {
    return signin.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\LoginController::signin
 * @see app/Http/Controllers/Auth/LoginController.php:12
 * @route '/signin'
 */
signin.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: signin.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Auth\LoginController::signin
 * @see app/Http/Controllers/Auth/LoginController.php:12
 * @route '/signin'
 */
signin.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: signin.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Auth\LoginController::signin
 * @see app/Http/Controllers/Auth/LoginController.php:12
 * @route '/signin'
 */
    const signinForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: signin.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Auth\LoginController::signin
 * @see app/Http/Controllers/Auth/LoginController.php:12
 * @route '/signin'
 */
        signinForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: signin.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Auth\LoginController::signin
 * @see app/Http/Controllers/Auth/LoginController.php:12
 * @route '/signin'
 */
        signinForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: signin.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    signin.form = signinForm
/**
* @see \App\Http\Controllers\User\DashboardController::dashboard
 * @see app/Http/Controllers/User/DashboardController.php:16
 * @route '/user/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/user/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\User\DashboardController::dashboard
 * @see app/Http/Controllers/User/DashboardController.php:16
 * @route '/user/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\User\DashboardController::dashboard
 * @see app/Http/Controllers/User/DashboardController.php:16
 * @route '/user/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\User\DashboardController::dashboard
 * @see app/Http/Controllers/User/DashboardController.php:16
 * @route '/user/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\User\DashboardController::dashboard
 * @see app/Http/Controllers/User/DashboardController.php:16
 * @route '/user/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\User\DashboardController::dashboard
 * @see app/Http/Controllers/User/DashboardController.php:16
 * @route '/user/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\User\DashboardController::dashboard
 * @see app/Http/Controllers/User/DashboardController.php:16
 * @route '/user/dashboard'
 */
        dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dashboard.form = dashboardForm
/**
* @see \App\Http\Controllers\User\DashboardController::todayHabits
 * @see app/Http/Controllers/User/DashboardController.php:176
 * @route '/user/today-habits'
 */
export const todayHabits = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: todayHabits.url(options),
    method: 'get',
})

todayHabits.definition = {
    methods: ["get","head"],
    url: '/user/today-habits',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\User\DashboardController::todayHabits
 * @see app/Http/Controllers/User/DashboardController.php:176
 * @route '/user/today-habits'
 */
todayHabits.url = (options?: RouteQueryOptions) => {
    return todayHabits.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\User\DashboardController::todayHabits
 * @see app/Http/Controllers/User/DashboardController.php:176
 * @route '/user/today-habits'
 */
todayHabits.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: todayHabits.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\User\DashboardController::todayHabits
 * @see app/Http/Controllers/User/DashboardController.php:176
 * @route '/user/today-habits'
 */
todayHabits.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: todayHabits.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\User\DashboardController::todayHabits
 * @see app/Http/Controllers/User/DashboardController.php:176
 * @route '/user/today-habits'
 */
    const todayHabitsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: todayHabits.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\User\DashboardController::todayHabits
 * @see app/Http/Controllers/User/DashboardController.php:176
 * @route '/user/today-habits'
 */
        todayHabitsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: todayHabits.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\User\DashboardController::todayHabits
 * @see app/Http/Controllers/User/DashboardController.php:176
 * @route '/user/today-habits'
 */
        todayHabitsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: todayHabits.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    todayHabits.form = todayHabitsForm
/**
* @see \App\Http\Controllers\User\HabitController::habits
 * @see app/Http/Controllers/User/HabitController.php:18
 * @route '/user/habits'
 */
export const habits = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: habits.url(options),
    method: 'get',
})

habits.definition = {
    methods: ["get","head"],
    url: '/user/habits',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\User\HabitController::habits
 * @see app/Http/Controllers/User/HabitController.php:18
 * @route '/user/habits'
 */
habits.url = (options?: RouteQueryOptions) => {
    return habits.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\User\HabitController::habits
 * @see app/Http/Controllers/User/HabitController.php:18
 * @route '/user/habits'
 */
habits.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: habits.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\User\HabitController::habits
 * @see app/Http/Controllers/User/HabitController.php:18
 * @route '/user/habits'
 */
habits.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: habits.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\User\HabitController::habits
 * @see app/Http/Controllers/User/HabitController.php:18
 * @route '/user/habits'
 */
    const habitsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: habits.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\User\HabitController::habits
 * @see app/Http/Controllers/User/HabitController.php:18
 * @route '/user/habits'
 */
        habitsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: habits.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\User\HabitController::habits
 * @see app/Http/Controllers/User/HabitController.php:18
 * @route '/user/habits'
 */
        habitsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: habits.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    habits.form = habitsForm
/**
* @see \App\Http\Controllers\User\NotificationController::notifications
 * @see app/Http/Controllers/User/NotificationController.php:13
 * @route '/user/notifications'
 */
export const notifications = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: notifications.url(options),
    method: 'get',
})

notifications.definition = {
    methods: ["get","head"],
    url: '/user/notifications',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\User\NotificationController::notifications
 * @see app/Http/Controllers/User/NotificationController.php:13
 * @route '/user/notifications'
 */
notifications.url = (options?: RouteQueryOptions) => {
    return notifications.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\User\NotificationController::notifications
 * @see app/Http/Controllers/User/NotificationController.php:13
 * @route '/user/notifications'
 */
notifications.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: notifications.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\User\NotificationController::notifications
 * @see app/Http/Controllers/User/NotificationController.php:13
 * @route '/user/notifications'
 */
notifications.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: notifications.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\User\NotificationController::notifications
 * @see app/Http/Controllers/User/NotificationController.php:13
 * @route '/user/notifications'
 */
    const notificationsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: notifications.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\User\NotificationController::notifications
 * @see app/Http/Controllers/User/NotificationController.php:13
 * @route '/user/notifications'
 */
        notificationsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: notifications.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\User\NotificationController::notifications
 * @see app/Http/Controllers/User/NotificationController.php:13
 * @route '/user/notifications'
 */
        notificationsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: notifications.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    notifications.form = notificationsForm
/**
* @see \App\Http\Controllers\User\CalendarController::calendar
 * @see app/Http/Controllers/User/CalendarController.php:12
 * @route '/user/calendar'
 */
export const calendar = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: calendar.url(options),
    method: 'get',
})

calendar.definition = {
    methods: ["get","head"],
    url: '/user/calendar',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\User\CalendarController::calendar
 * @see app/Http/Controllers/User/CalendarController.php:12
 * @route '/user/calendar'
 */
calendar.url = (options?: RouteQueryOptions) => {
    return calendar.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\User\CalendarController::calendar
 * @see app/Http/Controllers/User/CalendarController.php:12
 * @route '/user/calendar'
 */
calendar.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: calendar.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\User\CalendarController::calendar
 * @see app/Http/Controllers/User/CalendarController.php:12
 * @route '/user/calendar'
 */
calendar.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: calendar.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\User\CalendarController::calendar
 * @see app/Http/Controllers/User/CalendarController.php:12
 * @route '/user/calendar'
 */
    const calendarForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: calendar.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\User\CalendarController::calendar
 * @see app/Http/Controllers/User/CalendarController.php:12
 * @route '/user/calendar'
 */
        calendarForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: calendar.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\User\CalendarController::calendar
 * @see app/Http/Controllers/User/CalendarController.php:12
 * @route '/user/calendar'
 */
        calendarForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: calendar.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    calendar.form = calendarForm
/**
* @see \App\Http\Controllers\User\ProfileController::settings
 * @see app/Http/Controllers/User/ProfileController.php:18
 * @route '/user/settings'
 */
export const settings = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: settings.url(options),
    method: 'get',
})

settings.definition = {
    methods: ["get","head"],
    url: '/user/settings',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\User\ProfileController::settings
 * @see app/Http/Controllers/User/ProfileController.php:18
 * @route '/user/settings'
 */
settings.url = (options?: RouteQueryOptions) => {
    return settings.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\User\ProfileController::settings
 * @see app/Http/Controllers/User/ProfileController.php:18
 * @route '/user/settings'
 */
settings.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: settings.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\User\ProfileController::settings
 * @see app/Http/Controllers/User/ProfileController.php:18
 * @route '/user/settings'
 */
settings.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: settings.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\User\ProfileController::settings
 * @see app/Http/Controllers/User/ProfileController.php:18
 * @route '/user/settings'
 */
    const settingsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: settings.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\User\ProfileController::settings
 * @see app/Http/Controllers/User/ProfileController.php:18
 * @route '/user/settings'
 */
        settingsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: settings.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\User\ProfileController::settings
 * @see app/Http/Controllers/User/ProfileController.php:18
 * @route '/user/settings'
 */
        settingsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: settings.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    settings.form = settingsForm
const user = {
    signup: Object.assign(signup, signup7ed930),
signin: Object.assign(signin, signin5a08c0),
dashboard: Object.assign(dashboard, dashboard),
todayHabits: Object.assign(todayHabits, todayHabits),
habits: Object.assign(habits, habits8117d6),
notifications: Object.assign(notifications, notifications1ce82a),
calendar: Object.assign(calendar, calendar),
settings: Object.assign(settings, settings),
profile: Object.assign(profile, profile),
}

export default user