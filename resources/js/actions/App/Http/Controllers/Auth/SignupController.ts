import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Auth\SignupController::signup_view
 * @see app/Http/Controllers/Auth/SignupController.php:12
 * @route '/signup'
 */
export const signup_view = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: signup_view.url(options),
    method: 'get',
})

signup_view.definition = {
    methods: ["get","head"],
    url: '/signup',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\SignupController::signup_view
 * @see app/Http/Controllers/Auth/SignupController.php:12
 * @route '/signup'
 */
signup_view.url = (options?: RouteQueryOptions) => {
    return signup_view.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\SignupController::signup_view
 * @see app/Http/Controllers/Auth/SignupController.php:12
 * @route '/signup'
 */
signup_view.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: signup_view.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Auth\SignupController::signup_view
 * @see app/Http/Controllers/Auth/SignupController.php:12
 * @route '/signup'
 */
signup_view.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: signup_view.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Auth\SignupController::signup_view
 * @see app/Http/Controllers/Auth/SignupController.php:12
 * @route '/signup'
 */
    const signup_viewForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: signup_view.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Auth\SignupController::signup_view
 * @see app/Http/Controllers/Auth/SignupController.php:12
 * @route '/signup'
 */
        signup_viewForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: signup_view.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Auth\SignupController::signup_view
 * @see app/Http/Controllers/Auth/SignupController.php:12
 * @route '/signup'
 */
        signup_viewForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: signup_view.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    signup_view.form = signup_viewForm
/**
* @see \App\Http\Controllers\Auth\SignupController::signup
 * @see app/Http/Controllers/Auth/SignupController.php:17
 * @route '/signup'
 */
export const signup = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: signup.url(options),
    method: 'post',
})

signup.definition = {
    methods: ["post"],
    url: '/signup',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\SignupController::signup
 * @see app/Http/Controllers/Auth/SignupController.php:17
 * @route '/signup'
 */
signup.url = (options?: RouteQueryOptions) => {
    return signup.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\SignupController::signup
 * @see app/Http/Controllers/Auth/SignupController.php:17
 * @route '/signup'
 */
signup.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: signup.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Auth\SignupController::signup
 * @see app/Http/Controllers/Auth/SignupController.php:17
 * @route '/signup'
 */
    const signupForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: signup.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Auth\SignupController::signup
 * @see app/Http/Controllers/Auth/SignupController.php:17
 * @route '/signup'
 */
        signupForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: signup.url(options),
            method: 'post',
        })
    
    signup.form = signupForm
const SignupController = { signup_view, signup }

export default SignupController