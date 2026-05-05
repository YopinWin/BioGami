<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class LeaderboardController extends Controller
{
    public function index()
    {
        $data = DB::table('user_progress')
            ->join('users', 'users.id', '=', 'user_progress.user_id')
            ->select(
                'users.name as name',
                'user_progress.user_id',
                DB::raw('AVG(user_progress.nilai) as rata')
            )
            ->groupBy('users.id', 'users.name', 'user_progress.user_id')
            ->orderByDesc('rata')
            ->get();

        return Inertia::render('Leaderboard', compact('data'));
    }
}