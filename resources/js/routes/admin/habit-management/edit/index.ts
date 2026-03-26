import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Habit\HabitCategoryController::submit
 * @see app/Http/Controllers/Habit/HabitCategoryController.php:48
 * @route '/admin/habit-management/edit/{id}'
 */
export const submit = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: submit.url(args, options),
    method: 'patch',
})

submit.definition = {
    methods: ["patch"],
    url: '/admin/habit-management/edit/{id}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Habit\HabitCategoryController::submit
 * @see app/Http/Controllers/Habit/HabitCategoryController.php:48
 * @route '/admin/habit-management/edit/{id}'
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
* @see \App\Http\Controllers\Habit\HabitCategoryController::submit
 * @see app/Http/Controllers/Habit/HabitCategoryController.php:48
 * @route '/admin/habit-management/edit/{id}'
 */
submit.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: submit.url(args, options),
    method: 'patch',
})
const edit = {
    submit: Object.assign(submit, submit),
}

export default edit