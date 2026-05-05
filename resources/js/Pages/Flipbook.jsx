import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { BookMarked, Microscope, Dna, TestTubes, Search, PlayCircle, Eye, Beaker, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';
import HTMLFlipBook from 'react-pageflip';

const Page = React.forwardRef((props, ref) => {
    return (
        <div className="demoPage bg-white border border-gray-200 shadow-[inset_0_0_20px_rgba(0,0,0,0.02)] h-full relative" ref={ref}>
            {/* Book spine shadow effect */}
            <div className={`absolute top-0 bottom-0 w-8 bg-gradient-to-r from-black/5 to-transparent z-10 pointer-events-none ${props.number % 2 === 0 ? 'left-0' : 'right-0 rotate-180'}`}></div>
            
            <div className="p-6 md:p-8 h-full flex flex-col relative z-20">
                <div className="text-xs font-bold text-gray-300 mb-4 border-b border-gray-100 pb-2 flex justify-between uppercase tracking-wider">
                    <span>BioGami</span>
                    <span>Hal. {props.number}</span>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {props.children}
                </div>
            </div>
        </div>
    );
});

export default function Flipbook() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activePracticum, setActivePracticum] = useState(null);

    const practicums = [
        {
            id: 1,
            title: 'Struktur Sel Hewan & Tumbuhan',
            category: 'Biologi Sel',
            desc: 'Eksplorasi interaktif organel sel dan fungsinya melalui model 3D.',
            icon: <Microscope size={32} strokeWidth={1.5} />,
            color: {
                bg: 'bg-emerald-50/50',
                blob: 'bg-emerald-200',
                iconBorder: 'border-emerald-100',
                iconText: 'text-emerald-600',
                badgeBg: 'bg-emerald-100',
                badgeText: 'text-emerald-700'
            },
            students: 124,
            duration: '45 Menit'
        },
        {
            id: 2,
            title: 'Ekstraksi DNA Sederhana',
            category: 'Genetika',
            desc: 'Simulasi virtual langkah-langkah memisahkan DNA dari buah kiwi.',
            icon: <Dna size={32} strokeWidth={1.5} />,
            color: {
                bg: 'bg-blue-50/50',
                blob: 'bg-blue-200',
                iconBorder: 'border-blue-100',
                iconText: 'text-blue-600',
                badgeBg: 'bg-blue-100',
                badgeText: 'text-blue-700'
            },
            students: 89,
            duration: '60 Menit'
        },
        {
            id: 3,
            title: 'Uji Zat Makanan',
            category: 'Biokimia',
            desc: 'Praktikum uji karbohidrat, protein, dan lemak pada bahan makanan.',
            icon: <Beaker size={32} strokeWidth={1.5} />,
            color: {
                bg: 'bg-amber-50/50',
                blob: 'bg-amber-200',
                iconBorder: 'border-amber-100',
                iconText: 'text-amber-600',
                badgeBg: 'bg-amber-100',
                badgeText: 'text-amber-700'
            },
            students: 210,
            duration: '90 Menit'
        },
        {
            id: 4,
            title: 'Proses Fotosintesis',
            category: 'Fisiologi Tumbuhan',
            desc: 'Mengamati pengaruh cahaya terhadap laju fotosintesis Hydrilla.',
            icon: <Leaf size={32} strokeWidth={1.5} />,
            color: {
                bg: 'bg-teal-50/50',
                blob: 'bg-teal-200',
                iconBorder: 'border-teal-100',
                iconText: 'text-teal-600',
                badgeBg: 'bg-teal-100',
                badgeText: 'text-teal-700'
            },
            students: 156,
            duration: '40 Menit'
        }
    ];

    const filteredPracticums = practicums.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase()));

    // Render active flipbook
    if (activePracticum) {
        return (
            <MainLayout>
                <Head title={`Flipbook - ${activePracticum.title}`} />
                
                <div className="mb-6 flex items-center justify-between">
                    <button 
                        onClick={() => setActivePracticum(null)}
                        className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-full shadow-sm text-gray-700 font-bold hover:bg-gray-50 hover:text-emerald-600 transition-colors focus:ring-4 focus:ring-emerald-50"
                    >
                        <span>&larr;</span> Kembali
                    </button>
                    <div className="w-24"></div> {/* Spacer for layout balance */}
                </div>

                {/* Flipbook Container */}
                <div className="bg-[#f3f4f6] rounded-[2.5rem] p-8 md:p-12 border border-gray-200 flex flex-col items-center justify-center min-h-[700px] shadow-inner relative overflow-hidden">
                    {/* decorative background */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-96 bg-gray-300/30 rounded-[100%] blur-[80px] -z-10 pointer-events-none"></div>
                    
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-extrabold text-gray-900 drop-shadow-sm">{activePracticum.title}</h2>
                        <p className="text-gray-500 font-medium mt-1">Balik halaman untuk mulai interaksi (Bisa digeser dengan mouse/sentuh)</p>
                    </div>

                    <HTMLFlipBook 
                        width={400} 
                        height={550} 
                        size="stretch"
                        minWidth={315}
                        maxWidth={450}
                        minHeight={450}
                        maxHeight={650}
                        maxShadowOpacity={0.5}
                        showCover={true}
                        mobileScrollSupport={true}
                        className="flip-book shadow-[0_20px_50px_rgba(0,0,0,0.15)] mx-auto rounded-md"
                    >
                        {/* COVER PAGE (PAGE 1) */}
                        <Page number={1}>
                            <div className={`h-full flex flex-col items-center justify-center text-center ${activePracticum.color.bg} rounded-r-xl border-l-[12px] border-emerald-600 p-8 relative overflow-hidden -m-6 md:-m-8 h-[calc(100%+3rem)] md:h-[calc(100%+4rem)]`}>
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/40 rounded-bl-full blur-xl"></div>
                                <div className={`w-24 h-24 rounded-3xl bg-white shadow-lg border border-white flex items-center justify-center ${activePracticum.color.iconText} mb-8 relative z-10`}>
                                    {activePracticum.icon}
                                </div>
                                <h1 className="text-3xl font-extrabold text-gray-900 mb-4 leading-tight">{activePracticum.title}</h1>
                                <span className={`px-4 py-1.5 rounded-full ${activePracticum.color.badgeBg} ${activePracticum.color.badgeText} text-xs font-bold shadow-sm`}>
                                    {activePracticum.category}
                                </span>
                                
                                <div className="mt-auto pt-10">
                                    <p className="text-sm font-extrabold text-emerald-600 tracking-widest uppercase">BioGami Flipbook</p>
                                </div>
                            </div>
                        </Page>

                        {/* PAGE 2 */}
                        <Page number={2}>
                            <div className="pt-4">
                                <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Pendahuluan</h2>
                                <p className="text-gray-600 leading-relaxed mb-4 text-sm md:text-base">
                                    Selamat datang di modul interaktif <strong>{activePracticum.title}</strong>. 
                                    Modul Flipbook ini dirancang untuk memberikan pengalaman laboratorium yang aman, interaktif, dan komprehensif.
                                </p>
                                <p className="text-gray-600 leading-relaxed text-sm md:text-base mb-6">
                                    {activePracticum.desc}
                                </p>
                                
                                <div className="mt-8 p-5 bg-amber-50/80 rounded-2xl border border-amber-100">
                                    <h4 className="font-extrabold text-amber-800 mb-2 flex items-center gap-2">
                                        <span className="text-xl">⚠️</span> Perhatian
                                    </h4>
                                    <p className="text-sm text-amber-700 leading-relaxed">Bacalah seluruh instruksi dan prosedur keselamatan virtual sebelum memulai simulasi pada halaman berikutnya.</p>
                                </div>
                            </div>
                        </Page>

                        {/* PAGE 3 */}
                        <Page number={3}>
                            <div className="pt-4 h-full flex flex-col">
                                <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Area Simulasi Virtual</h2>
                                <div className="w-full flex-1 min-h-[250px] bg-gray-900 rounded-3xl shadow-inner flex flex-col items-center justify-center text-white relative overflow-hidden mb-6">
                                    <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-20"></div>
                                    <PlayCircle size={48} className="text-emerald-400 mb-4 opacity-80" />
                                    <p className="font-medium opacity-80">Menyiapkan Alat & Bahan...</p>
                                </div>
                                <div className="flex gap-4">
                                    <button className="flex-1 bg-emerald-50 text-emerald-700 py-3 rounded-xl font-bold text-sm border border-emerald-200 hover:bg-emerald-100 transition-colors">Reset</button>
                                    <button className="flex-1 bg-emerald-600 text-white py-3 rounded-xl font-bold text-sm shadow-md hover:bg-emerald-700 transition-colors">Mulai Simulasi</button>
                                </div>
                            </div>
                        </Page>

                        {/* PAGE 4 */}
                        <Page number={4}>
                            <div className="pt-4 h-full flex flex-col">
                                <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Catatan Praktikum</h2>
                                <p className="text-sm text-gray-600 mb-4">Catat hasil observasi dan kesimpulan dari simulasi yang telah Anda lakukan.</p>
                                <div className="flex-1 mb-6">
                                    <textarea 
                                        className="w-full h-full p-4 border border-gray-200 rounded-2xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none resize-none transition-all custom-scrollbar text-sm"
                                        placeholder="Tulis hasil pengamatanmu di sini..."
                                    ></textarea>
                                </div>
                                <button className="w-full bg-gray-900 text-white py-3.5 rounded-xl font-bold shadow-md hover:bg-gray-800 transition-colors">
                                    Simpan Hasil Pengamatan
                                </button>
                            </div>
                        </Page>
                    </HTMLFlipBook>
                </div>
            </MainLayout>
        );
    }

    // Render Grid List
    return (
        <MainLayout>
            <Head title="Praktikum Virtual" />

            {/* Hero Banner */}
            <div className="relative overflow-hidden rounded-[2.5rem] bg-emerald-900 p-8 md:p-12 mb-10 border border-emerald-800 shadow-xl flex items-center min-h-[280px]">
                {/* Decorative Elements */}
                <div className="absolute -left-20 -top-20 w-96 h-96 bg-emerald-600/30 rounded-full blur-3xl" />
                <div className="absolute right-0 bottom-0 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl" />
                <div className="absolute top-[10%] right-[5%] w-48 h-48 opacity-40 mix-blend-screen filter drop-shadow-2xl">
                    <img src="/images/hero_cell.png" alt="Cell" className="w-full h-full object-cover" onError={(e) => e.target.style.display = 'none'} />
                </div>

                <div className="relative z-10 max-w-2xl text-white">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-800/50 border border-emerald-700 backdrop-blur-sm text-emerald-100 text-xs font-bold mb-5 shadow-sm">
                        <span className="text-base">🧪</span> Laboratorium Interaktif
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight drop-shadow-md">
                        Praktikum Virtual
                    </h1>
                    <p className="text-emerald-100/80 text-base md:text-lg max-w-xl leading-relaxed mb-8">
                        Eksplorasi konsep biologi melalui simulasi laboratorium yang aman, interaktif, dan dapat diakses dari mana saja.
                    </p>
                    
                    <div className="relative max-w-md">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search size={18} className="text-emerald-300" />
                        </div>
                        <input 
                            type="text" 
                            placeholder="Cari modul praktikum..."
                            className="w-full pl-11 pr-4 py-3.5 bg-emerald-800/40 border border-emerald-600/50 rounded-2xl text-white placeholder-emerald-300/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:bg-emerald-800/60 backdrop-blur-sm transition-all shadow-inner"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm">
                        <TestTubes size={22} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Modul Tersedia</h2>
                        <p className="text-sm text-gray-500 font-medium">Pilih simulasi praktikum yang ingin kamu mulai.</p>
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
                {filteredPracticums.length > 0 ? (
                    filteredPracticums.map((prac) => (
                        <motion.div 
                            key={prac.id} 
                            whileHover={{ y: -6 }}
                            className="group bg-white rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col hover:shadow-xl hover:border-emerald-100 transition-all duration-300"
                        >
                            {/* Card Header (Icon & Category) */}
                            <div className={`p-6 ${prac.color.bg} relative overflow-hidden border-b border-gray-50`}>
                                <div className={`absolute -right-10 -top-10 w-32 h-32 ${prac.color.blob} rounded-full blur-2xl opacity-40 group-hover:scale-150 transition-transform duration-700`}></div>
                                
                                <div className="flex justify-between items-start relative z-10">
                                    <div className={`w-14 h-14 rounded-2xl bg-white shadow-sm border ${prac.color.iconBorder} flex items-center justify-center ${prac.color.iconText}`}>
                                        {prac.icon}
                                    </div>
                                    <span className={`px-3 py-1 rounded-full ${prac.color.badgeBg} ${prac.color.badgeText} text-xs font-bold shadow-sm`}>
                                        {prac.category}
                                    </span>
                                </div>
                            </div>

                            {/* Card Body */}
                            <div className="p-6 flex-1 flex flex-col">
                                <h3 className="text-xl font-extrabold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">{prac.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed mb-6 flex-1">{prac.desc}</p>
                                
                                <div className="flex items-center gap-3 text-xs font-bold text-gray-500 mb-6">
                                    <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-xl">
                                        <Eye size={14} className="text-gray-400" /> {prac.students} Siswa
                                    </div>
                                    <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-xl">
                                        <PlayCircle size={14} className="text-gray-400" /> {prac.duration}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center gap-3 mt-auto">
                                    <button 
                                        onClick={() => setActivePracticum(prac)} 
                                        className="flex-1 text-center bg-gray-900 text-white py-3.5 rounded-xl font-bold text-sm hover:bg-emerald-600 transition-colors shadow-md group-hover:shadow-lg focus:ring-4 focus:ring-emerald-100"
                                    >
                                        Buka Flipbook
                                    </button>
                                    <button onClick={() => alert('Disimpan ke bookmark!')} className="w-12 h-12 flex flex-shrink-0 items-center justify-center rounded-xl bg-white text-gray-400 hover:bg-emerald-50 hover:text-emerald-600 transition-colors border border-gray-200 shadow-sm hover:border-emerald-200 focus:ring-4 focus:ring-emerald-50">
                                        <BookMarked size={18} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center bg-gray-50/50 rounded-[2.5rem] border border-gray-100 border-dashed">
                        <div className="inline-flex w-20 h-20 rounded-[2rem] bg-white border border-gray-100 shadow-sm items-center justify-center text-gray-400 mb-5">
                            <Search size={32} />
                        </div>
                        <h3 className="text-xl font-extrabold text-gray-900 mb-2">Pencarian Tidak Ditemukan</h3>
                        <p className="text-gray-500 text-sm max-w-sm mx-auto mb-6 leading-relaxed">Tidak ada modul praktikum yang cocok dengan kata kunci "{searchQuery}". Coba gunakan kata kunci lain.</p>
                        <button 
                            onClick={() => setSearchQuery('')}
                            className="px-6 py-3 bg-white border border-gray-200 shadow-sm rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors focus:ring-4 focus:ring-gray-100"
                        >
                            Reset Pencarian
                        </button>
                    </div>
                )}
            </div>
            
        </MainLayout>
    );
}
