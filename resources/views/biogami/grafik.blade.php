@extends('layouts.app')

@section('content')

<style>
.chart-container {
    background: #ffffff;
    padding: 25px;
    border-radius: 20px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}
</style>

<h2>📊 Grafik Perkembangan Nilai</h2>

<div class="chart-container">
    <canvas id="chart"></canvas>
</div>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<script>

// 🔥 ambil data dari controller
const data = @json($data);

// 🔥 mapping data
const labels = data.map(d => 'P' + d.pertemuan_ke);
const pre = data.map(d => d.pre);
const post = data.map(d => d.post);

// 🔥 chart
const ctx = document.getElementById('chart');

new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [

            // PRE TEST
            {
                label: 'Pre Test',
                data: pre,
                borderWidth: 3,
                tension: 0.4,
                fill: true
            },

            // POST TEST
            {
                label: 'Post Test',
                data: post,
                borderWidth: 3,
                tension: 0.4,
                fill: true
            }

        ]
    },
    options: {
        responsive: true,
        animation: {
            duration: 1500
        },
        plugins: {
            legend: {
                display: true
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 10
                }
            }
        }
    }
});
</script>

@endsection