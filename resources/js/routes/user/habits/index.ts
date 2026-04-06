import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
import notes from './notes'
/**
* @see \App\Http\Controllers\User\HabitController::add
 * @see app/Http/Controllers/User/HabitController.php:48
 * @route '/user/habits/add'
 */
export const add = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: add.url(options),
    method: 'get',
})

add.definition = {
    methods: ["get","head"],
    url: '/user/habits/add',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\User\HabitController::add
 * @see app/Http/Controllers/User/HabitController.php:48
 * @route '/user/habits/add'
 */
add.url = (options?: RouteQueryOptions) => {
    return add.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\User\HabitController::add
 * @see app/Http/Controllers/User/HabitController.php:48
 * @route '/user/habits/add'
 */
add.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: add.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\User\HabitController::add
 * @see app/Http/Controllers/User/HabitController.php:48
 * @route '/user/habits/add'
 */
add.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: add.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\User\HabitController::add
 * @see app/Http/Controllers/User/HabitController.php:48
 * @route '/user/habits/add'
 */
    const addForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: add.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\User\HabitController::add
 * @see app/Http/Controllers/User/HabitController.php:48
 * @route '/user/habits/add'
 */
        addForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: add.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\User\HabitController::add
 * @see app/Http/Controllers/User/HabitController.php:48
 * @route '/user/habits/add'
 */
        addForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: add.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    add.form = addForm
/**
* @see \App\Http\Controllers\User\HabitController::store
 * @see app/Http/Controllers/User/HabitController.php:58
 * @route '/user/habits/add'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/user/habits/add',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\User\HabitController::store
 * @see app/Http/Controllers/User/HabitController.php:58
 * @route '/user/habits/add'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\User\HabitController::store
 * @see app/Http/Controllers/User/HabitController.php:58
 * @route '/user/habits/add'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\User\HabitController::store
 * @see app/Http/Controllers/User/HabitController.php:58
 * @route '/user/habits/add'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\User\HabitController::store
 * @see app/Http/Controllers/User/HabitController.php:58
 * @route '/user/habits/add'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\User\HabitController::calendarData
 * @see app/Http/Controllers/User/HabitController.php:339
 * @route '/user/habits/calendar-data'
 */
export const calendarData = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: calendarData.url(options),
    method: 'get',
})

calendarData.definition = {
    methods: ["get","head"],
    url: '/user/habits/calendar-data',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\User\HabitController::calendarData
 * @see app/Http/Controllers/User/HabitController.php:339
 * @route '/user/habits/calendar-data'
 */
calendarData.url = (options?: RouteQueryOptions) => {
    return calendarData.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\User\HabitController::calendarData
 * @see app/Http/Controllers/User/HabitController.php:339
 * @route '/user/habits/calendar-data'
 */
calendarData.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: calendarData.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\User\HabitController::calendarData
 * @see app/Http/Controllers/User/HabitController.php:339
 * @route '/user/habits/calendar-data'
 */
calendarData.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: calendarData.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\User\HabitController::calendarData
 * @see app/Http/Controllers/User/HabitController.php:339
 * @route '/user/habits/calendar-data'
 */
    const calendarDataForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: calendarData.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\User\HabitController::calendarData
 * @see app/Http/Controllers/User/HabitController.php:339
 * @route '/user/habits/calendar-data'
 */
        calendarDataForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: calendarData.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\User\HabitController::calendarData
 * @see app/Http/Controllers/User/HabitController.php:339
 * @route '/user/habits/calendar-data'
 */
        calendarDataForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: calendarData.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    calendarData.form = calendarDataForm
/**
* @see \App\Http\Controllers\User\HabitController::search
 * @see app/Http/Controllers/User/HabitController.php:304
 * @route '/user/habits/search'
 */
export const search = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})

