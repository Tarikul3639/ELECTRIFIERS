import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/Image/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark, faHome, faInfoCircle, faEnvelope } from "@fortawesome/free-solid-svg-icons";

const NavMenu = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <header className="bg-white/30 backdrop-blur-lg border-b rounded-lg shadow-md p-2 fixed top-0 w-full z-50 flex justify-between items-center pl-6 pr-6 sm:pl-20 sm:pr-20">

      {/* Logo and Navigation Links */}
      <div className="flex items-center space-x-4">
        <img src={Logo} alt="Logo" className="w-10 h-10 object-contain" />
        <span className="text-xl font-semibold text-gray-800">ELECTRIFIERS</span>
      </div>

      <div className="hidden sm:flex space-x-10">
        <Link to="/" className="text-gray-800 text-lg hover:text-blue-600">Home</Link>
        <Link to="/about" className="text-gray-800 text-lg hover:text-blue-600">About</Link>
        <Link to="/contact" className="text-gray-800 text-lg hover:text-blue-600">Contact</Link>
        <Link to="/" className="text-gray-800 text-lg rounded-full hover:text-blue-600 flex items-center relative">
          <img src={Logo} alt="Profile" className="w-9 h-9 object-contain" />
        </Link>
      </div>

      <div
        className={`sm:hidden sm:flex space-y-4 ${isSidebarOpen ? "flex flex-col absolute top-16 right-0 h-auto w-72 z-50 bg-white/80 backdrop-blur-lg shadow-md py-6 px-8 rounded-l-lg" : "hidden"}`}>
        <Link to="/" className="text-gray-800 text-lg font-semibold transition duration-300 transform flex items-center p-2 rounded-lg hover:bg-gray-300"><FontAwesomeIcon icon={faHome} className="mr-3 text-lg" /> Home</Link>
        <Link to="/about" className="text-gray-800 text-lg font-semibold transition duration-300 transform flex items-center p-2 rounded-lg hover:bg-gray-300"> <FontAwesomeIcon icon={faInfoCircle} className="mr-3 text-lg" />About</Link>
        <Link to="/contact" className="text-gray-800 text-lg font-semibold transition duration-300 transform flex items-center p-2 rounded-lg hover:bg-gray-300"> <FontAwesomeIcon icon={faEnvelope} className="mr-3 text-lg" />Contact</Link>
        <Link to="/" className="text-gray-800 text-lg rounded-full flex items-center relative flex items-center bg-gray-300 p-2 rounded-full hover:bg-gray-400 transition duration-300">
          <img src={Logo} alt="Profile" className="w-9 h-9 object-contain" />
          <p className="pl-3 text-gray-800 text-lg font-semibold">Tarikul Islam</p>
        </Link>
      </div>

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="sm:hidden p-2 rounded text-xl text-black z-50"
      >
        <FontAwesomeIcon icon={isSidebarOpen ? faXmark : faBars} />
      </button>
    </header>
  );
};

export default NavMenu;
