import React from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

const team = [
    { name: 'Tim Pengembang 1', role: 'Project Manager', emoji: '🎯', color: 'from-emerald-300 to-emerald-500', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1&backgroundColor=transparent' },
    { name: 'Tim Pengembang 2', role: 'Frontend Developer', emoji: '👨‍💻', color: 'from-[#118453] to-emerald-800', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2&backgroundColor=transparent' },
    { name: 'Tim Pengembang 3', role: 'Backend Developer', emoji: '👩‍💻', color: 'from-emerald-400 to-emerald-600', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3&backgroundColor=transparent' },
    { name: 'Tim Pengembang 4', role: 'UI/UX Designer', emoji: '🎨', color: 'from-emerald-200 to-emerald-400', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=4&backgroundColor=transparent' },
];

export default function Team() {
    return (
        <MainLayout>
            <Head title="Tim Pengembang" />
            <div className="max-w-5xl mx-auto text-center">
                <div className="mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-50 border border-emerald-100 shadow-sm mb-6 relative">
                        <div className="absolute inset-0 bg-emerald-200/20 rounded-full blur-xl"></div>
                        <Users size={40} className="text-[#118453] relative z-10" />
                    </div>
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Tim Pengembang</h1>
                    <p className="text-gray-500 mt-3 text-sm max-w-lg mx-auto leading-relaxed">Tim yang berdedikasi membangun platform BioGami untuk memajukan pendidikan biologi di Indonesia dengan cara yang interaktif.</p>
                </div>

                <div className="grid md:grid-cols-4 gap-6">
                    {team.map(({ name, role, emoji, color, image }, i) => (
                        <motion.div key={name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} whileHover={{ y: -6 }}
                            className="bg-white border border-gray-100 rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl hover:shadow-emerald-500/10 transition-all group"
                        >
                            <div className={`bg-gradient-to-br ${color} h-48 flex items-center justify-center text-7xl relative overflow-hidden`}>
                                {/* Decorative circle inside card */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                                
                                {/* Emoji that fades out on hover */}
                                <span className="absolute z-10 group-hover:scale-75 group-hover:opacity-0 group-hover:-translate-y-8 transition-all duration-500 ease-in-out drop-shadow-md">{emoji}</span>
                                
                                {/* Photo Reveal without background */}
                                <img 
                                    src={image} 
                                    alt={name} 
                                    className="absolute bottom-0 w-36 h-36 object-contain translate-y-[120%] group-hover:translate-y-0 transition-transform duration-500 ease-out z-20" 
                                />
                            </div>
                            <div className="p-8">
                                <h3 className="font-extrabold text-gray-900 mb-2">{name}</h3>
                                <p className="text-sm font-bold text-emerald-600 uppercase tracking-wider">{role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
}
