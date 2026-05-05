import React from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

const rankColors = ['text-amber-500', 'text-gray-400', 'text-orange-400'];
const rankBg = ['bg-amber-50', 'bg-gray-50', 'bg-orange-50'];
const rankMedal = ['🥇', '🥈', '🥉'];

export default function Leaderboard({ data = [] }) {
    return (
        <MainLayout>
            <Head title="Leaderboard" />

            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-50 border border-amber-100 shadow-sm mb-6 relative">
                        <div className="absolute inset-0 bg-amber-200/20 rounded-full blur-xl"></div>
                        <Trophy size={40} className="text-amber-500 relative z-10" />
                    </div>
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Peringkat Kelas</h1>
                    <p className="text-gray-500 mt-3 text-sm max-w-md mx-auto">Peringkat siswa terbaik berdasarkan rata-rata nilai evaluasi dan progres belajar.</p>
                </div>

                {/* Top 3 Podium */}
                {data.length >= 3 && (
                    <div className="flex items-end justify-center gap-6 mb-12 px-4">
                        {[1, 0, 2].map((i) => {
                            const d = data[i];
                            if (!d) return null;
                            const heights = ['h-40', 'h-48', 'h-36'];
                            return (
                                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                                    className={`flex-1 max-w-[200px] ${heights[i]} flex flex-col items-center justify-end pb-6 rounded-[2rem] ${rankBg[i]} border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative`}
                                >
                                    <div className="absolute -top-6 text-4xl drop-shadow-md">{rankMedal[i]}</div>
                                    <div className="w-14 h-14 rounded-full bg-[#118453] flex items-center justify-center text-white font-bold text-xl mb-3 shadow-md border-2 border-white">
                                        {d.name.charAt(0).toUpperCase()}
                                    </div>
                                    <p className="text-sm font-bold text-gray-900 text-center px-4 truncate w-full">{d.name}</p>
                                    <p className={`text-xl font-extrabold mt-1 ${rankColors[i]}`}>{Number(d.rata).toFixed(1)}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                )}

                {/* Full Table */}
                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
                    <div className="px-8 py-6 border-b border-gray-50 bg-gray-50/50">
                        <h2 className="font-extrabold text-gray-900">Semua Peringkat</h2>
                    </div>
                    <div className="divide-y divide-gray-50">
                        {data.map((d, i) => (
                            <motion.div key={d.user_id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                                className="px-8 py-5 flex items-center gap-6 hover:bg-emerald-50/30 transition-colors"
                            >
                                <div className={`w-8 text-center font-extrabold text-xl ${i < 3 ? rankColors[i] : 'text-gray-400'}`}>
                                    {i < 3 ? rankMedal[i] : i + 1}
                                </div>
                                <div className="w-12 h-12 rounded-full bg-[#118453] flex items-center justify-center text-white font-bold text-lg shadow-sm">
                                    {d.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex-1">
                                    <p className="font-bold text-gray-900 text-sm mb-0.5">{d.name}</p>
                                    <p className="text-[11px] text-gray-500 font-medium">Pelajar BioGami</p>
                                </div>
                                <div className="text-right">
                                    <div className="font-extrabold text-[#118453] text-lg">
                                        {Number(d.rata).toFixed(1)}
                                    </div>
                                </div>
                                {/* Progress bar */}
                                <div className="hidden sm:block w-32 ml-4">
                                    <div className="h-2 rounded-full bg-emerald-50 overflow-hidden">
                                        <div className="h-full rounded-full bg-[#118453]" style={{ width: `${Math.min(d.rata, 100)}%` }} />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                        {data.length === 0 && (
                            <div className="py-20 text-center text-gray-400">
                                <Trophy size={48} className="mx-auto mb-4 opacity-20 text-emerald-500" />
                                <p className="font-medium">Belum ada data leaderboard.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
