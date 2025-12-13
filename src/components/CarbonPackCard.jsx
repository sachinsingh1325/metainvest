// components/CarbonPackCard.jsx
import { GiTreeRoots } from 'react-icons/gi';

const CarbonPackCard = ({ pack, onSelect, delay }) => {
  return (
    <div
      className="bg-gradient-to-br from-white to-emerald-50 rounded-xl p-4 border border-emerald-200 shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer transform hover:scale-[1.02]"
      style={{ animationDelay: `${delay}ms` }}
      onClick={() => onSelect(pack)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-gradient-to-r from-emerald-400 to-green-500 rounded-lg">
            <GiTreeRoots className="w-4 h-4 text-white" />
          </div>
          <h3 className="font-bold text-gray-900 text-sm sm:text-base">{pack.name}</h3>
        </div>
        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">
          {pack.credits} tCO₂
        </span>
      </div>

      <p className="text-xs text-gray-600 mb-4">{pack.description}</p>

      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-xs text-gray-500">Price</p>
          <p className="text-lg font-bold text-gray-900">${pack.price}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">Impact</p>
          <p className="text-sm font-semibold text-emerald-600">{pack.impact}</p>
        </div>
      </div>

      <button className="w-full py-2 bg-gradient-to-r from-emerald-400 to-green-500 text-white rounded-lg text-sm font-semibold hover:shadow-lg transition-all duration-300 group-hover:scale-105">
        Purchase Credits
      </button>
    </div>
  );
};

export default CarbonPackCard;