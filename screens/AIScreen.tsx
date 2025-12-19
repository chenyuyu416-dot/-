
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChevronLeft, Cpu, File, Check, Upload, Plus, Trash2, X as XIcon } from '../components/Icons';
import { GoogleGenAI } from '@google/genai';
import { AITask } from '../types';
import CompleteTaskModal from '../components/CompleteTaskModal';


// Assume process.env.API_KEY is available
const API_KEY = process.env.API_KEY;

interface AIScreenProps {
    onBack: () => void;
    data: any[];
    onUpdateProgress: (timeSpent: number) => void;
}

const AIScreen: React.FC<AIScreenProps> = ({ onBack, data, onUpdateProgress }) => {
  const [activeTab, setActiveTab] = useState<'supervisor' | 'resources'>('supervisor');

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
        {activeTab === 'supervisor' ? <SupervisorContent data={data} onUpdateProgress={onUpdateProgress} /> : <ResourcesContent />}
      </main>
    </div>
  );
};

const TaskItem: React.FC<{ task: AITask, onUpdate: (id: number, newText: string) => void, onComplete: (id: number, timeSpent: number) => void, onDelete: (id: number) => void }> = ({ task, onUpdate, onComplete, onDelete }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(task.text);
    const [isCompleteModalOpen, setCompleteModalOpen] = useState(false);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            alert(`证明文件 "${e.target.files[0].name}" 已上传!`);
            setCompleteModalOpen(true);
        }
    };
    
    const handleSaveEdit = () => {
        if (editText.trim()) {
            onUpdate(task.id, editText.trim());
            setIsEditing(false);
        }
    };

    return (
        <>
            <li className="flex items-center justify-between group">
                {isEditing ? (
                    <input 
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onBlur={handleSaveEdit}
                        onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit()}
                        className="flex-1 text-sm bg-gray-100 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        autoFocus
                    />
                ) : (
                    <span 
                        onClick={() => !task.completed && setIsEditing(true)}
                        className={`transition-colors cursor-pointer ${task.completed ? 'text-gray-400 line-through' : 'text-gray-600'}`}>
                        {task.text}
                    </span>
                )}

                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />

                <div className="flex items-center gap-2">
                    {task.completed ? (
                        <div className="flex items-center gap-1 text-green-500">
                            <Check className="w-4 h-4" />
                            <span className="text-sm font-semibold">已完成 ({task.timeSpent}h)</span>
                        </div>
                    ) : (
                        <button onClick={handleUploadClick} className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800">
                            <Upload className="w-4 h-4"/>
                            <span>上传证明</span>
                        </button>
                    )}
                     <button onClick={() => onDelete(task.id)} className="text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </li>
            {isCompleteModalOpen && <CompleteTaskModal 
                onClose={() => setCompleteModalOpen(false)} 
                onConfirm={(time) => {
                    onComplete(task.id, time);
                    setCompleteModalOpen(false);
                }} 
            />}
        </>
    );
};

interface SupervisorContentProps {
  data: any[];
  onUpdateProgress: (timeSpent: number) => void;
}

const SupervisorContent: React.FC<SupervisorContentProps> = ({ data, onUpdateProgress }) => {
    const [tasks, setTasks] = useState<AITask[]>([
        { id: 1, text: '每日背50个单词', completed: true, timeSpent: 1 },
        { id: 2, text: '完成一篇英文阅读', completed: false, timeSpent: null },
        { id: 3, text: '建模案例学习', completed: false, timeSpent: null },
    ]);
    const [newTaskText, setNewTaskText] = useState('');

    const handleAddTask = () => {
        if (newTaskText.trim()) {
            const newTask: AITask = {
                id: Date.now(),
                text: newTaskText.trim(),
                completed: false,
                timeSpent: null,
            };
            setTasks([...tasks, newTask]);
            setNewTaskText('');
        }
    };
    
    const handleUpdateTask = (id: number, newText: string) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, text: newText } : t));
    };

    const handleCompleteTask = (id: number, timeSpent: number) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: true, timeSpent } : t));
        onUpdateProgress(timeSpent);
    };

    const handleDeleteTask = (id: number) => {
        setTasks(tasks.filter(t => t.id !== id));
    };
    
    const getAIAnalysis = () => {
        const completedTasks = tasks.filter(t => t.completed);
        const totalTime = completedTasks.reduce((sum, task) => sum + (task.timeSpent || 0), 0);
        const completionRate = tasks.length > 0 ? (completedTasks.length / tasks.length) * 100 : 0;
        
        let report = `AI分析报告：\n任务完成率: ${completionRate.toFixed(0)}%。\n今日已专注 ${totalTime.toFixed(1)} 小时。\n\n`;
        if (completionRate === 100) {
            report += "太棒了！所有任务都已完成，请继续保持！";
        } else if (completionRate > 50) {
            report += "做得不错，大部分任务已完成。离目标越来越近了！";
        } else {
             report += "请及时完成剩余任务以保证学习进度。加油！";
        }
        alert(report);
    };

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
                    {tasks.map(task => 
                        <TaskItem 
                            key={task.id} 
                            task={task} 
                            onUpdate={handleUpdateTask} 
                            onComplete={handleCompleteTask} 
                            onDelete={handleDeleteTask} 
                        />
                    )}
                </ul>
                <div className="flex space-x-2 mt-4">
                    <input 
                        type="text" 
                        value={newTaskText} 
                        onChange={(e) => setNewTaskText(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
                        placeholder="添加新任务..."
                        className="flex-1 w-full px-3 py-2 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    />
                    <button onClick={handleAddTask} className="p-2 bg-indigo-600 text-white rounded-lg">
                        <Plus className="w-5 h-5"/>
                    </button>
                </div>
                <button 
                    onClick={getAIAnalysis}
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
            const reader = new FileReader();
            reader.onload = (e) => {
                setResumeText(e.target?.result as string);
                alert(`"${file.name}" 已加载内容。`);
            };
            reader.readAsText(file);
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
                contents: `请帮我优化这段文档内容，使其更专业，突出要点和技能，并使用量化描述。内容：“${resumeText}”`,
                config: {
                    systemInstruction: "你是一位专业的编辑，擅长优化各种文档，使内容更具吸引力。"
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
                    placeholder="输入或上传你的文档内容..."
                />
                <div className="flex space-x-2 mt-2">
                     <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden"/>
                     <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="flex-1 flex items-center justify-center p-2 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300">
                        <File className="w-4 h-4 mr-2"/> 上传文件
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