import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';
// import '../../components/Layout/Layout.css';
import PostCard from '../../components/PostCard/PostCard';
import './ProfilePage.css';
import { apiClient } from '../../api/apiService';
import DraftCard from '../../components/DraftCard/DraftCard';

function ProfilePage() {
    const { userId } = useParams();
    const { token } = useAuth();

    // State cho từng phần dữ liệu
    const [profileData, setProfileData] = useState(null);
    const [stats, setStats] = useState(null);
    const [artworks, setArtworks] = useState([]);
    const [drafts, setDrafts] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('artworks');

    useEffect(() => {
        const fetchAllProfileData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const config = { headers: { Authorization: `Bearer ${token}` } };
                console.log(config);

                // Gọi song song các API chính để tăng tốc
                const [profileRes, statsRes, artworksRes] = await Promise.all([
                    apiClient.get(`/profiles/${userId}`, config),
                    apiClient.get(`/profiles/${userId}/stats`),
                    apiClient.get(`/profiles/${userId}/artworks`, config)
                ]);

                // Gán dữ liệu vào state
                setProfileData(profileRes.data);
                setStats(statsRes.data);
                setArtworks(artworksRes.data);
                console.log(artworksRes);

                // Nếu là chủ nhân, gọi thêm API lấy bản nháp
                if (profileRes.data.isOwner) {
                    const draftsRes = await apiClient.get(`/profiles/${userId}/drafts`, config);
                    setDrafts(draftsRes.data);
                }

            } catch (err) {
                console.error("Lỗi khi tải hồ sơ:", err);
                setError("Không thể tải dữ liệu hồ sơ. Vui lòng thử lại.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllProfileData();
    }, [userId]);

    if (isLoading) return <div style={{ paddingTop: '120px', textAlign: 'center' }}>Đang tải hồ sơ...</div>;
    if (error) return <div style={{ paddingTop: '120px', textAlign: 'center' }}>{error}</div>;
    if (!profileData) return <div style={{ paddingTop: '120px', textAlign: 'center' }}>Không tìm thấy hồ sơ.</div>;

    const { isOwner, profile } = profileData;

    const renderTabContent = () => {
        switch (activeTab) {
            case 'artworks':
                return (
                    <div className="artwork-grid">
                        {artworks.length > 0 ? (
                            artworks.map(art => <PostCard key={art.id} artwork={art} isOwner={isOwner} />)
                        ) : (
                            <p>Chưa có tác phẩm nào được đăng.</p>
                        )}
                    </div>
                );
            case 'about':
                return (
                    <div className="about-tab">
                        <h3>Tiểu sử</h3>
                        <p>{profile.bio || 'Chưa có thông tin giới thiệu.'}</p>
                        {profile.skills && profile.skills.length > 0 && (
                            <>
                                <h3>Kỹ năng</h3>
                                <div className="skills-list">
                                    {profile.skills.map(skill => <span key={skill} className="skill-tag">{skill}</span>)}
                                </div>
                            </>
                        )}
                    </div>
                );
            case 'drafts':
                return isOwner ? (
                    <div className="draft-list">
                        {drafts.length > 0 ? (
                            drafts.map(draft => (
                                <DraftCard key={draft.id} draft={draft} />
                                // Bạn có thể tạo một component DraftCard riêng cho đẹp hơn
                                // <div key={draft.id} className="draft-card">
                                //     {/* ... nội dung bản nháp ... */}
                                // </div>
                            ))
                        ) : (
                            <p>Không có bản nháp nào.</p>
                        )}
                    </div>
                ) : null;
            default:
                return null;
        }
    };

    return (
        <main className="profile-page">
            <header className="profile-header">
                <div className="profile-cover">
                    <img src={profile.coverPhotoUrl || 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809'} alt="Ảnh bìa" />
                </div>
                <div className="profile-actions">
                    {isOwner ? (
                        <button className="btn-profile btn-secondary-profile">Chỉnh sửa hồ sơ</button>
                    ) : (
                        <div style={{gap: '5px', display: 'flex'}}>
                            <button className="btn-profile btn-primary-profile">Theo dõi</button>
                            <button className="btn-profile btn-primary-profile">Nhắn tin</button>
                        </div>

                    )}
                </div>
                <div className="profile-info-card">
                    <div className="profile-avatar-wrapper">
                        <img src={profile.avatarUrl} alt={profile.name} className="profile-avatar" />
                    </div>
                    <div className="profile-details">
                        <h1 className="profile-name">{profile.name}</h1>
                        <p className="profile-level">{profile.level || 'Thành viên'}</p>
                        {stats && (
                            <div className="profile-stats">
                                <span><strong>{stats.artworks}</strong> Tác phẩm</span>
                                <span><strong>{stats.followers}</strong> Người theo dõi</span>
                                <span><strong>{stats.following}</strong> Đang theo dõi</span>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <div className="profile-body">
                <nav className="profile-tabs">
                    <a href="#artworks" className={`tab-item ${activeTab === 'artworks' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('artworks'); }}>Tác phẩm</a>
                    <a href="#about" className={`tab-item ${activeTab === 'about' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('about'); }}>Giới thiệu</a>
                    {isOwner && (
                        <a href="#drafts" className={`tab-item ${activeTab === 'drafts' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('drafts'); }}>Quản lý bài đăng</a>
                    )}
                </nav>
                <section className="profile-content">
                    {renderTabContent()}
                </section>
            </div>
        </main>
    );
}

export default ProfilePage;