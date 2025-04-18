// src/Components/routes/PublicRoute.jsx
import { Navigate, useLocation } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();
  
  if (token) {
    // Already logged in → send them to where they tried to go or default to home
    return <Navigate to={location.state?.from?.pathname || "/home"} replace />;
  }

  return children;
};

export default PublicRoute;
