import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
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
const notifications = {
    clear: Object.assign(clear, clear),
}

export default notifications