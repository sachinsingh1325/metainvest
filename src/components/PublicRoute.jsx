import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  let user = null;
  let token
  try {
    const stored = localStorage.getItem("user");
     token = localStorage.getItem("token");
    user = stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error("Invalid user data in localStorage:", error);
    localStorage.removeItem("user");
  }


  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;