import { Link } from "react-scroll";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faInfoCircle, faEnvelope, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { RiCalendarScheduleFill } from "react-icons/ri";
import Profile from "./Profile.jsx";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);
  const navigate = useNavigate();

  const handleUpdate = () => {
    navigate('/Admin');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      {/* Mobile Sidebar Toggle */}
      <button
        ref={buttonRef}
        title="Toggle Menu"
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 rounded-full text-xl text-black z-50 cursor-pointer"
      >
        <FontAwesomeIcon icon={isOpen ? faXmark : faBars} />
      </button>

      {/* Sidebar Content */}
      {isOpen && (
        <div
          ref={sidebarRef}
          className="absolute right-[-1.5rem] md:right-0 mt-4 w-80 bg-white shadow-lg rounded-lg p-4 border border-gray-200 z-50 max-h-[80vh] overflow-y-auto"
        >
          <div className="flex justify-between items-center border-b pb-2">
            <h3 className="text-lg font-semibold text-gray-800">Menu</h3>
            <button title="Close" onClick={() => setIsOpen(false)}>
              <FontAwesomeIcon icon={faXmark} className="text-gray-600 hover:text-gray-800 text-xl cursor-pointer" />
            </button>
          </div>

          <Link title="Home" to="home" smooth={true} offset={-70} duration={500} className="flex items-center p-2 rounded-lg hover:bg-gray-300 text-gray-800 text-lg font-semibold transition duration-300">
            <FontAwesomeIcon icon={faHome} className="mr-3 text-lg" /> Home
          </Link>
          <Link title="About" to="about" smooth={true} offset={-70} duration={500} className="flex items-center p-2 rounded-lg hover:bg-gray-300 text-gray-800 text-lg font-semibold transition duration-300">
            <FontAwesomeIcon icon={faInfoCircle} className="mr-3 text-lg" /> About
          </Link>
          <Link title="Contact" to="contact" smooth={true} offset={-70} duration={500} className="flex items-center p-2 rounded-lg hover:bg-gray-300 text-gray-800 text-lg font-semibold transition duration-300">
            <FontAwesomeIcon icon={faEnvelope} className="mr-3 text-lg" /> Contact
          </Link>
          <button title="Update" onClick={handleUpdate} className="flex w-full items-center p-2 rounded-lg hover:bg-gray-300 text-gray-800 text-lg font-semibold transition duration-300">
            <RiCalendarScheduleFill className="mr-3 text-xl"/> Update
          </button>

          {/* Profile Section */}
          <div title="Click To Logo" className="flex items-center bg-gray-300 p-2 rounded-full hover:bg-gray-400 transition duration-300 w-full mt-3">
            <Profile /> 
            <p className="pl-3 text-gray-800 text-lg font-semibold">Tarikul Islam</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
