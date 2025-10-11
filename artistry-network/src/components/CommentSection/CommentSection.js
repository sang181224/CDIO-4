import React, { useState } from 'react';
import './commentSection.css';
import CommentForm from './CommentForm';
import ListComment from './ListComment';

function CommentSection({ artworkId, comments, onPostSuccess }) {
    const [replyingToId, setReplyingToId] = useState(null);

    const handleReplyClick = (commentId) => {
        setReplyingToId(currentId => (currentId === commentId ? null : commentId));
    };

    const handleInternalPostSuccess = () => {
        setReplyingToId(null); // Đóng form reply lại
        onPostSuccess(); // Báo cho DetailPage biết để tải lại dữ liệu
    };

    return (
        <section className="comment-section-wrapper">
            {/* Form bình luận gốc */}
            <CommentForm
                artworkId={artworkId}
                parentId={null}
                onPostSuccess={handleInternalPostSuccess}
                commentCount={comments.length}
            />

            {/* Danh sách bình luận */}
            <ListComment
                comments={comments}
                onReplyClick={handleReplyClick}
                replyingToId={replyingToId}
                artworkId={artworkId}
                onPostSuccess={handleInternalPostSuccess}
            />
        </section>
    );
}

export default CommentSection;