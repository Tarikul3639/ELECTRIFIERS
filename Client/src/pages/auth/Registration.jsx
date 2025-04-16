import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../Components/ui/Loader.jsx';

const Registration = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    division: "",
    area: "",
    port: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDivisionChange = (e) => {
    const division = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      division,
      area: "",
      port: "",
    }));
  };

  const handleAreaChange = (e) => {
    const area = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      area,
      port: "",
    }));
  };

  const handleClickForRegistration = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { firstName, lastName, email, password, phone, division, area, port } = formData;

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/registration`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, password, phone, division, area, port }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        setLoading(false);
        console.log("Registration successful:", data);
      } else {
        console.error("Registration failed:", data.message);
        toast.error(data.message);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("An error occurred.");
      setLoading(false);
    }
  };

  const handleClickForLogin = () => {
    navigate("/login");
  };

  const divisions = ["Dhaka", "Chittagong", "Rajshahi", "Khulna"];
  const areas = {
    Dhaka: ["Dhanmondi", "Uttara", "Gulshan"],
    Chittagong: ["Pahartali", "Nasirabad", "Halishahar"],
    Rajshahi: ["Rajpara", "Boalia", "Shalbagan"],
    Khulna: ["Sonadanga", "Khalishpur", "Daulatpur"],
  };

  const ports = {
    Dhanmondi: ["Port A", "Port B", "Port C"],
    Uttara: ["Port D", "Port E", "Port F"],
    Gulshan: ["Port G", "Port H", "Port I"],
    Pahartali: ["Port J", "Port K", "Port L"],
    Nasirabad: ["Port M", "Port N", "Port O"],
    Halishahar: ["Port P", "Port Q", "Port R"],
    Rajpara: ["Port S", "Port T", "Port U"],
    Boalia: ["Port V", "Port W", "Port X"],
    Shalbagan: ["Port Y", "Port Z", "Port AA"],
    Sonadanga: ["Port AB", "Port AC", "Port AD"],
    Khalishpur: ["Port AE", "Port AF", "Port AG"],
    Daulatpur: ["Port AH", "Port AI", "Port AJ"],
  };

  return (
    <div className="w-full sm:w-2/3 md:w-2/3 lg:w-2/4 p-6 ">
      {loading && <Loader loading={true} />}
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 ">
        Create new account<span className="text-blue-500">.</span>
      </h1>
      <p className="text-gray-400 text-sm mb-6">
        Already A Member?{" "}
        <span className="text-blue-500 cursor-pointer" onClick={handleClickForLogin}>
          Login
        </span>
      </p>

      <form onSubmit={handleClickForRegistration}>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row space-x-2 space-y-4 sm:space-y-0">
            <input
              name="firstName"
              type="text"
              placeholder="First name"
              required
              value={formData.firstName}
              onChange={handleChange}
              className="w-full sm:w-1/2 p-3 bg-gray-700 text-white rounded-lg focus:outline-none"
            />
            <input
              name="lastName"
              type="text"
              placeholder="Last name"
              required
              value={formData.lastName}
              onChange={handleChange}
              className="w-full sm:w-1/2 p-3 bg-gray-700 text-white rounded-lg focus:outline-none"
            />
          </div>

          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none"
          />
          <input
            name="phone"
            type="tel"
            placeholder="Phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            minLength={6}
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none"
          />

          <div className="w-full">
            <select
              name="division"
              id="division"
              value={formData.division}
              onChange={handleDivisionChange}
              required
              className={`w-full p-3 bg-gray-700 rounded-lg focus:outline-none 
              ${!formData.division ? "text-gray-400" : "text-white"}`}
            >
              <option value="" disabled className="text-gray-400">
                Select Division
              </option>
              {divisions.map((div, index) => (
                <option key={index} value={div} className="text-white">
                  {div}
                </option>
              ))}
            </select>
          </div>

          <div className="flex space-x-4">
            <div className="w-full sm:w-1/2">
              <select
                name="area"
                id="area"
                required
                value={formData.area}
                onChange={handleAreaChange}
                className={`w-full p-3 bg-gray-700 rounded-lg focus:outline-none 
              ${!formData.area ? "text-gray-400" : "text-white"}`}
              >
                <option value="" disabled className="text-gray-400">
                  Select Area
                </option>
                {formData.division &&
                  areas[formData.division]?.map((area, index) => (
                    <option key={index} value={area} className="text-white">
                      {area}
                    </option>
                  ))}
              </select>
            </div>

            <div className="w-full sm:w-1/2">
              <select
                name="port"
                id="port"
                required
                value={formData.port}
                onChange={handleChange}
                className={`w-full p-3 bg-gray-700 rounded-lg focus:outline-none 
                ${!formData.port ? "text-gray-400" : "text-white"}`}
              >
                <option value="" className="text-gray-400">
                  Select Port
                </option>
                {formData.area &&
                  ports[formData.area]?.map((port, index) => (
                    <option key={index} value={port} className="text-white">
                      {port}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-1/2 sm:w-1/3 p-4 rounded-lg bg-blue-500 hover:bg-blue-600 text-white"
          >
            Create account
          </button>
        </div>
      </form>
    </div>
  );
};

export default Registration;
