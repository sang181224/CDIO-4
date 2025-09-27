import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
// import axios from 'axios';
import ArtworkSlider from '../../components/Slider/ArtworkSlider';
import './DetailPage.css';

// Dữ liệu giả lập
const dummyArtworkDetail = {
    id: 'art01',
    ten: 'Vũ Điệu Của Sắc Màu',
    gia: '3,500,000 VNĐ',
    moTaDayDu: 'Đây là mô tả đầy đủ và chi tiết về tác phẩm...',
    thuVienAnh: [
        { id: 'img1', url: 'https://images.saatchiart.com/saatchi/352287/art/10636865/9699351-KDSYLQQO-7.jpg' },
        { id: 'img2', url: 'https://images.saatchiart.com/saatchi/352287/art/10636865/additional_daba6f5030155cb724b496973b592b7f395e054b-AICC2-7.jpg' },
        { id: 'img3', url: 'https://images.saatchiart.com/saatchi/352287/art/10636865/additional_bb3c8397a9ef919eafe8805bd2836517812829a8-AICC2-7.jpg' },
    ],
    thuocTinh: { kichThuoc: '80cm x 120cm', chatLieu: 'Sơn dầu' },
    nguoiTao: { id: 'user123', ten: 'Elena Rodriguez', avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop', email: 'elena.r@example.com' },
    // ... các dữ liệu khác
};

function DetailPage() {
    const { id } = useParams();
    const [artwork, setArtwork] = useState(dummyArtworkDetail); // Dùng dữ liệu giả lập

    if (!artwork) return <div>Đang tải...</div>;

    return (
        <main className="product-detail-page">
            <div className="detail-container">
                {/* Cột trái: Slider ảnh */}
                <div className="product-image-gallery">
                    <ArtworkSlider images={artwork.thuVienAnh} />
                </div>

                {/* Cột phải: Thông tin */}
                <div className="product-info">
                    <div className="artist-info">
                        <Link to={`/profile/${artwork.nguoiTao.id}`}>
                            <img src={artwork.nguoiTao.avatarUrl} alt={artwork.nguoiTao.ten} className="artist-avatar" />
                        </Link>
                        <div>
                            <Link to={`/profile/${artwork.nguoiTao.id}`}>
                                <h3 className="artist-name">{artwork.nguoiTao.ten}</h3>
                            </Link>
                            {/* Nút theo dõi có thể thêm sau */}
                        </div>
                    </div>

                    <h1 className="product-title">{artwork.ten}</h1>
                    <p className="product-price">{artwork.gia}</p>

                    {/* Nút liên hệ */}
                    <div className="action-buttons">
                        <a href={`mailto:${artwork.nguoiTao.email}`} className="btn btn-primary">
                            Liên hệ nghệ sĩ để mua
                        </a>
                    </div>

                    {/* Mô tả và các thông tin khác */}
                    <div className="product-description">
                        <h4>Mô tả tác phẩm</h4>
                        <p>{artwork.moTaDayDu}</p>
                    </div>
                    <div className="product-meta">
                        <p><strong>Kích thước:</strong> {artwork.thuocTinh.kichThuoc}</p>
                        <p><strong>Chất liệu:</strong> {artwork.thuocTinh.chatLieu}</p>
                    </div>
                </div>
            </div>
            {/* ... Khu vực bình luận và tác phẩm liên quan sẽ được thêm sau ... */}
        </main>
    );
}
export default DetailPage;