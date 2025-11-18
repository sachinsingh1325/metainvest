import React, { useState } from "react";
import {
  FiMenu,
  FiBell,
  FiX,
  FiUser,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { GiWaterRecycling } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Header = ({ toggleSidebar, isSidebarOpen }) => {
  const navigate = useNavigate();
  const [showUserPanel, setShowUserPanel] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const toggleUserPanel = () => {
    setShowUserPanel(!showUserPanel);
  };

  const handleLogout = () => {
    localStorage.removeItem("retent_user");
    navigate("/");
    setShowUserPanel(false);
  };

  return (
    <header className="static top-0 z-50 w-full border-b border-gray-200 bg-gradient-to-b from-white via-white to-white shadow-sm">
      <div className="px-4 py-3 lg:px-6 lg:pl-4">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center justify-start">
            {/* Hamburger Menu - Only visible on mobile */}
            <button
              onClick={toggleSidebar}
              className="lg:hidden mr-3 cursor-pointer p-2.5 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded-xl transition-all duration-200"
            >
              {isSidebarOpen ? (
                <FiX className="w-5 h-5 text-gray-600" />
              ) : (
                <FiMenu className="w-5 h-5 text-gray-600" />
              )}
            </button>
            
            {/* Sidebar Branding - Hidden on mobile, shown on desktop */}
            <div className="hidden lg:flex items-center gap-2 mr-6">
              <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg shadow-sm">
                <GiWaterRecycling className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-base bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  MetaWealth
                </h1>
                <p className="text-xs text-gray-500">Sustainable Living</p>
              </div>
            </div>
          </div>

          {/* Right Section - User Info & Icons */}
          <div className="flex items-center gap-4">
            {/* User Info - Eco Warrior & Status */}
            <div className="hidden md:flex items-center gap-3 p-2 bg-white/50 rounded-xl border border-green-100">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-sm border border-white">
                <span className="text-white font-bold text-xs">EW</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-gray-800 text-sm">Eco Warrior</span>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-600">Active</span>
                </div>
              </div>
            </div>

            {/* User Panel */}
            <div className="relative">
              <div
                onClick={toggleUserPanel}
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 cursor-pointer hover:border-green-300 hover:ring-2 hover:ring-green-100 transition-all duration-200 flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50"
              >
                {/* Fallback avatar if image fails to load */}
                <div className="w-full h-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-semibold text-sm">
                  {user?.user?.name ? user.user.name.charAt(0).toUpperCase() : 'U'}
                </div>
              </div>

              {/* User Dropdown Panel */}
              {showUserPanel && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 transform transition-all duration-200 ease-in-out scale-100 bg-white">
                  
                  {/* User Details Section */}
                  <div className="px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-green-50/50 to-emerald-50/50">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-semibold text-lg">
                        {user?.user?.name ? user.user.name.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {user?.user?.name || 'Eco Warrior'}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user?.user?.email || 'Active User'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Navigation Options */}
                  <div className="py-2">
                    <Link
                      to="/settings/profile"
                      onClick={() => setShowUserPanel(false)}
                      className="flex items-center px-5 py-1 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all duration-200 group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center mr-3 group-hover:bg-green-200 transition-colors duration-200">
                        <FiUser className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="font-medium">Profile</span>
                    </Link>

                    <Link
                      to="/settings"
                      onClick={() => setShowUserPanel(false)}
                      className="flex items-center px-5 py-1 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-all duration-200 group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center mr-3 group-hover:bg-emerald-200 transition-colors duration-200">
                        <FiSettings className="w-4 h-4 text-emerald-600" />
                      </div>
                      <span className="font-medium">Settings</span>
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-5 py-1 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200 group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center mr-3 group-hover:bg-red-200 transition-colors duration-200">
                        <FiLogOut className="w-4 h-4 text-red-600" />
                      </div>
                      <span className="font-medium">Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;