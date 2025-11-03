import { Link } from 'react-router-dom'

function Dashboard() {
  return (
    <div className="min-h-screen green-gradient-bg flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated water waves background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/2 -right-20 w-96 h-96 bg-teal-300/20 rounded-full blur-3xl animate-wave" style={{ animationDelay: '1s' }}></div>
        <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-green-300/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="relative z-10 w-full max-w-md animate-slide-up">
        <div className="watermorphism p-6 sm:p-8 shadow-2xl text-center">
          <div className="mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-float">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">Welcome to Dashboard!</h1>
            <p className="text-gray-600 text-sm sm:text-base">
              You have successfully verified your OTP and signed in.
            </p>
          </div>
          
          <div className="space-y-3">
            <Link
              to="/signin"
              className="block w-full py-3 rounded-lg bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 text-white font-semibold hover:from-emerald-600 hover:via-teal-600 hover:to-green-600 transform hover:scale-[1.02] transition-all duration-200 shadow-lg shadow-emerald-500/40 relative overflow-hidden group"
            >
              <span className="relative z-10">Sign Out</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity animate-shimmer"></div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
