
import React from 'react';
import { ChevronLeft, Star } from '../components/Icons';
import { User } from '../types';

interface PartnerPointsScreenProps {
  user: User;
  onBack: () => void;
}

const TaskItem = ({ text, points }: { text: string, points: number }) => (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-700">{text}</p>
        <div className="flex items-center gap-2">
            <span className="font-semibold text-sm text-yellow-500">+{points}</span>
            <button className="text-xs bg-indigo-500 text-white px-3 py-1 rounded-full">去做</button>
        </div>
    </div>
);

const RewardItem = ({ text, cost }: { text: string, cost: number }) => (
     <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-700">{text}</p>
        <button className="text-xs bg-green-500 text-white px-3 py-1 rounded-full flex items-center gap-1">
            <Star className="w-3 h-3"/> {cost} 兑换
        </button>
    </div>
);

const PartnerPointsScreen: React.FC<PartnerPointsScreenProps> = ({ user, onBack }) => {
    return (
        <div className="flex flex-col h-full bg-gray-100">
            <header className="sticky top-0 flex items-center p-3 bg-white/80 backdrop-blur-lg z-10 shadow-sm">
                <button onClick={onBack} className="text-gray-600 mr-3">
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <h2 className="text-lg font-bold text-gray-800">搭力值</h2>
            </header>

            <main className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-6 rounded-xl shadow-lg text-center">
                    <p className="text-sm opacity-90">我的搭力值</p>
                    <p className="text-5xl font-bold mt-2">{user.partnerPoints || 0}</p>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm">
                    <h3 className="font-bold mb-3">赚取搭力值</h3>
                    <div className="space-y-2">
                        <TaskItem text="发布一条动态" points={10} />
                        <TaskItem text="完成一次搭子协作" points={20} />
                        <TaskItem text="邀请一位好友" points={50} />
                        <TaskItem text="每日登录" points={5} />
                    </div>
                </div>

                 <div className="bg-white p-4 rounded-xl shadow-sm">
                    <h3 className="font-bold mb-3">兑换中心</h3>
                    <div className="space-y-2">
                       <RewardItem text="AI简历优化次数 +1" cost={100} />
                       <RewardItem text="自习室专属座位" cost={200} />
                       <RewardItem text="优先匹配优质搭子" cost={300} />
                       <RewardItem text="7天会员体验" cost={500} />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PartnerPointsScreen;
