import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\User\NotificationController::index
 * @see app/Http/Controllers/User/NotificationController.php:13
 * @route '/user/notifications'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/user/notifications',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\User\NotificationController::index
 * @see app/Http/Controllers/User/NotificationController.php:13
 * @route '/user/notifications'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\User\NotificationController::index
 * @see app/Http/Controllers/User/NotificationController.php:13
 * @route '/user/notifications'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\User\NotificationController::index
 * @see app/Http/Controllers/User/NotificationController.php:13
 * @route '/user/notifications'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\User\NotificationController::clear
 * @see app/Http/Controllers/User/NotificationController.php:48
 * @route '/user/notifications/clear'
 */
export const clear = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: clear.url(options),
    method: 'post',
})

clear.definition = {
    methods: ["post"],
    url: '/user/notifications/clear',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\User\NotificationController::clear
 * @see app/Http/Controllers/User/NotificationController.php:48
 * @route '/user/notifications/clear'
 */
clear.url = (options?: RouteQueryOptions) => {
    return clear.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\User\NotificationController::clear
 * @see app/Http/Controllers/User/NotificationController.php:48
 * @route '/user/notifications/clear'
 */
clear.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: clear.url(options),
    method: 'post',
})
const NotificationController = { index, clear }

export default NotificationController