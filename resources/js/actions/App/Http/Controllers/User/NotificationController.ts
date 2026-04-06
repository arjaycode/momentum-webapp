import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
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
* @see \App\Http\Controllers\User\NotificationController::index
 * @see app/Http/Controllers/User/NotificationController.php:13
 * @route '/user/notifications'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\User\NotificationController::index
 * @see app/Http/Controllers/User/NotificationController.php:13
 * @route '/user/notifications'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\User\NotificationController::index
 * @see app/Http/Controllers/User/NotificationController.php:13
 * @route '/user/notifications'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
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

    /**
* @see \App\Http\Controllers\User\NotificationController::clear
 * @see app/Http/Controllers/User/NotificationController.php:48
 * @route '/user/notifications/clear'
 */
    const clearForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: clear.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\User\NotificationController::clear
 * @see app/Http/Controllers/User/NotificationController.php:48
 * @route '/user/notifications/clear'
 */
        clearForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: clear.url(options),
            method: 'post',
        })
    
    clear.form = clearForm
const NotificationController = { index, clear }

export default NotificationController