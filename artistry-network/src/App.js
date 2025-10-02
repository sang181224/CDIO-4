import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext, useState } from 'react';

// Context
import { AuthContext, AuthProvider } from './contexts/AuthContext';

// Layouts
import MainLayout from './components/Layout/MainLayout';   // cho user
import AdminLayout from './Admin/components/layout/AdminLayout'; // cho admin

// Pages user
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/AuthPage/LoginPage';
import Register from './pages/AuthPage/RegisterPage';
import DetailPage from './pages/DetailPage/DetailPage';

// Pages admin
import Dashboard from './Admin/page/dashBoard/index';
import UsersPage from './Admin/page/users/index';
import ContentManagement from './Admin/page/contentManagement/index';
import UploadPage from './pages/UploadPage/UploadPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import EditProfilePage from './pages/ProfilePage/EditProfilePage';
import CategoryPage from './Admin/page/category/index';
import ShopPage from './pages/ShopPage/ShopPage';

const PrivateRoute = ({ children, role }) => {
  const { user, isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) return <Navigate to="/login" />;

  // role = "admin" -> map sang roleId === 1
  if (role === "admin" && user?.roleId !== 1) {
    return <Navigate to="/" />;
  }

  return children;
};


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* USER */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/artwork/:id" element={<DetailPage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/profile/:userId" element={<ProfilePage />} />
            <Route path="/profile/edit" element={<EditProfilePage />} />
            <Route path="/shop" element={<ShopPage />} />

          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          

          {/* ADMIN */}
          <Route
            path="/admin"
            element={
              <PrivateRoute role="admin">
                <AdminLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="content" element={<ContentManagement />} />
            <Route path="category" element={<CategoryPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
