import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../service/api';

function OTPVerification() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']); // 6 digits
  const inputRefs = useRef([]);
  const [canResend, setCanResend] = useState(false);
  const [timer, setTimer] = useState(30);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [verifyError, setVerifyError] = useState(null);
  const [resendError, setResendError] = useState(null);
  const [resendSuccess, setResendSuccess] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem('signupEmail');
    if (!savedEmail) {
      navigate('/signup');
      return;
    }
    setEmail(savedEmail);
    if (inputRefs.current[0]) inputRefs.current[0].focus();
  }, [navigate]);

  useEffect(() => {
    setResendError(null);
    setResendSuccess(false);
    
    let interval = null;
    if (timer > 0 && !canResend) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer, canResend]);

  const handleChange = (index, value) => {
    if (value.length > 1) return;
    setVerifyError(null);
    const newOtp = [...otp];
    newOtp[index] = value.replace(/[^0-9]/g, '');
    setOtp(newOtp);
    if (value && index < 5 && inputRefs.current[index + 1]) { // now 6 digits (0–5)
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').slice(0, 6).replace(/[^0-9]/g, '');
    const newOtp = [...otp];
    for (let i = 0; i < 6; i++) {
      if (i < pasted.length) newOtp[i] = pasted[i];
    }
    setOtp(newOtp);
    const nextIndex = Math.min(pasted.length, 5);
    if (inputRefs.current[nextIndex]) inputRefs.current[nextIndex].focus();
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const otpString = otp.join('');

    if (otpString.length !== 6) {
      setVerifyError('Please enter the complete 6-digit code.');
      return;
    }

    setLoading(true);
    setVerifyError(null);

    try {
      const payload = { email, otp: otpString };
      const response = await axiosInstance.post('/auth/user/verify-otp', payload);

      if (response.status === 200) {
        localStorage.removeItem('signupEmail');
        navigate('/dashboard');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Verification failed. Please check the code or try resending.';
      setVerifyError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    setResendError(null);
    setResendSuccess(false);
    setCanResend(false);

    try {
      const payload = { email };
      const response = await axiosInstance.post('/auth/user/resend-otp', payload);

      if (response.status === 200) {
        setOtp(['', '', '', '', '', '']);
        setTimer(30);
        setResendSuccess(true);
        if (inputRefs.current[0]) inputRefs.current[0].focus();
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to resend OTP. Please try again later.';
      setResendError(errorMessage);
      setCanResend(true);
      setTimer(0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4 relative overflow-hidden">
      {/* Neon glow orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-sm bg-gradient-to-b from-gray-900/90 to-gray-800/90 border border-emerald-400/30 rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.3)] p-8 backdrop-blur-xl">
        <div className="text-center mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-emerald-400 mb-2 tracking-wide">Verify OTP</h1>
          <p className="text-gray-400 text-sm">
            We've sent a 6-digit code to your email. Please enter it below.
          </p>
          <div className="mt-3 p-3 border border-emerald-400/30 rounded-lg bg-gray-900/60 backdrop-blur-md">
            <p className="text-sm text-emerald-300 truncate">
              📧 <span className="font-mono text-emerald-200">{email}</span>
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {verifyError ? 'Verification failed' : 'Awaiting code...'}
            </p>
          </div>
        </div>

        <form onSubmit={handleVerify} className="space-y-6">
          {/* OTP Inputs */}
          <div className="flex justify-between gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-12 h-12 sm:w-14 sm:h-14 text-center text-lg sm:text-xl font-bold rounded-lg border-2 border-gray-700 bg-gray-800 text-emerald-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 shadow-inner"
                disabled={loading}
              />
            ))}
          </div>

          {/* API Feedback */}
          {verifyError && (
            <p className="text-sm text-red-400 font-medium text-center">{verifyError}</p>
          )}
          {resendSuccess && (
            <p className="text-sm text-emerald-400 font-medium text-center">New code sent! Check your inbox.</p>
          )}
          {resendError && (
            <p className="text-sm text-red-400 font-medium text-center">{resendError}</p>
          )}

          {/* Resend OTP */}
          <div className="text-center">
            {canResend && !loading ? (
              <button
                type="button"
                onClick={handleResend}
                className="text-sm text-emerald-400 hover:text-emerald-300 font-medium transition-colors disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Sending...' : '🔄 Resend OTP'}
              </button>
            ) : (
              <p className="text-sm text-gray-400">
                Resend OTP in <span className="text-emerald-400 font-semibold">{timer}s</span>
              </p>
            )}
          </div>

          {/* Verify Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 text-white font-semibold shadow-lg shadow-emerald-500/40 hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group flex items-center justify-center"
            disabled={otp.join('').length !== 6 || loading}
          >
            {loading && (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            <span className="relative z-10">{loading ? 'Verifying...' : 'Verify OTP'}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity animate-pulse"></div>
          </button> 
        </form>
      </div>
    </div>
  );
}

export default OTPVerification;
