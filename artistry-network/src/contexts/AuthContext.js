import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const userData = localStorage.getItem('user');
        if (token && userData) {
            setUser(JSON.parse(userData)); // ✅ parse lại thành object
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    const login = (userData, token) => {
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
    };

    const value = { user, isAuthenticated, loading, login, logout };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
