@extends('layouts.app')

@section('content')

<style>

/* ===== WRAPPER ===== */
.raport-wrapper{
    display:flex;
    justify-content:center;
    margin-top:30px;
}

/* ===== GULUNGAN ===== */
.scroll-container{
    position:relative;
    width:720px;
}

/* atas */
.scroll-top{
    height:60px;
    background:linear-gradient(#d2a86a,#b8894f);
    border-radius:10px 10px 0 0;
    box-shadow:0 5px 10px rgba(0,0,0,0.2);
}

/* bawah */
.scroll-bottom{
    height:60px;
    background:linear-gradient(#b8894f,#d2a86a);
    border-radius:0 0 10px 10px;
    box-shadow:0 -5px 10px rgba(0,0,0,0.2);
}

/* ===== KERTAS ===== */
.scroll-paper{
    padding:40px;
    background:linear-gradient(135deg,#f5e6c8,#e8d3a3);
    border-left:5px solid #c2a46b;
    border-right:5px solid #c2a46b;
    animation:unroll 1s ease forwards;
    transform-origin:top;
    transform:scaleY(0);
    position:relative;
}

@keyframes unroll{
    to{
        transform:scaleY(1);
    }
}

/* tekstur */
.scroll-paper::before{
    content:"";
    position:absolute;
    inset:0;
    background:url('https://www.transparenttextures.com/patterns/aged-paper.png');
    opacity:0.25;
    pointer-events:none;
}

/* TITLE */
.title{
    text-align:center;
    font-size:26px;
    font-weight:700;
    font-family:'Playfair Display', serif;
    color:#5d4037;
}

/* USER */
.user{
    text-align:center;
    margin:15px 0;
    font-size:16px;
    color:#6d4c41;
}

/* NILAI BOX */
.nilai-box{
    background:#fff3e0;
    padding:15px;
    border-radius:10px;
    width:260px;
    margin:20px auto;
    box-shadow:0 5px 10px rgba(0,0,0,0.1);
    text-align:center;
}

/* TANAMAN */
.plant-box{
    text-align:center;
    margin-top:20px;
}

.tree{
    font-size:100px;
    animation:grow 0.6s ease;
}

@keyframes grow{
    from{
        transform:scale(0.5);
        opacity:0;
    }
    to{
        transform:scale(1);
        opacity:1;
    }
}

/* FOOTER */
.footer{
    text-align:center;
    margin-top:40px;
    padding:15px;
    background:linear-gradient(90deg,#b8894f,#d2a86a);
    border-radius:10px;
    color:#fff;
    font-size:14px;
    box-shadow:0 5px 15px rgba(0,0,0,0.1);
}

</style>

<div class="raport-wrapper">
<div class="scroll-container">

<div class="scroll-top"></div>

<div class="scroll-paper">

<div class="title">📜 RAPORT PEMBELAJARAN</div>

<div class="user">
👤 {{ auth()->user()->name }}
</div>

<h2 style="text-align:center;">📊 Raport</h2>

@php
    $pre = intval($pre ?? 0);
    $post = intval($post ?? 0);
    $rata = ($pre + $post) / 2;
@endphp

<!-- NILAI -->
<div class="nilai-box">
    <p>📘 Pre Test: <b>{{ $pre }}</b></p>
    <p>📗 Post Test: <b>{{ $post }}</b></p>
    <p>📊 Rata-rata: <b>{{ number_format($rata,0) }}</b></p>
</div>

<!-- TANAMAN -->
<div class="plant-box">

@if($rata >= 90)
    <div class="tree">🌳</div>
    <p>Pohon besar</p>

@elseif($rata >= 75)
    <div class="tree">🌲</div>
    <p>Pohon kecil</p>

@elseif($rata >= 60)
    <div class="tree">🌿</div>
    <p>Tanaman kecil</p>

@elseif($rata >= 40)
    <div class="tree">🌱</div>
    <p>Tunas</p>

@else
    <div class="tree">🌰</div>
    <p>Biji</p>
@endif

</div>

<!-- FOOTER -->
<div class="footer">
🌱 Teruslah belajar dan berkembang, karena setiap usaha kecil hari ini akan menjadi keberhasilan besar di masa depan.
</div>

</div>

<div class="scroll-bottom"></div>

</div>
</div>

@endsection