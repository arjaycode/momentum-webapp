@extends('user.main')

@section('title', 'Dashboard | Username')
@section('active-link', 'dashboard')
@section('page-title', 'Dashboard')
@section('page-description', 'Track your habits and capture your thoughts')
@section('css-file', 'dashboard.css')
@section('js-file', 'dashboard.js')

@section('content')
<!-- Stats Cards -->
<div class="stats-grid">
  <div class="stat-card">
    <div class="stat-header">
      <span class="stat-label">Active Habits</span>
      <div class="stat-icon green-icon">
        <i class="fas fa-list"></i>
      </div>
    </div>
    <div class="stat-value">8</div>
  </div>

  <div class="stat-card">
    <div class="stat-header">
      <span class="stat-label">Completion Rate</span>
      <div class="stat-icon blue-icon">
        <i class="fas fa-chart-line"></i>
      </div>
    </div>
    <div class="stat-value">87%</div>
  </div>

  <div class="stat-card">
    <div class="stat-header">
      <span class="stat-label">Current Streak</span>
      <div class="stat-icon orange-icon">
        <i class="fas fa-fire"></i>
      </div>
    </div>
    <div class="stat-value">12 days</div>
  </div>

  <div class="stat-card">
    <div class="stat-header">
      <span class="stat-label">Notes</span>
      <div class="stat-icon purple-icon">
        <i class="fas fa-note-sticky"></i>
      </div>
    </div>
    <div class="stat-value">23</div>
  </div>
</div>

<!-- Main Content Grid -->
<div class="content-grid">
  <!-- Calendar Section -->
  <div class="calendar-section">
    <div class="calendar-card">
      <div class="calendar-header">
        <h2 class="calendar-title">October 2025</h2>
        <div class="calendar-nav">
          <button class="nav-btn">
            <i class="fas fa-chevron-left"></i>
          </button>
          <button class="nav-btn">
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
      <div class="calendar-body">
        <div class="calendar-weekdays">
          <div class="weekday">S</div>
          <div class="weekday">M</div>
          <div class="weekday">T</div>
          <div class="weekday">W</div>
          <div class="weekday">T</div>
          <div class="weekday">F</div>
          <div class="weekday">S</div>
        </div>
        <div class="calendar-days">
          <div class="day"></div>
          <div class="day">1</div>
          <div class="day">2</div>
          <div class="day">3</div>
          <div class="day">4</div>
          <div class="day">5</div>
          <div class="day">6</div>
          <div class="day">7</div>
          <div class="day completed">8</div>
          <div class="day completed">9</div>
          <div class="day completed">10</div>
          <div class="day completed">11</div>
          <div class="day completed">12</div>
          <div class="day completed">13</div>
          <div class="day completed">14</div>
          <div class="day completed">15</div>
          <div class="day completed">16</div>
          <div class="day completed">17</div>
          <div class="day completed">18</div>
          <div class="day completed">19</div>
          <div class="day completed">20</div>
          <div class="day completed">21</div>
          <div class="day completed">22</div>
          <div class="day completed">23</div>
          <div class="day completed">24</div>
          <div class="day completed">25</div>
          <div class="day completed">26</div>
          <div class="day today">27</div>
          <div class="day">28</div>
          <div class="day">29</div>
          <div class="day">30</div>
          <div class="day">31</div>
        </div>
        <div class="calendar-legend">
          <div class="legend-item">
            <span class="legend-dot completed-dot"></span>
            <span class="legend-text">Completed</span>
          </div>
          <div class="legend-item">
            <span class="legend-dot today-dot"></span>
            <span class="legend-text">Today</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Today's Habits Section -->
  <div class="habits-section">
    <div class="habits-card">
      <div class="habits-header">
        <h2 class="habits-title">Today's Habits</h2>
        <span class="habits-count">8 of 12 completed</span>
      </div>
      <div class="habits-list">
        <div class="habit-item completed">
          <div class="habit-checkbox checked">
            <i class="fas fa-check"></i>
          </div>
          <div class="habit-info">
            <div class="habit-name">Morning Exercise</div>
            <div class="habit-desc">30 minutes workout</div>
          </div>
          <span class="habit-status completed-status">Completed</span>
        </div>

        <div class="habit-item">
          <div class="habit-checkbox"></div>
          <div class="habit-info">
            <div class="habit-name">Read for 20 minutes</div>
            <div class="habit-desc">Daily reading habit</div>
          </div>
          <button class="mark-done-btn">Mark Done</button>
        </div>

        <div class="habit-item completed">
          <div class="habit-checkbox checked">
            <i class="fas fa-check"></i>
          </div>
          <div class="habit-info">
            <div class="habit-name">Drink 8 glasses of water</div>
            <div class="habit-desc">Stay hydrated</div>
          </div>
          <span class="habit-status completed-status">Completed</span>
        </div>

        <div class="habit-item">
          <div class="habit-checkbox"></div>
          <div class="habit-info">
            <div class="habit-name">Meditation</div>
            <div class="habit-desc">10 minutes mindfulness</div>
          </div>
          <button class="mark-done-btn">Mark Done</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Quick Notes Section -->
  <div class="notes-section">
    <div class="notes-card">
      <div class="notes-header">
        <h2 class="notes-title">Quick Notes</h2>
        <button class="add-note-btn">
          <i class="fas fa-plus"></i>
        </button>
      </div>

      <div class="note-input-area">
        <textarea name="note-message" id="note-message" rows="4" placeholder="What's on your mind?" class="note-input"></textarea>
        <div class="note-toolbar">
          <button class="save-note-btn">Save</button>
        </div>
      </div>

      <div class="notes-list">
        <div class="note-item">
          <p class="note-text">
            Feeling great about my meditation streak! The 10-minute
            sessions are really helping me start each day with clarity
            and focus.
          </p>
          <div class="note-footer">
            <span class="note-time">Today at 7:35 AM</span>
            <div class="note-actions">
              <button class="note-action-btn">
                <i class="fas fa-pen"></i>
              </button>
              <button class="note-action-btn">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>

        <div class="note-item">
          <p class="note-text">
            Need to remember to drink more water throughout the day.
            Setting phone reminders every 2 hours.
          </p>
          <div class="note-footer">
            <span class="note-time">Yesterday at 2:15 PM</span>
            <div class="note-actions">
              <button class="note-action-btn">
                <i class="fas fa-pen"></i>
              </button>
              <button class="note-action-btn">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>

        <div class="note-item">
          <p class="note-text">
            Morning workout felt amazing! Increased my running time by 5
            minutes. Body is getting stronger each day.
          </p>
          <div class="note-footer">
            <span class="note-time">3 days ago</span>
            <div class="note-actions">
              <button class="note-action-btn">
                <i class="fas fa-pen"></i>
              </button>
              <button class="note-action-btn">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="quote-card">
        <i class="fas fa-quote-left quote-icon"></i>
        <p class="quote-text">
          "Success is the sum of small efforts repeated day in and day
          out."
        </p>
        <p class="quote-author">— Robert Collier</p>
      </div>
    </div>
  </div>
</div>
@endsection
