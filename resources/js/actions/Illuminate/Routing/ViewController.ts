import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \Illuminate\Routing\ViewController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/ViewController.php:32
 * @route '/admin/signin'
 */
const ViewController0a8e85d2899849ec26b86e16769b9582 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ViewController0a8e85d2899849ec26b86e16769b9582.url(options),
    method: 'get',
})

ViewController0a8e85d2899849ec26b86e16769b9582.definition = {
    methods: ["get","head"],
    url: '/admin/signin',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Illuminate\Routing\ViewController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/ViewController.php:32
 * @route '/admin/signin'
 */
ViewController0a8e85d2899849ec26b86e16769b9582.url = (options?: RouteQueryOptions) => {
    return ViewController0a8e85d2899849ec26b86e16769b9582.definition.url + queryParams(options)
}

/**
* @see \Illuminate\Routing\ViewController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/ViewController.php:32
 * @route '/admin/signin'
 */
ViewController0a8e85d2899849ec26b86e16769b9582.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ViewController0a8e85d2899849ec26b86e16769b9582.url(options),
    method: 'get',
})
/**
* @see \Illuminate\Routing\ViewController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/ViewController.php:32
 * @route '/admin/signin'
 */
ViewController0a8e85d2899849ec26b86e16769b9582.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ViewController0a8e85d2899849ec26b86e16769b9582.url(options),
    method: 'head',
})

    /**
* @see \Illuminate\Routing\ViewController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/ViewController.php:32
 * @route '/admin/signin'
 */
    const ViewController0a8e85d2899849ec26b86e16769b9582Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: ViewController0a8e85d2899849ec26b86e16769b9582.url(options),
        method: 'get',
    })

            /**
* @see \Illuminate\Routing\ViewController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/ViewController.php:32
 * @route '/admin/signin'
 */
        ViewController0a8e85d2899849ec26b86e16769b9582Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ViewController0a8e85d2899849ec26b86e16769b9582.url(options),
            method: 'get',
        })
            /**
* @see \Illuminate\Routing\ViewController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/ViewController.php:32
 * @route '/admin/signin'
 */
        ViewController0a8e85d2899849ec26b86e16769b9582Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ViewController0a8e85d2899849ec26b86e16769b9582.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    ViewController0a8e85d2899849ec26b86e16769b9582.form = ViewController0a8e85d2899849ec26b86e16769b9582Form
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
 * @route '/admin/user-management/create'
 */
    const ViewControllerefd674a17fdf63cf4bc12f03c9501675Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: ViewControllerefd674a17fdf63cf4bc12f03c9501675.url(options),
        method: 'get',
    })

            /**
* @see \Illuminate\Routing\ViewController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/ViewController.php:32
 * @route '/admin/user-management/create'
 */
        ViewControllerefd674a17fdf63cf4bc12f03c9501675Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ViewControllerefd674a17fdf63cf4bc12f03c9501675.url(options),
            method: 'get',
        })
            /**
* @see \Illuminate\Routing\ViewController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/ViewController.php:32
 * @route '/admin/user-management/create'
 */
        ViewControllerefd674a17fdf63cf4bc12f03c9501675Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ViewControllerefd674a17fdf63cf4bc12f03c9501675.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    ViewControllerefd674a17fdf63cf4bc12f03c9501675.form = ViewControllerefd674a17fdf63cf4bc12f03c9501675Form
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

    /**
* @see \Illuminate\Routing\ViewController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/ViewController.php:32
 * @route '/admin/habit-management/create'
 */
    const ViewControllera42ee4a6f1ae792c816d0a16c0f78459Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: ViewControllera42ee4a6f1ae792c816d0a16c0f78459.url(options),
        method: 'get',
    })

            /**
* @see \Illuminate\Routing\ViewController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/ViewController.php:32
 * @route '/admin/habit-management/create'
 */
        ViewControllera42ee4a6f1ae792c816d0a16c0f78459Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ViewControllera42ee4a6f1ae792c816d0a16c0f78459.url(options),
            method: 'get',
        })
            /**
* @see \Illuminate\Routing\ViewController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/ViewController.php:32
 * @route '/admin/habit-management/create'
 */
        ViewControllera42ee4a6f1ae792c816d0a16c0f78459Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ViewControllera42ee4a6f1ae792c816d0a16c0f78459.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    ViewControllera42ee4a6f1ae792c816d0a16c0f78459.form = ViewControllera42ee4a6f1ae792c816d0a16c0f78459Form
    /**
* @see \Illuminate\Routing\ViewController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/ViewController.php:32
 * @route '/user/calendar'
 */
const ViewController63a592235b5078f3eff8a88074e4f386 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ViewController63a592235b5078f3eff8a88074e4f386.url(options),
    method: 'get',
})

ViewController63a592235b5078f3eff8a88074e4f386.definition = {
    methods: ["get","head"],
    url: '/user/calendar',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Illuminate\Routing\ViewController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/ViewController.php:32
 * @route '/user/calendar'
 */
ViewController63a592235b5078f3eff8a88074e4f386.url = (options?: RouteQueryOptions) => {
    return ViewController63a592235b5078f3eff8a88074e4f386.definition.url + queryParams(options)
}

/**
* @see \Illuminate\Routing\ViewController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/ViewController.php:32
 * @route '/user/calendar'
 */
ViewController63a592235b5078f3eff8a88074e4f386.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ViewController63a592235b5078f3eff8a88074e4f386.url(options),
    method: 'get',
})
/**
* @see \Illuminate\Routing\ViewController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/ViewController.php:32
 * @route '/user/calendar'
 */
ViewController63a592235b5078f3eff8a88074e4f386.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ViewController63a592235b5078f3eff8a88074e4f386.url(options),
    method: 'head',
})

    /**
* @see \Illuminate\Routing\ViewController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/ViewController.php:32
 * @route '/user/calendar'
 */
    const ViewController63a592235b5078f3eff8a88074e4f386Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: ViewController63a592235b5078f3eff8a88074e4f386.url(options),
        method: 'get',
    })

            /**
* @see \Illuminate\Routing\ViewController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/ViewController.php:32
 * @route '/user/calendar'
 */
        ViewController63a592235b5078f3eff8a88074e4f386Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ViewController63a592235b5078f3eff8a88074e4f386.url(options),
            method: 'get',
        })
            /**
* @see \Illuminate\Routing\ViewController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/ViewController.php:32
 * @route '/user/calendar'
 */
        ViewController63a592235b5078f3eff8a88074e4f386Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ViewController63a592235b5078f3eff8a88074e4f386.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    ViewController63a592235b5078f3eff8a88074e4f386.form = ViewController63a592235b5078f3eff8a88074e4f386Form

const ViewController = {
    '/admin/signin': ViewController0a8e85d2899849ec26b86e16769b9582,
    '/admin/user-management/create': ViewControllerefd674a17fdf63cf4bc12f03c9501675,
    '/admin/habit-management/create': ViewControllera42ee4a6f1ae792c816d0a16c0f78459,
    '/user/calendar': ViewController63a592235b5078f3eff8a88074e4f386,
}

export default ViewController