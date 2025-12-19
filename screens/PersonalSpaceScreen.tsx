
import React, { useState, useEffect } from 'react';
import { ChevronLeft, MessageSquare, Heart } from '../components/Icons';
import { DUMMY_USERS } from '../constants';
import { Post as PostType, User, Comment, LikeNotification } from '../types';

interface PersonalSpaceScreenProps {
  user: User;
  posts: PostType[];
  comments: Comment[];
  likeNotifications: LikeNotification[];
  readCommentIds: Set<string>;
  readLikeIds: Set<string>;
  followingIds: Set<string>;
  initialTab: 'posts' | 'partners' | 'following' | 'followers' | 'notifications';
  onBack: () => void;
  onPostSelect: (post: PostType) => void;
  onPartnerClick: (user: User) => void;
  likedPostIds: Set<string>;
  onToggleLike: (postId: string) => void;
  onToggleFollow: (userId: string) => void;
  onAddComment: (postId: string, text: string) => void;
  onMarkNotificationsRead: () => void;
}

type Tab = 'posts' | 'partners' | 'following' | 'followers' | 'notifications';
type NotificationTab = 'comments' | 'likes';

const PostItem: React.FC<{post: PostType, onClick: () => void, commentCount: number}> = ({post, onClick, commentCount}) => (
    <button onClick={onClick} className="w-full text-left bg-white p-3 rounded-lg shadow-sm hover:bg-gray-50">
        <p className="font-semibold truncate">{post.title}</p>
        <div className="flex justify-between items-center mt-2 text-xs text-gray-400">
            <span>{post.timestamp}</span>
            <span>{post.likes} 赞 · {commentCount} 评论</span>
        </div>
    </button>
);

const UserItem: React.FC<{user: User, isFollowing?: boolean, onToggleFollow: () => void, onClick: () => void}> = ({user, isFollowing, onToggleFollow, onClick}) => (
    <div className="w-full text-left bg-white p-3 rounded-lg shadow-sm flex items-center justify-between hover:bg-gray-50">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={onClick}>
            <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full"/>
            <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-500">{user.school}</p>
            </div>
        </div>
        {isFollowing !== undefined &&
            <button onClick={(e) => { e.stopPropagation(); onToggleFollow(); }} className={`px-3 py-1 text-xs rounded-full font-semibold ${isFollowing ? 'bg-gray-200 text-gray-700' : 'bg-indigo-100 text-indigo-600'}`}>
                {isFollowing ? '已关注' : '回关'}
            </button>
        }
    </div>
);

const CommentNotificationItem: React.FC<{comment: Comment, postTitle: string, onClick: () => void, isRead: boolean}> = ({comment, postTitle, onClick, isRead}) => (
    <button onClick={onClick} className="w-full text-left bg-white p-3 rounded-lg shadow-sm hover:bg-gray-50 relative">
        {!isRead && <span className="absolute top-3 right-3 block h-2 w-2 rounded-full bg-red-500"></span>}
        <div className="flex items-center space-x-3">
            <img src={comment.author.avatar} alt={comment.author.name} className="w-10 h-10 rounded-full"/>
            <div>
                 <p className="text-sm"><span className="font-semibold">{comment.author.name}</span> 评论了你的动态 <span className="font-semibold text-indigo-600">"{postTitle}"</span></p>
                <p className="text-sm text-gray-700 bg-gray-100 p-2 mt-1 rounded-md">{comment.text}</p>
                <p className="text-xs text-gray-400 mt-1">{comment.timestamp}</p>
            </div>
        </div>
    </button>
);

const LikeNotificationItem: React.FC<{ notification: LikeNotification, onClick: () => void, isRead: boolean }> = ({ notification, onClick, isRead }) => (
    <button onClick={onClick} className="w-full text-left bg-white p-3 rounded-lg shadow-sm hover:bg-gray-50 relative">
         {!isRead && <span className="absolute top-3 right-3 block h-2 w-2 rounded-full bg-red-500"></span>}
        <div className="flex items-center space-x-3">
            <div className="relative">
                <img src={notification.user.avatar} alt={notification.user.name} className="w-10 h-10 rounded-full"/>
                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                    <Heart className="w-4 h-4 text-red-500 fill-current" />
                </div>
            </div>
            <div>
                 <p className="text-sm"><span className="font-semibold">{notification.user.name}</span> 赞了你的动态</p>
                 <p className="text-sm text-gray-500 truncate">"{notification.post.title}"</p>
                <p className="text-xs text-gray-400 mt-1">{notification.timestamp}</p>
            </div>
        </div>
    </button>
);


