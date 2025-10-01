import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './EditProfilePage.css'; // Đảm bảo bạn đã tạo file CSS này

function EditProfilePage() {
    const { user, token } = useAuth();
    const navigate = useNavigate();

    // State cho các trường input
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        bio: '',
    });

    // State riêng cho các file ảnh
    const [avatarFile, setAvatarFile] = useState(null);
    const [coverFile, setCoverFile] = useState(null);

    // State để hiển thị ảnh xem trước (preview)
    const [avatarPreview, setAvatarPreview] = useState('');
    const [coverPreview, setCoverPreview] = useState('');

    const [isLoading, setIsLoading] = useState(true); // Bắt đầu với loading
    const [errors, setErrors] = useState({});

    // Ref để có thể "bấm" vào các input file bị ẩn
    const avatarInputRef = useRef(null);
    const coverInputRef = useRef(null);

    // Tải dữ liệu profile hiện tại của người dùng khi trang được mở
    useEffect(() => {
        const fetchCurrentProfile = async () => {
            try {
                // Sau này, bạn sẽ gọi API thật ở đây, ví dụ:
                // const response = await axios.get('/api/profiles/me', { headers: { Authorization: `Bearer ${token}` } });
                // const currentUserData = response.data.profile;

                // Hiện tại dùng dữ liệu giả lập từ context
                const currentUserData = {
                    name: user.name,
                    email: user.email,
                    avatarUrl: user.avatarUrl,
                    coverPhotoUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809', // Ảnh bìa mẫu
                    bio: 'Đây là tiểu sử của tôi...',
                };

                setFormData({
                    name: currentUserData.name,
                    email: currentUserData.email,
                    bio: currentUserData.bio,
                });
                setAvatarPreview(currentUserData.avatarUrl);
                setCoverPreview(currentUserData.coverPhotoUrl);

            } catch (error) {
                console.error("Lỗi khi tải thông tin hồ sơ:", error);
                setErrors({ general: 'Không thể tải dữ liệu.' });
            } finally {
                setIsLoading(false);
            }
        };

        if (user) {
            fetchCurrentProfile();
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files && files[0]) {
            const file = files[0];
            const previewUrl = URL.createObjectURL(file);
            if (name === 'avatar') {
                setAvatarFile(file);
                setAvatarPreview(previewUrl);
            } else if (name === 'coverPhoto') {
                setCoverFile(file);
                setCoverPreview(previewUrl);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const data = new FormData();
        data.append('name', formData.name);
        data.append('email', formData.email);
        data.append('bio', formData.bio);
        if (avatarFile) data.append('avatar', avatarFile);
        if (coverFile) data.append('coverPhoto', coverFile);

        try {
            // await axios.put('/api/profiles/me', data, { headers: ... });
            alert('Cập nhật hồ sơ thành công!');
            navigate(`/profile/${user.id}`);
        } catch (error) {
            console.error("Lỗi khi cập nhật hồ sơ:", error);
            setErrors({ general: 'Cập nhật thất bại, vui lòng thử lại.' });
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) return <div>Đang tải...</div>;

    return (
        <main className="edit-profile-page">
            <div className="edit-profile-container">
                <h1>Chỉnh sửa Hồ sơ</h1>
                {errors.general && <p className="error-text">{errors.general}</p>}

                <form className="edit-profile-form" onSubmit={handleSubmit}>
                    <div className="form-group-row">
                        <div className="form-group file-upload">
                            <label>Ảnh đại diện</label>
                            <div className="image-preview avatar-preview" onClick={() => avatarInputRef.current.click()}>
                                {avatarPreview && <img src={avatarPreview} alt="Xem trước avatar" />}
                                <div className="upload-overlay">Thay đổi</div>
                            </div>
                            <input type="file" name="avatar" ref={avatarInputRef} hidden onChange={handleFileChange} />
                        </div>
                        <div className="form-group file-upload">
                            <label>Ảnh bìa</label>
                            <div className="image-preview cover-preview" onClick={() => coverInputRef.current.click()}>
                                {coverPreview && <img src={coverPreview} alt="Xem trước ảnh bìa" />}
                                <div className="upload-overlay">Thay đổi</div>
                            </div>
                            <input type="file" name="coverPhoto" ref={coverInputRef} hidden onChange={handleFileChange} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Họ và Tên</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email (Không thể thay đổi)</label>
                        <input type="email" id="email" name="email" value={formData.email} readOnly disabled />
                    </div>
                    <div className="form-group">
                        <label htmlFor="bio">Tiểu sử</label>
                        <textarea id="bio" name="bio" rows="5" value={formData.bio} onChange={handleInputChange}></textarea>
                    </div>

                    <div className="form-actions">
                        <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>Hủy bỏ</button>
                        <button type="submit" className="btn btn-primary" disabled={isLoading}>
                            {isLoading ? 'Đang lưu...' : 'Lưu thay đổi'}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default EditProfilePage;