
import React, { useState } from 'react';
import { ChevronLeft } from '../components/Icons';

interface FeedbackScreenProps {
  onBack: () => void;
}

const FeedbackScreen: React.FC<FeedbackScreenProps> = ({ onBack }) => {
    const [feedback, setFeedback] = useState('');

    const handleSubmit = () => {
        if (feedback.trim()) {
            alert('反馈已提交，感谢您的宝贵意见！');
            setFeedback('');
            onBack();
        } else {
            alert('请输入反馈内容。');
        }
    };

    const handleContactSupport = () => {
        alert('请拨打客服电话：400-123-4567\n(服务时间：工作日 9:00-18:00)');
    };

    return (
        <div className="flex flex-col h-full bg-gray-100">
            <header className="sticky top-0 flex items-center p-3 bg-white/80 backdrop-blur-lg z-10 shadow-sm">
                <button onClick={onBack} className="text-gray-600 mr-3">
                <ChevronLeft className="w-6 h-6" />
                </button>
                <h2 className="text-lg font-bold text-gray-800">问题反馈</h2>
            </header>
            <main className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="bg-white rounded-lg shadow-sm p-4">
                    <label htmlFor="feedback-text" className="block text-sm font-medium text-gray-700 mb-2">
                        请详细描述您遇到的问题或建议：
                    </label>
                    <textarea
                        id="feedback-text"
                        rows={8}
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="我们期待听到您的声音..."
                        className="w-full p-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                 <button 
                    onClick={handleSubmit}
                    className="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg shadow hover:bg-indigo-700"
                >
                    提交反馈
                </button>
                 <button 
                    onClick={handleContactSupport}
                    className="w-full py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow-sm hover:bg-gray-50"
                >
                    联系客服
                </button>
            </main>
        </div>
    );
};

export default FeedbackScreen;
