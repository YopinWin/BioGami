@extends('layouts.app')

@section('content')

<style>
.quiz-container{
    max-width:600px;
    margin:auto;
}

.card{
    background:white;
    padding:25px;
    border-radius:15px;
    box-shadow:0 10px 30px rgba(0,0,0,0.1);
    text-align:center;
}

.progress{
    margin-bottom:15px;
    font-weight:600;
    color:#2e7d32;
}

.option{
    display:block;
    margin:10px 0;
    padding:12px;
    border-radius:10px;
    background:#e8f5e9;
    cursor:pointer;
    transition:0.2s;
}

.option:hover{
    background:#c8e6c9;
}

button{
    margin-top:15px;
    padding:10px 20px;
    background:#2e7d32;
    color:white;
    border:none;
    border-radius:10px;
    cursor:pointer;
}

.btn-group{
    display:flex;
    justify-content:space-between;
}
</style>

<div class="quiz-container">

<h2>📝 {{ strtoupper($tipe) }} TEST</h2>

<form id="quizForm" method="POST" action="/materi/soal/{{ $id }}">
@csrf

@foreach($soal as $index => $s)

<div class="card soal" style="display:{{ $index == 0 ? 'block':'none' }}">

<div class="progress">
Soal {{ $index+1 }} / {{ count($soal) }}
</div>

<p><b>{{ $index+1 }}. {{ $s->pertanyaan }}</b></p>

<label class="option">
<input type="radio" name="jawaban[{{ $s->id }}]" value="a"> {{ $s->a }}
</label>

<label class="option">
<input type="radio" name="jawaban[{{ $s->id }}]" value="b"> {{ $s->b }}
</label>

<label class="option">
<input type="radio" name="jawaban[{{ $s->id }}]" value="c"> {{ $s->c }}
</label>

<label class="option">
<input type="radio" name="jawaban[{{ $s->id }}]" value="d"> {{ $s->d }}
</label>

<div class="btn-group">

@if($index > 0)
<button type="button" onclick="prevSoal()">⬅️ Back</button>
@else
<div></div>
@endif

@if($index == count($soal)-1)
<button type="submit">Submit ✅</button>
@else
<button type="button" onclick="nextSoal()">Next ➡️</button>
@endif

</div>

</div>

@endforeach

</form>

</div>

<script>
let current = 0;
let soal = document.querySelectorAll('.soal');

function nextSoal(){

    let currentSoal = soal[current];
    let checked = currentSoal.querySelector('input[type=radio]:checked');

    if(!checked){
        alert("Pilih jawaban dulu!");
        return;
    }

    currentSoal.style.display = 'none';
    current++;

    soal[current].style.display = 'block';
}

function prevSoal(){

    soal[current].style.display = 'none';
    current--;

    soal[current].style.display = 'block';
}
</script>

@endsection