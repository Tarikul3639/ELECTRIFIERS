import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Page/Home.jsx";
import Login from "../Page/Login.jsx";
import Registration from "../Page/Registration.jsx";
import ForgotPassword from "../Page/ForgotPassword.jsx";
import MainLayout from "../Layouts/MainLayout.jsx";
import AuthLayout from "../Layouts/AuthLayout.jsx";  

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* For general pages like Home */}
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/home" element={<MainLayout><Home /></MainLayout>} />

        {/* For login and registration, using AuthLayout */}
        <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
        <Route path="/registration" element={<AuthLayout><Registration /></AuthLayout>} />
        <Route path="/forgot-password" element={<AuthLayout><ForgotPassword/></AuthLayout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
