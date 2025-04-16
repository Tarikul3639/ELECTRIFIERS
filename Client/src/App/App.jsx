import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage.jsx";
import Login from "../pages/auth/Login.jsx";
import Registration from "../pages/auth/Registration.jsx";
import ForgotPassword from "../pages/auth/ForgotPassword.jsx";
import MainLayout from "../components/layouts/MainLayout.jsx";
import AuthLayout from "../components/layouts/AuthLayout.jsx";
import Admin from "../pages/admin/Admin.jsx";
import ToastContainer  from '../Components/ui/ToastContainer.jsx';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/Home" element={<LandingPage />} />
          <Route path="/Admin" element={<Admin />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
