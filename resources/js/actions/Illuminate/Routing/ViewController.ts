import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \Illuminate\Routing\ViewController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/ViewController.php:32
 * @route '/admin/user-management/create'
 */
const ViewControllerefd674a17fdf63cf4bc12f03c9501675 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ViewControllerefd674a17fdf63cf4bc12f03c9501675.url(options),
    method: 'get',
})

ViewControllerefd674a17fdf63cf4bc12f03c9501675.definition = {
    methods: ["get","head"],
    url: '/admin/user-management/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Illuminate\Routing\ViewController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/ViewController.php:32
 * @route '/admin/user-management/create'
 */
ViewControllerefd674a17fdf63cf4bc12f03c9501675.url = (options?: RouteQueryOptions) => {
    return ViewControllerefd674a17fdf63cf4bc12f03c9501675.definition.url + queryParams(options)
}

/**
* @see \Illuminate\Routing\ViewController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/ViewController.php:32
 * @route '/admin/user-management/create'
 */
ViewControllerefd674a17fdf63cf4bc12f03c9501675.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ViewControllerefd674a17fdf63cf4bc12f03c9501675.url(options),
    method: 'get',
})
/**
* @see \Illuminate\Routing\ViewController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/ViewController.php:32
 * @route '/admin/user-management/create'
 */
ViewControllerefd674a17fdf63cf4bc12f03c9501675.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ViewControllerefd674a17fdf63cf4bc12f03c9501675.url(options),
    method: 'head',
})

    /**
* @see \Illuminate\Routing\ViewController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/ViewController.php:32
 * @route '/admin/habit-management/create'
 */
const ViewControllera42ee4a6f1ae792c816d0a16c0f78459 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ViewControllera42ee4a6f1ae792c816d0a16c0f78459.url(options),
    method: 'get',
})

ViewControllera42ee4a6f1ae792c816d0a16c0f78459.definition = {
    methods: ["get","head"],
    url: '/admin/habit-management/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Illuminate\Routing\ViewController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/ViewController.php:32
 * @route '/admin/habit-management/create'
 */
ViewControllera42ee4a6f1ae792c816d0a16c0f78459.url = (options?: RouteQueryOptions) => {
    return ViewControllera42ee4a6f1ae792c816d0a16c0f78459.definition.url + queryParams(options)
}

/**
* @see \Illuminate\Routing\ViewController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/ViewController.php:32
 * @route '/admin/habit-management/create'
 */
ViewControllera42ee4a6f1ae792c816d0a16c0f78459.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ViewControllera42ee4a6f1ae792c816d0a16c0f78459.url(options),
    method: 'get',
})
/**
* @see \Illuminate\Routing\ViewController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/ViewController.php:32
 * @route '/admin/habit-management/create'
 */
ViewControllera42ee4a6f1ae792c816d0a16c0f78459.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ViewControllera42ee4a6f1ae792c816d0a16c0f78459.url(options),
    method: 'head',
})

const ViewController = {
    '/admin/user-management/create': ViewControllerefd674a17fdf63cf4bc12f03c9501675,
    '/admin/habit-management/create': ViewControllera42ee4a6f1ae792c816d0a16c0f78459,
}

export default ViewController