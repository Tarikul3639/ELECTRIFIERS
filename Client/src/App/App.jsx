// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "../pages/LandingPage.jsx";
import Login from "../pages/auth/Login.jsx";
import Registration from "../pages/auth/Registration.jsx";
import ForgotPassword from "../pages/auth/ForgotPassword.jsx";
import Admin from "../pages/admin/Admin.jsx";

// Using paths that will be compatible with case-sensitive file systems
import MainLayout from "/src/Components/layouts/MainLayout.jsx";
import AuthLayout from "/src/Components/layouts/AuthLayout.jsx";
import ToastContainer from "/src/Components/ui/ToastContainer.jsx";
import PrivateRoute from "/src/Components/routes/PrivateRoute.jsx";
import AdminRoute from "/src/Components/routes/AdminRoute.jsx";
import PublicRoute from "/src/Components/routes/PublicRoute.jsx";


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