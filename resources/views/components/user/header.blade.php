@props([
'pageTitle' => 'Dashboard',
'pageDescription' => ''
])

<header class="main-header">
  <div class="header-left">
    <h1 class="header-title">{{ $pageTitle }}</h1>
    <p class="header-subtitle">
      {{ $pageDescription }}
    </p>
  </div>
  <div class="header-right">
    <input type="text" class="search-box" name="search-box" placeholder="Search..." />
    <button class="icon-button search-button">
      <i class="fas fa-search"></i>
    </button>
    <button class="icon-button notification-button">
      <i class="fas fa-bell"></i>
    </button>
    {{-- Uses Laravel's built-in Carbon instance to show today's date --}}
    <div class="header-date">{{ now()->format('l, F j, Y') }}</div>
  </div>
</header>
