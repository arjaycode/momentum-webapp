import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\User\ProfileController::update
 * @see app/Http/Controllers/User/ProfileController.php:23
 * @route '/user/profile/update'
 */
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/user/profile/update',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\User\ProfileController::update
 * @see app/Http/Controllers/User/ProfileController.php:23
 * @route '/user/profile/update'
 */
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\User\ProfileController::update
 * @see app/Http/Controllers/User/ProfileController.php:23
 * @route '/user/profile/update'
 */
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\User\ProfileController::avatar
 * @see app/Http/Controllers/User/ProfileController.php:50
 * @route '/user/profile/avatar'
 */
export const avatar = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: avatar.url(options),
    method: 'post',
})

avatar.definition = {
    methods: ["post"],
    url: '/user/profile/avatar',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\User\ProfileController::avatar
 * @see app/Http/Controllers/User/ProfileController.php:50
 * @route '/user/profile/avatar'
 */
avatar.url = (options?: RouteQueryOptions) => {
    return avatar.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\User\ProfileController::avatar
 * @see app/Http/Controllers/User/ProfileController.php:50
 * @route '/user/profile/avatar'
 */
avatar.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: avatar.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\User\ProfileController::password
 * @see app/Http/Controllers/User/ProfileController.php:74
 * @route '/user/profile/password'
 */
export const password = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: password.url(options),
    method: 'put',
})

password.definition = {
    methods: ["put"],
    url: '/user/profile/password',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\User\ProfileController::password
 * @see app/Http/Controllers/User/ProfileController.php:74
 * @route '/user/profile/password'
 */
password.url = (options?: RouteQueryOptions) => {
    return password.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\User\ProfileController::password
 * @see app/Http/Controllers/User/ProfileController.php:74
 * @route '/user/profile/password'
 */
password.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: password.url(options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\User\ProfileController::deleteMethod
 * @see app/Http/Controllers/User/ProfileController.php:94
 * @route '/user/profile/delete'
 */
export const deleteMethod = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(options),
    method: 'delete',
})

deleteMethod.definition = {
    methods: ["delete"],
    url: '/user/profile/delete',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\User\ProfileController::deleteMethod
 * @see app/Http/Controllers/User/ProfileController.php:94
 * @route '/user/profile/delete'
 */
deleteMethod.url = (options?: RouteQueryOptions) => {
    return deleteMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\User\ProfileController::deleteMethod
 * @see app/Http/Controllers/User/ProfileController.php:94
 * @route '/user/profile/delete'
 */
deleteMethod.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\User\ProfileController::exportMethod
 * @see app/Http/Controllers/User/ProfileController.php:122
 * @route '/user/profile/export'
 */
export const exportMethod = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

exportMethod.definition = {
    methods: ["get","head"],
    url: '/user/profile/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\User\ProfileController::exportMethod
 * @see app/Http/Controllers/User/ProfileController.php:122
 * @route '/user/profile/export'
 */
exportMethod.url = (options?: RouteQueryOptions) => {
    return exportMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\User\ProfileController::exportMethod
 * @see app/Http/Controllers/User/ProfileController.php:122
 * @route '/user/profile/export'
 */
exportMethod.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\User\ProfileController::exportMethod
 * @see app/Http/Controllers/User/ProfileController.php:122
 * @route '/user/profile/export'
 */
exportMethod.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(options),
    method: 'head',
})
const profile = {
    update: Object.assign(update, update),
avatar: Object.assign(avatar, avatar),
password: Object.assign(password, password),
delete: Object.assign(deleteMethod, deleteMethod),
export: Object.assign(exportMethod, exportMethod),
}

export default profile