import './Footer.css'
function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>Về ArtistryNetwork</h3>
                    <p style={{ color: 'rgba(224, 224, 224, 0.8)', lineHeight: '1.6' }}>
                        Cộng đồng nghệ thuật hàng đầu, kết nối những tâm hồn yêu nghệ thuật và tạo ra không gian sáng tạo
                        đầy
                        cảm hứng.
                    </p>
                    <div className="social-links">
                    </div>
                </div>
                <div className="footer-section">
                    <h3>Danh Mục</h3>
                    <a href="shop.html?category=hoaihoa">Hội họa</a>
                    <a href="shop.html?category=dieukhac">Điêu khắc</a>
                    <a href="shop.html?category=nhiepanh">Nhiếp ảnh</a>
                </div>
                <div className="footer-section">
                    <h3>Thông tin</h3>
                    <a href="about.html">Về chúng tôi</a>
                    <a href="contact.html">Liên hệ</a> <a href="faq.html">Trợ giúp/FAQ</a> <a href="terms.html">Điều khoản
                        Dịch
                        vụ</a>
                    <a href="policy.html">Chính sách Bảo mật</a>
                </div>
                <div className="footer-section">
                    <h3>Liên Hệ</h3>
                    <address style={{ color: 'rgba(224, 224, 224, 0.8)', lineHeight: '1.6', fontStyle: 'normal' }}>
                        📍 123 Đường Nghệ Thuật, Quận 1, TP.HCM<br />
                        📞 (+84) 123 456 789<br />
                        ✉️ info@artistrynetwork.vn
                    </address>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} ArtistryNetwork. Tất cả quyền được bảo lưu. | Thiết kế với ❤️ cho cộng đồng nghệ thuật Việt Nam</p>
            </div>
        </footer>
    );
}
export default Footer;