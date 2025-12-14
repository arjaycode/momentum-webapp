<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Habit;
use App\Models\HabitsCategory;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Exception;

class AdminHabitController extends Controller
{
    public function index()
    {
        $habits = Habit::with(['user', 'category'])
            ->orderBy('created_at', 'desc')
            ->get();
        
        $categories = HabitsCategory::all();
        $users = User::where('role', 'user')->get();

        return view('admin.layouts.habits_list', compact('habits', 'categories', 'users'));
    }

    public function create()
    {
        $categories = HabitsCategory::where('status', 'active')->get();
        $users = User::where('role', 'user')->get();
        
        return view('admin.layouts.habits_add', compact('categories', 'users'));
    }

    public function store(Request $request)
    {
        // #region agent log
        @file_put_contents('c:\xampp\htdocs\momentum-webapp\.cursor\debug.log', json_encode(['sessionId'=>'debug-session','runId'=>'run1','hypothesisId'=>'B','location'=>'AdminHabitController.php:34','message'=>'store() entry','data'=>['request_keys'=>array_keys($request->all()),'has_enable_push'=>$request->has('enable_push_notifications')],'timestamp'=>round(microtime(true)*1000)])."\n", FILE_APPEND | LOCK_EX);
        // #endregion
        try {
            $validated = $request->validate([
                'user_id' => 'required|exists:users,id',
                'category_id' => 'nullable|exists:habits_categories,id',
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'enable_push_notifications' => 'nullable|boolean',
                'target_days' => 'required|array|min:1',
                'target_days.*' => 'in:Mon,Tue,Wed,Thu,Fri,Sat,Sun',
            ]);
            // #region agent log
            @file_put_contents('c:\xampp\htdocs\momentum-webapp\.cursor\debug.log', json_encode(['sessionId'=>'debug-session','runId'=>'run1','hypothesisId'=>'C','location'=>'AdminHabitController.php:49','message'=>'store() validation passed','data'=>['validated_keys'=>array_keys($validated),'target_days'=>$validated['target_days']??null],'timestamp'=>round(microtime(true)*1000)])."\n", FILE_APPEND | LOCK_EX);
            // #endregion

            // Handle checkbox
            $validated['enable_push_notifications'] = $request->has('enable_push_notifications') ? true : false;
            // #region agent log
            @file_put_contents('c:\xampp\htdocs\momentum-webapp\.cursor\debug.log', json_encode(['sessionId'=>'debug-session','runId'=>'run1','hypothesisId'=>'D','location'=>'AdminHabitController.php:54','message'=>'store() checkbox handled','data'=>['enable_push_notifications'=>$validated['enable_push_notifications']],'timestamp'=>round(microtime(true)*1000)])."\n", FILE_APPEND | LOCK_EX);
            // #endregion
            
            // Map 'name' to 'habit_name' for database
            $validated['habit_name'] = $validated['name'];
            unset($validated['name']);
            // #region agent log
            @file_put_contents('c:\xampp\htdocs\momentum-webapp\.cursor\debug.log', json_encode(['sessionId'=>'debug-session','runId'=>'run1','hypothesisId'=>'E','location'=>'AdminHabitController.php:61','message'=>'store() name mapping done','data'=>['habit_name'=>$validated['habit_name']??null,'has_name'=>isset($validated['name'])],'timestamp'=>round(microtime(true)*1000)])."\n", FILE_APPEND | LOCK_EX);
            // #endregion

            Habit::create($validated);
            // #region agent log
            @file_put_contents('c:\xampp\htdocs\momentum-webapp\.cursor\debug.log', json_encode(['sessionId'=>'debug-session','runId'=>'run1','hypothesisId'=>'B','location'=>'AdminHabitController.php:66','message'=>'store() create successful','data'=>[],'timestamp'=>round(microtime(true)*1000)])."\n", FILE_APPEND | LOCK_EX);
            // #endregion

            return redirect()->route('admin.habits.index')->with('success', 'Habit created successfully.');
        } catch (Exception $e) {
            // #region agent log
            @file_put_contents('c:\xampp\htdocs\momentum-webapp\.cursor\debug.log', json_encode(['sessionId'=>'debug-session','runId'=>'run1','hypothesisId'=>'B','location'=>'AdminHabitController.php:72','message'=>'store() exception','data'=>['error'=>$e->getMessage(),'class'=>get_class($e)],'timestamp'=>round(microtime(true)*1000)])."\n", FILE_APPEND | LOCK_EX);
            // #endregion
            return redirect()->back()
                ->withInput()
                ->withErrors(['error' => 'Failed to create habit: ' . $e->getMessage()]);
        }
    }

