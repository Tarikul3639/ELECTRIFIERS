import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Registration = () => {
  const navigate = useNavigate();
  const [division, setDivision] = useState("");
  const [area, setArea] = useState("");
  const [port, setPort] = useState("");

  const handleClickForLogin = () => {
    navigate("/login");
  };

  // Example data, replace with actual values
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

  const handleDivisionChange = (e) => {
    setDivision(e.target.value);
    setArea(""); // Reset area when division changes
    setPort(""); // Reset port when division changes
  };

  const handleAreaChange = (e) => {
    setArea(e.target.value);
    setPort(""); // Reset port when area changes
  };

  return (
    <div className="w-full sm:w-2/3 md:w-2/3 lg:w-2/4 p-6 ">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 ">
        Create new account<span className="text-blue-500">.</span>
      </h1>
      <p className="text-gray-400 text-sm mb-6">
        Already A Member?{" "}
        <span
          className="text-blue-500 cursor-pointer"
          onClick={handleClickForLogin}
        >
          Login
        </span>
      </p>
      <form>
        <div className="space-y-4">
          {/* First and Last Name Inputs */}
          <div className="flex flex-col sm:flex-row space-x-2 space-y-4 sm:space-y-0">
            <input
              type="text"
              placeholder="First name"
              className="w-full sm:w-1/2 p-3 text-sm lg:text-md  bg-gray-700 text-white rounded-lg focus:outline-none"
            />
            <input
              type="text"
              placeholder="Last name"
              className="w-full sm:w-1/2 p-3 text-sm lg:text-md bg-gray-700 text-white rounded-lg focus:outline-none"
            />
          </div>

          {/* Email and Password Inputs */}
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 text-sm lg:text-md bg-gray-700 text-white rounded-lg focus:outline-none"
          />
          <input
            type="tel"
            placeholder="Phone"
            className="w-full p-3 text-sm lg:text-md bg-gray-700 text-white rounded-lg focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 text-sm lg:text-md bg-gray-700 text-white rounded-lg focus:outline-none"
          />

          {/* Address Section */}

          <div className="w-full">
            <select
              id="division"
              value={division}
              onChange={handleDivisionChange}
              className={`w-full p-3 text-sm lg:text-md bg-gray-700 rounded-lg focus:outline-none 
              ${!division ? "text-gray-400" : "text-white"}`}
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
                id="area"
                value={area}
                onChange={handleAreaChange}
                className={`w-full p-3 text-sm lg:text-md bg-gray-700 rounded-lg focus:outline-none 
              ${!area ? "text-gray-400" : "text-white"}`}
              >
                <option value="" disabled className="text-gray-400">
                  Select Area
                </option>
                {division &&
                  areas[division]?.map((area, index) => (
                    <option key={index} value={area} className="text-white">
                      {area}
                    </option>
                  ))}
              </select>
            </div>
            {/* Port Select */}
            <div className="w-full sm:w-1/2">
              <select
                id="port"
                value={port}
                onChange={(e) => setPort(e.target.value)}
                className={`w-full p-3 text-sm lg:text-md bg-gray-700 rounded-lg focus:outline-none 
                  ${!port ? "text-gray-400" : "text-white"}`}
              >
                <option value="" className={"text-gray-400"}>
                  Select Port
                </option>
                {division &&
                  area &&
                  ports[area]?.map((port, index) => (
                    <option key={index} value={port} className="text-white">
                      {port}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-1/2 sm:w-1/3 p-4 rounded-lg hover:bg-blue-600 cursor-pointer bg-blue-500 text-white text-sm lg:text-md font-sans "
          >
            Create account
          </button>
        </div>
      </form>
    </div>
  );
};

export default Registration;
