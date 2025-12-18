
import React from 'react';
import { X } from './Icons';

interface CreateTeamModalProps {
    onClose: () => void;
}

const CreateTeamModal: React.FC<CreateTeamModalProps> = ({ onClose }) => {
    
    const handleCreate = () => {
        alert('队伍创建成功！');
        onClose();
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[70] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md flex flex-col">
                 <header className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-bold">发起组队</h2>
                    <button onClick={onClose}><X className="w-6 h-6" /></button>
                </header>

                <main className="p-4 space-y-4">
                    <div>
                        <label htmlFor="teamName" className="block text-sm font-medium text-gray-700 mb-1">队伍名称</label>
                        <input type="text" id="teamName" className="w-full p-2 border rounded-md" placeholder="e.g. AI赋能教育小队" />
                    </div>
                     <div>
                        <label htmlFor="lookingFor" className="block text-sm font-medium text-gray-700 mb-1">招募需求</label>
                        <textarea id="lookingFor" rows={3} className="w-full p-2 border rounded-md" placeholder="e.g. 寻找一位熟悉Python的算法同学..."></textarea>
                    </div>
                </main>

                <footer className="p-4 border-t">
                    <button onClick={handleCreate} className="w-full py-2 bg-indigo-600 text-white font-bold rounded-lg shadow hover:bg-indigo-700">
                        创建队伍
                    </button>
                </footer>
            </div>
        </div>
    )
}

export default CreateTeamModal;
