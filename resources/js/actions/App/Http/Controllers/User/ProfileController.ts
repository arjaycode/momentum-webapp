import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\User\ProfileController::show
 * @see app/Http/Controllers/User/ProfileController.php:18
 * @route '/user/settings'
 */
export const show = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/user/settings',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\User\ProfileController::show
 * @see app/Http/Controllers/User/ProfileController.php:18
 * @route '/user/settings'
 */
show.url = (options?: RouteQueryOptions) => {
    return show.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\User\ProfileController::show
 * @see app/Http/Controllers/User/ProfileController.php:18
 * @route '/user/settings'
 */
show.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\User\ProfileController::show
 * @see app/Http/Controllers/User/ProfileController.php:18
 * @route '/user/settings'
 */
show.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\User\ProfileController::show
 * @see app/Http/Controllers/User/ProfileController.php:18
 * @route '/user/settings'
 */
    const showForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\User\ProfileController::show
 * @see app/Http/Controllers/User/ProfileController.php:18
 * @route '/user/settings'
 */
        showForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\User\ProfileController::show
 * @see app/Http/Controllers/User/ProfileController.php:18
 * @route '/user/settings'
 */
        showForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
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
* @see \App\Http\Controllers\User\ProfileController::updateAvatar
 * @see app/Http/Controllers/User/ProfileController.php:63
 * @route '/user/profile/avatar'
 */
export const updateAvatar = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateAvatar.url(options),
    method: 'post',
})

updateAvatar.definition = {
    methods: ["post"],
    url: '/user/profile/avatar',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\User\ProfileController::updateAvatar
 * @see app/Http/Controllers/User/ProfileController.php:63
 * @route '/user/profile/avatar'
 */
updateAvatar.url = (options?: RouteQueryOptions) => {
    return updateAvatar.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\User\ProfileController::updateAvatar
 * @see app/Http/Controllers/User/ProfileController.php:63
 * @route '/user/profile/avatar'
 */
updateAvatar.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateAvatar.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\User\ProfileController::updateAvatar
 * @see app/Http/Controllers/User/ProfileController.php:63
 * @route '/user/profile/avatar'
 */
    const updateAvatarForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateAvatar.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\User\ProfileController::updateAvatar
 * @see app/Http/Controllers/User/ProfileController.php:63
 * @route '/user/profile/avatar'
 */
        updateAvatarForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateAvatar.url(options),
            method: 'post',
        })
    
    updateAvatar.form = updateAvatarForm
/**
* @see \App\Http\Controllers\User\ProfileController::updatePassword
 * @see app/Http/Controllers/User/ProfileController.php:87
 * @route '/user/profile/password'
 */
export const updatePassword = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatePassword.url(options),
    method: 'put',
})

updatePassword.definition = {
    methods: ["put"],
    url: '/user/profile/password',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\User\ProfileController::updatePassword
 * @see app/Http/Controllers/User/ProfileController.php:87
 * @route '/user/profile/password'
 */
updatePassword.url = (options?: RouteQueryOptions) => {
    return updatePassword.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\User\ProfileController::updatePassword
 * @see app/Http/Controllers/User/ProfileController.php:87
 * @route '/user/profile/password'
 */
updatePassword.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatePassword.url(options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\User\ProfileController::updatePassword
 * @see app/Http/Controllers/User/ProfileController.php:87
 * @route '/user/profile/password'
 */
    const updatePasswordForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updatePassword.url({
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\User\ProfileController::updatePassword
 * @see app/Http/Controllers/User/ProfileController.php:87
 * @route '/user/profile/password'
 */
        updatePasswordForm.put = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updatePassword.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updatePassword.form = updatePasswordForm
/**
* @see \App\Http\Controllers\User\ProfileController::destroy
 * @see app/Http/Controllers/User/ProfileController.php:107
 * @route '/user/profile/delete'
 */
export const destroy = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/user/profile/delete',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\User\ProfileController::destroy
 * @see app/Http/Controllers/User/ProfileController.php:107
 * @route '/user/profile/delete'
 */
destroy.url = (options?: RouteQueryOptions) => {
    return destroy.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\User\ProfileController::destroy
 * @see app/Http/Controllers/User/ProfileController.php:107
 * @route '/user/profile/delete'
 */
destroy.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\User\ProfileController::destroy
 * @see app/Http/Controllers/User/ProfileController.php:107
 * @route '/user/profile/delete'
 */
    const destroyForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url({
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\User\ProfileController::destroy
 * @see app/Http/Controllers/User/ProfileController.php:107
 * @route '/user/profile/delete'
 */
        destroyForm.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
/**
* @see \App\Http\Controllers\User\ProfileController::exportData
 * @see app/Http/Controllers/User/ProfileController.php:135
 * @route '/user/profile/export'
 */
export const exportData = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportData.url(options),
    method: 'get',
})

exportData.definition = {
    methods: ["get","head"],
    url: '/user/profile/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\User\ProfileController::exportData
 * @see app/Http/Controllers/User/ProfileController.php:135
 * @route '/user/profile/export'
 */
exportData.url = (options?: RouteQueryOptions) => {
    return exportData.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\User\ProfileController::exportData
 * @see app/Http/Controllers/User/ProfileController.php:135
 * @route '/user/profile/export'
 */
exportData.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportData.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\User\ProfileController::exportData
 * @see app/Http/Controllers/User/ProfileController.php:135
 * @route '/user/profile/export'
 */
exportData.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportData.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\User\ProfileController::exportData
 * @see app/Http/Controllers/User/ProfileController.php:135
 * @route '/user/profile/export'
 */
    const exportDataForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportData.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\User\ProfileController::exportData
 * @see app/Http/Controllers/User/ProfileController.php:135
 * @route '/user/profile/export'
 */
        exportDataForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportData.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\User\ProfileController::exportData
 * @see app/Http/Controllers/User/ProfileController.php:135
 * @route '/user/profile/export'
 */
        exportDataForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportData.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportData.form = exportDataForm
const ProfileController = { show, update, updateAvatar, updatePassword, destroy, exportData }

export default ProfileController