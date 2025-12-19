
import React, { useState } from 'react';
import { X } from './Icons';

interface CompleteTaskModalProps {
    onClose: () => void;
    onConfirm: (timeSpent: number) => void;
}

const CompleteTaskModal: React.FC<CompleteTaskModalProps> = ({ onClose, onConfirm }) => {
    const [time, setTime] = useState('');

    const handleConfirm = () => {
        const timeValue = parseFloat(time);
        if (!isNaN(timeValue) && timeValue > 0) {
            onConfirm(timeValue);
        } else {
            alert('请输入有效的任务时长！');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[70] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md flex flex-col">
                <header className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-bold">完成任务</h2>
                    <button onClick={onClose}><X className="w-6 h-6" /></button>
                </header>
                <main className="p-4 space-y-2">
                    <label htmlFor="timeSpent" className="block text-sm font-medium text-gray-700">
                        请输入任务消耗时间（小时）:
                    </label>
                    <input 
                        id="timeSpent"
                        type="number"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        placeholder="例如: 1.5"
                        className="w-full p-2 border rounded-md"
                    />
                </main>
                <footer className="p-4 border-t">
                    <button onClick={handleConfirm} className="w-full py-2 bg-green-500 text-white font-bold rounded-lg shadow hover:bg-green-600">
                        确认完成
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default CompleteTaskModal;
