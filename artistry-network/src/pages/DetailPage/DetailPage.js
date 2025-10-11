import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
// import axios from 'axios'; // Bỏ comment khi kết nối API thật
import './DetailPage.css';
import ProductInfo from '../ProductInfo/ProductInfo';
import ArtworkSlider from '../../components/ArtworkSlider/ArtworkSlider';
import { apiClient } from '../../api/apiService';
import { useAuth } from '../../hooks/useAuth';
import CommentSection from '../../components/CommentSection/CommentSection';

function DetailPage() {
    const { id } = useParams();
    const { token } = useAuth();
    const [artwork, setArtwork] = useState(null);
    const [comments, setComments] = useState([]);
    // const [replyingToId, setReplyingToId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const useRefView = useRef(false);
    // useEffect để gọi API khi component được render hoặc id thay đổi
    useEffect(() => {
        if (useRefView.current === false) {
            const fetchArtworkDetail = async () => {
                setIsLoading(true);
                setError(null);
                const config = {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                }
                try {
                    const response = await apiClient.get(`/artwork/detail/${id}`, config);
                    const { comments: fetchComment, ...artworkDetail } = response.data;
                    // console.log(fetchComment);
                    setComments(fetchComment);
                    setArtwork(artworkDetail);
                    // console.log(artworkDetail);
                    // console.log(fetchComment)
                    apiClient.post(`/artwork/${id}/view `);
                    console.log(response.data)
                } catch (err) {
                    setError('Không thể tải được thông tin tác phẩm. Vui lòng thử lại.');
                    console.error(err);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchArtworkDetail();
        }
        return () => {
            useRefView.current = true;
        };

    }, [id]); // Mảng phụ thuộc [id] giúp component tự tải lại dữ liệu khi bạn chuyển qua xem tác phẩm khác

    const fetchComment = async () => {
        setIsLoading(true);
        const config = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }
        try {
            const response = await apiClient.get(`/artwork/detail/${id}`, config);
            const { comments: fetchComment, ...artworkDetail } = response.data;
            setComments(fetchComment);
            setArtwork(artworkDetail);
        } catch (err) {
            setError('Không thể tải được thông tin tác phẩm. Vui lòng thử lại.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }

    const handlePostSuccess = () => {
        fetchComment();
        // setReplyingToId(null);
    }

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
                    <ArtworkSlider images={JSON.parse(artwork.imageUrls)} />
                </div>
                <div className="product-info">
                    <ProductInfo artwork={artwork} />
                </div>
            </div>
            <CommentSection 
                artworkId={artwork.id} 
                comments={comments} 
                onPostSuccess={handlePostSuccess} 
            />



            <section className="related-products">
                {/* <RelatedProducts /> */}
                <p>Tác phẩm liên quan sẽ ở đây</p>
            </section>
        </main>
    );
}

export default DetailPage;