
import React from 'react';
import { Post as PostType, Comment } from '../types';
import { Heart, MessageSquare, MoreVertical, Plus, User } from '../components/Icons';
import { DUMMY_USERS } from '../constants';

interface PostCardProps {
    post: PostType; 
    onClick: () => void;
    isLiked: boolean;
    onLike: () => void;
    commentCount: number;
    isFollowing: boolean;
    onFollowClick: () => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onClick, isLiked, onLike, commentCount, isFollowing, onFollowClick }) => {
    return (
        <div className="bg-white rounded-lg shadow-md mb-4 overflow-hidden">
            <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center cursor-pointer" onClick={onClick}>
                        <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full mr-3" />
                        <div>
                            <p className="font-semibold text-gray-800">{post.author.name}</p>
                            <p className="text-xs text-gray-500">{post.timestamp}</p>
                        </div>
                    </div>
                    {post.author.id !== DUMMY_USERS.currentUser.id &&
                        <button onClick={(e) => { e.stopPropagation(); onFollowClick(); }} className={`px-3 py-1 text-xs rounded-full font-semibold ${isFollowing ? 'bg-gray-200 text-gray-700' : 'bg-indigo-100 text-indigo-600'}`}>
                            {isFollowing ? '已关注' : '＋ 关注'}
                        </button>
                    }
                </div>
                 <div className="cursor-pointer" onClick={onClick}>
                    <h3 className="text-lg font-bold my-2 text-gray-900">{post.title}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-3">{post.content}</p>
                    <div className="flex flex-wrap gap-2">
                        {post.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full font-medium">#{tag}</span>
                        ))}
                    </div>
                </div>
            </div>
            {post.image && <img src={post.image} alt="Post image" className="w-full h-auto object-cover cursor-pointer" onClick={onClick} />}
            <div className="flex justify-around items-center p-2 border-t border-gray-100">
                <button 
                    onClick={onLike}
                    className={`flex items-center space-x-2 transition-colors ${isLiked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'}`}
                >
                    <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                    <span className="text-sm">{post.likes}</span>
                </button>
                <button onClick={onClick} className="flex items-center space-x-2 text-gray-600 hover:text-indigo-500 transition-colors">
                    <MessageSquare className="w-5 h-5" />
                    <span className="text-sm">{commentCount}</span>
                </button>
            </div>
        </div>
    );
};

interface FeedScreenProps {
    posts: PostType[];
    comments: Comment[];
    onPostCreate: () => void;
    likedPostIds: Set<string>;
    onToggleLike: (postId: string) => void;
    selectedLocation: string;
    followingIds: Set<string>;
    onToggleFollow: (userId: string) => void;
    onAddComment: (postId: string, text: string) => void;
    onOpenPersonalSpace: () => void;
    onPostSelect: (post: PostType) => void;
    unreadNotificationCount: number;
}

const FeedScreen: React.FC<FeedScreenProps> = ({ posts, comments, onPostCreate, likedPostIds, onToggleLike, selectedLocation, followingIds, onToggleFollow, onAddComment, onOpenPersonalSpace, onPostSelect, unreadNotificationCount }) => {

    const filteredPosts = posts.filter(post => post.author.location === selectedLocation);

    return (
        <div className="bg-gray-100 min-h-full">
            <header className="sticky top-0 bg-white/80 backdrop-blur-lg z-10 p-4 shadow-sm flex justify-between items-center">
                <button onClick={onOpenPersonalSpace} className="relative text-gray-600">
                    <User className="w-6 h-6" />
                    {unreadNotificationCount > 0 && (
                        <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white"></span>
                    )}
                </button>
                <h1 className="text-xl font-bold text-gray-800">搭子圈</h1>
                <button onClick={onPostCreate} className="text-indigo-600">
                    <Plus className="w-6 h-6" />
                </button>
            </header>
            <div className="p-4">
                {filteredPosts.length > 0 ? (
                    filteredPosts.map(post => {
                        const commentCount = comments.filter(c => c.postId === post.id).length;
                        return (
                            <PostCard 
                                key={post.id} 
                                post={post} 
                                onClick={() => onPostSelect(post)}
                                isLiked={likedPostIds.has(post.id)}
                                onLike={() => onToggleLike(post.id)}
                                commentCount={commentCount}
                                isFollowing={followingIds.has(post.author.id)}
                                onFollowClick={() => onToggleFollow(post.author.id)}
                            />
                        );
                    })
                ) : (
                    <p className="text-center text-gray-500 mt-8">在 {selectedLocation} 地区还没有搭子信息哦，快来发布第一条吧！</p>
                )}
            </div>
        </div>
    );
};

export default FeedScreen;