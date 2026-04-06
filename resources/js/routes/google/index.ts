import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import auth694fe2 from './auth'
/**
* @see \App\Http\Controllers\GoogleController::auth
 * @see app/Http/Controllers/GoogleController.php:14
 * @route '/auth/google'
 */
export const auth = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: auth.url(options),
    method: 'get',
})

auth.definition = {
    methods: ["get","head"],
    url: '/auth/google',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\GoogleController::auth
 * @see app/Http/Controllers/GoogleController.php:14
 * @route '/auth/google'
 */
auth.url = (options?: RouteQueryOptions) => {
    return auth.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\GoogleController::auth
 * @see app/Http/Controllers/GoogleController.php:14
 * @route '/auth/google'
 */
auth.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: auth.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\GoogleController::auth
 * @see app/Http/Controllers/GoogleController.php:14
 * @route '/auth/google'
 */
auth.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: auth.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\GoogleController::auth
 * @see app/Http/Controllers/GoogleController.php:14
 * @route '/auth/google'
 */
    const authForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: auth.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\GoogleController::auth
 * @see app/Http/Controllers/GoogleController.php:14
 * @route '/auth/google'
 */
        authForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: auth.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\GoogleController::auth
 * @see app/Http/Controllers/GoogleController.php:14
 * @route '/auth/google'
 */
        authForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: auth.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    auth.form = authForm
const google = {
    auth: Object.assign(auth, auth694fe2),
}

export default google