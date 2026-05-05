import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { User, Mail, Lock, Trash2, Save, AlertTriangle } from 'lucide-react';

export default function Profile({ user, status }) {
    const [name, setName] = useState(user?.name ?? '');
    const [email, setEmail] = useState(user?.email ?? '');
    const [deletePassword, setDeletePassword] = useState('');
    const [showDelete, setShowDelete] = useState(false);

    return (
        <MainLayout>
            <Head title="Profil Saya" />

            <div className="max-w-2xl mx-auto space-y-8">
                <div className="mb-10 text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-50 border border-emerald-100 shadow-sm mb-6 relative">
                        <div className="absolute inset-0 bg-emerald-200/20 rounded-full blur-xl"></div>
                        <User size={40} className="text-[#118453] relative z-10" />
                    </div>
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Profil Saya</h1>
                    <p className="text-gray-500 mt-2 text-sm max-w-md mx-auto">Kelola informasi akun dan pengaturan keamanan.</p>
                </div>

                {status === 'profile-updated' && (
                    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-bold flex items-center justify-center shadow-sm">
                        ✅ Profil berhasil diperbarui!
                    </div>
                )}

                {/* Update Profile */}
                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8">
                    <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <User size={20} className="text-emerald-500" /> Informasi Profil
                    </h2>

                    <form method="POST" action="/profile" className="space-y-5">
                        <input type="hidden" name="_method" value="PATCH" />
                        <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]')?.content} />

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Nama Lengkap</label>
                            <input
                                type="text"
                                name="name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm font-medium shadow-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                            <div className="relative">
                                <Mail size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-5 py-3.5 rounded-2xl border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm font-medium shadow-sm"
                                />
                            </div>
                        </div>

                        <button type="submit"
                            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#118453] hover:bg-emerald-800 text-white font-bold text-sm transition-colors shadow-lg shadow-emerald-700/20"
                        >
                            <Save size={16} /> Simpan Perubahan
                        </button>
                    </form>
                </div>

                {/* Update Password */}
                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8">
                    <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <Lock size={20} className="text-emerald-500" /> Ubah Password
                    </h2>

                    <form method="POST" action="/password" className="space-y-5">
                        <input type="hidden" name="_method" value="PUT" />
                        <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]')?.content} />

                        {[
                            { name: 'current_password', label: 'Password Saat Ini' },
                            { name: 'password', label: 'Password Baru' },
                            { name: 'password_confirmation', label: 'Konfirmasi Password Baru' },
                        ].map(({ name, label }) => (
                            <div key={name}>
                                <label className="block text-sm font-bold text-gray-700 mb-2">{label}</label>
                                <input type="password" name={name}
                                    className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm font-medium shadow-sm"
                                />
                            </div>
                        ))}

                        <button type="submit"
                            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#118453] hover:bg-emerald-800 text-white font-bold text-sm transition-colors shadow-lg shadow-emerald-700/20"
                        >
                            <Lock size={16} /> Ubah Password
                        </button>
                    </form>
                </div>

                {/* Delete Account */}
                <div className="bg-red-50/50 rounded-[2rem] border border-red-100 shadow-sm p-8">
                    <h2 className="text-lg font-bold text-red-600 mb-2 flex items-center gap-2">
                        <Trash2 size={20} /> Hapus Akun
                    </h2>
                    <p className="text-sm text-red-500 mb-6 font-medium">Tindakan ini permanen dan tidak dapat dibatalkan. Semua data akan terhapus.</p>

                    {!showDelete ? (
                        <button onClick={() => setShowDelete(true)}
                            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white border border-red-200 text-red-600 font-bold text-sm hover:bg-red-50 hover:border-red-300 transition-colors shadow-sm"
                        >
                            <AlertTriangle size={16} /> Hapus Akun Saya
                        </button>
                    ) : (
                        <form method="POST" action="/profile" className="space-y-5 bg-white p-6 rounded-2xl border border-red-100 shadow-sm">
                            <input type="hidden" name="_method" value="DELETE" />
                            <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]')?.content} />
                            
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Konfirmasi Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={deletePassword}
                                    onChange={e => setDeletePassword(e.target.value)}
                                    placeholder="Masukkan password Anda"
                                    className="w-full px-5 py-3.5 rounded-2xl border border-red-200 bg-red-50/50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent text-sm font-medium"
                                />
                            </div>

                            <div className="flex gap-3">
                                <button type="button" onClick={() => setShowDelete(false)}
                                    className="px-6 py-3 rounded-full border border-gray-200 bg-gray-50 text-gray-600 font-bold text-sm hover:bg-gray-100 transition-colors"
                                >
                                    Batal
                                </button>
                                <button type="submit"
                                    className="px-6 py-3 rounded-full bg-red-500 hover:bg-red-600 text-white font-bold text-sm transition-colors shadow-md shadow-red-500/20"
                                >
                                    Ya, Hapus Sekarang
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
