import React, { useState } from 'react';
import { X, UploadCloud, Check } from './Icons';

interface CertificationModalProps {
    onClose: () => void;
}

const Uploader: React.FC<{ title: string, description: string, id: string }> = ({ title, description, id }) => {
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    }

    return (
        <div>
            <h3 className="font-semibold mb-2">{title}</h3>
            <label htmlFor={id} className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 relative overflow-hidden">
                {preview ? (
                    <>
                        <img src={preview} alt="preview" className="absolute h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-green-900 bg-opacity-50 flex items-center justify-center text-white">
                            <Check className="w-8 h-8"/>
                        </div>
                    </>
                ) : (
                    <>
                        <UploadCloud className="w-8 h-8 text-gray-400" />
                        <span className="text-sm text-gray-500 text-center">{description}</span>
                    </>
                )}
            </label>
             <input id={id} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        </div>
    );
}

const CertificationModal: React.FC<CertificationModalProps> = ({ onClose }) => {

    const handleUpload = () => {
        alert("文件已上传审核！");
        onClose();
    }
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md flex flex-col">
                 <header className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-bold">可信度认证</h2>
                    <button onClick={onClose}><X className="w-6 h-6" /></button>
                </header>
                <main className="p-4 space-y-4">
                    <Uploader id="student-cert" title="学生认证" description="上传学生证照片" />
                    <Uploader id="skill-cert" title="技能认证" description="上传四六级、计算机等证书" />
                </main>
                 <footer className="p-4 border-t">
                    <button onClick={handleUpload} className="w-full py-2 bg-indigo-600 text-white font-bold rounded-lg shadow hover:bg-indigo-700">
                        提交认证
                    </button>
                </footer>
            </div>
        </div>
    );
}

export default CertificationModal;
