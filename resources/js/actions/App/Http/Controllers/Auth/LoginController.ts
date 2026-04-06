import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Auth\LoginController::apiLogin
 * @see app/Http/Controllers/Auth/LoginController.php:78
 * @route '/api/login'
 */
export const apiLogin = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: apiLogin.url(options),
    method: 'post',
})

apiLogin.definition = {
    methods: ["post"],
    url: '/api/login',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\LoginController::apiLogin
 * @see app/Http/Controllers/Auth/LoginController.php:78
 * @route '/api/login'
 */
apiLogin.url = (options?: RouteQueryOptions) => {
    return apiLogin.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\LoginController::apiLogin
 * @see app/Http/Controllers/Auth/LoginController.php:78
 * @route '/api/login'
 */
apiLogin.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: apiLogin.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Auth\LoginController::apiLogin
 * @see app/Http/Controllers/Auth/LoginController.php:78
 * @route '/api/login'
 */
    const apiLoginForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: apiLogin.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Auth\LoginController::apiLogin
 * @see app/Http/Controllers/Auth/LoginController.php:78
 * @route '/api/login'
 */
        apiLoginForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: apiLogin.url(options),
            method: 'post',
        })
    
    apiLogin.form = apiLoginForm
/**
* @see \App\Http\Controllers\Auth\LoginController::logout
 * @see app/Http/Controllers/Auth/LoginController.php:64
 * @route '/logout'
 */
export const logout = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

logout.definition = {
    methods: ["post"],
    url: '/logout',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\LoginController::logout
 * @see app/Http/Controllers/Auth/LoginController.php:64
 * @route '/logout'
 */
logout.url = (options?: RouteQueryOptions) => {
    return logout.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\LoginController::logout
 * @see app/Http/Controllers/Auth/LoginController.php:64
 * @route '/logout'
 */
logout.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Auth\LoginController::logout
 * @see app/Http/Controllers/Auth/LoginController.php:64
 * @route '/logout'
 */
    const logoutForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: logout.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Auth\LoginController::logout
 * @see app/Http/Controllers/Auth/LoginController.php:64
 * @route '/logout'
 */
        logoutForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: logout.url(options),
            method: 'post',
        })
    
    logout.form = logoutForm
/**
* @see \App\Http\Controllers\Auth\LoginController::index
 * @see app/Http/Controllers/Auth/LoginController.php:12
 * @route '/signin'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/signin',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\LoginController::index
 * @see app/Http/Controllers/Auth/LoginController.php:12
 * @route '/signin'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\LoginController::index
 * @see app/Http/Controllers/Auth/LoginController.php:12
 * @route '/signin'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Auth\LoginController::index
 * @see app/Http/Controllers/Auth/LoginController.php:12
 * @route '/signin'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Auth\LoginController::index
 * @see app/Http/Controllers/Auth/LoginController.php:12
 * @route '/signin'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Auth\LoginController::index
 * @see app/Http/Controllers/Auth/LoginController.php:12
 * @route '/signin'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Auth\LoginController::index
 * @see app/Http/Controllers/Auth/LoginController.php:12
 * @route '/signin'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\Auth\LoginController::signin
 * @see app/Http/Controllers/Auth/LoginController.php:17
 * @route '/signin'
 */
export const signin = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: signin.url(options),
    method: 'post',
})

signin.definition = {
    methods: ["post"],
    url: '/signin',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\LoginController::signin
 * @see app/Http/Controllers/Auth/LoginController.php:17
 * @route '/signin'
 */
signin.url = (options?: RouteQueryOptions) => {
    return signin.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\LoginController::signin
 * @see app/Http/Controllers/Auth/LoginController.php:17
 * @route '/signin'
 */
signin.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: signin.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Auth\LoginController::signin
 * @see app/Http/Controllers/Auth/LoginController.php:17
 * @route '/signin'
 */
    const signinForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: signin.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Auth\LoginController::signin
 * @see app/Http/Controllers/Auth/LoginController.php:17
 * @route '/signin'
 */
        signinForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: signin.url(options),
            method: 'post',
        })
    
    signin.form = signinForm
const LoginController = { apiLogin, logout, index, signin }

export default LoginController