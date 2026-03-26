import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Habit\HabitCategoryController::submit
 * @see app/Http/Controllers/Habit/HabitCategoryController.php:20
 * @route '/admin/habit-management/create'
 */
export const submit = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submit.url(options),
    method: 'post',
})

submit.definition = {
    methods: ["post"],
    url: '/admin/habit-management/create',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Habit\HabitCategoryController::submit
 * @see app/Http/Controllers/Habit/HabitCategoryController.php:20
 * @route '/admin/habit-management/create'
 */
submit.url = (options?: RouteQueryOptions) => {
    return submit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Habit\HabitCategoryController::submit
 * @see app/Http/Controllers/Habit/HabitCategoryController.php:20
 * @route '/admin/habit-management/create'
 */
submit.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submit.url(options),
    method: 'post',
})
const create = {
    submit: Object.assign(submit, submit),
}

export default create