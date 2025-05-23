// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import LandingPage from "../pages/LandingPage.jsx";
import Login from "../pages/auth/Login.jsx";
import Registration from "../pages/auth/Registration.jsx";
import ForgotPassword from "../pages/auth/ForgotPassword.jsx";
import Admin from "../pages/admin/Admin.jsx";

import MainLayout from "../components/layouts/MainLayout.jsx";
import AuthLayout from "../components/layouts/AuthLayout.jsx";
import ToastContainer from "../components/ui/ToastContainer.jsx";
import PrivateRoute from "../components/routes/PrivateRoute.jsx";
import AdminRoute from "../components/routes/AdminRoute.jsx";
import PublicRoute from "../components/routes/PublicRoute.jsx";


function App() {
  // Initialize theme on app load
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    const root = document.documentElement;
    
    if (savedTheme === "light") {
      root.classList.remove("dark");
      root.style.backgroundColor = "var(--color-background-light)";
    } else {
      root.classList.add("dark");
      root.style.backgroundColor = "var(--color-background-dark)";
    }
  }, []);
  
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>

        {/* 🔐 Protected Routes */}
        <Route element={<PrivateRoute><MainLayout /></PrivateRoute>}>
          <Route path="/home" element={<LandingPage />} />
          <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
        </Route>

        {/* 🏠 Public Routes (Landing Page) */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/registration" element={<PublicRoute><Registration /></PublicRoute>} />
          <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
        </Route>

        {/* 🔁 Catch-all */}
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;