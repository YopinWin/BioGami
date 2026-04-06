<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class LeaderboardController extends Controller
{
    public function index()
    {
        $data = DB::table('user_progress')
            ->join('users', 'users.id', '=', 'user_progress.user_id')
            ->select(
                'users.name as name',
                DB::raw('AVG(user_progress.nilai) as rata')
            )
            ->groupBy('users.id', 'users.name')
            ->orderByDesc('rata')
            ->get();

        return view('biogami.leaderboard', compact('data'));
    }
}