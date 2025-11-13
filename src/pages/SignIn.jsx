import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function SignIn() {
  const navigate = useNavigate()
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
    console.log('Sign in:', formData)
    // Dummy navigation after successful login
    navigate('/dashboard')
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh] w-full bg-gradient-to-br from-green-300 via-emerald-300 to-cyan-200 px-4 sm:px-6 py-8">
    <div className="w-full max-w-4xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2 transition-all duration-300 border border-none">
  
        
        {/* LEFT SECTION */}
        <div className="bg-gradient-to-br from-emerald-500 to-teal-400 text-white flex flex-col justify-center items-center p-10 md:p-14 relative">
          {/* Floating shapes */}
          <div className="absolute top-10 left-10 w-24 h-24 bg-white/10 rounded-full"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/10 rounded-full"></div>

          <div className="text-center relative z-10">
            {/* Logo */}
            <div className="mb-8 flex items-center justify-center gap-2">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <span className="text-xl font-bold">Metawealthprime</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-4">Welcome Back!</h2>
            <p className="text-white/90 mb-10 text-base md:text-lg leading-relaxed">
              To keep connected with us please<br />login with your personal info
            </p>
            <Link
              to="/signup"
              className="inline-block border-2 border-white rounded-full px-10 py-3 font-semibold hover:bg-white hover:text-teal-600 transition-all duration-300 transform hover:scale-105"
            >
              SIGN UP
            </Link>
          </div>
        </div>

        {/* RIGHT SECTION - SIGN IN FORM */}
        <div className="p-8 sm:p-10 md:p-12 bg-white flex flex-col justify-center relative z-10">
          <Link 
            to="/" 
            className="text-emerald-500 hover:text-emerald-600 text-sm font-medium absolute top-5 left-5 transition-colors"
          >
            ← Home
          </Link>

          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-emerald-600 mb-3">Sign In</h1>
            <p className="text-gray-500 text-sm md:text-base">
              We missed you! Please enter your details.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
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
                className="w-full px-3 py-2 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:bg-white outline-none transition-all duration-200 text-gray-800 placeholder-gray-400"
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
                  className="w-full px-3 py-2 pr-12 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:bg-white outline-none transition-all duration-200 text-gray-800 placeholder-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-500 transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243" />
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

            {/* Forgot Password */}
            <div className="flex justify-end">
              <Link 
                to="/forgot-password" 
                className="text-sm text-emerald-500 hover:text-emerald-600 transition-colors font-medium"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 text-white font-semibold hover:from-emerald-600 hover:to-teal-500 transform hover:scale-[1.02] transition-all duration-200 shadow-lg"
            >
              Sign In
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm md:text-base">
              Don't have an account?{' '}
              <Link to="/signup" className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors">
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
