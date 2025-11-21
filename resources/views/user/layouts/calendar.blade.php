@extends('user.main')

@section('title', 'Calendar | Username')
@section('active-link', 'calendar')
@section('page-title', 'Calendar')
@section('page-description', 'See your Calendar')
@section('css-file', 'calendar.css')
@section('js-file', 'calendar.js')

@section('content')
<div class="calendar-content">
  <div class="calendar-container">
    <div class="calendar-header">
      <div class="month-navigation">
        <button class="nav-btn" id="prevMonth" title="Previous Month">
          ‹
        </button>
        <h2 class="current-month" id="currentMonth"></h2>
        <button class="nav-btn" id="nextMonth" title="Next Month">
          ›
        </button>
      </div>
      <div class="view-toggle">
        <button class="view-btn" data-view="week">Week</button>
        <button class="view-btn active" data-view="month">Month</button>
        <button class="view-btn" data-view="year">Year</button>
      </div>
    </div>

    <div class="calendar-grid" id="calendarGrid">
      <div class="calendar-day-header">Sun</div>
      <div class="calendar-day-header">Mon</div>
      <div class="calendar-day-header">Tue</div>
      <div class="calendar-day-header">Wed</div>
      <div class="calendar-day-header">Thu</div>
      <div class="calendar-day-header">Fri</div>
      <div class="calendar-day-header">Sat</div>
    </div>
  </div>

  <div class="legend-section">
    <h3 class="legend-title">Active Habits Key</h3>
    <div class="legend-items">
      <div class="legend-item" data-habit="exercise" tabindex="0">
        <div class="legend-dot exercise"></div>
        <span class="legend-label">Exercise (3/week)</span>
      </div>
      <div class="legend-item" data-habit="reading" tabindex="0">
        <div class="legend-dot reading"></div>
        <span class="legend-label">Reading (Daily)</span>
      </div>
      <div class="legend-item" data-habit="meditation" tabindex="0">
        <div class="legend-dot meditation"></div>
        <span class="legend-label">Meditation (4/week)</span>
      </div>
      <div class="legend-item" data-habit="water" tabindex="0">
        <div class="legend-dot water"></div>
        <span class="legend-label">Water Intake (Daily)</span>
      </div>
    </div>
  </div>
</div>

<div class="popup-overlay" id="popupOverlay"></div>
<div class="day-detail-popup" id="dayDetailPopup" role="dialog" aria-modal="true" aria-labelledby="popupTitle">
  <div class="popup-header">
    <h3 class="popup-title" id="popupTitle"></h3>
    <button class="close-popup" id="closePopup" title="Close (Escape)">
      ×
    </button>
  </div>
  <div class="popup-habits" id="popupHabits"></div>
</div>
@endsection

@section('modals')

@endsection
