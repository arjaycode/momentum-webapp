import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Habit\HabitCategoryController::index
 * @see app/Http/Controllers/Habit/HabitCategoryController.php:13
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
 * @see app/Http/Controllers/Habit/HabitCategoryController.php:13
 * @route '/admin/habit-management'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Habit\HabitCategoryController::index
 * @see app/Http/Controllers/Habit/HabitCategoryController.php:13
 * @route '/admin/habit-management'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Habit\HabitCategoryController::index
 * @see app/Http/Controllers/Habit/HabitCategoryController.php:13
 * @route '/admin/habit-management'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Habit\HabitCategoryController::store
 * @see app/Http/Controllers/Habit/HabitCategoryController.php:20
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
 * @see app/Http/Controllers/Habit/HabitCategoryController.php:20
 * @route '/admin/habit-management/create'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Habit\HabitCategoryController::store
 * @see app/Http/Controllers/Habit/HabitCategoryController.php:20
 * @route '/admin/habit-management/create'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Habit\HabitCategoryController::edit
 * @see app/Http/Controllers/Habit/HabitCategoryController.php:42
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
 * @see app/Http/Controllers/Habit/HabitCategoryController.php:42
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
 * @see app/Http/Controllers/Habit/HabitCategoryController.php:42
 * @route '/admin/habit-management/edit/{id}'
 */
edit.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Habit\HabitCategoryController::edit
 * @see app/Http/Controllers/Habit/HabitCategoryController.php:42
 * @route '/admin/habit-management/edit/{id}'
 */
edit.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Habit\HabitCategoryController::update
 * @see app/Http/Controllers/Habit/HabitCategoryController.php:48
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
 * @see app/Http/Controllers/Habit/HabitCategoryController.php:48
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
 * @see app/Http/Controllers/Habit/HabitCategoryController.php:48
 * @route '/admin/habit-management/edit/{id}'
 */
update.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Habit\HabitCategoryController::deleteMethod
 * @see app/Http/Controllers/Habit/HabitCategoryController.php:71
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
 * @see app/Http/Controllers/Habit/HabitCategoryController.php:71
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
 * @see app/Http/Controllers/Habit/HabitCategoryController.php:71
 * @route '/admin/habit-management/delete/{id}'
 */
deleteMethod.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(args, options),
    method: 'delete',
})
const HabitCategoryController = { index, store, edit, update, deleteMethod, delete: deleteMethod }

export default HabitCategoryController