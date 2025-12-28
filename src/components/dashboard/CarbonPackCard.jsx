import React from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { GiTreeRoots } from 'react-icons/gi';

const CarbonPackCard = ({ pack, onSelect, delay, isVisible }) => (
  <div 
    className={`relative bg-white/90 backdrop-blur-md rounded-2xl p-4 md:p-6 border-2 border-emerald-100/50 hover:border-emerald-300 transition-all duration-500 cursor-pointer group hover:shadow-2xl h-full flex flex-col transform-gpu ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
    }`}
    style={{ transitionDelay: `${delay}ms` }}
    onClick={() => onSelect(pack)}
  >
    {pack.popular && (
      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-10">
        <span className="px-2 md:px-4 py-1 bg-gradient-to-r from-amber-400 to-amber-500 text-white text-xs font-bold rounded-full shadow-lg whitespace-nowrap">
          MOST POPULAR
        </span>
      </div>
    )}

    <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-400 to-green-500 rounded-2xl blur opacity-5 group-hover:opacity-10 transition duration-1000 group-hover:duration-200"></div>

    <div className="text-center mb-3 md:mb-4 flex-shrink-0 relative">
      <div className="flex justify-center mb-1 md:mb-2">
        <div className="p-2 md:p-3 bg-gradient-to-br from-emerald-50 to-green-100 rounded-xl">
          {pack.icon}
        </div>
      </div>
      <h3 className="font-bold text-gray-900 text-base md:text-lg relative">{pack.name}</h3>
      <p className="text-xs text-gray-500 mt-1 relative line-clamp-1">{pack.description}</p>
    </div>

    <div className="text-center mb-3 md:mb-4 flex-shrink-0 relative">
      <div className="flex justify-center items-baseline gap-1">
        <span className="text-lg md:text-2xl font-bold text-gray-900 relative">${pack.price}</span>
        <span className="text-xs text-gray-500 relative">one-time</span>
      </div>
      <p className="text-xs text-gray-500 mt-1 relative">{pack.credits} tCO2 credits</p>
    </div>

    <div className="bg-gradient-to-br from-emerald-50/80 to-green-100/80 rounded-lg p-3 md:p-4 mb-3 md:mb-4 flex-1 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 to-green-500/5 transform -skew-x-12 -translate-x-8 group-hover:translate-x-8 transition-transform duration-700"></div>
      <div className="flex items-center justify-center gap-1 md:gap-2 relative mb-1 md:mb-2">
        <GiTreeRoots className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" />
        <span className="font-semibold text-emerald-700 text-sm md:text-base">{pack.credits} Carbon Credits</span>
      </div>
      <p className="text-xs text-emerald-600/80 text-center">
        Equivalent to planting {Math.round(pack.credits * 20)} trees
      </p>
    </div>

    <button className="w-full py-2 md:py-3 rounded-xl font-bold text-xs md:text-sm transition-all duration-300 flex-shrink-0 bg-gradient-to-r from-emerald-700 to-green-500 text-white hover:shadow-lg hover:scale-[1.02] shadow-md relative overflow-hidden group">
      <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-8 group-hover:translate-x-8 transition-transform duration-700"></div>
      <span className="relative flex items-center justify-center gap-1 md:gap-2">
        <span className="truncate">Select Pack</span>
        <FiChevronRight className="w-3 h-3 md:w-4 md:h-4" />
      </span>
    </button>
  </div>
);

export default CarbonPackCard;