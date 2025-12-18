
import React, { useState, useRef } from 'react';
import { User, Message } from '../types';
import { ChevronLeft, Send, Video, Mic, File } from '../components/Icons';
import { DUMMY_USERS } from '../constants';

interface ChatScreenProps {
  user: User;
  onBack: () => void;
  onStartCall: () => void;
}

const ChatScreen: React.FC<ChatScreenProps> = ({ user, onBack, onStartCall }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', senderId: user.id, text: '你好！我们明天图书馆见可以吗？', timestamp: '10:45 AM'},
        { id: '2', senderId: DUMMY_USERS.currentUser.id, text: '当然可以，几点呢？', timestamp: '10:46 AM'},
        { id: '3', senderId: user.id, text: '早上9点怎么样？在一楼大厅碰头。', timestamp: '10:47 AM'},
        { id: '4', senderId: DUMMY_USERS.currentUser.id, text: '好的，我们明天图书馆见！', timestamp: '10:48 AM'}
    ]);
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const msg: Message = {
                id: String(messages.length + 1),
                senderId: DUMMY_USERS.currentUser.id,
                text: newMessage,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages([...messages, msg]);
            setNewMessage('');
        }
    };
    
    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const msg: Message = {
                id: String(messages.length + 1),
                senderId: DUMMY_USERS.currentUser.id,
                text: `已发送文件: ${file.name}`,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages([...messages, msg]);
        }
    };

  return (
    <div className="flex flex-col h-full bg-gray-100">
      <header className="sticky top-0 flex items-center p-3 bg-white/80 backdrop-blur-lg z-10 shadow-sm">
        <button onClick={onBack} className="text-gray-600 mr-3">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full mr-3" />
        <h2 className="text-lg font-bold text-gray-800">{user.name}</h2>
        <div className="ml-auto flex items-center space-x-4">
             <button onClick={onStartCall} className="text-gray-600 hover:text-indigo-600">
                <Video className="w-6 h-6" />
            </button>
             <button onClick={onStartCall} className="text-gray-600 hover:text-indigo-600">
                <Mic className="w-6 h-6" />
            </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex items-end gap-2 ${msg.senderId === user.id ? 'justify-start' : 'justify-end'}`}>
            {msg.senderId === user.id && (
                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full"/>
            )}
             <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${msg.senderId === user.id ? 'bg-white shadow-sm rounded-bl-none' : 'bg-indigo-500 text-white rounded-br-none'}`}>
                <p className="text-sm">{msg.text}</p>
             </div>
             {msg.senderId !== user.id && (
                <img src={DUMMY_USERS.currentUser.avatar} alt={DUMMY_USERS.currentUser.name} className="w-8 h-8 rounded-full"/>
            )}
          </div>
        ))}
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
  );
};

export default ChatScreen;
