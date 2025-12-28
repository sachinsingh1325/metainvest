import React, { useState, useEffect } from 'react';
import { 
  FiTrendingUp, 
  FiUsers, 
  FiInfo,
  FiShare,
  FiDollarSign
} from 'react-icons/fi';
import { GiRecycle, GiTreeRoots, GiPineTree } from 'react-icons/gi';
import { FaLeaf } from "react-icons/fa6";
import { IoIosLeaf } from "react-icons/io";
import toast from 'react-hot-toast';
import axiosInstance from '../service/api';

import StatsCard from '../components/dashboard/StatsCard';
import PlanCard from '../components/dashboard/PlanCard';
import CarbonPackCard from '../components/dashboard/CarbonPackCard';
import InvestmentPopup from '../components/dashboard/InvestmentPopup';
import CarbonPopup from '../components/dashboard/CarbonPopup';

const Dashboard = () => {
  const [selectedCarbonPack, setSelectedCarbonPack] = useState(null);
  const [showInvestmentPopup, setShowInvestmentPopup] = useState(false);
  const [showCarbonPopup, setShowCarbonPopup] = useState(false);
  const [selectedInvestmentPlan, setSelectedInvestmentPlan] = useState(null);
  const [transactionHash, setTransactionHash] = useState('');
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [investmentPlans, setInvestmentPlans] = useState([]);
  const [carbonPacks, setCarbonPacks] = useState([]);
  const [activePlans, setActivePlans] = useState([]); 
  const [user,setUser]=useState()

  // Try to retrieve user object from localStorage if present
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
       setUser(parsedUser);  
      } catch (e) {
        console.error('Failed to parse user from localStorage', e);
      }
    }
  }, []);

  
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
    }
  });

  useEffect(() => {

    setIsVisible(true);
    fetchPlansData();
    fetchActiveInvestments();
  }, []);

  const fetchPlansData = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get('/investment/get-plans');
      const data = response.data;
      
      if (data.success) {
        const transformedInvestmentPlans = data.data.investmentPlans.map(plan => ({
          id: plan._id,
          name: plan.planName,
          minAmount: plan.amount,
          dailyROI: plan.dailyROI,
          duration: `${plan.durationDays} Days`,
          maxReturn: `${plan.finalReturn}x`,
          color: getPlanColor(plan.planName),
          badge: getPlanBadge(plan.planName),
          features: getPlanFeatures(plan.planName),
          status: plan.status
        }));

        const transformedCarbonPacks = data.data.carbonPacks.map(pack => ({
          id: pack._id,
          name: pack.packName,
          price: pack.price,
          credits: pack.carbonAmount,
          popular: pack.packName === 'Starter',
          description: getPackDescription(pack.packName),
          icon: getPackIcon(pack.packName),
          status: pack.status
        }));

        setInvestmentPlans(transformedInvestmentPlans);
        setCarbonPacks(transformedCarbonPacks);
      }
    } catch (error) {
      console.error('Error fetching plans:', error);
      toast.error('Failed to load plans data');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchActiveInvestments = async () => {
    try {
      const response = await axiosInstance.get('/investment/get-active-invetment');
      const data = response.data;
      
      if (data.success) {
        const transformedActivePlans = data.data.map(investment => ({
          id: investment._id,
          name: investment.planId.planName,
          amount: investment.investedAmount,
          startDate: new Date(investment.startDate).toLocaleDateString('en-CA'),
          dailyROI: investment.currentDailyROI,
          progress: calculateProgress(investment.startDate, investment.endDate),
          endDate: new Date(investment.endDate).toLocaleDateString('en-CA'),
          estimatedReturn: investment.investedAmount * investment.planId.finalReturn,
          totalProfitGenerated: investment.totalProfitGenerated,
          totalPaid: investment.totalPaid,
          status: investment.status
        }));
        
        setActivePlans(transformedActivePlans);
      }
    } catch (error) {
      console.error('Error fetching active investments:', error);
    }
  };

  const calculateProgress = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const now = new Date();
    
    const totalDuration = end.getTime() - start.getTime();
    const elapsed = now.getTime() - start.getTime();
    
    const progress = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));
    return Math.round(progress);
  };

  const handleInvestSubmit = async (plan, amount, hash) => {
    try {
      const response = await axiosInstance.post('/investment/create-investment', {
        planId: plan.id,
        amount: parseFloat(amount),
        txHash: hash
      });

      const data = response.data;
      
      if (response.status===201) {
        toast.success('Investment successful!');
        await fetchActiveInvestments();
        setDashboardData(prev => ({
          ...prev,
          userStats: {
            ...prev.userStats,
            totalInvestment: prev.userStats.totalInvestment + parseFloat(amount)
          }
        }));
        
        return true;
      } else {
        toast.error(data.message || 'Investment failed');
        return false;
      }
    } catch (error) {
      console.error('Investment error:', error);
      toast.error('Investment failed. Please try again.');
      return false;
    }
  };

  const handleCarbonPurchase = async (pack, hash) => {
    try {
      const response = await axiosInstance.post('/investment/credit-purchase', {
        packId: pack.id,
        txHash: hash
      });

      const data = response.data;
      
      if (response.status===201) {
        toast.success('Carbon credits purchased successfully!');
        setDashboardData(prev => ({
          ...prev,
          userStats: {
            ...prev.userStats,
            carbonCredits: prev.userStats.carbonCredits + pack.credits
          }
        }));
        
        return true;
      } else {
        toast.error(data.message || 'Purchase failed');
        return false;
      }
    } catch (error) {
      console.error('Purchase error:', error);
      toast.error('Purchase failed. Please try again.');
      return false;
    }
  };

  const getPlanColor = (planName) => {
    const colors = {
      'Eco Starter': 'from-emerald-400 to-green-500',
      'Eco Grow': 'from-teal-400 to-emerald-500',
      'Eco Pro': 'from-green-500 to-emerald-600',
      'Eco Elite': 'from-emerald-500 to-teal-600',
      'Eco Infinity': 'from-teal-500 to-green-700'
    };
    return colors[planName] || 'from-emerald-400 to-green-500';
  };

  const getPlanBadge = (planName) => {
    const badges = {
      'Eco Starter': 'Popular',
      'Eco Pro': 'Recommended',
      'Eco Infinity': 'Premium'
    };
    return badges[planName] || null;
  };

  const getPlanFeatures = (planName) => {
    const features = {
      'Eco Starter': ['Basic Returns', '80 Days Term', '1.8x Max Return', 'Low Risk'],
      'Eco Grow': ['Enhanced ROI', '85 Days Term', '2.0x Max Return', 'Medium Risk'],
      'Eco Pro': ['Professional Tier', '90 Days Term', '2.2x Max Return', 'High Reward'],
      'Eco Elite': ['Elite Returns', '95 Days Term', '2.3x Max Return', 'Premium'],
      'Eco Infinity': ['Maximum Returns', '100 Days Term', '2.5x Max Return', 'VIP Access']
    };
    return features[planName] || ['Standard Features'];
  };

  const getPackDescription = (packName) => {
    const descriptions = {
      'Mini': 'Perfect for starters',
      'Starter': 'Most popular choice',
      'Standard': 'Great value',
      'Bundle': 'Maximum benefits'
    };
    return descriptions[packName] || 'Carbon offset pack';
  };

  const getPackIcon = (packName) => {
    const icons = {
      'Mini': <IoIosLeaf className="w-5 h-5 text-emerald-500" />,
      'Starter': <FaLeaf className="w-5 h-5 text-green-500" />,
      'Standard': <GiTreeRoots className="w-5 h-5 text-emerald-600" />,
      'Bundle': <GiPineTree className="w-5 h-5 text-green-600" />
    };
    return icons[packName] || <FaLeaf className="w-5 h-5 text-green-500" />;
  };

  const handleInvest = (plan) => {
    const hasActivePlan = activePlans.length > 0;
    const isActive = activePlans.some(active => active.name === plan.name);
    
    if (hasActivePlan && !isActive) {
      toast.error('You can only have one active investment plan at a time. Please complete your current plan before investing in another.');
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

  const handleShareReferral = async () => {
    const referralUrl = `${window.location.origin}/signup?ref=${user.referralCode}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join Eco Investment Platform",
          text: "Register using my referral link and start your green journey:",
          url: referralUrl,
        });
      } catch (error) {
        // Fallback to copy if share fails or is cancelled
        navigator.clipboard.writeText(referralUrl);
        toast.success('Referral link copied to clipboard!');
      }
    } else {
      navigator.clipboard.writeText(referralUrl);
      toast.success('Referral link copied to clipboard!');
    }
  };

  const hasActivePlan = activePlans.length > 0;

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50/30 to-teal-50/50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-emerald-600 font-medium">Loading plans...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50/30 to-teal-50/50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-60 h-60 md:w-80 md:h-80 bg-emerald-200/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-60 h-60 md:w-80 md:h-80 bg-green-200/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-40 h-40 md:w-60 md:h-60 bg-teal-200/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
        
        {/* Floating leaves/trees */}
        <div className="absolute top-0 left-10 animate-float-slow">
          <GiPineTree className="w-24 h-24 md:w-32 md:h-32 text-emerald-300/40" />
        </div>
        <div className="absolute top-0 right-20 animate-float-slow" style={{ animationDelay: '1s' }}>
          <IoIosLeaf className="w-24 h-24 md:w-32 md:h-32 text-green-300/40" />
        </div>
      </div>

      <div className="mx-auto px-3 sm:px-4 py-6 md:py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8 transform-gpu">
          <div className={`transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent mb-3 md:mb-4">
              Eco Investment Platform
            </h1>
            <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto px-2">
              Invest sustainably while offsetting your carbon footprint. Earn returns and contribute to a greener planet.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 md:mb-8">
          <StatsCard
            icon={<FiDollarSign className="w-5 h-5 md:w-6 md:h-6 text-white" />}
            title="Total Investment"
            value={`$${dashboardData.userStats.totalInvestment}`}
            subtitle="Active portfolio"
            trend="+5.2% this month"
            color="from-emerald-700 to-green-700"
            delay={100}
            isVisible={isVisible}
          />
          <StatsCard
            icon={<FiTrendingUp className="w-5 h-5 md:w-6 md:h-6 text-white" />}
            title="Daily ROI"
            value={`$${dashboardData.userStats.dailyROI}`}
            subtitle="Current earnings"
            trend="+$0.25 today"
            color="from-green-700 to-emerald-700"
            delay={200}
            isVisible={isVisible}
          />
          <StatsCard
            icon={<GiRecycle className="w-5 h-5 md:w-6 md:h-6 text-white" />}
            title="Carbon Credits"
            value={dashboardData.userStats.carbonCredits}
            subtitle="Tons recycled"
            trend="+2.1 this week"
            color="from-teal-700 to-emerald-600"
            delay={300}
            isVisible={isVisible}
          />
          <StatsCard
            icon={<FiUsers className="w-5 h-5 md:w-6 md:h-6 text-white" />}
            title="Level Income"
            value={`$${dashboardData.userStats.levelIncome}`}
            subtitle="From referrals"
            trend="3 active levels"
            color="from-amber-700 to-amber-600"
            delay={400}
            isVisible={isVisible}
          />
        </div>

        {/* Main Content Grid */}
        <div className="space-y-6 md:space-y-8">
          {/* Investment Plans & Carbon Credits Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Investment Plans - 2/3 width */}
            <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl border border-emerald-100/50 transform-gpu">
              <div className={`transition-all duration-700 delay-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 md:mb-8 gap-4">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Investment Plans</h2>
                    <p className="text-gray-600 text-sm sm:text-base mt-1 sm:mt-2">Choose your sustainable investment path</p>
                    {hasActivePlan && (
                      <div className="mt-2 p-2 sm:p-3 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-lg max-w-md">
                        <p className="text-xs sm:text-sm text-amber-700 flex items-start sm:items-center gap-2">
                          <FiInfo className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0 mt-0.5 sm:mt-0" />
                          You can only have one active investment plan at a time. Complete your current plan to invest in another.
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full shadow-lg self-start sm:self-auto">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span className="text-xs font-bold text-white">LIVE MARKET</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  {investmentPlans.map((plan, index) => {
                    const isActive = activePlans.some(active => active.name === plan.name);
                    return (
                      <PlanCard
                        key={plan.id}
                        plan={plan}
                        isActive={isActive}
                        hasActivePlan={hasActivePlan}
                        onInvest={handleInvest}
                        delay={600 + index * 100}
                        isVisible={isVisible}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Carbon Credit Program - 1/3 width */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl border border-emerald-100/50 transform-gpu">
              <div className={`transition-all duration-700 delay-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                <div className="flex items-center justify-between mb-6 md:mb-8">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Carbon Credits</h2>
                    <p className="text-gray-600 text-sm sm:text-base mt-1 sm:mt-2">Purchase carbon offset credits</p>
                  </div>
                  <div className="p-2 md:p-3 bg-gradient-to-r from-emerald-400 to-green-500 rounded-xl shadow-lg">
                    <GiTreeRoots className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                </div>

                <div className="space-y-4 md:space-y-6">
                  {carbonPacks.map((pack, index) => (
                    <CarbonPackCard
                      key={pack.id}
                      pack={pack}
                      onSelect={handleCarbonSelect}
                      delay={800 + index * 100}
                      isVisible={isVisible}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl border border-emerald-100/50 transform-gpu">
            <div className={`transition-all duration-700 delay-900 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                {/* Active Plans Progress - Takes 2/3 width */}
                <div className="lg:col-span-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Active Plans Progress</h2>
                    <span className="px-3 py-1 bg-gradient-to-r from-emerald-400 to-green-500 text-white text-xs font-bold rounded-full self-start sm:self-auto">
                      {activePlans.length} Active
                    </span>
                  </div>
                  
                  {activePlans.length > 0 ? (
                    <div className="space-y-4 md:space-y-6">
                      {activePlans.map((plan, index) => (
                        <div key={index} className="group transform hover:scale-[1.01] transition-transform duration-300">
                          <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-4 md:p-6 border border-emerald-200">
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="p-2 md:p-3 bg-gradient-to-r from-emerald-400 to-green-500 rounded-lg shadow-md flex-shrink-0">
                                  <FiTrendingUp className="w-4 h-4 md:w-5 md:h-5 text-white" />
                                </div>
                                <div className="min-w-0">
                                  <h3 className="font-bold text-gray-900 truncate">{plan.name}</h3>
                                  <p className="text-sm text-gray-500 truncate">${plan.amount} invested</p>
                                </div>
                              </div>
                              <div className="flex flex-col items-start lg:items-end">
                                <span className="text-base md:text-lg font-bold text-emerald-600 whitespace-nowrap">+${plan.dailyROI}/day</span>
                                <span className="text-xs text-gray-500">Daily Returns</span>
                              </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="space-y-2 mb-4">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Progress</span>
                                <span className="font-bold text-emerald-700">{plan.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2 md:h-3 overflow-hidden">
                                <div 
                                  className="bg-gradient-to-r from-emerald-400 to-green-500 h-2 md:h-3 rounded-full transition-all duration-1000 ease-out"
                                  style={{ width: `${plan.progress}%` }}
                                ></div>
                              </div>
                            </div>

                            {/* Plan Details */}
                            <div className="grid grid-cols-2 gap-3 md:gap-4 pt-4 border-t border-emerald-100">
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
                    <div className="text-center py-8 md:py-12">
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-emerald-100 to-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FiTrendingUp className="w-8 h-8 md:w-10 md:h-10 text-emerald-400" />
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

                {/* Referral Card - Takes 1/3 width */}
                <div className="h-full">
                  <div className="sticky top-6">
                    <div className="p-4 md:p-6 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border border-emerald-200 h-full">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <FiUsers className="w-5 h-5 text-emerald-600" />
                          <h3 className="font-semibold text-gray-900 text-lg">Referral Program</h3>
                        </div>
                        <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">
                          {dashboardData.userStats.referralCount} Referrals
                        </span>
                      </div>                    
                      <div className="space-y-3 mb-4">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Your Referral Link</p>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 px-3 py-2 bg-white border border-emerald-200 rounded-lg text-xs truncate font-mono">
                              {`${window.location.origin}/signup?ref=${user.referralCode}`}
                            </div>
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(`${window.location.origin}/signup?ref=${user.referralCode}`);
                                toast.success('Referral link copied to clipboard!');
                              }}
                              className="p-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-1"
                            >
                              <FiShare className="w-3 h-3" />
                              <span className="text-xs font-semibold">Copy</span>
                            </button>
                          </div>
                        </div>
                        
                        <div className="text-sm text-gray-600">
                          <p className="mb-2">Share your referral link to earn:</p>
                          <ul className="space-y-1">
                            <li className="flex items-center gap-2">
                              <FiTrendingUp className="w-3 h-3 text-green-500 flex-shrink-0" />
                              <span>10% from level 1 referrals</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <FiTrendingUp className="w-3 h-3 text-green-500 flex-shrink-0" />
                              <span>5% from level 2 referrals</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <FiTrendingUp className="w-3 h-3 text-green-500 flex-shrink-0" />
                              <span>2% from level 3 referrals</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      
                      <button
                        onClick={handleShareReferral}
                        className="w-full py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl font-bold hover:shadow-lg transition-all duration-300 hover:scale-[1.02] text-sm flex items-center justify-center gap-2"
                      >
                        <FiShare className="w-4 h-4" />
                        Share Referral Link
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Investment Popup */}
      <InvestmentPopup 
        showPopup={showInvestmentPopup}
        setShowPopup={setShowInvestmentPopup}
        selectedPlan={selectedInvestmentPlan}
        investmentAmount={investmentAmount}
        setInvestmentAmount={setInvestmentAmount}
        transactionHash={transactionHash}
        setTransactionHash={setTransactionHash}
        handleInvestSubmit={handleInvestSubmit}
      />
      
      {/* Carbon Popup */}
      <CarbonPopup
        showPopup={showCarbonPopup}
        setShowPopup={setShowCarbonPopup}
        selectedPack={selectedCarbonPack}
        transactionHash={transactionHash}
        setTransactionHash={setTransactionHash}
        handleCarbonPurchase={handleCarbonPurchase}
      />

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
        .line-clamp-1 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;