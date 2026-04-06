@extends('layouts.app')

@section('content')

<style>

.leaderboard-container {
    background: #ffffff;
    padding: 30px;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.08);
}

/* TITLE */
.leaderboard-title {
    font-family: 'Playfair Display', serif;
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 25px;
}

/* TABLE */
.leaderboard-table {
    width: 100%;
    border-collapse: collapse;
}

.leaderboard-table th {
    text-align: left;
    padding: 14px;
    background: #f4f8f5;
    border-bottom: 2px solid #e0e0e0;
    font-weight: 600;
    font-size: 14px;
}

.leaderboard-table td {
    padding: 14px;
    border-bottom: 1px solid #eee;
    font-size: 14px;
}

.leaderboard-table tr:hover {
    background: #f9fbfa;
}

/* RANK */
.rank {
    font-weight: 700;
    font-size: 15px;
}

.rank-1 {
    color: #fbc02d;
    font-size: 18px;
}

.rank-2 {
    color: #9e9e9e;
}

.rank-3 {
    color: #cd7f32;
}

/* USER */
.user-box {
    display: flex;
    align-items: center;
    gap: 10px;
}

.avatar {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: linear-gradient(135deg,#2e7d32,#66bb6a);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
}

/* SCORE */
.score {
    font-weight: 700;
    color: #2e7d32;
}

/* DARK MODE */
body.dark .leaderboard-container {
    background: #1e1e1e;
}

body.dark .leaderboard-table th {
    background: #2a2a2a;
}

body.dark .leaderboard-table tr:hover {
    background: #2c2c2c;
}

</style>

<div class="leaderboard-container">

    <div class="leaderboard-title">🏆 Leaderboard Terbaik</div>

    <table class="leaderboard-table">
        <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Skor</th>
        </tr>

        @foreach($data as $i => $d)
        <tr>

            <!-- RANK -->
            <td class="rank 
                @if($i==0) rank-1 
                @elseif($i==1) rank-2 
                @elseif($i==2) rank-3 
                @endif">
                {{ $i+1 }}
            </td>

            <!-- USER (FIX TOTAL) -->
            <td>
                <div class="user-box">
                    <div class="avatar">
                        {{ strtoupper(substr($d->name,0,1)) }}
                    </div>
                    <strong>{{ $d->name }}</strong>
                </div>
            </td>

            <!-- SKOR -->
            <td class="score">
                {{ number_format($d->rata,1) }}
            </td>

        </tr>
        @endforeach

    </table>

</div>

@endsection