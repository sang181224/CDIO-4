import React from 'react';
import { Menu, X } from 'lucide-react';

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-400 hover:text-white transition-colors">
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <h1 className="text-xl font-semibold text-white">Admin Panel</h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-semibold">AD</span>
          </div>
          <div className="text-right">
            <p className="text-sm text-white">Admin</p>
            <p className="text-xs text-gray-400">admin@artistrynetwork.com</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
