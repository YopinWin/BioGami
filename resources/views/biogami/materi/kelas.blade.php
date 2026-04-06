@extends('layouts.app')

@section('content')

<div style="
background: linear-gradient(135deg, #E8F5E9, #FFFDE7);
padding: 40px;
border-radius: 25px;
">

<h2 style="text-align:center; margin-bottom:30px;">
📚 Kelas {{ $kelas }}
</h2>

<div style="
display:flex;
justify-content:center;
gap:30px;
flex-wrap:wrap;
">

<a href="/materi/{{ $kelas }}/1" class="semester-card">
    <h3>Semester 1</h3>
    <p>18 Pertemuan</p>
</a>

<a href="/materi/{{ $kelas }}/2" class="semester-card">
    <h3>Semester 2</h3>
    <p>18 Pertemuan</p>
</a>

</div>

</div>

<style>
.semester-card {
    background: linear-gradient(135deg, #66BB6A, #C5E1A5);
    padding: 50px;
    border-radius: 25px;
    width: 280px;
    text-align: center;
    text-decoration: none;
    color: white;

    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
    transition: 0.3s;
}

.semester-card:hover {
    transform: translateY(-8px) scale(1.05);
    background: linear-gradient(135deg, #43A047, #FFF176);
    color: #2E7D32;
}
</style>

@endsection