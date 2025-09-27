
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

// Layouts
import MainLayout from "./components/Layout/MainLayout";   // cho user
import AdminLayout from "./Admin/components/layout/AdminLayout"; // cho admin

// Pages user
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/AuthPage/LoginPage";

// Pages admin
import Dashboard from "./Admin/page/dashBoard/index";
import UsersPage from "./Admin/page/users/index";
import ContentManagement from "./Admin/page/contentManagement/index";
import InvoicesPage from "./Admin/page/invoices/index";

// Route bảo vệ
// const PrivateRoute = ({ children, role }) => {
//   const token = localStorage.getItem("token");
//   const userRole = localStorage.getItem("role");

//   if (!token) return <Navigate to="/login" />;
//   if (role && userRole !== role) return <Navigate to="/" />;

//   return children;
// };

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* USER */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />

        {/* ADMIN */}
        <Route
          path="/admin"
          // element={
          //   <PrivateRoute role="ADMIN">
          //     <AdminLayout />
          //   </PrivateRoute>
          // }
        >
          <Route index element={<Dashboard />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="content" element={<ContentManagement />} />
          <Route path="invoices" element={<InvoicesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
