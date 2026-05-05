import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
    Home, BookOpen, Trophy, BarChart2, Users, BookMarked,
    Menu, X, LogOut, User, Dna, MessageCircle, Send
} from 'lucide-react';

const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: Home },
    { href: '/materi', label: 'Materi', icon: BookOpen },
    { href: '/leaderboard', label: 'Leaderboard', icon: Trophy },
    { href: '/grafik', label: 'Grafik', icon: BarChart2 },
    { href: '/flipbook', label: 'Praktikum', icon: BookMarked },
    { href: '/team', label: 'Tentang', icon: Users },
];

export default function MainLayout({ children }) {
    const { auth } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [chatOpen, setChatOpen] = useState(false);
    const [chatMessages, setChatMessages] = useState([
        { role: 'ai', text: 'Halo! Saya BioGami AI 🌿 Ada yang ingin kamu tanyakan tentang biologi?' }
    ]);
    const [chatInput, setChatInput] = useState('');
    const [chatLoading, setChatLoading] = useState(false);

    const sendChat = async () => {
        if (!chatInput.trim() || chatLoading) return;
        const q = chatInput.trim();
        setChatInput('');
        setChatMessages(m => [...m, { role: 'user', text: q }]);
        setChatLoading(true);
        try {
            const res = await fetch('/ai-ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content
                },
                body: JSON.stringify({ question: q })
            });
            const data = await res.json();
            setChatMessages(m => [...m, { role: 'ai', text: data.jawaban || 'Maaf, tidak ada jawaban.' }]);
        } catch {
            setChatMessages(m => [...m, { role: 'ai', text: 'Koneksi bermasalah, coba lagi.' }]);
        }
        setChatLoading(false);
    };

    const isActive = (href) => window.location.pathname.startsWith(href) && href !== '/' || window.location.pathname === href;

    return (
        <div className="min-h-screen flex bg-[#FCFDFD] font-['Inter'] text-gray-800 transition-colors duration-300 selection:bg-emerald-200">

            {/* ── Sidebar ─────────────────────────────────── */}
            <aside className={`
                fixed top-0 left-0 h-full z-30 flex flex-col
                bg-white/95 backdrop-blur-md border-r border-gray-100
                shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300
                ${sidebarOpen ? 'w-64' : 'w-20'}
            `}>
                {/* Logo */}
                <div className="flex items-center gap-3 px-5 py-6 border-b border-gray-50/50">
                    <div className="flex-shrink-0 flex items-center justify-center">
                        <Dna size={28} className="text-emerald-700" />
                    </div>
                    {sidebarOpen && (
                        <span className="text-xl font-bold text-emerald-800 tracking-tight">
                            BioGami
                        </span>
                    )}
                </div>

                {/* Nav Items */}
                <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
                    {navItems.map(({ href, label, icon: Icon }) => {
                        const active = isActive(href);
                        return (
                            <Link
                                key={href}
                                href={href}
                                className={`
                                    flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-sm transition-all duration-200
                                    ${active
                                        ? 'bg-[#118453] text-white shadow-md shadow-emerald-700/20'
                                        : 'text-gray-500 hover:bg-emerald-50 hover:text-emerald-700'
                                    }
                                `}
                            >
                                <Icon size={20} className="flex-shrink-0" />
                                {sidebarOpen && <span>{label}</span>}
                            </Link>
                        );
                    })}
                </nav>

                {/* User Profile */}
                {auth?.user && (
                    <div className="p-4 border-t border-gray-50/50">
                        <div className={`flex items-center gap-3 p-3 rounded-2xl bg-emerald-50/50 ${sidebarOpen ? '' : 'justify-center'}`}>
                            <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-sm">
                                {auth.user.name.charAt(0).toUpperCase()}
                            </div>
                            {sidebarOpen && (
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-gray-800 truncate">{auth.user.name}</p>
                                    <Link
                                        href="/logout"
                                        method="post"
                                        as="button"
                                        className="flex items-center gap-1.5 text-xs font-semibold text-red-500 hover:text-red-600 mt-1 transition-colors"
                                    >
                                        <LogOut size={12} /> Keluar
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </aside>

            {/* ── Main Area ────────────────────────────────── */}
            <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>

                {/* Topbar */}
                <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-100 px-8 h-20 flex items-center justify-between shadow-[0_4px_30px_rgb(0,0,0,0.02)]">
                    <button
                        onClick={() => setSidebarOpen(o => !o)}
                        className="p-2.5 rounded-xl text-gray-500 bg-gray-50 hover:bg-emerald-50 hover:text-emerald-700 transition-colors border border-gray-100 shadow-sm"
                    >
                        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>

                    <div className="flex items-center gap-4">
                        {auth?.user && (
                            <Link href="/profile" className="flex items-center gap-2.5 px-4 py-2 rounded-full text-sm font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 transition-colors shadow-sm">
                                <User size={16} />
                                <span className="hidden sm:inline">{auth.user.name}</span>
                            </Link>
                        )}
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-8 overflow-auto">
                    {children}
                </main>
            </div>

            {/* ── AI Chat Widget ───────────────────────────── */}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
                {chatOpen && (
                    <div className="w-80 h-[420px] bg-white rounded-3xl shadow-[0_20px_50px_rgb(0,0,0,0.1)] border border-gray-100 flex flex-col overflow-hidden">
                        {/* Chat Header */}
                        <div className="bg-[#118453] p-4 flex items-center justify-between">
                            <div className="flex items-center gap-2 text-white">
                                <Dna size={20} />
                                <span className="font-bold text-sm">BioGami AI</span>
                            </div>
                            <button onClick={() => setChatOpen(false)} className="text-white/70 hover:text-white transition-colors">
                                <X size={18} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FCFDFD]">
                            {chatMessages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`
                                        max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm
                                        ${msg.role === 'user'
                                            ? 'bg-emerald-100 text-emerald-900 rounded-br-sm'
                                            : 'bg-white border border-gray-100 text-gray-700 rounded-bl-sm'
                                        }
                                    `}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {chatLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm px-4 py-2.5 text-gray-500 text-sm shadow-sm">
                                        <span className="animate-pulse">Mengetik...</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input */}
                        <div className="p-3 border-t border-gray-100 flex gap-2 bg-white">
                            <input
                                type="text"
                                value={chatInput}
                                onChange={e => setChatInput(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && sendChat()}
                                placeholder="Tanya tentang biologi..."
                                className="flex-1 text-sm px-4 py-2.5 rounded-full bg-gray-50 text-gray-800 border-gray-200 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all shadow-sm"
                            />
                            <button
                                onClick={sendChat}
                                className="w-10 h-10 rounded-full bg-[#118453] hover:bg-emerald-800 flex items-center justify-center text-white transition-colors shadow-md"
                            >
                                <Send size={16} />
                            </button>
                        </div>
                    </div>
                )}

                <button
                    onClick={() => setChatOpen(o => !o)}
                    className="w-14 h-14 rounded-full bg-[#118453] text-white flex items-center justify-center shadow-xl shadow-emerald-700/30 hover:scale-105 hover:bg-emerald-800 transition-all border-2 border-white"
                >
                    <MessageCircle size={24} />
                </button>
            </div>
        </div>
    );
}

