
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { ChevronLeft, Send } from '../components/Icons';
import { GoogleGenAI, Chat } from '@google/genai';
import { DUMMY_USERS } from '../constants';
import { Message } from '../types';

// Assume process.env.API_KEY is available
const API_KEY = process.env.API_KEY;

interface AIInterviewScreenProps {
  onBack: () => void;
}

const AIInterviewScreen: React.FC<AIInterviewScreenProps> = ({ onBack }) => {
    const aiUser = DUMMY_USERS.user4;
    const currentUser = DUMMY_USERS.currentUser;
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', senderId: aiUser.id, text: '你好，我是你的AI面试官。本次面试将围绕前端开发岗位展开。准备好了吗？我们现在开始。', timestamp: '...' },
    ]);
    const [newMessage, setNewMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const chat = useRef<Chat | null>(null);

    useEffect(() => {
        if (API_KEY) {
            const ai = new GoogleGenAI({ apiKey: API_KEY });
            chat.current = ai.chats.create({
                model: 'gemini-3-flash-preview',
                config: {
                    systemInstruction: "你是一位专业的、严格的前端开发岗位的面试官。请向用户提出专业的技术问题，并根据用户的回答进行追问，模拟真实的面试流程。请一次只问一个问题。"
                }
            });
        }
    }, []);

    useEffect(() => {
        chatContainerRef.current?.scrollTo(0, chatContainerRef.current.scrollHeight);
    }, [messages]);

    const handleSendMessage = useCallback(async () => {
        if (newMessage.trim() === '' || isLoading) return;

        const userMessageText = newMessage;
        const userMessage: Message = {
            id: String(Date.now()),
            senderId: currentUser.id,
            text: userMessageText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, userMessage]);
        setNewMessage('');
        setIsLoading(true);
        
        if (!chat.current) {
            const errorMsg: Message = { id: String(Date.now() + 1), senderId: aiUser.id, text: "错误：AI服务初始化失败，请检查API密钥。", timestamp: '...'};
            setMessages(prev => [...prev, errorMsg]);
            setIsLoading(false);
            return;
        }

        try {
            const result = await chat.current.sendMessage({ message: userMessageText });
            
            const aiResponseText = result.text || "请继续。";
            const aiResponse: Message = {
                id: String(Date.now() + 1),
                senderId: aiUser.id,
                text: aiResponseText,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, aiResponse]);
        } catch (error) {
            console.error(error);
            const errorMsg: Message = { id: String(Date.now() + 1), senderId: aiUser.id, text: "抱歉，出了一点问题，请稍后再试。", timestamp: '...'};
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsLoading(false);
        }
    }, [newMessage, isLoading, currentUser.id, aiUser.id]);

  return (
    <div className="flex flex-col h-full bg-gray-100">
      <header className="sticky top-0 flex items-center p-3 bg-white/80 backdrop-blur-lg z-10 shadow-sm">
        <button onClick={onBack} className="text-gray-600 mr-3">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <img src={aiUser.avatar} alt={aiUser.name} className="w-10 h-10 rounded-full mr-3" />
        <h2 className="text-lg font-bold text-gray-800">AI 模拟面试</h2>
      </header>

      <main ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex items-end gap-2 ${msg.senderId === aiUser.id ? 'justify-start' : 'justify-end'}`}>
            {msg.senderId === aiUser.id && (
                <img src={aiUser.avatar} alt={aiUser.name} className="w-8 h-8 rounded-full"/>
            )}
             <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${msg.senderId === aiUser.id ? 'bg-white shadow-sm rounded-bl-none' : 'bg-indigo-500 text-white rounded-br-none'}`}>
                <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
             </div>
             {msg.senderId !== aiUser.id && (
                <img src={currentUser.avatar} alt={currentUser.name} className="w-8 h-8 rounded-full"/>
            )}
          </div>
        ))}
         {isLoading && (
             <div className="flex items-end gap-2 justify-start">
                <img src={aiUser.avatar} alt={aiUser.name} className="w-8 h-8 rounded-full"/>
                <div className="px-4 py-3 bg-white shadow-sm rounded-2xl rounded-bl-none">
                    <div className="flex items-center space-x-1">
                        <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
	                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
	                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></span>
                    </div>
                </div>
             </div>
         )}
      </main>

      <footer className="bg-white p-3 border-t border-gray-200">
        <div className="flex items-center">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="输入你的回答..."
            className="flex-1 px-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 mx-2"
          />
          <button onClick={handleSendMessage} disabled={isLoading} className="bg-indigo-600 text-white rounded-full p-2.5 disabled:bg-indigo-300">
            <Send className="w-5 h-5" />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default AIInterviewScreen;
