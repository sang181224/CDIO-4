import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductInfo.css';

const reactions = {
    like: { icon: 'fa-solid fa-thumbs-up', title: 'Thích', color: 'var(--like-color)' },
    love: { icon: 'fa-solid fa-heart', title: 'Yêu thích', color: 'var(--love-color)' },
    haha: { icon: 'fa-solid fa-face-laugh-squint', title: 'Haha', color: 'var(--haha-color)' },
    wow: { icon: 'fa-solid fa-face-surprise', title: 'Wow', color: 'var(--wow-color)' },
    sad: { icon: 'fa-solid fa-face-sad-tear', title: 'Buồn', color: 'var(--sad-color)' },
    angry: { icon: 'fa-solid fa-face-angry', title: 'Phẫn nộ', color: 'var(--angry-color)' },
};

function ProductInfo({ artwork }) {
    const [currentReaction, setCurrentReaction] = useState(artwork.camXucCuaToi);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    let leaveTimeout, longPressTimer;
    let isLongPress = false;

    const handleLikeClick = () => {
        if (isLongPress) return;
        setCurrentReaction(currentReaction ? null : 'like');
    };

    const handleReactionSelect = (reactionType) => {
        setCurrentReaction(reactionType);
        setIsPopupVisible(false);
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
                <Link to={`/profile/${artwork.nguoiTao.id}`}>
                    <img src={artwork.nguoiTao.anhDaiDien} alt={artwork.nguoiTao.ten} className="artist-avatar" />
                </Link>
                <div>
                    <Link to={`/profile/${artwork.nguoiTao.id}`} className="artist-name">
                        {artwork.nguoiTao.ten}
                    </Link>
                    <button className="follow-button">Theo dõi</button>
                </div>
            </div>

            <h1 className="product-title">{artwork.ten}</h1>
            <p className="product-price">{artwork.gia}</p>

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
                <a href={`mailto:${artwork.nguoiTao.email}`} className="btn btn-primary">
                    Liên hệ nghệ sĩ
                </a>
            </div>

            <div className="product-description">
                <h4>Mô tả tác phẩm</h4>
                <p>{artwork.moTaDayDu}</p>
            </div>

            <div className="product-meta">
                <p><strong>Kích thước:</strong> {artwork.thuocTinh.kichThuoc}</p>
                <p><strong>Chất liệu:</strong> {artwork.thuocTinh.chatLieu}</p>
                <p><strong>Năm sáng tác:</strong> {artwork.thuocTinh.namSangTac}</p>
            </div>
        </div>
    );
}

export default ProductInfo;