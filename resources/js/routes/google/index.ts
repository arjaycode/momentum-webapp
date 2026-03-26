import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
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
const google = {
    auth: Object.assign(auth, auth694fe2),
}

export default google