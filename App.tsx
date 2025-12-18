
import React, { useState, useCallback } from 'react';
import { Page, User, Category } from './types';
import { DUMMY_USERS } from './constants';
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
import MyStuffScreen from './screens/MyStuffScreen';
import EditTagsModal from './components/EditTagsModal';
import BadgesModal from './components/BadgesModal';
import CertificationModal from './components/CertificationModal';
import PartnerProfileModal from './components/PartnerProfileModal';
import UploadResumeModal from './components/UploadResumeModal';

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<Page>('home');
    const [currentUser, setCurrentUser] = useState<User>(DUMMY_USERS.currentUser);
    const [activeChat, setActiveChat] = useState<User | null>(null);
    const [activeCategory, setActiveCategory] = useState<Category | null>(null);
    const [isPosting, setIsPosting] = useState<boolean>(false);
    const [isCalling, setIsCalling] = useState<boolean>(false);
    const [isAiScreenOpen, setIsAiScreenOpen] = useState<boolean>(false);
    const [isAIChatOpen, setIsAIChatOpen] = useState<boolean>(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
    const [activeMyStuff, setActiveMyStuff] = useState<'posts' | 'partners' | null>(null);
    const [isEditTagsModalOpen, setEditTagsModalOpen] = useState(false);
    const [isBadgesModalOpen, setBadgesModalOpen] = useState(false);
    const [isCertificationModalOpen, setCertificationModalOpen] = useState(false);
    const [isUploadResumeModalOpen, setUploadResumeModalOpen] = useState(false);
    const [partnerProfile, setPartnerProfile] = useState<User | null>(null);

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

    const handleOpenChat = useCallback((user: User) => {
        if (user.id === 'user4') {
            setIsAIChatOpen(true);
        } else {
            setActiveChat(user);
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

    const handleStartCall = useCallback(() => {
        setIsCalling(true);
    }, []);
    
    const handleEndCall = useCallback(() => {
        setIsCalling(false);
    }, []);

    const handleUpdateUser = (updatedInfo: Partial<User>) => {
        setCurrentUser(prev => ({ ...prev, ...updatedInfo }));
        alert("信息已保存！");
    };

    const handleSaveTags = (newTags: string[]) => {
        setCurrentUser(prev => ({ ...prev, tags: newTags }));
        setEditTagsModalOpen(false);
    };

    const renderModals = () => (
        <>
            {isEditTagsModalOpen && <EditTagsModal tags={currentUser.tags || []} onSave={handleSaveTags} onClose={() => setEditTagsModalOpen(false)} />}
            {isBadgesModalOpen && <BadgesModal onClose={() => setBadgesModalOpen(false)} />}
            {isCertificationModalOpen && <CertificationModal onClose={() => setCertificationModalOpen(false)} />}
            {partnerProfile && <PartnerProfileModal user={partnerProfile} onClose={() => setPartnerProfile(null)} onStartChat={handleOpenChat} />}
            {isUploadResumeModalOpen && <UploadResumeModal onClose={() => setUploadResumeModalOpen(false)} />}
        </>
    );

    const renderContent = () => {
        if (activeChat) {
            return <ChatScreen user={activeChat} onBack={handleCloseChat} onStartCall={handleStartCall} />;
        }
        if (isAIChatOpen) {
            return <AIChatScreen onBack={() => setIsAIChatOpen(false)} />;
        }
        if (activeCategory) {
            return <CategoryDetailScreen category={activeCategory} onBack={handleCloseCategory} onStartCall={handleStartCall} />;
        }
        if (isAiScreenOpen) {
            return <AIScreen onBack={() => setIsAiScreenOpen(false)} />;
        }
        if (isSettingsOpen) {
            return <SettingsScreen user={currentUser} onBack={() => setIsSettingsOpen(false)} onSave={handleUpdateUser} />;
        }
        if (activeMyStuff) {
            return <MyStuffScreen view={activeMyStuff} onBack={() => setActiveMyStuff(null)} onPartnerClick={setPartnerProfile} />
        }

        switch (currentPage) {
            case 'home':
                return <HomeScreen user={currentUser} onCategorySelect={handleOpenCategory} onAiButtonClick={() => setIsAiScreenOpen(true)} />;
            case 'feed':
                return <FeedScreen onPostCreate={() => setIsPosting(true)} />;
            case 'messages':
                return <MessagesScreen onChatSelect={handleOpenChat} />;
            case 'profile':
                return <ProfileScreen 
                    user={currentUser}
                    onLogout={handleLogout} 
                    onSettingsClick={() => setIsSettingsOpen(true)}
                    onMyStuffClick={(view) => setActiveMyStuff(view)}
                    onEditTagsClick={() => setEditTagsModalOpen(true)}
                    onBadgesClick={() => setBadgesModalOpen(true)}
                    onCertificationClick={() => setCertificationModalOpen(true)}
                    onUploadResumeClick={() => setUploadResumeModalOpen(true)}
                />;
            default:
                return <HomeScreen user={currentUser} onCategorySelect={handleOpenCategory} onAiButtonClick={() => setIsAiScreenOpen(true)} />;
        }
    };

    if (!isAuthenticated) {
        return <AuthScreen onLogin={handleLogin} />;
    }

    if (isCalling) {
        return <VideoCallScreen onEndCall={handleEndCall} />;
    }
    
    return (
        <div className="w-full h-screen max-w-md mx-auto bg-gray-50 font-sans flex flex-col">
            <main className="flex-1 overflow-y-auto pb-20">
                {renderContent()}
            </main>
            {renderModals()}
            <PostScreen isOpen={isPosting} onClose={() => setIsPosting(false)} />
            <BottomNav 
                currentPage={currentPage} 
                onNavigate={handleNavigate} 
                onPost={() => setIsPosting(true)} 
            />
        </div>
    );
};

export default App;
