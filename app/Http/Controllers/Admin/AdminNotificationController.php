<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

/**
 * Admin Notification Controller
 * Handles notification operations for admin users
 */
class AdminNotificationController extends Controller
{
    /**
     * Get all notifications for the authenticated admin user
     * Returns JSON with notifications and unread count
     */
    public function index()
    {
        $user = Auth::user();
        
        $notifications = Notification::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->limit(20)
            ->get()
            ->map(function($notification) {
                return [
                    'id' => $notification->id,
                    'type' => $notification->type,
                    'title' => $notification->title,
                    'message' => $notification->message,
                    'icon' => $notification->icon,
                    'color' => $notification->color,
                    'link' => $notification->link,
                    'time' => Carbon::parse($notification->created_at)->diffForHumans(),
                    'read' => $notification->read
                ];
            })
            ->toArray();
        
        $unreadCount = Notification::where('user_id', $user->id)
            ->where('read', false)
            ->count();
        
        return response()->json([
            'success' => true,
            'notifications' => $notifications,
            'unread_count' => $unreadCount
        ]);
    }
    
    /**
     * Clear all notifications for the authenticated admin user
     */
    public function clear()
    {
        $user = Auth::user();
        
        Notification::where('user_id', $user->id)->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'All notifications cleared'
        ]);
    }
    
    /**
     * Mark a specific notification as read
     * @param int $id Notification ID
     */
    public function markAsRead($id)
    {
        $user = Auth::user();
        
        $notification = Notification::where('user_id', $user->id)
            ->where('id', $id)
            ->firstOrFail();
        
        $notification->update(['read' => true]);
        
        return response()->json([
            'success' => true,
            'message' => 'Notification marked as read'
        ]);
    }
}

