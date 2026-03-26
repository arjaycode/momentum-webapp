import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Auth\ForgotPasswordController::showForgotPasswordForm
 * @see app/Http/Controllers/Auth/ForgotPasswordController.php:16
 * @route '/forgot-password'
 */
export const showForgotPasswordForm = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showForgotPasswordForm.url(options),
    method: 'get',
})

showForgotPasswordForm.definition = {
    methods: ["get","head"],
    url: '/forgot-password',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\ForgotPasswordController::showForgotPasswordForm
 * @see app/Http/Controllers/Auth/ForgotPasswordController.php:16
 * @route '/forgot-password'
 */
showForgotPasswordForm.url = (options?: RouteQueryOptions) => {
    return showForgotPasswordForm.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\ForgotPasswordController::showForgotPasswordForm
 * @see app/Http/Controllers/Auth/ForgotPasswordController.php:16
 * @route '/forgot-password'
 */
showForgotPasswordForm.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showForgotPasswordForm.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Auth\ForgotPasswordController::showForgotPasswordForm
 * @see app/Http/Controllers/Auth/ForgotPasswordController.php:16
 * @route '/forgot-password'
 */
showForgotPasswordForm.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showForgotPasswordForm.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Auth\ForgotPasswordController::sendResetLinkEmail
 * @see app/Http/Controllers/Auth/ForgotPasswordController.php:24
 * @route '/forgot-password'
 */
export const sendResetLinkEmail = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sendResetLinkEmail.url(options),
    method: 'post',
})

sendResetLinkEmail.definition = {
    methods: ["post"],
    url: '/forgot-password',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\ForgotPasswordController::sendResetLinkEmail
 * @see app/Http/Controllers/Auth/ForgotPasswordController.php:24
 * @route '/forgot-password'
 */
sendResetLinkEmail.url = (options?: RouteQueryOptions) => {
    return sendResetLinkEmail.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\ForgotPasswordController::sendResetLinkEmail
 * @see app/Http/Controllers/Auth/ForgotPasswordController.php:24
 * @route '/forgot-password'
 */
sendResetLinkEmail.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sendResetLinkEmail.url(options),
    method: 'post',
})
const ForgotPasswordController = { showForgotPasswordForm, sendResetLinkEmail }

export default ForgotPasswordController