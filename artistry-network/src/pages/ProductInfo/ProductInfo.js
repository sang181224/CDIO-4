import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductInfo.css';
import { useAuth } from '../../hooks/useAuth';
import { apiClient } from '../../api/apiService';

const reactions = {
    like: { icon: 'fa-solid fa-thumbs-up', title: 'Thích', color: 'var(--like-color)' },
    love: { icon: 'fa-solid fa-heart', title: 'Yêu thích', color: 'var(--love-color)' },
    haha: { icon: 'fa-solid fa-face-laugh-squint', title: 'Haha', color: 'var(--haha-color)' },
    wow: { icon: 'fa-solid fa-face-surprise', title: 'Wow', color: 'var(--wow-color)' },
    sad: { icon: 'fa-solid fa-face-sad-tear', title: 'Buồn', color: 'var(--sad-color)' },
    angry: { icon: 'fa-solid fa-face-angry', title: 'Phẫn nộ', color: 'var(--angry-color)' },
};

function ProductInfo({ artwork }) {
    const { token } = useAuth();
    const [currentReaction, setCurrentReaction] = useState(artwork.userReaction);
    const [reactionCount, setReactionCount] = useState(artwork._count.reactions);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    let leaveTimeout, longPressTimer;
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
                    'Authorization': 'Bearer ' + token
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
                    'Authorization': 'Bearer ' + token
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

    const mainButtonIcon = currentReaction ? reactions[currentReaction].icon : 'fa-regular fa-thumbs-up';
    const mainButtonTitle = currentReaction ? reactions[currentReaction].title : 'Thích';
    const mainButtonStyle = { color: currentReaction ? reactions[currentReaction].color : '' };

    return (
        <div className="product-info">
            <div className="artist-info">
                <Link to={`/profile/${artwork.author.id}`}>
                    <img src={`http://localhost:3000/${artwork.author.avatarUrl}`} alt={artwork.author.name} className="artist-avatar" />
                </Link>
                <div>
                    <Link to={`/profile/${artwork.author.id}`} className="artist-name">
                        {artwork.author.name}
                    </Link>
                    <button className="follow-button">Theo dõi</button>
                </div>
            </div>

            <h1 className="product-title">{artwork.title}</h1>
            <p className="product-price">{artwork.price.toLocaleString('vi-VN')} VNĐ</p>

            <div className="product-social-actions">
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
                                onClick={(e) => { e.stopPropagation(); handleReactionSelect(key); }}
                            />
                        ))}
                    </div>
                </button>
                <button className="action-button">
                    <i className="fa-solid fa-share" />
                    <span>Chia sẻ</span>
                </button>
            </div>

            <div className="action-buttons">
                {/* <a href={artwork.author.email ? `mailto:${artwork.author.email}` : '#'} className="btn btn-primary">
                    Liên hệ nghệ sĩ
                </a> */}
                <Link to={`/profile/${artwork.author.id}`} className="btn btn-primary">
                    Liên hệ nghệ sĩ
                </Link>
            </div>
            <div className="product-stats">
                <div className="stat-item">
                    <i className="fa-solid fa-heart"></i>
                    <span>{reactionCount} lượt thích</span>
                </div>
                <div className="stat-item">
                    <i className="fa-solid fa-comment"></i>
                    <span>{artwork._count.comments} bình luận</span>
                </div>
                <div className="stat-item">
                    <i className="fa-solid fa-eye"></i>
                    <span>{artwork.views} lượt xem</span>
                </div>
            </div>
            <div className="product-description">
                <h4>Mô tả tác phẩm</h4>
                <p>{artwork.description}</p>
            </div>

            <div className="product-meta">
                <p><strong>Kích thước:</strong> {artwork.dimensions}</p>
                {/* <p><strong>Chất liệu:</strong> {artwork.thuocTinh.chatLieu}</p> */}
                {/* { year = new Date(createdAt).getFullYear() } */}
                <p><strong>Năm sáng tác:</strong> {artwork.createdAt}</p>
            </div>
        </div>
    );
}

export default ProductInfo;