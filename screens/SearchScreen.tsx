
import React from 'react';
import { Post, Comment } from '../types';
import { DUMMY_POSTS } from '../constants';
import { ChevronLeft } from '../components/Icons';

interface SearchScreenProps {
  query: string;
  onBack: () => void;
  likedPostIds: Set<string>;
  onToggleLike: (postId: string) => void;
  selectedLocation: string;
  comments: Comment[];
  onAddComment: (postId: string, text: string) => void;
  onPostSelect: (post: Post) => void;
}

const PostCard: React.FC<{ post: Post, onClick: () => void }> = ({ post, onClick }) => (
    <div onClick={onClick} className="bg-white rounded-lg shadow p-4 mb-4 cursor-pointer hover:shadow-md transition-shadow">
        <div className="flex items-center mb-2">
            <img src={post.author.avatar} alt={post.author.name} className="w-8 h-8 rounded-full mr-2" />
            <div>
                <p className="font-semibold text-sm">{post.author.name}</p>
                <p className="text-xs text-gray-400">{post.timestamp}</p>
            </div>
        </div>
        <h4 className="font-bold text-gray-800 mb-1">{post.title}</h4>
        <p className="text-sm text-gray-600 line-clamp-2">{post.content}</p>
    </div>
);

const SearchScreen: React.FC<SearchScreenProps> = ({ query, onBack, onPostSelect, selectedLocation }) => {
    const lowerCaseQuery = query.toLowerCase();
    const results = DUMMY_POSTS.filter(post => {
        const inLocation = post.author.location === selectedLocation;
        const matchesQuery = post.title.toLowerCase().includes(lowerCaseQuery) ||
            post.content.toLowerCase().includes(lowerCaseQuery) ||
            post.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery));
        return inLocation && matchesQuery;
    });

    return (
        <div className="flex flex-col h-full bg-gray-100">
            <header className="sticky top-0 flex items-center p-3 bg-white/80 backdrop-blur-lg z-10 shadow-sm">
                <button onClick={onBack} className="text-gray-600 mr-3">
                <ChevronLeft className="w-6 h-6" />
                </button>
                <h2 className="text-lg font-bold text-gray-800">搜索结果: "{query}"</h2>
            </header>
            <main className="flex-1 overflow-y-auto p-4">
                {results.length > 0 ? (
                    results.map(post => <PostCard key={post.id} post={post} onClick={() => onPostSelect(post)} />)
                ) : (
                    <p className="text-center text-gray-500 mt-8">在 {selectedLocation} 没有找到相关内容</p>
                )}
            </main>
        </div>
    );
};

export default SearchScreen;