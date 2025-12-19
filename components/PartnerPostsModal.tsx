
import React from 'react';
import { User, Post as PostType, Comment } from '../types';
import { X } from './Icons';

// Reusable PostItem component, similar to the one in PersonalSpaceScreen
const PostItem: React.FC<{post: PostType, onClick: () => void, commentCount: number}> = ({post, onClick, commentCount}) => (
    <button onClick={onClick} className="w-full text-left bg-white p-3 rounded-lg shadow-sm hover:bg-gray-50">
        <p className="font-semibold truncate">{post.title}</p>
        <div className="flex justify-between items-center mt-2 text-xs text-gray-400">
            <span>{post.timestamp}</span>
            <span>{post.likes} 赞 · {commentCount} 评论</span>
        </div>
    </button>
);


interface PartnerPostsModalProps {
    user: User;
    posts: PostType[];
    comments: Comment[];
    onClose: () => void;
    onPostSelect: (post: PostType) => void;
}

const PartnerPostsModal: React.FC<PartnerPostsModalProps> = ({ user, posts, comments, onClose, onPostSelect }) => {
    const partnerPosts = posts.filter(p => p.author.id === user.id);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[70] flex items-end justify-center">
            <div className="bg-white rounded-t-2xl shadow-xl w-full max-w-md h-[90vh] flex flex-col">
                <header className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-bold">{user.name} 的动态</h2>
                    <button onClick={onClose}><X className="w-6 h-6" /></button>
                </header>
                <main className="flex-1 overflow-y-auto p-4 space-y-3">
                    {partnerPosts.length > 0 ? (
                        partnerPosts.map(post => {
                            const commentCount = comments.filter(c => c.postId === post.id).length;
                            return <PostItem key={post.id} post={post} onClick={() => onPostSelect(post)} commentCount={commentCount} />;
                        })
                    ) : (
                        <p className="text-center text-gray-500 mt-8">这位搭子还没有发布任何动态哦。</p>
                    )}
                </main>
            </div>
        </div>
    );
};

export default PartnerPostsModal;