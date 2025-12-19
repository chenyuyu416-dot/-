
import React, { useState, useRef } from 'react';
import { ChevronLeft, UploadCloud, Check } from '../components/Icons';
import { User } from '../types';

interface SettingsScreenProps {
  user: User;
  onBack: () => void;
  onSave: (updatedInfo: Partial<User>) => void;
  onSchoolChangeRequest: (newSchool: string, studentIdFile: File) => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ user, onBack, onSave, onSchoolChangeRequest }) => {
    const [formData, setFormData] = useState({
        name: user.name || '',
        location: user.location || '北京',
        school: user.school || '',
        major: user.major || '',
        grade: user.grade || '',
        avatar: user.avatar,
    });
    const avatarInputRef = useRef<HTMLInputElement>(null);
    const studentIdInputRef = useRef<HTMLInputElement>(null);
    const [studentIdFile, setStudentIdFile] = useState<File | null>(null);
    const [studentIdPreview, setStudentIdPreview] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, avatar: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleStudentIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setStudentIdFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setStudentIdPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleSave = () => {
        const schoolChanged = formData.school !== user.school;
        
        if (schoolChanged && !studentIdFile) {
            alert('请上传学生证以验证学校变更。');
            return;
        }

        const updatedInfo: Partial<User> = {
            name: formData.name,
            location: formData.location,
            major: formData.major,
            grade: formData.grade,
            avatar: formData.avatar,
        };
        
        let shouldShowSaveAlert = true;

        if (!schoolChanged) {
            updatedInfo.school = formData.school;
            onSave(updatedInfo);
        } else if (schoolChanged && studentIdFile) {
            // Only save non-school info for now
            onSave(updatedInfo);
            onSchoolChangeRequest(formData.school, studentIdFile);
            shouldShowSaveAlert = false; // The request handler will show its own alert
        } else {
             onSave(updatedInfo);
        }
        
        if (shouldShowSaveAlert) {
            alert("信息已保存！");
        }
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
            <img src={formData.avatar} alt="avatar" className="w-20 h-20 rounded-full mx-auto object-cover" />
            <input type="file" accept="image/*" className="hidden" ref={avatarInputRef} onChange={handleAvatarChange} />
            <button onClick={() => avatarInputRef.current?.click()} className="text-sm text-indigo-600 font-semibold mt-2">更换头像</button>
        </div>
        <div className="bg-white rounded-lg shadow-sm">
            <div className="flex items-center p-4 border-b">
                <label className="w-24 text-gray-600">昵称</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="flex-1 bg-transparent text-right focus:outline-none" />
            </div>
             <div className="flex items-center p-4 border-b">
                <label className="w-24 text-gray-600">地区</label>
                <input type="text" name="location" value={formData.location} onChange={handleChange} className="flex-1 bg-transparent text-right focus:outline-none" />
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
        {formData.school !== user.school && (
            <div className="bg-white rounded-lg shadow-sm p-4 mt-4 border border-blue-200">
                <h3 className="font-semibold text-gray-700">学校变更需认证</h3>
                <p className="text-xs text-gray-500 mb-3">为确保社区安全，变更学校信息需上传学生证进行人工审核。</p>
                <label htmlFor="student-id-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 relative overflow-hidden">
                    {studentIdPreview ? (
                         <>
                            <img src={studentIdPreview} alt="学生证预览" className="absolute h-full w-full object-contain" />
                            <div className="absolute inset-0 bg-green-900 bg-opacity-50 flex items-center justify-center text-white">
                                <Check className="w-8 h-8"/>
                            </div>
                        </>
                    ) : (
                        <>
                            <UploadCloud className="w-8 h-8 text-gray-400" />
                            <span className="text-sm text-gray-500 text-center">点击上传学生证照片</span>
                        </>
                    )}
                </label>
                <input id="student-id-upload" ref={studentIdInputRef} type="file" accept="image/*" className="hidden" onChange={handleStudentIdChange} />
            </div>
        )}
      </main>
    </div>
  );
};

export default SettingsScreen;
