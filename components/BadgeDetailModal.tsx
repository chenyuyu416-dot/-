
import React from 'react';
import { X, Check } from './Icons';
import { Badge } from '../types';

interface BadgeDetailModalProps {
    badge: Badge;
    onClose: () => void;
    onClaim: (badgeId: string) => void;
}

const BadgeDetailModal: React.FC<BadgeDetailModalProps> = ({ badge, onClose, onClaim }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[70] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md flex flex-col">
                <header className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-bold">勋章详情</h2>
                    <button onClick={onClose}><X className="w-6 h-6" /></button>
                </header>
                <main className="p-6 text-center">
                    <div className={`w-24 h-24 flex items-center justify-center bg-gray-100 rounded-full mx-auto ${badge.earned ? 'ring-4 ring-green-300' : ''}`}>
                        <badge.icon className={`w-12 h-12 ${badge.color}`} />
                    </div>
                    <h3 className="text-xl font-bold mt-4">{badge.label}</h3>
                    {badge.earned && (
                        <p className="mt-1 text-sm font-semibold text-green-600 flex items-center justify-center gap-1">
                            <Check className="w-4 h-4" />已获得
                        </p>
                    )}
                    <p className="text-gray-600 mt-4">{badge.description}</p>
                </main>
                <footer className="p-4 border-t">
                    {badge.isClaimable && !badge.earned ? (
                        <button onClick={() => onClaim(badge.id)} className="w-full py-2 bg-indigo-600 text-white font-bold rounded-lg shadow hover:bg-indigo-700">
                            领取勋章 (+20 搭力值)
                        </button>
                    ) : (
                         <button onClick={onClose} className="w-full py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300">
                            关闭
                        </button>
                    )}
                </footer>
            </div>
        </div>
    );
};

export default BadgeDetailModal;