const PersonalSpaceScreen: React.FC<PersonalSpaceScreenProps> = ({ user, posts, comments, likeNotifications, readCommentIds, readLikeIds, followingIds, initialTab, onBack, onPostSelect, onPartnerClick, onToggleFollow, onMarkNotificationsRead }) => {
    const [activeTab, setActiveTab] = useState<Tab>(initialTab);
    const [activeNotificationTab, setActiveNotificationTab] = useState<NotificationTab>('comments');

    const myPosts = posts.filter(p => p.author.id === user.id);
    const myPartners = [DUMMY_USERS.user1, DUMMY_USERS.user2, DUMMY_USERS.user3, DUMMY_USERS.user5];
    const followingUsers = Array.from(followingIds).map(id => Object.values(DUMMY_USERS).find(u => u.id === id)).filter((u): u is User => !!u);
    const followerUsers = [DUMMY_USERS.user2, DUMMY_USERS.user5];
    
    const commentNotifications = comments
        .filter(c => myPosts.some(p => p.id === c.postId) && c.author.id !== user.id)
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    const sortedLikeNotifications = [...likeNotifications].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    const totalLikes = myPosts.reduce((sum, p) => sum + p.likes, 0);

    useEffect(() => {
        if (activeTab === 'notifications') {
            onMarkNotificationsRead();
        }
    }, [activeTab, onMarkNotificationsRead]);

    const renderContent = () => {
        switch(activeTab) {
            case 'posts':
                return myPosts.map(post => {
                    const commentCount = comments.filter(c => c.postId === post.id).length;
                    return <PostItem key={post.id} post={post} onClick={() => onPostSelect(post)} commentCount={commentCount} />
                });
            case 'partners':
                return myPartners.map(partner => <UserItem key={partner.id} user={partner} isFollowing={followingIds.has(partner.id)} onToggleFollow={() => onToggleFollow(partner.id)} onClick={() => onPartnerClick(partner)} />);
            case 'following':
                return followingUsers.map(followedUser => <UserItem key={followedUser.id} user={followedUser} isFollowing={true} onToggleFollow={() => onToggleFollow(followedUser.id)} onClick={() => onPartnerClick(followedUser)} />);
            case 'followers':
                 return followerUsers.map(follower => <UserItem key={follower.id} user={follower} isFollowing={followingIds.has(follower.id)} onToggleFollow={() => onToggleFollow(follower.id)} onClick={() => onPartnerClick(follower)} />);
            case 'notifications':
                 return (
                    <div>
                        <div className="flex bg-gray-200 rounded-md p-1 mb-4">
                             <button onClick={() => setActiveNotificationTab('comments')} className={`flex-1 text-sm font-semibold p-1.5 rounded-md ${activeNotificationTab === 'comments' ? 'bg-white shadow-sm' : ''}`}>评论</button>
                             <button onClick={() => setActiveNotificationTab('likes')} className={`flex-1 text-sm font-semibold p-1.5 rounded-md ${activeNotificationTab === 'likes' ? 'bg-white shadow-sm' : ''}`}>获赞</button>
                        </div>
                        {activeNotificationTab === 'comments' ? (
                            commentNotifications.map(comment => {
                                const post = myPosts.find(p => p.id === comment.postId);
                                return <CommentNotificationItem key={comment.id} comment={comment} postTitle={post?.title || ''} onClick={() => post && onPostSelect(post)} isRead={readCommentIds.has(comment.id)} />;
                            })
                        ) : (
                            sortedLikeNotifications.map(notification => (
                                <LikeNotificationItem key={notification.id} notification={notification} onClick={() => onPostSelect(notification.post)} isRead={readLikeIds.has(notification.id)}/>
                            ))
                        )}
                    </div>
                );
        }
    };
    
    const TABS: Tab[] = ['posts', 'partners', 'following', 'followers', 'notifications'];
    const TAB_NAMES: Record<Tab, string> = {
        posts: '动态',
        partners: '搭子',
        following: '关注',
        followers: '粉丝',
        notifications: '消息',
    };

  return (
    <div className="flex flex-col h-full bg-gray-100">
      <header className="sticky top-0 flex items-center p-3 bg-white/80 backdrop-blur-lg z-10 shadow-sm">
        <button onClick={onBack} className="text-gray-600 mr-3">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-bold text-gray-800">我的空间</h2>
      </header>
      
      <div className="p-4 bg-white border-b">
        <div className="flex items-center">
            <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full mr-4"/>
            <div>
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-sm text-gray-500">{user.school}</p>
            </div>
        </div>
        <div className="flex justify-around text-center mt-4">
            <div className="p-1">
                <p className="font-bold">{myPosts.length}</p>
                <p className="text-sm text-gray-500">动态</p>
            </div>
             <div className="p-1">
                <p className="font-bold">{followingIds.size}</p>
                <p className="text-sm text-gray-500">关注</p>
            </div>
             <div className="p-1">
                <p className="font-bold">{followerUsers.length}</p>
                <p className="text-sm text-gray-500">粉丝</p>
            </div>
             <div className="p-1">
                <p className="font-bold">{totalLikes}</p>
                <p className="text-sm text-gray-500">获赞</p>
            </div>
        </div>
      </div>

       <div className="flex bg-white shadow-sm overflow-x-auto">
           {TABS.map(tab => (
               <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 p-3 text-sm font-semibold text-center whitespace-nowrap transition-colors border-b-2 ${activeTab === tab ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500'}`}
               >
                   {TAB_NAMES[tab]}
               </button>
           ))}
        </div>

      <main className="flex-1 overflow-y-auto p-4 space-y-3">
        {renderContent()}
      </main>
    </div>
  );
};

export default PersonalSpaceScreen;