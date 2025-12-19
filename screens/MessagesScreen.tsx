
import React, { useState } from 'react';
import { User, TeamRequest, SentApplication, Chat } from '../types';
import { Check, X } from '../components/Icons';
import ApplicantProfileModal from '../components/ApplicantProfileModal';

interface MessagesScreenProps {
  chats: Chat[];
  teamRequests: TeamRequest[];
  onChatSelect: (chatId: string, user: User) => void;
  sentApplications: SentApplication[];
  onRequestDecision: (reqId: string, accepted: boolean) => void;
}

const SentApplicationCard: React.FC<{ application: SentApplication }> = ({ application }) => {
    const statusStyles = {
        pending: 'bg-yellow-100 text-yellow-800',
        accepted: 'bg-green-100 text-green-800',
        rejected: 'bg-red-100 text-red-800',
    };
    const statusText = {
        pending: '待处理',
        accepted: '已接受',
        rejected: '已拒绝',
    };
    return (
        <div className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-indigo-400">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm text-gray-500">你向 <span className="font-semibold text-gray-700">{application.recipient.name}</span> 发送了申请</p>
                    <p className="font-semibold mt-1 truncate">"{application.postTitle}"</p>
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusStyles[application.status]}`}>
                    {statusText[application.status]}
                </span>
            </div>
            <p className="text-right text-xs text-gray-400 mt-2">{application.timestamp}</p>
        </div>
    );
};

const MessagesScreen: React.FC<MessagesScreenProps> = ({ chats, teamRequests, onChatSelect, sentApplications, onRequestDecision }) => {
  const [activeTab, setActiveTab] = useState<'chats' | 'requests' | 'sent'>('chats');
  const [viewingApplicant, setViewingApplicant] = useState<TeamRequest | null>(null);

  const handleRequestDecision = (reqId: string, accepted: boolean) => {
    onRequestDecision(reqId, accepted);
    setViewingApplicant(null);
  };
  
  return (
    <div className="flex flex-col h-full bg-gray-100">
      <header className="sticky top-0 bg-white/80 backdrop-blur-lg z-10 p-4 shadow-sm text-center">
        <h1 className="text-xl font-bold text-gray-800">消息中心</h1>
      </header>
       <div className="p-2 bg-white m-4 mb-0 rounded-lg shadow-sm">
        <div className="flex bg-gray-200 rounded-md">
          <button 
            onClick={() => setActiveTab('chats')}
            className={`flex-1 p-2 rounded-md text-sm font-semibold transition-colors ${activeTab === 'chats' ? 'bg-indigo-600 text-white' : 'text-gray-600'}`}>
            聊天
          </button>
          <button 
            onClick={() => setActiveTab('requests')}
            className={`flex-1 p-2 rounded-md text-sm font-semibold transition-colors ${activeTab === 'requests' ? 'bg-indigo-600 text-white' : 'text-gray-600'}`}>
            收到申请
            {teamRequests.length > 0 && <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">{teamRequests.length}</span>}
          </button>
           <button 
            onClick={() => setActiveTab('sent')}
            className={`flex-1 p-2 rounded-md text-sm font-semibold transition-colors ${activeTab === 'sent' ? 'bg-indigo-600 text-white' : 'text-gray-600'}`}>
            我发送的
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {activeTab === 'chats' && chats.map(chat => (
            <div 
              key={chat.id} 
              onClick={() => onChatSelect(chat.id, chat.user)}
              className="flex items-center p-3 bg-white rounded-lg shadow-sm cursor-pointer hover:bg-gray-50"
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
        ))}
        {activeTab === 'requests' && (teamRequests.length > 0 ? teamRequests.map(req => (
            <div key={req.id} className="p-3 bg-white rounded-lg shadow-sm cursor-pointer hover:bg-gray-50" onClick={() => setViewingApplicant(req)}>
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
        )) : <p className="text-center text-gray-500 mt-8">暂无收到的申请</p>)}
        {activeTab === 'sent' && (sentApplications.length > 0 ? sentApplications.map(app => (
            <SentApplicationCard key={app.id} application={app} />
        )) : <p className="text-center text-gray-500 mt-8">暂无已发送的申请</p>)}
      </div>
      {viewingApplicant && <ApplicantProfileModal request={viewingApplicant} onClose={() => setViewingApplicant(null)} onAccept={() => handleRequestDecision(viewingApplicant.id, true)} onReject={() => handleRequestDecision(viewingApplicant.id, false)} />}
    </div>
  );
};

export default MessagesScreen;