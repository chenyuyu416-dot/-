
import React, { useState } from 'react';
import { ChevronLeft } from '../components/Icons';
import { DUMMY_POSTS, DUMMY_USERS } from '../constants';
import { Post as PostType, User } from '../types';
import PostDetailModal from '../components/PostDetailModal';

interface MyStuffScreenProps {
  view: 'posts' | 'partners';
  onBack: () => void;
  onPartnerClick: (user: User) => void;
}

const PostItem: React.FC<{post: PostType, onClick: () => void}> = ({post, onClick}) => (
    <button onClick={onClick} className="w-full text-left bg-white p-3 rounded-lg shadow-sm hover:bg-gray-50">
        <p className="font-semibold truncate">{post.title}</p>
        <div className="flex justify-between items-center mt-2 text-xs text-gray-400">
            <span>{post.timestamp}</span>
            <span>{post.likes} 赞 · {post.comments} 评论</span>
        </div>
    </button>
);

const PartnerItem: React.FC<{user: User, onClick: () => void}> = ({user, onClick}) => (
    <button onClick={onClick} className="w-full text-left bg-white p-3 rounded-lg shadow-sm flex items-center space-x-3 hover:bg-gray-50">
        <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full"/>
        <div>
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-gray-500">{user.school}</p>
        </div>
    </button>
);

const MyStuffScreen: React.FC<MyStuffScreenProps> = ({ view, onBack, onPartnerClick }) => {
    const title = view === 'posts' ? '我的动态' : '我的搭子';
    const myPosts = DUMMY_POSTS.filter(p => p.author.id === DUMMY_USERS.currentUser.id);
    const myPartners = [DUMMY_USERS.user1, DUMMY_USERS.user2, DUMMY_USERS.user3, DUMMY_USERS.user5];
    const [activePost, setActivePost] = useState<PostType | null>(null);

  return (
    <>
    <div className="flex flex-col h-full bg-gray-100">
      <header className="sticky top-0 flex items-center p-3 bg-white/80 backdrop-blur-lg z-10 shadow-sm">
        <button onClick={onBack} className="text-gray-600 mr-3">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-bold text-gray-800">{title}</h2>
      </header>
      <main className="flex-1 overflow-y-auto p-4 space-y-3">
        {view === 'posts' ? (
            myPosts.map(post => <PostItem key={post.id} post={post} onClick={() => setActivePost(post)} />)
        ) : (
            myPartners.map(partner => <PartnerItem key={partner.id} user={partner} onClick={() => onPartnerClick(partner)} />)
        )}
      </main>
    </div>
    {activePost && <PostDetailModal post={activePost} onClose={() => setActivePost(null)} />}
    </>
  );
};

export default MyStuffScreen;
