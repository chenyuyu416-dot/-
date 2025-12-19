
import React from 'react';
import { Job } from '../types';
import { X, Briefcase, MapPin, DollarSign, Check } from './Icons';

interface JobDetailModalProps {
    job: Job;
    onClose: () => void;
    onApply: () => void;
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

const JobDetailModal: React.FC<JobDetailModalProps> = ({ job, onClose, onApply, isApplied }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[70] flex items-end justify-center">
            <div className="bg-white rounded-t-2xl shadow-xl w-full max-w-md h-[90vh] flex flex-col">
                <header className="flex items-center justify-between p-4 border-b sticky top-0 bg-white">
                    <h2 className="text-lg font-bold">岗位详情</h2>
                    <button onClick={onClose}><X className="w-6 h-6" /></button>
                </header>

                <main className="flex-1 overflow-y-auto p-4 space-y-4">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
                        <p className="text-base text-gray-600 mt-1">{job.company}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center text-sm">
                        <div className="bg-gray-100 p-2 rounded-lg flex items-center justify-center gap-1.5"><MapPin className="w-4 h-4 text-gray-500"/>{job.location}</div>
                        <div className="bg-gray-100 p-2 rounded-lg flex items-center justify-center gap-1.5"><Briefcase className="w-4 h-4 text-gray-500"/>{job.type}</div>
                        <div className="bg-gray-100 p-2 rounded-lg flex items-center justify-center gap-1.5"><DollarSign className="w-4 h-4 text-gray-500"/>{job.salary}</div>
                    </div>
                    
                    <DetailSection title="岗位描述">
                        <p>{job.description}</p>
                    </DetailSection>

                    <DetailSection title="岗位职责">
                        <ul className="list-disc list-inside space-y-1">
                            {job.responsibilities.map((item, index) => <li key={index}>{item}</li>)}
                        </ul>
                    </DetailSection>

                    <DetailSection title="任职要求">
                        <ul className="list-disc list-inside space-y-1">
                           {job.requirements.map((item, index) => <li key={index}>{item}</li>)}
                        </ul>
                    </DetailSection>
                </main>

                <footer className="p-4 border-t bg-white">
                     <button 
                        onClick={onApply} 
                        disabled={isApplied}
                        className="w-full text-base bg-indigo-600 text-white px-3 py-3 rounded-full hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-bold"
                    >
                        {isApplied && <Check className="w-5 h-5" />}
                        {isApplied ? '已投递' : '一键投递'}
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default JobDetailModal;
