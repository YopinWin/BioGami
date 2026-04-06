@extends('layouts.app')

@section('content')

<style>

.pertemuan-container{
    display:grid;
    grid-template-columns:repeat(auto-fill,minmax(220px,1fr));
    gap:20px;
    margin-top:20px;
}

.card-pertemuan{
    background:linear-gradient(135deg,#66bb6a,#81c784);
    padding:20px;
    border-radius:15px;
    color:white;
    cursor:pointer;
    transition:0.3s;
    text-align:center;
    box-shadow:0 10px 25px rgba(0,0,0,0.1);
}

.card-pertemuan:hover{
    transform:translateY(-5px) scale(1.03);
    box-shadow:0 15px 30px rgba(0,0,0,0.2);
}

.judul{
    font-weight:600;
    margin-top:10px;
    font-size:14px;
}

.badge{
    font-size:12px;
    background:rgba(255,255,255,0.2);
    padding:4px 10px;
    border-radius:10px;
    display:inline-block;
}

</style>

<h2>📘 Kelas {{ $kelas }} - Semester {{ $semester }}</h2>

<div class="pertemuan-container">

@forelse($materi as $m)

<a href="/materi/detail/{{ $m->id }}" style="text-decoration:none">

    <div class="card-pertemuan">

        <div class="badge">Pertemuan {{ $m->pertemuan_ke }}</div>

        <div class="judul">
            {{ $m->judul }}
        </div>

    </div>

</a>

@empty

<p>Tidak ada materi ditemukan.</p>

@endforelse

</div>

@endsection