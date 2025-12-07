@extends('user.main')

@section('title', 'Calendar | Username')
@section('active-link', 'calendar')
@section('page-title', 'Calendar')
@section('page-description', 'See your Calendar')
@section('css-file', 'calendar.css')
@section('js-file', 'calendar.js')

@section('content')
@if (session('success'))
<div class="success-alert" style="margin: 20px; background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb; padding: 15px; border-radius: 5px; display: flex; align-items: center;">
  <span class="success-icon" style="font-weight: bold; font-size: 1.2em; margin-right: 10px;">✓</span>
  {{ session('success') }}
</div>
@endif
<div class="calendar-content">
  <div style="margin-bottom: 20px; text-align: right;">
    <a href="{{ route('user.habits.add') }}?redirect_to=calendar" class="btn btn-primary" style="display: inline-block; padding: 10px 20px; background: #007bff; color: white; text-decoration: none; border-radius: 5px;">
      <i class="fas fa-plus"></i> Add New Habit
    </a>
  </div>
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
      <!-- Legend items will be populated dynamically by JavaScript -->
      <p style="color: #999; font-size: 14px;">Loading habits...</p>
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
