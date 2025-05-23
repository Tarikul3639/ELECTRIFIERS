import { Link } from "react-scroll";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faInfoCircle, faEnvelope, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { RiCalendarScheduleFill } from "react-icons/ri";
import Profile from "../Profile.jsx";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);  // State for profile modal visibility
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);
  const navigate = useNavigate();
  const name = JSON.parse(localStorage.getItem("user"))?.name || "Support";

  const handleUpdate = () => {
    navigate('/Admin');
  };

  const handleProfileOpen = () => {
    setIsProfileOpen(true);  
    // setIsOpen(false);  
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.role === "admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }

    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setIsProfileOpen(false); 
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
        className="md:hidden p-2 rounded-full text-xl text-black dark:text-primary-text-light z-50 cursor-pointer"
      >
        <FontAwesomeIcon icon={isOpen ? faXmark : faBars} />
      </button>

      {/* Sidebar Content */}
      {isOpen && (
        <div
          ref={sidebarRef}
          className="absolute right-[-1.5rem] md:right-0 mt-4 w-80 bg-white dark:bg-background-dark shadow-lg rounded-lg p-4 border border-gray-200 dark:border-gray-700 z-50 max-h-[80vh] overflow-y-auto"
        >
          <div className="flex justify-between items-center border-b dark:border-gray-700 pb-2">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-primary-text-light">Menu</h3>
            <button title="Close" onClick={() => setIsOpen(false)}>
              <FontAwesomeIcon icon={faXmark} className="text-gray-600 dark:text-primary-text-light hover:text-gray-800 dark:hover:text-primary-text-light/60 text-xl cursor-pointer" />
            </button>
          </div>

          <Link
            title="Home"
            to="home"
            smooth={true}
            offset={-70}
            duration={500}
            className="flex items-center p-2 rounded-lg hover:bg-gray-300 dark:hover:bg-background-light/10 text-gray-800 dark:text-primary-text-light text-lg font-semibold transition duration-300 mt-3"
          >
            <FontAwesomeIcon icon={faHome} className="mr-3 text-lg" /> Home
          </Link>
          <Link
            title="About"
            to="about"
            smooth={true}
            offset={-70}
            duration={500}
            className="flex items-center p-2 rounded-lg hover:bg-gray-300 dark:hover:bg-background-light/10 text-gray-800 dark:text-primary-text-light text-lg font-semibold transition duration-300"
          >
            <FontAwesomeIcon icon={faInfoCircle} className="mr-3 text-lg" /> About
          </Link>
          <Link
            title="Contact"
            to="contact"
            smooth={true}
            offset={-70}
            duration={500}
            className="flex items-center p-2 rounded-lg hover:bg-gray-300 dark:hover:bg-background-light/10 text-gray-800 dark:text-primary-text-light text-lg font-semibold transition duration-300"
          >
            <FontAwesomeIcon icon={faEnvelope} className="mr-3 text-lg" /> Contact
          </Link>
          {isAdmin && (
            <button
              title="Update"
              onClick={handleUpdate}
              className="flex w-full items-center p-2 rounded-lg hover:bg-gray-300 dark:hover:bg-background-light/10 text-gray-800 dark:text-primary-text-light text-lg font-semibold transition duration-300"
            >
              <RiCalendarScheduleFill className="mr-3 text-xl" /> Update
            </button>
          )}

          {/* Profile Section */}
          <div
            title="Click To Logo"
            className="flex items-center justify-center bg-gray-300 dark:bg-background-light/80 rounded-full mt-3 hover:bg-gray-400 transition duration-300 px-4.5 py-1.5 cursor-pointer"
            onClick={handleProfileOpen}  
          >
            <Profile isOpen={isProfileOpen} setIsOpen={setIsProfileOpen} />
            <p className="pl-3 text-gray-800 text-lg font-semibold">{name}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;


// dark:bg-background-light
// dark:bg-background-dark
// dark:bg-background-light/5
// dark:bg-background-dark/5
// dark:hover:bg-background-light/10
// dark:hover:bg-background-dark/10
// dark:text-primary-text-light
// dark:text-primary-text-light/5
// dark:text-primary-text-light/10
// dark:text-primary-text-light/20
// dark:hover:text-primary-text-light/10
// dark:hover:text-primary-text-light/20