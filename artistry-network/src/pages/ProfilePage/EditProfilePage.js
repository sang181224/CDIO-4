import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { apiClient } from '../../api/apiService';
import './EditProfilePage.css';

function EditProfilePage() {
    const { user, token } = useAuth();
    const navigate = useNavigate();

    // State cho dữ liệu form
    const [formData, setFormData] = useState({ name: '', bio: '' });
    // State riêng cho các file ảnh mới
    const [avatarFile, setAvatarFile] = useState(null);
    const [coverFile, setCoverFile] = useState(null);
    // State cho ảnh xem trước
    const [avatarPreview, setAvatarPreview] = useState('');
    const [coverPreview, setCoverPreview] = useState('');

    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState({});

    // Ref để có thể "bấm" vào các input file bị ẩn
    const avatarInputRef = useRef(null);
    const coverInputRef = useRef(null);

    // Tải dữ liệu profile hiện tại của người dùng khi trang được mở
    useEffect(() => {
        const fetchCurrentProfile = async () => {
            setIsLoading(true);
            try {
                // Gọi API thật để lấy dữ liệu mới nhất
                const response = await apiClient.get(`/profiles/${user.id}`);
                const currentUserData = response.data.profile;
                console.log(currentUserData)
                setFormData({
                    name: currentUserData.name || '',
                    bio: currentUserData.bio || '',
                });
                if (currentUserData.avatarUrl) setAvatarPreview(`http://localhost:3000/${currentUserData.avatarUrl}`);
                if (currentUserData.coverPhotoUrl) setCoverPreview(`http://localhost:3000/${currentUserData.coverPhotoUrl}`);

            } catch (error) {
                console.error("Lỗi khi tải thông tin hồ sơ:", error);
                setErrors({ general: 'Không thể tải dữ liệu.' });
            } finally {
                setIsLoading(false);
            }
        };
        fetchCurrentProfile();
    }, []); // Chỉ chạy 1 lần khi component được mount

    // Hàm xử lý khi người dùng nhập text
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Hàm xử lý khi người dùng chọn file ảnh
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

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Họ tên không được để trống.';
        if (formData.bio && formData.bio.length > 500) newErrors.bio = 'Tiểu sử không được dài quá 500 ký tự.';
        // Có thể thêm validation cho file ở đây
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    // Hàm xử lý khi gửi form
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setIsLoading(true);
        const data = new FormData();
        data.append('name', formData.name);
        data.append('bio', formData.bio);
        if (avatarFile) data.append('avatar', avatarFile);
        if (coverFile) data.append('coverPhoto', coverFile);

        try {
            const config = {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }
            await apiClient.put('/profiles/me',data, config);
            alert('Cập nhật hồ sơ thành công!');
            navigate(`/profile/${user.id}`);
        } catch (error) {
            console.error("Lỗi khi cập nhật hồ sơ:", error);
            setErrors({ general: error.response?.data?.message || 'Cập nhật thất bại.' });
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) return <div style={{ paddingTop: '120px', textAlign: 'center' }}>Đang tải...</div>;

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
                                {avatarPreview ? <img src={avatarPreview} alt="Xem trước avatar" /> : <div className="placeholder-image"></div>}
                                <div className="upload-overlay">Thay đổi</div>
                            </div>
                            <input type="file" name="avatar" ref={avatarInputRef} hidden onChange={handleFileChange} accept="image/*" />
                        </div>
                        <div className="form-group file-upload">
                            <label>Ảnh bìa</label>
                            <div className="image-preview cover-preview" onClick={() => coverInputRef.current.click()}>
                                {coverPreview ? <img src={coverPreview} alt="Xem trước ảnh bìa" /> : <div className="placeholder-image"></div>}
                                <div className="upload-overlay">Thay đổi</div>
                            </div>
                            <input type="file" name="coverPhoto" ref={coverInputRef} hidden onChange={handleFileChange} accept="image/*" />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Họ và Tên</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} />
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