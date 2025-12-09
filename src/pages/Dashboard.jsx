import React, { useState, useEffect } from 'react';
import { 
  FiTrendingUp, 
  FiUsers, 
  FiAward, 
  FiCalendar,
  FiDollarSign,
  FiBarChart2,
  FiStar,
  FiZap,
  FiShoppingCart,
  FiCreditCard,
  FiCheck,
  FiX,
  FiCopy,
  FiInfo,
  FiChevronRight
  } from 'react-icons/fi';
import { GiRecycle, GiTreeRoots, GiPineTree } from 'react-icons/gi';
import { QRCodeSVG } from 'qrcode.react';
import { FaLeaf } from "react-icons/fa6";
import { IoIosLeaf } from "react-icons/io";

const Dashboard = () => {
  const [activePlan, setActivePlan] = useState(null);
  const [selectedCarbonPack, setSelectedCarbonPack] = useState(null);
  const [showInvestmentPopup, setShowInvestmentPopup] = useState(false);
  const [showCarbonPopup, setShowCarbonPopup] = useState(false);
  const [selectedInvestmentPlan, setSelectedInvestmentPlan] = useState(null);
  const [transactionHash, setTransactionHash] = useState('');
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [showReferralPopup, setShowReferralPopup] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    userStats: {
      totalInvestment: 1250,
      activeDays: 45,
      carbonCredits: 12.5,
      referralCount: 8,
      currentTier: 'Silver',
      nextTier: 'Gold',
      badge: 'Gold',
      dailyROI: 7.25,
      levelIncome: 0.52,
      greenBonus: 3.2,
      totalEarnings: 89.7,
      userId: 'ABC123'
    },
    activePlans: [
      { 
        name: 'Eco Pro', 
        amount: 500, 
        startDate: '2024-01-15', 
        dailyROI: 6.5, 
        progress: 65,
        endDate: '2024-04-14',
        estimatedReturn: 900
      }
    ]
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const investmentPlans = [
    {
      name: 'Eco Starter',
      minAmount: 10,
      dailyROI: 1.0,
      duration: '80 Days',
      maxReturn: '1.8x',
      color: 'from-emerald-400 to-green-500',
      badge: 'Popular',
      features: ['Basic Returns', '80 Days Term', '1.8x Max Return', 'Low Risk']
    },
    {
      name: 'Eco Grow',
      minAmount: 25,
      dailyROI: 1.2,
      duration: '85 Days',
      maxReturn: '2.0x',
      color: 'from-teal-400 to-emerald-500',
      features: ['Enhanced ROI', '85 Days Term', '2.0x Max Return', 'Medium Risk']
    },
    {
      name: 'Eco Pro',
      minAmount: 50,
      dailyROI: 1.3,
      duration: '90 Days',
      maxReturn: '2.2x',
      color: 'from-green-500 to-emerald-600',
      badge: 'Recommended',
      features: ['Professional Tier', '90 Days Term', '2.2x Max Return', 'High Reward']
    },
    {
      name: 'Eco Elite',
      minAmount: 100,
      dailyROI: 1.35,
      duration: '95 Days',
      maxReturn: '2.3x',
      color: 'from-emerald-500 to-teal-600',
      features: ['Elite Returns', '95 Days Term', '2.3x Max Return', 'Premium']
    },
    {
      name: 'Eco Infinity',
      minAmount: 500,
      dailyROI: 1.4,
      duration: '100 Days',
      maxReturn: '2.5x',
      color: 'from-teal-500 to-green-700',
      badge: 'Premium',
      features: ['Maximum Returns', '100 Days Term', '2.5x Max Return', 'VIP Access']
    }
  ];

  const carbonPacks = [
    {
      name: 'Mini Pack',
      price: 1.5,
      credits: 0.1,
      popular: false,
      description: 'Perfect for starters',
      icon: <IoIosLeaf className="w-5 h-5 text-emerald-500" />
    },
    {
      name: 'Starter Pack',
      price: 6,
      credits: 0.5,
      popular: true,
      description: 'Most popular choice',
      icon: <FaLeaf className="w-5 h-5 text-green-500" />
    },
    {
      name: 'Standard Pack',
      price: 12,
      credits: 1.0,
      popular: false,
      description: 'Great value',
      icon: <GiTreeRoots className="w-5 h-5 text-emerald-600" />
    },
    {
      name: 'Bundle Pack',
      price: 55,
      credits: 5.0,
      popular: false,
      description: 'Maximum benefits',
      icon: <GiPineTree className="w-5 h-5 text-green-600" />
    }
  ];

  const StatsCard = ({ icon, title, value, subtitle, color, trend, delay }) => (
    <div 
      className={`bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-emerald-100/50 hover:shadow-2xl transition-all duration-500 group hover:scale-[1.02] transform-gpu ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-600 truncate">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2 truncate">{value}</p>
          <p className="text-xs text-gray-500 mt-1 truncate">{subtitle}</p>
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <FiTrendingUp className="w-3 h-3 text-green-500 flex-shrink-0" />
              <span className="text-xs text-green-600 font-medium truncate">{trend}</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-xl bg-gradient-to-br ${color} group-hover:scale-110 transition-transform duration-300 shadow-lg flex-shrink-0 ml-4 relative overflow-hidden`}>
          <div className="absolute inset-0 bg-white/20 transform -skew-x-12 translate-x-8 group-hover:translate-x-0 transition-transform duration-500"></div>
          {icon}
        </div>
      </div>
    </div>
  );

  const PlanCard = ({ plan, isActive, hasActivePlan, onInvest, delay }) => (
    <div 
      className={`relative bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border-2 ${
        isActive ? 'border-emerald-400 shadow-emerald-100/50' : 'border-emerald-100/50 hover:border-emerald-300'
      } transition-all duration-500 group hover:shadow-2xl h-full flex flex-col transform-gpu ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {plan.badge && (
        <div className="absolute -top-2 left-4 z-10">
          <span className="px-3 py-1 bg-gradient-to-r from-amber-400 to-amber-500 text-white text-xs font-bold rounded-full shadow-lg">
            {plan.badge}
          </span>
        </div>
      )}

      {isActive && (
        <div className="absolute -top-2 right-4 z-10">
          <span className="px-3 py-1 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
            <FiZap className="w-3 h-3" />
            Active
          </span>
        </div>
      )}

      <div className="text-center mb-6 flex-shrink-0 relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-green-500 rounded-lg blur opacity-10 group-hover:opacity-20 transition duration-1000 group-hover:duration-200"></div>
        <h3 className="font-bold text-gray-900 text-lg relative">{plan.name}</h3>
        <div className="w-12 h-1 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full mx-auto mt-2 relative"></div>
      </div>
      
      <div className="space-y-1 mb-1 flex-1">
        <div className="flex justify-between items-center p-1 rounded-lg hover:bg-emerald-50/50 transition-colors duration-300 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center gap-2">
            <FiDollarSign className="w-4 h-4 text-emerald-500" />
            <span className="text-sm text-gray-600">Min Investment</span>
          </div>
          <span className="font-bold text-gray-900">${plan.minAmount}</span>
        </div>
        <div className="flex justify-between items-center p-1 rounded-lg hover:bg-emerald-50/50 transition-colors duration-300 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center gap-2">
            <FiTrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-sm text-gray-600">Daily ROI</span>
          </div>
          <span className="font-bold text-green-600">{plan.dailyROI}%</span>
        </div>
        <div className="flex justify-between items-center p-1 rounded-lg hover:bg-emerald-50/50 transition-colors duration-300 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center gap-2">
            <FiCalendar className="w-4 h-4 text-teal-500" />
            <span className="text-sm text-gray-600">Duration</span>
          </div>
          <span className="font-semibold text-gray-900">{plan.duration}</span>
        </div>
        <div className="flex justify-between items-center p-1 mb-4 rounded-lg hover:bg-emerald-50/50 transition-colors duration-300 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center gap-2">
            <FiAward className="w-4 h-4 text-amber-500" />
            <span className="text-sm text-gray-600">Max Return</span>
          </div>
          <span className="font-bold text-emerald-600">{plan.maxReturn}</span>
        </div>
      </div>

      <div className="space-y-1 mb-6 flex-shrink-0">
        {plan.features.map((feature, index) => (
          <div key={index} className="flex items-center gap-2 p-1 rounded-lg hover:bg-emerald-50/30 transition-colors duration-300">
            <FiCheck className="w-4 h-4 text-green-500 flex-shrink-0" />
            <span className="text-xs text-gray-600 truncate">{feature}</span>
          </div>
        ))}
      </div>

      <button 
        onClick={() => onInvest(plan)}
        disabled={hasActivePlan && !isActive}
        className={`w-full py-3 rounded-xl font-bold text-sm transition-all duration-300 mt-auto flex-shrink-0 relative overflow-hidden group ${
          isActive 
            ? 'bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 border-2 border-emerald-200 cursor-not-allowed' 
            : hasActivePlan && !isActive
            ? 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 cursor-not-allowed'
            : 'bg-gradient-to-r from-emerald-700 to-green-500 text-white hover:shadow-lg transform hover:scale-[1.02] shadow-md'
        }`}
      >
        {!isActive && !hasActivePlan && (
          <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-8 group-hover:translate-x-8 transition-transform duration-700"></div>
        )}
        <span className="relative flex items-center justify-center gap-2">
          {isActive ? (
            <>
              <FiCheck className="w-4 h-4" />
              Plan Active
            </>
          ) : hasActivePlan && !isActive ? (
            <>
              <FiInfo className="w-4 h-4" />
              One Plan Limit
            </>
          ) : (
            <>
              Invest Now
              <FiChevronRight className="w-4 h-4" />
            </>
          )}
        </span>
      </button>
    </div>
  );

  const CarbonPackCard = ({ pack, onSelect, delay }) => (
    <div 
      className={`relative bg-white/90 backdrop-blur-md rounded-2xl p-6 border-2 border-emerald-100/50 hover:border-emerald-300 transition-all duration-500 cursor-pointer group hover:shadow-2xl h-full flex flex-col transform-gpu ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
      onClick={() => onSelect(pack)}
    >
      {pack.popular && (
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-10">
          <span className="px-4 py-1 bg-gradient-to-r from-amber-400 to-amber-500 text-white text-xs font-bold rounded-full shadow-lg whitespace-nowrap">
            MOST POPULAR
          </span>
        </div>
      )}

      <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-400 to-green-500 rounded-2xl blur opacity-5 group-hover:opacity-10 transition duration-1000 group-hover:duration-200"></div>

      <div className="text-center mb-4 flex-shrink-0 relative">
        <div className="flex justify-center mb-2">
          <div className="p-3 bg-gradient-to-br from-emerald-50 to-green-100 rounded-xl">
            {pack.icon}
          </div>
        </div>
        <h3 className="font-bold text-gray-900 text-lg relative">{pack.name}</h3>
        <p className="text-sm text-gray-500 mt-1 relative">{pack.description}</p>
      </div>

      <div className="text-center mb-4 flex-shrink-0 relative">
        <div className="flex justify-center items-baseline gap-1">
          <span className="text-2xl font-bold text-gray-900 relative">${pack.price}</span>
          <span className="text-xs text-gray-500 relative">one-time</span>
        </div>
        <p className="text-xs text-gray-500 mt-1 relative">{pack.credits} tCO2 credits</p>
      </div>

      <div className="bg-gradient-to-br from-emerald-50/80 to-green-100/80 rounded-lg p-4 mb-4 flex-1 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 to-green-500/5 transform -skew-x-12 -translate-x-8 group-hover:translate-x-8 transition-transform duration-700"></div>
        <div className="flex items-center justify-center gap-2 relative mb-2">
          <GiTreeRoots className="w-5 h-5 text-emerald-600" />
          <span className="font-semibold text-emerald-700">{pack.credits} Carbon Credits</span>
        </div>
        <p className="text-xs text-emerald-600/80 text-center">
          Equivalent to planting {Math.round(pack.credits * 20)} trees
        </p>
      </div>

      <button className="w-full py-3 rounded-xl font-bold text-sm transition-all duration-300 flex-shrink-0 bg-gradient-to-r from-emerald-700 to-green-500 text-white hover:shadow-lg hover:scale-[1.02] shadow-md relative overflow-hidden group">
        <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-8 group-hover:translate-x-8 transition-transform duration-700"></div>
        <span className="relative flex items-center justify-center gap-2">
          Select Pack
          <FiChevronRight className="w-4 h-4" />
        </span>
      </button>
    </div>
  );

  const InvestmentPopup = () => {
    if (!showInvestmentPopup || !selectedInvestmentPlan) return null;

    const walletAddress = "0x742d35Cc6634C0532925a3b8D4B5A3B4d4F5F6E7";

    const handleSubmit = (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      console.log({
        plan: selectedInvestmentPlan.name,
        amount: investmentAmount || selectedInvestmentPlan.minAmount,
        transactionHash: transactionHash
      });
      
      setDashboardData(prev => ({
        ...prev,
        activePlans: [
          ...prev.activePlans,
          {
            name: selectedInvestmentPlan.name,
            amount: parseFloat(investmentAmount) || selectedInvestmentPlan.minAmount,
            startDate: new Date().toISOString().split('T')[0],
            dailyROI: selectedInvestmentPlan.dailyROI * (parseFloat(investmentAmount) || selectedInvestmentPlan.minAmount) / 100,
            progress: 0,
            endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            estimatedReturn: (parseFloat(investmentAmount) || selectedInvestmentPlan.minAmount) * 2.2
          }
        ],
        userStats: {
          ...prev.userStats,
          totalInvestment: prev.userStats.totalInvestment + (parseFloat(investmentAmount) || selectedInvestmentPlan.minAmount)
        }
      }));
      
      setShowInvestmentPopup(false);
      setTransactionHash('');
      setInvestmentAmount('');
    };

    const handleAmountChange = (e) => {
      const value = e.target.value;
      if (value === '' || /^\d*\.?\d*$/.test(value)) {
        setInvestmentAmount(value);
      }
    };

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto relative animate-scaleIn">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl -z-10"></div>
          
          {/* Close Button */}
          <button 
            onClick={() => setShowInvestmentPopup(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-300 bg-white rounded-full p-2 shadow-lg hover:shadow-xl hover:scale-110"
          >
            <FiX className="w-5 h-5" />
          </button>

          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <FiTrendingUp className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Invest in {selectedInvestmentPlan.name}
            </h2>
            <p className="text-gray-600">Complete your investment securely</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Plan Summary */}
            <div className="p-4 bg-gradient-to-br from-emerald-50 to-green-100 rounded-xl border border-emerald-200">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-xs text-gray-600">Daily ROI</p>
                  <p className="font-bold text-emerald-700">{selectedInvestmentPlan.dailyROI}%</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-600">Duration</p>
                  <p className="font-bold text-emerald-700">{selectedInvestmentPlan.duration}</p>
                </div>
              </div>
            </div>

            {/* Amount Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Investment Amount (USD)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="text"
                  value={investmentAmount}
                  onChange={handleAmountChange}
                  placeholder={`Minimum: $${selectedInvestmentPlan.minAmount}`}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg font-semibold transition-all duration-300"
                  required
                  min={selectedInvestmentPlan.minAmount}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Minimum investment: ${selectedInvestmentPlan.minAmount}
              </p>
            </div>

            {/* QR Code */}
            <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-green-100 rounded-xl border border-emerald-200">
              <p className="text-sm font-medium text-gray-700 mb-3">Scan to Pay</p>
              <div className="bg-white p-4 rounded-lg border-2 border-emerald-200 inline-block shadow-lg">
                <QRCodeSVG 
                  value={walletAddress}
                  size={140}
                  level="M"
                  includeMargin
                />
              </div>
            </div>

            {/* Wallet Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Wallet Address
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={walletAddress}
                  readOnly
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl text-sm bg-gray-50 truncate font-mono transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(walletAddress);
                    alert('Address copied to clipboard!');
                  }}
                  className="px-4 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-2 transform hover:scale-105"
                >
                  <FiCopy className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Transaction Hash Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transaction Hash
              </label>
              <input
                type="text"
                value={transactionHash}
                onChange={(e) => setTransactionHash(e.target.value)}
                placeholder="Enter your transaction hash"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm transition-all duration-300"
                required
              />
            </div>

            <div className="space-y-4">
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl font-bold hover:shadow-lg transition-all duration-300 text-lg transform hover:scale-[1.02] relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-8 group-hover:translate-x-8 transition-transform duration-700"></div>
                <span className="relative">Confirm Investment</span>
              </button>
              
              <button
                type="button"
                onClick={() => setShowInvestmentPopup(false)}
                className="w-full py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl font-bold hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const CarbonPopup = () => {
    if (!showCarbonPopup || !selectedCarbonPack) return null;

    const walletAddress = "0x8a3bD8c7C8e5F2a1E4f6C8d9b0A2c3E5f7a9B1d2";

    const handleSubmit = (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      console.log({
        pack: selectedCarbonPack.name,
        amount: selectedCarbonPack.price,
        credits: selectedCarbonPack.credits,
        transactionHash: transactionHash
      });
      
      setDashboardData(prev => ({
        ...prev,
        userStats: {
          ...prev.userStats,
          carbonCredits: prev.userStats.carbonCredits + selectedCarbonPack.credits
        }
      }));
      
      setShowCarbonPopup(false);
      setTransactionHash('');
    };

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto relative animate-scaleIn">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl -z-10"></div>
          
          {/* Close Button */}
          <button 
            onClick={() => setShowCarbonPopup(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-300 bg-white rounded-full p-2 shadow-lg hover:shadow-xl hover:scale-110"
          >
            <FiX className="w-5 h-5" />
          </button>

          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              {selectedCarbonPack.icon}
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {selectedCarbonPack.name}
            </h2>
            <p className="text-gray-600">{selectedCarbonPack.description}</p>
            <div className="mt-4 p-4 bg-gradient-to-br from-emerald-50 to-green-100 rounded-xl border border-emerald-200">
              <p className="text-lg font-bold text-emerald-700">
                ${selectedCarbonPack.price} • {selectedCarbonPack.credits} Carbon Credits
              </p>
              <p className="text-sm text-emerald-600 mt-1">
                Equivalent to planting {Math.round(selectedCarbonPack.credits * 20)} trees
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* QR Code */}
            <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-green-100 rounded-xl border border-emerald-200">
              <p className="text-sm font-medium text-gray-700 mb-3">Scan to Pay</p>
              <div className="bg-white p-4 rounded-lg border-2 border-emerald-200 inline-block shadow-lg">
                <QRCodeSVG 
                  value={walletAddress}
                  size={140}
                  level="M"
                  includeMargin
                />
              </div>
            </div>

            {/* Wallet Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Wallet
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={walletAddress}
                  readOnly
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl text-sm bg-gray-50 truncate font-mono transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(walletAddress);
                    alert('Address copied to clipboard!');
                  }}
                  className="px-4 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-2 transform hover:scale-105"
                >
                  <FiCopy className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Transaction Hash Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transaction Hash
              </label>
              <input
                type="text"
                value={transactionHash}
                onChange={(e) => setTransactionHash(e.target.value)}
                placeholder="Enter your transaction hash"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm transition-all duration-300"
                required
              />
            </div>

            <div className="space-y-4">
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl font-bold hover:shadow-lg transition-all duration-300 text-lg transform hover:scale-[1.02] relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-8 group-hover:translate-x-8 transition-transform duration-700"></div>
                <span className="relative">Purchase Carbon Credits</span>
              </button>
              
              <button
                type="button"
                onClick={() => setShowCarbonPopup(false)}
                className="w-full py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl font-bold hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const handleInvest = (plan) => {
    const hasActivePlan = dashboardData.activePlans.length > 0;
    const isActive = dashboardData.activePlans.some(active => active.name === plan.name);
    
    if (hasActivePlan && !isActive) {
      alert('You can only have one active investment plan at a time. Please complete your current plan before investing in another.');
      return;
    }
    
    setSelectedInvestmentPlan(plan);
    setInvestmentAmount(plan.minAmount.toString());
    setShowInvestmentPopup(true);
  };

  const handleCarbonSelect = (pack) => {
    setSelectedCarbonPack(pack);
    setTransactionHash('');
    setShowCarbonPopup(true);
  };

  const hasActivePlan = dashboardData.activePlans.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50/30 to-teal-50/50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-200/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-200/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-60 h-60 bg-teal-200/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
        
        {/* Floating leaves/trees */}
        <div className="absolute top-0 left-10 animate-float-slow">
          <GiPineTree className="w-32 h-32 text-emerald-300/40" />
        </div>
        <div className="absolute top-0 right-20 animate-float-slow" style={{ animationDelay: '1s' }}>
          <IoIosLeaf className="w-32 h-32 text-green-300/40" />
        </div>
      </div>

      <div className="mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 transform-gpu">
          <div className={`transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent mb-4">
              Eco Investment Platform
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Invest sustainably while offsetting your carbon footprint. Earn returns and contribute to a greener planet.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            icon={<FiDollarSign className="w-6 h-6 text-white" />}
            title="Total Investment"
            value={`$${dashboardData.userStats.totalInvestment}`}
            subtitle="Active portfolio"
            trend="+5.2% this month"
            color="from-emerald-700 to-green-700"
            delay={100}
          />
          <StatsCard
            icon={<FiTrendingUp className="w-6 h-6 text-white" />}
            title="Daily ROI"
            value={`$${dashboardData.userStats.dailyROI}`}
            subtitle="Current earnings"
            trend="+$0.25 today"
            color="from-green-700 to-emerald-700"
            delay={200}
          />
          <StatsCard
            icon={<GiRecycle className="w-6 h-6 text-white" />}
            title="Carbon Credits"
            value={dashboardData.userStats.carbonCredits}
            subtitle="Tons recycled"
            trend="+2.1 this week"
            color="from-teal-700 to-emerald-600"
            delay={300}
          />
          <StatsCard
            icon={<FiUsers className="w-6 h-6 text-white" />}
            title="Level Income"
            value={`$${dashboardData.userStats.levelIncome}`}
            subtitle="From referrals"
            trend="3 active levels"
            color="from-amber-700 to-amber-600"
            delay={400}
          />
        </div>

        {/* Main Content Grid */}
        <div className="space-y-8">
          {/* Investment Plans & Carbon Credits Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Investment Plans - 2/3 width */}
            <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl md:p-8 p-4 shadow-2xl border border-emerald-100/50 transform-gpu">
              <div className={`transition-all duration-700 delay-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Investment Plans</h2>
                    <p className="text-gray-600 mt-2">Choose your sustainable investment path</p>
                    {hasActivePlan && (
                      <div className="mt-2 p-3 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-lg max-w-md">
                        <p className="text-sm text-amber-700 flex items-center gap-2">
                          <FiInfo className="w-4 h-4 flex-shrink-0" />
                          You can only have one active investment plan at a time. Complete your current plan to invest in another.
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full shadow-lg">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span className="text-xs font-bold text-white">LIVE MARKET</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {investmentPlans.map((plan, index) => {
                    const isActive = dashboardData.activePlans.some(active => active.name === plan.name);
                    return (
                      <PlanCard
                        key={index}
                        plan={plan}
                        isActive={isActive}
                        hasActivePlan={hasActivePlan}
                        onInvest={handleInvest}
                        delay={600 + index * 100}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Carbon Credit Program - 1/3 width */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl md:p-8 p-4 shadow-2xl border border-emerald-100/50 transform-gpu">
              <div className={`transition-all duration-700 delay-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Carbon Credits</h2>
                    <p className="text-gray-600 mt-2">Purchase carbon offset credits</p>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-emerald-400 to-green-500 rounded-xl shadow-lg">
                    <GiTreeRoots className="w-6 h-6 text-white" />
                  </div>
                </div>

                <div className="space-y-6">
                  {carbonPacks.map((pack, index) => (
                    <CarbonPackCard
                      key={index}
                      pack={pack}
                      onSelect={handleCarbonSelect}
                      delay={800 + index * 100}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section - Active Plans and Earnings */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Active Plans Progress - Improved Layout */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-emerald-100/50 transform-gpu">
              <div className={`transition-all duration-700 delay-900 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Active Plans Progress</h2>
                  <span className="px-3 py-1 bg-gradient-to-r from-emerald-400 to-green-500 text-white text-xs font-bold rounded-full">
                    {dashboardData.activePlans.length} Active
                  </span>
                </div>
                
                {dashboardData.activePlans.length > 0 ? (
                  <div className="space-y-6">
                    {dashboardData.activePlans.map((plan, index) => (
                      <div key={index} className="group transform hover:scale-[1.01] transition-transform duration-300">
                        <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-6 border border-emerald-200">
                          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="p-3 bg-gradient-to-r from-emerald-400 to-green-500 rounded-lg shadow-md flex-shrink-0">
                                <FiTrendingUp className="w-5 h-5 text-white" />
                              </div>
                              <div className="min-w-0">
                                <h3 className="font-bold text-gray-900 truncate">{plan.name}</h3>
                                <p className="text-sm text-gray-500 truncate">${plan.amount} invested</p>
                              </div>
                            </div>
                            <div className="flex flex-col items-end">
                              <span className="text-lg font-bold text-emerald-600 whitespace-nowrap">+${plan.dailyROI}/day</span>
                              <span className="text-xs text-gray-500">Daily Returns</span>
                            </div>
                          </div>

                          {/* Progress Bar */}
                          <div className="space-y-2 mb-4">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Progress</span>
                              <span className="font-bold text-emerald-700">{plan.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                              <div 
                                className="bg-gradient-to-r from-emerald-400 to-green-500 h-3 rounded-full transition-all duration-1000 ease-out"
                                style={{ width: `${plan.progress}%` }}
                              ></div>
                            </div>
                          </div>

                          {/* Plan Details */}
                          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-emerald-100">
                            <div>
                              <p className="text-xs text-gray-500">Start Date</p>
                              <p className="text-sm font-medium text-gray-900">{plan.startDate}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">End Date</p>
                              <p className="text-sm font-medium text-gray-900">{plan.endDate}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Invested</p>
                              <p className="text-sm font-medium text-gray-900">${plan.amount}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Est. Return</p>
                              <p className="text-sm font-medium text-emerald-700">${plan.estimatedReturn}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gradient-to-r from-emerald-100 to-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiTrendingUp className="w-10 h-10 text-emerald-400" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">No Active Plans</h3>
                    <p className="text-gray-600 mb-6">Start investing to see your progress here</p>
                    <button
                      onClick={() => handleInvest(investmentPlans[0])}
                      className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      Start Investing
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Earnings Summary */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-emerald-100/50 transform-gpu">
              <div className={`transition-all duration-700 delay-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Earnings Summary</h2>
                  <button 
                    onClick={() => setShowReferralPopup(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    <FiUsers className="w-4 h-4" />
                    <span className="text-sm font-semibold">Share & Earn</span>
                  </button>
                </div>
                
                <div className="space-y-4">
                  {[
                    { icon: <FiTrendingUp className="w-5 h-5 text-green-600" />, label: 'Daily ROI', value: `$${dashboardData.userStats.dailyROI}`, color: 'from-green-50 to-emerald-50', border: 'border-green-100' },
                    { icon: <FiUsers className="w-5 h-5 text-blue-600" />, label: 'Level Income', value: `$${dashboardData.userStats.levelIncome}`, color: 'from-blue-50 to-indigo-50', border: 'border-blue-100' },
                    { icon: <GiRecycle className="w-5 h-5 text-emerald-600" />, label: 'Green Bonus', value: `$${dashboardData.userStats.greenBonus}`, color: 'from-emerald-50 to-green-50', border: 'border-emerald-100' },
                    { icon: <FiDollarSign className="w-5 h-5 text-amber-600" />, label: 'Total Earnings', value: `$${dashboardData.userStats.totalEarnings}`, color: 'from-amber-50 to-amber-50', border: 'border-amber-100' }
                  ].map((item, index) => (
                    <div 
                      key={index}
                      className={`flex justify-between items-center p-4 bg-gradient-to-r ${item.color} rounded-xl border ${item.border} transform hover:scale-[1.02] transition-all duration-300 cursor-pointer group`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="p-2 bg-white rounded-lg shadow-sm group-hover:shadow-md transition-shadow duration-300">
                          {item.icon}
                        </div>
                        <span className="font-medium text-gray-900 truncate">{item.label}</span>
                      </div>
                      <span className={`font-bold ${
                        item.label.includes('ROI') ? 'text-green-600' :
                        item.label.includes('Level') ? 'text-blue-600' :
                        item.label.includes('Green') ? 'text-emerald-600' : 'text-amber-600'
                      } whitespace-nowrap ml-2`}>
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Referral Section */}
                <div className="mt-8 p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <FiUsers className="w-5 h-5 text-emerald-600" />
                      <h3 className="font-semibold text-gray-900">Your Referral Link</h3>
                    </div>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">
                      {dashboardData.userStats.referralCount} Referrals
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex-1 px-4 py-3 bg-white border border-emerald-200 rounded-xl text-sm truncate font-mono">
                      https://eco-invest.com/ref/{dashboardData.userStats.userId}
                    </div>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(`https://eco-invest.com/ref/${dashboardData.userStats.userId}`);
                        alert('Referral link copied to clipboard!');
                      }}
                      className="px-4 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                    >
                      <FiCopy className="w-4 h-4" />
                      <span className="text-sm font-semibold">Copy</span>
                    </button>
                  </div>
                  
                  <p className="text-xs text-gray-600">
                    Share your referral link to earn commission from your friends' investments
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Investment Popup */}
      <InvestmentPopup />
      
      {/* Carbon Popup */}
      <CarbonPopup />

      {/* Referral Popup */}
      {showReferralPopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full animate-scaleIn">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl -z-10"></div>
            <button 
              onClick={() => setShowReferralPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-300 bg-white rounded-full p-2 shadow-lg hover:shadow-xl hover:scale-110"
            >
              <FiX className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <FiUsers className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Share & Earn Rewards</h2>
              <p className="text-gray-600">Invite friends and earn commission</p>
            </div>

            <div className="space-y-6">
              {/* Referral Link */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Referral Link
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={`https://eco-invest.com/ref/${dashboardData.userStats.userId}`}
                    readOnly
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl text-sm bg-gray-50 truncate font-mono transition-all duration-300"
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(`https://eco-invest.com/ref/${dashboardData.userStats.userId}`);
                      alert('Link copied to clipboard!');
                    }}
                    className="px-4 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                  >
                    <FiCopy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Referral Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gradient-to-br from-emerald-50 to-green-100 rounded-xl border border-emerald-200 text-center">
                  <p className="text-sm text-gray-600">Total Referrals</p>
                  <p className="text-2xl font-bold text-emerald-700">{dashboardData.userStats.referralCount}</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-amber-50 to-yellow-100 rounded-xl border border-amber-200 text-center">
                  <p className="text-sm text-gray-600">Earned</p>
                  <p className="text-2xl font-bold text-amber-700">${dashboardData.userStats.levelIncome}</p>
                </div>
              </div>

              {/* Share Options */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">Share via</p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      const text = `Join me on Eco Investment Platform! Use my referral link: https://eco-invest.com/ref/${dashboardData.userStats.userId}`;
                      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
                    }}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all duration-300"
                  >
                    <span className="text-sm font-semibold">WhatsApp</span>
                  </button>
                  <button
                    onClick={() => {
                      const text = `Join me on Eco Investment Platform! Use my referral link: https://eco-invest.com/ref/${dashboardData.userStats.userId}`;
                      window.open(`mailto:?subject=Join Eco Investment&body=${encodeURIComponent(text)}`, '_blank');
                    }}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all duration-300"
                  >
                    <span className="text-sm font-semibold">Email</span>
                  </button>
                </div>
              </div>

              {/* Referral Benefits */}
              <div className="p-4 bg-gradient-to-br from-emerald-50 to-green-100 rounded-xl border border-emerald-200">
                <h3 className="font-semibold text-gray-900 mb-2">Referral Benefits</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <FiCheck className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">Earn 5% commission on level 1 referrals</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FiCheck className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">2% commission on level 2 referrals</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FiCheck className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">1% commission on level 3 referrals</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => setShowReferralPopup(false)}
                className="w-full py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl font-bold hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          33% { transform: translateY(-10px) translateX(5px) rotate(2deg); }
          66% { transform: translateY(5px) translateX(-5px) rotate(-2deg); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;