import { useState } from 'react'
import { Link } from 'react-router-dom'

function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, you would handle authentication here
    console.log('Sign in:', formData)
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
        <Link 
          to="/signin" 
          className="text-white hover:text-green-100 mb-4 inline-block text-sm transition-colors font-medium drop-shadow-lg"
        >
          ← Home page
        </Link>

        <div className="watermorphism p-6 sm:p-8 shadow-2xl">
          <div className="text-center mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">Welcome Back!</h1>
            <p className="text-gray-600 text-sm sm:text-base">We missed you! Please enter your details.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your Email"
                className="watermorphism-input w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none transition-all duration-200 text-gray-800 placeholder-gray-500"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter Password"
                  className="watermorphism-input w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none transition-all duration-200 text-gray-800 placeholder-gray-500 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-emerald-600 transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.29 3.29m0 0L3 3m3.29 3.29L3 3m13.561 13.561A10.05 10.05 0 0121 12c0-4.478-2.943-8.268-7-9.543a9.97 9.97 0 00-3.029 1.563m5.858.908a3 3 0 014.243 4.243m-4.242 4.242L9.88 9.88m0 0L3 3m6.88 6.88l3.29 3.29M21 21l-3.29-3.29m0 0L21 21m-3.29-3.29L21 21" />
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

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <Link 
                to="/forgot-password" 
                className="text-sm text-emerald-600 hover:text-emerald-700 transition-colors font-medium"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 text-white font-semibold hover:from-emerald-600 hover:via-teal-600 hover:to-green-600 transform hover:scale-[1.02] transition-all duration-200 shadow-lg shadow-emerald-500/40 relative overflow-hidden group"
            >
              <span className="relative z-10">Sign in</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity animate-shimmer"></div>
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm sm:text-base">
              Don't have an account?{' '}
              <Link to="/signup" className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn
