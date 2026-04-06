import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Auth\LoginController::submit
 * @see app/Http/Controllers/Auth/LoginController.php:17
 * @route '/signin'
 */
export const submit = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submit.url(options),
    method: 'post',
})

submit.definition = {
    methods: ["post"],
    url: '/signin',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\LoginController::submit
 * @see app/Http/Controllers/Auth/LoginController.php:17
 * @route '/signin'
 */
submit.url = (options?: RouteQueryOptions) => {
    return submit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\LoginController::submit
 * @see app/Http/Controllers/Auth/LoginController.php:17
 * @route '/signin'
 */
submit.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submit.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Auth\LoginController::submit
 * @see app/Http/Controllers/Auth/LoginController.php:17
 * @route '/signin'
 */
    const submitForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: submit.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Auth\LoginController::submit
 * @see app/Http/Controllers/Auth/LoginController.php:17
 * @route '/signin'
 */
        submitForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: submit.url(options),
            method: 'post',
        })
    
    submit.form = submitForm
const signin = {
    submit: Object.assign(submit, submit),
}

export default signin