import React, { useState } from "react";
import {
  FiMenu,
  FiBell,
  FiX,
  FiUser,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ toggleSidebar, isSidebarOpen }) => {
  const navigate = useNavigate();
  
  const [showUserPanel, setShowUserPanel] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const toggleUserPanel = () => {
    setShowUserPanel(!showUserPanel);
  };

  const handleLogout = () => {
    localStorage.removeItem("retent_user");
    localStorage.removeItem("user"); // optional: clear user too
    navigate("/");
    setShowUserPanel(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="px-4 py-2 lg:px-6">
        <div className="flex items-center justify-between">

          {/* ==================== LEFT: Logo (Always Visible) + Hamburger ==================== */}
          <div className="flex items-center gap-3">
            {/* Hamburger - Mobile only */}
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition"
            >
              {isSidebarOpen ? (
                <FiX className="w-6 h-6 text-gray-700" />
              ) : (
                <FiMenu className="w-6 h-6 text-gray-700" />
              )}
            </button>

            {/* Logo + Brand Name - Visible on ALL screens */}
            <Link to="/dashboard" className="flex items-center gap-2">
              <div className="p-1.5 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg shadow-sm">
                <img
                  src="/logo1.png"
                  alt="MetaWealth Logo"
                  className="w-9 h-9 sm:w-10 sm:h-10 object-contain"
                />
              </div>

              {/* Text hidden on very small screens, visible from sm (~640px) upwards */}
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold bg-gradient-to-r from-green-800 to-emerald-800 bg-clip-text text-transparent">
                  MetaWealth
                </h1>
                <p className="text-xs text-gray-500 -mt-0.5">Sustainable Living</p>
              </div>
            </Link>
          </div>

          {/* ==================== RIGHT: User Info & Avatar ==================== */}
          <div className="flex items-center gap-4">

            {/* Eco Warrior Badge - Hidden on very small screens */}
            <div className="hidden md:flex items-center gap-3 p-2 bg-white/60 backdrop-blur rounded-xl border border-green-100">
              <div className="w-9 h-9  rounded-lg bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-xs">EW</span>
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">Eco Warrior</p>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-600 font-medium">Active</span>
                </div>
              </div>
            </div>

            {/* User Avatar & Dropdown */}
            <div className="relative">
              <button
                onClick={toggleUserPanel}
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 hover:border-green-400 hover:ring-4 hover:ring-green-100 transition-all duration-300 flex items-center justify-center bg-gradient-to-br from-green-100 to-emerald-100"
              >
                <div className="w-full h-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center items-center text-white font-bold text-lg">
                  {user?.user?.name ? user.user.name.charAt(0).toUpperCase() : "U"}
                </div>
              </button>

              {/* Dropdown Panel */}
              {showUserPanel && (
                <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                  {/* User Info Header */}
                  <div className="px-6 py-5 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-100">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                        {user?.user?.name ? user.user.name.charAt(0).toUpperCase() : "U"}
                      </div>
                      <div className="overflow-hidden">
                        <p className="font-semibold text-gray-900 truncate">
                          {user?.user?.name || "Eco Warrior"}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {user?.user?.email || "user@example.com"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <Link
                      to="/settings/profile"
                      onClick={() => setShowUserPanel(false)}
                      className="flex items-center gap-4 px-6 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 transition"
                    >
                      <FiUser className="w-5 h-5" />
                      <span className="font-medium">Profile</span>
                    </Link>

                    <Link
                      to="/settings"
                      onClick={() => setShowUserPanel(false)}
                      className="flex items-center gap-4 px-6 py-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition"
                    >
                      <FiSettings className="w-5 h-5" />
                      <span className="font-medium">Settings</span>
                    </Link>

                    <hr className="mx-4 my-2 border-gray-200" />

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-4 px-6 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition"
                    >
                      <FiLogOut className="w-5 h-5" />
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