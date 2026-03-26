import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Api\HabitApiController::index
 * @see app/Http/Controllers/Api/HabitApiController.php:18
 * @route '/api/habits'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/habits',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\HabitApiController::index
 * @see app/Http/Controllers/Api/HabitApiController.php:18
 * @route '/api/habits'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\HabitApiController::index
 * @see app/Http/Controllers/Api/HabitApiController.php:18
 * @route '/api/habits'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\HabitApiController::index
 * @see app/Http/Controllers/Api/HabitApiController.php:18
 * @route '/api/habits'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\HabitApiController::show
 * @see app/Http/Controllers/Api/HabitApiController.php:46
 * @route '/api/habits/{id}'
 */
export const show = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/habits/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\HabitApiController::show
 * @see app/Http/Controllers/Api/HabitApiController.php:46
 * @route '/api/habits/{id}'
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
* @see \App\Http\Controllers\Api\HabitApiController::show
 * @see app/Http/Controllers/Api/HabitApiController.php:46
 * @route '/api/habits/{id}'
 */
show.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\HabitApiController::show
 * @see app/Http/Controllers/Api/HabitApiController.php:46
 * @route '/api/habits/{id}'
 */
show.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\HabitApiController::store
 * @see app/Http/Controllers/Api/HabitApiController.php:68
 * @route '/api/habits'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/habits',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\HabitApiController::store
 * @see app/Http/Controllers/Api/HabitApiController.php:68
 * @route '/api/habits'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\HabitApiController::store
 * @see app/Http/Controllers/Api/HabitApiController.php:68
 * @route '/api/habits'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\HabitApiController::update
 * @see app/Http/Controllers/Api/HabitApiController.php:118
 * @route '/api/habits/{id}'
 */
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/habits/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Api\HabitApiController::update
 * @see app/Http/Controllers/Api/HabitApiController.php:118
 * @route '/api/habits/{id}'
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
* @see \App\Http\Controllers\Api\HabitApiController::update
 * @see app/Http/Controllers/Api/HabitApiController.php:118
 * @route '/api/habits/{id}'
 */
update.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Api\HabitApiController::destroy
 * @see app/Http/Controllers/Api/HabitApiController.php:170
 * @route '/api/habits/{id}'
 */
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/habits/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Api\HabitApiController::destroy
 * @see app/Http/Controllers/Api/HabitApiController.php:170
 * @route '/api/habits/{id}'
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
* @see \App\Http\Controllers\Api\HabitApiController::destroy
 * @see app/Http/Controllers/Api/HabitApiController.php:170
 * @route '/api/habits/{id}'
 */
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Api\HabitApiController::markDone
 * @see app/Http/Controllers/Api/HabitApiController.php:189
 * @route '/api/habits/{id}/mark-done'
 */
export const markDone = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markDone.url(args, options),
    method: 'post',
})

markDone.definition = {
    methods: ["post"],
    url: '/api/habits/{id}/mark-done',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\HabitApiController::markDone
 * @see app/Http/Controllers/Api/HabitApiController.php:189
 * @route '/api/habits/{id}/mark-done'
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
* @see \App\Http\Controllers\Api\HabitApiController::markDone
 * @see app/Http/Controllers/Api/HabitApiController.php:189
 * @route '/api/habits/{id}/mark-done'
 */
markDone.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markDone.url(args, options),
    method: 'post',
})
const habits = {
    index: Object.assign(index, index),
show: Object.assign(show, show),
store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
markDone: Object.assign(markDone, markDone),
}

export default habits