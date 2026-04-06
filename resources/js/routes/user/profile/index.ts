import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\User\ProfileController::update
 * @see app/Http/Controllers/User/ProfileController.php:36
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
 * @see app/Http/Controllers/User/ProfileController.php:36
 * @route '/user/profile/update'
 */
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\User\ProfileController::update
 * @see app/Http/Controllers/User/ProfileController.php:36
 * @route '/user/profile/update'
 */
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\User\ProfileController::update
 * @see app/Http/Controllers/User/ProfileController.php:36
 * @route '/user/profile/update'
 */
    const updateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url({
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\User\ProfileController::update
 * @see app/Http/Controllers/User/ProfileController.php:36
 * @route '/user/profile/update'
 */
        updateForm.put = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\User\ProfileController::avatar
 * @see app/Http/Controllers/User/ProfileController.php:63
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
 * @see app/Http/Controllers/User/ProfileController.php:63
 * @route '/user/profile/avatar'
 */
avatar.url = (options?: RouteQueryOptions) => {
    return avatar.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\User\ProfileController::avatar
 * @see app/Http/Controllers/User/ProfileController.php:63
 * @route '/user/profile/avatar'
 */
avatar.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: avatar.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\User\ProfileController::avatar
 * @see app/Http/Controllers/User/ProfileController.php:63
 * @route '/user/profile/avatar'
 */
    const avatarForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: avatar.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\User\ProfileController::avatar
 * @see app/Http/Controllers/User/ProfileController.php:63
 * @route '/user/profile/avatar'
 */
        avatarForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: avatar.url(options),
            method: 'post',
        })
    
    avatar.form = avatarForm
/**
* @see \App\Http\Controllers\User\ProfileController::password
 * @see app/Http/Controllers/User/ProfileController.php:87
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
 * @see app/Http/Controllers/User/ProfileController.php:87
 * @route '/user/profile/password'
 */
password.url = (options?: RouteQueryOptions) => {
    return password.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\User\ProfileController::password
 * @see app/Http/Controllers/User/ProfileController.php:87
 * @route '/user/profile/password'
 */
password.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: password.url(options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\User\ProfileController::password
 * @see app/Http/Controllers/User/ProfileController.php:87
 * @route '/user/profile/password'
 */
    const passwordForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: password.url({
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\User\ProfileController::password
 * @see app/Http/Controllers/User/ProfileController.php:87
 * @route '/user/profile/password'
 */
        passwordForm.put = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: password.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    password.form = passwordForm
/**
* @see \App\Http\Controllers\User\ProfileController::deleteMethod
 * @see app/Http/Controllers/User/ProfileController.php:107
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
 * @see app/Http/Controllers/User/ProfileController.php:107
 * @route '/user/profile/delete'
 */
deleteMethod.url = (options?: RouteQueryOptions) => {
    return deleteMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\User\ProfileController::deleteMethod
 * @see app/Http/Controllers/User/ProfileController.php:107
 * @route '/user/profile/delete'
 */
deleteMethod.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\User\ProfileController::deleteMethod
 * @see app/Http/Controllers/User/ProfileController.php:107
 * @route '/user/profile/delete'
 */
    const deleteMethodForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: deleteMethod.url({
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\User\ProfileController::deleteMethod
 * @see app/Http/Controllers/User/ProfileController.php:107
 * @route '/user/profile/delete'
 */
        deleteMethodForm.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: deleteMethod.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    deleteMethod.form = deleteMethodForm
/**
* @see \App\Http\Controllers\User\ProfileController::exportMethod
 * @see app/Http/Controllers/User/ProfileController.php:135
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
 * @see app/Http/Controllers/User/ProfileController.php:135
 * @route '/user/profile/export'
 */
exportMethod.url = (options?: RouteQueryOptions) => {
    return exportMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\User\ProfileController::exportMethod
 * @see app/Http/Controllers/User/ProfileController.php:135
 * @route '/user/profile/export'
 */
exportMethod.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\User\ProfileController::exportMethod
 * @see app/Http/Controllers/User/ProfileController.php:135
 * @route '/user/profile/export'
 */
exportMethod.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\User\ProfileController::exportMethod
 * @see app/Http/Controllers/User/ProfileController.php:135
 * @route '/user/profile/export'
 */
    const exportMethodForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportMethod.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\User\ProfileController::exportMethod
 * @see app/Http/Controllers/User/ProfileController.php:135
 * @route '/user/profile/export'
 */
        exportMethodForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethod.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\User\ProfileController::exportMethod
 * @see app/Http/Controllers/User/ProfileController.php:135
 * @route '/user/profile/export'
 */
        exportMethodForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethod.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportMethod.form = exportMethodForm
const profile = {
    update: Object.assign(update, update),
avatar: Object.assign(avatar, avatar),
password: Object.assign(password, password),
delete: Object.assign(deleteMethod, deleteMethod),
export: Object.assign(exportMethod, exportMethod),
}

export default profile