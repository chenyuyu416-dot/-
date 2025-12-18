
import React, { useState } from 'react';
import { User, TeamRequest } from '../types';
import { DUMMY_CHATS, DUMMY_TEAM_REQUESTS } from '../constants';
import { Check, X } from '../components/Icons';
import ApplicantProfileModal from '../components/ApplicantProfileModal';

interface MessagesScreenProps {
  onChatSelect: (user: User) => void;
}

const MessagesScreen: React.FC<MessagesScreenProps> = ({ onChatSelect }) => {
  const [activeTab, setActiveTab] = useState<'chats' | 'requests'>('chats');
  const [teamRequests, setTeamRequests] = useState<TeamRequest[]>(DUMMY_TEAM_REQUESTS);
  const [viewingApplicant, setViewingApplicant] = useState<TeamRequest | null>(null);

  const handleRequestDecision = (reqId: string, accepted: boolean) => {
    setTeamRequests(prev => prev.filter(req => req.id !== reqId));
    setViewingApplicant(null);
    alert(accepted ? '已同意该申请！' : '已拒绝该申请。');
  };
  
  return (
    <div className="flex flex-col h-full">
      <header className="sticky top-0 bg-white/80 backdrop-blur-lg z-10 p-4 shadow-sm text-center">
        <h1 className="text-xl font-bold text-gray-800">消息</h1>
      </header>
       <div className="p-2 bg-white m-4 mb-0 rounded-lg shadow-sm">
        <div className="flex bg-gray-200 rounded-md">
          <button 
            onClick={() => setActiveTab('chats')}
            className={`w-1/2 p-2 rounded-md text-sm font-semibold transition-colors ${activeTab === 'chats' ? 'bg-indigo-600 text-white' : 'text-gray-600'}`}>
            聊天
          </button>
          <button 
            onClick={() => setActiveTab('requests')}
            className={`w-1/2 p-2 rounded-md text-sm font-semibold transition-colors ${activeTab === 'requests' ? 'bg-indigo-600 text-white' : 'text-gray-600'}`}>
            组队申请
            {teamRequests.length > 0 && <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">{teamRequests.length}</span>}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {activeTab === 'chats' ? (
          DUMMY_CHATS.map(chat => (
            <div 
              key={chat.id} 
              onClick={() => onChatSelect(chat.user)}
              className="flex items-center p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50"
            >
              <div className="relative">
                <img src={chat.user.avatar} alt={chat.user.name} className="w-12 h-12 rounded-full" />
                {chat.unreadCount > 0 && (
                  <span className="absolute top-0 right-0 block h-3 w-3 transform -translate-y-1/2 translate-x-1/2 rounded-full bg-red-500 ring-2 ring-white"></span>
                )}
              </div>
              <div className="flex-1 ml-4">
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-gray-800">{chat.user.name}</p>
                  <p className="text-xs text-gray-400">{chat.timestamp}</p>
                </div>
                <div className="flex justify-between items-start">
                  <p className="text-sm text-gray-500 truncate w-4/5">{chat.lastMessage}</p>
                  {chat.unreadCount > 0 && (
                    <span className="bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
                      {chat.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          teamRequests.map(req => (
            <div key={req.id} className="p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50" onClick={() => setViewingApplicant(req)}>
                <div className="flex items-center">
                    <img src={req.user.avatar} alt={req.user.name} className="w-12 h-12 rounded-full" />
                    <div className="flex-1 ml-4">
                        <p><span className="font-semibold">{req.user.name}</span> 申请加入 <span className="font-semibold">{req.teamName}</span></p>
                        <p className="text-sm text-gray-500 bg-gray-100 p-2 rounded-md mt-1 truncate">"{req.message}"</p>
                    </div>
                </div>
                <div className="flex justify-end space-x-2 mt-2">
                    <button onClick={(e) => { e.stopPropagation(); handleRequestDecision(req.id, false); }} className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200"><X className="w-4 h-4"/></button>
                    <button onClick={(e) => { e.stopPropagation(); handleRequestDecision(req.id, true); }} className="p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200"><Check className="w-4 h-4"/></button>
                </div>
            </div>
          ))
        )}
      </div>
      {viewingApplicant && <ApplicantProfileModal request={viewingApplicant} onClose={() => setViewingApplicant(null)} onAccept={() => handleRequestDecision(viewingApplicant.id, true)} onReject={() => handleRequestDecision(viewingApplicant.id, false)} />}
    </div>
  );
};

export default MessagesScreen;
