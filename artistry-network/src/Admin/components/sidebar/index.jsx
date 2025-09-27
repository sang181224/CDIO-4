import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Users, FileText, Receipt, BarChart3 } from "lucide-react";
import logomain from "../../assets/logomain.jpg";

const Sidebar = ({ open = true, setSidebarOpen }) => {
  const location = useLocation();
  const menuItems = [
    { id: "dashboard", label: "Tổng quan", to: "/", icon: BarChart3 },
    { id: "users", label: "Quản lý người dùng", to: "/users", icon: Users },
    {
      id: "content",
      label: "Quản lý nội dung",
      to: "/content",
      icon: FileText,
    },
    {
      id: "invoices",
      label: "Quản lý hóa đơn",
      to: "/invoices",
      icon: Receipt,
    },
  ];

  return (
    <aside
      className={`bg-gray-800 border-r border-gray-700 transition-all duration-300 ${
        open ? "w-64" : "w-16"
      }`}
    >
      <div className="p-4">
        <div className="flex flex-col items-center">
          {/* Logo không có khung hồng */}
          <NavLink to="/" className="mt-2">
            <img
              src={logomain}
              alt="Logo"
              className="w-30 h-12 object-contain"
            />
          </NavLink>
        </div>
      </div>

      <nav className="mt-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = location.pathname === item.to;
          return (
            <Link
              key={item.id}
              to={item.to}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-700 transition-colors ${
                active ? "bg-gray-700 border-r-4 border-purple-500" : ""
              }`}
            >
              <Icon className="w-5 h-5 text-gray-400" />
              {open && <span className="text-gray-300">{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
