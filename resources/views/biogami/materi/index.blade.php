@extends('layouts.app')

@section('content')

<div class="box">

    <h2 style="text-align:center;">📘 Kelas X - Semester 1</h2>

    <div class="card-grid">
        @foreach($materi as $m)
            <div class="card">
                Pertemuan {{ $m->pertemuan_ke }}
            </div>
        @endforeach
    </div>

</div>

@endsection