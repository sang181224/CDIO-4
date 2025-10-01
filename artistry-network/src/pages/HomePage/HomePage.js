import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Banner from '../../components/Banner/Banner';
import PostCard from '../../components/PostCard/PostCard';
import Slider from '../../components/Slider/Slider';

import './HomePage.css';
import '../../components/Button/button.css';

// Import các hàm API giả lập
import { apiClient, getFeaturedArtworks, getLatestArtworks } from '../../api/apiService';

const dummyArtists = [
    { id: 'user123', name: 'Elena Rodriguez', avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956' },
    { id: 'user456', name: 'Kenji Watanabe', avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2' },
    { id: 'user789', name: 'Marcus Cole', avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d' },
];

function HomePage() {
    const [featuredArtworks, setFeaturedArtworks] = useState([]);
    const [latestArtworks, setLatestArtworks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [featuredData, latestData] = await Promise.all([
                    apiClient.get('/artwork/featured'),
                    apiClient.get('/artwork/latest'),
                    // getFeaturedArtworks(),
                    // getLatestArtworks()
                ]);
                console.log(featuredData)
                setFeaturedArtworks(featuredData.data);
                setLatestArtworks(latestData.data);
            } catch (err) {
                setError('Không thể tải dữ liệu trang chủ. Vui lòng thử lại sau.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    if (isLoading) {
        return <div style={{ paddingTop: '100px', textAlign: 'center' }}>Đang tải trang...</div>;
    }
    if (error) {
        return <div style={{ paddingTop: '100px', textAlign: 'center' }}>{error}</div>;
    }

    return (
        <>
            <Banner />
            <main className="homepage-content">
                <section className="home-section featured-artworks">
                    <div className="home-section-container">
                        <div className="home-section-header">
                            <h2 className="home-section-title">Tác phẩm Nổi bật</h2>
                            <Link to="/shop" className="btn-view-all">Xem tất cả &rarr;</Link>
                        </div>
                        <Slider>
                            {featuredArtworks.map(art => (
                                <PostCard key={art.id} artwork={art} isOwner={art.is_owner} />
                            ))}
                        </Slider>
                    </div>
                </section>

                <section className="home-section category-showcase">
                    <div className="home-section-container">
                        <h2 className="home-section-title">Khám phá theo Thể loại</h2>
                        <div className="category-grid">
                            <Link to="/shop?category=painting" className="category-card" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1536924430914-94f3302a50a5?q=80&w=2070&auto=format&fit=crop')" }}><h3>Hội họa</h3></Link>
                            <Link to="/shop?category=sculpture" className="category-card" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1620050811233-586455a73229?q=80&w=1974&auto=format&fit=crop')" }}><h3>Điêu khắc</h3></Link>
                            <Link to="/shop?category=photography" className="category-card" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1505238680356-6678fb750953?q=80&w=1994&auto=format&fit=crop')" }}><h3>Nhiếp ảnh</h3></Link>
                            <Link to="/shop?category=digital" className="category-card" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop')" }}><h3>Kỹ thuật số</h3></Link>
                        </div>
                    </div>
                </section>

                <section className="home-section artist-spotlight">
                    <div className="home-section-container">
                        <h2 className="home-section-title">Nghệ sĩ Tiêu biểu</h2>
                        <Slider>
                            {dummyArtists.map(artist => (
                                <Link to={`/profile/${artist.id}`} key={artist.id} className="artist-card">
                                    <img src={artist.avatarUrl} alt={artist.name} />
                                    <h4>{artist.name}</h4>
                                </Link>
                            ))}
                        </Slider>
                    </div>
                </section>

                <section className="home-section cta-section">
                    <div className="home-section-container cta-content">
                        <h2>Trở thành một phần của ArtistryNetwork</h2>
                        <p>Tham gia cộng đồng, chia sẻ tác phẩm và kết nối với những người yêu nghệ thuật.</p>
                        <div className="cta-buttons">
                            <Link to="/register" className="btn btn-primary">Đăng ký ngay</Link>
                            <Link to="/upload" className="btn btn-secondary">Đăng tải Tác phẩm</Link>
                        </div>
                    </div>
                </section>

                <section className="home-section latest-artworks">
                    <div className="home-section-container">
                        <div className="home-section-header">
                            <h2 className="home-section-title">Tác phẩm Mới nhất</h2>
                            <Link to="/shop" className="btn-view-all">Xem tất cả &rarr;</Link>
                        </div>
                        <Slider>
                            {latestArtworks.map(art => (
                                <PostCard key={art.id} artwork={art} isOwner={art.is_owner} />
                            ))}
                        </Slider>
                    </div>
                </section>
            </main>
        </>
    );
}

export default HomePage;