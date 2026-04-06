import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\AdminDashboardController::stats
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:170
 * @route '/admin/dashboard/stats'
 */
export const stats = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stats.url(options),
    method: 'get',
})

stats.definition = {
    methods: ["get","head"],
    url: '/admin/dashboard/stats',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AdminDashboardController::stats
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:170
 * @route '/admin/dashboard/stats'
 */
stats.url = (options?: RouteQueryOptions) => {
    return stats.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminDashboardController::stats
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:170
 * @route '/admin/dashboard/stats'
 */
stats.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stats.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AdminDashboardController::stats
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:170
 * @route '/admin/dashboard/stats'
 */
stats.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: stats.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\AdminDashboardController::stats
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:170
 * @route '/admin/dashboard/stats'
 */
    const statsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: stats.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\AdminDashboardController::stats
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:170
 * @route '/admin/dashboard/stats'
 */
        statsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: stats.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\AdminDashboardController::stats
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:170
 * @route '/admin/dashboard/stats'
 */
        statsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: stats.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    stats.form = statsForm
/**
* @see \App\Http\Controllers\Admin\AdminDashboardController::chartData
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:195
 * @route '/admin/dashboard/chart-data'
 */
export const chartData = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: chartData.url(options),
    method: 'get',
})

chartData.definition = {
    methods: ["get","head"],
    url: '/admin/dashboard/chart-data',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\AdminDashboardController::chartData
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:195
 * @route '/admin/dashboard/chart-data'
 */
chartData.url = (options?: RouteQueryOptions) => {
    return chartData.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\AdminDashboardController::chartData
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:195
 * @route '/admin/dashboard/chart-data'
 */
chartData.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: chartData.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\AdminDashboardController::chartData
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:195
 * @route '/admin/dashboard/chart-data'
 */
chartData.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: chartData.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\AdminDashboardController::chartData
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:195
 * @route '/admin/dashboard/chart-data'
 */
    const chartDataForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: chartData.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\AdminDashboardController::chartData
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:195
 * @route '/admin/dashboard/chart-data'
 */
        chartDataForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: chartData.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\AdminDashboardController::chartData
 * @see app/Http/Controllers/Admin/AdminDashboardController.php:195
 * @route '/admin/dashboard/chart-data'
 */
        chartDataForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: chartData.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    chartData.form = chartDataForm
const dashboard = {
    stats: Object.assign(stats, stats),
chartData: Object.assign(chartData, chartData),
}

export default dashboard