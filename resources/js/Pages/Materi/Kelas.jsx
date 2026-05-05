import React from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';

const semesterData = [
    {
        num: 1,
        emoji: '🌱',
        label: 'Semester 1',
        desc: '18 Pertemuan · Semester Ganjil',
        color: 'from-green-400 to-emerald-500',
        bg: 'bg-green-50 dark:bg-green-900/10',
        border: 'border-green-200 dark:border-green-800',
    },
    {
        num: 2,
        emoji: '🌿',
        label: 'Semester 2',
        desc: '18 Pertemuan · Semester Genap',
        color: 'from-teal-400 to-cyan-500',
        bg: 'bg-teal-50 dark:bg-teal-900/10',
        border: 'border-teal-200 dark:border-teal-800',
    },
];

export default function Kelas({ kelas }) {
    return (
        <MainLayout>
            <Head title={`Kelas ${kelas}`} />

            <div className="max-w-3xl mx-auto">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
                    <a href="/materi" className="flex items-center gap-1 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                        <ArrowLeft size={14} /> Pilih Kelas
                    </a>
                    <span>/</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">Kelas {kelas}</span>
                </div>

                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-green-100 dark:bg-green-900/20 mb-4">
                        <BookOpen size={32} className="text-green-600 dark:text-green-400" />
                    </div>
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">📚 Kelas {kelas}</h1>
                    <p className="text-gray-500 dark:text-gray-400">Pilih semester untuk mulai belajar</p>
                </div>

                {/* Semester Cards */}
                <div className="grid sm:grid-cols-2 gap-6">
                    {semesterData.map(({ num, emoji, label, desc, color, bg, border }, i) => (
                        <motion.div
                            key={num}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -8, scale: 1.02 }}
                        >
                            {/* Use <a> because semester route may still be Blade or Inertia */}
                            <a href={`/materi/${kelas}/${num}`} className="block h-full">
                                <div className={`relative h-full ${bg} border ${border} rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-green-500/10 transition-all`}>
                                    <div className={`bg-gradient-to-br ${color} p-10 text-white text-center`}>
                                        <div className="text-6xl mb-3">{emoji}</div>
                                        <h2 className="text-2xl font-extrabold">{label}</h2>
                                        <p className="text-white/80 text-sm mt-1">{desc}</p>
                                    </div>
                                    <div className="p-5 flex items-center justify-between">
                                        <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Lihat Pertemuan</span>
                                        <ArrowRight size={16} className="text-green-500" />
                                    </div>
                                </div>
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
}
