import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom'; // 1. Thêm cái này để lấy URL params
import PostCard from '../../components/PostCard/PostCard';
import Sidebar from '../../components/Sidebar/Sidebar';
import Pagination from '../../components/Pagination/Pagination';
import '../../components/Layout/Layout.css';
import './ShopPage.css';
import { useAuth } from '../../hooks/useAuth';

const priceRangeMap = {
    'range1': { minPrice: 0, maxPrice: 1000000 },
    'range2': { minPrice: 1000000, maxPrice: 5000000 },
    'range3': { minPrice: 5000000 },
};

function ShopPage() {
    const { token } = useAuth();
    const location = useLocation();

    // 3. Lấy giá trị 'q' từ URL (?q=từ-khóa)
    const searchQuery = new URLSearchParams(location.search).get('q') || "";

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
                const params = new URLSearchParams({
                    page: pagination.currentPage,
                    sortBy: filters.sortBy,
                });

                // Thêm các filter khác
                if (filters.categoryId) params.append('categoryId', filters.categoryId);
                const priceFilter = priceRangeMap[filters.priceRange];
                if (priceFilter) {
                    if (priceFilter.minPrice !== undefined) params.append('minPrice', priceFilter.minPrice);
                    if (priceFilter.maxPrice !== undefined) params.append('maxPrice', priceFilter.maxPrice);
                }

                // QUAN TRỌNG: Xác định Endpoint
                let endpoint = "http://localhost:3000/api/artworks";
                if (searchQuery) {
                    endpoint = "http://localhost:3000/api/artworks/search";
                    params.append('q', searchQuery);
                }

                const config = {
                    headers: { 'Authorization': 'Bearer ' + token }
                };

                const response = await axios.get(`${endpoint}?${params.toString()}`, config);

                // XỬ LÝ DỮ LIỆU ĐỔ RA (Fix lỗi trắng trang/không ra kết quả)
                if (searchQuery) {
                    // Nếu là search, API trả về mảng trực tiếp [...]
                    setArtworks(response.data);
                    setPagination(prev => ({ ...prev, totalPages: 1 })); // Search tạm để 1 trang
                } else {
                    // Nếu là shop bình thường, API trả về { artworks: [], totalPages: x }
                    setArtworks(response.data.artworks);
                    setPagination(prev => ({ ...prev, totalPages: response.data.totalPages }));
                }

            } catch (error) {
                console.error("Lỗi khi tải tác phẩm:", error);
                setArtworks([]); // Nếu lỗi thì set mảng rỗng để ko crash
            } finally {
                setIsLoading(false);
            }
        };
        fetchArtworks();
    }, [filters, pagination.currentPage, searchQuery, token]);

    const handleFilterChange = (filterName, value) => {
        setFilters(prev => ({ ...prev, [filterName]: value }));
        setPagination(prev => ({ ...prev, currentPage: 1 }));
    };

    const handlePageChange = (pageNumber) => {
        setPagination(prev => ({ ...prev, currentPage: pageNumber }));
    };

    return (
        <main className="shop-page">
            <section className="shop-header">
                {/* 6. Hiển thị tiêu đề linh hoạt dựa trên việc có đang search hay không */}
                <h1>{searchQuery ? `Kết quả cho: "${searchQuery}"` : "Khám phá Tác phẩm"}</h1>
                <p>{searchQuery ? `Tìm thấy ${artworks.length} kết quả.` : "Tìm kiếm và chiêm ngưỡng những sáng tạo độc đáo từ cộng đồng."}</p>
            </section>

            <section className="feed-section">
                <div className="feed-layout">
                    <Sidebar filters={filters} onFilterChange={handleFilterChange} />
                    <div className="main-content">
                        {isLoading ? (
                            <div className="loading-container">Đang tải...</div>
                        ) : (
                            <main className="artwork-grid">
                                {artworks.length > 0 ? (
                                    artworks.map(art => <PostCard key={art.id} artwork={art} isOwner={art.isOwner} />)
                                ) : (
                                    <div className="no-results">
                                        <p>Không tìm thấy tác phẩm nào phù hợp với "{searchQuery}".</p>
                                    </div>
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