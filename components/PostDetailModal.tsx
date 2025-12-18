
import React, { useState } from 'react';
import { Post, Comment } from '../types';
import { DUMMY_COMMENTS, DUMMY_USERS } from '../constants';
import { X, Heart, MessageSquare, Send } from './Icons';

interface PostDetailModalProps {
  post: Post;
  onClose: () => void;
}

const PostDetailModal: React.FC<PostDetailModalProps> = ({ post, onClose }) => {
    const [comments, setComments] = useState<Comment[]>(DUMMY_COMMENTS.filter(c => c.postId === post.id));
    const [newComment, setNewComment] = useState('');

    const handleAddComment = () => {
        if(newComment.trim() === '') return;
        const comment: Comment = {
            id: `c${Date.now()}`,
            postId: post.id,
            author: DUMMY_USERS.currentUser,
            text: newComment,
            timestamp: '刚刚'
        };
        setComments([...comments, comment]);
        setNewComment('');
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-end justify-center">
            <div className="bg-white rounded-t-2xl shadow-xl w-full max-w-md h-[90vh] flex flex-col">
                <header className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-bold">动态详情</h2>
                    <button onClick={onClose}><X className="w-6 h-6" /></button>
                </header>
                
                <main className="flex-1 overflow-y-auto p-4">
                    {/* Post Content */}
                    <div className="border-b pb-4">
                         <div className="flex items-center">
                            <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full mr-3" />
                            <div>
                                <p className="font-semibold">{post.author.name}</p>
                                <p className="text-xs text-gray-500">{post.timestamp}</p>
                            </div>
                        </div>
                        <h3 className="text-xl font-bold my-3">{post.title}</h3>
                        <p className="text-gray-700 mb-3">{post.content}</p>
                        {post.image && <img src={post.image} alt="Post" className="rounded-lg w-full" />}
                        <div className="flex flex-wrap gap-2 mt-3">
                            {post.tags.map(tag => <span key={tag} className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">#{tag}</span>)}
                        </div>
                    </div>

                    {/* Comments Section */}
                    <div className="mt-4">
                        <h4 className="font-semibold mb-2">{comments.length} 条评论</h4>
                        {comments.map(comment => (
                            <div key={comment.id} className="flex items-start space-x-3 mb-4">
                                <img src={comment.author.avatar} alt={comment.author.name} className="w-8 h-8 rounded-full" />
                                <div className="flex-1">
                                    <div className="bg-gray-100 rounded-lg p-2">
                                        <p className="font-semibold text-sm">{comment.author.name}</p>
                                        <p className="text-sm text-gray-800">{comment.text}</p>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-1">{comment.timestamp}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>

                <footer className="p-2 border-t bg-white">
                    <div className="flex items-center space-x-2">
                        <input 
                            type="text" 
                            placeholder="留下你的评论..." 
                            className="flex-1 w-full px-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                        />
                        <button onClick={handleAddComment} className="p-2 bg-indigo-600 text-white rounded-full">
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default PostDetailModal;
