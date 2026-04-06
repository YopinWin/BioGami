@extends('layouts.app')

@section('content')

<style>
.detail-container{
    background:white;
    padding:25px;
    border-radius:20px;
    box-shadow:0 10px 30px rgba(0,0,0,0.1);
}

.title{
    font-size:22px;
    font-weight:700;
    margin-bottom:10px;
}

.sub{
    color:#666;
    margin-bottom:20px;
}

.menu-grid{
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(200px,1fr));
    gap:20px;
}

.menu-card{
    background:linear-gradient(135deg,#66bb6a,#81c784);
    color:white;
    padding:20px;
    border-radius:15px;
    text-align:center;
    cursor:pointer;
    transition:0.3s;
}

.menu-card:hover{
    transform:translateY(-5px);
    box-shadow:0 10px 25px rgba(0,0,0,0.2);
}
</style>

<div class="detail-container">

    <div class="title">
        📘 {{ $materi->judul }}
    </div>

    <div class="sub">
        Pertemuan {{ $materi->pertemuan_ke }} • Kelas {{ $materi->kelas }}
    </div>

    <div class="menu-grid">

        <!-- PPT -->
        <a href="/materi/detail/{{ $materi->id }}/full">
            <div class="menu-card">📂 Materi / PPT</div>
        </a>

        <!-- VIDEO -->
        <a href="/materi/video/{{ $materi->id }}">
            <div class="menu-card">🎥 Video</div>
        </a>

        <!-- PRE TEST (FIX) -->
        <a href="/materi/soal/{{ $materi->id }}?tipe=pre">
            <div class="menu-card">📝 Pre Test</div>
        </a>

        <!-- POST TEST (FIX) -->
        <a href="/materi/soal/{{ $materi->id }}?tipe=post">
            <div class="menu-card">🎯 Post Test</div>
        </a>

        <!-- RAPORT -->
        <a href="/materi/raport/{{ $materi->id }}">
            <div class="menu-card">📊 Raport</div>
        </a>

    </div>

</div>

@endsection