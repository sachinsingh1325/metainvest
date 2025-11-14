import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../service/api';

function OTPVerification() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
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

    if (value && index < 5 && inputRefs.current[index + 1]) {
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
      const errorMessage = err.response?.data?.message || 'Verification failed. Please check the code.';
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
      const errorMessage = err.response?.data?.message || 'Failed to resend. Try again later.';
      setResendError(errorMessage);
      setCanResend(true);
      setTimer(0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-emerald-300 via-teal-300 to-green-200 relative overflow-hidden">

      {/* Soft Blur Circles (Same Theme) */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/50 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-emerald-400/40 rounded-full blur-3xl opacity-20"></div>
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-xl border border-white/40 shadow-[0_8px_40px_rgba(0,0,0,0.15)] rounded-3xl p-8">

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-emerald-600 mb-1">Verify OTP</h1>
          <p className="text-gray-600 text-sm">
            Enter the 6-digit code sent to your email
          </p>

          <div className="mt-3 p-3 border border-emerald-300 rounded-lg bg-white/70 backdrop-blur-md">
            <p className="text-sm text-emerald-700 truncate">
              📧 <span className="font-mono">{email}</span>
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {verifyError ? 'Verification failed' : 'Waiting for OTP...'}
            </p>
          </div>
        </div>

        <form onSubmit={handleVerify} className="space-y-6">

          {/* OTP Inputs */}
          <div className="flex justify-center flex-wrap gap-2 sm:gap-3 w-full">
  {otp.map((digit, index) => (
    <input
      key={index}
      ref={(el) => (inputRefs.current[index] = el)}
      type="text"
      maxLength={1}
      value={digit}
      onChange={(e) => handleChange(index, e.target.value)}
      onKeyDown={(e) => handleKeyDown(index, e)}
      onPaste={handlePaste}
      className="w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 
                 text-center text-lg font-bold rounded-lg 
                 border border-gray-300 bg-white shadow-sm 
                 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 
                 transition"
      disabled={loading}
    />
  ))}
</div>

          {/* API messages */}
          {verifyError && <p className="text-center text-sm text-red-500">{verifyError}</p>}
          {resendError && <p className="text-center text-sm text-red-500">{resendError}</p>}
          {resendSuccess && <p className="text-center text-sm text-emerald-600">New OTP sent!</p>}

          {/* Resend */}
          <div className="text-center">
            {canResend && !loading ? (
              <button
                type="button"
                onClick={handleResend}
                className="text-sm text-emerald-600 hover:text-emerald-700 font-semibold"
              >
                🔄 Resend OTP
              </button>
            ) : (
              <p className="text-sm text-gray-600">
                Resend available in <span className="font-semibold text-emerald-600">{timer}s</span>
              </p>
            )}
          </div>

          {/* Verify Button */}
          <button
            type="submit"
            disabled={otp.join('').length !== 6 || loading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-green-500 text-white font-semibold shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default OTPVerification;
