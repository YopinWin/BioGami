import React from 'react';
import { motion } from 'framer-motion';
import { Dna, Microscope, Leaf, Zap, Brain, Trophy, ArrowRight } from 'lucide-react';

const LandingPage = () => {
    // Get dataset from the #app element (passed from Blade)
    const appEl = document.getElementById('app');
    const isAuth = appEl?.dataset.auth === 'true';
    const dashboardUrl = appEl?.dataset.dashboardUrl || '/dashboard';
    const loginUrl = appEl?.dataset.loginUrl || '/login';
    const registerUrl = appEl?.dataset.registerUrl || '/register';

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-['Outfit'] selection:bg-teal-500 selection:text-white overflow-x-hidden relative">
            
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-br from-teal-400/20 via-emerald-400/10 to-transparent -z-10 blur-3xl pointer-events-none" />
            <div className="absolute top-[20%] -right-[10%] w-[500px] h-[500px] bg-rose-400/10 rounded-full blur-3xl pointer-events-none" />

            {/* Navbar */}
            <motion.nav 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/70 dark:bg-slate-950/70 border-b border-slate-200/50 dark:border-slate-800/50"
            >
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="bg-gradient-to-br from-teal-500 to-emerald-600 p-2 rounded-xl text-white shadow-lg shadow-teal-500/30">
                            <Dna size={24} />
                        </div>
                        <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent dark:from-teal-400 dark:to-emerald-400">
                            BioGami
                        </span>
                    </div>

                    <div className="flex items-center gap-4 font-medium">
                        {isAuth ? (
                            <a 
                                href={dashboardUrl} 
                                className="px-6 py-2.5 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-lg shadow-slate-900/20"
                            >
                                Dashboard
                            </a>
                        ) : (
                            <>
                                <a href={loginUrl} className="text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Log in</a>
                                {registerUrl && (
                                    <a 
                                        href={registerUrl} 
                                        className="px-6 py-2.5 rounded-full bg-gradient-to-r from-teal-500 to-emerald-600 text-white hover:from-teal-600 hover:to-emerald-700 transition-all shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 hover:-translate-y-0.5"
                                    >
                                        Mulai Belajar
                                    </a>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </motion.nav>

            {/* Hero Section */}
            <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 min-h-[90vh]">
                
                {/* Left Content */}
                <div className="flex-1 text-center lg:text-left z-10">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 font-semibold text-sm mb-6 border border-teal-200 dark:border-teal-800/50"
                    >
                        <Zap size={16} className="text-amber-500" />
                        <span>Revolusi Belajar Biologi 2.0</span>
                    </motion.div>

                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-5xl lg:text-7xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6"
                    >
                        Jelajahi Dunia Biologi <br/>
                        Lebih <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-500">Menyenangkan</span>
                    </motion.h1>

                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-lg lg:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
                    >
                        BioGami menggabungkan teknologi AI interaktif, gamifikasi, dan materi berkualitas untuk membuat pengalaman belajar biologi yang tidak akan pernah Anda lupakan.
                    </motion.p>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
                    >
                        <a 
                            href={isAuth ? dashboardUrl : registerUrl} 
                            className="group flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-lg hover:scale-105 transition-transform shadow-xl shadow-slate-900/20 dark:shadow-white/10"
                        >
                            {isAuth ? 'Lanjutkan Belajar' : 'Mulai Sekarang Gratis'}
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                        {!isAuth && (
                            <a 
                                href="#features" 
                                className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-lg text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                            >
                                Pelajari Lebih Lanjut
                            </a>
                        )}
                    </motion.div>
                </div>

                {/* Right Hero Graphic */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="flex-1 relative w-full max-w-lg lg:max-w-none aspect-square z-10"
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-teal-400 to-emerald-300 rounded-[3rem] rotate-6 opacity-20 blur-lg animate-pulse" />
                    
                    <div className="relative w-full h-full bg-white/50 dark:bg-slate-900/50 backdrop-blur-2xl rounded-[3rem] border border-white/40 dark:border-slate-700/50 shadow-2xl p-8 flex items-center justify-center overflow-hidden group">
                        <div className="absolute top-10 left-10 p-4 bg-rose-100 dark:bg-rose-900/30 rounded-2xl shadow-lg -rotate-12 group-hover:rotate-0 transition-transform duration-500">
                            <Microscope size={48} className="text-rose-500" />
                        </div>
                        <div className="absolute bottom-10 right-10 p-4 bg-amber-100 dark:bg-amber-900/30 rounded-2xl shadow-lg rotate-12 group-hover:rotate-0 transition-transform duration-500">
                            <Leaf size={48} className="text-amber-500" />
                        </div>
                        
                        <div className="text-center">
                            <motion.div 
                                animate={{ y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            >
                                <Dna size={120} className="text-teal-500 mx-auto drop-shadow-xl" strokeWidth={1.5} />
                            </motion.div>
                            <h3 className="text-3xl font-black mt-6 text-slate-800 dark:text-white">BioGami AI</h3>
                            <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Asisten Pintar Biologi-mu</p>
                        </div>
                    </div>
                </motion.div>

            </div>

            {/* Features Section */}
            <div id="features" className="py-24 bg-white dark:bg-slate-900 relative z-10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-6">Mengapa Memilih BioGami?</h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400">Desain platform yang dirancang khusus untuk meningkatkan retensi belajar dan memaksimalkan potensi pemahaman siswa.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <motion.div 
                            whileHover={{ y: -10 }}
                            className="bg-slate-50 dark:bg-slate-950 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center mb-6 text-teal-600 dark:text-teal-400">
                                <Brain size={32} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">AI Assistant</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                Tanyakan apapun tentang materi biologi, AI kami siap membantu memberikan ringkasan yang akurat.
                            </p>
                        </motion.div>

                        {/* Card 2 */}
                        <motion.div 
                            whileHover={{ y: -10 }}
                            className="bg-slate-50 dark:bg-slate-950 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center mb-6 text-amber-600 dark:text-amber-400">
                                <Trophy size={32} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Gamifikasi & Leaderboard</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                Dapatkan poin dari setiap materi dan kuis yang diselesaikan. Bersaing sehat di Leaderboard global.
                            </p>
                        </motion.div>

                        {/* Card 3 */}
                        <motion.div 
                            whileHover={{ y: -10 }}
                            className="bg-slate-50 dark:bg-slate-950 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-rose-100 dark:bg-rose-900/50 flex items-center justify-center mb-6 text-rose-600 dark:text-rose-400">
                                <Leaf size={32} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Materi Komprehensif</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                Akses berbagai materi terstruktur dengan visualisasi yang memukau dan video pembelajaran.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="py-8 text-center text-slate-500 dark:text-slate-500 border-t border-slate-200 dark:border-slate-800">
                <p>&copy; {new Date().getFullYear()} BioGami. Crafted with ❤️ for better education.</p>
            </footer>

        </div>
    );
};

export default LandingPage;
