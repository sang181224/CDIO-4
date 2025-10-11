import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { apiClient } from '../../api/apiService';
import './CommentForm.css';

function CommentForm({ artworkId, parentId, onPostSuccess, commentCount, isReplyForm = false }) {
    const { isAuthenticated, user, token } = useAuth();
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Xóa lỗi cũ trước khi submit

        if (!isAuthenticated) {
            setError('Bạn cần đăng nhập để bình luận.');
            return;
        }
        if (content.trim() === '') {
            setError('Nội dung bình luận không được để trống.');
            return; 
        }

        setIsLoading(true);

        try {
            const data = { content, parentId };
            const config = { headers: { 'Authorization': `Bearer ${token}` } };

            await apiClient.post(`/artwork/detail/comment/${artworkId}`, data, config);

            setContent('');
            if (onPostSuccess) {
                onPostSuccess();
            }

        } catch (err) {
            console.log(err)
            setError(err.response?.data?.error || 'Đã có lỗi xảy ra.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isAuthenticated && !isReplyForm) {
        return (
            <section className="comment-section-wrapper">
                <div className="login-prompt">
                    <h2 className="comment-heading">Bình luận <span className="comment-count-badge">{commentCount}</span></h2>
                    <p>Vui lòng <a href="/login">đăng nhập</a> để tham gia bình luận.</p>
                </div>
            </section>
        );
    }

    if (!isAuthenticated && isReplyForm) {
        return null;
    }

    return (
        <section className={`comment-form-wrapper ${isReplyForm ? 'is-reply' : ''}`}>
            {!isReplyForm && (
                <h2 className="comment-heading">
                    Bình luận <span className="comment-count-badge">{commentCount}</span>
                </h2>
            )}
            <form className="comment-form" onSubmit={handleCommentSubmit}>
                <img src={`http://localhost:3000/${user?.avatarUrl}`} alt="Your Avatar" className="user-avatar" />
                <div className="textarea-wrapper">
                    <textarea
                        rows={isReplyForm ? 2 : 3}
                        placeholder={isReplyForm ? "Viết phản hồi của bạn..." : "Viết bình luận của bạn..."}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    {error && <small className="error-feedback">{error}</small>}
                    <div className="form-actions">
                        {isReplyForm && <button type="button" className="btn btn-secondary" onClick={onPostSuccess}>Hủy</button>}
                        <button type="submit" className="btn btn-primary" disabled={isLoading}>
                            {isLoading ? 'Đang gửi...' : (isReplyForm ? 'Trả lời' : 'Gửi')}
                        </button>
                    </div>
                </div>
            </form>
        </section>
    );
}

export default CommentForm;