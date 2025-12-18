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
    <span class="date-display">
      {{ now()->format('l, F d, Y') }}
    </span>
  </div>
</header>
