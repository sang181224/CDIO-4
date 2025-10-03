import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './PostCard.css';
import { apiClient } from '../../api/apiService';
import { useAuth } from '../../hooks/useAuth';

// Dữ liệu về các reaction để dễ quản lý
const reactions = {
    like: { icon: 'fa-solid fa-thumbs-up', title: 'Thích', color: 'var(--like-color)' },
    love: { icon: 'fa-solid fa-heart', title: 'Yêu thích', color: 'var(--love-color)' },
    haha: { icon: 'fa-solid fa-face-laugh-squint', title: 'Haha', color: 'var(--haha-color)' },
    wow: { icon: 'fa-solid fa-face-surprise', title: 'Wow', color: 'var(--wow-color)' },
    sad: { icon: 'fa-solid fa-face-sad-tear', title: 'Buồn', color: 'var(--sad-color)' },
    angry: { icon: 'fa-solid fa-face-angry', title: 'Phẫn nộ', color: 'var(--angry-color)' },
};

function PostCard({ artwork, isOwner }) {
    const { token } = useAuth();
    // --- STATE ---
    const [currentReaction, setCurrentReaction] = useState(artwork.userReaction); // Lấy trạng thái ban đầu từ prop
    const [reactionCount, setReactionCount] = useState(artwork._count.reactions);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    // console.log(artwork);       
    let leaveTimeout;
    let longPressTimer;
    let isLongPress = false;

    const handleReactionSelect = async (reactionType) => {
        const oldReaction = currentReaction;
        setCurrentReaction(reactionType);
        setIsPopupVisible(false);

        // Chỉ tăng count nếu trước đó chưa có reaction
        if (!oldReaction) {
            setReactionCount(prev => prev + 1);
        }

        try {
            const config = {
                headers: {
                    'Authorization': 'Bearer: ' + token
                }
            }
            apiClient.post(`/artwork/${artwork.id}/react`, { reactionType }, config);
        } catch (error) {
            console.error("Lỗi cập nhật reaction:", error);
            setCurrentReaction(oldReaction);
            if (!oldReaction) setReactionCount(prev => prev - 1);
        }
    }


    const handleLikeClick = async () => {
        if (isLongPress) return;

        const oldReaction = currentReaction;
        const newReaction = oldReaction ? null : 'like';

        // 1. Cập nhật giao diện lạc quan
        setCurrentReaction(newReaction);
        if (newReaction && !oldReaction) {
            setReactionCount(prev => prev + 1); // Tăng count
        } else if (!newReaction && oldReaction) {
            setReactionCount(prev => prev - 1); // Giảm count
        }

        // 2. Gọi API
        try {
            const config = {
                headers: {
                    'Authorization': 'Bearer: ' + token
                }
            }
            if (newReaction) {
                apiClient.post(`/artwork/${artwork.id}/react`, { reactionType: newReaction }, config);
                console.log(newReaction);
            } else {
                apiClient.delete(`/artwork/${artwork.id}/react`, config);
            }
        } catch (error) {
            console.error("Lỗi cập nhật reaction:", error);
            // 3. Nếu lỗi, quay lại trạng thái cũ
            setCurrentReaction(oldReaction);
            if (newReaction && !oldReaction) setReactionCount(prev => prev - 1);
            if (!newReaction && oldReaction) setReactionCount(prev => prev + 1);
        }
    };

    const handleMouseEnter = () => { clearTimeout(leaveTimeout); setIsPopupVisible(true); };
    const handleMouseLeave = () => { leaveTimeout = setTimeout(() => setIsPopupVisible(false), 300); };
    const handleTouchStart = (e) => {
        isLongPress = false;
        longPressTimer = setTimeout(() => { e.preventDefault(); setIsPopupVisible(true); isLongPress = true; }, 500);
    };
    const handleTouchEnd = () => clearTimeout(longPressTimer);

    // --- RENDER LOGIC ---
    if (!artwork) return null;

    const cardClassName = `post-card ${isOwner ? 'is-owner' : ''}`;
    const mainButtonIcon = currentReaction ? reactions[currentReaction].icon : 'fa-regular fa-thumbs-up';
    const mainButtonTitle = currentReaction ? reactions[currentReaction].title : 'Thích';
    const mainButtonStyle = { color: currentReaction ? reactions[currentReaction].color : '' };

    const shortDescription = artwork.description?.length > 100
        ? `${artwork.description.substring(0, 100)}...`
        : artwork.description;

    return (
        <article className={cardClassName}>
            {isOwner && (
                <div className="card-edit-button">
                    <Link to={`/edit-artwork/${artwork.id}`}>✏️ Chỉnh sửa</Link>
                </div>
            )}

            <Link to={`/artwork/${artwork.id}`} className="post-image-link">
                <div className="post-image">
                    <img src={`http://localhost:3000/${JSON.parse(artwork.imageUrls)[0]}`} alt={artwork.title} />
                </div>
            </Link>

            <div className="post-card-content">
                <div className="post-author">
                    <Link to={`/profile/${artwork.author.id}`}>
                        <img src={`http://localhost:3000/${artwork.author.avatarUrl}`} alt={artwork.author.name} />
                    </Link>
                    <div className="author-details">
                        <Link to={`/profile/${artwork.author.id}`} className="post-author-link">
                            <h4>{artwork.author.name}</h4>
                        </Link>
                        <p>{artwork.createdAt}</p> {/* Frontend sẽ định dạng lại sau */}
                    </div>
                </div>
                <Link to={`/artwork/${artwork.id}`} className="post-title-link">
                    <h3>{artwork.title}</h3>
                </Link>
                <p className="post-description">{shortDescription}</p>
                <div className="card-footer">
                    <div className="price">{artwork.price.toLocaleString('vi-VN')} VNĐ</div>
                    <div className="card-stats">
                        <span className="stat-item" title="Lượt cảm xúc"><i className="fa-solid fa-heart"></i> {reactionCount}</span>
                        <span className="stat-item" title="Lượt bình luận"><i className="fa-solid fa-comment"></i> {artwork._count.comments}</span>
                    </div>
                </div>
            </div>

            <div className="post-actions">
                <button className={`action-button like-button ${currentReaction ? 'reacted' : ''}`} style={mainButtonStyle} onClick={handleLikeClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
                    <i className={mainButtonIcon} />
                    <span>{mainButtonTitle}</span>
                    <div className={`reaction-popup ${isPopupVisible ? 'is-visible' : ''}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        {Object.keys(reactions).map(key => (<i key={key} className={`${reactions[key].icon} reaction-icon`} data-reaction={key} title={reactions[key].title} onClick={(e) => { e.stopPropagation(); handleReactionSelect(key); }} />))}
                    </div>
                </button>
                <Link to={`/artwork/${artwork.id}#comments`} className="action-button">
                    <i className="fa-regular fa-comment" /><span>Bình luận</span>
                </Link>
                <button className="action-button">
                    <i className="fa-solid fa-share" /><span>Chia sẻ</span>
                </button>
            </div>
        </article>
    );
}

export default PostCard;