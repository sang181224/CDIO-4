import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import './CommentForm.css';
import { useAuth } from '../../hooks/useAuth'; // Giả sử để lấy avatar user hiện tại

// Dữ liệu giả lập


function CommentForm ({ artworkId }) {
    const { isAuthenticated, user } = useAuth(); // Lấy thông tin user đã đăng nhập

    const [newComment, setNewComment] = useState('');

    // useEffect(() => {
    //     const fetchComments = async () => {
    //         const response = await axios.get(`http://localhost:3100/api/artworks/${artworkId}/comments`);
    //         setComments(response.data);
    //     };
    //     fetchComments();
    // }, [artworkId]);

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (newComment.trim() === '') return;
        // Logic gửi comment mới lên server ở đây
        console.log('Submitting comment:', newComment);
        setNewComment(''); // Xóa nội dung trong ô input
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
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
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