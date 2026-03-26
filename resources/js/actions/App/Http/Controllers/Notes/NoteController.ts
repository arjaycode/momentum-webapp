import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Notes\NoteController::index
 * @see app/Http/Controllers/Notes/NoteController.php:14
 * @route '/admin/note-management'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/note-management',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Notes\NoteController::index
 * @see app/Http/Controllers/Notes/NoteController.php:14
 * @route '/admin/note-management'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Notes\NoteController::index
 * @see app/Http/Controllers/Notes/NoteController.php:14
 * @route '/admin/note-management'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Notes\NoteController::index
 * @see app/Http/Controllers/Notes/NoteController.php:14
 * @route '/admin/note-management'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Notes\NoteController::create
 * @see app/Http/Controllers/Notes/NoteController.php:23
 * @route '/admin/note-management/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/note-management/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Notes\NoteController::create
 * @see app/Http/Controllers/Notes/NoteController.php:23
 * @route '/admin/note-management/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Notes\NoteController::create
 * @see app/Http/Controllers/Notes/NoteController.php:23
 * @route '/admin/note-management/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Notes\NoteController::create
 * @see app/Http/Controllers/Notes/NoteController.php:23
 * @route '/admin/note-management/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Notes\NoteController::store
 * @see app/Http/Controllers/Notes/NoteController.php:31
 * @route '/admin/note-management'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/note-management',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Notes\NoteController::store
 * @see app/Http/Controllers/Notes/NoteController.php:31
 * @route '/admin/note-management'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Notes\NoteController::store
 * @see app/Http/Controllers/Notes/NoteController.php:31
 * @route '/admin/note-management'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Notes\NoteController::edit
 * @see app/Http/Controllers/Notes/NoteController.php:55
 * @route '/admin/note-management/edit/{id}'
 */
export const edit = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/note-management/edit/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Notes\NoteController::edit
 * @see app/Http/Controllers/Notes/NoteController.php:55
 * @route '/admin/note-management/edit/{id}'
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
* @see \App\Http\Controllers\Notes\NoteController::edit
 * @see app/Http/Controllers/Notes/NoteController.php:55
 * @route '/admin/note-management/edit/{id}'
 */
edit.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Notes\NoteController::edit
 * @see app/Http/Controllers/Notes/NoteController.php:55
 * @route '/admin/note-management/edit/{id}'
 */
edit.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Notes\NoteController::update
 * @see app/Http/Controllers/Notes/NoteController.php:64
 * @route '/admin/note-management/{id}'
 */
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/note-management/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Notes\NoteController::update
 * @see app/Http/Controllers/Notes/NoteController.php:64
 * @route '/admin/note-management/{id}'
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
* @see \App\Http\Controllers\Notes\NoteController::update
 * @see app/Http/Controllers/Notes/NoteController.php:64
 * @route '/admin/note-management/{id}'
 */
update.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Notes\NoteController::destroy
 * @see app/Http/Controllers/Notes/NoteController.php:90
 * @route '/admin/note-management/{id}'
 */
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/note-management/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Notes\NoteController::destroy
 * @see app/Http/Controllers/Notes/NoteController.php:90
 * @route '/admin/note-management/{id}'
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
* @see \App\Http\Controllers\Notes\NoteController::destroy
 * @see app/Http/Controllers/Notes/NoteController.php:90
 * @route '/admin/note-management/{id}'
 */
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})
const NoteController = { index, create, store, edit, update, destroy }

export default NoteController