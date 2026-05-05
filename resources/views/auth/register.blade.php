<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Daftar – BioGami</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

    <style>
        *, *::before, *::after {
            font-family: 'Outfit', sans-serif;
            margin: 0; padding: 0; box-sizing: border-box;
        }

        body {
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            overflow: hidden;
            background: #0d1f12;
            padding: 24px 0;
        }

        body::before {
            content: '';
            position: fixed;
            inset: 0;
            background:
                url('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=1600&q=80') center/cover no-repeat;
            filter: blur(18px) brightness(0.45) saturate(1.2);
            transform: scale(1.05);
            z-index: 0;
        }

        body::after {
            content: '';
            position: fixed;
            inset: 0;
            background: radial-gradient(ellipse at center, transparent 40%, rgba(10,40,15,0.6) 100%);
            z-index: 0;
        }

        .card {
            position: relative;
            z-index: 10;
            width: 420px;
            padding: 44px 40px;
            border-radius: 28px;
            background: rgba(255, 255, 255, 0.10);
            backdrop-filter: blur(28px) saturate(1.8);
            -webkit-backdrop-filter: blur(28px) saturate(1.8);
            border: 1px solid rgba(255, 255, 255, 0.18);
            box-shadow:
                0 8px 32px rgba(0, 0, 0, 0.35),
                inset 0 1px 0 rgba(255,255,255,0.15);
            animation: slideUp 0.5s cubic-bezier(.16,1,.3,1) both;
        }

        @keyframes slideUp {
            from { opacity: 0; transform: translateY(24px); }
            to   { opacity: 1; transform: translateY(0); }
        }

        .brand {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            margin-bottom: 28px;
        }

        .brand-icon {
            width: 42px; height: 42px;
            border-radius: 12px;
            background: linear-gradient(135deg, #4ade80, #16a34a);
            display: flex; align-items: center; justify-content: center;
            font-size: 22px;
            box-shadow: 0 4px 16px rgba(74, 222, 128, 0.35);
        }

        .brand-name {
            font-size: 24px;
            font-weight: 800;
            color: #fff;
            letter-spacing: -0.5px;
        }

        h2 {
            text-align: center;
            font-size: 15px;
            font-weight: 400;
            color: rgba(255,255,255,0.65);
            margin-bottom: 28px;
        }

        .field { margin-bottom: 14px; }

        label {
            display: block;
            font-size: 12px;
            font-weight: 600;
            color: rgba(255,255,255,0.6);
            margin-bottom: 6px;
            letter-spacing: 0.5px;
            text-transform: uppercase;
        }

        input[type="email"],
        input[type="password"],
        input[type="text"] {
            width: 100%;
            padding: 13px 16px;
            border-radius: 12px;
            border: 1px solid rgba(255,255,255,0.15);
            background: rgba(255,255,255,0.08);
            color: #fff;
            font-size: 14px;
            outline: none;
            transition: all 0.25s;
        }

        input::placeholder { color: rgba(255,255,255,0.35); }

        input:focus {
            border-color: rgba(74, 222, 128, 0.6);
            background: rgba(255,255,255,0.12);
            box-shadow: 0 0 0 3px rgba(74, 222, 128, 0.15);
        }

        .btn-primary {
            width: 100%;
            padding: 14px;
            margin-top: 8px;
            border: none;
            border-radius: 12px;
            background: linear-gradient(135deg, #22c55e, #16a34a);
            color: white;
            font-size: 15px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.25s;
            box-shadow: 0 4px 20px rgba(34, 197, 94, 0.35);
        }

        .btn-primary:hover {
            transform: translateY(-1px);
            box-shadow: 0 6px 24px rgba(34, 197, 94, 0.5);
        }

        .footer-link {
            text-align: center;
            margin-top: 22px;
            font-size: 13px;
            color: rgba(255,255,255,0.5);
        }

        .footer-link a {
            color: #4ade80;
            font-weight: 600;
            text-decoration: none;
        }

        .footer-link a:hover { color: #86efac; }

        .error-box {
            background: rgba(239, 68, 68, 0.15);
            border: 1px solid rgba(239, 68, 68, 0.3);
            color: #fca5a5;
            padding: 10px 14px;
            border-radius: 10px;
            margin-bottom: 16px;
            font-size: 13px;
        }

        .error-box ul { padding-left: 16px; }

        .back-link {
            position: fixed;
            top: 24px;
            left: 28px;
            z-index: 20;
            display: flex;
            align-items: center;
            gap: 8px;
            color: rgba(255,255,255,0.7);
            font-size: 14px;
            font-weight: 500;
            text-decoration: none;
            transition: color 0.2s;
        }

        .back-link:hover { color: #fff; }

        /* Two-column grid for name + email */
        .grid-2 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
        }
    </style>
</head>
<body>

    <a href="/" class="back-link">← Kembali</a>

    <div class="card">

        <div class="brand">
            <div class="brand-icon">🌿</div>
            <span class="brand-name">BioGami</span>
        </div>

        <h2>Buat akun baru</h2>

        @if ($errors->any())
            <div class="error-box">
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <form method="POST" action="/register">
            @csrf

            <div class="field">
                <label>Nama Lengkap</label>
                <input type="text" name="name" placeholder="John Doe" value="{{ old('name') }}" required autofocus>
            </div>

            <div class="field">
                <label>Email</label>
                <input type="email" name="email" placeholder="nama@email.com" value="{{ old('email') }}" required>
            </div>

            <div class="field">
                <label>Password</label>
                <input type="password" name="password" placeholder="Min. 8 karakter" required>
            </div>

            <div class="field">
                <label>Konfirmasi Password</label>
                <input type="password" name="password_confirmation" placeholder="Ulangi password" required>
            </div>

            <button type="submit" class="btn-primary">Buat Akun →</button>
        </form>

        <p class="footer-link">Sudah punya akun? <a href="/login">Masuk di sini</a></p>
    </div>

</body>
</html>