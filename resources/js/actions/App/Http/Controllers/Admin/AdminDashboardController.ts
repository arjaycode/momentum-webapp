import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\AdminDashboardController::view_dashboard
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:17
 * @route '/admin/dashboard'
 */
export const view_dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: view_dashboard.url(options),
    method: 'get',
})

view_dashboard.definition = {
    methods: ["get","head"],
    url: '/admin/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AdminDashboardController::view_dashboard
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:17
 * @route '/admin/dashboard'
 */
view_dashboard.url = (options?: RouteQueryOptions) => {
    return view_dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminDashboardController::view_dashboard
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:17
 * @route '/admin/dashboard'
 */
view_dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: view_dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AdminDashboardController::view_dashboard
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:17
 * @route '/admin/dashboard'
 */
view_dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: view_dashboard.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\AdminDashboardController::view_dashboard
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:17
 * @route '/admin/dashboard'
 */
    const view_dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: view_dashboard.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\AdminDashboardController::view_dashboard
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:17
 * @route '/admin/dashboard'
 */
        view_dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: view_dashboard.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\AdminDashboardController::view_dashboard
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:17
 * @route '/admin/dashboard'
 */
        view_dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: view_dashboard.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    view_dashboard.form = view_dashboardForm
/**
* @see \App\Http\Controllers\Admin\AdminDashboardController::getStats
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:170
 * @route '/admin/dashboard/stats'
 */
export const getStats = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getStats.url(options),
    method: 'get',
})

getStats.definition = {
    methods: ["get","head"],
    url: '/admin/dashboard/stats',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AdminDashboardController::getStats
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:170
 * @route '/admin/dashboard/stats'
 */
getStats.url = (options?: RouteQueryOptions) => {
    return getStats.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminDashboardController::getStats
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:170
 * @route '/admin/dashboard/stats'
 */
getStats.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getStats.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AdminDashboardController::getStats
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:170
 * @route '/admin/dashboard/stats'
 */
getStats.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getStats.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\AdminDashboardController::getStats
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:170
 * @route '/admin/dashboard/stats'
 */
    const getStatsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getStats.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\AdminDashboardController::getStats
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:170
 * @route '/admin/dashboard/stats'
 */
        getStatsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getStats.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\AdminDashboardController::getStats
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:170
 * @route '/admin/dashboard/stats'
 */
        getStatsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getStats.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getStats.form = getStatsForm
/**
* @see \App\Http\Controllers\Admin\AdminDashboardController::getChartData
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:195
 * @route '/admin/dashboard/chart-data'
 */
export const getChartData = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getChartData.url(options),
    method: 'get',
})

getChartData.definition = {
    methods: ["get","head"],
    url: '/admin/dashboard/chart-data',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AdminDashboardController::getChartData
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:195
 * @route '/admin/dashboard/chart-data'
 */
getChartData.url = (options?: RouteQueryOptions) => {
    return getChartData.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminDashboardController::getChartData
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:195
 * @route '/admin/dashboard/chart-data'
 */
getChartData.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getChartData.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AdminDashboardController::getChartData
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:195
 * @route '/admin/dashboard/chart-data'
 */
getChartData.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getChartData.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\AdminDashboardController::getChartData
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:195
 * @route '/admin/dashboard/chart-data'
 */
    const getChartDataForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getChartData.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\AdminDashboardController::getChartData
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:195
 * @route '/admin/dashboard/chart-data'
 */
        getChartDataForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getChartData.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\AdminDashboardController::getChartData
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:195
 * @route '/admin/dashboard/chart-data'
 */
        getChartDataForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getChartData.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getChartData.form = getChartDataForm
const AdminDashboardController = { view_dashboard, getStats, getChartData }

export default AdminDashboardController