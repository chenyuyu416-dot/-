
import React, { useState } from 'react';
import { DUMMY_POSTS } from '../constants';
import { Post as PostType } from '../types';
import { Heart, MessageSquare, MoreVertical, Plus } from '../components/Icons';
import PostDetailModal from '../components/PostDetailModal';

const Post: React.FC<{ post: PostType; onClick: () => void }> = ({ post, onClick }) => {
    return (
        <div className="bg-white rounded-lg shadow-md mb-4 overflow-hidden">
            <div className="p-4" onClick={onClick}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full mr-3" />
                        <div>
                            <p className="font-semibold text-gray-800">{post.author.name}</p>
                            <p className="text-xs text-gray-500">{post.timestamp}</p>
                        </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical className="w-5 h-5" />
                    </button>
                </div>
                <h3 className="text-lg font-bold my-2 text-gray-900">{post.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">{post.content}</p>
                <div className="flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full font-medium">#{tag}</span>
                    ))}
                </div>
            </div>
            {post.image && <img src={post.image} alt="Post image" className="w-full h-auto object-cover cursor-pointer" onClick={onClick} />}
            <div className="flex justify-around items-center p-2 border-t border-gray-100">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors">
                    <Heart className="w-5 h-5" />
                    <span className="text-sm">{post.likes}</span>
                </button>
                <button onClick={onClick} className="flex items-center space-x-2 text-gray-600 hover:text-indigo-500 transition-colors">
                    <MessageSquare className="w-5 h-5" />
                    <span className="text-sm">{post.comments}</span>
                </button>
            </div>
        </div>
    );
};


const FeedScreen: React.FC<{onPostCreate: () => void}> = ({onPostCreate}) => {
    const [activePost, setActivePost] = useState<PostType | null>(null);

    return (
        <div className="bg-gray-100 min-h-full">
            <header className="sticky top-0 bg-white/80 backdrop-blur-lg z-10 p-4 shadow-sm flex justify-between items-center">
                <h1 className="text-xl font-bold text-gray-800">搭子圈</h1>
                <button onClick={onPostCreate} className="text-indigo-600">
                    <Plus className="w-6 h-6" />
                </button>
            </header>
            <div className="p-4">
                {DUMMY_POSTS.map(post => (
                    <Post key={post.id} post={post} onClick={() => setActivePost(post)} />
                ))}
            </div>
            {activePost && <PostDetailModal post={activePost} onClose={() => setActivePost(null)} />}
        </div>
    );
};

export default FeedScreen;
