
import React, { useState } from 'react';
import { ChevronLeft } from '../components/Icons';
import { User } from '../types';

interface SettingsScreenProps {
  user: User;
  onBack: () => void;
  onSave: (updatedInfo: Partial<User>) => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ user, onBack, onSave }) => {
    const [formData, setFormData] = useState({
        name: user.name || '',
        region: '北京',
        school: user.school || '',
        major: user.major || '',
        grade: user.grade || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        onSave(formData);
        onBack();
    };

  return (
    <div className="flex flex-col h-full bg-gray-100">
      <header className="sticky top-0 flex items-center p-3 bg-white/80 backdrop-blur-lg z-10 shadow-sm">
        <button onClick={onBack} className="text-gray-600 mr-3">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-bold text-gray-800 flex-1">设置</h2>
        <button onClick={handleSave} className="text-sm font-semibold text-indigo-600">保存</button>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="bg-white rounded-lg shadow-sm p-4 text-center">
            <img src={user.avatar} alt="avatar" className="w-20 h-20 rounded-full mx-auto" />
            <button className="text-sm text-indigo-600 font-semibold mt-2">更换头像</button>
        </div>
        <div className="bg-white rounded-lg shadow-sm">
            <div className="flex items-center p-4 border-b">
                <label className="w-24 text-gray-600">昵称</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="flex-1 bg-transparent text-right focus:outline-none" />
            </div>
             <div className="flex items-center p-4 border-b">
                <label className="w-24 text-gray-600">地区</label>
                <input type="text" name="region" value={formData.region} onChange={handleChange} className="flex-1 bg-transparent text-right focus:outline-none" />
            </div>
             <div className="flex items-center p-4 border-b">
                <label className="w-24 text-gray-600">学校</label>
                <input type="text" name="school" value={formData.school} onChange={handleChange} className="flex-1 bg-transparent text-right focus:outline-none" />
            </div>
             <div className="flex items-center p-4 border-b">
                <label className="w-24 text-gray-600">专业</label>
                <input type="text" name="major" value={formData.major} onChange={handleChange} className="flex-1 bg-transparent text-right focus:outline-none" />
            </div>
             <div className="flex items-center p-4">
                <label className="w-24 text-gray-600">年级</label>
                <input type="text" name="grade" value={formData.grade} onChange={handleChange} className="flex-1 bg-transparent text-right focus:outline-none" />
            </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsScreen;
