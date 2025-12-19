
import React from 'react';
import { X } from './Icons';
import { Badge } from '../types';

interface BadgesModalProps {
    badges: Badge[];
    onClose: () => void;
    onSelectBadge: (badge: Badge) => void;
}

const BadgesModal: React.FC<BadgesModalProps> = ({ badges, onClose, onSelectBadge }) => {
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md flex flex-col">
                 <header className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-bold">成就勋章</h2>
                    <button onClick={onClose}><X className="w-6 h-6" /></button>
                </header>
                <main className="p-4 grid grid-cols-4 gap-4">
                    {badges.map(badge => (
                        <button 
                            key={badge.id}
                            onClick={() => onSelectBadge(badge)}
                            className={`flex flex-col items-center text-center transition-opacity ${!badge.earned && !badge.isClaimable ? 'opacity-40' : ''} hover:opacity-100 disabled:opacity-40 disabled:cursor-not-allowed`}
                        >
                            <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full relative">
                                <badge.icon className={`w-8 h-8 ${badge.color}`} />
                                {badge.isClaimable && !badge.earned && (
                                    <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-red-500 ring-2 ring-white" title="可领取"></span>
                                )}
                            </div>
                            <p className="text-xs text-gray-600 mt-2">{badge.label}</p>
                            {badge.earned && <p className="text-xs font-bold text-green-600">已获得</p>}
                            {badge.isClaimable && !badge.earned && <p className="text-xs font-bold text-blue-600">可领取</p>}
                        </button>
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
