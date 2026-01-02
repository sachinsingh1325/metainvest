import React from 'react';
import { FiTrendingUp } from 'react-icons/fi';

const StatsCard = ({ icon, title, value, subtitle, color, trend, delay, isVisible }) => (
  <div 
    className={`bg-white/90 backdrop-blur-md rounded-2xl p-4 md:p-6 shadow-xl border border-emerald-100/50 hover:shadow-2xl transition-all duration-500 group hover:scale-[1.02] transform-gpu ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
    }`}
    style={{ transitionDelay: `${delay}ms` }}
  >
    <div className="flex items-center justify-between">
      <div className="flex-1 min-w-0">
        <p className="text-xs md:text-sm font-medium text-gray-600 truncate">{title}</p>
        <p className="text-lg md:text-2xl font-bold text-gray-900 mt-1 md:mt-2 truncate">{value}</p>
        <p className="text-xs text-gray-500 mt-1 truncate">{subtitle}</p>
        {trend && (
          <div className="flex items-center gap-1 mt-1 md:mt-2">
            {/* <FiTrendingUp className="w-3 h-3 text-green-500 flex-shrink-0" /> */}
            <span className="text-xs text-green-600 font-medium truncate">{trend}</span>
          </div>
        )}
      </div>
      <div className={`p-2 md:p-3 rounded-xl bg-gradient-to-br ${color} group-hover:scale-110 transition-transform duration-300 shadow-lg flex-shrink-0 ml-2 md:ml-4 relative overflow-hidden`}>
        <div className="absolute inset-0 bg-white/20 transform -skew-x-12 translate-x-8 group-hover:translate-x-0 transition-transform duration-500"></div>
        {icon}
      </div>
    </div>
  </div>
);

export default StatsCard;