
import React, { useState, useEffect, useRef } from 'react';
import { Category, User, Competition } from '../types';
import { DUMMY_CATEGORIES, DUMMY_COMPETITIONS } from '../constants';
import { Wand2, ChevronRight, MapPin, ChevronDown, X } from '../components/Icons';

interface HomeScreenProps {
  user: User;
  onCategorySelect: (category: Category) => void;
  onAiButtonClick: () => void;
  onSearch: (query: string) => void;
  onCompetitionSelect: (competition: Competition) => void;
  selectedLocation: string;
  onLocationChange: (location: string) => void;
  // FIX: Add onQuickPost prop to fix type error from App.tsx
  onQuickPost: (categoryId: string, sceneId: string) => void;
}

const LocationSelectorModal: React.FC<{
    current: string;
    onSelect: (location: string) => void;
    onClose: () => void;
}> = ({ current, onSelect, onClose }) => {
    const locations = ['北京', '上海', '广州', '深圳', '杭州', '成都', '武汉', '南京'];
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm">
                <header className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-bold">选择地区</h2>
                    <button onClick={onClose}><X className="w-6 h-6" /></button>
                </header>
                <div className="p-4 grid grid-cols-4 gap-3">
                    {locations.map(loc => (
                        <button 
                            key={loc}
                            onClick={() => { onSelect(loc); onClose(); }}
                            className={`p-2 text-sm rounded-lg border ${loc === current ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-gray-100 hover:bg-gray-200'}`}
                        >
                            {loc}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

const hotCompetitions = [
  { ...DUMMY_COMPETITIONS[0], image: 'https://picsum.photos/seed/comp1/600/400' },
  { ...DUMMY_COMPETITIONS[1], image: 'https://picsum.photos/seed/newcomp2/600/400' },
  { ...DUMMY_COMPETITIONS[2], image: 'https://picsum.photos/seed/comp3/600/400' },
];

const CompetitionCarousel: React.FC<{ onCompetitionSelect: (competition: Competition) => void }> = ({ onCompetitionSelect }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setCurrentSlide((prevIndex) =>
          prevIndex === hotCompetitions.length - 1 ? 0 : prevIndex + 1
        ),
      3500
    );

    return () => {
      resetTimeout();
    };
  }, [currentSlide]);

  return (
    <div className="relative w-full h-40 rounded-2xl overflow-hidden shadow-lg group">
      <div
        className="whitespace-nowrap transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {hotCompetitions.map((comp) => (
          <div
            key={comp.id}
            onClick={() => onCompetitionSelect(comp)}
            className="inline-block w-full h-full relative cursor-pointer"
          >
            <img src={comp.image} alt={comp.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4 text-white">
              <h3 className="font-bold text-lg truncate">{comp.name}</h3>
              <p className="text-sm opacity-90">截止日期: {comp.deadline}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-2 right-2 flex space-x-1.5">
        {hotCompetitions.map((_, idx) => (
          <div
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-1.5 w-1.5 rounded-full cursor-pointer transition-all ${currentSlide === idx ? 'w-4 bg-white' : 'bg-white/50'}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

const CategoryListItem: React.FC<{ category: Category, onClick: () => void }> = ({ category, onClick }) => {
    const { title, icon: Icon, color, scenes } = category;
    return (
        <div 
            onClick={onClick}
            className={`relative p-4 rounded-2xl shadow-lg text-white overflow-hidden bg-gradient-to-r ${color} transition-transform transform hover:-translate-y-1 cursor-pointer flex items-center justify-between`}
        >
            <div className="relative z-10 flex items-center">
                <div className="p-3 bg-white/20 rounded-full mr-4">
                    <Icon className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-xl font-bold">{title}</h3>
                    <p className="text-sm opacity-90">{scenes.map(s => s.name).join(' · ')}</p>
                </div>
            </div>
             <Icon className="absolute -right-4 -bottom-8 w-28 h-28 text-white/10 transform rotate-12 z-0" />
            <ChevronRight className="w-7 h-7 relative z-10 text-white/50" />
        </div>
    );
};

const HomeScreen: React.FC<HomeScreenProps> = ({ user, onCategorySelect, onAiButtonClick, onSearch, onCompetitionSelect, selectedLocation, onLocationChange, onQuickPost }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLocationModalOpen, setLocationModalOpen] = useState(false);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
        onSearch(searchTerm.trim());
    }
  };

  return (
    <>
    <div className="h-full bg-gray-50">
        <header className="sticky top-0 bg-white/80 backdrop-blur-lg z-10 p-4 shadow-sm">
            <div className="flex justify-between items-center">
                <div>
                    <button onClick={() => setLocationModalOpen(true)} className="flex items-center text-sm text-gray-500 mb-1">
                        <MapPin className="w-4 h-4 mr-1"/>
                        <span>{selectedLocation}</span>
                        <ChevronDown className="w-4 h-4 ml-0.5"/>
                    </button>
                    <h1 className="text-2xl font-bold text-gray-800">欢迎回来, {user.name}</h1>
                </div>
                <button onClick={onAiButtonClick} className="self-end flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-full shadow-md hover:bg-indigo-700 transition">
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

        <div className="p-4 space-y-4 pb-20">
            <h2 className="text-xl font-bold text-gray-700">热门比赛</h2>
            <CompetitionCarousel onCompetitionSelect={onCompetitionSelect} />

            <h2 className="text-xl font-bold text-gray-700 pt-2">核心搭子板块</h2>
            <div className="space-y-3">
                {DUMMY_CATEGORIES.map(cat => (
                    <CategoryListItem key={cat.id} category={cat} onClick={() => onCategorySelect(cat)} />
                ))}
            </div>
        </div>
    </div>
    {isLocationModalOpen && <LocationSelectorModal current={selectedLocation} onSelect={onLocationChange} onClose={() => setLocationModalOpen(false)} />}
    </>
  );
};

export default HomeScreen;
