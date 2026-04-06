import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\AdminSettingsController::show
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:20
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
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:20
 * @route '/admin/settings'
 */
show.url = (options?: RouteQueryOptions) => {
    return show.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminSettingsController::show
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:20
 * @route '/admin/settings'
 */
show.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AdminSettingsController::show
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:20
 * @route '/admin/settings'
 */
show.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\AdminSettingsController::show
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:20
 * @route '/admin/settings'
 */
    const showForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\AdminSettingsController::show
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:20
 * @route '/admin/settings'
 */
        showForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\AdminSettingsController::show
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:20
 * @route '/admin/settings'
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
* @see \App\Http\Controllers\Admin\AdminSettingsController::update
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:33
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
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:33
 * @route '/admin/settings/profile'
 */
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminSettingsController::update
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:33
 * @route '/admin/settings/profile'
 */
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\AdminSettingsController::update
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:33
 * @route '/admin/settings/profile'
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
* @see \App\Http\Controllers\Admin\AdminSettingsController::update
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:33
 * @route '/admin/settings/profile'
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
* @see \App\Http\Controllers\Admin\AdminSettingsController::updateAvatar
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:48
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
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:48
 * @route '/admin/settings/avatar'
 */
updateAvatar.url = (options?: RouteQueryOptions) => {
    return updateAvatar.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminSettingsController::updateAvatar
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:48
 * @route '/admin/settings/avatar'
 */
updateAvatar.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateAvatar.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\AdminSettingsController::updateAvatar
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:48
 * @route '/admin/settings/avatar'
 */
    const updateAvatarForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateAvatar.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AdminSettingsController::updateAvatar
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:48
 * @route '/admin/settings/avatar'
 */
        updateAvatarForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateAvatar.url(options),
            method: 'post',
        })
    
    updateAvatar.form = updateAvatarForm
/**
* @see \App\Http\Controllers\Admin\AdminSettingsController::updatePassword
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:72
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
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:72
 * @route '/admin/settings/password'
 */
updatePassword.url = (options?: RouteQueryOptions) => {
    return updatePassword.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminSettingsController::updatePassword
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:72
 * @route '/admin/settings/password'
 */
updatePassword.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatePassword.url(options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\AdminSettingsController::updatePassword
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:72
 * @route '/admin/settings/password'
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
* @see \App\Http\Controllers\Admin\AdminSettingsController::updatePassword
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:72
 * @route '/admin/settings/password'
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
* @see \App\Http\Controllers\Admin\AdminSettingsController::getSystemSettings
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:95
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
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:95
 * @route '/admin/settings/system'
 */
getSystemSettings.url = (options?: RouteQueryOptions) => {
    return getSystemSettings.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminSettingsController::getSystemSettings
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:95
 * @route '/admin/settings/system'
 */
getSystemSettings.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getSystemSettings.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AdminSettingsController::getSystemSettings
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:95
 * @route '/admin/settings/system'
 */
getSystemSettings.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getSystemSettings.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\AdminSettingsController::getSystemSettings
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:95
 * @route '/admin/settings/system'
 */
    const getSystemSettingsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getSystemSettings.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\AdminSettingsController::getSystemSettings
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:95
 * @route '/admin/settings/system'
 */
        getSystemSettingsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getSystemSettings.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\AdminSettingsController::getSystemSettings
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:95
 * @route '/admin/settings/system'
 */
        getSystemSettingsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getSystemSettings.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getSystemSettings.form = getSystemSettingsForm
/**
* @see \App\Http\Controllers\Admin\AdminSettingsController::updateSystemSettings
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:136
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
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:136
 * @route '/admin/settings/system'
 */
updateSystemSettings.url = (options?: RouteQueryOptions) => {
    return updateSystemSettings.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminSettingsController::updateSystemSettings
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:136
 * @route '/admin/settings/system'
 */
updateSystemSettings.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateSystemSettings.url(options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\AdminSettingsController::updateSystemSettings
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:136
 * @route '/admin/settings/system'
 */
    const updateSystemSettingsForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateSystemSettings.url({
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AdminSettingsController::updateSystemSettings
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:136
 * @route '/admin/settings/system'
 */
        updateSystemSettingsForm.put = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateSystemSettings.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateSystemSettings.form = updateSystemSettingsForm
/**
* @see \App\Http\Controllers\Admin\AdminSettingsController::getNotificationSettings
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:189
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
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:189
 * @route '/admin/settings/notifications'
 */
getNotificationSettings.url = (options?: RouteQueryOptions) => {
    return getNotificationSettings.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminSettingsController::getNotificationSettings
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:189
 * @route '/admin/settings/notifications'
 */
getNotificationSettings.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getNotificationSettings.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AdminSettingsController::getNotificationSettings
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:189
 * @route '/admin/settings/notifications'
 */
getNotificationSettings.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getNotificationSettings.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\AdminSettingsController::getNotificationSettings
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:189
 * @route '/admin/settings/notifications'
 */
    const getNotificationSettingsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getNotificationSettings.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\AdminSettingsController::getNotificationSettings
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:189
 * @route '/admin/settings/notifications'
 */
        getNotificationSettingsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getNotificationSettings.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\AdminSettingsController::getNotificationSettings
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:189
 * @route '/admin/settings/notifications'
 */
        getNotificationSettingsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getNotificationSettings.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getNotificationSettings.form = getNotificationSettingsForm
/**
* @see \App\Http\Controllers\Admin\AdminSettingsController::updateNotificationSettings
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:215
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
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:215
 * @route '/admin/settings/notifications'
 */
updateNotificationSettings.url = (options?: RouteQueryOptions) => {
    return updateNotificationSettings.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminSettingsController::updateNotificationSettings
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:215
 * @route '/admin/settings/notifications'
 */
updateNotificationSettings.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateNotificationSettings.url(options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\AdminSettingsController::updateNotificationSettings
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:215
 * @route '/admin/settings/notifications'
 */
    const updateNotificationSettingsForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateNotificationSettings.url({
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\AdminSettingsController::updateNotificationSettings
 * @see app/Http/Controllers/Admin/AdminSettingsController.php:215
 * @route '/admin/settings/notifications'
 */
        updateNotificationSettingsForm.put = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateNotificationSettings.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateNotificationSettings.form = updateNotificationSettingsForm
const AdminSettingsController = { show, update, updateAvatar, updatePassword, getSystemSettings, updateSystemSettings, getNotificationSettings, updateNotificationSettings }

export default AdminSettingsController