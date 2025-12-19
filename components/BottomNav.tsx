
import React from 'react';
import { Page } from '../types';
import { Home, Compass, MessageSquare, User, Plus } from './Icons';

interface BottomNavProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onPost: () => void;
  unreadMessageCount: number;
}

const NavItem: React.FC<{
  page: Page;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
  isActive: boolean;
  onClick: () => void;
}> = ({ page, label, Icon, isActive, onClick }) => (
  <button onClick={onClick} className="flex flex-col items-center justify-center w-full h-full">
    <Icon className={`h-6 w-6 mb-1 transition-colors ${isActive ? 'text-indigo-600' : 'text-gray-500'}`} />
    <span className={`text-xs transition-colors ${isActive ? 'text-indigo-600 font-semibold' : 'text-gray-500'}`}>{label}</span>
  </button>
);

const BottomNav: React.FC<BottomNavProps> = ({ currentPage, onNavigate, onPost, unreadMessageCount }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto h-16 bg-white border-t border-gray-200 shadow-t-lg z-50">
      <div className="grid grid-cols-5 items-center h-full">
        <NavItem page="home" label="首页" Icon={Home} isActive={currentPage === 'home'} onClick={() => onNavigate('home')} />
        <NavItem page="feed" label="搭子圈" Icon={Compass} isActive={currentPage === 'feed'} onClick={() => onNavigate('feed')} />
        
        <div className="flex justify-center">
            <button onClick={onPost} className="w-16 h-16 -mt-8 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg transform hover:scale-105 transition-transform">
            <Plus className="h-8 w-8" />
            </button>
        </div>
        
        <div className="relative w-full h-full">
            <NavItem page="messages" label="消息" Icon={MessageSquare} isActive={currentPage === 'messages'} onClick={() => onNavigate('messages')} />
            {unreadMessageCount > 0 && (
                 <span className="absolute top-2 right-4 block h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white"></span>
            )}
        </div>
        <NavItem page="profile" label="我的" Icon={User} isActive={currentPage === 'profile'} onClick={() => onNavigate('profile')} />
      </div>
    </div>
  );
};

export default BottomNav;