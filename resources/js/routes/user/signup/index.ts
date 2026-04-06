import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Auth\SignupController::submit
 * @see app/Http/Controllers/Auth/SignupController.php:17
 * @route '/signup'
 */
export const submit = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submit.url(options),
    method: 'post',
})

submit.definition = {
    methods: ["post"],
    url: '/signup',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\SignupController::submit
 * @see app/Http/Controllers/Auth/SignupController.php:17
 * @route '/signup'
 */
submit.url = (options?: RouteQueryOptions) => {
    return submit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\SignupController::submit
 * @see app/Http/Controllers/Auth/SignupController.php:17
 * @route '/signup'
 */
submit.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submit.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Auth\SignupController::submit
 * @see app/Http/Controllers/Auth/SignupController.php:17
 * @route '/signup'
 */
    const submitForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: submit.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Auth\SignupController::submit
 * @see app/Http/Controllers/Auth/SignupController.php:17
 * @route '/signup'
 */
        submitForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: submit.url(options),
            method: 'post',
        })
    
    submit.form = submitForm
const signup = {
    submit: Object.assign(submit, submit),
}

export default signup