<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        // 🔥 WAJIB
        $userId = auth()->id();

        // ambil data user saja
        $data = DB::table('user_progress')
            ->where('user_id', $userId)
            ->get();

        // rata-rata nilai
        $avg = $data->avg('nilai');

        // avatar tanaman
        $tanaman = app(\App\Http\Controllers\MateriController::class)
            ->getAvatarTanaman($userId);

        return view('biogami.dashboard', compact('avg', 'tanaman'));
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

        return view('biogami.leaderboard', compact('data'));
    }

    public function grafik()
    {
        $userId = auth()->id();

        $data = DB::table('user_progress')
            ->join('materi', 'materi.id', '=', 'user_progress.materi_id')
            ->where('user_progress.user_id', $userId)
            ->orderBy('materi.pertemuan_ke')
            ->get();

        $labels = $data->pluck('pertemuan_ke');
        $nilai = $data->pluck('nilai');

        return view('biogami.grafik', compact('labels', 'nilai'));
    }
}