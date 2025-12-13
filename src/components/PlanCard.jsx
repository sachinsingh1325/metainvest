// components/PlanCard.jsx
import { FiTrendingUp, FiLock } from 'react-icons/fi';

const PlanCard = ({ plan, isActive, hasActivePlan, onInvest, delay }) => {
  return (
    <div
      className={`bg-gradient-to-br from-white to-emerald-50 rounded-xl p-4 sm:p-6 border ${
        isActive ? 'border-emerald-500' : 'border-emerald-200'
      } shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer transform hover:scale-[1.02]`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${
            isActive 
              ? 'bg-gradient-to-r from-emerald-400 to-green-500' 
              : 'bg-emerald-100'
          }`}>
            <FiTrendingUp className={`w-4 h-4 ${isActive ? 'text-white' : 'text-emerald-600'}`} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-sm sm:text-base">{plan.name}</h3>
            <p className="text-xs text-gray-500">{plan.duration} days</p>
          </div>
        </div>
        {isActive && (
          <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">
            Active
          </span>
        )}
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-600">Min Investment</span>
          <span className="font-bold text-gray-900 text-sm">${plan.minAmount}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-600">Daily ROI</span>
          <span className="font-bold text-emerald-600 text-sm">{plan.dailyROI}%</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-600">Total Return</span>
          <span className="font-bold text-gray-900 text-sm">{plan.totalReturn}%</span>
        </div>
      </div>

      <button
        onClick={() => onInvest(plan)}
        disabled={hasActivePlan && !isActive}
        className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
          isActive
            ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:shadow-lg'
            : hasActivePlan
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-emerald-400 to-green-500 text-white hover:shadow-lg hover:scale-105'
        }`}
      >
        {isActive ? (
          'View Progress'
        ) : hasActivePlan ? (
          <div className="flex items-center justify-center gap-1">
            <FiLock className="w-3 h-3" />
            <span>Complete Active Plan</span>
          </div>
        ) : (
          'Invest Now'
        )}
      </button>
    </div>
  );
};

export default PlanCard;