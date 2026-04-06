import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\User\HabitController::store
 * @see app/Http/Controllers/User/HabitController.php:439
 * @route '/user/habits/{id}/notes'
 */
export const store = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/user/habits/{id}/notes',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\User\HabitController::store
 * @see app/Http/Controllers/User/HabitController.php:439
 * @route '/user/habits/{id}/notes'
 */
store.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return store.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\User\HabitController::store
 * @see app/Http/Controllers/User/HabitController.php:439
 * @route '/user/habits/{id}/notes'
 */
store.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\User\HabitController::store
 * @see app/Http/Controllers/User/HabitController.php:439
 * @route '/user/habits/{id}/notes'
 */
    const storeForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\User\HabitController::store
 * @see app/Http/Controllers/User/HabitController.php:439
 * @route '/user/habits/{id}/notes'
 */
        storeForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\User\HabitController::deleteMethod
 * @see app/Http/Controllers/User/HabitController.php:467
 * @route '/user/habits/{habitId}/notes/{noteId}'
 */
export const deleteMethod = (args: { habitId: string | number, noteId: string | number } | [habitId: string | number, noteId: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(args, options),
    method: 'delete',
})

deleteMethod.definition = {
    methods: ["delete"],
    url: '/user/habits/{habitId}/notes/{noteId}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\User\HabitController::deleteMethod
 * @see app/Http/Controllers/User/HabitController.php:467
 * @route '/user/habits/{habitId}/notes/{noteId}'
 */
deleteMethod.url = (args: { habitId: string | number, noteId: string | number } | [habitId: string | number, noteId: string | number ], options?: RouteQueryOptions) => {
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

    return deleteMethod.definition.url
            .replace('{habitId}', parsedArgs.habitId.toString())
            .replace('{noteId}', parsedArgs.noteId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\User\HabitController::deleteMethod
 * @see app/Http/Controllers/User/HabitController.php:467
 * @route '/user/habits/{habitId}/notes/{noteId}'
 */
deleteMethod.delete = (args: { habitId: string | number, noteId: string | number } | [habitId: string | number, noteId: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\User\HabitController::deleteMethod
 * @see app/Http/Controllers/User/HabitController.php:467
 * @route '/user/habits/{habitId}/notes/{noteId}'
 */
    const deleteMethodForm = (args: { habitId: string | number, noteId: string | number } | [habitId: string | number, noteId: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
 * @see app/Http/Controllers/User/HabitController.php:467
 * @route '/user/habits/{habitId}/notes/{noteId}'
 */
        deleteMethodForm.delete = (args: { habitId: string | number, noteId: string | number } | [habitId: string | number, noteId: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: deleteMethod.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    deleteMethod.form = deleteMethodForm
const notes = {
    store: Object.assign(store, store),
delete: Object.assign(deleteMethod, deleteMethod),
}

export default notes