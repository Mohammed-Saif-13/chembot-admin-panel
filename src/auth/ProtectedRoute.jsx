/**
 * ProtectedRoute Component
 * Real token validation and auto-redirect
 * Checks authentication on every route access
 */

import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  /**
   * Check if user is authenticated
   */
  const isAuthenticated = () => {
    const token = localStorage.getItem("authToken");

    // Check if token exists
    if (!token) {
      return false;
    }

    // Optional: Add token expiry check here in future
    // const tokenExpiry = localStorage.getItem('tokenExpiry');
    // if (tokenExpiry && new Date().getTime() > tokenExpiry) {
    //   localStorage.removeItem('authToken');
    //   return false;
    // }

    return true;
  };

  // If not authenticated, redirect to login
  if (!isAuthenticated()) {
    // Save the attempted URL to redirect back after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated, render the protected component
  return children;
};

export default ProtectedRoute;