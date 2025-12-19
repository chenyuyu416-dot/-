
import React, { useState, useCallback, useMemo } from 'react';
import { Page, User, Category, Post, SentApplication, Competition, Comment, Chat, Message, TeamRequest, LikeNotification, Badge } from './types';
import { DUMMY_USERS, DUMMY_POSTS, DUMMY_SENT_APPLICATIONS, DUMMY_COMMENTS, DUMMY_CHATS, DUMMY_MESSAGES, DUMMY_TEAM_REQUESTS, DUMMY_LIKE_NOTIFICATIONS, DUMMY_BADGES } from './constants';
import AuthScreen from './screens/AuthScreen';
import HomeScreen from './screens/HomeScreen';
import FeedScreen from './screens/FeedScreen';
import MessagesScreen from './screens/MessagesScreen';
import ProfileScreen from './screens/ProfileScreen';
import PostScreen from './screens/PostScreen';
import BottomNav from './components/BottomNav';
import ChatScreen from './screens/ChatScreen';
import CategoryDetailScreen from './screens/CategoryDetailScreen';
import AIScreen from './screens/AIScreen';
import VideoCallScreen from './screens/VideoCallScreen';
import AIChatScreen from './screens/AIChatScreen';
import SettingsScreen from './screens/SettingsScreen';
import PersonalSpaceScreen from './screens/PersonalSpaceScreen';
import EditTagsModal from './components/EditTagsModal';
import BadgesModal from './components/BadgesModal';
import CertificationModal from './components/CertificationModal';
import PartnerProfileModal from './components/PartnerProfileModal';
import UploadResumeModal from './components/UploadResumeModal';
import SearchScreen from './screens/SearchScreen';
import FeedbackScreen from './screens/FeedbackScreen';
import CompetitionDetailModal from './components/CompetitionDetailModal';
import AIInterviewScreen from './screens/AIInterviewScreen';
import PostDetailModal from './components/PostDetailModal';
import PartnerPostsModal from './components/PartnerPostsModal';
import PartnerPointsScreen from './screens/PartnerPointsScreen';
import BadgeDetailModal from './components/BadgeDetailModal';

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<Page>('home');
    const [currentUser, setCurrentUser] = useState<User>(DUMMY_USERS.currentUser);
    const [posts, setPosts] = useState<Post[]>(DUMMY_POSTS);
    const [sentApplications, setSentApplications] = useState<SentApplication[]>(DUMMY_SENT_APPLICATIONS);
    const [activeChat, setActiveChat] = useState<{ id: string; user: User } | null>(null);
    const [activeCategory, setActiveCategory] = useState<Category | null>(null);
    const [isPosting, setIsPosting] = useState<boolean>(false);
    const [isStudySessionActive, setIsStudySessionActive] = useState<boolean>(false);
    const [isAiScreenOpen, setIsAiScreenOpen] = useState<boolean>(false);
    const [isAIChatOpen, setIsAIChatOpen] = useState<boolean>(false);
    const [isAIInterviewOpen, setIsAIInterviewOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
    const [activePersonalSpaceTab, setActivePersonalSpaceTab] = useState<'posts' | 'partners' | 'following' | 'followers' | 'notifications' | null>(null);
    const [isEditTagsModalOpen, setEditTagsModalOpen] = useState(false);
    const [isBadgesModalOpen, setBadgesModalOpen] = useState(false);
    const [isCertificationModalOpen, setCertificationModalOpen] = useState(false);
    const [isUploadResumeModalOpen, setUploadResumeModalOpen] = useState(false);
    const [partnerProfile, setPartnerProfile] = useState<User | null>(null);
    const [activeCompetition, setActiveCompetition] = useState<Competition | null>(null);
    const [isSearching, setIsSearching] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
    const [appliedIds, setAppliedIds] = useState<Set<string>>(new Set());
    const [appliedTeamIds, setAppliedTeamIds] = useState<Set<string>>(new Set());
    const [likedPostIds, setLikedPostIds] = useState<Set<string>>(new Set());
    const [selectedLocation, setSelectedLocation] = useState<string>(DUMMY_USERS.currentUser.location || '北京');
    const [comments, setComments] = useState<Comment[]>(DUMMY_COMMENTS);
    const [followingIds, setFollowingIds] = useState<Set<string>>(new Set(['user1', 'user3']));
    
    const [chats, setChats] = useState<Chat[]>(DUMMY_CHATS);
    const [messages, setMessages] = useState<Record<string, Message[]>>(DUMMY_MESSAGES);
    const [teamRequests, setTeamRequests] = useState<TeamRequest[]>(DUMMY_TEAM_REQUESTS);
    const [aiChatMessages, setAiChatMessages] = useState<Message[]>([
        { id: 'ai-init', senderId: DUMMY_USERS.user4.id, text: '您好，我是您的AI搭子助手，有什么可以帮助您的吗？无论是学习计划、赛事信息还是简历优化，我都可以提供帮助。', timestamp: '...' },
    ]);
    const [viewingPartnerPosts, setViewingPartnerPosts] = useState<User | null>(null);

    const [activePost, setActivePost] = useState<Post | null>(null);
    const [likeNotifications, setLikeNotifications] = useState<LikeNotification[]>(DUMMY_LIKE_NOTIFICATIONS);
    const [readCommentIds, setReadCommentIds] = useState<Set<string>>(new Set());
    const [readLikeIds, setReadLikeIds] = useState<Set<string>>(new Set());
    const [isPartnerPointsScreenOpen, setIsPartnerPointsScreenOpen] = useState(false);
    const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
    const [resumeFile, setResumeFile] = useState<File | null>(null);
    const [initialPostData, setInitialPostData] = useState<{ categoryId?: string, sceneId?: string }>({});

    const myPostIds = useMemo(() => new Set(posts.filter(p => p.author.id === currentUser.id).map(p => p.id)), [posts, currentUser]);

    const [badges, setBadges] = useState<Badge[]>(() => {
        const myPostCount = DUMMY_POSTS.filter(p => p.author.id === DUMMY_USERS.currentUser.id).length;
        const earnedBadgeIds = new Set(['b2', 'b3']); 
        return DUMMY_BADGES.map(b => ({
            ...b,
            earned: earnedBadgeIds.has(b.id),
            isClaimable: b.id === 'b6' && myPostCount > 0 && !earnedBadgeIds.has(b.id)
        }));
    });

    const initialProgressData = [
        { name: '周一', hours: 4 }, { name: '周二', hours: 3 }, { name: '周三', hours: 5 },
        { name: '周四', hours: 4.5 }, { name: '周五', hours: 6 }, { name: '周六', hours: 8 }, { name: '周日', hours: 2 },
    ];
    const [progressData, setProgressData] = useState(initialProgressData);

    const unreadComments = useMemo(() => comments.filter(c => myPostIds.has(c.postId) && c.author.id !== currentUser.id && !readCommentIds.has(c.id)), [comments, myPostIds, currentUser, readCommentIds]);
    const unreadLikes = useMemo(() => likeNotifications.filter(n => myPostIds.has(n.post.id) && !readLikeIds.has(n.id)), [likeNotifications, myPostIds, readLikeIds]);
    const totalUnreadNotifications = unreadComments.length + unreadLikes.length;
    const unreadMessageCount = useMemo(() => chats.reduce((sum, chat) => sum + chat.unreadCount, 0) + teamRequests.length, [chats, teamRequests]);

    const handleMarkNotificationsRead = useCallback(() => {
        setReadCommentIds(prev => new Set([...prev, ...unreadComments.map(c => c.id)]));
        setReadLikeIds(prev => new Set([...prev, ...unreadLikes.map(l => l.id)]));
    }, [unreadComments, unreadLikes]);

    const handleLogin = useCallback(() => {
        setIsAuthenticated(true);
        setCurrentPage('home');
    }, []);
    
    const handleLogout = useCallback(() => {
        setIsAuthenticated(false);
        setCurrentPage('home');
    }, []);

    const handleNavigate = useCallback((page: Page) => {
        setCurrentPage(page);
    }, []);

    const handleOpenChat = useCallback((chatId: string, user: User) => {
        if (user.id === 'user4') {
            setIsAIChatOpen(true);
        } else {
            setActiveChat({ id: chatId, user });
            setChats(prev => prev.map(c => c.id === chatId ? {...c, unreadCount: 0} : c));
        }
        setPartnerProfile(null);
    }, []);

    const handleCloseChat = useCallback(() => {
        setActiveChat(null);
    }, []);

    const handleOpenCategory = useCallback((category: Category) => {
        setActiveCategory(category);
    }, []);
    
    const handleCloseCategory = useCallback(() => {
        setActiveCategory(null);
    }, []);

    const handleUpdateUser = (updatedInfo: Partial<User>) => {
        const newCurrentUser = { ...currentUser, ...updatedInfo };
        setCurrentUser(newCurrentUser);
        if (updatedInfo.location) {
            setSelectedLocation(updatedInfo.location);
        }
    };

    const handleSaveTags = (newTags: string[]) => {
        setCurrentUser(prev => ({ ...prev, tags: newTags }));
        setEditTagsModalOpen(false);
    };

    const handleAddPost = (post: Post) => {
        setPosts(prev => [post, ...prev]);
        setIsPosting(false);
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setIsSearching(true);
    };

    const handleApply = useCallback((id: string) => {
        setAppliedIds(prev => new Set(prev).add(id));
    }, []);
    
    const handleApplyToTeam = useCallback((teamId: string) => {
        setAppliedTeamIds(prev => new Set(prev).add(teamId));
        alert('发送申请成功！');
    }, []);

    const handleSendApplication = (post: Post) => {
        const newApplication: SentApplication = {
            id: `sa${Date.now()}`,
            postTitle: post.title,
            recipient: post.author,
            status: 'pending',
            timestamp: '刚刚',
        };
        setSentApplications(prev => [newApplication, ...prev]);
        handleApply(post.id);
        alert('发送申请成功！');
    };

    const handleToggleLike = useCallback((postId: string) => {
        const newLikedPostIds = new Set(likedPostIds);
        let likeIncrement = 0;

        if (newLikedPostIds.has(postId)) {
            newLikedPostIds.delete(postId);
            likeIncrement = -1;
        } else {
            newLikedPostIds.add(postId);
            likeIncrement = 1;
        }
        setLikedPostIds(newLikedPostIds);

        setPosts(prevPosts => 
            prevPosts.map(p => 
                p.id === postId ? { ...p, likes: p.likes + likeIncrement } : p
            )
        );
    }, [likedPostIds]);
    
    const handleLocationChange = useCallback((newLocation: string) => {
        setSelectedLocation(newLocation);
    }, []);

    const handleAddComment = useCallback((postId: string, text: string) => {
        const newComment: Comment = {
            id: `c${Date.now()}`,
            postId: postId,
            author: currentUser,
            text: text,
            timestamp: '刚刚',
        };
        setComments(prev => [...prev, newComment]);
    }, [currentUser]);

    const handleToggleFollow = useCallback((userId: string) => {
        setFollowingIds(prev => {
            const newSet = new Set(prev);
            if (newSet.has(userId)) {
                newSet.delete(userId);
            } else {
                newSet.add(userId);
            }
            return newSet;
        });
    }, []);

    const handleSendMessage = useCallback((chatId: string, text: string) => {
        const newMessage: Message = {
            id: `m${Date.now()}`,
            senderId: DUMMY_USERS.currentUser.id,
            text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type: 'text'
        };
        setMessages(prev => ({
            ...prev,
            [chatId]: [...(prev[chatId] || []), newMessage],
        }));
    
        setChats(prevChats => prevChats.map(chat =>
            chat.id === chatId ? { ...chat, lastMessage: text, timestamp: newMessage.timestamp } : chat
        ).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
    }, []);

    const handleRequestDecision = useCallback((reqId: string, accepted: boolean) => {
        const request = teamRequests.find(r => r.id === reqId);
        if (!request) return;
    
        setTeamRequests(prev => prev.filter(req => req.id !== reqId));
    
        if (accepted) {
            const newChatId = `chat_group_${Date.now()}`;
            const newGroupUser: User = {
                id: `group_${request.teamName.replace(/\s/g, '_')}`,
                name: request.teamName,
                avatar: `https://picsum.photos/seed/${newChatId}/100/100`, 
            };
            const newChat: Chat = {
                id: newChatId,
                user: newGroupUser,
                lastMessage: '小组已创建，开始聊天吧！',
                timestamp: '刚刚',
                unreadCount: 1,
            };
            setChats(prev => [newChat, ...prev]);
    
            const initialMessage: Message = {
                id: `msg_init_${Date.now()}`,
                senderId: DUMMY_USERS.dada_assistant.id,
                text: `你已加入小组 "${request.teamName}"`,
                timestamp: '刚刚',
            };
            setMessages(prev => ({
                ...prev,
                [newChatId]: [initialMessage],
            }));
        }
        alert(accepted ? `已同意 ${request.user.name} 的申请！` : `已拒绝 ${request.user.name} 的申请。`);
    }, [teamRequests]);

    const handleUpdateProgress = useCallback((timeSpentInHours: number) => {
        const today = new Date();
        const dayIndex = (today.getDay() + 6) % 7;
        setProgressData(currentData => {
            const newData = [...currentData];
            const currentDayData = { ...newData[dayIndex] };
            currentDayData.hours += timeSpentInHours;
            newData[dayIndex] = currentDayData;
            return newData;
        });
    }, []);
    
    const handleEndStudySession = useCallback((durationInSeconds: number) => {
        setIsStudySessionActive(false);
        const durationInHours = durationInSeconds / 3600;
        handleUpdateProgress(durationInHours);
        const minutes = Math.floor(durationInSeconds / 60);
        const seconds = durationInSeconds % 60;
        alert(`自习结束！\n本次自习时长: ${minutes}分钟 ${seconds}秒\n已计入学习进度。`);
    }, [handleUpdateProgress]);

    const handleSendStudyInvite = useCallback((chatId: string) => {
        const newInvite: Message = {
            id: `m${Date.now()}`,
            senderId: currentUser.id,
            text: `${currentUser.name} 发起了线上自习邀请`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type: 'study_invite',
            inviteStatus: 'pending'
        };
        setMessages(prev => ({
            ...prev,
            [chatId]: [...(prev[chatId] || []), newInvite],
        }));
    }, [currentUser]);

    const handleAcceptStudyInvite = useCallback((chatId: string, messageId: string) => {
        setMessages(prev => {
            const newChatMessages = (prev[chatId] || []).map(msg =>
                msg.id === messageId ? { ...msg, inviteStatus: 'accepted' as const } : msg
            );
            return { ...prev, [chatId]: newChatMessages };
        });
        setIsStudySessionActive(true);
    }, []);

    const handleCancelStudyInvite = useCallback((chatId: string, messageId: string) => {
        setMessages(prev => {
            const newChatMessages = (prev[chatId] || []).map(msg =>
                msg.id === messageId ? { ...msg, inviteStatus: 'cancelled' as const, text: '邀请已取消' } : msg
            );
            return { ...prev, [chatId]: newChatMessages };
        });
    }, []);

    const handleClearChatHistory = useCallback((chatId: string) => {
        setMessages(prev => ({ ...prev, [chatId]: [] }));
        setChats(prev => prev.map(c => c.id === chatId ? { ...c, lastMessage: '聊天记录已清空' } : c));
        alert('聊天记录已清空');
    }, []);

    const handleDeleteChat = useCallback((chatId: string) => {
        setChats(prev => prev.filter(c => c.id !== chatId));
        setMessages(prev => {
            const newMessages = { ...prev };
            delete newMessages[chatId];
            return newMessages;
        });
        handleCloseChat();
    }, [handleCloseChat]);
    
    const handleViewPartnerPosts = useCallback((user: User) => {
        setViewingPartnerPosts(user);
    }, []);

    const handleQuickPost = useCallback((categoryId: string, sceneId: string) => {
        setInitialPostData({ categoryId, sceneId });
        setIsPosting(true);
    }, []);

    const handleClaimBadge = (badgeId: string) => {
        const badgeToClaim = badges.find(b => b.id === badgeId);
        if (!badgeToClaim || !badgeToClaim.isClaimable) return;

        setBadges(prevBadges => prevBadges.map(b => 
            b.id === badgeId ? { ...b, earned: true, isClaimable: false } : b
        ));
        
        const pointsEarned = 20; // Example points
        setCurrentUser(prevUser => ({
            ...prevUser,
            partnerPoints: (prevUser.partnerPoints || 0) + pointsEarned
        }));

        alert(`恭喜！您已获得 "${badgeToClaim.label}" 勋章，并获得 ${pointsEarned} 搭力值！`);
        setSelectedBadge(null);
    };

    const handleCertificationUpload = useCallback((studentIdFile: File | null, skillFile: File | null) => {
        const updates: Partial<User> = {};
        if (studentIdFile) {
            updates.studentCertificationStatus = 'pending';
        }
        if (skillFile) {
            updates.skillCertificationStatus = 'pending';
        }
        if (Object.keys(updates).length > 0) {
            setCurrentUser(prev => ({...prev, ...updates}));
            alert('认证材料已提交，请等待审核。');
        }
        setCertificationModalOpen(false);
    }, []);

    const handleSchoolChangeRequest = useCallback((newSchool: string, studentIdFile: File) => {
        alert(`学校变更为 "${newSchool}" 的申请已提交审核。`);
    }, []);

    const handleViewPartnerProfile = (user: User) => {
        setPartnerProfile(user);
    };

    const renderModals = () => (
        <>
            {isEditTagsModalOpen && <EditTagsModal tags={currentUser.tags || []} onSave={handleSaveTags} onClose={() => setEditTagsModalOpen(false)} />}
            {isBadgesModalOpen && <BadgesModal badges={badges} onClose={() => setBadgesModalOpen(false)} onSelectBadge={setSelectedBadge} />}
            {selectedBadge && <BadgeDetailModal badge={selectedBadge} onClose={() => setSelectedBadge(null)} onClaim={handleClaimBadge} />}
            {isCertificationModalOpen && <CertificationModal user={currentUser} onClose={() => setCertificationModalOpen(false)} onUpload={handleCertificationUpload} />}
            {partnerProfile && <PartnerProfileModal user={partnerProfile} onClose={() => setPartnerProfile(null)} onStartChat={(user) => {
                const chat = chats.find(c => c.user.id === user.id);
                if (chat) handleOpenChat(chat.id, user);
                else {
                    // Create new chat if not exists
                    const newChatId = `chat_${user.id}`;
                    const newChat = { id: newChatId, user: user, lastMessage: '开始聊天吧！', timestamp: '刚刚', unreadCount: 0 };
                    setChats(prev => [newChat, ...prev]);
                    handleOpenChat(newChatId, user);
                }
            }} />}
            {isUploadResumeModalOpen && <UploadResumeModal onClose={() => setUploadResumeModalOpen(false)} resumeFile={resumeFile} onFileChange={setResumeFile} />}
            {activeCompetition && <CompetitionDetailModal competition={activeCompetition} onClose={() => setActiveCompetition(null)} appliedTeamIds={appliedTeamIds} onApplyToTeam={handleApplyToTeam} />}
        </>
    );

    const renderContent = () => {
        if (activeChat) {
            return <ChatScreen 
                        chatId={activeChat.id}
                        user={activeChat.user}
                        messages={messages[activeChat.id] || []}
                        onSendMessage={handleSendMessage}
                        onBack={handleCloseChat}
                        onSendStudyInvite={handleSendStudyInvite}
                        onAcceptStudyInvite={handleAcceptStudyInvite}
                        onCancelStudyInvite={handleCancelStudyInvite}
                        onClearChatHistory={handleClearChatHistory}
                        onDeleteChat={handleDeleteChat}
                        onViewPartnerPosts={handleViewPartnerPosts}
                    />;
        }
        if (isAIChatOpen) {
            return <AIChatScreen 
                onBack={() => setIsAIChatOpen(false)} 
                messages={aiChatMessages}
                setMessages={setAiChatMessages}
            />;
        }
        if (isAIInterviewOpen) {
            return <AIInterviewScreen onBack={() => setIsAIInterviewOpen(false)} />;
        }
        if (activeCategory) {
            return <CategoryDetailScreen 
                        category={activeCategory} 
                        onBack={handleCloseCategory} 
                        onSendApplication={handleSendApplication}
                        appliedIds={appliedIds}
                        onApply={handleApply}
                        onStartAIInterview={() => setIsAIInterviewOpen(true)}
                        onCompetitionSelect={setActiveCompetition}
                        selectedLocation={selectedLocation}
                    />;
        }
        if (isAiScreenOpen) {
            return <AIScreen onBack={() => setIsAiScreenOpen(false)} data={progressData} onUpdateProgress={handleUpdateProgress}/>;
        }
        if (isSettingsOpen) {
            return <SettingsScreen user={currentUser} onBack={() => setIsSettingsOpen(false)} onSave={handleUpdateUser} onSchoolChangeRequest={handleSchoolChangeRequest} />;
        }
        if (isPartnerPointsScreenOpen) {
            return <PartnerPointsScreen user={currentUser} onBack={() => setIsPartnerPointsScreenOpen(false)} />;
        }
        if (activePersonalSpaceTab) {
            return <PersonalSpaceScreen
                        user={currentUser}
                        posts={posts}
                        comments={comments}
                        likeNotifications={likeNotifications}
                        readCommentIds={readCommentIds}
                        readLikeIds={readLikeIds}
                        followingIds={followingIds}
                        initialTab={activePersonalSpaceTab} 
                        onBack={() => setActivePersonalSpaceTab(null)} 
                        onPostSelect={setActivePost}
                        onMarkNotificationsRead={handleMarkNotificationsRead}
                        onUserClick={handleViewPartnerProfile}
                        likedPostIds={likedPostIds}
                        onToggleLike={handleToggleLike}
                        onToggleFollow={handleToggleFollow}
                        onAddComment={handleAddComment}
                    />
        }
        if (isSearching) {
            return <SearchScreen 
                        query={searchQuery} 
                        onBack={() => setIsSearching(false)}
                        likedPostIds={likedPostIds}
                        onToggleLike={handleToggleLike}
                        selectedLocation={selectedLocation}
                        comments={comments}
                        onAddComment={handleAddComment}
                        onPostSelect={setActivePost}
                    />;
        }
        if (isFeedbackOpen) {
            return <FeedbackScreen onBack={() => setIsFeedbackOpen(false)} />;
        }

        switch (currentPage) {
            case 'home':
                return <HomeScreen 
                            user={currentUser} 
                            onCategorySelect={handleOpenCategory} 
                            onAiButtonClick={() => setIsAiScreenOpen(true)} 
                            onSearch={handleSearch} 
                            onCompetitionSelect={setActiveCompetition}
                            selectedLocation={selectedLocation}
                            onLocationChange={handleLocationChange}
                            onQuickPost={handleQuickPost}
                        />;
            case 'feed':
                return <FeedScreen 
                            posts={posts}
                            comments={comments}
                            onPostCreate={() => setIsPosting(true)}
                            likedPostIds={likedPostIds}
                            onToggleLike={handleToggleLike} 
                            selectedLocation={selectedLocation}
                            followingIds={followingIds}
                            onToggleFollow={handleToggleFollow}
                            onAddComment={handleAddComment}
                            onOpenPersonalSpace={() => setActivePersonalSpaceTab('posts')}
                            onPostSelect={setActivePost}
                            unreadNotificationCount={totalUnreadNotifications}
                            onAuthorClick={handleViewPartnerProfile}
                        />;
            case 'messages':
                return <MessagesScreen 
                            chats={chats}
                            teamRequests={teamRequests}
                            onChatSelect={handleOpenChat} 
                            sentApplications={sentApplications} 
                            onRequestDecision={handleRequestDecision}
                        />;
            case 'profile':
                return <ProfileScreen 
                    user={currentUser}
                    posts={posts}
                    followingCount={followingIds.size}
                    onLogout={handleLogout} 
                    onSettingsClick={() => setIsSettingsOpen(true)}
                    onMyStuffClick={(tab) => setActivePersonalSpaceTab(tab)}
                    onEditTagsClick={() => setEditTagsModalOpen(true)}
                    onBadgesClick={() => setBadgesModalOpen(true)}
                    onCertificationClick={() => setCertificationModalOpen(true)}
                    onUploadResumeClick={() => setUploadResumeModalOpen(true)}
                    onFeedbackClick={() => setIsFeedbackOpen(true)}
                    onPartnerPointsClick={() => setIsPartnerPointsScreenOpen(true)}
                />;
            default:
                return <HomeScreen 
                            user={currentUser} 
                            onCategorySelect={handleOpenCategory} 
                            onAiButtonClick={() => setIsAiScreenOpen(true)} 
                            onSearch={handleSearch} 
                            onCompetitionSelect={setActiveCompetition}
                            selectedLocation={selectedLocation}
                            onLocationChange={handleLocationChange}
                            onQuickPost={handleQuickPost}
                        />;
        }
    };

    if (!isAuthenticated) {
        return <AuthScreen onLogin={handleLogin} />;
    }

    if (isStudySessionActive) {
        return <VideoCallScreen onEndSession={handleEndStudySession} />;
    }
    
    return (
        <div className="w-full h-screen max-w-md mx-auto bg-gray-50 font-sans flex flex-col">
            <main className="flex-1 overflow-y-auto pb-20">
                {renderContent()}
            </main>
            {activePost && (
                <PostDetailModal 
                    post={activePost}
                    comments={comments.filter(c => c.postId === activePost.id)}
                    onAddComment={handleAddComment}
                    onClose={() => setActivePost(null)} 
                    isLiked={likedPostIds.has(activePost.id)}
                    onToggleLike={() => handleToggleLike(activePost.id)}
                    onAuthorClick={(user) => {
                        setActivePost(null);
                        handleViewPartnerProfile(user);
                    }}
                />
            )}
            {viewingPartnerPosts && (
                <PartnerPostsModal
                    user={viewingPartnerPosts}
                    posts={posts}
                    comments={comments}
                    onClose={() => setViewingPartnerPosts(null)}
                    onPostSelect={(post) => {
                        setViewingPartnerPosts(null);
                        setActivePost(post);
                    }}
                />
            )}
            {renderModals()}
            <PostScreen 
                isOpen={isPosting} 
                onClose={() => {
                    setIsPosting(false);
                    setInitialPostData({});
                }} 
                onAddPost={handleAddPost}
                initialCategoryId={initialPostData.categoryId}
                initialSceneId={initialPostData.sceneId}
            />
            <BottomNav 
                currentPage={currentPage} 
                onNavigate={handleNavigate} 
                onPost={() => setIsPosting(true)} 
                unreadMessageCount={unreadMessageCount}
            />
        </div>
    );
};

export default App;
