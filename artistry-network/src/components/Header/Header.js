import { useEffect, useState } from 'react';
import logo from '../../assets/images/logomain.jpg';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { apiClient } from '../../api/apiService';
import io from 'socket.io-client';
const socket = io("http://localhost:3000");
function Header() {
    const { user, logout, isAuthenticated } = useAuth();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    // Gom về 2 state chính quản lý thông báo
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0); // Dùng 1 biến này cho badge
    // console.log(notifications)
    const [showNotif, setShowNotif] = useState(false);

    // URL gốc của server để nối chuỗi ảnh (nên đưa vào file config/constants)
    const BE_URL = "http://localhost:3000/";

    const handleSearch = (e) => {
        if (e.key === 'Enter' && searchQuery.trim() !== "") {
            // Chuyển sang trang search kèm query string
            navigate(`/shop?q=${searchQuery}`);
            setSearchQuery(""); // Xóa thanh search sau khi enter
        }
    };
    // 1. Tải thông báo cũ từ API (Lần đầu load trang)
    const fetchNotifications = async () => {
        try {
            const res = await apiClient.get('/notifications');
            // Sắp xếp mới nhất lên đầu (nếu API chưa sắp xếp)
            const sortedNotifs = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setNotifications(sortedNotifs);

            const count = sortedNotifs.filter(n => !n.isRead).length;
            setUnreadCount(count);
        } catch (error) {
            console.error("Lỗi tải thông báo", error);
        }
    };

    // 2. Setup Socket.io & Polling
    useEffect(() => {
        // Gọi API lần đầu
        fetchNotifications();

        if (user) {
            // Join Room
            socket.emit('join_user_room', user.userId || user.id); // Check kỹ xem user object dùng key nào

            // Lắng nghe sự kiện Real-time
            socket.on('new_notification', (payload) => {
                console.log("🔔 Ting ting:", payload);
                // payload có dạng: { message: "...", data: object_thong_bao }
                const newNotif = payload.data;
                // Cập nhật State: Thêm cái mới vào đầu mảng & Tăng số chưa đọc
                setNotifications(prev => [newNotif, ...prev]);
                setUnreadCount(prev => prev + 1);
            });
            socket.on('remove_notification', (payload) => {
                console.log("Thu hồi thông báo ID:", payload.id);

                setNotifications(prev => {
                    // Lọc bỏ thông báo có ID trùng với payload.id
                    const newList = prev.filter(n => n.id !== payload.id);

                    // Cập nhật lại số lượng chưa đọc (unreadCount)
                    // Logic: đếm lại số item chưa đọc trong danh sách mới
                    const newUnreadCount = newList.filter(n => !n.isRead).length;
                    setUnreadCount(newUnreadCount);

                    return newList;
                });
            });
        }

        // Fallback: Vẫn giữ polling 30s để đồng bộ nếu socket bị miss (tùy chọn)
        const interval = setInterval(fetchNotifications, 30000);

        // Cleanup
        return () => {
            socket.off('new_notification');
            clearInterval(interval);
        };
    }, [user]);

    // 3. Xử lý đọc thông báo
    const handleRead = async (notif) => {
        // Nếu chưa đọc thì mới gọi API
        if (!notif.isRead) {
            try {
                // Update UI ngay lập tức (Optimistic update)
                setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, isRead: true } : n));
                setUnreadCount(prev => Math.max(0, prev - 1)); // Tránh bị âm

                // Gọi API background
                await apiClient.put(`/notifications/${notif.id}/read`);
            } catch (error) {
                console.error("Lỗi đánh dấu đã đọc");
            }
        }
    };

    // Scroll Effect
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    return (
        <header className={`header ${isAuthenticated ? 'logged-in' : ''} ${isScrolled ? 'header-scrolled' : ''}`}>
            <div className="nav-container">
                <Link to="/">
                    <img className="logo" src={logo} alt="Logo" />
                </Link>

                <nav>
                    <ul className="nav-menu">
                        <li><Link to={'/'}>Trang Chủ</Link></li>
                        <li><Link to={'/shop'}>Tác phẩm</Link></li>
                        <li className="nav-search">
                            <input
                                type="text"
                                placeholder="Tìm kiếm nghệ sĩ, tác phẩm..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={handleSearch} // Lắng nghe phím Enter
                            />
                        </li>

                        {/* Chỉ hiện các nút chức năng khi đã đăng nhập */}
                        {isAuthenticated ? (
                            <>
                                <li className="nav-user-actions">
                                    <Link to={'/upload'} className="nav-button">Đăng Bài</Link>
                                </li>

                                {/* --- KHU VỰC THÔNG BÁO --- */}
                                <div className="notif-container"
                                    onMouseEnter={() => setShowNotif(true)}
                                    onMouseLeave={() => setShowNotif(false)}
                                >
                                    <button className="notif-btn">
                                        🔔
                                        {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
                                    </button>

                                    {showNotif && (
                                        <div className="notif-dropdown">
                                            <h4>Thông báo</h4>

                                            <ul className="notif-list">
                                                {notifications.length === 0 ? (
                                                    <p className="no-notif">Chưa có thông báo nào.</p>
                                                ) : (
                                                    notifications.slice(0, 5).map(notif => (
                                                        <li key={notif.id}
                                                            className={`notif-item-wrapper ${notif.isRead ? 'read' : 'unread'}`}
                                                            onClick={() => handleRead(notif)}
                                                        >
                                                            <Link to={`/artwork/${notif.artworkId}`} className="notif-item">
                                                                {/* Avatar người gửi */}
                                                                <img
                                                                    src={notif.sender?.avatarUrl ? `${BE_URL}${notif.sender.avatarUrl}` : 'https://via.placeholder.com/40'}
                                                                    alt="" className="notif-avatar"
                                                                />

                                                                <div className="notif-content">
                                                                    <strong>{notif.sender?.name || 'Người dùng'}</strong>
                                                                    <span>
                                                                        {notif.type === 'LIKE' ? ' đã thích tác phẩm của bạn.' : ' đã bình luận.'}
                                                                    </span>
                                                                    <br />
                                                                    <small>{new Date(notif.createdAt).toLocaleDateString('vi-VN')}</small>
                                                                </div>

                                                                {/* Ảnh thumbnail tác phẩm (Check kỹ JSON.parse) */}
                                                                {notif.artwork?.imageUrls && (
                                                                    <img
                                                                        src={`${BE_URL}${JSON.parse(notif.artwork.imageUrls)[0]}`}
                                                                        alt="" className="notif-thumb"
                                                                    />
                                                                )}
                                                            </Link>
                                                        </li>
                                                    ))
                                                )}
                                            </ul>

                                            {notifications.length > 5 && (
                                                <div className="view-more-container">
                                                    <Link to="/notifications" className="view-more-btn">Xem tất cả</Link>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                                {/* --- END THÔNG BÁO --- */}

                                <li className="nav-user-profile">
                                    <Link to={`/profile/${user?.id}`} className="user-avatar-link">
                                        <img
                                            src={user?.avatarUrl ? `${BE_URL}${user.avatarUrl}` : 'https://via.placeholder.com/40'}
                                            alt="Avatar" className="header-avatar"
                                        />
                                        <span>{user?.name}</span>
                                    </Link>
                                    <div className="profile-dropdown">
                                        <Link to={`/profile/${user?.id}`}>Hồ sơ</Link>
                                        <Link onClick={logout}>Đăng xuất</Link>
                                    </div>
                                </li>
                            </>
                        ) : (
                            // Chưa đăng nhập
                            <>
                                <li className="nav-guest"><Link to={'/register'} className="nav-button-outline">Đăng Ký</Link></li>
                                <li className="nav-guest"><Link to={'/login'} className="nav-button">Đăng Nhập</Link></li>
                            </>
                        )}
                    </ul>
                </nav>
                <button className={`hamburger-menu ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                    <div className="bar" /><div className="bar" /><div className="bar" />
                </button>
            </div>
            <nav class={`mobile-nav ${isMenuOpen ? 'show-nav' : ''}`}>
                <ul>
                    <li><Link to={'/'}>Trang Chủ</Link></li>
                    <li><Link href="/shop">Cửa Hàng</Link></li>
                    <li><a href="/notifications.html">Thông Báo</a></li>
                    <li><Link to={'/upload'} class="nav-button">Đăng Bài</Link></li>
                    <li><Link to={'/register'} class="nav-button-outline">Đăng Ký</Link></li>
                    <li><Link to={'/login'} class="nav-button">Đăng Nhập</Link></li>
                </ul>
            </nav>
        </header>
    );
}
export default Header;