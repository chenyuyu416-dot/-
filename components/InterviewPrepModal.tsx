
import React from 'react';
import { X, Cpu } from './Icons';
import { DUMMY_USERS } from '../constants';

interface InterviewPrepModalProps {
    onClose: () => void;
    onStartAIInterview: () => void;
}

const InterviewPrepModal: React.FC<InterviewPrepModalProps> = ({ onClose, onStartAIInterview }) => {
    const mockPartner = DUMMY_USERS.user5;

    const handleStart = () => {
        onClose();
        onStartAIInterview();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md flex flex-col">
                <header className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-bold">面试模拟</h2>
                    <button onClick={onClose}><X className="w-6 h-6" /></button>
                </header>
                
                <main className="p-4 text-center">
                    <p className="text-gray-600 mb-4">AI将扮演面试官，与你进行一场模拟面试。</p>
                    <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg border">
                        <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
                            <Cpu className="w-8 h-8 text-indigo-600"/>
                        </div>
                        <p className="font-bold mt-2">AI 面试官</p>
                        <p className="text-sm text-gray-500">岗位方向：前端开发</p>
                    </div>
                    <div className="mt-4 text-left space-y-2">
                        <p className="font-semibold">面试要点：</p>
                        <ul className="list-disc list-inside text-sm text-gray-700">
                            <li>考察JavaScript基础、框架理解</li>
                            <li>项目经历与问题解决能力</li>
                            <li>沟通与表达能力</li>
                        </ul>
                    </div>
                </main>

                <footer className="p-4 border-t">
                    <button onClick={handleStart} className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 text-white font-bold rounded-lg shadow hover:bg-indigo-700">
                        <Cpu className="w-5 h-5" />
                        开始AI模拟面试
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default InterviewPrepModal;
