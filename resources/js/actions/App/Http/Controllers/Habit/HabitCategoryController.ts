import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Habit\HabitCategoryController::index
 * @see app/Http/Controllers/Habit/HabitCategoryController.php:14
 * @route '/admin/habit-management'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/habit-management',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Habit\HabitCategoryController::index
 * @see app/Http/Controllers/Habit/HabitCategoryController.php:14
 * @route '/admin/habit-management'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Habit\HabitCategoryController::index
 * @see app/Http/Controllers/Habit/HabitCategoryController.php:14
 * @route '/admin/habit-management'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Habit\HabitCategoryController::index
 * @see app/Http/Controllers/Habit/HabitCategoryController.php:14
 * @route '/admin/habit-management'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Habit\HabitCategoryController::index
 * @see app/Http/Controllers/Habit/HabitCategoryController.php:14
 * @route '/admin/habit-management'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Habit\HabitCategoryController::index
 * @see app/Http/Controllers/Habit/HabitCategoryController.php:14
 * @route '/admin/habit-management'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Habit\HabitCategoryController::index
 * @see app/Http/Controllers/Habit/HabitCategoryController.php:14
 * @route '/admin/habit-management'
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
* @see \App\Http\Controllers\Habit\HabitCategoryController::store
 * @see app/Http/Controllers/Habit/HabitCategoryController.php:28
 * @route '/admin/habit-management/create'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/habit-management/create',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Habit\HabitCategoryController::store
 * @see app/Http/Controllers/Habit/HabitCategoryController.php:28
 * @route '/admin/habit-management/create'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Habit\HabitCategoryController::store
 * @see app/Http/Controllers/Habit/HabitCategoryController.php:28
 * @route '/admin/habit-management/create'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Habit\HabitCategoryController::store
 * @see app/Http/Controllers/Habit/HabitCategoryController.php:28
 * @route '/admin/habit-management/create'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Habit\HabitCategoryController::store
 * @see app/Http/Controllers/Habit/HabitCategoryController.php:28
 * @route '/admin/habit-management/create'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Habit\HabitCategoryController::edit
 * @see app/Http/Controllers/Habit/HabitCategoryController.php:50
 * @route '/admin/habit-management/edit/{id}'
 */
export const edit = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/habit-management/edit/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Habit\HabitCategoryController::edit
 * @see app/Http/Controllers/Habit/HabitCategoryController.php:50
 * @route '/admin/habit-management/edit/{id}'
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
* @see \App\Http\Controllers\Habit\HabitCategoryController::edit
 * @see app/Http/Controllers/Habit/HabitCategoryController.php:50
 * @route '/admin/habit-management/edit/{id}'
 */
edit.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Habit\HabitCategoryController::edit
 * @see app/Http/Controllers/Habit/HabitCategoryController.php:50
 * @route '/admin/habit-management/edit/{id}'
 */
edit.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Habit\HabitCategoryController::edit
 * @see app/Http/Controllers/Habit/HabitCategoryController.php:50
 * @route '/admin/habit-management/edit/{id}'
 */
    const editForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Habit\HabitCategoryController::edit
 * @see app/Http/Controllers/Habit/HabitCategoryController.php:50
 * @route '/admin/habit-management/edit/{id}'
 */
        editForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Habit\HabitCategoryController::edit
 * @see app/Http/Controllers/Habit/HabitCategoryController.php:50
 * @route '/admin/habit-management/edit/{id}'
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
* @see \App\Http\Controllers\Habit\HabitCategoryController::update
 * @see app/Http/Controllers/Habit/HabitCategoryController.php:59
 * @route '/admin/habit-management/edit/{id}'
 */
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/admin/habit-management/edit/{id}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Habit\HabitCategoryController::update
 * @see app/Http/Controllers/Habit/HabitCategoryController.php:59
 * @route '/admin/habit-management/edit/{id}'
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
* @see \App\Http\Controllers\Habit\HabitCategoryController::update
 * @see app/Http/Controllers/Habit/HabitCategoryController.php:59
 * @route '/admin/habit-management/edit/{id}'
 */
update.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Habit\HabitCategoryController::update
 * @see app/Http/Controllers/Habit/HabitCategoryController.php:59
 * @route '/admin/habit-management/edit/{id}'
 */
    const updateForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Habit\HabitCategoryController::update
 * @see app/Http/Controllers/Habit/HabitCategoryController.php:59
 * @route '/admin/habit-management/edit/{id}'
 */
        updateForm.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\Habit\HabitCategoryController::deleteMethod
 * @see app/Http/Controllers/Habit/HabitCategoryController.php:82
 * @route '/admin/habit-management/delete/{id}'
 */
export const deleteMethod = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(args, options),
    method: 'delete',
})

deleteMethod.definition = {
    methods: ["delete"],
    url: '/admin/habit-management/delete/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Habit\HabitCategoryController::deleteMethod
 * @see app/Http/Controllers/Habit/HabitCategoryController.php:82
 * @route '/admin/habit-management/delete/{id}'
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
* @see \App\Http\Controllers\Habit\HabitCategoryController::deleteMethod
 * @see app/Http/Controllers/Habit/HabitCategoryController.php:82
 * @route '/admin/habit-management/delete/{id}'
 */
deleteMethod.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Habit\HabitCategoryController::deleteMethod
 * @see app/Http/Controllers/Habit/HabitCategoryController.php:82
 * @route '/admin/habit-management/delete/{id}'
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
* @see \App\Http\Controllers\Habit\HabitCategoryController::deleteMethod
 * @see app/Http/Controllers/Habit/HabitCategoryController.php:82
 * @route '/admin/habit-management/delete/{id}'
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
const HabitCategoryController = { index, store, edit, update, deleteMethod, delete: deleteMethod }

export default HabitCategoryController