import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './EditArtwork.css';
import { apiClient } from '../../api/apiService';
import RenderError from '../../components/Error/RenderError';

function EditArtwork() {
    const { id } = useParams();
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
    const [oldImage, setOldImage] = useState([]);
    const [imageDelete, setImageDelete] = useState([]);

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    // Lấy danh sách thể loại từ API khi trang được tải
    useEffect(() => {
        setIsLoading(true);
        const fetchInitialData = async () => {
            try {
                const [categoryRes, artworkRes] = await Promise.all([
                    apiClient.get('/admin/category/list'),
                    apiClient.get(`/artwork/detail/${id}`)
                ])
                // console.log(categoryRes.data)
                // console.log(artworkRes.data)
                const artworkData = {
                    title: artworkRes.data.title,
                    description: artworkRes.data.description,
                    price: artworkRes.data.price,
                    dimensions: artworkRes.data.dimensions,
                    categoryId: artworkRes.data.categoryId,
                }
                setCategories(categoryRes.data);
                setInputs(artworkData);
                // console.log(artworkData);
                setOldImage(JSON.parse(artworkRes.data.imageUrls));
            } catch (error) {
                console.error("Lỗi khi thấy dữ liệu", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchInitialData();
    }, [id]);

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

    const handleCheck = (e) => {
        if(e.target.checked){
            setImageDelete(prev => [...prev, e.target.value])
        } else {
            setImageDelete(prev => prev.filter(image => image != e.target.value));
        }
    }
    const renderAvatarCheckBox = (e) => {
        return oldImage.map((imageUrls, key) => {
            return (
                <li key={key} style={{textAlign: 'center'}}>
                    <img src={`http://localhost:3000/${imageUrls}`} style={{ width: "100px", height: "100px" }}/>
                    <input type='checkbox' value={imageUrls} onChange={(e) => handleCheck(e)}/>
                </li>
            )
        })
    }

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
        const totalImage = imageFiles.length + oldImage.length - imageDelete.length;
        if (totalImage === 0) {
            errorsSubmit.image = 'Vui lòng chọn image';
            flag = false;
        } else {
            const allowedFormat = ['image/png', 'image/gif', 'image/jpeg', 'image/jpg'];
            const maxSize = 1024 * 1024;
            const imageErrors = [];
            if (totalImage > 5) {
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
        formData.append('imageDelete', JSON.stringify(imageDelete));
        // Thêm nhiều file vào FormData
        imageFiles.forEach(file => {
            formData.append('imageUrls', file);
        });

        try {
            const token = localStorage.getItem('authToken'); // Lấy token đã lưu
            await apiClient.post(`/artwork/update/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            alert('Tác phẩm đã được gửi và đang chờ phê duyệt!');
            navigate(`/profile/${user.id}`); // Chuyển về trang profile
        } catch (error) {
            console.error('Lỗi khi update bài:', error.response);
            setErrors(error.response?.data?.errors || { general: 'Đã có lỗi xảy ra.' });
        } finally {
            setIsLoading(false);
        }
    };
    if(isLoading){
        return <p>Đang tải</p>
    }
    return (
        <main className="upload-page">
            <div className="upload-container">
                <h1>Chỉnh sửa Tác phẩm</h1>
                <p className="upload-subtitle">Chia sẻ tác phẩm của bạn với cộng đồng</p>

                {errors.general && <p className="error-text">{errors.general}</p>}

                <form className="upload-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Tên tác phẩm</label>
                        <input type="text" id="title" name="title" onChange={handleInput} value={inputs.title}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Mô tả</label>
                        <textarea id="description" name="description" rows="6" onChange={handleInput} value={inputs.description}></textarea>
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
                        <input type="number" id="price" name="price" onChange={handleInput} value={inputs.price}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="dimensions">Kích thước (ví dụ: 80cm x 120cm)</label>
                        <input type="text" id="dimensions" name="dimensions" onChange={handleInput} value={inputs.dimensions}/>
                    </div>
                    <ul style={{display: 'flex', gap: '5px'}}>
                        {renderAvatarCheckBox()}
                    </ul>
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

export default EditArtwork;