
import React from 'react';
import { User } from '../types';
import { X, Search, Trash2, FileText, Heart, UserPlus, Users, ShieldCheck } from './Icons';

interface ChatPartnerProfileModalProps {
    user: User;
    onClose: () => void;
    onSearchHistory: () => void;
    onClearHistory: () => void;
    onDeleteChat: () => void;
    onViewPosts: (user: User) => void;
}

const StatItem: React.FC<{ Icon: React.FC<{className?: string}>, value: number, label: string }> = ({ Icon, value, label }) => (
    <div className="text-center">
        <Icon className="w-6 h-6 mx-auto text-gray-500 mb-1" />
        <p className="font-bold">{value}</p>
        <p className="text-xs text-gray-500">{label}</p>
    </div>
);

const ChatPartnerProfileModal: React.FC<ChatPartnerProfileModalProps> = ({ user, onClose, onSearchHistory, onClearHistory, onDeleteChat, onViewPosts }) => {
    const certifiedSkills = user.skills?.filter(s => s.status === 'certified') || [];
    
    const handleAction = (action: () => void) => {
        onClose();
        action();
    }
    
    const handleDelete = () => {
        if (window.confirm(`确定要删除与 ${user.name} 的聊天吗？此操作不可恢复。`)) {
            handleAction(onDeleteChat);
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[70] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md flex flex-col">
                <header className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-bold">搭子信息</h2>
                    <button onClick={onClose}><X className="w-6 h-6" /></button>
                </header>
                <main className="p-4">
                    <div className="flex flex-col items-center text-center">
                        <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-full mb-2" />
                        <p className="font-bold text-xl">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.school}</p>
                    </div>

                    {certifiedSkills.length > 0 && (
                        <div className="my-4">
                            <h4 className="font-semibold text-sm mb-2 text-gray-600 text-center">已认证技能</h4>
                            <div className="flex flex-wrap gap-2 justify-center">
                                {certifiedSkills.map(skill => (
                                    <span key={skill.name} className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium flex items-center gap-1.5">
                                        <ShieldCheck className="w-3.5 h-3.5" /> {skill.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    <div className="grid grid-cols-4 gap-2 py-4 border-y my-4">
                        <button onClick={() => { onClose(); onViewPosts(user); }} className="text-center p-1 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-300">
                            <StatItem Icon={FileText} value={5} label="动态"/>
                        </button>
                        <StatItem Icon={UserPlus} value={18} label="关注"/>
                        <StatItem Icon={Users} value={23} label="粉丝"/>
                        <StatItem Icon={Heart} value={102} label="获赞"/>
                    </div>
                    <div className="space-y-2">
                         <button onClick={() => handleAction(onSearchHistory)} className="w-full flex items-center p-3 text-left rounded-lg hover:bg-gray-100">
                            <Search className="w-5 h-5 mr-3 text-gray-600"/>
                            <span>查找聊天记录</span>
                        </button>
                         <button onClick={() => handleAction(onClearHistory)} className="w-full flex items-center p-3 text-left rounded-lg hover:bg-gray-100">
                            <Trash2 className="w-5 h-5 mr-3 text-gray-600"/>
                            <span>清空聊天记录</span>
                        </button>
                        <button onClick={handleDelete} className="w-full flex items-center p-3 text-left rounded-lg hover:bg-red-50 text-red-600">
                            <Trash2 className="w-5 h-5 mr-3"/>
                            <span>删除搭子</span>
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ChatPartnerProfileModal;
