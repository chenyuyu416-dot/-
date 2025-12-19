
import React, { useState } from 'react';
import { X, UploadCloud, Check } from './Icons';
import { Skill } from '../types';

interface SkillCertificationUploadModalProps {
    skill: Skill;
    onClose: () => void;
    onSubmit: (skill: Skill, file: File) => void;
}

const SkillCertificationUploadModal: React.FC<SkillCertificationUploadModalProps> = ({ skill, onClose, onSubmit }) => {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    const handleSubmit = () => {
        if (file) {
            onSubmit(skill, file);
        } else {
            alert('请先上传证书文件！');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-[70] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md flex flex-col">
                <header className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-bold">认证: {skill.name}</h2>
                    <button onClick={onClose}><X className="w-6 h-6" /></button>
                </header>
                <main className="p-4">
                    <label htmlFor="skill-cert-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 relative overflow-hidden">
                        {preview ? (
                            <>
                                <img src={preview} alt="证书预览" className="absolute h-full w-full object-contain" />
                                <div className="absolute inset-0 bg-green-900 bg-opacity-50 flex items-center justify-center text-white">
                                    <Check className="w-8 h-8" />
                                </div>
                            </>
                        ) : (
                            <>
                                <UploadCloud className="w-8 h-8 text-gray-400" />
                                <span className="text-sm text-gray-500 text-center">点击上传证书照片</span>
                            </>
                        )}
                    </label>
                    <input id="skill-cert-upload" type="file" accept="image/*,.pdf" className="hidden" onChange={handleFileChange} />
                </main>
                <footer className="p-4 border-t">
                    <button
                        onClick={handleSubmit}
                        disabled={!file}
                        className="w-full py-2 bg-indigo-600 text-white font-bold rounded-lg shadow hover:bg-indigo-700 disabled:bg-gray-300"
                    >
                        提交审核
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default SkillCertificationUploadModal;
