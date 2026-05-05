import React from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { ArrowLeft, PlayCircle } from 'lucide-react';

export default function Video({ materi }) {
    const videoUrl = materi?.video ?? '';

    // Convert YouTube watch URL to embed URL
    const getEmbedUrl = (url) => {
        if (!url) return null;
        const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
        if (match) return `https://www.youtube.com/embed/${match[1]}?rel=0&modestbranding=1`;
        if (url.includes('embed')) return url;
        return url;
    };

    const embedUrl = getEmbedUrl(videoUrl);

    return (
        <MainLayout>
            <Head title={`Video – ${materi?.judul}`} />

            <div className="max-w-3xl mx-auto">
                {/* Back */}
                <a href={`/materi/detail/${materi?.id}`}
                    className="inline-flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-green-600 mb-8 transition-colors"
                >
                    <ArrowLeft size={14} /> Kembali ke Materi
                </a>

                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                        <PlayCircle className="text-green-500" /> Video Pembelajaran
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        {materi?.judul} · Pertemuan {materi?.pertemuan_ke} · Kelas {materi?.kelas}
                    </p>
                </div>

                {/* Video Player */}
                <div className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm">
                    {embedUrl ? (
                        <div className="aspect-video">
                            <iframe
                                src={embedUrl}
                                title="Video Pembelajaran"
                                className="w-full h-full"
                                allowFullScreen
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            />
                        </div>
                    ) : (
                        <div className="aspect-video flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800">
                            <div className="text-6xl mb-4">🎬</div>
                            <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-2">Video Belum Tersedia</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Video untuk materi ini belum diunggah.</p>
                        </div>
                    )}

                    {/* Info */}
                    <div className="p-6 border-t border-gray-100 dark:border-gray-800">
                        <h2 className="font-bold text-gray-900 dark:text-white mb-1">{materi?.judul}</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Pertemuan {materi?.pertemuan_ke} · Kelas {materi?.kelas} · Semester {materi?.semester}
                        </p>
                    </div>
                </div>

                {/* Next actions */}
                <div className="flex gap-3 mt-6">
                    <a href={`/materi/soal/${materi?.id}?tipe=pre`}
                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 font-medium text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        📝 Pre Test
                    </a>
                    <a href={`/materi/soal/${materi?.id}?tipe=post`}
                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full bg-green-500 text-white font-semibold text-sm hover:bg-green-600 transition-colors shadow-md shadow-green-500/30"
                    >
                        🎯 Post Test
                    </a>
                </div>
            </div>
        </MainLayout>
    );
}
