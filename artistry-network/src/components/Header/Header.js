import { useEffect, useState } from 'react';
import logo from '../../assets/images/logomain.jpg';
import './Header.css';
import { Link } from 'react-router-dom';
function Header() {
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
        <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
            <div className="nav-container">
                <a href="index.html">
                    <img className="logo" src={logo} alt="ArtistryNetwork Logo" />
                </a>
                <nav>
                    <ul className="nav-menu">
                        <li><a href="index.html">Trang Chủ</a></li>
                        <li><a href="shop.html">Cửa Hàng</a></li>
                        <li className="nav-search">
                            <input type="text" placeholder="Tìm kiếm nghệ sĩ, tác phẩm..." />
                        </li>
                        <li className="nav-user-actions">
                            <a href="upload.html" className="nav-button">Đăng Bài</a>
                        </li>
                        <li className="nav-user-actions">
                            <a href="notifications.html" className="nav-icon" title="Thông báo">🔔</a>
                        </li>
                        <li className="nav-user-profile">
                            <a href="profile.html" className="user-avatar-link">
                                <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop" alt="User Avatar" className="header-avatar" />
                                <span>Elena Rodriguez</span>
                            </a>
                            <div className="profile-dropdown">
                                <a href="profile.html">Hồ sơ của tôi</a>
                                <a href="#">Lịch sử đơn hàng</a>
                                <a href="#">Cài đặt</a>
                                <a href="#">Đăng xuất</a>
                            </div>
                        </li>
                        <li className="nav-guest"><a href="register.html" className="nav-button-outline">Đăng Ký</a></li>
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
                    <li><a href="/index.html">Trang Chủ</a></li>
                    <li><a href="/shop.html">Cửa Hàng</a></li>
                    <li><a href="/notifications.html">Thông Báo</a></li>
                    <li><a href="./upload.html" class="nav-button">Đăng Bài</a></li>
                    <li><a href="#signup" class="nav-button-outline">Đăng Ký</a></li>
                    <li><a href="#login" class="nav-button">Đăng Nhập</a></li>
                </ul>
            </nav>
        </header>
    );
}
export default Header;