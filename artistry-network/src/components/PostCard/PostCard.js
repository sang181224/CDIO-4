import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './PostCard.css';

const reactions = {
    like: { icon: 'fa-solid fa-thumbs-up', title: 'Thích', color: 'var(--like-color)' },
    love: { icon: 'fa-solid fa-heart', title: 'Yêu thích', color: 'var(--love-color)' },
    haha: { icon: 'fa-solid fa-face-laugh-squint', title: 'Haha', color: 'var(--haha-color)' },
    wow: { icon: 'fa-solid fa-face-surprise', title: 'Wow', color: 'var(--wow-color)' },
    sad: { icon: 'fa-solid fa-face-sad-tear', title: 'Buồn', color: 'var(--sad-color)' },
    angry: { icon: 'fa-solid fa-face-angry', title: 'Phẫn nộ', color: 'var(--angry-color)' },
};

function PostCard({ artwork, isOwner }) {
    const [currentReaction, setCurrentReaction] = useState(null);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    let leaveTimeout;
    let longPressTimer;
    let isLongPress = false;

    const handleLikeClick = () => {
        if (isLongPress) return;
        setCurrentReaction(currentReaction ? null : 'like');
    };

    const handleReactionSelect = (reactionType) => {
        setCurrentReaction(reactionType);
        setIsPopupVisible(false);
    };

    const handleMouseEnter = () => {
        clearTimeout(leaveTimeout);
        setIsPopupVisible(true);
    };

    const handleMouseLeave = () => {
        leaveTimeout = setTimeout(() => setIsPopupVisible(false), 300);
    };

    const handleTouchStart = (e) => {
        isLongPress = false;
        longPressTimer = setTimeout(() => {
            e.preventDefault();
            setIsPopupVisible(true);
            isLongPress = true;
        }, 500);
    };

    const handleTouchEnd = () => clearTimeout(longPressTimer);

    if (!artwork) return null;

    const cardClassName = `post-card ${isOwner ? 'is-owner' : ''}`;
    const mainButtonIcon = currentReaction ? reactions[currentReaction].icon : 'fa-regular fa-thumbs-up';
    const mainButtonTitle = currentReaction ? reactions[currentReaction].title : 'Thích';
    const mainButtonStyle = { color: currentReaction ? reactions[currentReaction].color : '' };

    return (
        <article className={cardClassName}>
            {isOwner && (
                <div className="card-edit-button">
                    <Link to={`/edit-artwork/${artwork.id}`}>✏️ Chỉnh sửa</Link>
                </div>
            )}

            <Link to={`/artwork/${artwork.id}`} className="post-image-link">
                <div className="post-image">
                    <img src={artwork.imageUrl} alt={artwork.title} />
                </div>
            </Link>

            <div className="post-card-content">
                <div className="post-author">
                    <Link to={`/profile/${artwork.author.id}`}>
                        <img src={artwork.author.avatarUrl} alt={artwork.author.name} />
                    </Link>
                    <div className="author-details">
                        <Link to={`/profile/${artwork.author.id}`} className="post-author-link">
                            <h4>{artwork.author.name}</h4>
                        </Link>
                        <p>{artwork.timeAgo}</p>
                    </div>
                </div>

                <Link to={`/artwork/${artwork.id}`} className="post-title-link">
                    <h3>{artwork.title}</h3>
                </Link>

                <p className="post-description">{artwork.description}</p>
                <div className="price">{artwork.price}</div>
                <div className="card-stats">
                    <span className="stat-item" title="Lượt cảm xúc"><i className="fa-solid fa-thumbs-up"></i> 5</span>
                    <span className="stat-item" title="Lượt bình luận"><i className="fa-solid fa-comment"></i> 5</span>
                    <span className="stat-item" title="Lượt xem"><i className="fa-solid fa-eye"></i> 5</span>
                </div>
            </div>

            <div className="post-actions">
                <button
                    className={`action-button like-button ${currentReaction ? 'reacted' : ''}`}
                    style={mainButtonStyle}
                    onClick={handleLikeClick}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    <i className={mainButtonIcon} />
                    <span>{mainButtonTitle}</span>
                    <div
                        className={`reaction-popup ${isPopupVisible ? 'is-visible' : ''}`}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        {Object.keys(reactions).map(key => (
                            <i
                                key={key}
                                className={`${reactions[key].icon} reaction-icon`}
                                data-reaction={key}
                                title={reactions[key].title}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleReactionSelect(key);
                                }}
                            />
                        ))}
                    </div>
                </button>
                <Link to={`/artwork/${artwork.id}#comments`} className="action-button">
                    <i className="fa-regular fa-comment" />
                    <span>Bình luận</span>
                </Link>
                <button className="action-button">
                    <i className="fa-solid fa-share" />
                    <span>Chia sẻ</span>
                </button>
            </div>
        </article>
    );
}

export default PostCard;