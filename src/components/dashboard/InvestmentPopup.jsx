import React, { useState } from 'react';
import { FiX, FiCopy, FiLoader, FiTrendingUp } from 'react-icons/fi';
import { QRCodeSVG } from 'qrcode.react';
import toast from 'react-hot-toast';

const InvestmentPopup = ({ 
  showPopup, 
  setShowPopup, 
  selectedPlan, 
  investmentAmount, 
  setInvestmentAmount,
  transactionHash,
  setTransactionHash,
  handleInvestSubmit,
  walletAddress = "0x742d35Cc6634C0532925a3b8D4B5A3B4d4F5F6E7"
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!transactionHash.trim()) {
      toast.error('Please enter transaction hash');
      return;
    }

    setIsSubmitting(true);
    
    const success = await handleInvestSubmit(
      selectedPlan,
      investmentAmount || selectedPlan.minAmount,
      transactionHash
    );
    
    setIsSubmitting(false);
    
    if (success) {
      setShowPopup(false);
      setTransactionHash('');
      setInvestmentAmount('');
    }
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setInvestmentAmount(value);
    }
  };

  if (!showPopup || !selectedPlan) return null;

  return (
    <div className="fixed inset-0  bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white custom-scroll rounded-2xl p-6 md:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto relative animate-scaleIn">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl -z-10"></div>
        
        {/* Close Button */}
        <button 
          onClick={() => setShowPopup(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-300 bg-white rounded-full p-2 shadow-lg hover:shadow-xl hover:scale-110"
          disabled={isSubmitting}
        >
          <FiX className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <FiTrendingUp className="w-7 h-7 md:w-8 md:h-8 text-white" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
            Invest in {selectedPlan.name}
          </h2>
          <p className="text-gray-600 text-sm md:text-base">Complete your investment securely</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Plan Summary */}
          <div className="p-4 bg-gradient-to-br from-emerald-50 to-green-100 rounded-xl border border-emerald-200">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-xs text-gray-600">Daily ROI</p>
                <p className="font-bold text-emerald-700 text-sm md:text-base">{selectedPlan.dailyROI}%</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-600">Duration</p>
                <p className="font-bold text-emerald-700 text-sm md:text-base">{selectedPlan.duration}</p>
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
                placeholder={`Minimum: $${selectedPlan.minAmount}`}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-base md:text-lg font-semibold transition-all duration-300"
                required
                min={selectedPlan.minAmount}
                disabled={isSubmitting}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Minimum investment: ${selectedPlan.minAmount}
            </p>
          </div>

          {/* QR Code */}
          <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-green-100 rounded-xl border border-emerald-200">
            <p className="text-sm font-medium text-gray-700 mb-3">Scan to Pay</p>
            <div className="bg-white p-4 rounded-lg border-2 border-emerald-200 inline-block shadow-lg">
              <QRCodeSVG 
                value={walletAddress}
                size={120}
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
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl text-xs md:text-sm bg-gray-50 truncate font-mono transition-all duration-300"
                disabled={isSubmitting}
              />
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(walletAddress);
                  toast.success('Address copied to clipboard!');
                }}
                className="px-4 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-2 transform hover:scale-105 disabled:opacity-50"
                disabled={isSubmitting}
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
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 md:py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl font-bold hover:shadow-lg transition-all duration-300 text-base md:text-lg transform hover:scale-[1.02] relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-8 group-hover:translate-x-8 transition-transform duration-700"></div>
              <span className="relative flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <FiLoader className="w-4 h-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Confirm Investment'
                )}
              </span>
            </button>
            
            <button
              type="button"
              onClick={() => setShowPopup(false)}
              disabled={isSubmitting}
              className="w-full py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl font-bold hover:shadow-lg transition-all duration-300 hover:scale-[1.02] text-sm md:text-base disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InvestmentPopup;