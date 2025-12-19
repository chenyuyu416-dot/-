
import React from 'react';
import { User, TeamRequest } from '../types';
import { X, ShieldCheck } from './Icons';

interface ApplicantProfileModalProps {
    request: TeamRequest;
    onClose: () => void;
    onAccept: () => void;
    onReject: () => void;
}

const ApplicantProfileModal: React.FC<ApplicantProfileModalProps> = ({ request, onClose, onAccept, onReject }) => {
    const { user } = request;
    const certifiedSkills = user.skills?.filter(s => s.status === 'certified') || [];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md flex flex-col">
                <header className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-bold">申请人信息</h2>
                    <button onClick={onClose}><X className="w-6 h-6" /></button>
                </header>

                <main className="p-4 space-y-4">
                    <div className="flex flex-col items-center text-center">
                        <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-full mb-2" />
                        <p className="font-bold text-xl">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.school} · {user.major}</p>
                    </div>

                     {certifiedSkills.length > 0 && (
                        <div>
                            <h4 className="font-semibold text-sm mb-1 text-gray-600">已认证技能:</h4>
                            <div className="flex flex-wrap gap-2">
                                {certifiedSkills.map(skill => (
                                    <span key={skill.name} className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium flex items-center gap-1.5">
                                        <ShieldCheck className="w-3.5 h-3.5" /> {skill.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    <div>
                        <h4 className="font-semibold text-sm mb-1 text-gray-600">申请信息:</h4>
                        <p className="text-sm bg-gray-100 p-2 rounded-md">"{request.message}"</p>
                    </div>
                </main>

                <footer className="p-4 border-t flex space-x-2">
                    <button onClick={onReject} className="flex-1 py-2 bg-red-100 text-red-600 font-semibold rounded-lg hover:bg-red-200">
                        拒绝
                    </button>
                    <button onClick={onAccept} className="flex-1 py-2 bg-green-100 text-green-700 font-bold rounded-lg hover:bg-green-200">
                        接受
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default ApplicantProfileModal;
