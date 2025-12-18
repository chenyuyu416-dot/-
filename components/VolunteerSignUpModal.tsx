
import React from 'react';
import { X } from './Icons';
import { VolunteerActivity } from '../types';

interface VolunteerSignUpModalProps {
    activity: VolunteerActivity;
    onClose: () => void;
}

const VolunteerSignUpModal: React.FC<VolunteerSignUpModalProps> = ({ activity, onClose }) => {
    const handleConfirm = () => {
        alert("报名成功！通知已发送至您的消息中心。");
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[70] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md flex flex-col">
                <header className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-bold">确认报名</h2>
                    <button onClick={onClose}><X className="w-6 h-6" /></button>
                </header>
                <main className="p-4 space-y-3">
                    <h3 className="text-xl font-bold text-gray-800">{activity.title}</h3>
                    <p><span className="font-semibold">组织方:</span> {activity.organization}</p>
                    <p><span className="font-semibold">地点:</span> {activity.location}</p>
                    <p><span className="font-semibold">时间:</span> {activity.time}</p>
                    <p><span className="font-semibold">招募人数:</span> {activity.required}人</p>
                </main>
                <footer className="p-4 border-t">
                    <button onClick={handleConfirm} className="w-full py-2 bg-red-500 text-white font-bold rounded-lg shadow hover:bg-red-600">
                        确认报名
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default VolunteerSignUpModal;
