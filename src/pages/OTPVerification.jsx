import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function OTPVerification() {
  const navigate = useNavigate()
  const [otp, setOtp] = useState(['', '', '', '', ''])
  const inputRefs = useRef([])
  const [canResend, setCanResend] = useState(false)
  const [timer, setTimer] = useState(30)
  const [email, setEmail] = useState('')

  useEffect(() => {
    // Get email from localStorage
    const savedEmail = localStorage.getItem('signupEmail') || 'your email'
    setEmail(savedEmail)
    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [])

  useEffect(() => {
    let interval = null
    if (timer > 0 && !canResend) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)
    } else {
      setCanResend(true)
    }
    return () => clearInterval(interval)
  }, [timer, canResend])

  const handleChange = (index, value) => {
    if (value.length > 1) return // Only allow single digit
    
    const newOtp = [...otp]
    newOtp[index] = value.replace(/[^0-9]/g, '') // Only allow numbers
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').slice(0, 5).replace(/[^0-9]/g, '')
    const newOtp = [...otp]
    
    for (let i = 0; i < 5; i++) {
      if (i < pastedData.length) {
        newOtp[i] = pastedData[i]
      }
    }
    
    setOtp(newOtp)
    
    // Focus the next empty input or the last one
    const nextIndex = Math.min(pastedData.length, 5)
    if (inputRefs.current[nextIndex]) {
      inputRefs.current[nextIndex].focus()
    }
  }

  const handleVerify = (e) => {
    e.preventDefault()
    const otpString = otp.join('')
    
    if (otpString.length === 5) {
      // In a real app, verify OTP with backend
      // For now, just redirect to dashboard
      navigate('/dashboard')
    }
  }

  const handleResend = () => {
    setOtp(['', '', '', '', '', ''])
    setCanResend(false)
    setTimer(30)
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }

  return (
    <div className="min-h-screen green-gradient-bg flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated water waves background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/2 -right-20 w-96 h-96 bg-teal-300/20 rounded-full blur-3xl animate-wave" style={{ animationDelay: '1s' }}></div>
        <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-green-300/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="relative z-10 w-full max-w-sm animate-slide-up">
        <div className="watermorphism p-6 sm:p-8 shadow-2xl">
          <div className="text-center mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">Verify OTP</h1>
            <p className="text-gray-600 text-sm sm:text-base">
              We've sent a 6-digit code to your email. Please enter it below.
            </p>
            <div className="mt-3 p-3 bg-emerald-50/80 border border-emerald-200/50 rounded-lg backdrop-blur-sm">
              <p className="text-sm text-emerald-700">
                📧 Email: <span className="font-mono font-medium text-emerald-800 break-all">{email}</span>
              </p>
              <p className="text-xs text-emerald-600 mt-1">✗ Not verified</p>
            </div>
          </div>

          <form onSubmit={handleVerify} className="space-y-6">
            {/* OTP Input Boxes */}
            <div className="flex justify-between gap-2 sm:gap-3">
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
                  className="w-12 h-12 sm:w-14 sm:h-14 text-center text-lg sm:text-xl font-semibold rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none transition-all duration-200 watermorphism-input text-gray-800"
                />
              ))}
            </div>

            {/* Resend OTP */}
            <div className="text-center">
              {canResend ? (
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                >
                  Resend OTP
                </button>
              ) : (
                <p className="text-sm text-gray-600">
                  Resend OTP in <span className="font-semibold text-emerald-600">{timer}s</span>
                </p>
              )}
            </div>

            {/* Verify Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 text-white font-semibold hover:from-emerald-600 hover:via-teal-600 hover:to-green-600 transform hover:scale-[1.02] transition-all duration-200 shadow-lg shadow-emerald-500/40 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
              disabled={otp.join('').length !== 5}
            >
              <span className="relative z-10">Verify OTP</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity animate-shimmer"></div>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default OTPVerification
