<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

// CONTROLLER
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MateriController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LeaderboardController;


/*
|--------------------------------------------------------------------------
| STATIC PAGE
|--------------------------------------------------------------------------
*/

Route::get('/team', function () {
    return view('biogami.team');
});

Route::get('/leaderboard', [LeaderboardController::class, 'index'])
    ->middleware('auth');


/*
|--------------------------------------------------------------------------
| AI ROUTE 🔥 FINAL (AKURAT + RINGKAS)
|--------------------------------------------------------------------------
*/
Route::post('/ai-ask', function (Illuminate\Http\Request $req) {

    try {

        $question = strtolower(trim($req->question ?? ''));

        if (!$question) {
            return response()->json([
                'jawaban' => 'Pertanyaan kosong'
            ]);
        }

        $materi = Illuminate\Support\Facades\DB::table('materi')->get();

        if ($materi->isEmpty()) {
            return response()->json([
                'jawaban' => 'Materi kosong'
            ]);
        }

        $stopwords = ['yang','dan','di','ke','dari','itu','adalah','yaitu','dengan','pada','untuk'];

        $keywords = explode(' ', $question);
        $keywords = array_filter($keywords, function($word) use ($stopwords){
            return !in_array($word, $stopwords) && strlen($word) > 3;
        });

        $bestMatch = null;
        $highestScore = 0;

        foreach ($materi as $m) {

            $text = strtolower(($m->judul ?? '') . ' ' . ($m->konten ?? ''));

            $score = 0;

            foreach ($keywords as $word) {
                if (str_contains($text, $word)) {
                    $score += 50;
                }
            }

            $allMatch = true;
            foreach ($keywords as $word) {
                if (!str_contains($text, $word)) {
                    $allMatch = false;
                    break;
                }
            }

            if ($allMatch && count($keywords) > 0) {
                $score += 100;
            }

            similar_text($question, $text, $percent);
            $score += ($percent * 0.5);

            if ($score > $highestScore) {
                $highestScore = $score;
                $bestMatch = $m;
            }
        }

        if ($bestMatch && $highestScore > 50) {

            $konten = $bestMatch->konten ?? '';
            $kalimat = preg_split('/(?<=[.!?])\s+/', $konten);
            $ringkasan = $kalimat[0] ?? $konten;

            return response()->json([
                'jawaban' => $ringkasan
            ]);
        }

        return response()->json([
            'jawaban' => 'Maaf, belum ada materi yang cocok.'
        ]);

    } catch (\Exception $e) {
        return response()->json([
            'jawaban' => 'Error: ' . $e->getMessage()
        ]);
    }
});

/*
|--------------------------------------------------------------------------
| HALAMAN UTAMA
|--------------------------------------------------------------------------
*/

Route::get('/', [MateriController::class, 'kelasList']);
Route::get('/materi', [MateriController::class, 'kelasList']);

//Flipbook
Route::get('/flipbook', function () {
    return view('biogami.flipbook');
});
/*
|--------------------------------------------------------------------------
| DASHBOARD
|--------------------------------------------------------------------------
*/

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware('auth')
    ->name('dashboard');


/*
|--------------------------------------------------------------------------
| MATERI (WAJIB LOGIN)
|--------------------------------------------------------------------------
*/

Route::middleware('auth')->group(function () {

    Route::get('/grafik', [MateriController::class, 'grafik']);

    Route::get('/materi/detail/{id}', [MateriController::class, 'show']);
    Route::get('/materi/detail/{id}/full', [MateriController::class, 'materiDetail']);
    Route::get('/materi/video/{id}', [MateriController::class, 'video']);

    Route::get('/materi/soal/{id}', [MateriController::class, 'soal']);
    Route::post('/materi/soal/{id}', [MateriController::class, 'submitSoal']);

    Route::get('/materi/raport/{id}', [MateriController::class, 'raport']);

    Route::post('/materi/selesai', [MateriController::class, 'selesai']);

    Route::get('/materi/{kelas}', [MateriController::class, 'kelas']);
    Route::get('/materi/{kelas}/{semester}', [MateriController::class, 'semester']);
});


/*
|--------------------------------------------------------------------------
| PROFILE
|--------------------------------------------------------------------------
*/

Route::middleware('auth')->group(function () {

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

});


/*
|--------------------------------------------------------------------------
| AUTH
|--------------------------------------------------------------------------
*/

require __DIR__.'/auth.php';