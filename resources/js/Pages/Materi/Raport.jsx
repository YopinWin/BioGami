import React from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { motion } from 'framer-motion';
import { ArrowLeft, RotateCcw, Home } from 'lucide-react';

function getPlant(avg) {
    if (avg >= 90) return { emoji: '🌳', label: 'Pohon Besar', color: 'text-green-600' };
    if (avg >= 75) return { emoji: '🌲', label: 'Pohon Kecil', color: 'text-emerald-600' };
    if (avg >= 60) return { emoji: '🌿', label: 'Tanaman Kecil', color: 'text-teal-600' };
    if (avg >= 40) return { emoji: '🌱', label: 'Tunas', color: 'text-lime-600' };
    return { emoji: '🌰', label: 'Biji', color: 'text-amber-700' };
}

function ScoreBar({ label, value, color }) {
    return (
        <div>
            <div className="flex justify-between text-sm mb-1.5">
                <span className="font-medium text-gray-600 dark:text-gray-400">{label}</span>
                <span className="font-bold text-gray-900 dark:text-white">{Math.round(value)}</span>
            </div>
            <div className="h-3 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                <motion.div
                    className={`h-full rounded-full ${color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(value, 100)}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                />
            </div>
        </div>
    );
}

export default function Raport({ materi, pre = 0, post = 0, auth }) {
    const preVal = Math.round(pre || 0);
    const postVal = Math.round(post || 0);
    const rata = (preVal + postVal) / 2;
    const plant = getPlant(rata);
    const delta = postVal - preVal;

    return (
        <MainLayout>
            <Head title={`Raport – ${materi?.judul}`} />

            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <a href={`/materi/detail/${materi?.id}`}
                        className="inline-flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-green-600 mb-4 transition-colors"
                    >
                        <ArrowLeft size={14} /> Kembali ke Materi
                    </a>
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">📜 Raport Pembelajaran</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">{materi?.judul}</p>
                </div>

                {/* Scroll-style Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-b from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-900 border border-amber-200 dark:border-amber-900/30 rounded-3xl overflow-hidden shadow-xl"
                >
                    {/* Top scroll rod */}
                    <div className="h-5 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 rounded-t-3xl" />

                    <div className="p-8">
                        {/* Student Info */}
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white text-2xl font-extrabold mx-auto mb-3 shadow-lg">
                                {auth?.user?.name?.charAt(0)?.toUpperCase() ?? '?'}
                            </div>
                            <p className="font-bold text-gray-800 dark:text-gray-200 text-lg">{auth?.user?.name}</p>
                            <p className="text-sm text-gray-500">Pertemuan {materi?.pertemuan_ke} · Kelas {materi?.kelas}</p>
                        </div>

                        {/* Plant Avatar */}
                        <motion.div
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ repeat: Infinity, duration: 3 }}
                            className="text-center mb-8"
                        >
                            <div className="text-8xl mb-2">{plant.emoji}</div>
                            <p className={`font-bold text-lg ${plant.color}`}>{plant.label}</p>
                        </motion.div>

                        {/* Scores */}
                        <div className="space-y-4 mb-6">
                            <ScoreBar label="📘 Pre Test" value={preVal} color="bg-blue-400" />
                            <ScoreBar label="📗 Post Test" value={postVal} color="bg-green-500" />
                            <ScoreBar label="📊 Rata-rata" value={rata} color="bg-gradient-to-r from-green-400 to-emerald-500" />
                        </div>

                        {/* Delta */}
                        <div className={`text-center py-4 px-6 rounded-2xl mb-6 ${
                            delta >= 0
                                ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                                : 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                        }`}>
                            <p className="text-2xl font-extrabold">
                                {delta >= 0 ? '📈' : '📉'} {delta >= 0 ? '+' : ''}{delta} poin
                            </p>
                            <p className="text-sm font-medium mt-1">
                                {delta >= 0 ? 'Peningkatan dari Pre ke Post Test' : 'Penurunan dari Pre ke Post Test'}
                            </p>
                        </div>

                        {/* Motivasi */}
                        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur rounded-2xl p-5 text-center text-sm text-gray-600 dark:text-gray-400 italic border border-amber-200/50 dark:border-gray-700">
                            🌱 Teruslah belajar dan berkembang, karena setiap usaha kecil hari ini akan menjadi keberhasilan besar di masa depan.
                        </div>
                    </div>

                    {/* Bottom scroll rod */}
                    <div className="h-5 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 rounded-b-3xl" />
                </motion.div>

                {/* Actions */}
                <div className="flex gap-3 mt-6">
                    <a href="/dashboard"
                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 font-medium text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        <Home size={15} /> Dashboard
                    </a>
                    <a href={`/materi/${materi?.kelas}/${materi?.semester}`}
                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full bg-green-500 text-white font-semibold text-sm hover:bg-green-600 transition-colors shadow-md shadow-green-500/30"
                    >
                        <RotateCcw size={15} /> Lanjut Materi
                    </a>
                </div>
            </div>
        </MainLayout>
    );
}
