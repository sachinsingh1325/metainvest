import React from "react";

const NavItem = ({ to, icon: Icon, label, onClick, isActive }) => {
  return (
    <li>
      <button
        onClick={onClick}
        className={`relative flex items-center w-full gap-3 px-3 py-2 rounded-xl transition-all duration-300 group overflow-hidden ${
          isActive
            ? "bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-200 shadow-md"
            : "bg-transparent border border-transparent hover:border-green-200 hover:bg-green-50/50"
        }`}
      >
        
        {/* Icon container */}
        <div className={`relative p-2 rounded-lg transition-all duration-300 ${
          isActive
            ? "bg-gradient-to-br from-green-500 to-emerald-600 shadow-sm"
            : "bg-green-100 text-green-600 group-hover:bg-green-200"
        }`}>
          <Icon className={`w-4 h-4 transition-all duration-300 ${
            isActive 
              ? "text-white" 
              : "group-hover:scale-105"
          }`} />
        </div>

        {/* Label */}
        <span className={`font-medium text-sm flex-1 text-left transition-all duration-300 ${
          isActive 
            ? "text-green-700 font-semibold"
            : "text-gray-700 group-hover:text-green-800"
        }`}>
          {label}
        </span>

        {/* Active indicator bar */}
        {isActive && (
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-green-400 to-emerald-500 rounded-r-full"></div>
        )}

        {/* Subtle hover effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
      </button>
    </li>
  );
};

export default NavItem;