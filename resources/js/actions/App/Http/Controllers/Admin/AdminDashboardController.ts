import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\AdminDashboardController::view_dashboard
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:16
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
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:16
 * @route '/admin/dashboard'
 */
view_dashboard.url = (options?: RouteQueryOptions) => {
    return view_dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminDashboardController::view_dashboard
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:16
 * @route '/admin/dashboard'
 */
view_dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: view_dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AdminDashboardController::view_dashboard
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:16
 * @route '/admin/dashboard'
 */
view_dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: view_dashboard.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\AdminDashboardController::getStats
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:169
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
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:169
 * @route '/admin/dashboard/stats'
 */
getStats.url = (options?: RouteQueryOptions) => {
    return getStats.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminDashboardController::getStats
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:169
 * @route '/admin/dashboard/stats'
 */
getStats.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getStats.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AdminDashboardController::getStats
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:169
 * @route '/admin/dashboard/stats'
 */
getStats.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getStats.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\AdminDashboardController::getChartData
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:194
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
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:194
 * @route '/admin/dashboard/chart-data'
 */
getChartData.url = (options?: RouteQueryOptions) => {
    return getChartData.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminDashboardController::getChartData
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:194
 * @route '/admin/dashboard/chart-data'
 */
getChartData.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getChartData.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AdminDashboardController::getChartData
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:194
 * @route '/admin/dashboard/chart-data'
 */
getChartData.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getChartData.url(options),
    method: 'head',
})
const AdminDashboardController = { view_dashboard, getStats, getChartData }

export default AdminDashboardController