import { useNavigate } from "react-router-dom";
import {useState, useEffect } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../Components/ui/Loader.jsx';

const Registration = () => {
  const navigate = useNavigate();
  const [locationData, setLocationData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    division: "",
    district: "",
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
      district: "",
    }));
  };

  const handleDistrictChange = (e) => {
    const district = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      district,
    }));
  };

  const handleClickForRegistration = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { firstName, lastName, email, password, phone, division, district } = formData;

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/registration`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, password, phone, division, district}),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        setLoading(false);
        handleClickForLogin();
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

  useEffect(() => {
    const abortController = new AbortController(); // Create AbortController
    let mounted = true;
  
    const fetchLocationData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/location`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          signal: abortController.signal, // Pass signal to fetch
        });
  
        const data = await response.json();
        if (response.ok && mounted) {
          setLocationData(data);
        }
      } catch (error) {
        if (error.name !== "AbortError") { // Avoid logging cancellation errors
          console.error("Error fetching location data:", error);
        }
      }
    };
  
    fetchLocationData();
    return () => {
      mounted = false;
      abortController.abort(); // Cancel the fetch request
    };
  }, []);

  const handleClickForLogin = () => {
    navigate("/login");
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
          <div className="flex flex-col sm:flex-row space-x-4 space-y-4 sm:space-y-0">
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

          <div className="flex flex-col sm:flex-row space-x-4 space-y-4 sm:space-y-0">
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
              {Object.keys(locationData).map((div, index) => (
                <option key={index} value={div} className="text-white">
                  {div}
                </option>
              ))}
            </select>

            <select
              name="district"
              id="district"
              required
              value={formData.district}
              onChange={handleDistrictChange}
              className={`w-full p-3 bg-gray-700 rounded-lg focus:outline-none 
              ${!formData.district ? "text-gray-400" : "text-white"}`}
            >
              <option value="" disabled className="text-gray-400">
                Select district
              </option>
              {formData.division &&
                locationData[formData.division]?.map((district, index) => (
                  <option key={index} value={district} className="text-white">
                    {district}
                  </option>
                ))}

            </select>
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
