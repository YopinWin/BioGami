@extends('layouts.app')

@section('content')

<h2>Latihan Soal</h2>

<div class="card">
    <form>
        <p>1. Organ pernapasan manusia adalah?</p>

        <input type="radio" name="q1"> Jantung <br>
        <input type="radio" name="q1"> Paru-paru <br>
        <input type="radio" name="q1"> Hati <br>

        <br>
        <button class="btn">Submit</button>
    </form>
</div>

@endsection