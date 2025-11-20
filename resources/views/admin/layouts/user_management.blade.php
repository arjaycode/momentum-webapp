@extends('admin.main')

@section('title', 'User Management - Momentum')
@section('active-link', 'users')
@section('page-title', 'User Management')
@section('page-description', 'Manage users, roles, and permissions')
@section('css-file', 'user-management.css')
@section('js-file', 'user-management.js')

@section('content')
<!-- Main Content -->
<main class="main-content">
  <!-- Stats Cards -->
  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-header">
        <div class="stat-info">
          <span class="stat-label">Total Users</span>
          <div class="stat-value">2,847</div>
          <div class="stat-change positive">
            <i class="fas fa-arrow-up"></i> 12% from last month
          </div>
        </div>
        <div class="stat-icon blue">
          <i class="fas fa-users"></i>
        </div>
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-header">
        <div class="stat-info">
          <span class="stat-label">Active Users</span>
          <div class="stat-value">2,234</div>
          <div class="stat-change positive">
            <i class="fas fa-arrow-up"></i> 8% from last month
          </div>
        </div>
        <div class="stat-icon green">
          <i class="fas fa-user-check"></i>
        </div>
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-header">
        <div class="stat-info">
          <span class="stat-label">New Users</span>
          <div class="stat-value">156</div>
          <div class="stat-change negative">
            <i class="fas fa-arrow-down"></i> 3% from last month
          </div>
        </div>
        <div class="stat-icon orange">
          <i class="fas fa-user-plus"></i>
        </div>
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-header">
        <div class="stat-info">
          <span class="stat-label">Blocked Users</span>
          <div class="stat-value">23</div>
          <div class="stat-change positive">
            <i class="fas fa-arrow-up"></i> 2 new blocks
          </div>
        </div>
        <div class="stat-icon red">
          <i class="fas fa-user-times"></i>
        </div>
      </div>
    </div>
  </div>

  <!-- User Table Section -->
  <div class="table-card">
    <div class="table-header">
      <div class="table-title-section">
        <h3 class="table-title">All Users</h3>
        <p class="table-subtitle">
          Manage user accounts and permissions
        </p>
      </div>
      <button class="btn-primary">
        <i class="fas fa-plus"></i> Add New User
      </button>
    </div>

    <div class="table-controls">
      <div class="search-box-container">
        <i class="fas fa-search"></i>
        <input type="text" placeholder="Search users..." id="userSearch" />
      </div>
      <div class="filters">
        <select class="filter-select" id="roleFilter">
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        <select class="filter-select" id="statusFilter">
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>
    </div>

    <div class="table-wrapper">
      <table class="user-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Last Login</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody id="userTableBody">
          <tr>
            <td>
              <div class="user-cell">
                <img src="https://i.pravatar.cc/40?img=1" alt="Sarah Johnson" class="user-avatar" />
                <div class="user-details">
                  <div class="user-name">Sarah Johnson</div>
                  <div class="user-id">ID: #001</div>
                </div>
              </div>
            </td>
            <td>sarah.johnson@email.com</td>
            <td><span class="role-badge admin">Admin</span></td>
            <td><span class="status-badge active">Active</span></td>
            <td>2 hours ago</td>
            <td>
              <div class="action-buttons">
                <button class="btn-action btn-edit">
                  <i class="fas fa-edit"></i> Edit User
                </button>
                <button class="btn-action btn-delete">
                  <i class="fas fa-trash"></i> Delete User
                </button>
                <button class="btn-action btn-ban">
                  <i class="fas fa-ban"></i> Ban User
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="user-cell">
                <img src="https://i.pravatar.cc/40?img=2" alt="Johnson" class="user-avatar" />
                <div class="user-details">
                  <div class="user-name">Johnson</div>
                  <div class="user-id">ID: #001</div>
                </div>
              </div>
            </td>
            <td>sarah.johnson@email.com</td>
            <td><span class="role-badge user">User</span></td>
            <td><span class="status-badge active">Active</span></td>
            <td>2 hours ago</td>
            <td>
              <div class="action-buttons">
                <button class="btn-action btn-edit">
                  <i class="fas fa-edit"></i> Edit User
                </button>
                <button class="btn-action btn-delete">
                  <i class="fas fa-trash"></i> Delete User
                </button>
                <button class="btn-action btn-ban">
                  <i class="fas fa-ban"></i> Ban User
                </button>
              </div>
            </td>
          </tr>
          <tr>

            <td>
              <div class="user-cell">
                <img src="https://i.pravatar.cc/40?img=3" alt="Sarah Johnson" class="user-avatar" />
                <div class="user-details">
                  <div class="user-name">Sarah Johnson</div>
                  <div class="user-id">ID: #001</div>
                </div>
              </div>
            </td>
            <td>sarah.johnson@email.com</td>
            <td><span class="role-badge user">User</span></td>
            <td><span class="status-badge active">Active</span></td>
            <td>2 hours ago</td>
            <td>
              <div class="action-buttons">
                <button class="btn-action btn-edit">
                  <i class="fas fa-edit"></i> Edit User
                </button>
                <button class="btn-action btn-delete">
                  <i class="fas fa-trash"></i> Delete User
                </button>
                <button class="btn-action btn-ban">
                  <i class="fas fa-ban"></i> Ban User
                </button>
              </div>
            </td>
          </tr>
          <tr>

            <td>
              <div class="user-cell">
                <img src="https://i.pravatar.cc/40?img=4" alt="Sarah Johnson" class="user-avatar" />
                <div class="user-details">
                  <div class="user-name">Sarah Johnson</div>
                  <div class="user-id">ID: #001</div>
                </div>
              </div>
            </td>
            <td></td>
            <td><span class="role-badge user">User</span></td>
            <td><span class="status-badge active">Active</span></td>
            <td>2 hours ago</td>
            <td>
              <div class="action-buttons">
                <button class="btn-action btn-edit">
                  <i class="fas fa-edit"></i> Edit User
                </button>
                <button class="btn-action btn-delete">
                  <i class="fas fa-trash"></i> Delete User
                </button>
                <button class="btn-action btn-ban">
                  <i class="fas fa-ban"></i> Ban User
                </button>
              </div>
            </td>
          </tr>
          <tr>

            <td>
              <div class="user-cell">
                <img src="https://i.pravatar.cc/40?img=5" alt="Sarah Johnson" class="user-avatar" />
                <div class="user-details">
                  <div class="user-name">Sarah Johnson</div>
                  <div class="user-id">ID: #001</div>
                </div>
              </div>
            </td>
            <td>sarah.johnson@email.com</td>
            <td><span class="role-badge user">User</span></td>
            <td><span class="status-badge active">Active</span></td>
            <td>2 hours ago</td>
            <td>
              <div class="action-buttons">
                <button class="btn-action btn-edit">
                  <i class="fas fa-edit"></i> Edit User
                </button>
                <button class="btn-action btn-delete">
                  <i class="fas fa-trash"></i> Delete User
                </button>
                <button class="btn-action btn-ban">
                  <i class="fas fa-ban"></i> Ban User
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="table-footer">
      <div class="table-info">Showing 1 to 5 of 2,847 results</div>
      <div class="pagination">
        <button class="pagination-btn" disabled>Previous</button>
        <button class="pagination-btn active">1</button>
        <button class="pagination-btn">2</button>
        <button class="pagination-btn">3</button>
        <button class="pagination-btn">Next</button>
      </div>
    </div>
  </div>
