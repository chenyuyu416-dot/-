
import type { ComponentType } from 'react';

export type Page = 'home' | 'feed' | 'messages' | 'profile';

export interface User {
  id: string;
  name: string;
  avatar: string;
  school?: string;
  major?: string;
  grade?: string;
  location?: string;
  tags?: string[];
  preferences?: string[];
  partnerPoints?: number;
}

export interface Message {
  id:string;
  senderId: string;
  text: string;
  timestamp: string;
  type?: 'text' | 'study_invite';
  inviteStatus?: 'pending' | 'accepted' | 'cancelled';
}

export interface Chat {
  id: string;
  user: User;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
}

export interface Category {
  id: string;
  title: string;
  icon: ComponentType<{ className?: string }>;
  color: string;
  scenes: Scene[];
}

export interface Scene {
    id: string;
    name: string;
    description: string;
}

export interface Post {
    id: string;
    author: User;
    category: string;
    sceneId?: string;
    title: string;
    content: string;
    tags: string[];
    timestamp: string;
    likes: number;
    comments: number;
    image?: string;
}

export interface Competition {
    id: string;
    sceneId?: string;
    name: string;
    category: string;
    deadline: string;
    participants: string;
    details: string;
    timePlan: string;
    submissionRequirements: string;
    teamRequirements: string;
    creationGuidelines: string;
    process: string;
}

export interface Job {
    id: string;
    sceneId?: string;
    title: string;
    company: string;
    location: string;
    type: '远程' | '线下';
    salary: string;
    deadline: string;
}

export interface VolunteerActivity {
    id: string;
    sceneId?: string;
    title: string;
    organization: string;
    location: string;
    time: string;
    required: number;
    certification: boolean;
}

export interface Comment {
    id: string;
    postId: string;
    author: User;
    text: string;
    timestamp: string;
}

export interface Team {
    id: string;
    competitionId: string;
    name: string;
    leader: User;
    members: User[];
    lookingFor: string;
}

export interface TeamRequest {
    id: string;
    user: User;
    teamName: string;
    message: string;
}

export interface SentApplication {
    id: string;
    postTitle: string;
    recipient: User;
    status: 'pending' | 'accepted' | 'rejected';
    timestamp: string;
}

export interface AITask {
    id: number;
    text: string;
    completed: boolean;
    timeSpent: number | null; // in hours
}

export interface LikeNotification {
    id: string;
    user: User;
    post: Post;
    timestamp: string;
}

export interface Badge {
    id: string;
    label: string;
    icon: ComponentType<{ className?: string }>;
    color: string;
    earned: boolean;
    description: string;
    isClaimable: boolean; 
}
