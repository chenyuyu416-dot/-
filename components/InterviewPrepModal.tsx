
import React from 'react';
import { X, Video } from './Icons';
import { DUMMY_USERS } from '../constants';

interface InterviewPrepModalProps {
    onClose: () => void;
    onStartCall: () => void;
}

const InterviewPrepModal: React.FC<InterviewPrepModalProps> = ({ onClose, onStartCall }) => {
    const mockPartner = DUMMY_USERS.user5;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md flex flex-col">
                <header className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-bold">面试模拟</h2>
                    <button onClick={onClose}><X className="w-6 h-6" /></button>
                </header>
                
                <main className="p-4 text-center">
                    <p className="text-gray-600 mb-4">已为您匹配到同方向的面试搭子！</p>
                    <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg border">
                        <img src={mockPartner.avatar} alt={mockPartner.name} className="w-16 h-16 rounded-full" />
                        <p className="font-bold mt-2">{mockPartner.name}</p>
                        <p className="text-sm text-gray-500">{mockPartner.school} · {mockPartner.major}</p>
                    </div>
                    <div className="mt-4 text-left space-y-2">
                        <p className="font-semibold">推荐题库：</p>
                        <ul className="list-disc list-inside text-sm text-gray-700">
                            <li>结构化面试常见问题50问</li>
                            <li>无领导小组讨论经典场景</li>
                            <li>前端开发岗位高频面试题</li>
                        </ul>
                    </div>
                </main>

                <footer className="p-4 border-t">
                    <button onClick={onStartCall} className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 text-white font-bold rounded-lg shadow hover:bg-indigo-700">
                        <Video className="w-5 h-5" />
                        发起视频模拟面试
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default InterviewPrepModal;
