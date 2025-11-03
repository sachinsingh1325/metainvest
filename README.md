# Metainvesting - Authentication UI

A modern authentication UI built with React and Tailwind CSS featuring glassmorphism design.

## Features

- **Sign Up Page**: Email, Password, and Mobile Number (required)
- **OTP Verification Page**: 6-digit OTP input with auto-focus, paste support, email verification status display, and resend functionality
- **Sign In Page**: Email, Password with show/hide toggle, and Forgot Password link
- **Dashboard**: Dummy dashboard page shown after successful OTP verification

## Tech Stack

- React 18
- React Router DOM
- Tailwind CSS
- Vite

## Getting Started

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Pages

- `/` or `/signin` - Sign In page
- `/signup` - Sign Up page
- `/otp-verification` - OTP Verification page
- `/dashboard` - Dashboard page (redirected after OTP verification)

## Design Features

- Glassmorphism effect with backdrop blur
- Gradient backgrounds (blue to purple to pink)
- Smooth hover and focus transitions
- Responsive design for mobile and desktop
- Inter/Poppins font family
- Modern rounded corners and subtle shadows

## Project Structure

```
src/
  ├── pages/
  │   ├── SignUp.jsx
  │   ├── SignIn.jsx
  │   ├── OTPVerification.jsx
  │   └── Dashboard.jsx
  ├── App.jsx
  ├── main.jsx
  └── index.css
```

## Notes

- Mobile number field in Sign Up is required
- OTP verification page shows email verification status
- Email is used for both Sign Up and Sign In (replaces Name field)
- OTP verification redirects to dashboard after successful verification
- All form inputs include proper validation and accessibility features
- Password fields have show/hide toggle functionality

