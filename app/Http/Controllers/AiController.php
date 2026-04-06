<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AIController extends Controller
{
    public function ask(Request $request)
    {
        $q = strtolower($request->question);

        // 🔥 Ambil semua materi
        $materiList = DB::table('materi')->get();

        $bestMatch = null;
        $highestScore = 0;

        foreach ($materiList as $materi) {

            $text = strtolower(
                $materi->judul . ' ' . $materi->deskripsi
            );

            similar_text($q, $text, $percent);

            if ($percent > $highestScore) {
                $highestScore = $percent;
                $bestMatch = $materi;
            }
        }

        // 🔥 Kalau ketemu materi relevan
        if ($bestMatch && $highestScore > 10) {

            return response()->json([
                'jawaban' => "📚 Berdasarkan materi:\n\n" .
                    $bestMatch->judul . "\n\n" .
                    $bestMatch->deskripsi,
                'score' => round($highestScore, 2)
            ]);
        }

        // 🔥 fallback kalau ga ketemu
        return response()->json([
            'jawaban' => "🤖 Maaf, saya belum menemukan jawaban yang sesuai dengan materi yang tersedia.",
            'score' => 0
        ]);
    }
}