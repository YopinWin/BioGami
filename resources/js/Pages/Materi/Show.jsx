import React from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Video, ClipboardList, Target, BarChart2 } from 'lucide-react';

const menuItems = [
    { icon: FileText,     label: 'Materi / PPT',  emoji: '📂', color: 'from-green-400 to-emerald-500',  getHref: (id) => `/materi/detail/${id}/full` },
    { icon: Video,        label: 'Video',          emoji: '🎥', color: 'from-teal-400 to-cyan-500',     getHref: (id) => `/materi/video/${id}` },
    { icon: ClipboardList,label: 'Pre Test',       emoji: '📝', color: 'from-blue-400 to-indigo-500',   getHref: (id) => `/materi/soal/${id}?tipe=pre` },
    { icon: Target,       label: 'Post Test',      emoji: '🎯', color: 'from-orange-400 to-amber-500',  getHref: (id) => `/materi/soal/${id}?tipe=post` },
    { icon: BarChart2,    label: 'Raport',         emoji: '📊', color: 'from-purple-400 to-violet-500', getHref: (id) => `/materi/raport/${id}` },
];

export default function Show({ materi }) {
    return (
        <MainLayout>
            <Head title={materi?.judul ?? 'Detail Materi'} />

            <div className="max-w-3xl mx-auto">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8 flex-wrap">
                    <a href="/materi" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">Pilih Kelas</a>
                    <span>/</span>
                    <a href={`/materi/${materi?.kelas}`} className="hover:text-green-600 dark:hover:text-green-400 transition-colors">
                        Kelas {materi?.kelas}
                    </a>
                    <span>/</span>
                    <a href={`/materi/${materi?.kelas}/${materi?.semester}`} className="hover:text-green-600 dark:hover:text-green-400 transition-colors">
                        Semester {materi?.semester}
                    </a>
                    <span>/</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200 truncate max-w-[180px]">{materi?.judul}</span>
                </div>

                {/* Header Card */}
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-8 text-white mb-8 shadow-xl shadow-green-500/20">
                    <p className="text-green-100 text-sm font-medium mb-1">
                        Pertemuan {materi?.pertemuan_ke} · Kelas {materi?.kelas} · Semester {materi?.semester}
                    </p>
                    <h1 className="text-2xl font-extrabold leading-snug">📘 {materi?.judul}</h1>
                </div>

                {/* Menu Grid */}
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Pilih Aktivitas</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {menuItems.map(({ icon: Icon, label, emoji, color, getHref }) => (
                        <motion.a
                            key={label}
                            href={getHref(materi?.id)}
                            whileHover={{ y: -6, scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="block"
                        >
                            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 text-center shadow-sm hover:shadow-xl hover:shadow-green-500/10 hover:border-green-200 dark:hover:border-green-800 transition-all h-full">
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mx-auto mb-3 shadow-md text-2xl`}>
                                    {emoji}
                                </div>
                                <p className="font-bold text-gray-800 dark:text-gray-200 text-sm">{label}</p>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
}
