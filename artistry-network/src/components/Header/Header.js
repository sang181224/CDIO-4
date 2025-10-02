import { useEffect, useState } from 'react';
import logo from '../../assets/images/logomain.jpg';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
function Header() {
    const navigate = useNavigate();
    const { user, logout, isAuthenticated } = useAuth();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    //Xử lý cuộn trang
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Cleanup function: gỡ bỏ event listener khi component bị unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    //Ẩn hiện hamberger
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    return (
        <header className={`header ${isAuthenticated ? 'logged-in' : ''} ${isScrolled ? 'header-scrolled' : ''}`}>
            <div className="nav-container">
                <a href="index.html">
                    <img className="logo" src={logo} alt="ArtistryNetwork Logo" />
                </a>
                <nav>
                    <ul className="nav-menu">
                        <li><Link to={'/'}>Trang Chủ</Link></li>
                        <li><Link to={'/shop'}>Cửa Hàng</Link></li>
                        <li className="nav-search">
                            <input type="text" placeholder="Tìm kiếm nghệ sĩ, tác phẩm..." />
                        </li>
                        <li className="nav-user-actions">
                            <Link to={'/upload'} className="nav-button">Đăng Bài</Link>
                        </li>
                        <li className="nav-user-actions">
                            <a href="notifications.html" className="nav-icon" title="Thông báo">🔔</a>
                        </li>
                        <li className="nav-user-profile">
                            <Link to={`/profile/${user?.id}`} className="user-avatar-link">
                                {user && (
                                    <>
                                        <img src={user.avatarUrl ? `http://localhost:3000/${user.avatarUrl}` : ''} alt="User Avatar" className="header-avatar" />
                                        <span>{user.name}</span>
                                    </>
                                )}

                            </Link>
                            <div className="profile-dropdown">
                                <Link to={`/profile/${user?.id}`}>Hồ sơ của tôi</Link>
                                <a href="#">Cài đặt</a>
                                <a onClick={logout} href="#">Đăng xuất</a>
                            </div>
                        </li>
                        <li className="nav-guest"><Link to={'/register'} className="nav-button-outline">Đăng Ký</Link></li>
                        <li className="nav-guest"><Link to={'/login'} className="nav-button">Đăng Nhập</Link></li>
                    </ul>
                </nav>
                <button className={`hamburger-menu ${isMenuOpen ? 'open' : ''}`} aria-label="Toggle menu" onClick={toggleMenu}>
                    <div className="bar" />
                    <div className="bar" />
                    <div className="bar" />
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