import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\User\HabitController::index
 * @see app/Http/Controllers/User/HabitController.php:17
 * @route '/user/habits'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/user/habits',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\User\HabitController::index
 * @see app/Http/Controllers/User/HabitController.php:17
 * @route '/user/habits'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\User\HabitController::index
 * @see app/Http/Controllers/User/HabitController.php:17
 * @route '/user/habits'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\User\HabitController::index
 * @see app/Http/Controllers/User/HabitController.php:17
 * @route '/user/habits'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\User\HabitController::create
 * @see app/Http/Controllers/User/HabitController.php:47
 * @route '/user/habits/add'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/user/habits/add',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\User\HabitController::create
 * @see app/Http/Controllers/User/HabitController.php:47
 * @route '/user/habits/add'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\User\HabitController::create
 * @see app/Http/Controllers/User/HabitController.php:47
 * @route '/user/habits/add'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\User\HabitController::create
 * @see app/Http/Controllers/User/HabitController.php:47
 * @route '/user/habits/add'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\User\HabitController::store
 * @see app/Http/Controllers/User/HabitController.php:57
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
 * @see app/Http/Controllers/User/HabitController.php:57
 * @route '/user/habits/add'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\User\HabitController::store
 * @see app/Http/Controllers/User/HabitController.php:57
 * @route '/user/habits/add'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\User\HabitController::getCalendarData
 * @see app/Http/Controllers/User/HabitController.php:348
 * @route '/user/habits/calendar-data'
 */
export const getCalendarData = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getCalendarData.url(options),
    method: 'get',
})

getCalendarData.definition = {
    methods: ["get","head"],
    url: '/user/habits/calendar-data',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\User\HabitController::getCalendarData
 * @see app/Http/Controllers/User/HabitController.php:348
 * @route '/user/habits/calendar-data'
 */
getCalendarData.url = (options?: RouteQueryOptions) => {
    return getCalendarData.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\User\HabitController::getCalendarData
 * @see app/Http/Controllers/User/HabitController.php:348
 * @route '/user/habits/calendar-data'
 */
getCalendarData.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getCalendarData.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\User\HabitController::getCalendarData
 * @see app/Http/Controllers/User/HabitController.php:348
 * @route '/user/habits/calendar-data'
 */
getCalendarData.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getCalendarData.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\User\HabitController::search
 * @see app/Http/Controllers/User/HabitController.php:313
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
 * @see app/Http/Controllers/User/HabitController.php:313
 * @route '/user/habits/search'
 */
search.url = (options?: RouteQueryOptions) => {
    return search.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\User\HabitController::search
 * @see app/Http/Controllers/User/HabitController.php:313
 * @route '/user/habits/search'
 */
search.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\User\HabitController::search
 * @see app/Http/Controllers/User/HabitController.php:313
 * @route '/user/habits/search'
 */
search.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: search.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\User\HabitController::edit
 * @see app/Http/Controllers/User/HabitController.php:156
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
 * @see app/Http/Controllers/User/HabitController.php:156
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
 * @see app/Http/Controllers/User/HabitController.php:156
 * @route '/user/habits/edit/{id}'
 */
edit.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\User\HabitController::edit
 * @see app/Http/Controllers/User/HabitController.php:156
 * @route '/user/habits/edit/{id}'
 */
edit.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\User\HabitController::update
 * @see app/Http/Controllers/User/HabitController.php:177
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
 * @see app/Http/Controllers/User/HabitController.php:177
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
 * @see app/Http/Controllers/User/HabitController.php:177
 * @route '/user/habits/edit/{id}'
 */
update.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\User\HabitController::show
 * @see app/Http/Controllers/User/HabitController.php:131
 * @route '/user/habits/view/{id}'
 */
export const show = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/user/habits/view/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\User\HabitController::show
 * @see app/Http/Controllers/User/HabitController.php:131
 * @route '/user/habits/view/{id}'
 */
show.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\User\HabitController::show
 * @see app/Http/Controllers/User/HabitController.php:131
 * @route '/user/habits/view/{id}'
 */
show.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\User\HabitController::show
 * @see app/Http/Controllers/User/HabitController.php:131
 * @route '/user/habits/view/{id}'
 */
show.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\User\HabitController::destroy
 * @see app/Http/Controllers/User/HabitController.php:231
 * @route '/user/habits/delete/{id}'
 */
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/user/habits/delete/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\User\HabitController::destroy
 * @see app/Http/Controllers/User/HabitController.php:231
 * @route '/user/habits/delete/{id}'
 */
destroy.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\User\HabitController::destroy
 * @see app/Http/Controllers/User/HabitController.php:231
 * @route '/user/habits/delete/{id}'
 */
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\User\HabitController::markAsDone
 * @see app/Http/Controllers/User/HabitController.php:268
 * @route '/user/habits/{id}/mark-done'
 */
export const markAsDone = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markAsDone.url(args, options),
    method: 'post',
})

markAsDone.definition = {
    methods: ["post"],
    url: '/user/habits/{id}/mark-done',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\User\HabitController::markAsDone
 * @see app/Http/Controllers/User/HabitController.php:268
 * @route '/user/habits/{id}/mark-done'
 */
markAsDone.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return markAsDone.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\User\HabitController::markAsDone
 * @see app/Http/Controllers/User/HabitController.php:268
 * @route '/user/habits/{id}/mark-done'
 */
markAsDone.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markAsDone.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\User\HabitController::storeNote
 * @see app/Http/Controllers/User/HabitController.php:448
 * @route '/user/habits/{id}/notes'
 */
export const storeNote = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeNote.url(args, options),
    method: 'post',
})

storeNote.definition = {
    methods: ["post"],
    url: '/user/habits/{id}/notes',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\User\HabitController::storeNote
 * @see app/Http/Controllers/User/HabitController.php:448
 * @route '/user/habits/{id}/notes'
 */
storeNote.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return storeNote.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\User\HabitController::storeNote
 * @see app/Http/Controllers/User/HabitController.php:448
 * @route '/user/habits/{id}/notes'
 */
storeNote.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeNote.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\User\HabitController::deleteNote
 * @see app/Http/Controllers/User/HabitController.php:476
 * @route '/user/habits/{habitId}/notes/{noteId}'
 */
export const deleteNote = (args: { habitId: string | number, noteId: string | number } | [habitId: string | number, noteId: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteNote.url(args, options),
    method: 'delete',
})

deleteNote.definition = {
    methods: ["delete"],
    url: '/user/habits/{habitId}/notes/{noteId}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\User\HabitController::deleteNote
 * @see app/Http/Controllers/User/HabitController.php:476
 * @route '/user/habits/{habitId}/notes/{noteId}'
 */
deleteNote.url = (args: { habitId: string | number, noteId: string | number } | [habitId: string | number, noteId: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    habitId: args[0],
                    noteId: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        habitId: args.habitId,
                                noteId: args.noteId,
                }

    return deleteNote.definition.url
            .replace('{habitId}', parsedArgs.habitId.toString())
            .replace('{noteId}', parsedArgs.noteId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\User\HabitController::deleteNote
 * @see app/Http/Controllers/User/HabitController.php:476
 * @route '/user/habits/{habitId}/notes/{noteId}'
 */
deleteNote.delete = (args: { habitId: string | number, noteId: string | number } | [habitId: string | number, noteId: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteNote.url(args, options),
    method: 'delete',
})
const HabitController = { index, create, store, getCalendarData, search, edit, update, show, destroy, markAsDone, storeNote, deleteNote }

export default HabitController