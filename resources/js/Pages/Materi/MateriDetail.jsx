import React from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { ArrowLeft } from 'lucide-react';

export default function MateriDetail({ materi }) {
    return (
        <MainLayout>
            <Head title={`Materi – ${materi?.judul}`} />

            <div className="max-w-3xl mx-auto">
                {/* Back */}
                <a href={`/materi/detail/${materi?.id}`}
                    className="inline-flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-green-600 mb-8 transition-colors"
                >
                    <ArrowLeft size={14} /> Kembali ke Menu
                </a>

                {/* Header */}
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-8 text-white mb-8 shadow-xl shadow-green-500/20">
                    <p className="text-green-100 text-sm mb-1">
                        📂 Materi / PPT · Pertemuan {materi?.pertemuan_ke} · Kelas {materi?.kelas}
                    </p>
                    <h1 className="text-2xl font-extrabold">{materi?.judul}</h1>
                </div>

                {/* Content */}
                <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-8 shadow-sm">
                    <div className="prose prose-green dark:prose-invert max-w-none text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap text-base">
                        {materi?.konten
                            ? materi.konten
                            : (
                                <div className="text-center py-12 text-gray-400">
                                    <div className="text-5xl mb-3">📭</div>
                                    <p>Materi belum tersedia untuk pertemuan ini.</p>
                                </div>
                            )
                        }
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-6 flex gap-3">
                    <a href={`/materi/soal/${materi?.id}?tipe=pre`}
                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full bg-blue-500 text-white font-semibold text-sm hover:bg-blue-600 transition-colors shadow-md"
                    >
                        📝 Kerjakan Pre Test
                    </a>
                    <a href={`/materi/soal/${materi?.id}?tipe=post`}
                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full bg-green-500 text-white font-semibold text-sm hover:bg-green-600 transition-colors shadow-md shadow-green-500/30"
                    >
                        🎯 Kerjakan Post Test
                    </a>
                </div>
            </div>
        </MainLayout>
    );
}
