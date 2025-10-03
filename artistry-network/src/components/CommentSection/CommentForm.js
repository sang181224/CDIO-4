import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import './CommentForm.css';
import { useAuth } from '../../hooks/useAuth'; // Giả sử để lấy avatar user hiện tại

// Dữ liệu giả lập


function CommentForm({ blogId, parentId, handlePostSuccess, replyingToComment, onCancelReply }) {
    const { token } = useAuth();
    const { isAuthenticated, user } = useAuth(); // Lấy thông tin user đã đăng nhập
    const [content, setContent] = useState('');

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        
        if(!token){
            console.error('Bạn cần đăng nhập để bình luận');
            return;
        }
        if (content.trim() === '') return;
        console.log('Submitting comment:', content);
        setContent('');
    };

    return (
        <section className="comment-section">
            <h2 className="comment-heading">
                {/* Bình luận <span className="comment-count-badge">{comments.length}</span> */}
                Bình luận <span className="comment-count-badge">5</span>
            </h2>

            {isAuthenticated && (
                <form className="comment-form" onSubmit={handleCommentSubmit}>
                    <img src={user?.avatarUrl} alt="Your Avatar" className="user-avatar" />
                    <div className="textarea-wrapper">
                        <textarea
                            rows="3"
                            placeholder="Viết bình luận của bạn..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                        <button type="submit" className="btn btn-primary">Gửi</button>
                    </div>
                </form>
            )}


        </section>
    );
}

export default CommentForm
    ;