@extends('admin.main')

@section('title', 'Add New User Note - Momentum')
@section('active-link', 'notes')
@section('page-title', 'Add New Note')
@section('page-description', 'Manage and organize user notes')
@section('css-file', 'note_add.css')
@section('js-file', 'note_add.js')

@section('content')
<!-- Main Content -->
<main class="main-content">
  <!-- Back Button -->
  <div class="back-section">
    <a class="back-btn" href="{{ route('admin.note-management') }}"><i class="fas fa-arrow-left"></i>
      Back to Notes Management</a>
  </div>
  <div class="form-container">
    <form action="{{ route('admin.note-management.store') }}" method="POST">
      @csrf
      @if (session('success'))
      <div class="success-alert">
        <span class="success-icon">✓</span>
        {{ session('success') }}
      </div>
      @endif
      @if ($errors->any())
      <div>
        <ul class="msg">
          @foreach ($errors->all() as $error)
          <li class="msg error">{{ $error }}</li>
          @endforeach
        </ul>
      </div>
      @endif
      
      <div class="form-row">
        <div class="form-group">
          <label>For User <span class="required">*</span></label>
          <select name="user_id" id="userSelect" class="select-input" required>
            <option value="">Select User</option>
            @foreach($users as $user)
            <option value="{{ $user->id }}" {{ old('user_id') == $user->id ? 'selected' : '' }}>
              {{ $user->firstname }} {{ $user->lastname }} ({{ $user->email }})
            </option>
            @endforeach
          </select>
        </div>

        <div class="form-group">
          <label>For Habit (Optional)</label>
          <select name="habit_id" id="habitSelect" class="select-input">
            <option value="">Select Habit (Optional)</option>
            @foreach($habits as $habit)
            <option value="{{ $habit->id }}" {{ old('habit_id') == $habit->id ? 'selected' : '' }}>
              {{ $habit->name }} - {{ $habit->user->firstname }} {{ $habit->user->lastname }}
              @if($habit->category)
                ({{ $habit->category->title }})
              @endif
            </option>
            @endforeach
          </select>
        </div>
      </div>

      <div class="form-group">
        <label>Note <span class="required">*</span></label>
        <textarea name="message" id="noteText" class="textarea-input" placeholder="Put your note here..." required>{{ old('message') }}</textarea>
      </div>

      <div class="form-actions">
        <a href="{{ route('admin.note-management') }}" class="btn btn-cancel">Cancel</a>
        <button type="submit" class="btn btn-primary">Create Note</button>
      </div>
    </form>
  </div>
</main>
@endsection
