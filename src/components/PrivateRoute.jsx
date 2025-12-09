import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axiosInstance from "../service/api";
const PrivateRoute = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        // console.log('token not found');
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const response = await axiosInstance.get("/auth/user/verify-token");
        if(response.status===200){
          setIsAuthenticated(true);
        }
          } catch (error) {
        console.error("Token verification failed:", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    localStorage.removeItem('token');
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;