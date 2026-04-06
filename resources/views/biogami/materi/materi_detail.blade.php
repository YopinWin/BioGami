@extends('layouts.app')

@section('content')

<style>

.materi-container{
    background:white;
    padding:30px;
    border-radius:20px;
    box-shadow:0 10px 30px rgba(0,0,0,0.08);
}

/* title */
.materi-title{
    font-family:'Playfair Display', serif;
    font-size:22px;
    font-weight:700;
    margin-bottom:10px;
}

/* subtitle */
.materi-sub{
    color:#777;
    margin-bottom:20px;
}

/* isi materi */
.materi-content{
    font-size:15px;
    line-height:1.7;
}

/* dark mode */
body.dark .materi-container{
    background:#1e1e1e;
    color:#ddd;
}

</style>

<div class="materi-container">

    <div class="materi-title">
        📂 {{ $materi->judul }}
    </div>

    <div class="materi-sub">
        Pertemuan {{ $materi->pertemuan_ke }} • Kelas {{ $materi->kelas }}
    </div>

    <div class="materi-content">
        {{ $materi->konten ?? 'Materi belum tersedia' }}
    </div>

</div>

@endsection