@props([
'pageTitle' => 'Page Title',
'description' => ''
])

<header class="header">
  <div class="header-left">
    <h1 class="page-title">{!! $pageTitle !!}</h1>

    @if ($description)
    <p class="page-subtitle">
      {!! $description !!}
    </p>
    @endif
  </div>

  <div class="header-right">
    <button class="icon-btn">
      <i class="fas fa-bell"></i>
    </button>

    <span class="date-display">
      {{ now()->format('l, F d, Y') }}
    </span>
  </div>
</header>
