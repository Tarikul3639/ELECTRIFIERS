import { useNavigate } from "react-router-dom";
const ForgotPassword = () => {
  const navigate = useNavigate();

  const handleClickForRegistration = () => {
    navigate("/registration");
  };

  return (
    <div className="w-full sm:w-2/3 md:w-2/3 lg:w-2/4 p-6 ">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 ">
        Create new account<span className="text-blue-500">.</span>
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
      <form>
        <div className="space-y-4">
          {/* First and Last Name Inputs */}
          <div className="flex flex-col sm:flex-row space-x-2 space-y-4 sm:space-y-0">
            <input
              type="text"
              placeholder="First name"
              className="w-full sm:w-1/2 p-2 sm:p-3  bg-gray-700 text-white rounded-lg focus:outline-none"
            />
            <input
              type="text"
              placeholder="Last name"
              className="w-full sm:w-1/2 p-2 sm:p-3 bg-gray-700 text-white rounded-lg focus:outline-none"
            />
          </div>

          {/* Email and Password Inputs */}
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 sm:p-3 bg-gray-700 text-white rounded-lg focus:outline-none"
          />
          <input
            type="tel"
            placeholder="Phone"
            className="w-full p-2 sm:p-3 bg-gray-700 text-white rounded-lg focus:outline-none"
          />
          {/* Submit Button */}
          <button
            type="submit"
            className="w-1/2 sm:w-1/3 py-3 px-3 rounded-lg hover:bg-blue-600 cursor-pointer bg-blue-500 text-white text-xs sm:text-base font-sans font-semibold"
          >
            Login account
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
