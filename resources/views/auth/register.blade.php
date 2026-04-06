<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Register - BIOGAMI</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Font -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">

    <style>
        * {
            font-family: 'Poppins', sans-serif;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background: linear-gradient(135deg, #2e7d32, #66bb6a);
        }

        .register-container {
            background: white;
            padding: 40px;
            border-radius: 20px;
            width: 350px;
            box-shadow: 0 15px 40px rgba(0,0,0,0.2);
            text-align: center;
            animation: fadeIn 0.8s ease;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px);}
            to { opacity: 1; transform: translateY(0);}
        }

        .register-container h2 {
            margin-bottom: 20px;
            color: #2e7d32;
        }

        .register-container input {
            width: 100%;
            padding: 12px;
            margin: 10px 0;
            border-radius: 10px;
            border: 1px solid #ccc;
            outline: none;
            transition: 0.3s;
        }

        .register-container input:focus {
            border-color: #4caf50;
            box-shadow: 0 0 8px rgba(76, 175, 80, 0.3);
        }

        .register-container button {
            width: 100%;
            padding: 12px;
            background: #2e7d32;
            border: none;
            color: white;
            border-radius: 10px;
            margin-top: 15px;
            cursor: pointer;
            font-weight: 600;
            transition: 0.3s;
        }

        .register-container button:hover {
            background: #1b5e20;
        }

        .register-container p {
            margin-top: 15px;
            font-size: 14px;
        }

        .register-container a {
            color: #2e7d32;
            text-decoration: none;
            font-weight: 500;
        }

        .logo {
            font-size: 40px;
            margin-bottom: 10px;
        }

        /* 🔥 TAMBAHAN ERROR STYLE (TIDAK UBAH UI UTAMA) */
        .error-box {
            background: #ffebee;
            color: #c62828;
            padding: 10px;
            border-radius: 8px;
            margin-bottom: 15px;
            text-align: left;
            font-size: 13px;
        }
    </style>
</head>
<body>

<div class="register-container">

    <div class="logo">🌱</div>
    <h2>Register BIOGAMI</h2>

    <!-- 🔥 ERROR VALIDATION -->
    @if ($errors->any())
        <div class="error-box">
            <ul style="padding-left:15px;">
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form method="POST" action="/register">
        @csrf

        <input type="text" name="name" placeholder="Nama Lengkap" required>
        <input type="email" name="email" placeholder="Email" required>
        <input type="password" name="password" placeholder="Password" required>
        <input type="password" name="password_confirmation" placeholder="Konfirmasi Password" required>

        <button type="submit">Daftar</button>
    </form>

    <p>Sudah punya akun? <a href="/login">Login</a></p>

</div>

</body>
</html>