import { useState, useEffect } from 'react';
import { 
  FiTrendingUp, 
  FiUsers, 
  FiDollarSign, 
  FiDownload, 
  FiCreditCard,
  FiCalendar,
  FiBarChart2,
  FiGlobe,
  FiStar,
  FiAward,
  FiShare2,
  FiChevronRight
} from 'react-icons/fi';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const ImpactAnalyticsPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Dummy Data
  const summaryData = [
    { 
      id: 1, 
      title: 'Total Carbon Credits Purchased', 
      value: '1,250', 
      unit: 'tCO₂', 
      change: '+12.5%', 
      icon: <FiGlobe className="w-5 h-5" />,
      color: 'from-emerald-400 to-green-500'
    },
    { 
      id: 2, 
      title: 'Total Credits Retired', 
      value: '850', 
      unit: 'tCO₂', 
      change: '+8.2%', 
      icon: <FiCreditCard className="w-5 h-5" />,
      color: 'from-teal-400 to-cyan-500'
    },
    { 
      id: 3, 
      title: 'Total Investment AUM', 
      value: '45,820', 
      unit: 'USDT', 
      change: '+18.7%', 
      icon: <FiDollarSign className="w-5 h-5" />,
      color: 'from-amber-400 to-yellow-500'
    },
    { 
      id: 4, 
      title: 'User Grade', 
      value: 'Gold', 
      unit: 'Tier', 
      change: '↑ Silver', 
      icon: <FiStar className="w-5 h-5" />,
      color: 'from-purple-400 to-indigo-500'
    }
  ];

  const carbonOffsetData = [
    { month: 'Jan', credits: 120, retired: 80 },
    { month: 'Feb', credits: 150, retired: 100 },
    { month: 'Mar', credits: 180, retired: 120 },
    { month: 'Apr', credits: 200, retired: 140 },
    { month: 'May', credits: 250, retired: 180 },
    { month: 'Jun', credits: 300, retired: 220 },
    { month: 'Jul', credits: 350, retired: 250 },
    { month: 'Aug', credits: 400, retired: 300 },
  ];

  const purchaseBreakdownData = [
    { type: 'Forestry', amount: 450, color: '#10B981' },
    { type: 'Renewable Energy', amount: 350, color: '#3B82F6' },
    { type: 'Waste Management', amount: 250, color: '#8B5CF6' },
    { type: 'Ocean Cleanup', amount: 200, color: '#06B6D4' },
  ];

  const growthData = [
    { month: 'Jan', users: 1200, impact: 1500 },
    { month: 'Feb', users: 1800, impact: 2200 },
    { month: 'Mar', users: 2400, impact: 3000 },
    { month: 'Apr', users: 3200, impact: 4200 },
    { month: 'May', users: 4500, impact: 5800 },
    { month: 'Jun', users: 6000, impact: 7800 },
    { month: 'Jul', users: 8000, impact: 10500 },
  ];

  const certificates = [
    { id: 1, name: 'Carbon Neutral Certificate', date: '2024-07-15', size: '850 tCO₂' },
    { id: 2, name: 'Impact Investor Award', date: '2024-06-30', size: 'Gold Tier' },
    { id: 3, name: 'Green Ambassador Badge', date: '2024-05-22', size: 'Platinum' },
  ];

  const investmentImpactData = {
    totalInvestors: '12,450',
    userROI: 78,
    tier: 'Gold',
    referralCredits: '125',
    referralsJoined: '28'
  };

  const COLORS = ['#10B981', '#3B82F6', '#8B5CF6', '#06B6D4'];

  const renderCustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-emerald-100 ">
          <p className="font-semibold text-gray-900">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value} {entry.name === 'credits' ? 'tCO₂' : 'tCO₂'}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50 p-4 sm:p-6 md:p-8 ml-12">
      {/* Header */}
      <div className={`mb-8 transition-all duration-700 delay-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Impact Analytics
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Track your environmental impact and investment progress
            </p>
          </div>
          <div className="flex items-center gap-2 mt-4 sm:mt-0">
            <div className="px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-full text-sm font-semibold">
              Last Updated: Today
            </div>
            <button className="p-2 bg-white rounded-lg shadow-sm border border-emerald-100 hover:shadow-md transition-shadow">
              <FiShare2 className="w-5 h-5 text-emerald-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Top Summary Metrics */}
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 transition-all duration-700 delay-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        {summaryData.map((item, index) => (
          <div
            key={item.id}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-emerald-100/50 transform hover:scale-[1.02] transition-all duration-300 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-2 bg-gradient-to-r ${item.color} rounded-lg shadow-md`}>
                <div className="text-white">
                  {item.icon}
                </div>
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                item.change.startsWith('+') 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-amber-100 text-amber-700'
              }`}>
                {item.change}
              </span>
            </div>
            <div className="mb-2">
              <p className="text-sm text-gray-600 mb-1">{item.title}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {item.value}
                </span>
                <span className="text-sm text-gray-500">{item.unit}</span>
              </div>
            </div>
            <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-1000`}
                style={{ width: `${70 + index * 10}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8">
        {/* Carbon Offset Timeline */}
        <div className={`bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl border border-emerald-100/50 transition-all duration-700 delay-600 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-emerald-400 to-green-500 rounded-lg shadow-md">
                <FiTrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">Carbon Offset Timeline</h3>
                <p className="text-gray-600 text-sm">Monthly credits purchased vs retired</p>
              </div>
            </div>
          </div>
          <div className="h-64 sm:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={carbonOffsetData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="month" 
                  stroke="#6B7280"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#6B7280"
                  fontSize={12}
                  label={{ 
                    value: 'tCO₂', 
                    angle: -90, 
                    position: 'insideLeft',
                    fontSize: 12
                  }}
                />
                <Tooltip content={renderCustomTooltip} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="credits" 
                  name="Credits Purchased"
                  stroke="#10B981" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="retired" 
                  name="Credits Retired"
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Credit Purchase Breakdown */}
        <div className={`bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl border border-emerald-100/50 transition-all duration-700 delay-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-lg shadow-md">
                <FiBarChart2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">Credit Purchase Breakdown</h3>
                <p className="text-gray-600 text-sm">By project type (tCO₂)</p>
              </div>
            </div>
          </div>
          <div className="h-64 sm:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={purchaseBreakdownData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="amount"
                >
                  {purchaseBreakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value} tCO₂`, 'Amount']}
                  contentStyle={{ 
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    border: '1px solid #D1FAE5'
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
            {purchaseBreakdownData.map((item, index) => (
              <div key={index} className="text-center p-2">
                <div className="w-3 h-3 rounded-full mx-auto mb-1" style={{ backgroundColor: item.color }}></div>
                <p className="text-xs font-semibold text-gray-900">{item.type}</p>
                <p className="text-xs text-gray-600">{item.amount} tCO₂</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Investment Impact & Growth Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8">
        {/* Investment Impact */}
        <div className={`bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl border border-emerald-100/50 transition-all duration-700 delay-800 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-lg shadow-md">
                <FiUsers className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">Investment Impact</h3>
                <p className="text-gray-600 text-sm">Community growth & your progress</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-200">
                <h4 className="font-semibold text-gray-900 mb-3">Community Stats</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Investors</span>
                    <span className="font-bold text-gray-900">{investmentImpactData.totalInvestors}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Referrals Joined</span>
                    <span className="font-bold text-gray-900">{investmentImpactData.referralsJoined}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Your Tier</span>
                    <span className="px-2 py-1 bg-gradient-to-r from-amber-400 to-yellow-500 text-white text-xs font-bold rounded-full">
                      {investmentImpactData.tier}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                <h4 className="font-semibold text-gray-900 mb-3">Referral Impact</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Credits Earned</p>
                    <p className="text-2xl font-bold text-gray-900">{investmentImpactData.referralCredits}</p>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full">
                    <FiUsers className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className="relative w-40 h-40">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">{investmentImpactData.userROI}%</div>
                    <div className="text-sm text-gray-600">Your ROI</div>
                  </div>
                </div>
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="#E5E7EB"
                    strokeWidth="12"
                    fill="none"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="url(#gradient)"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 70}`}
                    strokeDashoffset={`${2 * Math.PI * 70 * (1 - investmentImpactData.userROI / 100)}`}
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#10B981" />
                      <stop offset="100%" stopColor="#3B82F6" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <p className="text-sm text-gray-600 mt-4 text-center">
                {investmentImpactData.userROI >= 75 ? 'Excellent Progress!' : 
                 investmentImpactData.userROI >= 50 ? 'Good Progress' : 
                 'Keep Going!'}
              </p>
            </div>
          </div>
        </div>

        {/* Monthly Growth Chart */}
        <div className={`bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl border border-emerald-100/50 transition-all duration-700 delay-900 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-lg shadow-md">
                <FiCalendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">Community Growth</h3>
                <p className="text-gray-600 text-sm">Users vs Total Impact (tCO₂)</p>
              </div>
            </div>
          </div>
          <div className="h-64 sm:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="month" 
                  stroke="#6B7280"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#6B7280"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    border: '1px solid #D1FAE5'
                  }}
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="users" 
                  name="Active Users"
                  stroke="#8B5CF6" 
                  fill="#8B5CF6"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
                <Area 
                  type="monotone" 
                  dataKey="impact" 
                  name="Total Impact"
                  stroke="#10B981" 
                  fill="#10B981"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg p-3">
              <p className="text-xs text-gray-600 mb-1">Current Users</p>
              <p className="text-lg font-bold text-gray-900">{growthData[growthData.length - 1].users.toLocaleString()}</p>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-3">
              <p className="text-xs text-gray-600 mb-1">Total Impact</p>
              <p className="text-lg font-bold text-gray-900">{growthData[growthData.length - 1].impact.toLocaleString()} tCO₂</p>
            </div>
          </div>
        </div>
      </div>

      {/* Certificates Section */}
      <div className={`bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl border border-emerald-100/50 transition-all duration-700 delay-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-emerald-400 to-green-500 rounded-lg shadow-md">
              <FiAward className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">Your Certificates</h3>
              <p className="text-gray-600 text-sm">Download your achievement certificates</p>
            </div>
          </div>
          <button className="flex items-center gap-1 text-emerald-600 hover:text-emerald-700 text-sm font-semibold">
            View All <FiChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="bg-gradient-to-br from-gray-50 to-emerald-50 rounded-xl p-4 border border-emerald-200 hover:border-emerald-300 transition-all duration-300 group hover:shadow-lg"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-green-500 rounded-lg flex items-center justify-center">
                  <FiAward className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2 py-1 rounded-full">
                  {cert.size}
                </span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                {cert.name}
              </h4>
              <p className="text-xs text-gray-500 mb-4">Issued: {cert.date}</p>
              <button className="w-full flex items-center justify-center gap-2 py-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02] text-sm font-semibold">
                <FiDownload className="w-4 h-4" />
                Download PDF
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Stats */}
      <div className={`mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 transition-all duration-700 delay-1100 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        {[
          { label: 'Trees Planted', value: '1,250', icon: '🌳' },
          { label: 'CO₂ Offset', value: '850 t', icon: '♻️' },
          { label: 'Clean Energy', value: '420 MWh', icon: '⚡' },
          { label: 'Community Score', value: '98.5', icon: '⭐' },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-sm border border-emerald-100/50"
          >
            <div className="text-2xl mb-2">{stat.icon}</div>
            <p className="text-lg sm:text-xl font-bold text-gray-900 mb-1">{stat.value}</p>
            <p className="text-xs text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImpactAnalyticsPage;