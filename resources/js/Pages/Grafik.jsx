import React from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { BarChart2 } from 'lucide-react';

export default function Grafik({ data = [] }) {
    const maxVal = 100;

    return (
        <MainLayout>
            <Head title="Grafik Perkembangan" />

            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3 tracking-tight">
                        <BarChart2 className="text-emerald-500" size={32} /> Grafik Perkembangan
                    </h1>
                    <p className="text-gray-500 mt-2">Perbandingan nilai Pre-Test dan Post-Test setiap pertemuan</p>
                </div>

                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8">
                    {/* Legend */}
                    <div className="flex items-center gap-6 mb-8 bg-gray-50 w-fit px-4 py-2 rounded-full border border-gray-100">
                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-400" /><span className="text-xs font-bold text-gray-600">Pre-Test</span></div>
                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#118453]" /><span className="text-xs font-bold text-gray-600">Post-Test</span></div>
                    </div>

                    {data.length === 0 ? (
                        <div className="py-24 text-center">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <BarChart2 size={40} className="text-gray-300" />
                            </div>
                            <p className="text-gray-500 font-medium">Belum ada data grafik. Mulai kerjakan soal!</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <div className="min-w-[500px]">
                                {/* Bar chart */}
                                <div className="flex items-end gap-6 h-64 border-b border-gray-100 pb-2">
                                    {data.map((d, i) => (
                                        <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                            <div className="w-full flex items-end justify-center gap-1.5 h-52">
                                                {/* Pre bar */}
                                                <div className="w-10 flex flex-col justify-end h-full">
                                                    <div
                                                        className="w-full rounded-t-lg bg-blue-300 transition-all duration-700 hover:bg-blue-400 relative group"
                                                        style={{ height: `${(d.pre / maxVal) * 100}%`, minHeight: 4 }}
                                                    >
                                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity shadow-md">
                                                            {d.pre}
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Post bar */}
                                                <div className="w-10 flex flex-col justify-end h-full">
                                                    <div
                                                        className="w-full rounded-t-lg bg-[#118453] transition-all duration-700 hover:bg-emerald-800 relative group"
                                                        style={{ height: `${(d.post / maxVal) * 100}%`, minHeight: 4 }}
                                                    >
                                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity shadow-md">
                                                            {d.post}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-xs text-gray-500 font-bold uppercase">Pert {d.pertemuan_ke}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Summary Table */}
                                <div className="mt-10 overflow-hidden rounded-[1.5rem] border border-gray-100 shadow-sm">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="bg-emerald-50/50">
                                                <th className="py-4 px-6 text-left font-bold text-gray-700">Pertemuan</th>
                                                <th className="py-4 px-6 text-center font-bold text-blue-600">Pre-Test</th>
                                                <th className="py-4 px-6 text-center font-bold text-emerald-700">Post-Test</th>
                                                <th className="py-4 px-6 text-center font-bold text-gray-700">Peningkatan</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50 bg-white">
                                            {data.map((d, i) => {
                                                const delta = d.post - d.pre;
                                                return (
                                                    <tr key={i} className="hover:bg-emerald-50/30 transition-colors">
                                                        <td className="py-4 px-6 font-semibold text-gray-900">Pertemuan {d.pertemuan_ke}</td>
                                                        <td className="py-4 px-6 text-center text-blue-600 font-bold">{d.pre}</td>
                                                        <td className="py-4 px-6 text-center text-[#118453] font-bold">{d.post}</td>
                                                        <td className="py-4 px-6 text-center">
                                                            <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-bold ${delta >= 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}>
                                                                {delta >= 0 ? '+' : ''}{delta.toFixed(1)}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
