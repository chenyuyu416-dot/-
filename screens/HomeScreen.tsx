
import React, { useState } from 'react';
import { Category, User } from '../types';
import { DUMMY_CATEGORIES } from '../constants';
import { Wand2 } from '../components/Icons';

interface HomeScreenProps {
  user: User;
  onCategorySelect: (category: Category) => void;
  onAiButtonClick: () => void;
  onSearch: (query: string) => void;
}

const CategoryCard: React.FC<{ category: Category, onClick: () => void }> = ({ category, onClick }) => {
    const { title, icon: Icon, color, scenes } = category;
    return (
        <div 
            onClick={onClick}
            className={`relative p-4 rounded-2xl shadow-lg text-white overflow-hidden bg-gradient-to-br ${color} transition-transform transform hover:scale-105 cursor-pointer`}
        >
            <div className="relative z-10">
                <div className="flex items-center mb-2">
                    <Icon className="w-6 h-6 mr-3" />
                    <h3 className="text-xl font-bold">{title}</h3>
                </div>
                <div className="text-sm opacity-90 space-y-1">
                    {scenes.slice(0, 2).map(scene => (
                        <p key={scene.id}>{scene.name}</p>
                    ))}
                </div>
            </div>
            <Icon className="absolute -right-4 -bottom-4 w-24 h-24 text-white/20 transform rotate-12" />
        </div>
    );
};


const HomeScreen: React.FC<HomeScreenProps> = ({ user, onCategorySelect, onAiButtonClick, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
        onSearch(searchTerm.trim());
    }
  };

  return (
    <div className="h-full bg-gray-50">
        <header className="sticky top-0 bg-white/80 backdrop-blur-lg z-10 p-4 shadow-sm">
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-sm text-gray-500">欢迎回来，</p>
                    <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
                </div>
                <button onClick={onAiButtonClick} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-full shadow-md hover:bg-indigo-700 transition">
                    <Wand2 className="w-5 h-5" />
                    <span className="text-sm font-semibold">AI 助手</span>
                </button>
            </div>
            <div className="mt-4">
                <input 
                    type="text" 
                    placeholder="搜索搭子、活动或竞赛..." 
                    className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleSearch}
                />
            </div>
        </header>

        <div className="p-4 space-y-4">
            <h2 className="text-xl font-bold text-gray-700">核心搭子板块</h2>
            <div className="grid grid-cols-2 gap-4">
                {DUMMY_CATEGORIES.map(cat => (
                    <CategoryCard key={cat.id} category={cat} onClick={() => onCategorySelect(cat)} />
                ))}
            </div>
        </div>
    </div>
  );
};

export default HomeScreen;