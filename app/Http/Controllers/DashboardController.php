<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $userId = auth()->id();

        $data = DB::table('user_progress')
            ->where('user_id', $userId)
            ->get();

        $avg = $data->avg('nilai');

        $tanaman = app(\App\Http\Controllers\MateriController::class)
            ->getAvatarTanaman($userId);

        return Inertia::render('Dashboard', compact('avg', 'tanaman'));
    }

    public function leaderboard()
    {
        $data = DB::table('user_progress')
            ->join('users', 'users.id', '=', 'user_progress.user_id')
            ->select(
                'users.name',
                'user_progress.user_id',
                DB::raw('AVG(nilai) as rata')
            )
            ->groupBy('user_progress.user_id', 'users.name')
            ->orderByDesc('rata')
            ->get();

        return Inertia::render('Leaderboard', compact('data'));
    }

    public function grafik()
    {
        $userId = auth()->id();

        $data = DB::table('materi')
            ->leftJoin('user_progress as pre', function($join) use ($userId) {
                $join->on('materi.id', '=', 'pre.materi_id')
                     ->where('pre.user_id', '=', $userId)
                     ->whereRaw("pre.tipe = 'pre'");
            })
            ->leftJoin('user_progress as post', function($join) use ($userId) {
                $join->on('materi.id', '=', 'post.materi_id')
                     ->where('post.user_id', '=', $userId)
                     ->whereRaw("post.tipe = 'post'");
            })
            ->select(
                'materi.pertemuan_ke',
                DB::raw('COALESCE(pre.nilai, 0) as pre'),
                DB::raw('COALESCE(post.nilai, 0) as post')
            )
            ->orderBy('materi.pertemuan_ke')
            ->get();

        return Inertia::render('Grafik', compact('data'));
    }
}