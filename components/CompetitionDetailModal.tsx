
import React, { useState } from 'react';
import { Competition, Team } from '../types';
import { DUMMY_TEAMS, DUMMY_USERS } from '../constants';
import { X, Users, Plus, Check } from './Icons';
import CreateTeamModal from './CreateTeamModal';

interface CompetitionDetailModalProps {
    competition: Competition;
    onClose: () => void;
    appliedTeamIds: Set<string>;
    onApplyToTeam: (teamId: string) => void;
}

interface TeamCardProps {
    team: Team;
    onApply: (teamId: string) => void;
    isApplied: boolean;
}

const TeamCard: React.FC<TeamCardProps> = ({ team, onApply, isApplied }) => (
    <div className="bg-gray-100 rounded-lg p-3 mb-3">
        <div className="flex justify-between items-start">
            <div>
                <p className="font-bold">{team.name}</p>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                    <Users className="w-3 h-3 mr-1" />
                    <span>{team.members.length}人</span>
                    <span className="mx-1">·</span>
                    <span>队长: {team.leader.name}</span>
                </div>
            </div>
            <button 
                onClick={() => onApply(team.id)} 
                disabled={isApplied}
                className="text-xs bg-indigo-500 text-white px-3 py-1 rounded-full hover:bg-indigo-600 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-1"
            >
                {isApplied && <Check className="w-3 h-3" />}
                {isApplied ? '已申请' : '申请加入'}
            </button>
        </div>
        <p className="text-sm text-indigo-700 mt-2 bg-indigo-50 p-2 rounded-md">
            <span className="font-semibold">招募:</span> {team.lookingFor}
        </p>
    </div>
);

const DetailSection: React.FC<{title: string; content: string}> = ({title, content}) => (
    <div className="mt-4">
        <h4 className="font-semibold text-gray-800 mb-2">{title}</h4>
        <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg whitespace-pre-wrap">
            {content}
        </div>
    </div>
);

const CompetitionDetailModal: React.FC<CompetitionDetailModalProps> = ({ competition, onClose, appliedTeamIds, onApplyToTeam }) => {
    const [teams, setTeams] = useState<Team[]>(DUMMY_TEAMS.filter(t => t.competitionId === competition.id));
    const [isCreatingTeam, setIsCreatingTeam] = useState(false);

    const handleCreateTeam = (teamData: { name: string; lookingFor: string }) => {
        const newTeam: Team = {
            id: `t${Date.now()}`,
            competitionId: competition.id,
            name: teamData.name,
            leader: DUMMY_USERS.currentUser,
            members: [DUMMY_USERS.currentUser],
            lookingFor: teamData.lookingFor
        };
        setTeams(prev => [newTeam, ...prev]);
        setIsCreatingTeam(false);
        alert('队伍创建成功！');
    };

    return (
        <>
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-end justify-center">
            <div className="bg-white rounded-t-2xl shadow-xl w-full max-w-md h-[90vh] flex flex-col">
                <header className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-bold">赛事详情</h2>
                    <button onClick={onClose}><X className="w-6 h-6" /></button>
                </header>

                <main className="flex-1 overflow-y-auto p-4">
                    <div className="border-b pb-4">
                        <h3 className="text-xl font-bold text-gray-800">{competition.name}</h3>
                        <p className="text-sm text-gray-600 mt-2">{competition.details}</p>
                    </div>

                    <DetailSection title="时间规划" content={competition.timePlan} />
                    <DetailSection title="作品提交要求" content={competition.submissionRequirements} />
                    <DetailSection title="组队要求" content={competition.teamRequirements} />
                    <DetailSection title="创作规范" content={competition.creationGuidelines} />
                    <DetailSection title="参赛流程" content={competition.process} />

                    <div className="mt-4">
                        <div className="flex justify-between items-center mb-2">
                            <h4 className="font-semibold">已有组队 ({teams.length})</h4>
                            <button onClick={() => setIsCreatingTeam(true)} className="flex items-center gap-1 text-sm text-indigo-600 font-semibold">
                                <Plus className="w-4 h-4" />
                                <span>发起组队</span>
                            </button>
                        </div>
                        {teams.map(team => <TeamCard key={team.id} team={team} onApply={onApplyToTeam} isApplied={appliedTeamIds.has(team.id)} />)}
                    </div>
                </main>
            </div>
        </div>
        {isCreatingTeam && <CreateTeamModal onClose={() => setIsCreatingTeam(false)} onCreateTeam={handleCreateTeam} />}
        </>
    );
};

export default CompetitionDetailModal;
