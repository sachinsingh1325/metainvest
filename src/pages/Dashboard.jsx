import React, { useState } from 'react';
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
  FiCheck
} from 'react-icons/fi';
import { GiRecycle, GiTreeRoots } from 'react-icons/gi';

const Dashboard = () => {
  const [activePlan, setActivePlan] = useState(null);
  const [selectedCarbonPack, setSelectedCarbonPack] = useState(null);

  // Mock data
  const dashboardData = {
    userStats: {
      totalInvestment: 1250,
      activeDays: 45,
      carbonCredits: 12.5,
      referralCount: 8,
      currentTier: 'Silver',
      nextTier: 'Gold',
      badge: 'Gold'
    },
    activePlans: [
      { name: 'Eco Pro', amount: 500, startDate: '2024-01-15', dailyROI: 6.5, progress: 65 },
      { name: 'Eco Starter', amount: 100, startDate: '2024-02-01', dailyROI: 1.1, progress: 30 }
    ],
    recentActivity: [
      { type: 'ROI', amount: 3.25, date: '2024-03-20', description: 'Daily Returns', status: 'completed' },
      { type: 'Referral', amount: 0.05, date: '2024-03-19', description: 'Referral Bonus', status: 'completed' },
      { type: 'Carbon', amount: 0.5, date: '2024-03-18', description: 'Carbon Bonus', status: 'completed' }
    ]
  };

  const investmentPlans = [
    {
      name: 'Eco Starter',
      minAmount: 10,
      dailyROI: 1.1,
      duration: '150 Days',
      maxReturn: '3x',
      color: 'from-emerald-400 to-green-500',
      badge: 'Popular',
      features: ['Basic Returns', '150 Days Term', '3x Max Return']
    },
    {
      name: 'Eco Grow',
      minAmount: 25,
      dailyROI: 1.2,
      duration: '138 Days',
      maxReturn: '3.5x',
      color: 'from-teal-400 to-emerald-500',
      features: ['Enhanced ROI', '138 Days Term', '3.5x Max Return']
    },
    {
      name: 'Eco Pro',
      minAmount: 50,
      dailyROI: 1.3,
      duration: '120 Days',
      maxReturn: '4x',
      color: 'from-green-500 to-emerald-600',
      badge: 'Recommended',
      features: ['Professional Tier', '120 Days Term', '4x Max Return']
    },
    {
      name: 'Eco Elite',
      minAmount: 100,
      dailyROI: 1.4,
      duration: '110 Days',
      maxReturn: '5x',
      color: 'from-emerald-500 to-teal-600',
      features: ['Elite Returns', '110 Days Term', '5x Max Return']
    },
    {
      name: 'Eco Infinity',
      minAmount: 500,
      dailyROI: 1.5,
      duration: '100 Days',
      maxReturn: '6x',
      color: 'from-teal-500 to-green-700',
      badge: 'Premium',
      features: ['Maximum Returns', '100 Days Term', '6x Max Return']
    }
  ];

  const carbonPacks = [
    {
      name: 'Mini Pack',
      price: 5,
      creditRange: '$0.5-$1',
      credits: 0.1,
      popular: false,
      description: 'Perfect for starters'
    },
    {
      name: 'Starter Pack',
      price: 6,
      creditRange: '$1-$2',
      credits: 0.2,
      popular: true,
      description: 'Most popular choice'
    },
    {
      name: 'Standard Pack',
      price: 12,
      creditRange: '$2-$4',
      credits: 0.5,
      popular: false,
      description: 'Great value'
    },
    {
      name: 'Bundle Pack',
      price: 35,
      creditRange: 'Premium',
      credits: 1.0,
      popular: false,
      description: 'Maximum benefits'
    }
  ];

  const StatsCard = ({ icon, title, value, subtitle, color, trend }) => (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group hover:scale-[1.02]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
          <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <FiTrendingUp className="w-3 h-3 text-green-500" />
              <span className="text-xs text-green-600 font-medium">{trend}</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-xl bg-gradient-to-br ${color} group-hover:scale-110 transition-transform duration-300 shadow-md`}>
          {icon}
        </div>
      </div>
    </div>
  );

  const PlanCard = ({ plan, isActive }) => (
    <div className={`relative bg-white rounded-2xl p-6 shadow-lg border-2 ${
      isActive ? 'border-emerald-400 shadow-emerald-100' : 'border-gray-100 hover:border-emerald-200'
    } transition-all duration-300 hover:shadow-xl group`}>
      {/* Badge */}
      {plan.badge && (
        <div className="absolute -top-2 left-4">
          <span className="px-3 py-1 bg-gradient-to-r from-amber-400 to-amber-500 text-white text-xs font-bold rounded-full shadow-lg">
            {plan.badge}
          </span>
        </div>
      )}

      {/* Active Indicator */}
      {isActive && (
        <div className="absolute -top-2 right-4">
          <span className="px-3 py-1 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
            <FiZap className="w-3 h-3" />
            Active
          </span>
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="font-bold text-gray-900 text-lg">{plan.name}</h3>
        <div className="w-12 h-1 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full mx-auto mt-2"></div>
      </div>
      
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Min Investment</span>
          <span className="font-bold text-gray-900">${plan.minAmount}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Daily ROI</span>
          <span className="font-bold text-green-600">{plan.dailyROI}%</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Duration</span>
          <span className="font-semibold text-gray-900">{plan.duration}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Max Return</span>
          <span className="font-bold text-emerald-600">{plan.maxReturn}</span>
        </div>
      </div>

      {/* Features */}
      <div className="space-y-2 mb-6">
        {plan.features.map((feature, index) => (
          <div key={index} className="flex items-center gap-2">
            <FiCheck className="w-4 h-4 text-green-500" />
            <span className="text-xs text-gray-600">{feature}</span>
          </div>
        ))}
      </div>

      {/* Action Button - Always Visible */}
      <button 
        className={`w-full py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
          isActive 
            ? 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 cursor-not-allowed' 
            : 'bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:shadow-lg hover:scale-[1.02] shadow-md'
        }`}
        disabled={isActive}
      >
        {isActive ? 'Plan Active' : 'Invest Now'}
      </button>
    </div>
  );

  const CarbonPackCard = ({ pack, isSelected }) => (
    <div 
      className={`relative bg-white rounded-2xl p-6 border-2 ${
        isSelected ? 'border-emerald-400 shadow-lg' : 'border-gray-100 hover:border-emerald-200'
      } transition-all duration-300 cursor-pointer group hover:shadow-xl`}
      onClick={() => setSelectedCarbonPack(pack)}
    >
      {pack.popular && (
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
          <span className="px-4 py-1 bg-gradient-to-r from-amber-400 to-amber-500 text-white text-xs font-bold rounded-full shadow-lg">
            MOST POPULAR
          </span>
        </div>
      )}

      <div className="text-center mb-4">
        <h3 className="font-bold text-gray-900 text-lg">{pack.name}</h3>
        <p className="text-sm text-gray-500 mt-1">{pack.description}</p>
      </div>

      <div className="text-center mb-4">
        <div className="flex justify-center items-baseline gap-1">
          <span className="text-2xl font-bold text-gray-900">${pack.price}</span>
          <span className="text-sm text-gray-500">one-time</span>
        </div>
        <p className="text-xs text-gray-500 mt-1">{pack.creditRange} credits</p>
      </div>

      <div className="bg-emerald-50 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-center gap-2">
          <GiTreeRoots className="w-5 h-5 text-emerald-600" />
          <span className="font-semibold text-emerald-700">{pack.credits} Carbon Credits</span>
        </div>
      </div>

      <button className={`w-full py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
        isSelected 
          ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg' 
          : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:bg-gray-200'
      }`}>
        {isSelected ? 'Selected' : 'Select Pack'}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50/50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg border border-green-100">
            <div className="p-2 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg shadow-md">
              <GiRecycle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                Global Green Plan 5.0
              </h1>
              <p className="text-gray-600 font-medium">Invest Smart • Earn Green • Live Smart</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            icon={<FiDollarSign className="w-6 h-6 text-white" />}
            title="Total Investment"
            value={`$${dashboardData.userStats.totalInvestment}`}
            subtitle="Active portfolio"
            trend="+5.2% this month"
            color="from-emerald-400 to-green-500"
          />
          <StatsCard
            icon={<FiCalendar className="w-6 h-6 text-white" />}
            title="Active Days"
            value={dashboardData.userStats.activeDays}
            subtitle="Current streak"
            trend="7 days streak"
            color="from-green-400 to-emerald-500"
          />
          <StatsCard
            icon={<GiRecycle className="w-6 h-6 text-white" />}
            title="Carbon Credits"
            value={dashboardData.userStats.carbonCredits}
            subtitle="Tons recycled"
            trend="+2.1 this week"
            color="from-teal-400 to-emerald-500"
          />
          <StatsCard
            icon={<FiAward className="w-6 h-6 text-white" />}
            title="Eco Badge"
            value={dashboardData.userStats.badge}
            subtitle="Current level"
            trend="Near Platinum"
            color="from-amber-400 to-amber-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Investment & Carbon */}
          <div className="lg:col-span-2 space-y-8">
            {/* Investment Plans */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-green-100">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Investment Plans</h2>
                  <p className="text-gray-600 mt-2">Choose your sustainable investment path</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full shadow-lg">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span className="text-sm font-bold text-white">LIVE MARKET</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {investmentPlans.map((plan, index) => (
                  <PlanCard
                    key={index}
                    plan={plan}
                    isActive={dashboardData.activePlans.some(active => active.name === plan.name)}
                  />
                ))}
              </div>
            </div>

            {/* Good-Citizen Carbon Program */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-green-100">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Carbon Credit Program</h2>
                  <p className="text-gray-600 mt-2">Contribute to sustainability with carbon credits</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-emerald-400 to-green-500 rounded-xl shadow-lg">
                  <GiTreeRoots className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Program Info */}
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-6 mb-8 border border-emerald-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-bold text-gray-900 mb-3">Program Benefits</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <FiCheck className="w-4 h-4 text-emerald-500" />
                        <span className="text-sm text-gray-700">Signup includes 0.1 credit</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <FiCheck className="w-4 h-4 text-emerald-500" />
                        <span className="text-sm text-gray-700">Fixed price credit packs</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <FiCheck className="w-4 h-4 text-emerald-500" />
                        <span className="text-sm text-gray-700">Referral bonuses available</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-3">Badge System</h3>
                    <div className="flex gap-3">
                      <div className="text-center">
                        <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-1">
                          <span className="text-white font-bold text-xs">B</span>
                        </div>
                        <span className="text-xs text-gray-600">Bronze</span>
                      </div>
                      <div className="text-center">
                        <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-1">
                          <span className="text-white font-bold text-xs">G</span>
                        </div>
                        <span className="text-xs text-gray-600">Gold</span>
                      </div>
                      <div className="text-center">
                        <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-1">
                          <span className="text-white font-bold text-xs">P</span>
                        </div>
                        <span className="text-xs text-gray-600">Platinum</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Carbon Packs */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {carbonPacks.map((pack, index) => (
                  <CarbonPackCard
                    key={index}
                    pack={pack}
                    isSelected={selectedCarbonPack?.name === pack.name}
                  />
                ))}
              </div>

              {/* Selected Pack Summary */}
              {selectedCarbonPack && (
                <div className="mt-6 p-4 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold">Selected: {selectedCarbonPack.name}</h4>
                      <p className="text-sm opacity-90">{selectedCarbonPack.credits} Carbon Credits</p>
                    </div>
                    <button className="px-6 py-2 bg-white text-emerald-600 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                      Purchase ${selectedCarbonPack.price}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8">
            {/* Active Plans Progress */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-green-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Active Plans Progress</h2>
              <div className="space-y-6">
                {dashboardData.activePlans.map((plan, index) => (
                  <div key={index} className="group">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-r from-emerald-400 to-green-500 rounded-lg shadow-md">
                          <FiTrendingUp className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{plan.name}</h3>
                          <p className="text-xs text-gray-500">${plan.amount} invested</p>
                        </div>
                      </div>
                      <span className="text-sm font-bold text-emerald-600">+${plan.dailyROI}/day</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-emerald-400 to-green-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${plan.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>Started {plan.startDate}</span>
                      <span>{plan.progress}% Complete</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-green-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {dashboardData.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:border-emerald-200 transition-all duration-300 group">
                    <div className={`p-2 rounded-lg shadow-sm ${
                      activity.type === 'ROI' ? 'bg-green-100' : 
                      activity.type === 'Referral' ? 'bg-blue-100' : 'bg-emerald-100'
                    }`}>
                      {activity.type === 'ROI' && <FiTrendingUp className="w-4 h-4 text-green-600" />}
                      {activity.type === 'Referral' && <FiUsers className="w-4 h-4 text-blue-600" />}
                      {activity.type === 'Carbon' && <GiRecycle className="w-4 h-4 text-emerald-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{activity.description}</p>
                      <p className="text-xs text-gray-500">{activity.date}</p>
                    </div>
                    <span className="font-bold text-green-600">+${activity.amount}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-green-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                <button className="p-4 bg-gradient-to-br from-emerald-400 to-green-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                  <FiUsers className="w-5 h-5 mx-auto mb-2 group-hover:scale-110" />
                  <span className="text-xs font-bold">Refer Friends</span>
                </button>
                <button className="p-4 bg-gradient-to-br from-teal-400 to-emerald-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                  <FiBarChart2 className="w-5 h-5 mx-auto mb-2 group-hover:scale-110" />
                  <span className="text-xs font-bold">View Reports</span>
                </button>
                <button className="p-4 bg-gradient-to-br from-green-400 to-emerald-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                  <GiRecycle className="w-5 h-5 mx-auto mb-2 group-hover:scale-110" />
                  <span className="text-xs font-bold">Carbon Stats</span>
                </button>
                <button className="p-4 bg-gradient-to-br from-amber-400 to-amber-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                  <FiAward className="w-5 h-5 mx-auto mb-2 group-hover:scale-110" />
                  <span className="text-xs font-bold">Achievements</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;