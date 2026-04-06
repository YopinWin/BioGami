@extends('layouts.app')

@section('content')

<div style="
background: linear-gradient(135deg, #E8F5E9, #FFFDE7);
padding: 40px;
border-radius: 25px;
">

<h2 style="text-align:center; margin-bottom:30px;">
📚 Materi Pembelajaran
</h2>

<div style="
display:flex;
justify-content:center;
gap:30px;
flex-wrap:wrap;
">

<a href="/materi/X" class="kelas-card">
    <h3>Kelas X</h3>
</a>

<a href="/materi/XI" class="kelas-card">
    <h3>Kelas XI</h3>
</a>

<a href="/materi/XII" class="kelas-card">
    <h3>Kelas XII</h3>
</a>

</div>

</div>

<style>
.kelas-card {
    background: linear-gradient(135deg, #66BB6A, #C5E1A5);
    padding: 50px;
    border-radius: 25px;
    width: 260px;
    text-align: center;
    text-decoration: none;
    color: white;
    font-size: 22px;
    font-weight: bold;

    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
    transition: 0.3s;
}

.kelas-card:hover {
    transform: translateY(-8px) scale(1.05);
    background: linear-gradient(135deg, #43A047, #FFF176);
    color: #2E7D32;
}
</style>

@endsection