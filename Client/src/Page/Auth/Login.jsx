//Client\src\Page\Login.jsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(true);

  const handleClickForRegistration = () => {
    navigate("/registration");
  };

  const handleForgotPassword = () => {
    // Navigate to the Forgot Password page (you can create this page later)
    navigate("/forgot-password");
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <div className="w-full sm:w-2/3 lg:w-2/4 p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">
        Access your account<span className="text-blue-500">.</span>
      </h1>
      <p className="text-gray-400 text-sm mb-6">
        Don&apos;t have an account?{" "}
        <span
          className="text-blue-500 cursor-pointer"
          onClick={handleClickForRegistration}
        >
          Sign up
        </span>
      </p>
      <form className="space-y-5">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none"
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={handleRememberMeChange}
              className="w-4 h-4 border-2 border-gray-500 rounded-sm checked:bg-blue-1200 focus:outline-none"
            />
            <span className="pl-2 text-gray-200 text-sm">Remember me</span>
          </div>
          <div className="text-right">
            <span
              className="text-blue-500 text-sm cursor-pointer"
              onClick={handleForgotPassword}
            >
              Forgot Password?
            </span>
          </div>
        </div>
        <button
          type="submit"
          className="sm:w-1/3 md:w-1/3 lg:w-2/4 p-3 rounded-lg hover:bg-blue-600 cursor-pointer bg-blue-500 text-white text-xs sm:text-base font-sans font-semibold"
        >
          Login account
        </button>
      </form>
    </div>
  );
};

export default Login;
