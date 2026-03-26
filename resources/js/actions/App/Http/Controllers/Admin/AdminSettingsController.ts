import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\AdminSettingsController::show
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:18
 * @route '/admin/settings'
 */
export const show = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/settings',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AdminSettingsController::show
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:18
 * @route '/admin/settings'
 */
show.url = (options?: RouteQueryOptions) => {
    return show.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminSettingsController::show
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:18
 * @route '/admin/settings'
 */
show.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AdminSettingsController::show
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:18
 * @route '/admin/settings'
 */
show.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(options),
    method: 'head',
})

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
* @see \App\Http\Controllers\Admin\AdminSettingsController::updateAvatar
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:39
 * @route '/admin/settings/avatar'
 */
export const updateAvatar = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateAvatar.url(options),
    method: 'post',
})

updateAvatar.definition = {
    methods: ["post"],
    url: '/admin/settings/avatar',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\AdminSettingsController::updateAvatar
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:39
 * @route '/admin/settings/avatar'
 */
updateAvatar.url = (options?: RouteQueryOptions) => {
    return updateAvatar.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminSettingsController::updateAvatar
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:39
 * @route '/admin/settings/avatar'
 */
updateAvatar.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateAvatar.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\AdminSettingsController::updatePassword
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:63
 * @route '/admin/settings/password'
 */
export const updatePassword = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatePassword.url(options),
    method: 'put',
})

updatePassword.definition = {
    methods: ["put"],
    url: '/admin/settings/password',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\AdminSettingsController::updatePassword
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:63
 * @route '/admin/settings/password'
 */
updatePassword.url = (options?: RouteQueryOptions) => {
    return updatePassword.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminSettingsController::updatePassword
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:63
 * @route '/admin/settings/password'
 */
updatePassword.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatePassword.url(options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\AdminSettingsController::getSystemSettings
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:86
 * @route '/admin/settings/system'
 */
export const getSystemSettings = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getSystemSettings.url(options),
    method: 'get',
})

getSystemSettings.definition = {
    methods: ["get","head"],
    url: '/admin/settings/system',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AdminSettingsController::getSystemSettings
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:86
 * @route '/admin/settings/system'
 */
getSystemSettings.url = (options?: RouteQueryOptions) => {
    return getSystemSettings.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminSettingsController::getSystemSettings
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:86
 * @route '/admin/settings/system'
 */
getSystemSettings.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getSystemSettings.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AdminSettingsController::getSystemSettings
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:86
 * @route '/admin/settings/system'
 */
getSystemSettings.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getSystemSettings.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\AdminSettingsController::updateSystemSettings
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:127
 * @route '/admin/settings/system'
 */
export const updateSystemSettings = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateSystemSettings.url(options),
    method: 'put',
})

updateSystemSettings.definition = {
    methods: ["put"],
    url: '/admin/settings/system',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\AdminSettingsController::updateSystemSettings
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:127
 * @route '/admin/settings/system'
 */
updateSystemSettings.url = (options?: RouteQueryOptions) => {
    return updateSystemSettings.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminSettingsController::updateSystemSettings
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:127
 * @route '/admin/settings/system'
 */
updateSystemSettings.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateSystemSettings.url(options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\AdminSettingsController::getNotificationSettings
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:180
 * @route '/admin/settings/notifications'
 */
export const getNotificationSettings = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getNotificationSettings.url(options),
    method: 'get',
})

getNotificationSettings.definition = {
    methods: ["get","head"],
    url: '/admin/settings/notifications',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AdminSettingsController::getNotificationSettings
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:180
 * @route '/admin/settings/notifications'
 */
getNotificationSettings.url = (options?: RouteQueryOptions) => {
    return getNotificationSettings.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminSettingsController::getNotificationSettings
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:180
 * @route '/admin/settings/notifications'
 */
getNotificationSettings.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getNotificationSettings.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AdminSettingsController::getNotificationSettings
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:180
 * @route '/admin/settings/notifications'
 */
getNotificationSettings.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getNotificationSettings.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\AdminSettingsController::updateNotificationSettings
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:206
 * @route '/admin/settings/notifications'
 */
export const updateNotificationSettings = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateNotificationSettings.url(options),
    method: 'put',
})

updateNotificationSettings.definition = {
    methods: ["put"],
    url: '/admin/settings/notifications',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\AdminSettingsController::updateNotificationSettings
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:206
 * @route '/admin/settings/notifications'
 */
updateNotificationSettings.url = (options?: RouteQueryOptions) => {
    return updateNotificationSettings.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminSettingsController::updateNotificationSettings
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:206
 * @route '/admin/settings/notifications'
 */
updateNotificationSettings.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateNotificationSettings.url(options),
    method: 'put',
})
const AdminSettingsController = { show, update, updateAvatar, updatePassword, getSystemSettings, updateSystemSettings, getNotificationSettings, updateNotificationSettings }

export default AdminSettingsController