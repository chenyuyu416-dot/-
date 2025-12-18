
import React, { useState, useCallback, useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChevronLeft, Cpu, File, Check, Upload } from '../components/Icons';
import { GoogleGenAI } from '@google/genai';

// Assume process.env.API_KEY is available
const API_KEY = process.env.API_KEY;

const AIScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'supervisor' | 'resources'>('supervisor');

  const progressData = [
    { name: '周一', hours: 4 },
    { name: '周二', hours: 3 },
    { name: '周三', hours: 5 },
    { name: '周四', hours: 4.5 },
    { name: '周五', hours: 6 },
    { name: '周六', hours: 8 },
    { name: '周日', hours: 2 },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-100">
      <header className="sticky top-0 flex items-center p-3 bg-white/80 backdrop-blur-lg z-10 shadow-sm">
        <button onClick={onBack} className="text-gray-600 mr-3">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-bold text-gray-800">AI 智能监督系统</h2>
      </header>
      
      <div className="p-2 bg-white m-4 rounded-lg shadow-sm">
        <div className="flex bg-gray-200 rounded-md">
          <button 
            onClick={() => setActiveTab('supervisor')}
            className={`w-1/2 p-2 rounded-md text-sm font-semibold transition-colors ${activeTab === 'supervisor' ? 'bg-indigo-600 text-white' : 'text-gray-600'}`}>
            专属监督官
          </button>
          <button 
            onClick={() => setActiveTab('resources')}
            className={`w-1/2 p-2 rounded-md text-sm font-semibold transition-colors ${activeTab === 'resources' ? 'bg-indigo-600 text-white' : 'text-gray-600'}`}>
            高效工具包
          </button>
        </div>
      </div>
      
      <main className="flex-1 overflow-y-auto px-4 pb-4">
        {activeTab === 'supervisor' ? <SupervisorContent data={progressData} /> : <ResourcesContent />}
      </main>
    </div>
  );
};

const TaskItem: React.FC<{ label: string, initialChecked?: boolean }> = ({ label, initialChecked }) => {
    const [isChecked, setIsChecked] = useState(initialChecked || false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            alert(`证明文件 "${e.target.files[0].name}" 已上传!`);
            setIsChecked(true);
        }
    };

    return (
        <li className="flex items-center justify-between">
            <span className={`transition-colors ${isChecked ? 'text-gray-400 line-through' : 'text-gray-600'}`}>{label}</span>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
            {isChecked ? (
                <div className="flex items-center gap-1 text-green-500">
                    <Check className="w-4 h-4" />
                    <span className="text-sm font-semibold">已完成</span>
                </div>
            ) : (
                <button onClick={handleUploadClick} className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800">
                    <Upload className="w-4 h-4"/>
                    <span>上传证明</span>
                </button>
            )}
        </li>
    );
};


const SupervisorContent: React.FC<{ data: any[] }> = ({ data }) => {
    return (
        <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-bold text-gray-800 mb-2">本周学习进度</h3>
                <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                            <XAxis dataKey="name" fontSize={12} />
                            <YAxis fontSize={12} unit="h" />
                            <Tooltip />
                            <Bar dataKey="hours" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-bold text-gray-800 mb-2">今日任务: 备战数学建模</h3>
                <ul className="text-sm space-y-4">
                    <TaskItem label="每日背50个单词" initialChecked />
                    <TaskItem label="完成一篇英文阅读" />
                    <TaskItem label="建模案例学习" />
                </ul>
                <button 
                    onClick={() => alert('AI分析报告：\n任务完成率: 33%。\n建议：请及时完成剩余任务以保证学习进度。您在词汇记忆上表现稳定，请继续保持！')}
                    className="w-full mt-4 flex items-center justify-center gap-2 py-2 bg-indigo-600 text-white rounded-lg text-sm"
                >
                    <Cpu className="w-4 h-4"/> AI分析
                </button>
            </div>
        </div>
    );
};

const ResourcesContent: React.FC = () => {
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [resumeText, setResumeText] = useState('我的项目经历是参与了一个校园商城的开发，负责了部分前端页面。');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
             if (file.type === "text/plain" || file.name.endsWith('.md')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setResumeText(e.target?.result as string);
                };
                reader.readAsText(file);
            } else {
                alert("请上传 .txt 或 .md 格式的纯文本文件。");
            }
        }
    };

    const optimizeResume = useCallback(async () => {
        if (!API_KEY) {
            setResponse("错误：API 密钥未配置。");
            return;
        }
        setIsLoading(true);
        setResponse('');
        try {
            const ai = new GoogleGenAI({ apiKey: API_KEY });
            const result = await ai.models.generateContent({
                model: "gemini-3-flash-preview",
                contents: `请帮我优化这段简历内容，使其更专业，突出我的贡献和技能，并使用量化描述。简历内容：“${resumeText}”`,
                config: {
                    systemInstruction: "你是一位专业的HR，擅长优化简历，使内容更具吸引力。"
                }
            });
            setResponse(result.text || "无法获取优化建议。");
        } catch (error) {
            console.error(error);
            setResponse("抱歉，优化时出现错误。");
        } finally {
            setIsLoading(false);
        }
    }, [resumeText]);

    return (
        <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-bold text-gray-800 mb-2">文档处理</h3>
                <textarea 
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    rows={3} 
                    className="w-full text-sm p-2 border rounded-md bg-gray-50"
                    placeholder="输入或上传你的简历内容..."
                />
                <div className="flex space-x-2 mt-2">
                     <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".txt,.md" className="hidden"/>
                     <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="flex-1 flex items-center justify-center p-2 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300">
                        <File className="w-4 h-4 mr-2"/> 上传简历 (.txt)
                    </button>
                    <button 
                        onClick={optimizeResume}
                        disabled={isLoading}
                        className="flex-1 flex items-center justify-center p-2 bg-indigo-600 text-white rounded-lg text-sm disabled:bg-indigo-300 hover:bg-indigo-700">
                        <Cpu className="w-4 h-4 mr-2"/> {isLoading ? '优化中...' : 'AI 优化'}
                    </button>
                </div>
                {response && (
                    <div className="mt-3 text-sm p-3 bg-indigo-50 rounded-md border border-indigo-200 text-gray-700">
                       <p className="font-semibold mb-1">优化建议:</p>
                       <div className="prose prose-sm whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: response.replace(/\n/g, '<br/>') }}/>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AIScreen;
