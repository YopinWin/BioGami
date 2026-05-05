import React from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Lock, BookOpen } from 'lucide-react';

export default function Semester({ materi = [], kelas, semester, progress = [], total = 0 }) {
    const progressIds = Array.isArray(progress) ? progress : [];
    const avgTotal = Math.round(total || 0);

    return (
        <MainLayout>
            <Head title={`Kelas ${kelas} – Semester ${semester}`} />

            <div className="max-w-5xl mx-auto">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8 flex-wrap">
                    <a href="/materi" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">Pilih Kelas</a>
                    <span>/</span>
                    <a href={`/materi/${kelas}`} className="hover:text-green-600 dark:hover:text-green-400 transition-colors">Kelas {kelas}</a>
                    <span>/</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">Semester {semester}</span>
                </div>

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                            📘 Kelas {kelas} · Semester {semester}
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">
                            {materi.length} pertemuan tersedia
                        </p>
                    </div>

                    {/* Overall Progress */}
                    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-3 flex items-center gap-3 shadow-sm">
                        <div className="relative w-10 h-10">
                            <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
                                <circle cx="18" cy="18" r="14" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                                <circle cx="18" cy="18" r="14" fill="none" stroke="#22c55e" strokeWidth="3"
                                    strokeDasharray={`${(avgTotal / 100) * 87.96} 87.96`}
                                    strokeLinecap="round"
                                />
                            </svg>
                            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-800 dark:text-white">
                                {avgTotal}%
                            </span>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Rata-rata Nilai</p>
                            <p className="font-bold text-green-600 dark:text-green-400 text-sm">{avgTotal} / 100</p>
                        </div>
                    </div>
                </div>

                {/* Materi Grid */}
                {materi.length === 0 ? (
                    <div className="py-20 text-center">
                        <BookOpen size={48} className="mx-auto text-gray-200 dark:text-gray-700 mb-3" />
                        <p className="text-gray-400">Belum ada materi untuk semester ini.</p>
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {materi.map((m, i) => {
                            const done = progressIds.includes(m.id);
                            const isLocked = m.pertemuan_ke > 1 && !progressIds.includes(materi[i - 1]?.id);

                            return (
                                <motion.div
                                    key={m.id}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    whileHover={!isLocked ? { y: -4 } : {}}
                                >
                                    <a
                                        href={isLocked ? '#' : `/materi/detail/${m.id}`}
                                        className={`block h-full ${isLocked ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
                                        onClick={isLocked ? (e) => e.preventDefault() : undefined}
                                    >
                                        <div className={`
                                            relative h-full bg-white dark:bg-gray-900
                                            border rounded-2xl p-5 shadow-sm transition-all
                                            ${done
                                                ? 'border-green-300 dark:border-green-700 hover:shadow-green-500/10'
                                                : isLocked
                                                    ? 'border-gray-100 dark:border-gray-800'
                                                    : 'border-gray-100 dark:border-gray-800 hover:border-green-200 dark:hover:border-green-800 hover:shadow-lg'
                                            }
                                        `}>
                                            {/* Status badge */}
                                            <div className="flex items-center justify-between mb-3">
                                                <span className={`
                                                    text-xs font-bold px-2.5 py-1 rounded-full
                                                    ${done
                                                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                                                        : isLocked
                                                            ? 'bg-gray-100 dark:bg-gray-800 text-gray-500'
                                                            : 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400'
                                                    }
                                                `}>
                                                    Pertemuan {m.pertemuan_ke}
                                                </span>
                                                {done ? (
                                                    <CheckCircle size={18} className="text-green-500" />
                                                ) : isLocked ? (
                                                    <Lock size={16} className="text-gray-400" />
                                                ) : null}
                                            </div>

                                            <h3 className="font-bold text-gray-800 dark:text-gray-200 text-sm leading-snug mb-2 line-clamp-2">
                                                {m.judul || `Pertemuan ${m.pertemuan_ke}`}
                                            </h3>

                                            {done && (
                                                <div className="mt-3">
                                                    <div className="h-1.5 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                                                        <div className="h-full rounded-full bg-gradient-to-r from-green-400 to-emerald-500 w-full" />
                                                    </div>
                                                    <p className="text-xs text-green-600 dark:text-green-400 mt-1 font-medium">✓ Selesai</p>
                                                </div>
                                            )}
                                        </div>
                                    </a>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
