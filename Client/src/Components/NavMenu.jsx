import { useState, useEffect, useRef } from "react";
import { Link } from "react-scroll";
import Logo from "../assets/Image/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark, faHome, faInfoCircle, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Profile from "./Profile.jsx";
import Notification from "./Notification.jsx";

const NavMenu = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const sidebarRef = useRef(null);
  const toggleButtonRef = useRef(null);
  const profileRef = useRef(null);
  const [notifications, setNotifications] = useState([
    "You have a new message!",
    "Your request has been approved.",
    "Reminder: Meeting at 3 PM."
]);

  // Close sidebar and profile when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !toggleButtonRef.current.contains(event.target)
      ) {
        setIsSidebarOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white/30 backdrop-blur-lg border-b rounded-lg shadow-md p-2 fixed top-0 w-full z-50 flex justify-between items-center pl-6 pr-6 md:pl-20 md:pr-20">
      {/* Logo Section */}
      <div className="flex items-center space-x-4">
        <img src={Logo} alt="Logo" className="w-10 h-10 object-contain" />
        <span className="text-xl font-semibold text-gray-800">ELECTRIFIERS</span>
      </div>

      {/* Right Section */}
      <div className="flex items-center justify-center md:space-x-10">
        {/* Notification Button */}
         <div className="relative">
            <Notification notifications={notifications} />
        </div>

        {/* Mobile Sidebar Toggle */}
        <button
          ref={toggleButtonRef}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="md:hidden p-2 rounded-full text-xl text-black z-50"
        >
          <FontAwesomeIcon icon={isSidebarOpen ? faXmark : faBars} />
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-10">
          <Link to="home" smooth={true} offset={-70} duration={500} className="text-gray-800 text-lg hover:text-blue-600">
            Home
          </Link>
          <Link to="about" smooth={true} offset={-70} duration={500} className="text-gray-800 text-lg hover:text-blue-600">
            About
          </Link>
          <Link to="contact" smooth={true} offset={-70} duration={500} className="text-gray-800 text-lg hover:text-blue-600">
            Contact
          </Link>
          {/* Profile Button */}
          <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="text-gray-800 text-lg rounded-full hover:text-blue-600 flex items-center relative">
            <img src={Logo} alt="Profile" className="w-9 h-9 object-contain" />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div ref={sidebarRef} className="md:hidden flex flex-col absolute top-16 right-0 h-auto w-72 z-50 bg-gray-200 backdrop-blur-lg shadow-lg py-6 px-8 rounded-lg space-y-4">
          <Link to="home" smooth={true} offset={-70} duration={500} className="flex items-center p-2 rounded-lg hover:bg-gray-300 text-gray-800 text-lg font-semibold transition duration-300">
            <FontAwesomeIcon icon={faHome} className="mr-3 text-lg" /> Home
          </Link>
          <Link to="about" smooth={true} offset={-70} duration={500} className="flex items-center p-2 rounded-lg hover:bg-gray-300 text-gray-800 text-lg font-semibold transition duration-300">
            <FontAwesomeIcon icon={faInfoCircle} className="mr-3 text-lg" /> About
          </Link>
          <Link to="contact" smooth={true} offset={-70} duration={500} className="flex items-center p-2 rounded-lg hover:bg-gray-300 text-gray-800 text-lg font-semibold transition duration-300">
            <FontAwesomeIcon icon={faEnvelope} className="mr-3 text-lg" /> Contact
          </Link>
          {/* Profile Button Inside Sidebar */}
          <button onClick={() => { setIsProfileOpen(!isProfileOpen); setIsSidebarOpen(false); }} className="flex items-center bg-gray-300 p-2 rounded-full hover:bg-gray-400 transition duration-300">
            <img src={Logo} alt="Profile" className="w-9 h-9 object-contain" />
            <p className="pl-3 text-gray-800 text-lg font-semibold">Tarikul Islam</p>
          </button>
        </div>
      )}

      {/* Profile Dropdown */}
      {isProfileOpen && (
        <div className="absolute top-16 right-2 h-auto w-72 z-50 bg-gray-200 backdrop-blur-lg shadow-xl rounded-3xl z-50">
          <Profile
            isOpen={isProfileOpen}
            onClose={() => setIsProfileOpen(false)}
            profileRef={profileRef}
          />
        </div>
      )}

    </header>
  );
};

export default NavMenu;
