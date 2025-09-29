import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

// Context
import { AuthProvider } from './contexts/AuthContext';

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
import InvoicesPage from './Admin/page/invoices/index';
import UploadPage from './pages/UploadPage/UploadPage';

// Route bảo vệ (tạm comment, để dùng sau)
// const PrivateRoute = ({ children, role }) => {
//   const token = localStorage.getItem("token");
//   const userRole = localStorage.getItem("role");

//   if (!token) return <Navigate to="/login" />;
//   if (role && userRole !== role) return <Navigate to="/" />;

//   return children;
// };

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
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          

          {/* ADMIN */}
          <Route
            path="/admin"
            element={
              // <PrivateRoute role="ADMIN">
              <AdminLayout />
              // </PrivateRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="content" element={<ContentManagement />} />
            <Route path="invoices" element={<InvoicesPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
