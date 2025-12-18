
import React from 'react';
import { X, BookOpen, Trophy, ShieldCheck, Award, Star } from './Icons';

interface BadgesModalProps {
    onClose: () => void;
}

const BadgesModal: React.FC<BadgesModalProps> = ({ onClose }) => {
    const allBadges = [
        { label: '坚持学霸', icon: BookOpen, color: 'text-blue-500', earned: true },
        { label: '赛事新星', icon: Trophy, color: 'text-amber-500', earned: true },
        { label: '环保卫士', icon: ShieldCheck, color: 'text-green-500', earned: true },
        { label: '协作达人', icon: Award, color: 'text-indigo-500', earned: true },
        { label: '百日纪念', icon: Star, color: 'text-red-500', earned: false },
        { label: '考研上岸', icon: BookOpen, color: 'text-purple-500', earned: false },
        { label: '国赛选手', icon: Trophy, color: 'text-yellow-600', earned: false },
        { label: '志愿之星', icon: ShieldCheck, color: 'text-cyan-500', earned: false },
    ];
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md flex flex-col">
                 <header className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-bold">成就勋章</h2>
                    <button onClick={onClose}><X className="w-6 h-6" /></button>
                </header>
                <main className="p-4 grid grid-cols-4 gap-4">
                    {allBadges.map(badge => (
                        <div key={badge.label} className={`flex flex-col items-center text-center transition-opacity ${!badge.earned ? 'opacity-40' : ''}`}>
                            <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full">
                                <badge.icon className={`w-8 h-8 ${badge.color}`} />
                            </div>
                            <p className="text-xs text-gray-600 mt-2">{badge.label}</p>
                            {badge.earned && <p className="text-xs font-bold text-green-600">已获得</p>}
                        </div>
                    ))}
                </main>
                 <footer className="p-4 border-t">
                    <button onClick={onClose} className="w-full py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300">
                        关闭
                    </button>
                </footer>
            </div>
        </div>
    );
}

export default BadgesModal;
