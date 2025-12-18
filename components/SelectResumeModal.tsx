
import React, { useRef } from 'react';
import { X, File, UploadCloud } from './Icons';

interface SelectResumeModalProps {
    onClose: () => void;
}

const SelectResumeModal: React.FC<SelectResumeModalProps> = ({ onClose }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleApply = () => {
        alert("简历已投递！");
        onClose();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            alert(`已选择新简历: ${e.target.files[0].name}`);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[70] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md flex flex-col">
                <header className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-bold">选择简历</h2>
                    <button onClick={onClose}><X className="w-6 h-6" /></button>
                </header>
                <main className="p-4 space-y-4">
                    <button className="w-full flex items-center p-3 border rounded-lg text-left hover:bg-gray-50">
                        <File className="w-6 h-6 mr-3 text-indigo-500" />
                        <div>
                            <p className="font-semibold">我的在线简历.pdf</p>
                            <p className="text-xs text-gray-400">最近上传于 2024-05-20</p>
                        </div>
                    </button>

                    <label htmlFor="resume-upload" className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                        <UploadCloud className="w-8 h-8 text-gray-400" />
                        <span className="text-sm text-gray-500">上传新简历</span>
                    </label>
                    <input id="resume-upload" ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} />
                </main>
                <footer className="p-4 border-t">
                    <button onClick={handleApply} className="w-full py-2 bg-indigo-600 text-white font-bold rounded-lg shadow hover:bg-indigo-700">
                        确认投递
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default SelectResumeModal;
