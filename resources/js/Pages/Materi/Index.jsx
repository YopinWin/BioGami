import React from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight } from 'lucide-react';

const kelasList = [
    {
        kelas: 'X',
        label: 'Kelas X',
        emoji: '🌱',
        desc: 'Pengantar biologi, sel, dan klasifikasi makhluk hidup',
        color: 'from-green-400 to-emerald-500',
        bg: 'bg-green-50 dark:bg-green-900/10',
        border: 'border-green-200 dark:border-green-800',
    },
    {
        kelas: 'XI',
        label: 'Kelas XI',
        emoji: '🧬',
        desc: 'Biologi sel lanjut, sistem organ, dan metabolisme',
        color: 'from-teal-400 to-cyan-500',
        bg: 'bg-teal-50 dark:bg-teal-900/10',
        border: 'border-teal-200 dark:border-teal-800',
    },
    {
        kelas: 'XII',
        label: 'Kelas XII',
        emoji: '🔬',
        desc: 'Genetika, evolusi, bioteknologi, dan ekologi',
        color: 'from-emerald-500 to-green-600',
        bg: 'bg-emerald-50 dark:bg-emerald-900/10',
        border: 'border-emerald-200 dark:border-emerald-800',
    },
];

export default function MateriIndex() {
    return (
        <MainLayout>
            <Head title="Pilih Kelas" />

            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-green-100 dark:bg-green-900/20 mb-4">
                        <BookOpen size={32} className="text-green-600 dark:text-green-400" />
                    </div>
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-3">📚 Materi Pembelajaran</h1>
                    <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">Pilih kelas untuk memulai belajar biologi. Setiap kelas tersedia materi lengkap dengan video, soal, dan kuis.</p>
                </div>

                {/* Class Cards */}
                <div className="grid md:grid-cols-3 gap-6">
                    {kelasList.map(({ kelas, label, emoji, desc, color, bg, border }, i) => (
                        <motion.div
                            key={kelas}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -8, scale: 1.02 }}
                        >
                            <Link href={`/materi/${kelas}`} className="block h-full">
                                <div className={`relative h-full ${bg} border ${border} rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-green-500/10 transition-all`}>
                                    {/* Gradient Header */}
                                    <div className={`bg-gradient-to-br ${color} p-8 text-white text-center`}>
                                        <div className="text-5xl mb-3">{emoji}</div>
                                        <h2 className="text-2xl font-extrabold">{label}</h2>
                                    </div>

                                    {/* Body */}
                                    <div className="p-6">
                                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{desc}</p>
                                        <div className="flex items-center gap-1 text-green-600 dark:text-green-400 font-semibold text-sm group">
                                            Pilih Kelas
                                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Info Banner */}
                <div className="mt-8 p-5 rounded-2xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 flex items-start gap-4">
                    <div className="text-2xl">💡</div>
                    <div>
                        <p className="font-semibold text-green-800 dark:text-green-300 text-sm">Tips Belajar</p>
                        <p className="text-green-700 dark:text-green-400 text-sm mt-0.5">Selesaikan Pre-Test sebelum membaca materi, lalu kerjakan Post-Test untuk mengukur pemahamanmu. Setiap penyelesaian akan menaikkan peringkatmu di Leaderboard!</p>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
