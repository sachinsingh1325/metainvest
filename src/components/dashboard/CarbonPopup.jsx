import React, { useState } from 'react';
import { FiX, FiCopy, FiLoader } from 'react-icons/fi';
import { QRCodeSVG } from 'qrcode.react';
import toast from 'react-hot-toast';

const CarbonPopup = ({
  showPopup,
  setShowPopup,
  selectedPack,
  transactionHash,
  setTransactionHash,
  handleCarbonPurchase,
  walletAddress = "0x8a3bD8c7C8e5F2a1E4f6C8d9b0A2c3E5f7a9B1d2"
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
    
    const success = await handleCarbonPurchase(selectedPack, transactionHash);
    
    setIsSubmitting(false);
    
    if (success) {
      setShowPopup(false);
      setTransactionHash('');
    }
  };

  if (!showPopup || !selectedPack) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
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
            {selectedPack.icon}
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
            {selectedPack.name}
          </h2>
          <p className="text-gray-600 text-sm md:text-base">{selectedPack.description}</p>
          <div className="mt-4 p-4 bg-gradient-to-br from-emerald-50 to-green-100 rounded-xl border border-emerald-200">
            <p className="text-base md:text-lg font-bold text-emerald-700">
              ${selectedPack.price} • {selectedPack.credits} Carbon Credits
            </p>
            <p className="text-sm text-emerald-600 mt-1">
              Equivalent to planting {Math.round(selectedPack.credits * 20)} trees
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
                size={120}
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
                  'Purchase Carbon Credits'
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

export default CarbonPopup;