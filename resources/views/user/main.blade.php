<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <title>@yield('title')</title>
  @php
  $cssfile = trim($__env->yieldContent('css-file'));
  $jsfile = trim($__env->yieldContent('js-file'));
  @endphp
  <link rel="stylesheet" href="{{ asset('UserSide/css/main.css') }}" />
  <link rel="stylesheet" href="{{ asset('UserSide/css/sidebar.css') }}" />
  <link rel="stylesheet" href="{{ asset('UserSide/css/header.css') }}" />
  <link rel="stylesheet" href="{{ asset('UserSide/css/'.$cssfile) }}" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
</head>
<body>
  @php
  $activePage = trim($__env->yieldContent('active-link'));
  $pageTitle = trim($__env->yieldContent('page-title'));
  $description = trim($__env->yieldContent('page-description'));
  @endphp
  <x-user.sidebar :active-page="$activePage"></x-user.sidebar>
  <div class="main-container">
    <x-user.header :page-title="$pageTitle" :page-description="$description"></x-user.header>
    <div class="main-content">
      @yield('content')
    </div>
  </div>
  @yield('modals')
  <script src="{{ asset('UserSide/js/'.$jsfile) }}"></script>
</body>
</html>
