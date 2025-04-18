// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "../pages/LandingPage.jsx";
import Login from "../pages/auth/Login.jsx";
import Registration from "../pages/auth/Registration.jsx";
import ForgotPassword from "../pages/auth/ForgotPassword.jsx";
import Admin from "../pages/admin/Admin.jsx";

import MainLayout from "../components/layouts/MainLayout.jsx";
import AuthLayout from "../components/layouts/AuthLayout.jsx";
import ToastContainer from "../Components/ui/ToastContainer.jsx";
import PrivateRoute from "../Components/routes/PrivateRoute.jsx";
import AdminRoute from "../Components/routes/AdminRoute.jsx";
import PublicRoute from "../Components/routes/PublicRoute.jsx";


function App() {
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