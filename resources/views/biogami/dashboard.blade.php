@extends('layouts.app')

@section('content')

<!-- HERO -->
<div class="hero-box">
    <div class="hero-content">
        <h1>BIOGAMI</h1>
        <p>Platform pembelajaran biologi berbasis gamifikasi interaktif.</p>
    </div>
</div>

<!-- TUJUAN -->
<h2>🎯 Tujuan</h2>

<div class="card-grid">

<div class="click-card">
    <div class="icon">🌱</div>
    <h3>Gamifikasi Pembelajaran</h3>
    <p>Mengembangkan website pembelajaran biologi berbasis gamifikasi</p>
</div>

<div class="click-card">
    <div class="icon">🌿</div>
    <h3>Visualisasi Tanaman</h3>
    <p>Menampilkan perkembangan belajar melalui pertumbuhan tanaman</p>
</div>

<div class="click-card">
    <div class="icon">📊</div>
    <h3>Evaluasi Statistik</h3>
    <p>Sistem raport dan monitoring perkembangan belajar siswa</p>
</div>

</div>

<br>

<!-- MANFAAT -->
<h2>🌟 Manfaat</h2>

<div class="card-grid">

<div class="click-card">
    <div class="icon">👩‍🎓</div>
    <h3>Untuk Siswa</h3>
    <p>Meningkatkan motivasi dan keterlibatan belajar</p>
</div>

<div class="click-card">
    <div class="icon">👨‍🏫</div>
    <h3>Untuk Guru</h3>
    <p>Mempermudah monitoring dan pengelolaan pembelajaran</p>
</div>

<div class="click-card">
    <div class="icon">🏫</div>
    <h3>Untuk Institusi</h3>
    <p>Mendukung transformasi digital pendidikan</p>
</div>

<div class="click-card">
    <div class="icon">🌍</div>
    <h3>Untuk Masyarakat</h3>
    <p>Meningkatkan kualitas SDM berbasis teknologi</p>
</div>

</div>

<br>

<!-- FITUR -->
<!-- FITUR -->
<h2>🚀 Fitur Utama</h2>

<div class="card-grid">

<div class="click-card">
    <div class="icon">🌿</div>
    <h3>Materi Interaktif</h3>
    <p>Visualisasi biologi yang menarik dan mudah dipahami</p>
</div>

<div class="click-card">
    <div class="icon">🎥</div>
    <h3>Video Pembelajaran</h3>
    <p>Belajar lebih mudah melalui video interaktif</p>
</div>

<div class="click-card">
    <div class="icon">📖</div>
    <h3>Flipbook Digital</h3>
    <p>Membaca materi seperti buku digital yang interaktif</p>
</div>

<div class="click-card">
    <div class="icon">📝</div>
    <h3>Pre-Test & Post-Test</h3>
    <p>Mengukur pemahaman siswa sebelum dan sesudah pembelajaran</p>
</div>

<div class="click-card">
    <div class="icon">🏆</div>
    <h3>Leaderboard</h3>
    <p>Peringkat siswa berdasarkan performa belajar</p>
</div>

<div class="click-card">
    <div class="icon">📑</div>
    <h3>Raport Digital</h3>
    <p>Laporan hasil belajar secara otomatis dan real-time</p>
</div>

<div class="click-card">
    <div class="icon">🤖</div>
    <h3>AI Biogami</h3>
    <p>Asisten pintar untuk menjawab pertanyaan seputar materi biologi</p>
</div>

<div class="click-card">
    <div class="icon">📈</div>
    <h3>Grafik Perkembangan</h3>
    <p>Visualisasi nilai pre-test dan post-test di setiap pertemuan</p>
</div>

</div>

</div>

<!-- CHAT WA STYLE -->
<div class="chat-container">

    <div id="chatWindow" class="chat-window">
        <div id="chatArea" class="chat-area"></div>

        <div class="chat-input">
            <input type="text" id="question" placeholder="Tanya..." onkeydown="handleEnter(event)">
            <button onclick="askAI()">➤</button>
        </div>
    </div>

    <button class="chat-btn" onclick="toggleChat()">💬</button>

</div>

<!-- SCRIPT (BERSIH) -->
<script>
function toggleChat(){
    let c = document.getElementById("chatWindow");
    c.style.display = (c.style.display === "flex") ? "none" : "flex";
}

/* 🔥 ENTER = KIRIM */
function handleEnter(e){
    if(e.key === "Enter"){
        e.preventDefault(); // 🔥 biar ga double
        askAI();
    }
}

function askAI() {

    let input = document.getElementById("question");
    let chat = document.getElementById("chatArea");

    if (!input || !chat) {
        console.error("Element tidak ditemukan");
        return;
    }

    let q = input.value.trim();
    if (q === "") return;

    chat.innerHTML += `<p class="user">${q}</p>`;
    input.value = "";

    fetch('/ai-ask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
        },
        body: JSON.stringify({ question: q })
    })
    .then(res => res.json())
    .then(data => {

        let jawaban = data.jawaban || "Tidak ada jawaban";

        jawaban = jawaban.replace(/\n|\r/g, ' ');
        jawaban = jawaban.replace(/\s+/g, ' ').trim();

        if (jawaban.includes('.')) {
            jawaban = jawaban.split('. ')[0] + '.';
        }

        chat.innerHTML += `<p>${jawaban}</p>`;
        chat.scrollTop = chat.scrollHeight;
    })
    .catch(err => {
        console.error("Fetch error:", err);
    });
}
</script>

@endsection