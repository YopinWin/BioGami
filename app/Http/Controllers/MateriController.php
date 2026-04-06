<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MateriController extends Controller
{
    // 🔥 PILIH KELAS
    public function kelasList()
    {
        return view('biogami.materi.kelas_list');
    }

    // 🔥 PILIH SEMESTER
    public function kelas($kelas)
    {
        return view('biogami.materi.kelas', compact('kelas'));
    }

    // 🔥 LIST PERTEMUAN
    public function semester($kelas, $semester)
    {
        $userId = auth()->id();

        $materi = DB::table('materi')
            ->where('kelas', $kelas)
            ->where('semester', $semester)
            ->orderBy('pertemuan_ke')
            ->get();

        $progress = DB::table('user_progress')
            ->where('user_id', $userId)
            ->pluck('materi_id')
            ->toArray();

        $total = DB::table('user_progress')
            ->where('user_id', $userId)
            ->avg('nilai');

        return view('biogami.materi.semester', compact(
            'materi',
            'kelas',
            'semester',
            'progress',
            'total'
        ));
    }

    // 🔥 DETAIL + LOCK SYSTEM
    public function show($id)
    {
        $userId = auth()->id();

        $materi = DB::table('materi')->where('id', $id)->first();

        if (!$materi) {
            return redirect('/materi')->with('error', 'Materi tidak ditemukan');
        }

        // 🔒 LOCK SYSTEM
        if ($materi->pertemuan_ke > 1) {

            $prev = DB::table('materi')
                ->where('kelas', $materi->kelas)
                ->where('semester', $materi->semester)
                ->where('pertemuan_ke', $materi->pertemuan_ke - 1)
                ->first();

            if ($prev) {
                $done = DB::table('user_progress')
                    ->where('user_id', $userId)
                    ->where('materi_id', $prev->id)
                    ->where('status', 'selesai')
                    ->first();

                if (!$done) {
                    return redirect('/materi/'.$materi->kelas.'/'.$materi->semester)
                        ->with('error', 'Selesaikan pertemuan sebelumnya dulu!');
                }
            }
        }

        return view('biogami.materi.show', compact('materi'));
    }

    // 🔥 SOAL (PRE & POST)
    public function soal(Request $request, $id)
    {
        $tipe = $request->tipe ?? $request->type ?? 'pre';
        $tipe = strtolower(trim($tipe));

        $materi = DB::table('materi')->where('id', $id)->first();

        if (!$materi) {
            return redirect('/materi')->with('error', 'Materi tidak ditemukan');
        }

        $soal = DB::table('soal')
            ->where('materi_id', $id)
            ->where('tipe', $tipe)
            ->get();

        return view('biogami.materi.soal', compact('materi','soal','id','tipe'));
    }

    // 🔥 SUBMIT SOAL (SUDAH SUPPORT PRE & POST)
    public function submitSoal(Request $request, $id)
    {
        $userId = auth()->id();
        $jawabanUser = $request->jawaban;

        if (!$jawabanUser) {
            return back()->with('error', 'Jawaban belum dipilih!');
        }

        // 🔥 TAMBAHAN (TIDAK MERUSAK LOGIC LAMA)
        $tipe = $request->tipe ?? $request->type ?? 'pre';
        $tipe = strtolower(trim($tipe));

        $benar = 0;
        $total = count($jawabanUser);

        foreach ($jawabanUser as $soal_id => $jwb) {

            $soal = DB::table('soal')->where('id', $soal_id)->first();

            if ($soal && strtolower($soal->jawaban) == strtolower($jwb)) {
                $benar++;
            }
        }

        $nilai = ($total > 0) ? ($benar / $total) * 100 : 0;

        // 🔥 UPDATE TANPA MERUSAK DATA LAMA
        DB::table('user_progress')->updateOrInsert(
            [
                'user_id' => $userId,
                'materi_id' => $id,
                'tipe' => $tipe // 🔥 TAMBAHAN
            ],
            [
                'nilai' => $nilai,
                'status' => 'selesai'
            ]
        );

        return redirect('/materi/raport/'.$id);
    }

    // 🔥 MATERI DETAIL
    public function materiDetail($id)
    {
        $materi = DB::table('materi')->where('id', $id)->first();
        return view('biogami.materi.materi_detail', compact('materi'));
    }

    // 🔥 VIDEO
    public function video($id)
    {
        $materi = DB::table('materi')->where('id', $id)->first();
        return view('biogami.materi.video', compact('materi'));
    }

    // 🔥 RAPORT
    public function raport($id)
{
    $userId = auth()->id();

    $materi = DB::table('materi')->where('id', $id)->first();

    // 🔥 AMBIL SEMUA DATA PRE & POST
    $data = DB::table('user_progress')
        ->where('materi_id', $id)
        ->where('user_id', $userId)
        ->get();

    // 🔥 PISAHKAN
    $pre = $data->firstWhere('tipe','pre')->nilai ?? 0;
    $post = $data->firstWhere('tipe','post')->nilai ?? 0;

    return view('biogami.materi.raport', compact('materi','pre','post'));
}

    // 🌱 LEVEL TANAMAN
    public function levelTanaman($nilai)
    {
        if ($nilai < 40) return "🌰 Biji";
        elseif ($nilai < 60) return "🌱 Tunas";
        elseif ($nilai < 75) return "🌿 Tanaman kecil";
        elseif ($nilai < 90) return "🌳 Pohon kecil";
        else return "🌳✨ Pohon besar";
    }

    // 🌱 AVATAR GLOBAL
    public function getAvatarTanaman($userId)
    {
        $avg = DB::table('user_progress')
            ->where('user_id', $userId)
            ->avg('nilai');

        if (!$avg) return "🌰";

        if ($avg < 40) return "🌰";
        elseif ($avg < 60) return "🌱";
        elseif ($avg < 75) return "🌿";
        elseif ($avg < 90) return "🌳";
        else return "🌳✨";
    }

    // 🔥 GRAFIK (TAMBAHAN TANPA MENGGANGGU LOGIC LAMA)
    public function grafik()
    {
        $userId = auth()->id();

        $data = DB::table('materi')
            ->leftJoin('user_progress as pre', function($join) use ($userId) {
                $join->on('materi.id','=','pre.materi_id')
                     ->where('pre.user_id',$userId)
                     ->where('pre.tipe','pre');
            })
            ->leftJoin('user_progress as post', function($join) use ($userId) {
                $join->on('materi.id','=','post.materi_id')
                     ->where('post.user_id',$userId)
                     ->where('post.tipe','post');
            })
            ->select(
                'materi.pertemuan_ke',
                DB::raw('COALESCE(pre.nilai,0) as pre'),
                DB::raw('COALESCE(post.nilai,0) as post')
            )
            ->orderBy('materi.pertemuan_ke')
            ->get();

        return view('biogami.grafik', compact('data'));
    }
}