search.definition = {
    methods: ["get","head"],
    url: '/user/habits/search',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\User\HabitController::search
 * @see app/Http/Controllers/User/HabitController.php:304
 * @route '/user/habits/search'
 */
search.url = (options?: RouteQueryOptions) => {
    return search.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\User\HabitController::search
 * @see app/Http/Controllers/User/HabitController.php:304
 * @route '/user/habits/search'
 */
search.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\User\HabitController::search
 * @see app/Http/Controllers/User/HabitController.php:304
 * @route '/user/habits/search'
 */
search.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: search.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\User\HabitController::search
 * @see app/Http/Controllers/User/HabitController.php:304
 * @route '/user/habits/search'
 */
    const searchForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: search.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\User\HabitController::search
 * @see app/Http/Controllers/User/HabitController.php:304
 * @route '/user/habits/search'
 */
        searchForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: search.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\User\HabitController::search
 * @see app/Http/Controllers/User/HabitController.php:304
 * @route '/user/habits/search'
 */
        searchForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: search.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    search.form = searchForm
/**
* @see \App\Http\Controllers\User\HabitController::edit
 * @see app/Http/Controllers/User/HabitController.php:157
 * @route '/user/habits/edit/{id}'
 */
export const edit = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/user/habits/edit/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\User\HabitController::edit
 * @see app/Http/Controllers/User/HabitController.php:157
 * @route '/user/habits/edit/{id}'
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
* @see \App\Http\Controllers\User\HabitController::edit
 * @see app/Http/Controllers/User/HabitController.php:157
 * @route '/user/habits/edit/{id}'
 */
edit.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\User\HabitController::edit
 * @see app/Http/Controllers/User/HabitController.php:157
 * @route '/user/habits/edit/{id}'
 */
edit.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\User\HabitController::edit
 * @see app/Http/Controllers/User/HabitController.php:157
 * @route '/user/habits/edit/{id}'
 */
    const editForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\User\HabitController::edit
 * @see app/Http/Controllers/User/HabitController.php:157
 * @route '/user/habits/edit/{id}'
 */
        editForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\User\HabitController::edit
 * @see app/Http/Controllers/User/HabitController.php:157
 * @route '/user/habits/edit/{id}'
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
* @see \App\Http\Controllers\User\HabitController::update
 * @see app/Http/Controllers/User/HabitController.php:178
 * @route '/user/habits/edit/{id}'
 */
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/user/habits/edit/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\User\HabitController::update
 * @see app/Http/Controllers/User/HabitController.php:178
 * @route '/user/habits/edit/{id}'
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
* @see \App\Http\Controllers\User\HabitController::update
 * @see app/Http/Controllers/User/HabitController.php:178
 * @route '/user/habits/edit/{id}'
 */
update.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\User\HabitController::update
 * @see app/Http/Controllers/User/HabitController.php:178
 * @route '/user/habits/edit/{id}'
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
* @see \App\Http\Controllers\User\HabitController::update
 * @see app/Http/Controllers/User/HabitController.php:178
 * @route '/user/habits/edit/{id}'
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
* @see \App\Http\Controllers\User\HabitController::view
 * @see app/Http/Controllers/User/HabitController.php:132
 * @route '/user/habits/view/{id}'
 */
export const view = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: view.url(args, options),
    method: 'get',
})

view.definition = {
    methods: ["get","head"],
    url: '/user/habits/view/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\User\HabitController::view
 * @see app/Http/Controllers/User/HabitController.php:132
 * @route '/user/habits/view/{id}'
 */
view.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return view.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\User\HabitController::view
 * @see app/Http/Controllers/User/HabitController.php:132
 * @route '/user/habits/view/{id}'
 */
view.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: view.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\User\HabitController::view
 * @see app/Http/Controllers/User/HabitController.php:132
 * @route '/user/habits/view/{id}'
 */
view.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: view.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\User\HabitController::view
 * @see app/Http/Controllers/User/HabitController.php:132
 * @route '/user/habits/view/{id}'
 */
    const viewForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: view.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\User\HabitController::view
 * @see app/Http/Controllers/User/HabitController.php:132
 * @route '/user/habits/view/{id}'
 */
        viewForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: view.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\User\HabitController::view
 * @see app/Http/Controllers/User/HabitController.php:132
 * @route '/user/habits/view/{id}'
 */
        viewForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: view.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    view.form = viewForm
/**
* @see \App\Http\Controllers\User\HabitController::deleteMethod
 * @see app/Http/Controllers/User/HabitController.php:232
 * @route '/user/habits/delete/{id}'
 */
export const deleteMethod = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(args, options),
    method: 'delete',
})

deleteMethod.definition = {
    methods: ["delete"],
    url: '/user/habits/delete/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\User\HabitController::deleteMethod
 * @see app/Http/Controllers/User/HabitController.php:232
 * @route '/user/habits/delete/{id}'
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
* @see \App\Http\Controllers\User\HabitController::deleteMethod
 * @see app/Http/Controllers/User/HabitController.php:232
 * @route '/user/habits/delete/{id}'
 */
deleteMethod.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\User\HabitController::deleteMethod
 * @see app/Http/Controllers/User/HabitController.php:232
 * @route '/user/habits/delete/{id}'
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
* @see \App\Http\Controllers\User\HabitController::deleteMethod
 * @see app/Http/Controllers/User/HabitController.php:232
 * @route '/user/habits/delete/{id}'
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
* @see \App\Http\Controllers\User\HabitController::markDone
 * @see app/Http/Controllers/User/HabitController.php:259
 * @route '/user/habits/{id}/mark-done'
 */
export const markDone = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markDone.url(args, options),
    method: 'post',
})

markDone.definition = {
    methods: ["post"],
    url: '/user/habits/{id}/mark-done',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\User\HabitController::markDone
 * @see app/Http/Controllers/User/HabitController.php:259
 * @route '/user/habits/{id}/mark-done'
 */
markDone.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return markDone.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\User\HabitController::markDone
 * @see app/Http/Controllers/User/HabitController.php:259
 * @route '/user/habits/{id}/mark-done'
 */
markDone.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markDone.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\User\HabitController::markDone
 * @see app/Http/Controllers/User/HabitController.php:259
 * @route '/user/habits/{id}/mark-done'
 */
    const markDoneForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: markDone.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\User\HabitController::markDone
 * @see app/Http/Controllers/User/HabitController.php:259
 * @route '/user/habits/{id}/mark-done'
 */
        markDoneForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: markDone.url(args, options),
            method: 'post',
        })
    
    markDone.form = markDoneForm
const habits = {
    add: Object.assign(add, add),
store: Object.assign(store, store),
calendarData: Object.assign(calendarData, calendarData),
search: Object.assign(search, search),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
view: Object.assign(view, view),
delete: Object.assign(deleteMethod, deleteMethod),
markDone: Object.assign(markDone, markDone),
notes: Object.assign(notes, notes),
}

export default habits