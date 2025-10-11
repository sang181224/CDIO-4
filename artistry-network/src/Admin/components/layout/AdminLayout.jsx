import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../sidebar/index";
import Header from "../header/index";
import { useAuth } from "../../../hooks/useAuth";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
        logout();
        navigate('/login');
    };
  return (
    <div className="min-h-screen bg-gray-900 flex">
      <Sidebar open={sidebarOpen} setSidebarOpen={setSidebarOpen}  />
      <div className="flex-1 flex flex-col">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} onLogout={handleLogout}/>
        <main className="flex-1 p-6 overflow-auto">
          <Outlet /> {/* render Dashboard, UsersPage, ... */}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
