import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\User\UserController::submit
 * @see app/Http/Controllers/User/UserController.php:48
 * @route '/admin/user-management/edit/{id}'
 */
export const submit = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: submit.url(args, options),
    method: 'put',
})

submit.definition = {
    methods: ["put"],
    url: '/admin/user-management/edit/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\User\UserController::submit
 * @see app/Http/Controllers/User/UserController.php:48
 * @route '/admin/user-management/edit/{id}'
 */
submit.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return submit.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\User\UserController::submit
 * @see app/Http/Controllers/User/UserController.php:48
 * @route '/admin/user-management/edit/{id}'
 */
submit.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: submit.url(args, options),
    method: 'put',
})
const edit = {
    submit: Object.assign(submit, submit),
}

export default edit