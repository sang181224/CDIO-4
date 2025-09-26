// File: src/hooks/useAuth.js
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (context === undefined) {
        // Đảm bảo component đang dùng hook này được bọc trong AuthProvider
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};