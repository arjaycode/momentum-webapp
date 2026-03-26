import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\User\DashboardController::index
 * @see app/Http/Controllers/User/DashboardController.php:15
 * @route '/user/dashboard'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/user/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\User\DashboardController::index
 * @see app/Http/Controllers/User/DashboardController.php:15
 * @route '/user/dashboard'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\User\DashboardController::index
 * @see app/Http/Controllers/User/DashboardController.php:15
 * @route '/user/dashboard'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\User\DashboardController::index
 * @see app/Http/Controllers/User/DashboardController.php:15
 * @route '/user/dashboard'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\User\DashboardController::getTodayHabits
 * @see app/Http/Controllers/User/DashboardController.php:175
 * @route '/user/today-habits'
 */
export const getTodayHabits = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getTodayHabits.url(options),
    method: 'get',
})

getTodayHabits.definition = {
    methods: ["get","head"],
    url: '/user/today-habits',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\User\DashboardController::getTodayHabits
 * @see app/Http/Controllers/User/DashboardController.php:175
 * @route '/user/today-habits'
 */
getTodayHabits.url = (options?: RouteQueryOptions) => {
    return getTodayHabits.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\User\DashboardController::getTodayHabits
 * @see app/Http/Controllers/User/DashboardController.php:175
 * @route '/user/today-habits'
 */
getTodayHabits.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getTodayHabits.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\User\DashboardController::getTodayHabits
 * @see app/Http/Controllers/User/DashboardController.php:175
 * @route '/user/today-habits'
 */
getTodayHabits.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getTodayHabits.url(options),
    method: 'head',
})
const DashboardController = { index, getTodayHabits }

export default DashboardController