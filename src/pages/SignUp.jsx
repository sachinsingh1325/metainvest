import { useState,useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axiosInstance from '../service/api'
import { useSearchParams } from "react-router-dom"

function SignUp() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobileNumber: '',
    referralCode: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null) 

  useEffect(() => {
    const ref = searchParams.get("ref")
    console.log("this is refferal code",ref)
    if (ref) {
      // setReferralCode(ref)
    setFormData(prev => ({
      ...prev,
      referralCode: ref
    }))
    }
  }, [searchParams])

  const handleChange = (e) => {
    const { name, value } = e.target
    setError(null);
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await axiosInstance.post('/auth/user/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        mobileNumber: formData.mobileNumber,
        referredBy: formData.referralCode, // Added referral code to API call
      });

      // Assuming a successful response structure
      if (response.status === 200 || response.data.success) {
        console.log('Signup Successful:', response.data);
        
        // Save email to localStorage for the next step (OTP verification)
        localStorage.setItem('signupEmail', formData.email); 
        
        // 3. Navigate after successful API call
        navigate('/otp-verification');
      } else {
        // Handle unexpected successful status, if necessary
        setError('Signup failed. Please try again.');
      }
    } catch (err) {
      // 4. Handle API errors (e.g., validation, network issues)
      console.error('Signup Error:', err);
      // Use the error message from the API response, or a default one
      setError(err.response?.data?.message || 'An error occurred during sign up. Please check your network.');
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[100vh] w-full bg-gradient-to-br from-teal-400 via-emerald-400 to-cyan-400 px-4 sm:px-6 py-10 relative overflow-hidden">
      
      {/* Floating blurred circles (Omitted for brevity) */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-emerald-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -right-20 w-96 h-96 bg-teal-400/25 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-5xl bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2 transition-all duration-300 border border-white/20">
        
        {/* LEFT SIDE - Welcome Section (Omitted for brevity) */}
        <div className="bg-gradient-to-br from-teal-500 via-emerald-500 to-cyan-500 text-white flex flex-col justify-center items-center p-10 md:p-14 relative overflow-hidden">
          <div className="absolute top-10 left-10 w-24 h-24 bg-white/10 rounded-full"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/10 rounded-full"></div>
          <div className="absolute top-1/2 left-5 w-16 h-16 bg-white/10 rounded-full"></div>

          <div className="text-center relative z-10">
            <div className="mb-8 flex items-center justify-center gap-2">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <span className="text-xl font-bold">Metawealthprime</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-4">Join the Family!</h2>
            <p className="text-white/90 mb-10 text-base md:text-lg leading-relaxed">
              Create your account and start<br /> your journey with us today.
            </p>
            <button
              onClick={() => navigate('/signin')}
              className="inline-block border-2 border-white rounded-full px-10 py-3 font-semibold hover:bg-white hover:text-teal-500 transition-all duration-300 transform hover:scale-105"
            >
              SIGN IN
            </button>
          </div>
        </div>

        {/* RIGHT SIDE - Sign Up Form */}
        <div className="p-8 sm:p-8 md:p-10 bg-white flex flex-col justify-center relative">
          <Link 
            to="/" 
            className="text-teal-500 hover:text-teal-600 text-sm font-medium absolute top-5 left-5 transition-colors"
          >
            ← Home
          </Link>

          <div className="text-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-teal-500 mb-1">Create Account</h1>
            <p className="text-gray-500 text-sm md:text-sm">
              Fill your details to get started
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your name"
                className="w-full px-3 py-2 bg-gray-50 rounded-lg focus:ring-2 focus:ring-teal-400 outline-none transition-all text-gray-600"
              />
            </div>
            
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your Email"
                className="w-full px-3 py-2 bg-gray-50 rounded-lg focus:ring-2 focus:ring-teal-400 outline-none transition-all text-gray-800"
              />
            </div>
            
            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter Password"
                  className="w-full px-3 py-2 bg-gray-50 rounded-lg focus:ring-2 focus:ring-teal-400 outline-none transition-all text-gray-800 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-teal-500 transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            
            {/* Mobile Field */}
            <div>
              <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Mobile (Optional)
              </label>
              <input
                type="tel"
                id="mobileNumber"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                placeholder="Enter Mobile Number"
                className="w-full px-3 py-2 bg-gray-50 rounded-lg focus:ring-2 focus:ring-teal-400 outline-none transition-all text-gray-800"
              />
            </div>
            
            {/* Referral Code Field - New Addition */}
            <div>
              <label htmlFor="referralCode" className="block text-sm font-medium text-gray-700 mb-2">
                Referral Code (Optional)
              </label>
              <input
                type="text"
                id="referralCode"
                name="referralCode"
                value={formData.referralCode}
                onChange={handleChange}
                placeholder="Enter referral code if you have one"
                className="w-full px-3 py-2 bg-gray-50 rounded-lg focus:ring-2 focus:ring-teal-400 outline-none transition-all text-gray-800"
              />
              <p className="text-xs text-gray-500 mt-1">
                If someone referred you, enter their code here
              </p>
            </div>
            
            {/* Error Message */}
            {error && (
              <p className="text-red-500 text-sm font-medium text-center">{error}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading} 
              className={`w-full py-3 rounded-full text-white font-semibold transition-all duration-200 shadow-lg ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-500 hover:from-teal-600 hover:via-emerald-600 hover:to-cyan-600 transform hover:scale-[1.02] hover:shadow-xl'
              }`}
            >
              {loading ? 'Processing...' : 'Sign Up'} 
            </button>
          </form>

          {/* Sign In Link */}
          <div className="mt-4 text-center">
            <p className="text-gray-500 text-sm md:text-sm">
              Already have an account?{' '}
              <Link to="/signin" className="text-teal-500 hover:text-teal-600 font-semibold transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp