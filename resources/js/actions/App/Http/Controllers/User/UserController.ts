import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\User\UserController::index
 * @see app/Http/Controllers/User/UserController.php:16
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
 * @see app/Http/Controllers/User/UserController.php:16
 * @route '/admin/user-management'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\User\UserController::index
 * @see app/Http/Controllers/User/UserController.php:16
 * @route '/admin/user-management'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\User\UserController::index
 * @see app/Http/Controllers/User/UserController.php:16
 * @route '/admin/user-management'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\User\UserController::index
 * @see app/Http/Controllers/User/UserController.php:16
 * @route '/admin/user-management'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\User\UserController::index
 * @see app/Http/Controllers/User/UserController.php:16
 * @route '/admin/user-management'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\User\UserController::index
 * @see app/Http/Controllers/User/UserController.php:16
 * @route '/admin/user-management'
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
* @see \App\Http\Controllers\User\UserController::create
 * @see app/Http/Controllers/User/UserController.php:33
 * @route '/admin/user-management/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/user-management/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\User\UserController::create
 * @see app/Http/Controllers/User/UserController.php:33
 * @route '/admin/user-management/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\User\UserController::create
 * @see app/Http/Controllers/User/UserController.php:33
 * @route '/admin/user-management/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\User\UserController::create
 * @see app/Http/Controllers/User/UserController.php:33
 * @route '/admin/user-management/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\User\UserController::create
 * @see app/Http/Controllers/User/UserController.php:33
 * @route '/admin/user-management/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\User\UserController::create
 * @see app/Http/Controllers/User/UserController.php:33
 * @route '/admin/user-management/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\User\UserController::create
 * @see app/Http/Controllers/User/UserController.php:33
 * @route '/admin/user-management/create'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\User\UserController::store
 * @see app/Http/Controllers/User/UserController.php:38
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
 * @see app/Http/Controllers/User/UserController.php:38
 * @route '/admin/user-management/create'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\User\UserController::store
 * @see app/Http/Controllers/User/UserController.php:38
 * @route '/admin/user-management/create'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\User\UserController::store
 * @see app/Http/Controllers/User/UserController.php:38
 * @route '/admin/user-management/create'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\User\UserController::store
 * @see app/Http/Controllers/User/UserController.php:38
 * @route '/admin/user-management/create'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\User\UserController::edit
 * @see app/Http/Controllers/User/UserController.php:54
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
 * @see app/Http/Controllers/User/UserController.php:54
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
 * @see app/Http/Controllers/User/UserController.php:54
 * @route '/admin/user-management/edit/{id}'
 */
edit.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\User\UserController::edit
 * @see app/Http/Controllers/User/UserController.php:54
 * @route '/admin/user-management/edit/{id}'
 */
edit.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\User\UserController::edit
 * @see app/Http/Controllers/User/UserController.php:54
 * @route '/admin/user-management/edit/{id}'
 */
    const editForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\User\UserController::edit
 * @see app/Http/Controllers/User/UserController.php:54
 * @route '/admin/user-management/edit/{id}'
 */
        editForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\User\UserController::edit
 * @see app/Http/Controllers/User/UserController.php:54
 * @route '/admin/user-management/edit/{id}'
 */
        editForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Http\Controllers\User\UserController::update
 * @see app/Http/Controllers/User/UserController.php:63
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
 * @see app/Http/Controllers/User/UserController.php:63
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
 * @see app/Http/Controllers/User/UserController.php:63
 * @route '/admin/user-management/edit/{id}'
 */
update.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\User\UserController::update
 * @see app/Http/Controllers/User/UserController.php:63
 * @route '/admin/user-management/edit/{id}'
 */
    const updateForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\User\UserController::update
 * @see app/Http/Controllers/User/UserController.php:63
 * @route '/admin/user-management/edit/{id}'
 */
        updateForm.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\User\UserController::deleteMethod
 * @see app/Http/Controllers/User/UserController.php:84
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
 * @see app/Http/Controllers/User/UserController.php:84
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
 * @see app/Http/Controllers/User/UserController.php:84
 * @route '/admin/user-management/delete/{id}'
 */
deleteMethod.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\User\UserController::deleteMethod
 * @see app/Http/Controllers/User/UserController.php:84
 * @route '/admin/user-management/delete/{id}'
 */
    const deleteMethodForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: deleteMethod.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\User\UserController::deleteMethod
 * @see app/Http/Controllers/User/UserController.php:84
 * @route '/admin/user-management/delete/{id}'
 */
        deleteMethodForm.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: deleteMethod.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    deleteMethod.form = deleteMethodForm
/**
* @see \App\Http\Controllers\User\UserController::update_status
 * @see app/Http/Controllers/User/UserController.php:100
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
 * @see app/Http/Controllers/User/UserController.php:100
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
 * @see app/Http/Controllers/User/UserController.php:100
 * @route '/admin/user-management/{id}/update-status'
 */
update_status.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update_status.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\User\UserController::update_status
 * @see app/Http/Controllers/User/UserController.php:100
 * @route '/admin/user-management/{id}/update-status'
 */
    const update_statusForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update_status.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\User\UserController::update_status
 * @see app/Http/Controllers/User/UserController.php:100
 * @route '/admin/user-management/{id}/update-status'
 */
        update_statusForm.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update_status.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update_status.form = update_statusForm
const UserController = { index, create, store, edit, update, deleteMethod, update_status, delete: deleteMethod }

export default UserController