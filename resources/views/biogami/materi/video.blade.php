@extends('layouts.app')

@section('content')

<h2>🎥 Video Pembelajaran</h2>

<iframe width="100%" height="400"
    src="{{ $materi->video_url }}"
    frameborder="0"
    allowfullscreen>
</iframe>

@endsection