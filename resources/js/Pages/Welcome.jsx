import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    Search,
    BookOpen,
    FlaskConical,
    BrainCircuit,
    BarChart3,
    ArrowRight,
    Leaf,
    Dna,
    Activity,
    User,
    Users,
    CheckCircle2
} from 'lucide-react';

export default function Welcome({ auth }) {
    // Primary green brand color used in mockup: roughly emerald-700 (#047857)
    const brandGreen = 'emerald-700';
    const brandLight = 'emerald-50';

    return (
        <>
            <Head title="Beranda" />
            <div className="min-h-screen bg-[#FCFDFD] font-['Inter'] text-gray-800 overflow-x-hidden selection:bg-emerald-200">

                {/* ─── Navbar ───────────────────────────────── */}
                <div className="fixed top-0 w-full z-50 pt-4 px-6 flex justify-center pointer-events-none">
                    <nav className="w-full max-w-7xl bg-white/95 backdrop-blur-md rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 px-6 py-3 flex items-center justify-between pointer-events-auto">
                        {/* Logo */}
                        <div className="flex items-center gap-2">
                            <Dna className="text-emerald-700" size={28} />
                            <span className="text-xl font-bold text-emerald-800 tracking-tight">BioGami</span>
                        </div>

                        {/* Links */}
                        <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-500">
                            <div className="relative">
                                <Link href="/" className="text-emerald-700 font-bold">Beranda</Link>
                                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-8 h-1 bg-emerald-600 rounded-t-full"></div>
                            </div>
                            <Link href="/materi" className="hover:text-emerald-700 transition-colors">Materi</Link>
                            <Link href="/leaderboard" className="hover:text-emerald-700 transition-colors">Peringkat</Link>
                            <Link href="/flipbook" className="hover:text-emerald-700 transition-colors">Praktikum</Link>
                            <Link href="/team" className="hover:text-emerald-700 transition-colors">Tentang</Link>
                        </div>

                        {/* Search & Action */}
                        <div className="hidden lg:flex items-center gap-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Cari materi..."
                                    className="pl-5 pr-10 py-2.5 w-60 rounded-full border border-gray-200 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all bg-white shadow-sm"
                                />
                                <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-600" />
                            </div>
                            {auth?.user ? (
                                <Link
                                    href="/dashboard"
                                    className="px-7 py-2.5 rounded-full bg-[#118453] text-white text-sm font-semibold hover:bg-emerald-800 transition-all shadow-md shadow-emerald-700/20"
                                >
                                    Mulai Belajar
                                </Link>
                            ) : (
                                <a
                                    href="/login"
                                    className="px-7 py-2.5 rounded-full bg-[#118453] text-white text-sm font-semibold hover:bg-emerald-800 transition-all shadow-md shadow-emerald-700/20"
                                >
                                    Mulai Belajar
                                </a>
                            )}
                        </div>
                    </nav>
                </div>

                {/* ─── Hero Section ───────────────────────────── */}
                <section className="relative pt-56 pb-20 overflow-hidden min-h-screen flex items-center">
                    {/* Floating leaf decor top left */}
                    <div className="absolute top-48 left-10 opacity-70 rotate-[-20deg] drop-shadow-lg blur-[1px]">
                        <Leaf size={40} className="text-emerald-500 fill-emerald-500" />
                    </div>

                    <div className="max-w-7xl mx-auto px-6 w-full flex flex-col lg:flex-row items-center gap-12">

                        {/* Left Content */}
                        <div className="flex-1 text-center lg:text-left z-10 lg:pr-10">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                className="text-[3.5rem] lg:text-[4rem] font-extrabold leading-[1.1] text-gray-800 mb-6 tracking-tight"
                            >
                                Belajar Biologi, <br />
                                <span className="text-[#118453]">Seperti Menjelajahi<br />Kehidupan</span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                                className="text-gray-500 text-[1.1rem] mb-10 max-w-[500px] mx-auto lg:mx-0 leading-relaxed font-medium"
                            >
                                Pahami konsep, temukan keajaiban, dan jelajahi kehidupan di sekitar kita dengan cara yang mudah dan menyenangkan.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                                className="flex items-center justify-center lg:justify-start gap-5 mb-14"
                            >
                                {auth?.user ? (
                                    <Link href="/dashboard" className="flex items-center gap-2 px-8 py-4 bg-[#118453] text-white rounded-full font-bold hover:bg-emerald-800 transition-colors shadow-[0_8px_20px_rgba(17,132,83,0.3)]">
                                        Mulai Belajar <ArrowRight size={18} />
                                    </Link>
                                ) : (
                                    <a href="/register" className="flex items-center gap-2 px-8 py-4 bg-[#118453] text-white rounded-full font-bold hover:bg-emerald-800 transition-colors shadow-[0_8px_20px_rgba(17,132,83,0.3)]">
                                        Mulai Belajar <ArrowRight size={18} />
                                    </a>
                                )}
                                <a href="#materi" className="flex items-center gap-3 px-8 py-4 border-2 border-emerald-600 text-emerald-700 rounded-full font-bold hover:bg-emerald-50 transition-colors">
                                    <div className="w-6 h-6 rounded-full border border-emerald-600 flex items-center justify-center">
                                        <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[6px] border-l-emerald-600 border-b-[4px] border-b-transparent ml-0.5"></div>
                                    </div>
                                    Lihat Materi
                                </a>
                            </motion.div>

                            {/* Stats */}
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                                className="flex items-center justify-center lg:justify-start gap-6 lg:gap-10"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-[#f0fdf4] border border-emerald-100 rounded-2xl shadow-sm"><BookOpen size={24} className="text-[#118453]" /></div>
                                    <div className="text-left">
                                        <p className="font-extrabold text-gray-900 text-lg leading-none mb-1">500+</p>
                                        <p className="text-[11px] text-gray-500 font-medium">Materi Terstruktur</p>
                                    </div>
                                </div>
                                <div className="hidden sm:block w-px h-10 bg-gray-200"></div>
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-[#f0fdf4] border border-emerald-100 rounded-2xl shadow-sm"><Users size={24} className="text-[#118453]" /></div>
                                    <div className="text-left">
                                        <p className="font-extrabold text-gray-900 text-lg leading-none mb-1">10K+</p>
                                        <p className="text-[11px] text-gray-500 font-medium">Pelajar Aktif</p>
                                    </div>
                                </div>
                                <div className="hidden sm:block w-px h-10 bg-gray-200"></div>
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-[#f0fdf4] border border-emerald-100 rounded-2xl shadow-sm"><CheckCircle2 size={24} className="text-[#118453]" /></div>
                                    <div className="text-left">
                                        <p className="font-extrabold text-gray-900 text-lg leading-none mb-1">98%</p>
                                        <p className="text-[11px] text-gray-500 font-medium">Kepuasan Belajar</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Graphic - Accurate to Mockup */}
                        <div className="flex-1 relative w-full h-[600px] mt-10 lg:mt-0">
                            {/* Large Soft Green Blob Background */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] bg-[#e6f4ea] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] opacity-80 mix-blend-multiply filter blur-sm"></div>

                            {/* Dashed circular outlines */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full border border-dashed border-emerald-200/60 rotate-12"></div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full border border-dashed border-emerald-300/40 -rotate-12"></div>

                            {/* Central Image (Leaves on transparent/white background) */}
                            <img
                                src="/images/hero_leaves.png"
                                alt="Leaves"
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-auto object-contain mix-blend-multiply brightness-110 contrast-125 scale-110 drop-shadow-2xl z-10"
                            />

                            {/* Decorative 3D Spheres (Green dots) */}
                            <div className="absolute top-[10%] right-[15%] w-6 h-6 bg-gradient-to-br from-emerald-300 to-green-600 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)] z-20"></div>
                            <div className="absolute bottom-[5%] left-[20%] w-8 h-8 bg-gradient-to-br from-green-300 to-emerald-600 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.6)] blur-[1px] z-20"></div>
                            <div className="absolute top-[40%] left-[5%] w-4 h-4 bg-emerald-400 rounded-full shadow-md z-20"></div>



                            {/* Placeholder for 3D DNA (Top Left, beside card) */}
                            <div className="absolute top-[20%] left-[18%] w-40 h-40 opacity-90 z-20 mix-blend-multiply filter blur-[0.5px]">
                                <img src="/images/hero_dna.png" alt="DNA" className="w-full h-full object-cover brightness-110 contrast-125 mask-image-radial" style={{ WebkitMaskImage: 'radial-gradient(circle, black 40%, transparent 70%)' }} />
                            </div>

                            {/* Placeholder for Cell/Virus (Bottom Right, beside card) */}
                            <div className="absolute bottom-[2%] right-[2%] w-44 h-44 opacity-90 z-20 mix-blend-multiply filter drop-shadow-2xl">
                                <img src="/images/hero_cell.png" alt="Cell" className="w-full h-full object-cover brightness-110 contrast-125 mask-image-radial" style={{ WebkitMaskImage: 'radial-gradient(circle, black 50%, transparent 70%)' }} />
                            </div>

                            {/* Floating Card 1: Genetika (Top Left, beside DNA) */}
                            <motion.div
                                animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute top-[16%] left-[-12%] bg-white/95 backdrop-blur-md px-5 py-3 rounded-2xl shadow-[0_10px_30px_rgb(0,0,0,0.06)] flex items-center gap-4 z-30 border border-white"
                            >
                                <div className="p-2 bg-[#f0fdf4] rounded-full border border-emerald-100"><Dna size={18} className="text-[#118453]" /></div>
                                <div>
                                    <p className="text-[13px] font-bold text-gray-900 leading-tight mb-0.5">Genetika</p>
                                    <p className="text-[10px] text-gray-500 font-medium leading-tight">Pewarisan sifat<br />dan variasi</p>
                                </div>
                            </motion.div>

                            {/* Floating Card 2: Ekosistem (Right, beside Leaves) */}
                            <motion.div
                                animate={{ y: [0, -12, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute top-[45%] right-[-5%] bg-white/95 backdrop-blur-md px-5 py-3 rounded-2xl shadow-[0_10px_30px_rgb(0,0,0,0.06)] flex items-center gap-4 z-30 border border-white"
                            >
                                <div className="p-2 bg-[#f0fdf4] rounded-full border border-emerald-100"><Leaf size={18} className="text-[#118453]" /></div>
                                <div>
                                    <p className="text-[13px] font-bold text-gray-900 leading-tight mb-0.5">Ekosistem</p>
                                    <p className="text-[10px] text-gray-500 font-medium leading-tight">Interaksi makhluk hidup<br />dan lingkungannya</p>
                                </div>
                            </motion.div>

                            {/* Floating Card 3: Sel (Bottom Right, beside Cell) */}
                            <motion.div
                                animate={{ y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                                className="absolute bottom-[8%] right-[30%] bg-white/95 backdrop-blur-md px-5 py-3 rounded-2xl shadow-[0_10px_30px_rgb(0,0,0,0.06)] flex items-center gap-4 z-30 border border-white"
                            >
                                <div className="p-2 bg-[#f0fdf4] rounded-full border border-emerald-100"><Activity size={18} className="text-[#118453]" /></div>
                                <div>
                                    <p className="text-[13px] font-bold text-gray-900 leading-tight mb-0.5">Sel</p>
                                    <p className="text-[10px] text-gray-500 font-medium leading-tight">Unit dasar kehidupan</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ─── Features Cards ───────────────────────── */}
                <section className="py-12 bg-gray-50/50">
                    <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: 'Materi Terstruktur', desc: 'Materi disusun sistematis dari dasar hingga tingkat lanjut.', icon: BookOpen, link: '/materi' },
                            { title: 'Praktikum Virtual', desc: 'Eksperimen biologi secara aman dan interaktif dari mana saja.', icon: FlaskConical, link: '/flipbook' },
                            { title: 'Kuis Interaktif', desc: 'Uji pemahamanmu dengan kuis menarik dan langsung dapatkan hasilnya.', icon: BrainCircuit, link: '/leaderboard' },
                            { title: 'Progress Tracker', desc: 'Pantau perkembangan belajarmu dan capai target dengan konsisten.', icon: BarChart3, link: '/dashboard' }
                        ].map((feature, idx) => (
                            <Link href={feature.link} key={idx} className="bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-shadow border border-gray-100 relative group cursor-pointer block">
                                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-700 mb-6">
                                    <feature.icon size={24} />
                                </div>
                                <h3 className="font-bold text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed mb-6">{feature.desc}</p>
                                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-colors absolute bottom-6 right-6">
                                    <ArrowRight size={14} />
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* ─── Topik Populer ─────────────────────────── */}
                <section id="materi" className="py-20">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="flex items-end justify-between mb-10">
                            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                Topik Populer <Leaf className="text-emerald-500" size={24} />
                            </h2>
                            <Link href="/materi" className="text-sm font-semibold text-emerald-700 flex items-center gap-1 hover:text-emerald-800">
                                Lihat Semua <ArrowRight size={16} />
                            </Link>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                            {[
                                { title: 'Biologi Sel', desc: 'Pelajari struktur dan fungsi sel sebagai unit kehidupan.', img: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?q=80&w=400&h=300&fit=crop', progress: 75 },
                                { title: 'Genetika', desc: 'Memahami pewarisan sifat dan variasi pada makhluk hidup.', img: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=400&h=300&fit=crop', progress: 60 },
                                { title: 'Ekologi', desc: 'Mempelajari hubungan antara organisme dan lingkungannya.', img: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=400&h=300&fit=crop', progress: 45 },
                                { title: 'Sistem Tubuh', desc: 'Mengenal sistem organ dan cara kerjanya dalam tubuh manusia.', img: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=400&h=300&fit=crop', progress: 30 }
                            ].map((topic, idx) => (
                                <div key={idx} className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-100 flex flex-col">
                                    <div className="h-48 overflow-hidden">
                                        <img src={topic.img} alt={topic.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <div className="p-6 flex-1 flex flex-col">
                                        <h3 className="font-bold text-gray-900 mb-2">{topic.title}</h3>
                                        <p className="text-xs text-gray-500 leading-relaxed flex-1 mb-6">{topic.desc}</p>
                                        <div className="flex items-center justify-between text-xs font-bold text-gray-900 mb-2">
                                            <div className="h-1 flex-1 bg-gray-100 rounded-full overflow-hidden mr-4">
                                                <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${topic.progress}%` }}></div>
                                            </div>
                                            <span>{topic.progress}%</span>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Slide arrow floating right */}
                            <button className="absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-emerald-700 hover:scale-105 transition-transform hidden lg:flex z-10">
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                </section>

                {/* ─── Learning Path ───────────────────────── */}
                <section className="py-20 bg-gray-50/30">
                    <div className="max-w-5xl mx-auto px-6 text-center">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Perjalanan Belajarmu</h2>
                        <h3 className="text-3xl font-extrabold text-emerald-700 mb-20">Tumbuh Bersama Ilmu</h3>

                        <div className="relative flex flex-col md:flex-row justify-between items-center gap-12 md:gap-0">
                            {/* Connecting Line */}
                            <div className="hidden md:block absolute top-12 left-10 right-10 h-0.5 bg-emerald-200 -z-10">
                                <ArrowRight className="absolute -right-2 -top-2 text-emerald-700" size={20} />
                            </div>

                            {[
                                { num: '01', title: 'Dasar Biologi', desc: 'Kenali konsep dasar dan prinsip kehidupan.', icon: Leaf },
                                { num: '02', title: 'Genetika', desc: 'Pelajari materi genetik dan pewarisan sifat.', icon: Dna },
                                { num: '03', title: 'Ekologi', desc: 'Pahami interaksi makhluk hidup dengan lingkungannya.', icon: Activity },
                                { num: '04', title: 'Sistem Kehidupan', desc: 'Jelajahi sistem tubuh dan proses kehidupan yang kompleks.', icon: User }
                            ].map((step, idx) => (
                                <div key={idx} className="flex flex-col items-center relative z-10 w-48">
                                    <div className="w-24 h-24 rounded-full bg-white border-4 border-emerald-100 shadow-md flex items-center justify-center mb-6 text-emerald-700 relative">
                                        <step.icon size={36} strokeWidth={1.5} />
                                        {/* Connector dots on the circle */}
                                        {idx !== 0 && <div className="absolute -left-[5px] top-1/2 -translate-y-1/2 w-2 h-2 bg-emerald-500 rounded-full hidden md:block"></div>}
                                        {idx !== 3 && <div className="absolute -right-[5px] top-1/2 -translate-y-1/2 w-2 h-2 bg-emerald-500 rounded-full hidden md:block"></div>}
                                    </div>
                                    <p className="text-emerald-600 font-bold text-sm mb-1">{step.num}</p>
                                    <h4 className="font-bold text-gray-900 mb-2">{step.title}</h4>
                                    <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── Quote Section ───────────────────────── */}
                <section className="py-20">
                    <div className="max-w-5xl mx-auto px-6">
                        <div className="bg-emerald-50 rounded-[3rem] p-10 lg:p-16 flex flex-col lg:flex-row items-center gap-10 relative overflow-hidden">
                            {/* Decorative faint grid/dots */}
                            <div className="absolute right-0 top-0 w-1/2 h-full opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px]"></div>

                            <div className="flex-1 z-10 relative">
                                <span className="text-6xl text-emerald-700 font-serif absolute -top-4 -left-6 opacity-40">"</span>
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug mb-6 relative z-10">
                                    Biologi bukan tentang menghafal, tapi tentang memahami kehidupan.
                                </h2>
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-px bg-emerald-700"></div>
                                    <p className="font-bold text-emerald-700">Mari tumbuh bersama ilmu.</p>
                                </div>
                            </div>

                            <div className="flex-1 w-full flex justify-end z-10">
                                <img
                                    src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?q=80&w=600&h=400&fit=crop"
                                    alt="Plant in petri dish"
                                    className="w-full max-w-sm rounded-3xl shadow-xl border-4 border-white object-cover aspect-[4/3]"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* ─── Bottom CTA ──────────────────────────── */}
                <section className="py-10 pb-20">
                    <div className="max-w-5xl mx-auto px-6">
                        <div className="bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-[3rem] p-16 text-center relative overflow-hidden border border-emerald-100 shadow-sm">
                            {/* Decor */}
                            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-emerald-200/40 rounded-full blur-3xl"></div>
                            <div className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-200/40 rounded-full blur-3xl"></div>

                            <h2 className="text-3xl font-extrabold text-gray-900 mb-4 relative z-10">Siap Memulai Perjalananmu?</h2>
                            <p className="text-gray-600 mb-8 max-w-lg mx-auto text-sm relative z-10">
                                Ayo mulai belajar biologi dengan cara yang lebih seru dan bermakna.
                            </p>

                            {auth?.user ? (
                                <Link href="/dashboard" className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-700 text-white rounded-full font-bold hover:bg-emerald-800 transition-colors shadow-lg shadow-emerald-700/20 relative z-10 mb-6">
                                    Mulai Belajar Sekarang <ArrowRight size={18} />
                                </Link>
                            ) : (
                                <a href="/register" className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-700 text-white rounded-full font-bold hover:bg-emerald-800 transition-colors shadow-lg shadow-emerald-700/20 relative z-10 mb-6">
                                    Mulai Belajar Sekarang <ArrowRight size={18} />
                                </a>
                            )}

                            <div className="flex items-center justify-center gap-3 relative z-10">
                                <div className="flex -space-x-3">
                                    <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://i.pravatar.cc/100?img=1" alt="User 1" />
                                    <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://i.pravatar.cc/100?img=2" alt="User 2" />
                                    <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://i.pravatar.cc/100?img=3" alt="User 3" />
                                    <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://i.pravatar.cc/100?img=4" alt="User 4" />
                                </div>
                                <span className="text-xs text-gray-500 font-medium">Bergabung dengan ribuan pelajar lainnya</span>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
