import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Auth\AdminAuthController::show
 * @see app/Http/Controllers/Auth/AdminAuthController.php:10
 * @route '/admin/signin'
 */
export const show = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/signin',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\AdminAuthController::show
 * @see app/Http/Controllers/Auth/AdminAuthController.php:10
 * @route '/admin/signin'
 */
show.url = (options?: RouteQueryOptions) => {
    return show.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\AdminAuthController::show
 * @see app/Http/Controllers/Auth/AdminAuthController.php:10
 * @route '/admin/signin'
 */
show.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Auth\AdminAuthController::show
 * @see app/Http/Controllers/Auth/AdminAuthController.php:10
 * @route '/admin/signin'
 */
show.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Auth\AdminAuthController::show
 * @see app/Http/Controllers/Auth/AdminAuthController.php:10
 * @route '/admin/signin'
 */
    const showForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Auth\AdminAuthController::show
 * @see app/Http/Controllers/Auth/AdminAuthController.php:10
 * @route '/admin/signin'
 */
        showForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Auth\AdminAuthController::show
 * @see app/Http/Controllers/Auth/AdminAuthController.php:10
 * @route '/admin/signin'
 */
        showForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
const AdminAuthController = { show }

export default AdminAuthController