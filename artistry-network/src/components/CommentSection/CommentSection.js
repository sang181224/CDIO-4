import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import './CommentSection.css';
import { useAuth } from '../../hooks/useAuth'; // Giả sử để lấy avatar user hiện tại

// Dữ liệu giả lập
const dummyComments = [
    { id: 'cmt1', noidung: 'Màu sắc tuyệt vời!', ngayBinhLuan: '1 giờ trước', is_owner: false, nguoidung: { id: 'user456', ten: 'Kenji Watanabe', anhDaiDien: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop' } },
    { id: 'cmt2', noidung: 'Đồng ý, tranh nhìn rất có chiều sâu.', ngayBinhLuan: '30 phút trước', is_owner: true, nguoidung: { id: 'user123', ten: 'Elena Rodriguez', anhDaiDien: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop' }, parentId: 'cmt1' },
];

function CommentSection({ artworkId }) {
    const { isAuthenticated, user } = useAuth(); // Lấy thông tin user đã đăng nhập
    const [comments, setComments] = useState(dummyComments);
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
                Bình luận <span className="comment-count-badge">{comments.length}</span>
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

            <div className="comment-list">
                {comments.filter(c => !c.parentId).map(comment => (
                    <React.Fragment key={comment.id}>
                        <div className="comment-item">
                            <img src={comment.nguoidung.anhDaiDien} alt={comment.nguoidung.ten} className="user-avatar" />
                            <div className="comment-content">
                                <p className="comment-author">{comment.nguoidung.ten}</p>
                                <p className="comment-text">{comment.noidung}</p>
                                <div className="comment-meta">
                                    <span className="comment-time">{comment.ngayBinhLuan}</span>
                                    <a href="#" className="reply-button">Phản hồi</a>
                                    {comment.is_owner && (
                                        <>
                                            <a href="#" className="reply-button">Sửa</a>
                                            <a href="#" className="reply-button">Xóa</a>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* Render các bình luận con */}
                        {comments.filter(reply => reply.parentId === comment.id).map(reply => (
                            <div key={reply.id} className="comment-item comment-reply">
                                <img src={reply.nguoidung.anhDaiDien} alt={reply.nguoidung.ten} className="user-avatar" />
                                <div className="comment-content">
                                    <p className="comment-author">{reply.nguoidung.ten}</p>
                                    <p className="comment-text">{reply.noidung}</p>
                                    <div className="comment-meta">
                                        <span className="comment-time">{reply.ngayBinhLuan}</span>
                                        <a href="#" className="reply-button">Phản hồi</a>
                                        {reply.is_owner && (
                                            <>
                                                <a href="#" className="reply-button">Sửa</a>
                                                <a href="#" className="reply-button">Xóa</a>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </section>
    );
}

export default CommentSection;