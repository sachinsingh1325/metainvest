import React, { useState, useEffect } from "react";
import {
  FiPieChart,
  FiX,
  FiLogOut,
  FiUser,
  FiTruck,
  FiBarChart2,
  FiMap,
  FiShoppingBag,
  FiAward,
  FiSettings,
  FiZap,
  FiTrendingUp
} from "react-icons/fi";
import { GiWaterRecycling } from "react-icons/gi";

import { useLocation, useNavigate } from "react-router-dom";
import NavItem from "./NavItem";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { to: "/dashboard", label: "Eco Dashboard", icon: FiPieChart },
    { to: "/recycling-stats", label: "Impact Analytics", icon: FiTrendingUp },
    { to: "/waste-tracking", label: "Waste Journey", icon: FiTruck },
    { to: "/eco-store", label: "Green Marketplace", icon: FiShoppingBag },
    { to: "/achievements", label: "Eco Badges", icon: FiAward },
  ];

  const handleNavItemClick = (to) => {
    navigate(to);
    if (isOpen) toggleSidebar();
  };

  const handleLogout = () => {
    localStorage.removeItem("retent_user");
    navigate("/");
    if (isOpen) toggleSidebar();
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>  
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 lg:hidden bg-gradient-to-br from-green-50/80 to-emerald-50/80 backdrop-blur-[4px] transition-all duration-500 ease-out ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      ></div>

      {/* Slim sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 w-45 h-screen bg-gradient-to-b from-white via-green-50/20 to-emerald-50/10 backdrop-blur-sm border-r border-green-100/50 transition-all duration-500 ease-out lg:translate-x-0 ${
          isOpen ? "translate-x-0 shadow-xl" : "-translate-x-full"
        }`}
      >
        {/* Simple header matching main header */}
        <div className="flex items-center p-4 border-b border-green-100/50 bg-white/80">
          <div className="flex items-center gap-2 flex-1">
            <div className="p-1.5 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg shadow-sm">
              <GiWaterRecycling  className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-base bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                EcoRecycle
              </h1>
              <p className="text-xs text-gray-500">Sustainable Living</p>
            </div>
          </div>
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-1.5 hover:bg-green-100 rounded-lg transition-all duration-200"
          >
            <FiX className="w-4 h-4 text-green-600" />
          </button>
        </div>

        <div className="h-full flex flex-col pt-4">
          {/* Navigation Section */}
          <div className="flex-1 px-3 overflow-y-auto">
            <div className="mb-4 px-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-green-700 uppercase tracking-wider">
                <div className="w-1 h-3 bg-gradient-to-b from-green-400 to-emerald-500 rounded-full"></div>
                <span>Navigation</span>
              </div>
            </div>

            <ul className="space-y-1">
              {menuItems.map((item, index) => (
                <NavItem
                  key={index}
                  to={item.to}
                  icon={item.icon}
                  label={item.label}
                  isActive={location.pathname === item.to}
                  onClick={() => handleNavItemClick(item.to)}
                />
              ))}
            </ul>

            {/* Quick Actions - Simplified */}
            <div className="mt-8 px-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">
                <div className="w-1 h-3 bg-gray-300 rounded-full"></div>
                <span>Quick Actions</span>
              </div>
              <div className="space-y-2">
                <button className="w-full flex items-center gap-3 p-3 bg-white border border-green-100 rounded-xl hover:border-green-300 transition-all duration-200 group">
                  <FiZap className="w-4 h-4 text-green-500 group-hover:scale-110 transition-transform" />
                  <span className="text-sm text-gray-700">Scan Item</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 bg-white border border-green-100 rounded-xl hover:border-green-300 transition-all duration-200 group">
                  <FiMap className="w-4 h-4 text-green-500 group-hover:scale-110 transition-transform" />
                  <span className="text-sm text-gray-700">Find Center</span>
                </button>
              </div>
            </div>
          </div>

          {/* Footer with Logout - Simplified */}
          <div className="p-4 border-t border-green-100/50 bg-white/50">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 p-3 bg-white border border-green-100 rounded-xl hover:border-green-300 hover:shadow-sm transition-all duration-300 group"
            >
              <div className="p-1.5 bg-gray-100 rounded-lg group-hover:bg-green-50 transition-colors">
                <FiLogOut className="w-4 h-4 text-gray-600 group-hover:text-green-600" />
              </div>
              <span className="font-medium text-gray-700 group-hover:text-green-700 text-sm">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;