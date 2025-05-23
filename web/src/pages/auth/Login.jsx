//Client\src\Page\Login.jsx
import { useNavigate,useLocation } from "react-router-dom";
import { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../components/ui/Loader.jsx';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClickForLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        setLoading(false);
        navigate(from, { replace: true });
        
        // Store the token in local storage or session storage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        console.log("Login successful:", data);
      } else {
        console.error("Login failed:", data.message);
        toast.error(data.message);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("An error occurred.");
      setLoading(false);
    }
  };

  const [rememberMe, setRememberMe] = useState(true);

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <div className="w-full sm:w-2/3 lg:w-2/4 p-6">
      {loading && (<Loader loading={true} />)}
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">
        Access your account<span className="text-blue-500">.</span>
      </h1>
      <p className="text-gray-400 text-sm mb-6">
        Don&apos;t have an account?{" "}
        <span
          className="text-blue-500 cursor-pointer"
          onClick={()=>navigate("/registration")}
        >
          Sign up
        </span>
      </p>
      <form className="space-y-5" onSubmit={handleClickForLogin}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
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
              onClick={()=>navigate("/forgot-password")}
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
