
import React, { useState, useCallback } from 'react';
import { Category, Post, Competition, Job, VolunteerActivity } from '../types';
import { ChevronLeft, Users, Trophy, Briefcase, Check } from '../components/Icons';
import { DUMMY_COMPETITIONS, DUMMY_JOBS, DUMMY_VOLUNTEER_ACTIVITIES } from '../constants';
import InterviewPrepModal from '../components/InterviewPrepModal';
import PartnerDetailModal from '../components/PartnerDetailModal';
import SelectResumeModal from '../components/SelectResumeModal';
import VolunteerSignUpModal from '../components/VolunteerSignUpModal';
import JobDetailModal from '../components/JobDetailModal';
import VolunteerDetailModal from '../components/VolunteerDetailModal';

interface CategoryDetailScreenProps {
  category: Category;
  posts: Post[];
  onBack: () => void;
  onSendApplication: (post: Post) => void;
  appliedIds: Set<string>;
  onApply: (id: string) => void;
  onStartAIInterview: () => void;
  onCompetitionSelect: (competition: Competition) => void;
  selectedLocation: string;
}

const PostCard: React.FC<{ post: Post, onApply: (post:Post) => void, isApplied: boolean }> = ({ post, onApply, isApplied }) => (
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
            <button 
                onClick={() => onApply(post)} 
                disabled={isApplied}
                className="text-xs bg-indigo-500 text-white px-3 py-1 rounded-full hover:bg-indigo-600 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-1"
            >
                {isApplied && <Check className="w-3 h-3" />}
                {isApplied ? '已申请' : '申请加入'}
            </button>
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

const JobCard: React.FC<{ job: Job, onClick: () => void }> = ({ job, onClick }) => (
    <div onClick={onClick} className="bg-white rounded-lg shadow p-4 mb-4 cursor-pointer hover:shadow-md transition-shadow">
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
    </div>
);

const VolunteerCard: React.FC<{ activity: VolunteerActivity, onClick: () => void }> = ({ activity, onClick }) => (
    <div onClick={onClick} className="bg-white rounded-lg shadow p-4 mb-4 cursor-pointer hover:shadow-md transition-shadow">
        <h4 className="font-bold text-gray-800">{activity.title}</h4>
        <p className="text-sm text-gray-600 mt-1">{activity.organization}</p>
        <div className="flex items-center text-xs text-gray-500 mt-2 space-x-2">
            <span className="bg-gray-100 px-2 py-0.5 rounded">{activity.location}</span>
            <span className="bg-gray-100 px-2 py-0.5 rounded">{activity.time}</span>
            {activity.certification && <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded">可认证时长</span>}
        </div>
    </div>
);


const CategoryDetailScreen: React.FC<CategoryDetailScreenProps> = ({ category, posts, onBack, onSendApplication, appliedIds, onApply, onStartAIInterview, onCompetitionSelect, selectedLocation }) => {
    const [activeScene, setActiveScene] = useState(category.scenes[0].id);
    const [isInterviewPrepOpen, setInterviewPrepOpen] = useState(false);
    const [applyingToPost, setApplyingToPost] = useState<Post | null>(null);
    const [isSelectResumeModalOpen, setSelectResumeModalOpen] = useState(false);
    const [applyingToJob, setApplyingToJob] = useState<Job | null>(null);
    const [signingUpForActivity, setSigningUpForActivity] = useState<VolunteerActivity | null>(null);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [selectedVolunteerActivity, setSelectedVolunteerActivity] = useState<VolunteerActivity | null>(null);
    
    const handleJobApply = (job: Job) => {
        setApplyingToJob(job);
        setSelectResumeModalOpen(true);
        setSelectedJob(null);
    };

    const handleConfirmJobApply = () => {
        if(applyingToJob) {
            onApply(applyingToJob.id);
            alert("简历已投递！");
            setApplyingToJob(null);
            setSelectResumeModalOpen(false);
        }
    };
    
    const handleVolunteerSignUp = (activity: VolunteerActivity) => {
        setSigningUpForActivity(activity);
        setSelectedVolunteerActivity(null);
    };
    
    const handleConfirmVolunteerSignUp = () => {
        if (signingUpForActivity) {
            onApply(signingUpForActivity.id);
            setSigningUpForActivity(null);
            alert("报名成功！通知已发送至您的消息中心。");
        }
    };

    const renderContent = () => {
        const relevantPosts = posts.filter(p => p.category === category.id && p.sceneId === activeScene && p.author.location === selectedLocation);
        const relevantCompetitions = DUMMY_COMPETITIONS.filter(c => c.sceneId === activeScene); // Competitions are national, not filtered by location
        const relevantJobs = DUMMY_JOBS.filter(j => j.sceneId === activeScene && (j.location === selectedLocation || j.type === '远程'));
        const relevantActivities = DUMMY_VOLUNTEER_ACTIVITIES.filter(v => v.sceneId === activeScene && (v.location === selectedLocation || v.location === '线上'));
        
        let content;

        switch(category.id) {
            case 'study':
            case 'hobby':
                content = relevantPosts.map(post => <PostCard key={post.id} post={post} onApply={setApplyingToPost} isApplied={appliedIds.has(post.id)} />);
                break;
            case 'competition':
                content = relevantCompetitions.map(comp => <CompetitionCard key={comp.id} comp={comp} onClick={() => onCompetitionSelect(comp)} />);
                break;
            case 'career':
                content = <>
                    <button onClick={() => setInterviewPrepOpen(true)} className="w-full flex items-center justify-center gap-2 p-3 mb-4 bg-white rounded-lg shadow font-semibold text-indigo-600 hover:bg-gray-50">
                        <Briefcase className="w-5 h-5"/>
                        <span>面试模拟</span>
                    </button>
                    {relevantJobs.map(job => <JobCard key={job.id} job={job} onClick={() => setSelectedJob(job)} />)}
                </>;
                break;
            case 'volunteer':
                content = relevantActivities.map(act => <VolunteerCard key={act.id} activity={act} onClick={() => setSelectedVolunteerActivity(act)} />);
                break;
            default:
                content = <p className="text-center text-gray-500 mt-8">暂无内容</p>;
        }

        if (Array.isArray(content) && content.length === 0) {
             return <p className="text-center text-gray-500 mt-8">在 {selectedLocation} 地区，该分类下暂无内容</p>;
        }
        if (category.id === 'career' && relevantJobs.length === 0) {
             return <>
                <button onClick={() => setInterviewPrepOpen(true)} className="w-full flex items-center justify-center gap-2 p-3 mb-4 bg-white rounded-lg shadow font-semibold text-indigo-600 hover:bg-gray-50">
                    <Briefcase className="w-5 h-5"/>
                    <span>面试模拟</span>
                </button>
                <p className="text-center text-gray-500 mt-8">在 {selectedLocation} 地区，该分类下暂无内容</p>
            </>;
        }
        return content;
    };

    const handleSendPostApplication = () => {
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

            {isInterviewPrepOpen && <InterviewPrepModal onClose={() => setInterviewPrepOpen(false)} onStartAIInterview={onStartAIInterview} />}
            {applyingToPost && <PartnerDetailModal user={applyingToPost.author} onClose={() => setApplyingToPost(null)} onApply={handleSendPostApplication} />}
            {isSelectResumeModalOpen && <SelectResumeModal onClose={() => setSelectResumeModalOpen(false)} onConfirm={handleConfirmJobApply} />}
            {signingUpForActivity && <VolunteerSignUpModal activity={signingUpForActivity} onClose={() => setSigningUpForActivity(null)} onConfirm={handleConfirmVolunteerSignUp} />}
            {selectedJob && <JobDetailModal job={selectedJob} onClose={() => setSelectedJob(null)} onApply={() => handleJobApply(selectedJob)} isApplied={appliedIds.has(selectedJob.id)} />}
            {selectedVolunteerActivity && <VolunteerDetailModal activity={selectedVolunteerActivity} onClose={() => setSelectedVolunteerActivity(null)} onSignUp={() => handleVolunteerSignUp(selectedVolunteerActivity)} isApplied={appliedIds.has(selectedVolunteerActivity.id)} />}
        </div>
    );
};

export default CategoryDetailScreen;
