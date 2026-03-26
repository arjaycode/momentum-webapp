import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/admin/signin'
 */
const Controller0a8e85d2899849ec26b86e16769b9582 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controller0a8e85d2899849ec26b86e16769b9582.url(options),
    method: 'get',
})

Controller0a8e85d2899849ec26b86e16769b9582.definition = {
    methods: ["get","head"],
    url: '/admin/signin',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/admin/signin'
 */
Controller0a8e85d2899849ec26b86e16769b9582.url = (options?: RouteQueryOptions) => {
    return Controller0a8e85d2899849ec26b86e16769b9582.definition.url + queryParams(options)
}

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/admin/signin'
 */
Controller0a8e85d2899849ec26b86e16769b9582.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controller0a8e85d2899849ec26b86e16769b9582.url(options),
    method: 'get',
})
/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/admin/signin'
 */
Controller0a8e85d2899849ec26b86e16769b9582.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: Controller0a8e85d2899849ec26b86e16769b9582.url(options),
    method: 'head',
})

    /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/user/calendar'
 */
const Controller63a592235b5078f3eff8a88074e4f386 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controller63a592235b5078f3eff8a88074e4f386.url(options),
    method: 'get',
})

Controller63a592235b5078f3eff8a88074e4f386.definition = {
    methods: ["get","head"],
    url: '/user/calendar',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/user/calendar'
 */
Controller63a592235b5078f3eff8a88074e4f386.url = (options?: RouteQueryOptions) => {
    return Controller63a592235b5078f3eff8a88074e4f386.definition.url + queryParams(options)
}

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/user/calendar'
 */
Controller63a592235b5078f3eff8a88074e4f386.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controller63a592235b5078f3eff8a88074e4f386.url(options),
    method: 'get',
})
/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route '/user/calendar'
 */
Controller63a592235b5078f3eff8a88074e4f386.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: Controller63a592235b5078f3eff8a88074e4f386.url(options),
    method: 'head',
})

const Controller = {
    '/admin/signin': Controller0a8e85d2899849ec26b86e16769b9582,
    '/user/calendar': Controller63a592235b5078f3eff8a88074e4f386,
}

export default Controller