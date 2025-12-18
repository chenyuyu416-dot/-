
import React, { useState } from 'react';
import { X, UploadCloud, Check } from './Icons';

interface UploadResumeModalProps {
    onClose: () => void;
}

const UploadResumeModal: React.FC<UploadResumeModalProps> = ({ onClose }) => {
    const [fileName, setFileName] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name);
        }
    };

    const handleSave = () => {
        alert(`简历 "${fileName || '新简历'}" 已保存!`);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md flex flex-col">
                 <header className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-bold">上传简历</h2>
                    <button onClick={onClose}><X className="w-6 h-6" /></button>
                </header>
                <main className="p-4">
                    <label htmlFor="main-resume-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                        {fileName ? (
                            <div className="text-center text-green-600">
                                <Check className="w-10 h-10 mx-auto" />
                                <p className="mt-2 font-semibold truncate">{fileName}</p>
                            </div>
                        ) : (
                            <>
                                <UploadCloud className="w-8 h-8 text-gray-400" />
                                <span className="text-sm text-gray-500">点击上传简历文件 (.pdf, .doc)</span>
                            </>
                        )}
                    </label>
                    <input id="main-resume-upload" type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleFileChange}/>
                </main>
                 <footer className="p-4 border-t">
                    <button onClick={handleSave} className="w-full py-2 bg-indigo-600 text-white font-bold rounded-lg shadow hover:bg-indigo-700 disabled:bg-gray-300" disabled={!fileName}>
                        保存
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default UploadResumeModal;
