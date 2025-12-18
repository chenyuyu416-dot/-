
import React from 'react';
import { User } from '../types';
import { X, MessageSquare } from './Icons';

interface PartnerProfileModalProps {
    user: User;
    onClose: () => void;
    onStartChat: (user: User) => void;
}

const PartnerProfileModal: React.FC<PartnerProfileModalProps> = ({ user, onClose, onStartChat }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md flex flex-col">
                <header className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-bold">搭子信息</h2>
                    <button onClick={onClose}><X className="w-6 h-6" /></button>
                </header>

                <main className="p-4 space-y-4">
                    <div className="flex flex-col items-center text-center">
                        <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-full mb-2" />
                        <p className="font-bold text-xl">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.school} · {user.major}</p>
                    </div>
                </main>

                <footer className="p-4 border-t">
                    <button onClick={() => onStartChat(user)} className="w-full flex items-center justify-center gap-2 py-2 bg-indigo-600 text-white font-bold rounded-lg shadow hover:bg-indigo-700">
                        <MessageSquare className="w-5 h-5" />
                        发起对话
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default PartnerProfileModal;
