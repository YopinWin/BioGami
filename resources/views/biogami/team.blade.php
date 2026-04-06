@extends('layouts.app')

@section('content')

<style>

.team-container{
    display:flex;
    gap:40px;
    justify-content:center;
    flex-wrap:wrap;
}

/* CARD */
.card{
    width:220px;
    height:260px;
    perspective:1200px;
    position:relative;
}

/* 🔥 SILUET KUNING */
.card::before{
    content:"";
    position:absolute;
    width:140%;
    height:140%;
    top:-20%;
    left:-20%;
    background:radial-gradient(circle, rgba(255,215,0,0.5), transparent 70%);
    filter:blur(40px);
    opacity:0;
    transition:0.4s;
    z-index:0;
}

/* MUNCUL SAAT HOVER */
.card:hover::before{
    opacity:1;
}

/* INNER */
.card-inner{
    width:100%;
    height:100%;
    transition:transform 0.7s;
    transform-style:preserve-3d;
    position:relative;
    z-index:1;
}

.card:hover .card-inner{
    transform:rotateY(180deg);
}

/* FRONT & BACK */
.card-front,
.card-back{
    position:absolute;
    width:100%;
    height:100%;
    border-radius:20px;
    backface-visibility:hidden;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    text-align:center;
    padding:15px;
    box-shadow:0 10px 30px rgba(0,0,0,0.15);
}

/* FRONT */
.card-front{
    background:linear-gradient(135deg,#2e7d32,#66bb6a);
    color:white;
}

/* BACK */
.card-back{
    background:linear-gradient(135deg,#66bb6a,#81c784);
    transform:rotateY(180deg);
    color:white;
    font-size:13px;
}

/* AVATAR */
.avatar{
    width:65px;
    height:65px;
    border-radius:50%;
    background:white;
    color:#2e7d32;
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:22px;
    font-weight:700;
    margin-bottom:10px;
}

/* TEXT */
.name{
    font-weight:600;
    font-size:15px;
}

.role{
    font-size:12px;
    opacity:0.9;
    max-width:160px;
    line-height:1.4;
}

/* 🔥 DARK MODE */
body.dark .card-front{
    background:linear-gradient(135deg,#1b5e20,#2e7d32);
}

body.dark .card-back{
    background:linear-gradient(135deg,#2e7d32,#388e3c);
}

body.dark .avatar{
    background:#222;
    color:#4caf50;
}

/* glow lebih soft di dark */
body.dark .card::before{
    background:radial-gradient(circle, rgba(255,215,0,0.25), transparent 70%);
}

</style>

<h2>👨‍💻 Tim Pengembang</h2>

<div class="team-container">

<div class="card">
<div class="card-inner">
<div class="card-front">
<div class="avatar">Y</div>
<div class="name">Yopin Winda</div>
<div class="role">Fullstack Developer</div>
</div>
<div class="card-back">
Mengembangkan sistem backend & frontend BIOGAMI 🚀
</div>
</div>
</div>

<div class="card">
<div class="card-inner">
<div class="card-front">
<div class="avatar">I</div>
<div class="name">Ida</div>
<div class="role">Research & Content Strategist</div>
</div>
<div class="card-back">
Berperan dalam riset materi & pengembangan ide pembelajaran 📊
</div>
</div>
</div>

<div class="card">
<div class="card-inner">
<div class="card-front">
<div class="avatar">N</div>
<div class="name">Najmadina</div>
<div class="role">Learning Content Specialist</div>
</div>
<div class="card-back">
Menyusun materi pembelajaran yang interaktif & mudah dipahami 📚
</div>
</div>
</div>

</div>

@endsection