</main>
@endsection

@section('modals')
<!-- MODAL -->
<!-- Delete Modal Overlay -->
<div class="delete-modal-overlay" id="deleteModalOverlay"></div>

<!-- Delete Modal -->
<div class="delete-modal" id="deleteModal">
  <div class="delete-modal-icon"></div>

  <h3 class="delete-modal-title">Are you sure to delete this user?</h3>

  <div class="delete-user-info">
    <img src="" alt="User" class="delete-user-avatar" id="deleteUserAvatar" />
    <div class="delete-user-details">
      <div class="delete-user-name" id="deleteUserName"></div>
      <div class="delete-user-id" id="deleteUserId"></div>
    </div>
    <div class="delete-user-email" id="deleteUserEmail"></div>
  </div>

  <div class="delete-modal-actions">
    <button class="delete-modal-btn delete-modal-cancel" id="deleteModalCancel">
      Cancel
    </button>
    <button class="delete-modal-btn delete-modal-confirm" id="deleteModalConfirm">
      Confirm
    </button>
  </div>
</div>
<!-- BAN MODAL -->
<!-- Ban Modal Overlay -->
<div class="ban-modal-overlay" id="banModalOverlay"></div>

<!-- Ban Modal -->
<div class="ban-modal" id="banModal">
  <div class="ban-modal-icon"></div>

  <h3 class="ban-modal-title">Are you sure to ban this user?</h3>

  <div class="ban-user-info">
    <img src="" alt="User" class="ban-user-avatar" id="banUserAvatar" />
    <div class="ban-user-details">
      <div class="ban-user-name" id="banUserName"></div>
      <div class="ban-user-id" id="banUserId"></div>
    </div>
    <div class="ban-user-email" id="banUserEmail"></div>
  </div>

  <div class="ban-reason-group">
    <label class="ban-reason-label" for="banReason">Reason</label>
    <textarea class="ban-reason-textarea" id="banReason" placeholder="Enter reason..." rows="4"></textarea>
    <div class="ban-error-message" id="banReasonError">
      Please provide a reason for banning this user.
    </div>
  </div>

  <div class="ban-modal-actions">
    <button class="ban-modal-btn ban-modal-cancel" id="banModalCancel">
      Cancel
    </button>
    <button class="ban-modal-btn ban-modal-confirm" id="banModalConfirm">
      Confirm
    </button>
  </div>
</div>
@endsection
