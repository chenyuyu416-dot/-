
import React, { useState } from 'react';
import { X, Image, File, Video } from '../components/Icons';
import { DUMMY_CATEGORIES } from '../constants';

interface PostScreenProps {
  isOpen: boolean;
  onClose: () => void;
}

const PostScreen: React.FC<PostScreenProps> = ({ isOpen, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState(DUMMY_CATEGORIES[0].id);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [videoName, setVideoName] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video' | 'file') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (type === 'image') {
        setImagePreview(URL.createObjectURL(file));
        setVideoName(null);
        setFileName(null);
    } else if (type === 'video') {
        setVideoName(file.name);
        setImagePreview(null);
        setFileName(null);
    } else {
        setFileName(file.name);
        setImagePreview(null);
        setVideoName(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md h-full max-h-[90vh] flex flex-col m-4">
        <header className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-800">发布搭子信息</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X className="w-6 h-6" />
          </button>
        </header>

        <main className="flex-1 p-4 overflow-y-auto space-y-4">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">选择板块</label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {DUMMY_CATEGORIES.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.title}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">标题</label>
            <input 
              type="text" 
              id="title"
              placeholder="一句话说清你的需求" 
              className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">详细描述</label>
            <textarea
              id="content"
              rows={5}
              placeholder="详细说说你的目标、要求、计划等..."
              className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            ></textarea>
          </div>
          
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">标签</label>
            <input 
              type="text" 
              id="tags"
              placeholder="用逗号分隔，如：考研, 线上自习" 
              className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
             <label className="block text-sm font-medium text-gray-700 mb-2">附件 (可选)</label>
             <div className="flex space-x-2">
                <label htmlFor="image-upload" className="flex-1 flex flex-col items-center justify-center p-3 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                    <Image className="w-6 h-6 text-gray-400" />
                    <span className="text-xs text-gray-500 mt-1">上传图片</span>
                    <input id="image-upload" type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(e, 'image')} />
                </label>
                <label htmlFor="video-upload" className="flex-1 flex flex-col items-center justify-center p-3 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                    <Video className="w-6 h-6 text-gray-400" />
                    <span className="text-xs text-gray-500 mt-1">上传视频</span>
                     <input id="video-upload" type="file" accept="video/*" className="hidden" onChange={(e) => handleFileChange(e, 'video')} />
                </label>
                <label htmlFor="file-upload" className="flex-1 flex flex-col items-center justify-center p-3 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                    <File className="w-6 h-6 text-gray-400" />
                    <span className="text-xs text-gray-500 mt-1">上传文件</span>
                    <input id="file-upload" type="file" className="hidden" onChange={(e) => handleFileChange(e, 'file')} />
                </label>
             </div>
             {imagePreview && <div className="mt-2"><img src={imagePreview} alt="Preview" className="rounded-lg max-h-40 mx-auto" /></div>}
             {videoName && <p className="mt-2 text-sm text-center text-gray-600">已选择视频: {videoName}</p>}
             {fileName && <p className="mt-2 text-sm text-center text-gray-600">已选择文件: {fileName}</p>}
          </div>

        </main>
        
        <footer className="p-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg shadow-md transition-transform transform hover:scale-105"
          >
            发布
          </button>
        </footer>
      </div>
    </div>
  );
};

export default PostScreen;
