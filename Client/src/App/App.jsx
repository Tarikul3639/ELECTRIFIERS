// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "../pages/LandingPage.jsx";
import Login from "../pages/auth/Login.jsx";
import Registration from "../pages/auth/Registration.jsx";
import ForgotPassword from "../pages/auth/ForgotPassword.jsx";
import Admin from "../pages/admin/Admin.jsx";

// Dynamically import components to avoid case sensitivity issues
const MainLayout = React.lazy(() => import("../Components/layouts/MainLayout.jsx"));
const AuthLayout = React.lazy(() => import("../Components/layouts/AuthLayout.jsx"));
const ToastContainer = React.lazy(() => import("../Components/ui/ToastContainer.jsx"));
const PrivateRoute = React.lazy(() => import("../Components/routes/PrivateRoute.jsx"));
const AdminRoute = React.lazy(() => import("../Components/routes/AdminRoute.jsx"));
const PublicRoute = React.lazy(() => import("../Components/routes/PublicRoute.jsx"));


function App() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <React.Suspense fallback={<div>Loading toast container...</div>}>
          <ToastContainer />
        </React.Suspense>
        <Routes>
          {/* 🔐 Protected Routes */}
          <Route 
            element={
              <React.Suspense fallback={<div>Loading private route...</div>}>
                <PrivateRoute>
                  <React.Suspense fallback={<div>Loading main layout...</div>}>
                    <MainLayout />
                  </React.Suspense>
                </PrivateRoute>
              </React.Suspense>
            }
          >
            <Route path="/home" element={<LandingPage />} />
            <Route 
              path="/admin" 
              element={
                <React.Suspense fallback={<div>Loading admin route...</div>}>
                  <AdminRoute><Admin /></AdminRoute>
                </React.Suspense>
              } 
            />
          </Route>

          {/* 🏠 Public Routes (Landing Page) */}
          <Route 
            element={
              <React.Suspense fallback={<div>Loading auth layout...</div>}>
                <AuthLayout />
              </React.Suspense>
            }
          >
            <Route 
              path="/login" 
              element={
                <React.Suspense fallback={<div>Loading public route...</div>}>
                  <PublicRoute><Login /></PublicRoute>
                </React.Suspense>
              } 
            />
            <Route 
              path="/registration" 
              element={
                <React.Suspense fallback={<div>Loading public route...</div>}>
                  <PublicRoute><Registration /></PublicRoute>
                </React.Suspense>
              } 
            />
            <Route 
              path="/forgot-password" 
              element={
                <React.Suspense fallback={<div>Loading public route...</div>}>
                  <PublicRoute><ForgotPassword /></PublicRoute>
                </React.Suspense>
              } 
            />
          </Route>

          {/* 🔁 Catch-all */}
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </BrowserRouter>
    </React.Suspense>
  );
}

export default App;