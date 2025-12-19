
import React, { useState } from 'react';
import { X, UploadCloud, Check, ShieldCheck, Clock } from './Icons';
import { User } from '../types';

interface CertificationModalProps {
    user: User;
    onClose: () => void;
    onUpload: (studentIdFile: File | null, skillFile: File | null) => void;
}

const Uploader: React.FC<{ 
    title: string, 
    description: string, 
    id: string, 
    onFileChange: (file: File) => void,
    status: 'none' | 'pending' | 'certified', 
    preview: string | null 
}> = ({ title, description, id, onFileChange, status, preview }) => {

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onFileChange(file);
        }
    }
    const isDisabled = status === 'pending' || status === 'certified';

    let content;
    if (status === 'certified') {
        content = (
            <div className="text-center text-green-600 flex flex-col items-center justify-center">
                <ShieldCheck className="w-8 h-8"/>
                <span className="text-sm font-semibold mt-1">已认证</span>
            </div>
        );
    } else if (status === 'pending') {
         content = (
            <div className="text-center text-yellow-600 flex flex-col items-center justify-center">
                <Clock className="w-8 h-8 animate-spin"/>
                <span className="text-sm font-semibold mt-1">审核中</span>
            </div>
        );
    } else if (preview) {
        content = (
            <>
                <img src={preview} alt="preview" className="absolute h-full w-full object-cover" />
                <div className="absolute inset-0 bg-green-900 bg-opacity-50 flex items-center justify-center text-white">
                    <Check className="w-8 h-8"/>
                </div>
            </>
        );
    } else {
        content = (
            <>
                <UploadCloud className="w-8 h-8 text-gray-400" />
                <span className="text-sm text-gray-500 text-center">{description}</span>
            </>
        );
    }


    return (
        <div>
            <h3 className="font-semibold mb-2">{title}</h3>
            <label htmlFor={id} className={`flex flex-col items-center justify-center w-full h-28 border-2 border-dashed rounded-lg relative overflow-hidden ${isDisabled ? 'cursor-not-allowed bg-gray-100' : 'cursor-pointer hover:bg-gray-50'}`}>
                {content}
            </label>
             <input id={id} type="file" accept="image/*" className="hidden" onChange={handleFileChange} disabled={isDisabled} />
        </div>
    );
}

const CertificationModal: React.FC<CertificationModalProps> = ({ user, onClose, onUpload }) => {
    const [studentIdFile, setStudentIdFile] = useState<File | null>(null);
    const [studentIdPreview, setStudentIdPreview] = useState<string | null>(null);
    const [skillFile, setSkillFile] = useState<File | null>(null);
    const [skillPreview, setSkillPreview] = useState<string | null>(null);

    const handleStudentFileChange = (file: File) => {
        setStudentIdFile(file);
        setStudentIdPreview(URL.createObjectURL(file));
    }
    
    const handleSkillFileChange = (file: File) => {
        setSkillFile(file);
        setSkillPreview(URL.createObjectURL(file));
    }

    const handleUpload = () => {
        onUpload(studentIdFile, skillFile);
    }
    
    const canSubmit = (studentIdFile && user.studentCertificationStatus === 'none') || (skillFile && user.skillCertificationStatus === 'none');
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md flex flex-col">
                 <header className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-bold">可信度认证</h2>
                    <button onClick={onClose}><X className="w-6 h-6" /></button>
                </header>
                <main className="p-4 space-y-4">
                    <Uploader 
                        id="student-cert" 
                        title="学生认证" 
                        description="上传学生证照片" 
                        onFileChange={handleStudentFileChange}
                        status={user.studentCertificationStatus || 'none'}
                        preview={studentIdPreview}
                    />
                    <Uploader 
                        id="skill-cert" 
                        title="技能认证" 
                        description="上传四六级、计算机等证书"
                        onFileChange={handleSkillFileChange}
                        status={user.skillCertificationStatus || 'none'}
                        preview={skillPreview}
                    />
                </main>
                 <footer className="p-4 border-t">
                    <button 
                        onClick={handleUpload} 
                        className="w-full py-2 bg-indigo-600 text-white font-bold rounded-lg shadow hover:bg-indigo-700 disabled:bg-gray-300"
                        disabled={!canSubmit}
                    >
                        提交认证
                    </button>
                </footer>
            </div>
        </div>
    );
}

export default CertificationModal;
