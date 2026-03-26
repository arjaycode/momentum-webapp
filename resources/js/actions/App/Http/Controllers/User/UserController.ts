import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\User\UserController::index
 * @see app/Http/Controllers/User/UserController.php:15
 * @route '/admin/user-management'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/user-management',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\User\UserController::index
 * @see app/Http/Controllers/User/UserController.php:15
 * @route '/admin/user-management'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\User\UserController::index
 * @see app/Http/Controllers/User/UserController.php:15
 * @route '/admin/user-management'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\User\UserController::index
 * @see app/Http/Controllers/User/UserController.php:15
 * @route '/admin/user-management'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\User\UserController::store
 * @see app/Http/Controllers/User/UserController.php:26
 * @route '/admin/user-management/create'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/user-management/create',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\User\UserController::store
 * @see app/Http/Controllers/User/UserController.php:26
 * @route '/admin/user-management/create'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\User\UserController::store
 * @see app/Http/Controllers/User/UserController.php:26
 * @route '/admin/user-management/create'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\User\UserController::edit
 * @see app/Http/Controllers/User/UserController.php:42
 * @route '/admin/user-management/edit/{id}'
 */
export const edit = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/user-management/edit/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\User\UserController::edit
 * @see app/Http/Controllers/User/UserController.php:42
 * @route '/admin/user-management/edit/{id}'
 */
edit.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return edit.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\User\UserController::edit
 * @see app/Http/Controllers/User/UserController.php:42
 * @route '/admin/user-management/edit/{id}'
 */
edit.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\User\UserController::edit
 * @see app/Http/Controllers/User/UserController.php:42
 * @route '/admin/user-management/edit/{id}'
 */
edit.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\User\UserController::update
 * @see app/Http/Controllers/User/UserController.php:48
 * @route '/admin/user-management/edit/{id}'
 */
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/user-management/edit/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\User\UserController::update
 * @see app/Http/Controllers/User/UserController.php:48
 * @route '/admin/user-management/edit/{id}'
 */
update.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\User\UserController::update
 * @see app/Http/Controllers/User/UserController.php:48
 * @route '/admin/user-management/edit/{id}'
 */
update.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\User\UserController::deleteMethod
 * @see app/Http/Controllers/User/UserController.php:69
 * @route '/admin/user-management/delete/{id}'
 */
export const deleteMethod = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(args, options),
    method: 'delete',
})

deleteMethod.definition = {
    methods: ["delete"],
    url: '/admin/user-management/delete/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\User\UserController::deleteMethod
 * @see app/Http/Controllers/User/UserController.php:69
 * @route '/admin/user-management/delete/{id}'
 */
deleteMethod.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return deleteMethod.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\User\UserController::deleteMethod
 * @see app/Http/Controllers/User/UserController.php:69
 * @route '/admin/user-management/delete/{id}'
 */
deleteMethod.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\User\UserController::update_status
 * @see app/Http/Controllers/User/UserController.php:85
 * @route '/admin/user-management/{id}/update-status'
 */
export const update_status = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update_status.url(args, options),
    method: 'patch',
})

update_status.definition = {
    methods: ["patch"],
    url: '/admin/user-management/{id}/update-status',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\User\UserController::update_status
 * @see app/Http/Controllers/User/UserController.php:85
 * @route '/admin/user-management/{id}/update-status'
 */
update_status.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return update_status.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\User\UserController::update_status
 * @see app/Http/Controllers/User/UserController.php:85
 * @route '/admin/user-management/{id}/update-status'
 */
update_status.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update_status.url(args, options),
    method: 'patch',
})
const UserController = { index, store, edit, update, deleteMethod, update_status, delete: deleteMethod }

export default UserController