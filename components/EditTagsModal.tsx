
import React, { useState } from 'react';
import { X, Plus } from './Icons';

interface EditTagsModalProps {
    tags: string[];
    onClose: () => void;
    onSave: (tags: string[]) => void;
}

const EditTagsModal: React.FC<EditTagsModalProps> = ({ tags: initialTags, onClose, onSave }) => {
    const [tags, setTags] = useState(initialTags);
    const [newTag, setNewTag] = useState('');

    const handleAddTag = () => {
        if (newTag.trim() && !tags.includes(newTag.trim())) {
            setTags([...tags, newTag.trim()]);
            setNewTag('');
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md flex flex-col">
                <header className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-bold">编辑目标标签</h2>
                    <button onClick={onClose}><X className="w-6 h-6" /></button>
                </header>
                
                <main className="p-4">
                    <div className="flex flex-wrap gap-2 mb-4 min-h-[40px]">
                        {tags.map(tag => (
                            <div key={tag} className="flex items-center bg-indigo-100 text-indigo-700 text-sm rounded-full font-medium">
                                <span className="pl-3 pr-2 py-1">{tag}</span>
                                <button onClick={() => handleRemoveTag(tag)} className="pr-2 text-indigo-400 hover:text-indigo-600">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                     <div className="flex space-x-2">
                        <input 
                            type="text" 
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                            placeholder="添加新标签..."
                            className="flex-1 w-full px-3 py-2 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <button onClick={handleAddTag} className="p-2 bg-indigo-600 text-white rounded-lg">
                            <Plus className="w-5 h-5"/>
                        </button>
                    </div>
                </main>

                <footer className="p-4 border-t">
                    <button onClick={() => onSave(tags)} className="w-full py-2 bg-indigo-600 text-white font-bold rounded-lg shadow hover:bg-indigo-700">
                        保存
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default EditTagsModal;
