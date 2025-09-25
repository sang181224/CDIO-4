import { useState } from 'react';
import './PostCard.css';


// Dữ liệu về các reaction
const reactions = {
    like: { icon: 'fa-solid fa-thumbs-up', title: 'Thích', color: 'var(--like-color)' },
    love: { icon: 'fa-solid fa-heart', title: 'Yêu thích', color: 'var(--love-color)' },
    haha: { icon: 'fa-solid fa-face-laugh-squint', title: 'Haha', color: 'var(--haha-color)' },
    wow: { icon: 'fa-solid fa-face-surprise', title: 'Wow', color: 'var(--wow-color)' },
    sad: { icon: 'fa-solid fa-face-sad-tear', title: 'Buồn', color: 'var(--sad-color)' },
    angry: { icon: 'fa-solid fa-face-angry', title: 'Phẫn nộ', color: 'var(--angry-color)' },
};
function PostCard({ artwork, isOwner }) {
    // Lưu reaction hiện tại (vd: 'like', 'love'...)
    const [currentReaction, setCurrentReaction] = useState(null);
    //State quản lý việc hiển thị popup, các icon
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    let leaveTimeout;
    let longPressTimer;
    let isLongPress = false;

    // Khi bấm vào nút Like/Unlike chính
    const handleLikeClick = () => {
        if (isLongPress) return; // Nếu là nhấn giữ thì không làm gì

        // Nếu đã có reaction -> Bỏ reaction. Nếu chưa -> reaction mặc định là 'like'
        setCurrentReaction(currentReaction ? null : 'like');
    };

    // Khi chọn một icon trong popup
    const handleReactionSelect = (reactionType) => {
        setCurrentReaction(reactionType);
        setIsPopupVisible(false); // Ẩn popup sau khi chọn
    };

    //Hàm xử lý khi di chuột vào nút like
    const handleMouseEnter = () => {
        clearTimeout(leaveTimeout);
        setIsPopupVisible(true);
    };
    // Hàm xử lý khi di chuột ra khỏi nút Like VÀ cả popup
    const handleMouseLeave = () => {
        leaveTimeout = setTimeout(() => {
            setIsPopupVisible(false);
        }, 200); // Trễ một chút để người dùng kịp di chuột vào popup
    };
    // Xử lý nhấn giữ trên mobile
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

    // Xác định icon, chữ, và màu cho nút chính dựa vào state
    const mainButtonIcon = currentReaction ? reactions[currentReaction].icon : 'fa-regular fa-thumbs-up';
    const mainButtonTitle = currentReaction ? reactions[currentReaction].title : 'Thích';
    const mainButtonStyle = {
        color: currentReaction ? reactions[currentReaction].color : '',
    };
    return (
        <article className={`post-card ${isOwner ? 'is-owner' : ''}`}>
            <div className="card-edit-button">
                <a href="/edit-artwork.html">✏️ Chỉnh sửa</a>
            </div>
            <a href="/product-detail.html" className="post-image-link">
                <div className="post-image">
                    <img src={artwork.imageUrl} alt="Tên tác phẩm" />
                </div>
            </a>
            <div className="post-card-content">
                <div className="post-author">
                    <img src={artwork.author.avatarUrl} alt="Avatar Nghệ sĩ" />
                    <div className="author-details">
                        <h4>Tên nghệ sĩ: {artwork.author.name}</h4>
                        <p>Thời gian đăng: {artwork.postTime}</p>
                    </div>
                </div>
                <a href="/product-detail.html" className="post-title-link">
                    <h3>Tên tác phẩm: {artwork.title}</h3>
                </a>
                <p className="post-description">{artwork.description}</p>
                <div className="price">3,500,000 VNĐ</div>
            </div>
            <div className="post-actions">
                <button className="action-button like-button"
                    style={mainButtonStyle}
                    onClick={handleLikeClick}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    <i className={mainButtonIcon} />
                    <span>{mainButtonTitle}</span>
                    <div className={`reaction-popup ${isPopupVisible ? 'is-visible' : ''}`}
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
                                    e.stopPropagation(); // Ngăn sự kiện click vào nút cha
                                    handleReactionSelect(key);
                                }}
                            />
                        ))}
                        {/* <i className="fa-solid fa-thumbs-up reaction-icon" data-reaction="like" title="Thích" />
                        <i className="fa-solid fa-heart reaction-icon" data-reaction="love" title="Yêu thích" />
                        <i className="fa-solid fa-face-laugh-squint reaction-icon" data-reaction="haha" title="Haha" />
                        <i className="fa-solid fa-face-surprise reaction-icon" data-reaction="wow" title="Wow" />
                        <i className="fa-solid fa-face-sad-tear reaction-icon" data-reaction="sad" title="Buồn" />
                        <i className="fa-solid fa-face-angry reaction-icon" data-reaction="angry" title="Phẫn nộ" /> */}
                    </div>
                </button>
                <a className="action-button" href="/product-detail.html">
                    <i className="fa-regular fa-comment" />
                    <span>Bình luận</span>
                </a>
                <button className="action-button">
                    <i className="fa-solid fa-share" />
                    <span>Chia sẻ</span>
                </button>
            </div>
        </article>
    );
}
export default PostCard;