import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\AdminSettingsController::get
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:180
 * @route '/admin/settings/notifications'
 */
export const get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: get.url(options),
    method: 'get',
})

get.definition = {
    methods: ["get","head"],
    url: '/admin/settings/notifications',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AdminSettingsController::get
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:180
 * @route '/admin/settings/notifications'
 */
get.url = (options?: RouteQueryOptions) => {
    return get.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminSettingsController::get
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:180
 * @route '/admin/settings/notifications'
 */
get.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: get.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AdminSettingsController::get
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:180
 * @route '/admin/settings/notifications'
 */
get.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: get.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\AdminSettingsController::update
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:206
 * @route '/admin/settings/notifications'
 */
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/settings/notifications',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\AdminSettingsController::update
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:206
 * @route '/admin/settings/notifications'
 */
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminSettingsController::update
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:206
 * @route '/admin/settings/notifications'
 */
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})
const notifications = {
    get: Object.assign(get, get),
update: Object.assign(update, update),
}

export default notifications