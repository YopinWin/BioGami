<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('user_progress', function (Blueprint $table) {
            // Add tipe column: 'pre' or 'post'
            $table->string('tipe', 10)->default('pre')->after('materi_id');
        });

        // Update existing records — assume all old records are 'post' (completed)
        DB::table('user_progress')->whereNull('tipe')->orWhere('tipe', '')->update(['tipe' => 'post']);
    }

    public function down(): void
    {
        Schema::table('user_progress', function (Blueprint $table) {
            $table->dropColumn('tipe');
        });
    }
};
