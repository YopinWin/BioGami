<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('soal', function (Blueprint $table) {
            // Add tipe: 'pre' or 'post'
            $table->enum('tipe', ['pre', 'post'])->default('pre')->after('materi_id');
        });
    }

    public function down(): void
    {
        Schema::table('soal', function (Blueprint $table) {
            $table->dropColumn('tipe');
        });
    }
};
