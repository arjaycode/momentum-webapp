import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
import system from './system'
import notifications from './notifications'
/**
* @see \App\Http\Controllers\Admin\AdminSettingsController::update
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:24
 * @route '/admin/settings/profile'
 */
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/settings/profile',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\AdminSettingsController::update
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:24
 * @route '/admin/settings/profile'
 */
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminSettingsController::update
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:24
 * @route '/admin/settings/profile'
 */
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\AdminSettingsController::avatar
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:39
 * @route '/admin/settings/avatar'
 */
export const avatar = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: avatar.url(options),
    method: 'post',
})

avatar.definition = {
    methods: ["post"],
    url: '/admin/settings/avatar',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\AdminSettingsController::avatar
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:39
 * @route '/admin/settings/avatar'
 */
avatar.url = (options?: RouteQueryOptions) => {
    return avatar.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminSettingsController::avatar
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:39
 * @route '/admin/settings/avatar'
 */
avatar.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: avatar.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\AdminSettingsController::password
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:63
 * @route '/admin/settings/password'
 */
export const password = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: password.url(options),
    method: 'put',
})

password.definition = {
    methods: ["put"],
    url: '/admin/settings/password',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\AdminSettingsController::password
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:63
 * @route '/admin/settings/password'
 */
password.url = (options?: RouteQueryOptions) => {
    return password.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminSettingsController::password
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:63
 * @route '/admin/settings/password'
 */
password.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: password.url(options),
    method: 'put',
})
const settings = {
    update: Object.assign(update, update),
avatar: Object.assign(avatar, avatar),
password: Object.assign(password, password),
system: Object.assign(system, system),
notifications: Object.assign(notifications, notifications),
}

export default settings