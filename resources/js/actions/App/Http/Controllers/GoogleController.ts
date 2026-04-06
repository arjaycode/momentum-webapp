import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\GoogleController::google_auth
 * @see app/Http/Controllers/GoogleController.php:14
 * @route '/auth/google'
 */
export const google_auth = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: google_auth.url(options),
    method: 'get',
})

google_auth.definition = {
    methods: ["get","head"],
    url: '/auth/google',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\GoogleController::google_auth
 * @see app/Http/Controllers/GoogleController.php:14
 * @route '/auth/google'
 */
google_auth.url = (options?: RouteQueryOptions) => {
    return google_auth.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\GoogleController::google_auth
 * @see app/Http/Controllers/GoogleController.php:14
 * @route '/auth/google'
 */
google_auth.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: google_auth.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\GoogleController::google_auth
 * @see app/Http/Controllers/GoogleController.php:14
 * @route '/auth/google'
 */
google_auth.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: google_auth.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\GoogleController::google_auth
 * @see app/Http/Controllers/GoogleController.php:14
 * @route '/auth/google'
 */
    const google_authForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: google_auth.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\GoogleController::google_auth
 * @see app/Http/Controllers/GoogleController.php:14
 * @route '/auth/google'
 */
        google_authForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: google_auth.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\GoogleController::google_auth
 * @see app/Http/Controllers/GoogleController.php:14
 * @route '/auth/google'
 */
        google_authForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: google_auth.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    google_auth.form = google_authForm
/**
* @see \App\Http\Controllers\GoogleController::google_callback
 * @see app/Http/Controllers/GoogleController.php:19
 * @route '/auth/google/callback'
 */
export const google_callback = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: google_callback.url(options),
    method: 'get',
})

google_callback.definition = {
    methods: ["get","head"],
    url: '/auth/google/callback',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\GoogleController::google_callback
 * @see app/Http/Controllers/GoogleController.php:19
 * @route '/auth/google/callback'
 */
google_callback.url = (options?: RouteQueryOptions) => {
    return google_callback.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\GoogleController::google_callback
 * @see app/Http/Controllers/GoogleController.php:19
 * @route '/auth/google/callback'
 */
google_callback.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: google_callback.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\GoogleController::google_callback
 * @see app/Http/Controllers/GoogleController.php:19
 * @route '/auth/google/callback'
 */
google_callback.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: google_callback.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\GoogleController::google_callback
 * @see app/Http/Controllers/GoogleController.php:19
 * @route '/auth/google/callback'
 */
    const google_callbackForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: google_callback.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\GoogleController::google_callback
 * @see app/Http/Controllers/GoogleController.php:19
 * @route '/auth/google/callback'
 */
        google_callbackForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: google_callback.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\GoogleController::google_callback
 * @see app/Http/Controllers/GoogleController.php:19
 * @route '/auth/google/callback'
 */
        google_callbackForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: google_callback.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    google_callback.form = google_callbackForm
const GoogleController = { google_auth, google_callback }

export default GoogleController