import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './NotificationsPage.css'; // File CSS riêng cho trang này
import { apiClient } from '../../api/apiService';

const NotificationsPage = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    // 1. Fetch toàn bộ thông báo
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                // API này nên trả về list sắp xếp theo thời gian mới nhất
                const res = await apiClient.get('/notifications');
                setNotifications(res.data);
            } catch (error) {
                console.error("Lỗi tải thông báo:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []);

    // 2. Xử lý khi click vào 1 thông báo (Đánh dấu đã đọc)
    const handleRead = async (notif) => {
        if (!notif.isRead) {
            try {
                await apiClient.put(`/notifications/${notif.id}/read`);
                // Cập nhật state UI ngay lập tức
                setNotifications(prev => prev.map(n =>
                    n.id === notif.id ? { ...n, isRead: true } : n
                ));
            } catch (error) {
                console.error(error);
            }
        }
    };

    // 3. (Optional) Đánh dấu tất cả là đã đọc
    const handleMarkAllRead = async () => {
        try {
            await apiClient.put('/notifications/read-all');
            setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) return <div className="loading-spinner">Đang tải...</div>;

    return (
        <div className="notif-page-container">
            <div className="notif-header">
                <h2>🔔 Tất cả thông báo</h2>
                <button className="mark-all-btn" onClick={handleMarkAllRead}>
                    Đánh dấu tất cả đã đọc
                </button>
            </div>

            <div className="notif-full-list">
                {notifications.length === 0 ? (
                    <p className="empty-msg">Bạn chưa có thông báo nào.</p>
                ) : (
                    notifications.map(notif => (
                        <div
                            key={notif.id}
                            className={`notif-card ${notif.isRead ? 'read' : 'unread'}`}
                            onClick={() => handleRead(notif)}
                        >
                            <Link to={`/artwork/${notif.artworkId}`} className="notif-card-link">
                                {/* Avatar người gửi */}
                                <img
                                    src={`http://localhost:3000/${notif.sender.avatarUrl}`}
                                    alt="User"
                                    className="notif-card-avatar"
                                />

                                {/* Nội dung */}
                                <div className="notif-card-content">
                                    <p>
                                        <strong>{notif.sender.name}</strong>
                                        {notif.type === 'LIKE' ? ' đã thích tác phẩm của bạn.' : ' đã bình luận về tác phẩm của bạn.'}
                                    </p>
                                    <span className="notif-time">{new Date(notif.createdAt).toLocaleString()}</span>
                                </div>

                                {/* Thumbnail tác phẩm (nếu có) */}
                                {notif.artwork?.imageUrls && (
                                    <img
                                        src={`http://localhost:3000/${JSON.parse(notif.artwork.imageUrls)[0]}`}
                                        alt="Art"
                                        className="notif-card-thumb"
                                    />
                                )}
                            </Link>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default NotificationsPage;