    public function edit($id)
    {
        $habit = Habit::with(['user', 'category'])->findOrFail($id);
        $categories = HabitsCategory::where('status', 'active')->get();
        $users = User::where('role', 'user')->get();
        $targetDays = $habit->target_days ?? [];

        return view('admin.layouts.habits_edit', compact('habit', 'categories', 'users', 'targetDays'));
    }

    public function update(Request $request, $id)
    {
        // #region agent log
        @file_put_contents('c:\xampp\htdocs\momentum-webapp\.cursor\debug.log', json_encode(['sessionId'=>'debug-session','runId'=>'run1','hypothesisId'=>'B','location'=>'AdminHabitController.php:92','message'=>'update() entry','data'=>['id'=>$id,'request_keys'=>array_keys($request->all())],'timestamp'=>round(microtime(true)*1000)])."\n", FILE_APPEND | LOCK_EX);
        // #endregion
        try {
            $habit = Habit::findOrFail($id);

            $validated = $request->validate([
                'user_id' => 'required|exists:users,id',
                'category_id' => 'nullable|exists:habits_categories,id',
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'enable_push_notifications' => 'nullable|boolean',
                'target_days' => 'required|array|min:1',
                'target_days.*' => 'in:Mon,Tue,Wed,Thu,Fri,Sat,Sun',
            ]);
            // #region agent log
            @file_put_contents('c:\xampp\htdocs\momentum-webapp\.cursor\debug.log', json_encode(['sessionId'=>'debug-session','runId'=>'run1','hypothesisId'=>'C','location'=>'AdminHabitController.php:108','message'=>'update() validation passed','data'=>['target_days'=>$validated['target_days']??null],'timestamp'=>round(microtime(true)*1000)])."\n", FILE_APPEND | LOCK_EX);
            // #endregion

            // Handle checkbox
            $validated['enable_push_notifications'] = $request->has('enable_push_notifications') ? true : false;
            // #region agent log
            @file_put_contents('c:\xampp\htdocs\momentum-webapp\.cursor\debug.log', json_encode(['sessionId'=>'debug-session','runId'=>'run1','hypothesisId'=>'D','location'=>'AdminHabitController.php:114','message'=>'update() checkbox handled','data'=>['enable_push_notifications'=>$validated['enable_push_notifications']],'timestamp'=>round(microtime(true)*1000)])."\n", FILE_APPEND | LOCK_EX);
            // #endregion
            
            // Map 'name' to 'habit_name' for database
            $validated['habit_name'] = $validated['name'];
            unset($validated['name']);
            // #region agent log
            @file_put_contents('c:\xampp\htdocs\momentum-webapp\.cursor\debug.log', json_encode(['sessionId'=>'debug-session','runId'=>'run1','hypothesisId'=>'E','location'=>'AdminHabitController.php:122','message'=>'update() name mapping done','data'=>['habit_name'=>$validated['habit_name']??null],'timestamp'=>round(microtime(true)*1000)])."\n", FILE_APPEND | LOCK_EX);
            // #endregion

            $habit->update($validated);
            // #region agent log
            @file_put_contents('c:\xampp\htdocs\momentum-webapp\.cursor\debug.log', json_encode(['sessionId'=>'debug-session','runId'=>'run1','hypothesisId'=>'B','location'=>'AdminHabitController.php:126','message'=>'update() update successful','data'=>[],'timestamp'=>round(microtime(true)*1000)])."\n", FILE_APPEND | LOCK_EX);
            // #endregion

            return redirect()->route('admin.habits.index')->with('success', 'Habit updated successfully.');
        } catch (Exception $e) {
            // #region agent log
            @file_put_contents('c:\xampp\htdocs\momentum-webapp\.cursor\debug.log', json_encode(['sessionId'=>'debug-session','runId'=>'run1','hypothesisId'=>'B','location'=>'AdminHabitController.php:132','message'=>'update() exception','data'=>['error'=>$e->getMessage(),'class'=>get_class($e)],'timestamp'=>round(microtime(true)*1000)])."\n", FILE_APPEND | LOCK_EX);
            // #endregion
            return redirect()->back()
                ->withInput()
                ->withErrors(['error' => 'Failed to update habit: ' . $e->getMessage()]);
        }
    }

