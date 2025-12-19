
import React from 'react';
import { VolunteerActivity } from '../types';
import { X, MapPin, Clock, Check } from './Icons';

interface VolunteerDetailModalProps {
    activity: VolunteerActivity;
    onClose: () => void;
    onSignUp: () => void;
    isApplied: boolean;
}

const DetailSection: React.FC<{title: string; children: React.ReactNode}> = ({title, children}) => (
    <div>
        <h4 className="font-semibold text-gray-800 text-base mb-2">{title}</h4>
        <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
            {children}
        </div>
    </div>
);


const VolunteerDetailModal: React.FC<VolunteerDetailModalProps> = ({ activity, onClose, onSignUp, isApplied }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[70] flex items-end justify-center">
            <div className="bg-white rounded-t-2xl shadow-xl w-full max-w-md h-[90vh] flex flex-col">
                <header className="flex items-center justify-between p-4 border-b sticky top-0 bg-white">
                    <h2 className="text-lg font-bold">志愿活动详情</h2>
                    <button onClick={onClose}><X className="w-6 h-6" /></button>
                </header>

                <main className="flex-1 overflow-y-auto p-4 space-y-4">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">{activity.title}</h3>
                        <p className="text-base text-gray-600 mt-1">{activity.organization}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="bg-gray-100 p-2 rounded-lg flex items-center justify-center gap-1.5"><MapPin className="w-4 h-4 text-gray-500"/>{activity.location}</div>
                        <div className="bg-gray-100 p-2 rounded-lg flex items-center justify-center gap-1.5"><Clock className="w-4 h-4 text-gray-500"/>{activity.time}</div>
                    </div>
                     {activity.certification && <div className="bg-green-100 text-green-800 text-sm font-semibold p-2 rounded-lg text-center">可认证志愿时长</div>}
                    
                    <DetailSection title="活动介绍">
                        <p>{activity.description}</p>
                    </DetailSection>

                    <DetailSection title="志愿者职责">
                        <ul className="list-disc list-inside space-y-1">
                            {activity.duties.map((item, index) => <li key={index}>{item}</li>)}
                        </ul>
                    </DetailSection>
                </main>
                
                <footer className="p-4 border-t bg-white">
                     <button 
                        onClick={onSignUp} 
                        disabled={isApplied}
                        className="w-full text-base bg-red-500 text-white px-3 py-3 rounded-full hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-bold"
                    >
                        {isApplied && <Check className="w-5 h-5" />}
                        {isApplied ? '已报名' : '一键报名'}
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default VolunteerDetailModal;
