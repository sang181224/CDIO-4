import React, { createContext, useState, useEffect } from "react";

// Tạo Context
export const AuthContext = createContext(null);

// Hàm decode JWT
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const decoded = parseJwt(token);
      if (decoded && decoded.exp * 1000 > Date.now()) {
        // token còn hạn
        setUser({
          id: decoded.userId,
          name: decoded.UserName,
          role: decoded.role,
        });
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem("authToken"); // token hết hạn
      }
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    const decoded = parseJwt(token);
    if (decoded) {
      setUser({
        id: decoded.userId,
        name: decoded.UserName,
        role: decoded.role,
      });
      setIsAuthenticated(true);
      localStorage.setItem("authToken", token);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("authToken");
  };

  const value = { user, isAuthenticated, loading, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
