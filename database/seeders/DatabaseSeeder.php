<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Seed Materi
        $materiData = [
            [
                'judul' => 'Pengenalan Sel',
                'kelas' => 'X',
                'semester' => 1,
                'pertemuan_ke' => 1,
                'konten' => "Sel adalah unit dasar kehidupan. Semua makhluk hidup terdiri dari satu atau lebih sel.\n\nTerdapat dua jenis sel utama: Prokariotik (tanpa membran inti) dan Eukariotik (memiliki membran inti).\n\nOrganel utama sel eukariotik meliputi:\n- Nukleus: pusat kendali sel\n- Mitokondria: penghasil energi (ATP)\n- Ribosom: tempat sintesis protein\n- Membran sel: pelindung dan pengatur lalu lintas zat",
                'ppt' => null,
                'video' => 'https://www.youtube.com/watch?v=URUJD5NEXC8', // Example YouTube video
            ],
            [
                'judul' => 'Metabolisme Karbohidrat',
                'kelas' => 'X',
                'semester' => 1,
                'pertemuan_ke' => 2,
                'konten' => "Metabolisme karbohidrat mencakup proses pemecahan (katabolisme) dan pembentukan (anabolisme) karbohidrat.\n\nGlikolisis adalah tahap pertama respirasi seluler yang memecah glukosa menjadi asam piruvat.\nSiklus Krebs terjadi di dalam mitokondria untuk menghasilkan energi lebih banyak.",
                'ppt' => null,
                'video' => 'https://www.youtube.com/watch?v=O5eMW4b29rg',
            ],
        ];

        foreach ($materiData as $m) {
            DB::table('materi')->updateOrInsert(
                ['kelas' => $m['kelas'], 'semester' => $m['semester'], 'pertemuan_ke' => $m['pertemuan_ke']],
                array_merge($m, ['created_at' => now(), 'updated_at' => now()])
            );
        }

        // 2. Seed Soal for Materi 1
        $materi1 = DB::table('materi')->where('kelas', 'X')->where('pertemuan_ke', 1)->first();

        if ($materi1) {
            $soalData = [
                // PRE TEST
                [
                    'materi_id' => $materi1->id,
                    'tipe' => 'pre',
                    'pertanyaan' => 'Apa bagian sel yang berfungsi sebagai pusat kendali?',
                    'a' => 'Mitokondria',
                    'b' => 'Ribosom',
                    'c' => 'Nukleus',
                    'd' => 'Membran Sel',
                    'jawaban' => 'c',
                ],
                [
                    'materi_id' => $materi1->id,
                    'tipe' => 'pre',
                    'pertanyaan' => 'Organel yang berfungsi menghasilkan energi (ATP) adalah?',
                    'a' => 'Mitokondria',
                    'b' => 'Badan Golgi',
                    'c' => 'Lisosom',
                    'd' => 'Nukleus',
                    'jawaban' => 'a',
                ],
                // POST TEST
                [
                    'materi_id' => $materi1->id,
                    'tipe' => 'post',
                    'pertanyaan' => 'Perbedaan utama sel prokariotik dan eukariotik adalah?',
                    'a' => 'Kehadiran membran inti',
                    'b' => 'Ukurannya',
                    'c' => 'Bentuknya',
                    'd' => 'Jumlah ribosom',
                    'jawaban' => 'a',
                ],
                [
                    'materi_id' => $materi1->id,
                    'tipe' => 'post',
                    'pertanyaan' => 'Tempat sintesis protein dalam sel adalah?',
                    'a' => 'Ribosom',
                    'b' => 'Nukleus',
                    'c' => 'Mitokondria',
                    'd' => 'Lisosom',
                    'jawaban' => 'a',
                ],
            ];

            foreach ($soalData as $s) {
                DB::table('soal')->updateOrInsert(
                    ['materi_id' => $s['materi_id'], 'tipe' => $s['tipe'], 'pertanyaan' => $s['pertanyaan']],
                    $s
                );
            }
        }
    }
}
