import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/images/logomain.jpg';
import './AuthPage.css';
import { apiClient } from '../../api/apiService';
import RenderError from '../../components/Error/RenderError';

function RegisterPage() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [avatarFile, setAvatarFile] = useState(null);

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setInputs(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleFileChange = (e) => {
        setAvatarFile(e.target.files[0]);
        if (errors.avatar) {
            setErrors(prev => ({ ...prev, avatar: null }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let flag = true;
        let errorSubmit = {};
        if (!inputs.name) {
            errorSubmit.name = 'Vui lòng nhập name';
            flag = false;
        }
        if (!inputs.email) {
            errorSubmit.email = 'Vui lòng nhập email';
            flag = false;
        }
        if (!inputs.password) {
            errorSubmit.password = 'Vui lòng nhập mật khẩu';
            flag = false;
        }
        if (!inputs.confirmPassword) {
            errorSubmit.confirmPassword = ' Vui lòng nhập mật khẩu xác thực';
            flag = false;
        }
        if (!avatarFile) {
            errorSubmit.avatar = 'Vui lòng chọn avatar';
            flag = false;
        } else {
            const arrFile = [
                'jpeg', 'png', 'gif'
            ];
            const fileType = avatarFile.type;
            const fileSize = avatarFile.size;
            const fileExt = fileType.split("/").pop();
            if (!arrFile.includes(fileExt)) {
                errorSubmit.avatar = "File không hợp lệ";
                flag = false;
            } else if (fileSize > 1024 * 1024) {
                errorSubmit.avatar = "Vui lòng chọn file <= 1024KB";
                flag = false;
            }
        }
        if (!flag) {
            setErrors(errorSubmit);
        } else {
            const formData = new FormData();
            formData.append('name', inputs.name);
            formData.append('email', inputs.email);
            formData.append('password', inputs.password);
            formData.append('confirmPassword', inputs.confirmPassword);
            if (avatarFile) {
                formData.append('avatar', avatarFile);
            }

            try {
                await apiClient.post('/register', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                alert('Đăng ký thành công! Vui lòng đăng nhập.');
                navigate('/login');

            } catch (error) {
                console.error(error?.response?.data);
                setErrors({ api: error?.response?.data?.message || 'Đã có lỗi xảy ra.' });
            } finally {
                setIsLoading(false);
            }
        }

    };

    return (
        <div className="auth-body">
            <div className="auth-container">
                <div className="auth-box">
                    <Link to="/" className="auth-logo">
                        <img src={logo} alt="ArtistryNetwork Logo" />
                    </Link>
                    <h2>Tạo tài khoản mới</h2>
                    <form className="auth-form" onSubmit={handleSubmit} noValidate>
                        <div className="input-group">
                            <label htmlFor="name">Họ và Tên</label>
                            <input type="text" id="name" name="name" onChange={handleInput} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" onChange={handleInput} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Mật khẩu</label>
                            <input type="password" id="password" name="password" onChange={handleInput} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="confirmPassword">Xác nhận Mật khẩu</label>
                            <input type="password" id="confirmPassword" name="confirmPassword" onChange={handleInput} />
                        </div>

                        <div className="input-group">
                            <label htmlFor="avatar">Ảnh đại diện (Tùy chọn)</label>
                            <input type="file" id="avatar" name="avatar" onChange={handleFileChange} />
                        </div>
                        <RenderError err={errors} />
                        <button type="submit" className="btn-auth" disabled={isLoading}>
                            {isLoading ? 'Đang xử lý...' : 'Tạo tài khoản'}
                        </button>
                    </form>
                    <div className="auth-switch">
                        <p>Đã có tài khoản? <Link to="/login">Đăng nhập</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;