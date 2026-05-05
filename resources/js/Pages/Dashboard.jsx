import React from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { BookOpen, Trophy, BarChart2, Leaf, Zap, ArrowRight, Dna } from 'lucide-react';
import { motion } from 'framer-motion';

function CircularProgress({ value = 0, size = 120, stroke = 12 }) {
    const r = (size - stroke) / 2;
    const circ = 2 * Math.PI * r;
    const offset = circ - (value / 100) * circ;
    return (
        <svg width={size} height={size} className="-rotate-90 drop-shadow-sm">
            <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#f0fdf4" strokeWidth={stroke} />
            <circle cx={size/2} cy={size/2} r={r} fill="none"
                stroke="url(#prog)" strokeWidth={stroke}
                strokeLinecap="round"
                strokeDasharray={circ}
                strokeDashoffset={offset}
                style={{ transition: 'stroke-dashoffset 1s ease' }}
            />
            <defs>
                <linearGradient id="prog" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#34d399" />
                    <stop offset="100%" stopColor="#059669" />
                </linearGradient>
            </defs>
        </svg>
    );
}

export default function Dashboard({ avg = 0, tanaman = '🌰', auth }) {
    const avgRounded = Math.round(avg || 0);

    const goals = [
        { icon: '🌱', title: 'Gamifikasi Pembelajaran', desc: 'Mengembangkan website pembelajaran biologi berbasis gamifikasi' },
        { icon: '🌿', title: 'Visualisasi Tanaman', desc: 'Menampilkan perkembangan belajar melalui pertumbuhan tanaman' },
        { icon: '📊', title: 'Evaluasi Statistik', desc: 'Sistem raport dan monitoring perkembangan belajar siswa' },
    ];

    const features = [
        { icon: '🌿', title: 'Materi Interaktif', desc: 'Visualisasi biologi yang menarik dan mudah dipahami', href: '/materi' },
        { icon: '🎥', title: 'Video Pembelajaran', desc: 'Belajar lebih mudah melalui video interaktif', href: '/materi' },
        { icon: '📖', title: 'Flipbook Digital', desc: 'Membaca materi seperti buku digital interaktif', href: '/flipbook' },
        { icon: '📝', title: 'Pre-Test & Post-Test', desc: 'Mengukur pemahaman sebelum dan sesudah pembelajaran', href: '/materi' },
        { icon: '🏆', title: 'Leaderboard', desc: 'Peringkat siswa berdasarkan performa belajar', href: '/leaderboard' },
        { icon: '📑', title: 'Raport Digital', desc: 'Laporan hasil belajar secara otomatis dan real-time', href: '/grafik' },
        { icon: '🤖', title: 'AI Biogami', desc: 'Asisten pintar untuk menjawab pertanyaan biologi', href: '#' },
        { icon: '📈', title: 'Grafik Perkembangan', desc: 'Visualisasi nilai pre-test dan post-test', href: '/grafik' },
    ];

    return (
        <MainLayout>
            <Head title="Dashboard" />

            {/* Hero Banner */}
            <div className="relative overflow-hidden rounded-[2.5rem] bg-emerald-50/50 p-10 mb-10 border border-emerald-100 shadow-sm flex items-center min-h-[260px]">
                {/* Decorative Elements */}
                <div className="absolute -right-20 -top-20 w-80 h-80 bg-emerald-100/50 rounded-full blur-3xl" />
                <div className="absolute top-[10%] right-[10%] w-32 h-32 opacity-30 mix-blend-multiply filter blur-[0.5px]">
                    <img src="/images/hero_dna.png" alt="DNA" className="w-full h-full object-cover mask-image-radial" style={{ WebkitMaskImage: 'radial-gradient(circle, black 40%, transparent 70%)' }} />
                </div>
                <div className="absolute bottom-[0%] right-[30%] w-40 h-40 opacity-40 mix-blend-multiply filter drop-shadow-2xl">
                    <img src="/images/hero_cell.png" alt="Cell" className="w-full h-full object-cover mask-image-radial" style={{ WebkitMaskImage: 'radial-gradient(circle, black 50%, transparent 70%)' }} />
                </div>

                <div className="relative z-10 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-4 shadow-sm">
                        <span className="text-base">👋</span> Selamat Datang Kembali
                    </div>
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
                        {auth?.user?.name || 'Siswa'}
                    </h1>
                    <p className="text-gray-500 text-sm max-w-lg leading-relaxed mb-6">
                        Mari lanjutkan perjalanan belajarmu di platform biologi interaktif. Temukan keajaiban kehidupan di setiap modulnya.
                    </p>
                    <Link href="/materi" className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#118453] text-white font-bold text-sm hover:bg-emerald-800 transition-colors shadow-lg shadow-emerald-700/20">
                        Lanjut Belajar <ArrowRight size={16} />
                    </Link>
                </div>
            </div>

            {/* Progress + Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                {/* Circular Progress */}
                <div className="md:col-span-1 bg-white rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 flex flex-col items-center justify-center gap-4 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -z-10 opacity-50" />
                    <div className="relative">
                        <CircularProgress value={avgRounded} />
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-3xl font-extrabold text-gray-900">{avgRounded}%</span>
                        </div>
                    </div>
                    <div className="text-center mt-2">
                        <div className="text-5xl mb-2 filter drop-shadow-sm">{tanaman}</div>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Tanaman Kamu</p>
                    </div>
                </div>

                {/* Quick Stats */}
                {[
                    { icon: BookOpen, label: 'Materi Biologi', value: 'Mulai', sub: 'Lanjutkan membaca', href: '/materi', color: 'emerald' },
                    { icon: Trophy, label: 'Peringkat', value: 'Lihat', sub: 'Posisimu saat ini', href: '/leaderboard', color: 'amber' },
                    { icon: BarChart2, label: 'Grafik Nilai', value: 'Analisa', sub: 'Perkembangan belajarmu', href: '/grafik', color: 'blue' },
                ].map(({ icon: Icon, label, value, sub, href, color }) => (
                    <Link key={label} href={href} className="group bg-white rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all relative overflow-hidden">
                        <div className={`absolute -right-6 -top-6 w-24 h-24 bg-${color}-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500`} />
                        <div className={`w-14 h-14 rounded-2xl bg-${color}-50 flex items-center justify-center text-${color}-600 mb-6 relative z-10`}>
                            <Icon size={26} />
                        </div>
                        <div className="relative z-10">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{label}</p>
                            <div className="flex items-end gap-2">
                                <p className="text-xl font-extrabold text-gray-900">{value}</p>
                                <ArrowRight size={18} className={`text-${color}-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all mb-1`} />
                            </div>
                            <p className="text-[11px] text-gray-500 mt-2 font-medium">{sub}</p>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Tujuan Section */}
            <div className="flex items-center gap-2 mb-6">
                <Dna className="text-emerald-500" size={24} />
                <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Tujuan Pembelajaran</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                {goals.map(({ icon, title, desc }) => (
                    <motion.div key={title} whileHover={{ y: -4 }}
                        className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all"
                    >
                        <div className="text-4xl mb-4">{icon}</div>
                        <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                        <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                    </motion.div>
                ))}
            </div>

            {/* Fitur Utama */}
            <div className="flex items-center gap-2 mb-6">
                <Zap className="text-amber-500 fill-amber-500" size={24} />
                <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Eksplorasi Fitur</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 pb-10">
                {features.map(({ icon, title, desc, href }) => (
                    <Link key={title} href={href} className="block group h-full">
                        <motion.div whileHover={{ y: -4 }}
                            className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] group-hover:shadow-xl group-hover:border-emerald-100 transition-all h-full flex flex-col"
                        >
                            <div className="text-4xl mb-4 p-3 bg-gray-50 rounded-2xl w-fit group-hover:bg-emerald-50 transition-colors">{icon}</div>
                            <h3 className="font-bold text-gray-900 text-sm mb-2">{title}</h3>
                            <p className="text-xs text-gray-500 leading-relaxed flex-1">{desc}</p>
                            <div className="mt-4 w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-colors">
                                <ArrowRight size={14} />
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </MainLayout>
    );
}
