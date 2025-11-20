<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>@yield('title')</title>
  <link rel="stylesheet" href="{{ asset('AdminSide/css/dashboard.css') }}" />
  <link rel="stylesheet" href="{{ asset('AdminSide/css/sidebar.css') }}" />
  <link rel="stylesheet" href="{{ asset('AdminSide/css/header.css') }}" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
</head>
<body>
  <div class="container">
    @php
    $activePage = trim($__env->yieldContent('active-link'));
    $pageTitle = trim($__env->yieldContent('page-title'));
    $description = trim($__env->yieldContent('page-description'));
    @endphp
    <x-admin.sidebar :active="$activePage" />
    <div class="main-container">
      <x-admin.header :pageTitle="$pageTitle" :description="$description" />
      @yield('content')
    </div>
  </div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js"></script>
  <script src="{{ asset('AdminSide/js/dashboard.js') }}"></script>
</body>
</html>
