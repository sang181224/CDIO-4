import './AuthPage.css';
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/images/logomain.jpg';
import { useState } from 'react';
import RenderError from '../../components/Error/RenderError';
import { useAuth } from '../../hooks/useAuth';
import { apiClient } from '../../api/apiService';

// import { apiClient } from '../../api/apiService';

function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const handleInput = (e) => {
        setErrors({});
        const value = e.target.value;
        const name = e.target.name;
        setInputs(prev => ({ ...prev, [name]: value }));
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        let errorSubmit = {};
        let flag = true;
        if (!inputs.email) {
            errorSubmit.email = 'Vui lòng nhập email';
            flag = false;
        } else {
            const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!emailRegex.test(inputs.email)) {
                errorSubmit.email = 'Email không hợp lệ';
                flag = false;
            }
        }
        if (!inputs.password) {
            errorSubmit.password = 'Vui lòng nhập password';
            flag = false;
        }
        if (flag === false) {
            setErrors(errorSubmit);
        } else {
            const data = {
                email: inputs.email,
                password: inputs.password
            }
            await apiClient.post('/login', data)
                // await axios.post('http://localhost:3100/api/TaiKhoan/dangnhap', data)
                .then(response => {
                    const { token, user } = response.data;
                    console.log(response.data);
                    login(response.data.user, response.data.token);
                    if (user.roleId === 1) {
                        navigate('/admin');
                    } else {
                        navigate('/');
                    }
                })
                .catch(error => {
                    if (error.response) {
                        setErrors(error?.response?.data);
                        console.log(error?.response?.data);
                    } else {
                        setErrors({ error: 'Lỗi sever' });
                    }
                })

        }
    }
    return (
        <div className='auth-body'>
            <div className="auth-container">
                <div className="auth-box">
                    <a href="index.html" className="auth-logo">
                        <img src={logo} alt="ArtistryNetwork Logo" />
                    </a>
                    <h2>Chào mừng trở lại</h2>
                    <p className="auth-subtitle">Đăng nhập để tiếp tục khám phá nghệ thuật</p>
                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" onChange={handleInput} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Mật khẩu</label>
                            <input type="password" id="password" name="password" onChange={handleInput} />
                        </div>
                        <RenderError err={errors} />
                        <div className="form-options">
                            <a href="#" className="forgot-password">Quên mật khẩu?</a>
                        </div>


                        <button type="submit" className="btn-auth">Đăng nhập</button>
                    </form>
                    <div className="auth-switch">
                        <p>Chưa có tài khoản? <Link to={'/register'}>Đăng ký ngay</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default LoginPage;