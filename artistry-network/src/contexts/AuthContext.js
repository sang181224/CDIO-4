import React, { createContext, useState, useEffect } from 'react';

// Tạo Context
export const AuthContext = createContext(null);

// Tạo component Provider
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true); // Thêm state loading để kiểm tra trạng thái ban đầu

    useEffect(() => {
        // Hàm này sẽ chạy 1 lần khi app khởi động
        // để kiểm tra xem user đã đăng nhập từ trước chưa (dựa vào token đã lưu)
        const token = localStorage.getItem('authToken');
        if (token) {
            // Trong thực tế, bạn sẽ gửi token này lên server để xác thực
            // và lấy lại thông tin user. Ở đây ta giả lập.
            const storedUser = { id: '123', name: 'Elena Rodriguez', avatar: '...' };
            setUser(storedUser);
            setIsAuthenticated(true);
        }
        setLoading(false); // Kết thúc quá trình kiểm tra
    }, []);

    const login = (userData, token) => {
        // Lưu thông tin user và token
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('authToken', token); // Lưu token vào localStorage
    };

    const logout = () => {
        // Xóa thông tin user và token
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('authToken');
    };

    // Các giá trị sẽ được cung cấp cho toàn bộ ứng dụng
    const value = { user, isAuthenticated, loading, login, logout };

    return (
        <AuthContext.Provider value={value}>
            {/* Chỉ render các component con khi đã kiểm tra xong */}
            {!loading && children}
        </AuthContext.Provider>
    );
}