    public function destroy($id)
    {
        // #region agent log
        $logDir = base_path('.cursor');
        if (!is_dir($logDir)) {
            @mkdir($logDir, 0755, true);
        }
        $logPath = $logDir . DIRECTORY_SEPARATOR . 'debug.log';
        $logData = ['sessionId'=>'debug-session','runId'=>'run1','hypothesisId'=>'A','location'=>'AdminHabitController.php:143','message'=>'destroy() entry','data'=>['id'=>$id],'timestamp'=>round(microtime(true)*1000)];
        @file_put_contents($logPath, json_encode($logData)."\n", FILE_APPEND | LOCK_EX);
        error_log('DEBUG: destroy() entry - id: ' . $id);
        Log::info('DEBUG: destroy() entry', ['id' => $id]);
        // #endregion
        try {
            $habit = Habit::findOrFail($id);
            // #region agent log
            $habitNameRaw = isset($habit->attributes['habit_name']) ? $habit->attributes['habit_name'] : null;
            $logData = ['sessionId'=>'debug-session','runId'=>'run1','hypothesisId'=>'A','location'=>'AdminHabitController.php:156','message'=>'destroy() habit found','data'=>['habit_id'=>$habit->id,'habit_name_col'=>$habitNameRaw,'name_via_accessor'=>$habit->name??null,'attributes_keys'=>array_keys($habit->getAttributes())],'timestamp'=>round(microtime(true)*1000)];
            @file_put_contents($logPath, json_encode($logData)."\n", FILE_APPEND | LOCK_EX);
            error_log('DEBUG: destroy() habit found - id: ' . $habit->id . ', habit_name: ' . ($habitNameRaw ?? 'null'));
            Log::info('DEBUG: destroy() habit found', ['habit_id' => $habit->id, 'habit_name' => $habitNameRaw ?? 'null', 'name_accessor' => $habit->name ?? 'null']);
            // #endregion
            // Access the database column directly from attributes array
            $habitName = isset($habit->attributes['habit_name']) ? $habit->attributes['habit_name'] : ($habit->habit_name ?? 'Unknown');
            // #region agent log
            $logData = ['sessionId'=>'debug-session','runId'=>'run1','hypothesisId'=>'A','location'=>'AdminHabitController.php:163','message'=>'destroy() name accessed','data'=>['habitName'=>$habitName,'is_null'=>is_null($habitName),'is_empty'=>empty($habitName)],'timestamp'=>round(microtime(true)*1000)];
            @file_put_contents($logPath, json_encode($logData)."\n", FILE_APPEND | LOCK_EX);
            error_log('DEBUG: destroy() name accessed - habitName: ' . $habitName);
            Log::info('DEBUG: destroy() name accessed', ['habitName' => $habitName]);
            // #endregion
            $habit->delete();
            // #region agent log
            $logData = ['sessionId'=>'debug-session','runId'=>'run1','hypothesisId'=>'A','location'=>'AdminHabitController.php:169','message'=>'destroy() delete successful','data'=>[],'timestamp'=>round(microtime(true)*1000)];
            @file_put_contents($logPath, json_encode($logData)."\n", FILE_APPEND | LOCK_EX);
            error_log('DEBUG: destroy() delete successful');
            Log::info('DEBUG: destroy() delete successful');
            // #endregion

            return redirect()->route('admin.habits.index')->with('success', 'Habit "' . $habitName . '" deleted successfully.');
        } catch (Exception $e) {
            // #region agent log
            $logData = ['sessionId'=>'debug-session','runId'=>'run1','hypothesisId'=>'A','location'=>'AdminHabitController.php:175','message'=>'destroy() exception','data'=>['error'=>$e->getMessage(),'class'=>get_class($e),'trace'=>$e->getTraceAsString()],'timestamp'=>round(microtime(true)*1000)];
            @file_put_contents($logPath, json_encode($logData)."\n", FILE_APPEND | LOCK_EX);
            error_log('DEBUG: destroy() exception - ' . $e->getMessage());
            Log::error('DEBUG: destroy() exception', ['error' => $e->getMessage(), 'class' => get_class($e)]);
            // #endregion
            return redirect()->back()->withErrors(['error' => 'Failed to delete habit: ' . $e->getMessage()]);
        }
    }
}






