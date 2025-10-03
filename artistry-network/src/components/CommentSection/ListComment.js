import './ListComment.css'
function ListComment() {
    return (
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
    )
}
export default ListComment;