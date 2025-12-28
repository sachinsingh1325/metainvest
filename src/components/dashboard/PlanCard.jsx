import React from 'react';
import { FiCheck, FiInfo, FiChevronRight, FiDollarSign, FiTrendingUp, FiCalendar, FiAward } from 'react-icons/fi';
import { FiZap } from 'react-icons/fi';

const PlanCard = ({ plan, isActive, hasActivePlan, onInvest, delay, isVisible }) => {
  const handleInvestClick = () => {
    // Prevent opening investment popup if plan is already active
    if (isActive) {
      return;
    }
    
    // Also prevent if there's already an active plan and this isn't it
    if (hasActivePlan && !isActive) {
      return;
    }
    
    // Only call onInvest if conditions are met
    onInvest(plan);
  };

  return (
    <div 
      className={`relative bg-white/90 backdrop-blur-md rounded-2xl p-4 md:p-6 shadow-xl border-2 ${
        isActive ? 'border-emerald-400 shadow-emerald-100/50' : 'border-emerald-100/50 hover:border-emerald-300'
      } transition-all duration-500 group hover:shadow-2xl h-full flex flex-col transform-gpu ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {plan.badge && (
        <div className="absolute -top-2 left-2 md:left-4 z-10">
          <span className="px-2 md:px-3 py-1 bg-gradient-to-r from-amber-400 to-amber-500 text-white text-xs font-bold rounded-full shadow-lg">
            {plan.badge}
          </span>
        </div>
      )}

      {isActive && (
        <div className="absolute -top-2 right-2 md:right-4 z-10">
          <span className="px-2 md:px-3 py-1 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
            <FiZap className="w-3 h-3" />
            Active
          </span>
        </div>
      )}

      <div className="text-center mb-4 md:mb-6 flex-shrink-0 relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-green-500 rounded-lg blur opacity-10 group-hover:opacity-20 transition duration-1000 group-hover:duration-200"></div>
        <h3 className="font-bold text-gray-900 text-base md:text-lg relative">{plan.name}</h3>
        <div className="w-8 md:w-12 h-1 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full mx-auto mt-1 md:mt-2 relative"></div>
      </div>
      
      <div className="space-y-1 mb-1 flex-1">
        <div className="flex justify-between items-center p-1 rounded-lg hover:bg-emerald-50/50 transition-colors duration-300 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center gap-2">
            <FiDollarSign className="w-3 h-3 md:w-4 md:h-4 text-emerald-500" />
            <span className="text-xs md:text-sm text-gray-600">Min Investment</span>
          </div>
          <span className="font-bold text-gray-900 text-xs md:text-base">${plan.minAmount}</span>
        </div>
        <div className="flex justify-between items-center p-1 rounded-lg hover:bg-emerald-50/50 transition-colors duration-300 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center gap-2">
            <FiTrendingUp className="w-3 h-3 md:w-4 md:h-4 text-green-500" />
            <span className="text-xs md:text-sm text-gray-600">Daily ROI</span>
          </div>
          <span className="font-bold text-green-600 text-xs md:text-base">{plan.dailyROI}%</span>
        </div>
        <div className="flex justify-between items-center p-1 rounded-lg hover:bg-emerald-50/50 transition-colors duration-300 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center gap-2">
            <FiCalendar className="w-3 h-3 md:w-4 md:h-4 text-teal-500" />
            <span className="text-xs md:text-sm text-gray-600">Duration</span>
          </div>
          <span className="font-semibold text-gray-900 text-xs md:text-base">{plan.duration}</span>
        </div>
        <div className="flex justify-between items-center p-1 mb-2 md:mb-4 rounded-lg hover:bg-emerald-50/50 transition-colors duration-300 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center gap-2">
            <FiAward className="w-3 h-3 md:w-4 md:h-4 text-amber-500" />
            <span className="text-xs md:text-sm text-gray-600">Max Return</span>
          </div>
          <span className="font-bold text-emerald-600 text-xs md:text-base">{plan.maxReturn}</span>
        </div>
      </div>

      <div className="space-y-1 mb-4 md:mb-6 flex-shrink-0">
        {plan.features.map((feature, index) => (
          <div key={index} className="flex items-center gap-1 md:gap-2 p-1 rounded-lg hover:bg-emerald-50/30 transition-colors duration-300">
            <FiCheck className="w-3 h-3 md:w-4 md:h-4 text-green-500 flex-shrink-0" />
            <span className="text-xs text-gray-600 truncate">{feature}</span>
          </div>
        ))}
      </div>

      <button 
        onClick={handleInvestClick}
        disabled={isActive || (hasActivePlan && !isActive)}
        className={`w-full py-2 md:py-3 rounded-xl font-bold text-xs md:text-sm transition-all duration-300 mt-auto flex-shrink-0 relative overflow-hidden group ${
          isActive 
            ? 'bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 border-2 border-emerald-200 cursor-default' 
            : hasActivePlan && !isActive
            ? 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 cursor-default'
            : 'bg-gradient-to-r from-emerald-700 to-green-500 text-white hover:shadow-lg transform hover:scale-[1.02] shadow-md hover:cursor-pointer'
        }`}
      >
        {!isActive && !hasActivePlan && (
          <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-8 group-hover:translate-x-8 transition-transform duration-700"></div>
        )}
        <span className="relative flex items-center justify-center gap-1 md:gap-2">
          {isActive ? (
            <>
              <FiCheck className="w-3 h-3 md:w-4 md:h-4" />
              <span className="truncate">Plan Active</span>
            </>
          ) : hasActivePlan && !isActive ? (
            <>
              <FiInfo className="w-3 h-3 md:w-4 md:h-4" />
              <span className="truncate">One Plan Limit</span>
            </>
          ) : (
            <>
              <span className="truncate">Invest Now</span>
              <FiChevronRight className="w-3 h-3 md:w-4 md:h-4" />
            </>
          )}
        </span>
      </button>
    </div>
  );
};

export default PlanCard;