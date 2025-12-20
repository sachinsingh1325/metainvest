import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import OTPVerification from './pages/OTPVerification'
import Dashboard from './pages/Dashboard'
import PrivateRoute from './components/PrivateRoute'
import PublicRoute from './components/PublicRoute'
import Layout from './components/Layout'
import ImpactAnalyticsPage from './pages/ImpactAnalyticsPage'
import WasteJourneyPage from './pages/WasteJourneyPage'
import toast, { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
    <Toaster />
    <Router>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/otp-verification" element={<OTPVerification />} />
        </Route>
        <Route element={<PrivateRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/impactAnalyticsPage" element={<ImpactAnalyticsPage />} />
          <Route path="/wasteJourneyPage" element={<WasteJourneyPage />} />


          </Route>
        </Route>
      </Routes>
    </Router>
    </>
  )
}

export default App

