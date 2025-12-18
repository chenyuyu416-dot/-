
import React from 'react';
import { User } from '../types';
import { ShieldCheck, Award, Settings, BookOpen, Trophy, File, HelpCircle } from '../components/Icons';

interface ProfileScreenProps {
    user: User;
    onLogout: () => void;
    onSettingsClick: () => void;
    onMyStuffClick: (view: 'posts' | 'partners') => void;
    onEditTagsClick: () => void;
    onBadgesClick: () => void;
    onCertificationClick: () => void;
    onUploadResumeClick: () => void;
    onFeedbackClick: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ user, onLogout, onSettingsClick, onMyStuffClick, onEditTagsClick, onBadgesClick, onCertificationClick, onUploadResumeClick, onFeedbackClick }) => {
    const stats = [
        { label: '搭力值', value: 1258, key: 'points' },
        { label: '搭子', value: 12, key: 'partners' },
        { label: '动态', value: 34, key: 'posts' },
    ];

    const badges = [
        { label: '坚持学霸', icon: BookOpen, color: 'text-blue-500' },
        { label: '赛事新星', icon: Trophy, color: 'text-amber-500' },
        { label: '环保卫士', icon: ShieldCheck, color: 'text-green-500' },
        { label: '协作达人', icon: Award, color: 'text-indigo-500' },
    ];

    return (
        <div className="bg-gray-100 min-h-full pb-10">
            <header className="bg-gradient-to-b from-indigo-600 to-indigo-500 p-4 pb-16 text-white relative">
                <button onClick={onSettingsClick} className="absolute top-4 right-4 text-white">
                    <Settings className="w-6 h-6" />
                </button>
                <div className="flex flex-col items-center mt-8">
                    <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full border-4 border-white shadow-lg" />
                    <h1 className="text-2xl font-bold mt-4">{user.name}</h1>
                    <p className="text-sm opacity-80 mt-1">{user.school} · {user.major}</p>
                </div>
            </header>

            <div className="transform -translate-y-10">
                <div className="mx-4 bg-white rounded-xl shadow-lg p-4">
                    <div className="flex justify-around text-center">
                        {stats.map(stat => (
                            <button 
                                key={stat.label}
                                onClick={() => (stat.key === 'posts' || stat.key === 'partners') && onMyStuffClick(stat.key as 'posts' | 'partners')}
                                className="disabled:cursor-default p-2 rounded-md hover:bg-gray-100"
                                disabled={!['posts', 'partners'].includes(stat.key)}
                            >
                                <p className="text-xl font-bold text-gray-800">{stat.value}</p>
                                <p className="text-sm text-gray-500">{stat.label}</p>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="m-4 space-y-4">
                    <button onClick={onEditTagsClick} className="w-full text-left p-4 bg-white rounded-xl shadow-lg hover:bg-gray-50">
                        <h3 className="font-bold text-gray-800 mb-3">目标标签</h3>
                        <div className="flex flex-wrap gap-2">
                            {user.tags?.map(tag => (
                                <span key={tag} className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-full font-medium">{tag}</span>
                            ))}
                        </div>
                    </button>

                    <button onClick={onBadgesClick} className="w-full text-left p-4 bg-white rounded-xl shadow-lg hover:bg-gray-50">
                        <h3 className="font-bold text-gray-800 mb-3">成就勋章</h3>
                        <div className="grid grid-cols-4 gap-4 text-center">
                            {badges.map(badge => (
                                <div key={badge.label} className="flex flex-col items-center">
                                    <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full">
                                        <badge.icon className={`w-7 h-7 ${badge.color}`} />
                                    </div>
                                    <p className="text-xs text-gray-600 mt-2">{badge.label}</p>
                                </div>
                            ))}
                        </div>
                    </button>
                    
                    <button onClick={onUploadResumeClick} className="w-full text-left p-4 bg-white rounded-xl shadow-lg hover:bg-gray-50">
                        <h3 className="font-bold text-gray-800 mb-3">我的简历</h3>
                         <div className="flex items-center text-gray-600">
                             <File className="w-5 h-5 mr-2"/>
                             <span className="text-sm">管理我的在线简历</span>
                         </div>
                    </button>

                     <button onClick={onCertificationClick} className="w-full text-left p-4 bg-white rounded-xl shadow-lg hover:bg-gray-50">
                        <h3 className="font-bold text-gray-800 mb-3">可信度认证</h3>
                        <div className="space-y-2">
                           <div className="flex items-center text-green-600">
                             <ShieldCheck className="w-5 h-5 mr-2"/>
                             <span className="text-sm font-medium">学生认证 (已认证)</span>
                           </div>
                           <div className="flex items-center text-gray-400">
                             <Award className="w-5 h-5 mr-2"/>
                             <span className="text-sm">技能认证 (未认证)</span>
                           </div>
                        </div>
                    </button>
                     <button onClick={onFeedbackClick} className="w-full text-left p-4 bg-white rounded-xl shadow-lg hover:bg-gray-50">
                        <h3 className="font-bold text-gray-800 mb-3">问题反馈</h3>
                         <div className="flex items-center text-gray-600">
                             <HelpCircle className="w-5 h-5 mr-2"/>
                             <span className="text-sm">反馈问题或联系客服</span>
                         </div>
                    </button>
                </div>
                
                <div className="px-4 mt-6">
                    <button
                        onClick={onLogout}
                        className="w-full py-3 bg-white text-red-500 font-semibold rounded-lg shadow-md hover:bg-red-50 transition-colors"
                    >
                        退出登录
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileScreen;