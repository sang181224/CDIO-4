import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostCard from '../../components/PostCard/PostCard';
import Sidebar from '../../components/Sidebar/Sidebar';
import Pagination from '../../components/Pagination/Pagination';
import '../../components/Layout/Layout.css';
import './ShopPage.css';
import { useAuth } from '../../hooks/useAuth';

// Ánh xạ key của khoảng giá sang giá trị min/max để gửi cho API
const priceRangeMap = {
    'range1': { minPrice: 0, maxPrice: 1000000 },
    'range2': { minPrice: 1000000, maxPrice: 5000000 },
    'range3': { minPrice: 5000000 },
};

function ShopPage() {
    const { token } = useAuth();
    const [artworks, setArtworks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFilters] = useState({
        sortBy: 'newest',
        categoryId: null,
        priceRange: 'all',
    });
    const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });

    useEffect(() => {
        const fetchArtworks = async () => {
            setIsLoading(true);
            try {
                // Xây dựng các tham số cho API
                const params = new URLSearchParams({
                    page: pagination.currentPage,
                    sortBy: filters.sortBy,
                });

                if (filters.categoryId) {
                    params.append('categoryId', filters.categoryId);
                }

                // Lấy giá trị min/max từ map và thêm vào params
                const priceFilter = priceRangeMap[filters.priceRange];
                if (priceFilter) {
                    if (priceFilter.minPrice !== undefined) params.append('minPrice', priceFilter.minPrice);
                    if (priceFilter.maxPrice !== undefined) params.append('maxPrice', priceFilter.maxPrice);
                }
                const config = {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                };
                const response = await axios.get(`http://localhost:3000/api/artworks?${params.toString()}`, config);
                setArtworks(response.data.artworks);
                setPagination(prev => ({ ...prev, totalPages: response.data.totalPages }));
                console.log(response.data.artworks)
            } catch (error) {
                console.error("Lỗi khi tải tác phẩm:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchArtworks();
    }, [filters, pagination.currentPage]);

    // Hàm được truyền xuống Sidebar để cập nhật state ở đây (component cha)
    const handleFilterChange = (filterName, value) => {
        setFilters(prev => ({ ...prev, [filterName]: value }));
        setPagination(prev => ({ ...prev, currentPage: 1 })); // Luôn reset về trang 1 khi lọc
    };

    // Hàm được truyền xuống Pagination
    const handlePageChange = (pageNumber) => {
        setPagination(prev => ({ ...prev, currentPage: pageNumber }));
    };

    return (
        <main className="shop-page">
            <section className="shop-header">
                <h1>Khám phá Tác phẩm</h1>
                <p>Tìm kiếm và chiêm ngưỡng những sáng tạo độc đáo từ cộng đồng.</p>
            </section>

            <section className="feed-section">
                <div className="feed-layout">
                    <Sidebar filters={filters} onFilterChange={handleFilterChange} />
                    <div className="main-content">
                        {isLoading ? (
                            <div>Đang tải...</div>
                        ) : (
                            <main className="artwork-grid">
                                {artworks.length > 0 ? (
                                    artworks.map(art => <PostCard key={art.id} artwork={art} isOwner={art.isOwner} />)
                                ) : (
                                    <p>Không tìm thấy tác phẩm nào phù hợp.</p>
                                )}
                            </main>
                        )}
                        <Pagination
                            currentPage={pagination.currentPage}
                            totalPages={pagination.totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </section>
        </main>
    );
}

export default ShopPage;