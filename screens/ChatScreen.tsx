
import React, { useState, useRef, useEffect } from 'react';
import { User, Message } from '../types';
import { ChevronLeft, Send, Video, Mic, File, BookOpen, PhoneOff, X, Search } from '../components/Icons';
import { DUMMY_USERS } from '../constants';
import ChatPartnerProfileModal from '../components/ChatPartnerProfileModal';

interface ChatScreenProps {
  chatId: string;
  user: User;
  messages: Message[];
  onSendMessage: (chatId: string, text: string) => void;
  onBack: () => void;
  onSendStudyInvite: (chatId: string) => void;
  onAcceptStudyInvite: (chatId: string, messageId: string) => void;
  onCancelStudyInvite: (chatId: string, messageId: string) => void;
  onClearChatHistory: (chatId: string) => void;
  onDeleteChat: (chatId: string) => void;
  onViewPartnerPosts: (user: User) => void;
}

const StudyInviteMessage: React.FC<{ message: Message; onAccept: () => void; onCancel: () => void }> = ({ message, onAccept, onCancel }) => {
    const sender = DUMMY_USERS[message.senderId] || DUMMY_USERS.currentUser;
    const isCurrentUser = message.senderId === DUMMY_USERS.currentUser.id;

    let content;
    if (message.inviteStatus === 'pending') {
        if (isCurrentUser) {
            content = (
                <button onClick={onCancel} className="mt-2 text-sm bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 flex items-center gap-1">
                    <PhoneOff className="w-4 h-4"/> 取消
                </button>
            );
        } else {
            content = (
                <button onClick={onAccept} className="mt-2 text-sm bg-green-500 text-white px-3 py-1 rounded-full hover:bg-green-600">
                    接受
                </button>
            );
        }
    } else if (message.inviteStatus === 'accepted') {
        content = <p className="mt-1 text-xs text-gray-500">已加入自习室</p>;
    } else if (message.inviteStatus === 'cancelled') {
        content = <p className="mt-1 text-xs text-gray-500">邀请已取消</p>;
    }

    return (
        <div className={`flex items-end gap-2 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
            {!isCurrentUser && sender && (
                <img src={sender.avatar} alt={sender.name} className="w-8 h-8 rounded-full"/>
            )}
             <div className={`max-w-xs lg:max-w-md p-3 rounded-2xl border ${isCurrentUser ? 'bg-indigo-50 border-indigo-200 rounded-br-none' : 'bg-green-50 border-green-200 rounded-bl-none'}`}>
                <div className="flex items-center gap-3">
                    <BookOpen className={`w-8 h-8 ${isCurrentUser ? 'text-indigo-500' : 'text-green-500'}`} />
                    <div>
                        <p className="text-sm font-semibold text-gray-800">{message.text}</p>
                        {content}
                    </div>
                </div>
             </div>
            {isCurrentUser && (
                <img src={sender.avatar} alt={sender.name} className="w-8 h-8 rounded-full"/>
            )}
        </div>
    );
};

const ChatScreen: React.FC<ChatScreenProps> = (props) => {
    const { chatId, user, messages, onSendMessage, onBack, onSendStudyInvite, onAcceptStudyInvite, onCancelStudyInvite, onClearChatHistory, onDeleteChat, onViewPartnerPosts } = props;
    const fileInputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [newMessage, setNewMessage] = useState('');
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            onSendMessage(chatId, newMessage.trim());
            setNewMessage('');
        }
    };
    
    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onSendMessage(chatId, `已发送文件: ${file.name}`);
        }
    };
    
    const filteredMessages = messages.filter(msg => 
        msg.text.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <>
    <div className="flex flex-col h-full bg-gray-100">
      <header className="sticky top-0 bg-white/80 backdrop-blur-lg z-10 shadow-sm">
        <div className="flex items-center p-3">
            <button onClick={onBack} className="text-gray-600 mr-3">
            <ChevronLeft className="w-6 h-6" />
            </button>
            <button onClick={() => setIsProfileModalOpen(true)} className="flex items-center text-left">
                <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full mr-3" />
                <h2 className="text-lg font-bold text-gray-800">{user.name}</h2>
            </button>
            <div className="ml-auto flex items-center space-x-4">
                <button onClick={() => onSendStudyInvite(chatId)} className="text-gray-600 hover:text-indigo-600">
                    <Video className="w-6 h-6" />
                </button>
                <button onClick={() => onSendStudyInvite(chatId)} className="text-gray-600 hover:text-indigo-600">
                    <Mic className="w-6 h-6" />
                </button>
            </div>
        </div>
        {isSearching && (
            <div className="p-2 border-t">
                <div className="relative">
                    <input 
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="搜索聊天记录..."
                        className="w-full pl-8 pr-8 py-1.5 text-sm bg-gray-100 rounded-full focus:outline-none focus:ring-1 focus:ring-indigo-400"
                    />
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"/>
                    <button onClick={() => { setIsSearching(false); setSearchQuery(''); }} className="absolute right-2.5 top-1/2 -translate-y-1/2">
                        <X className="w-4 h-4 text-gray-500" />
                    </button>
                </div>
            </div>
        )}
      </header>


      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {(isSearching ? filteredMessages : messages).map((msg) => {
            if (msg.type === 'study_invite') {
                return <StudyInviteMessage key={msg.id} message={msg} onAccept={() => onAcceptStudyInvite(chatId, msg.id)} onCancel={() => onCancelStudyInvite(chatId, msg.id)}/>
            }
            
            const allUsers = { ...DUMMY_USERS, [user.id]: user };
            const sender = allUsers[msg.senderId];
            const isCurrentUser = msg.senderId === DUMMY_USERS.currentUser.id;

            return (
                <div key={msg.id} className={`flex items-end gap-2 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                    {!isCurrentUser && sender && (
                        <img src={sender.avatar} alt={sender.name} className="w-8 h-8 rounded-full"/>
                    )}
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${isCurrentUser ? 'bg-indigo-500 text-white rounded-br-none' : 'bg-white shadow-sm rounded-bl-none'}`}>
                        <p className="text-sm">{msg.text}</p>
                    </div>
                    {isCurrentUser && (
                        <img src={DUMMY_USERS.currentUser.avatar} alt={DUMMY_USERS.currentUser.name} className="w-8 h-8 rounded-full"/>
                    )}
                </div>
            );
        })}
        <div ref={messagesEndRef} />
      </main>

      <footer className="bg-white p-3 border-t border-gray-200">
        <div className="flex items-center">
            <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" />
            <button onClick={() => fileInputRef.current?.click()} className="text-gray-500 p-2">
                <File className="w-6 h-6" />
            </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="输入消息..."
            className="flex-1 px-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 mx-2"
          />
          <button onClick={handleSendMessage} className="bg-indigo-600 text-white rounded-full p-2.5">
            <Send className="w-5 h-5" />
          </button>
        </div>
      </footer>
    </div>
    {isProfileModalOpen && (
        <ChatPartnerProfileModal 
            user={user}
            onClose={() => setIsProfileModalOpen(false)}
            onClearHistory={() => onClearChatHistory(chatId)}
            onSearchHistory={() => setIsSearching(true)}
            onDeleteChat={() => onDeleteChat(chatId)}
            onViewPosts={onViewPartnerPosts}
        />
    )}
    </>
  );
};

export default ChatScreen;