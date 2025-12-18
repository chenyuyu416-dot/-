
import React, { useState } from 'react';
import { Category, Post, Competition, Job, VolunteerActivity } from '../types';
import { ChevronLeft, Users, Trophy, Briefcase } from '../components/Icons';
import { DUMMY_POSTS, DUMMY_COMPETITIONS, DUMMY_JOBS, DUMMY_VOLUNTEER_ACTIVITIES } from '../constants';
import CompetitionDetailModal from '../components/CompetitionDetailModal';
import InterviewPrepModal from '../components/InterviewPrepModal';
import PartnerDetailModal from '../components/PartnerDetailModal';
import SelectResumeModal from '../components/SelectResumeModal';
import VolunteerSignUpModal from '../components/VolunteerSignUpModal';

interface CategoryDetailScreenProps {
  category: Category;
  onBack: () => void;
  onStartCall: () => void;
  onSendApplication: (post: Post) => void;
}

const PostCard: React.FC<{ post: Post, onApply: (post:Post) => void }> = ({ post, onApply }) => (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
        <div className="flex items-center mb-2">
            <img src={post.author.avatar} alt={post.author.name} className="w-8 h-8 rounded-full mr-2" />
            <div>
                <p className="font-semibold text-sm">{post.author.name}</p>
                <p className="text-xs text-gray-400">{post.timestamp}</p>
            </div>
        </div>
        <h4 className="font-bold text-gray-800 mb-1">{post.title}</h4>
        <p className="text-sm text-gray-600 line-clamp-2">{post.content}</p>
        <div className="flex justify-end mt-2">
            <button onClick={() => onApply(post)} className="text-xs bg-indigo-500 text-white px-3 py-1 rounded-full hover:bg-indigo-600">申请加入</button>
        </div>
    </div>
);

const CompetitionCard: React.FC<{ comp: Competition, onClick: () => void }> = ({ comp, onClick }) => (
    <div onClick={onClick} className="bg-white rounded-lg shadow p-4 mb-4 cursor-pointer hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start">
            <div>
                <h4 className="font-bold text-gray-800">{comp.name}</h4>
                <div className="flex items-center text-sm text-gray-500 mt-2 space-x-4">
                    <span className="flex items-center"><Trophy className="w-4 h-4 mr-1"/>{comp.category}</span>
                    <span className="flex items-center"><Users className="w-4 h-4 mr-1"/>{comp.participants}</span>
                </div>
            </div>
            <div className="text-right flex-shrink-0 ml-2">
                <p className="text-xs text-gray-500">报名截止</p>
                <p className="font-semibold text-red-500">{comp.deadline}</p>
            </div>
        </div>
    </div>
);

const JobCard: React.FC<{ job: Job, onApply: () => void }> = ({ job, onApply }) => (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
        <div className="flex justify-between items-start">
            <div>
                <h4 className="font-bold text-gray-800">{job.title}</h4>
                <p className="text-sm text-gray-600">{job.company}</p>
            </div>
            <p className="font-semibold text-indigo-600">{job.salary}</p>
        </div>
        <div className="flex items-center text-xs text-gray-500 mt-2 space-x-2">
            <span className="bg-gray-100 px-2 py-0.5 rounded">{job.location}</span>
            <span className="bg-gray-100 px-2 py-0.5 rounded">{job.type}</span>
        </div>
        <div className="flex justify-end space-x-2 mt-3">
            <button onClick={() => alert('已收藏!')} className="text-xs bg-gray-200 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-300">收藏</button>
            <button onClick={onApply} className="text-xs bg-indigo-500 text-white px-3 py-1 rounded-full hover:bg-indigo-600">一键投递</button>
        </div>
    </div>
);

