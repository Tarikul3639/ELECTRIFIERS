import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import Logo from "../../assets/Image/logo.png";
import Profile from "../Profile.jsx";
import Notification from "../Notification.jsx";
import SideBar from "./SideBar.jsx";

const NavMenu = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false); // state for controlling Profile open/close

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.role === "admin") {
      setIsAdmin(true);
    }
  }, []);

  const navigate = useNavigate();

  const handleUpdate = () => {
    navigate('/Admin');
  };

  return (
    <header className="bg-white/30 backdrop-blur-lg border-b rounded-lg shadow-md p-2 fixed top-0 w-full z-50 flex justify-between items-center pl-6 pr-6 md:pl-20 md:pr-20">
      {/* Logo Section */}
      <Link title='Home' to="home" smooth={true} offset={-70} duration={500} className="flex items-center space-x-4">
        <img src={Logo} alt="Logo" className="w-10 h-10 object-contain cursor-pointer" />
        <span className="text-xl font-semibold text-gray-800 cursor-pointer">ELECTRIFIERS</span>
      </Link>

      {/* Right Section */}
      <div className="flex items-center md:space-x-10">
        {/* Notification Button */}
        <div className="relative mr-[3vw]">
          <Notification />
        </div>
        <div className="md:hidden">
          <SideBar />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-10">
          {isAdmin && (
            <button title='Update' onClick={handleUpdate} className="text-gray-800 text-lg hover:text-blue-600">
              Update
            </button>
          )}

          <Link title='Home' to="home" smooth={true} offset={-70} duration={500} className="text-gray-800 text-lg hover:text-blue-600">
            Home
          </Link>
          <Link title='About' to="about" smooth={true} offset={-70} duration={500} className="text-gray-800 text-lg hover:text-blue-600">
            About
          </Link>
          <Link title='Contact' to="contact" smooth={true} offset={-70} duration={500} className="text-gray-800 text-lg hover:text-blue-600">
            Contact
          </Link>
          {/* Profile Component with controlled state */}
          <Profile isOpen={isProfileOpen} setIsOpen={setIsProfileOpen} />
        </div>
      </div>
    </header>
  );
};

export default NavMenu;
