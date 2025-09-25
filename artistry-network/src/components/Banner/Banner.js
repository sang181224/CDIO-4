import './Banner.css'
function Banner() {
    return (
        <section className="banner" id="home">
            <div className="floating-art art-1">🎨</div>
            <div className="floating-art art-2">🖼️</div>
            <div className="floating-art art-3">✨</div>
            <div className="banner-content">
                <h1>Khám Phá Thế Giới Nghệ Thuật</h1>
                <p>Tìm kiếm, kết nối và chiêm ngưỡng hàng ngàn tác phẩm độc đáo từ khắp nơi trên thế giới.</p>
                <form className="banner-search-form">
                    <input type="text" placeholder="Nhập tên tác phẩm, nghệ sĩ..." />
                    <button type="submit">Tìm Kiếm</button>
                </form>
            </div>
        </section>
    );
}
export default Banner;