const VolunteerCard: React.FC<{ activity: VolunteerActivity, onSignUp: (activity: VolunteerActivity) => void }> = ({ activity, onSignUp }) => (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
        <h4 className="font-bold text-gray-800">{activity.title}</h4>
        <p className="text-sm text-gray-600 mt-1">{activity.organization}</p>
        <div className="flex items-center text-xs text-gray-500 mt-2 space-x-2">
            <span className="bg-gray-100 px-2 py-0.5 rounded">{activity.location}</span>
            <span className="bg-gray-100 px-2 py-0.5 rounded">{activity.time}</span>
            {activity.certification && <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded">可认证时长</span>}
        </div>
        <div className="flex justify-end space-x-2 mt-3">
            <button onClick={() => alert('组队功能开发中!')} className="text-xs bg-gray-200 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-300">组队</button>
            <button onClick={() => onSignUp(activity)} className="text-xs bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600">一键报名</button>
        </div>
    </div>
);


const CategoryDetailScreen: React.FC<CategoryDetailScreenProps> = ({ category, onBack, onStartCall, onSendApplication }) => {
    const [activeScene, setActiveScene] = useState(category.scenes[0].id);
    const [activeCompetition, setActiveCompetition] = useState<Competition | null>(null);
    const [isInterviewPrepOpen, setInterviewPrepOpen] = useState(false);
    const [applyingToPost, setApplyingToPost] = useState<Post | null>(null);
    const [isSelectResumeModalOpen, setSelectResumeModalOpen] = useState(false);
    const [activeVolunteerActivity, setActiveVolunteerActivity] = useState<VolunteerActivity | null>(null);

    const renderContent = () => {
        const relevantPosts = DUMMY_POSTS.filter(p => p.category === category.id && p.sceneId === activeScene);
        const relevantCompetitions = DUMMY_COMPETITIONS.filter(c => c.sceneId === activeScene);
        const relevantJobs = DUMMY_JOBS.filter(j => j.sceneId === activeScene);
        const relevantActivities = DUMMY_VOLUNTEER_ACTIVITIES.filter(v => v.sceneId === activeScene);
        
        let content;

        switch(category.id) {
            case 'study':
            case 'hobby':
                content = relevantPosts.map(post => <PostCard key={post.id} post={post} onApply={setApplyingToPost} />);
                break;
            case 'competition':
                content = relevantCompetitions.map(comp => <CompetitionCard key={comp.id} comp={comp} onClick={() => setActiveCompetition(comp)} />);
                break;
            case 'career':
                content = <>
                    <button onClick={() => setInterviewPrepOpen(true)} className="w-full flex items-center justify-center gap-2 p-3 mb-4 bg-white rounded-lg shadow font-semibold text-indigo-600 hover:bg-gray-50">
                        <Briefcase className="w-5 h-5"/>
                        <span>面试模拟</span>
                    </button>
                    {relevantJobs.map(job => <JobCard key={job.id} job={job} onApply={() => setSelectResumeModalOpen(true)} />)}
                </>;
                break;
            case 'volunteer':
                content = relevantActivities.map(act => <VolunteerCard key={act.id} activity={act} onSignUp={setActiveVolunteerActivity}/>);
                break;
            default:
                content = <p className="text-center text-gray-500 mt-8">暂无内容</p>;
        }

        // Handle empty states
        if (Array.isArray(content) && content.length === 0) {
            return <p className="text-center text-gray-500 mt-8">该分类下暂无内容</p>;
        }
        return content;
    };

    const handleSendApplication = () => {
        if(applyingToPost) {
            onSendApplication(applyingToPost);
            setApplyingToPost(null);
        }
    }

    return (
        <div className="flex flex-col h-full bg-gray-50">
            <header className="sticky top-0 flex items-center p-3 bg-white/80 backdrop-blur-lg z-10 shadow-sm">
                <button onClick={onBack} className="text-gray-600 mr-3">
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <h2 className="text-lg font-bold text-gray-800">{category.title}</h2>
            </header>

            <div className="p-4 pt-2">
                <div className="flex space-x-2 overflow-x-auto pb-2 -mx-4 px-4">
                    {category.scenes.map(scene => (
                        <button 
                            key={scene.id}
                            onClick={() => setActiveScene(scene.id)}
                            className={`px-4 py-2 text-sm font-semibold rounded-full whitespace-nowrap transition-colors ${
                                activeScene === scene.id ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'
                            }`}
                        >
                            {scene.name}
                        </button>
                    ))}
                </div>
            </div>

            <main className="flex-1 overflow-y-auto px-4 pb-4">
                {renderContent()}
            </main>

            {activeCompetition && <CompetitionDetailModal competition={activeCompetition} onClose={() => setActiveCompetition(null)} />}
            {isInterviewPrepOpen && <InterviewPrepModal onClose={() => setInterviewPrepOpen(false)} onStartCall={onStartCall} />}
            {applyingToPost && <PartnerDetailModal user={applyingToPost.author} onClose={() => setApplyingToPost(null)} onApply={handleSendApplication} />}
            {isSelectResumeModalOpen && <SelectResumeModal onClose={() => setSelectResumeModalOpen(false)} />}
            {activeVolunteerActivity && <VolunteerSignUpModal activity={activeVolunteerActivity} onClose={() => setActiveVolunteerActivity(null)} />}
        </div>
    );
};

export default CategoryDetailScreen;