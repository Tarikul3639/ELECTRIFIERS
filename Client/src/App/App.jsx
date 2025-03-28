import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "../Page/MainPage.jsx";
import Login from "../Page/Auth/Login.jsx";
import Registration from "../Page/Auth/Registration.jsx";
import ForgotPassword from "../Page/Auth/ForgotPassword.jsx";
import MainLayout from "../Layouts/MainLayout.jsx";
import AuthLayout from "../Layouts/AuthLayout.jsx";
import Admin from "../Page/Admin/Admin.jsx"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<MainPage/>} />
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
