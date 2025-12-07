<?php

namespace App\Http\Controllers\Notes;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class NoteController extends Controller
{
    //
    public function index()
    {
        return view('admin.layouts.note_management');
    }

    public function create()
    {
        return view('admin.layouts.note_add');
    }

    public function edit()
    {
        return view('admin.layouts.note_edit');
    }

    public function delete() {}
}
