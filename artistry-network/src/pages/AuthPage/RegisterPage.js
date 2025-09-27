import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/images/logomain.jpg'
import axios from 'axios';
import RenderError from '../../components/Error/RenderError';
function Register() {
    const navigate = useNavigate()
    const [inputs, setInputs] = useState({
        fullname: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const handleInput = (e) => {
        setErrors({});
        const name = e.target.name;
        const value = e.target.value;
        setInputs(prev => ({...prev, [name]: value}));
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        let errorSubmit = {};
        let flag = true;
        if(!inputs.fullname){
            errorSubmit.name = 'Vui lòng nhập name';
            flag = false;
        }
        if(!inputs.email){
            errorSubmit.email = 'Vui lòng nhập email';
            flag = false;
        } else {
            const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!emailRegex.test(inputs.email)) {
                errorSubmit.email = 'Email không hợp lệ';
                flag = false;
            }
        }
        if(!inputs.password){
            errorSubmit.password = 'Vui lòng nhập mật khẩu';
            flag = false;
        }
        if(!inputs.confirmPassword){
            errorSubmit.passwordCofirm = 'Vui lòng nhập mật khẩu xác nhận';
            flag = false;
        }
        if(!flag){
            setErrors(errorSubmit);
        } else {
            const data = {
                ten: inputs.fullname,
                emailSdt: inputs.email,
                matKhau: inputs.password,
                nhapLaiMatKhau: inputs.confirmPassword
            };
            await axios.post('http://localhost:3100/api/TaiKhoan/dangky', data)
                .then(response => {
                    const confirmed = window.confirm("Đăng ký thành công! Bạn có muốn chuyển sang trang đăng nhập không?");
                    if(confirmed){
                        navigate('/login');
                    }
                })
                .catch(error => {
                    console.log(error?.response?.data);
                    setErrors({passwordCofirm: 'Mật khẩu không khớp'})
                })
        }
    }
    return (
        <div className="auth-body">
            <div className="auth-container">
                <div className="auth-box">
                    <a href="index.html" className="auth-logo">
                        <img src={logo} alt="ArtistryNetwork Logo" />
                    </a>
                    <h2>Tạo tài khoản mới</h2>
                    <p className="auth-subtitle">Tham gia cộng đồng và chia sẻ đam mê của bạn</p>
                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="fullname">Họ và Tên</label>
                            <input type="text" id="fullname" name="fullname" required onChange={handleInput}/>
                        </div>
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" required onChange={handleInput}/>
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Mật khẩu</label>
                            <input type="password" id="password" name="password" required onChange={handleInput}/>
                        </div>
                        <div className="input-group">
                            <label htmlFor="confirmPassword">Xác nhận Mật khẩu</label>
                            <input type="password" id="confirmPassword" name="confirmPassword" required onChange={handleInput}/>
                        </div>
                        <RenderError err={errors}/>
                        <button type="submit" className="btn-auth">Tạo tài khoản</button>
                    </form>
                    <div className="auth-switch">
                        <p>Đã có tài khoản? <Link to={'/login'}>Đăng nhập</Link></p>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Register;