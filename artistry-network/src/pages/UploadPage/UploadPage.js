import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './UploadPage.css';
import { apiClient } from '../../api/apiService';
import RenderError from '../../components/Error/RenderError';

function UploadPage() {
    const { user } = useAuth(); // Lấy thông tin user để biết ai là tác giả
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [inputs, setInputs] = useState({
        title: '',
        description: '',
        price: '',
        dimensions: '',
        categoryId: '',
    });
    const [imageFiles, setImageFiles] = useState([]);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    // Lấy danh sách thể loại từ API khi trang được tải
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await apiClient.get('/admin/category/list');
                setCategories(response.data);
            } catch (error) {
                console.error("Không thể tải danh sách thể loại", error);
            }
        };
        fetchCategories();
    }, []);

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const selectedFile = Array.from(e.target.files);
        // Chuyển đổi FileList thành mảng
        setImageFiles(selectedFile);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrors({});
        let errorsSubmit = {};
        let flag = true;

        if (!inputs.title) {
            errorsSubmit.title = 'Vui lòng nhập tên tác phẩm';
            flag = false;
        }
        if (!inputs.description) {
            errorsSubmit.description = 'Vui lòng nhập mô tả';
            flag = false;
        }
        if (!inputs.price) {
            errorsSubmit.price = 'Vui lòng nhập giá';
            flag = false;
        }
        if (!inputs.dimensions) {
            errorsSubmit.dimensions = 'Vui lòng nhập kích cỡ';
            flag = false;
        }
        if (imageFiles.length === 0) {
            errorsSubmit.image = 'Vui lòng chọn image';
            flag = false;
        } else {
            const allowedFormat = ['image/png', 'image/gif', 'image/jpeg', 'image/jpg'];
            const maxSize = 1024 * 1024;
            const imageErrors = [];
            if (imageFiles.length > 5) {
                errorsSubmit.images = 'Chỉ được chọn tối đa 5 ảnh';
                flag = false;
            } else {
                imageFiles.forEach((image, index) => {
                    if (!allowedFormat.includes(image.type)) {
                        imageErrors.push(`File ${index + 1} có định dạng không hợp lệ (chỉ nhận file png, gif, jpeg)`);
                    }
                    if (image.size > maxSize) {
                        imageErrors.push(`File ${index + 1} có dung lượng quá lớn (> 1MB).`);
                    }
                });
                if (imageErrors.length > 0) {
                    errorsSubmit.images = imageErrors.join('\n');
                    flag = false;
                }
            }
        }
        if (!flag) {
            setErrors(errorsSubmit);
            return;
        }

        const formData = new FormData();
        formData.append('title', inputs.title);
        formData.append('description', inputs.description);
        formData.append('price', inputs.price);
        formData.append('dimensions', inputs.dimensions);
        formData.append('categoryId', inputs.categoryId);

        // Thêm nhiều file vào FormData
        imageFiles.forEach(file => {
            formData.append('imageUrls', file);
        });

        try {
            const token = localStorage.getItem('authToken');
            // Chờ và nhận kết quả trả về từ API
            const response = await apiClient.post('/artwork/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });

            // Lấy trạng thái từ response
            const finalStatus = response.data.status;

            if (finalStatus === 'approved') {
                alert('Tác phẩm của bạn đã được duyệt và đăng tải thành công!');
            } else { // status === 'pending'
                alert('Tác phẩm của bạn đã được gửi. Do có nội dung cần xem xét, bài đăng sẽ chờ quản trị viên phê duyệt.');
            }

            navigate(`/profiles/${user.id}/drafts`); // Chuyển về trang quản lý bài đăng để user thấy trạng thái
        } catch (error) {
            console.error('Lỗi khi đăng bài:', error.response);
            // Giữ nguyên phần xử lý lỗi của bạn
            if (error.response && error.response.data) {
                // Nếu backend trả về lỗi validation cụ thể
                setErrors(error.response.data);
            } else {
                setErrors({ general: 'Đã có lỗi xảy ra phía máy chủ.' });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="upload-page">
            <div className="upload-container">
                <h1>Đăng tải Tác phẩm mới</h1>
                <p className="upload-subtitle">Chia sẻ tác phẩm của bạn với cộng đồng</p>

                {errors.general && <p className="error-text">{errors.general}</p>}

                <form className="upload-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Tên tác phẩm</label>
                        <input type="text" id="title" name="title" onChange={handleInput} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Mô tả</label>
                        <textarea id="description" name="description" rows="6" onChange={handleInput}></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Thể loại</label>
                        <select id="category" name="categoryId" onChange={handleInput} value={inputs.categoryId}>
                            <option value="">-- Chọn thể loại --</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Giá (VNĐ)</label>
                        <input type="number" id="price" name="price" onChange={handleInput} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dimensions">Kích thước (ví dụ: 80cm x 120cm)</label>
                        <input type="text" id="dimensions" name="dimensions" onChange={handleInput} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="images">Hình ảnh (tối đa 5)</label>
                        <input type="file" id="images" name="imageUrls" multiple accept="image/*" onChange={handleFileChange} />
                    </div>
                    <RenderError err={errors} />
                    <div className="form-actions">
                        <button type="submit" className="btn btn-primary">
                            Đăng tác phẩm
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default UploadPage;