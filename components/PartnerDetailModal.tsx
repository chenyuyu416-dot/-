
import React from 'react';
import { User } from '../types';
import { X } from './Icons';

interface PartnerDetailModalProps {
    user: User;
    onClose: () => void;
    onApply: () => void;
}

const PartnerDetailModal: React.FC<PartnerDetailModalProps> = ({ user, onClose, onApply }) => {
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
                    <div>
                        <h4 className="font-semibold text-sm mb-1 text-gray-600">标签:</h4>
                        <div className="flex flex-wrap gap-2">
                            {user.tags?.map(tag => (
                                <span key={tag} className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full font-medium">{tag}</span>
                            )) || <span className="text-sm text-gray-400">暂无标签</span>}
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold text-sm mb-1 text-gray-600">偏好:</h4>
                        <div className="space-y-1">
                             {user.preferences?.map(pref => (
                                <p key={pref} className="text-sm bg-gray-100 p-2 rounded-md">{pref}</p>
                            )) || <span className="text-sm text-gray-400">暂无偏好</span>}
                        </div>
                    </div>
                </main>

                <footer className="p-4 border-t flex space-x-2">
                    <button onClick={onClose} className="flex-1 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300">
                        返回
                    </button>
                    <button onClick={onApply} className="flex-1 py-2 bg-indigo-600 text-white font-bold rounded-lg shadow hover:bg-indigo-700">
                        发送申请
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default PartnerDetailModal;
