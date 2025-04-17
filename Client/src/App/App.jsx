// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "../pages/LandingPage.jsx";
import Login from "../pages/auth/Login.jsx";
import Registration from "../pages/auth/Registration.jsx";
import ForgotPassword from "../pages/auth/ForgotPassword.jsx";
import MainLayout from "../components/layouts/MainLayout.jsx";
import AuthLayout from "../components/layouts/AuthLayout.jsx";
import Admin from "../pages/admin/Admin.jsx";
import ToastContainer from '../Components/ui/ToastContainer.jsx';
import AdminRoute from "../Components/routes/AdminRoute.jsx";
import PrivateRoute from "../Components/routes/PrivateRoute.jsx";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        {/* Routes with main layout */}
        <Route element={<PrivateRoute><MainLayout /></PrivateRoute>}>
          <Route path="/home" element={<LandingPage />} />
          
          {/* Protected Admin Route */}
          <Route path="/admin" element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          } />
        </Route>

        {/* Auth layout for login/registration */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* Redirect to /home if path is unknown */}
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
