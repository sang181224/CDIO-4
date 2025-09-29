import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import axios from 'axios'; // Bỏ comment khi kết nối API thật
import './DetailPage.css';
import ProductInfo from '../ProductInfo/ProductInfo';
import ArtworkSlider from '../../components/ArtworkSlider/ArtworkSlider';
import CommentSection from '../../components/CommentSection/CommentSection';

// Import các component con (chúng ta sẽ tạo chúng sau)
// import ArtworkSlider from '../../components/ArtworkSlider/ArtworkSlider';
// import ProductInfo from '../../components/ProductInfo/ProductInfo';
// import CommentSection from '../../components/CommentSection/CommentSection';
// import RelatedProducts from '../../components/RelatedProducts/RelatedProducts';

// Dữ liệu giả lập cho đến khi có API
const dummyArtworkDetail = {
    id: "art001",
    ten: "Vũ Điệu Dưới Ánh Hoàng Hôn",
    anh: [
        "https://images.saatchiart.com/saatchi/599547/art/6249103/5318875-HSC00002-7.jpg",
        "https://images.saatchiart.com/saatchi/599547/art/6249103/additional_1d85926ba8708f1d58473d3d324801ad06ca2708-AICC2-7.jpg",
        "https://images.saatchiart.com/saatchi/599547/art/6249103/additional_329d05e6604ebb216cc0ed6289ecb8feed9ca799-AICC2-7.jpg"
    ],
    gia: "3,500,000 VNĐ",
    ngayDang: "5 phút trước",
    mota: "Sử dụng kỹ thuật sơn dầu đa lớp, tác phẩm này thể hiện sự chuyển động của ánh sáng và màu sắc trong khoảnh khắc cuối ngày, mang lại cảm giác ấm áp nhưng cũng đầy suy tư. Bức tranh không chỉ ghi lại một phong cảnh, mà còn là sự suy tư về dòng chảy của thời gian và vẻ đẹp của những khoảnh khắc thoáng qua. Mỗi lớp màu được đắp nổi, tạo ra một bề mặt có chiều sâu và kết cấu độc đáo, mời gọi người xem không chỉ nhìn mà còn cảm nhận.",
    thuocTinh: {
        kichThuoc: "80cm x 120cm",
        chatLieu: "Sơn dầu trên vải canvas",
        namSangTac: 2024,
        trangThai: "Còn hàng"
    },
    thongKe: {
        luotThich: 125,
        luotBinhLuan: 12
    },
    nguoiTao: {
        id: "user123",
        ten: "Elena Rodriguez",
        anhDaiDien: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
        email: "elena.r@example.com"
    },
    camXucCuaToi: "love",
    is_owner: true
};


function DetailPage() {
    const { id } = useParams();

    const [artwork, setArtwork] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // useEffect để gọi API khi component được render hoặc id thay đổi
    useEffect(() => {
        const fetchArtworkDetail = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // const response = await axios.get(`http://localhost:3100/api/artworks/${id}`);
                // setArtwork(response.data);

                setArtwork(dummyArtworkDetail);

            } catch (err) {
                setError('Không thể tải được thông tin tác phẩm. Vui lòng thử lại.');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchArtworkDetail();
    }, [id]); // Mảng phụ thuộc [id] giúp component tự tải lại dữ liệu khi bạn chuyển qua xem tác phẩm khác

    if (isLoading) {
        return <div className="page-loading">Đang tải...</div>;
    }

    if (error) {
        return <div className="page-error">{error}</div>;
    }

    if (!artwork) {
        return <div className="page-error">Không tìm thấy tác phẩm.</div>;
    }

    return (
        <main className="product-detail-page">
            <div className="detail-container">
                <div className="product-image-gallery">
                    <ArtworkSlider images={artwork.anh} />
                </div>
                <div className="product-info">
                    <ProductInfo artwork={artwork} />
                    <p>Thông tin tác phẩm sẽ ở đây</p>
                </div>
            </div>

            <CommentSection artworkId={artwork.id} />

            <section className="related-products">
                {/* <RelatedProducts /> */}
                <p>Tác phẩm liên quan sẽ ở đây</p>
            </section>
        </main>
    );
}

export default DetailPage;