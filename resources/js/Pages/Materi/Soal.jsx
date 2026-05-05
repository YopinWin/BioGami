import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle, Send } from 'lucide-react';

export default function Soal({ materi, soal = [], id, tipe = 'pre' }) {
    const [current, setCurrent] = useState(0);
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const total = soal.length;
    const progress = total > 0 ? ((current + 1) / total) * 100 : 0;

    const handleAnswer = (soalId, value) => {
        setAnswers(prev => ({ ...prev, [soalId]: value }));
        setError('');
    };

    const goNext = () => {
        if (!answers[soal[current]?.id]) {
            setError('Pilih jawaban dulu!');
            return;
        }
        setCurrent(c => c + 1);
        setError('');
    };

    const goPrev = () => {
        setCurrent(c => c - 1);
        setError('');
    };

    const handleSubmit = (e) => {
        if (!answers[soal[current]?.id]) {
            e.preventDefault();
            setError('Pilih jawaban dulu!');
        }
    };

    const optionLabels = ['a', 'b', 'c', 'd'];
    const optionColors = [
        'hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/10',
        'hover:border-green-400 hover:bg-green-50 dark:hover:bg-green-900/10',
        'hover:border-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/10',
        'hover:border-red-400 hover:bg-red-50 dark:hover:bg-red-900/10',
    ];

    if (total === 0) {
        return (
            <MainLayout>
                <Head title={`${tipe.toUpperCase()} Test`} />
                <div className="max-w-xl mx-auto text-center py-20">
                    <div className="text-6xl mb-4">📭</div>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Soal belum tersedia</h2>
                    <p className="text-gray-500 mb-6">Belum ada soal {tipe} test untuk materi ini.</p>
                    <a href={`/materi/detail/${id}`}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-500 text-white font-semibold hover:bg-green-600 transition-colors"
                    >
                        <ArrowLeft size={16} /> Kembali ke Materi
                    </a>
                </div>
            </MainLayout>
        );
    }

    const currentSoal = soal[current];

    return (
        <MainLayout>
            <Head title={`${tipe.toUpperCase()} Test – ${materi?.judul}`} />

            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <a href={`/materi/detail/${id}`} className="inline-flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-green-600 mb-4 transition-colors">
                        <ArrowLeft size={14} /> Kembali ke Materi
                    </a>
                    <div className="flex items-center justify-between">
                        <div>
                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                                tipe === 'pre' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                            }`}>
                                {tipe} Test
                            </span>
                            <h1 className="text-xl font-extrabold text-gray-900 dark:text-white mt-2 line-clamp-1">{materi?.judul}</h1>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-extrabold text-green-600 dark:text-green-400">{current + 1}</p>
                            <p className="text-xs text-gray-400">dari {total}</p>
                        </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-4 h-2 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                        <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-green-400 to-emerald-500"
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.4 }}
                        />
                    </div>
                </div>

                {/* Question Card */}
                <form method="POST" action={`/materi/soal/${id}`} onSubmit={handleSubmit}>
                    <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]')?.content} />
                    <input type="hidden" name="tipe" value={tipe} />

                    {/* Hidden inputs for all answered questions */}
                    {Object.entries(answers).map(([soalId, val]) => (
                        <input key={soalId} type="hidden" name={`jawaban[${soalId}]`} value={val} />
                    ))}

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.25 }}
                        >
                            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-8 shadow-sm mb-4">
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Pertanyaan {current + 1}</p>
                                <p className="text-gray-900 dark:text-white font-semibold text-lg leading-relaxed mb-6">
                                    {currentSoal?.pertanyaan}
                                </p>

                                <div className="space-y-3">
                                    {optionLabels.map((opt, idx) => {
                                        const optText = currentSoal?.[opt];
                                        if (!optText) return null;
                                        const selected = answers[currentSoal?.id] === opt;
                                        return (
                                            <label
                                                key={opt}
                                                className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all
                                                    ${selected
                                                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                                                        : `border-gray-100 dark:border-gray-800 ${optionColors[idx]}`
                                                    }`}
                                            >
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold transition-colors
                                                    ${selected ? 'bg-green-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>
                                                    {opt.toUpperCase()}
                                                </div>
                                                <span className={`text-sm font-medium ${selected ? 'text-green-800 dark:text-green-300' : 'text-gray-700 dark:text-gray-300'}`}>
                                                    {optText}
                                                </span>
                                                <input
                                                    type="radio"
                                                    className="sr-only"
                                                    name={`jawaban[${currentSoal?.id}]`}
                                                    value={opt}
                                                    checked={selected}
                                                    onChange={() => handleAnswer(currentSoal?.id, opt)}
                                                />
                                            </label>
                                        );
                                    })}
                                </div>

                                {error && (
                                    <p className="mt-3 text-sm text-red-500 font-medium">⚠️ {error}</p>
                                )}
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation */}
                    <div className="flex items-center justify-between">
                        <button
                            type="button"
                            onClick={goPrev}
                            disabled={current === 0}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 font-medium text-sm hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                            <ArrowLeft size={15} /> Sebelumnya
                        </button>

                        {current < total - 1 ? (
                            <button
                                type="button"
                                onClick={goNext}
                                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-green-500 text-white font-semibold text-sm hover:bg-green-600 transition-colors shadow-md shadow-green-500/30"
                            >
                                Selanjutnya <ArrowRight size={15} />
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-sm hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg shadow-green-500/30"
                            >
                                <Send size={15} /> Submit
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </MainLayout>
    );
}
