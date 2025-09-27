import React from "react";
import { NavLink } from "react-router-dom";
import { Users, FileText, Receipt, BarChart3 } from "lucide-react";
import logomain from "../../assets/logomain.jpg";

const Sidebar = ({ open = true }) => {
  const menuItems = [
    { id: "dashboard", label: "Tổng quan", to: "/admin", icon: BarChart3 },
    { id: "users", label: "Quản lý người dùng", to: "/admin/users", icon: Users },
    { id: "content", label: "Quản lý nội dung", to: "/admin/content", icon: FileText },
    { id: "invoices", label: "Quản lý hóa đơn", to: "/admin/invoices", icon: Receipt },
  ];

  return (
    <aside
      className={`bg-gray-800 border-r border-gray-700 transition-all duration-300 ${
        open ? "w-64" : "w-16"
      }`}
    >
      {/* Logo */}
      <div className="p-4 flex justify-center">
        <NavLink to="/admin">
          <img
            src={logomain}
            alt="Logo"
            className="w-30 h-12 object-contain"
          />
        </NavLink>
      </div>

      {/* Menu */}
      <nav className="mt-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.id}
              to={item.to}
              end={item.id === "dashboard"} // để dashboard chỉ active đúng /admin
              className={({ isActive }) =>
                `w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-700 transition-colors ${
                  isActive ? "bg-gray-700 border-r-4 border-purple-500" : ""
                }`
              }
            >
              <Icon className="w-5 h-5 text-gray-400" />
              {open && <span className="text-gray-300">{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
