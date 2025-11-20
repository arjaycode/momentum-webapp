<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>@yield('title')</title>
  @php
  $cssfile = trim($__env->yieldContent('css-file'));
  $jsfile = trim($__env->yieldContent('js-file'));
  @endphp
  <link rel="stylesheet" href="{{ asset('AdminSide/css/'.$cssfile) }}" />
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
  <script src="{{ asset('AdminSide/js/'.$jsfile) }}"></script>
</body>
</html>
