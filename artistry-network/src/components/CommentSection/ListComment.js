import React from 'react';
import { timeAgo } from '../../utils/time';
import './ListComment.css'
import CommentForm from './CommentForm';
import { apiClient } from '../../api/apiService';
import { useAuth } from '../../hooks/useAuth';
function ListComment({ comments, onReplyClick, replyingToId, artworkId, onPostSuccess }) {
    const { token } = useAuth();
    const handleDelete = async (id) => {
        try {
            const config = {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }
            await apiClient.delete(`artwork/detail/comment/${id}`, config);
            alert('Xoá bình luận thành công thành công');
            onPostSuccess();
        } catch (error) {
            console.log('Lỗi khi xoá bình luận ', error);
        }
    }

    const parentComment = comments.filter(c => c.parentId === 0);
    const renderComment = () => {
        if (parentComment.length > 0) {
            return parentComment.map((parent) => {
                return (
                    <React.Fragment key={parent.id}>
                        <div className="comment-item" >
                            <img src={`http://localhost:3000/${parent.image_user}`} alt={parent.name_user} className="user-avatar" />
                            <div className="comment-content">
                                <p className="comment-author">{parent.name_user}</p>
                                <p className="comment-text">{parent.content}</p>
                                <div className="comment-meta">
                                    <span className="comment-time">{timeAgo(parent.createdAt)}</span>
                                    <a href="#" onClick={(e) => { e.preventDefault(); onReplyClick(parent.id) }} className="reply-button">Phản hồi</a>
                                    {parent.isOwner && (
                                        <>
                                            {/* <a href="#" className="reply-button">Sửa</a> */}
                                            <a onClick={() => handleDelete(parent.id)} className="reply-button">Xóa</a>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="comment-replies">
                            {
                                comments.filter(children => children.parentId === parent.id)
                                    .map(children => {
                                        return (
                                            <div className="comment-item comment-reply" key={children.id}>
                                                <img src={`http://localhost:3000/${children.image_user}`} alt={children.name_user} className="user-avatar" />
                                                <div className="comment-content">
                                                    <p className="comment-author">{children.name_user}</p>
                                                    <p className="comment-text">{children.content}</p>
                                                    <div className="comment-meta">
                                                        <span className="comment-time">{timeAgo(children.createdAt)}</span>
                                                        <a href="#" onClick={(e) => { e.preventDefault(); onReplyClick(parent.id) }} className="reply-button">Phản hồi</a>
                                                        {children.isOwner && (
                                                            <>
                                                                {/* <a href="#" className="reply-button">Sửa</a> */}
                                                                <a onClick={() => handleDelete(children.id)} className="reply-button">Xóa</a>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                            }
                            {replyingToId === parent.id && (
                                <div className="comment-item comment-reply reply-form-container">
                                    <CommentForm
                                        artworkId={artworkId}
                                        parentId={parent.id}
                                        onPostSuccess={onPostSuccess}
                                        isReplyForm={true}
                                    />
                                </div>
                            )}
                        </div>

                    </React.Fragment>

                )
            });
        } else {
            return <p>Chưa có bình luận nào</p>
        }

    }
    return (
        <div className="comment-list">
            {renderComment()}
        </div>
    )
}
export default ListComment;