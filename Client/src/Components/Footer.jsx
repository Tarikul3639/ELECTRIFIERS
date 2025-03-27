import { Link } from "react-scroll";
import Logo from "../assets/Image/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare, faTwitterSquare, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-[#DADCE2] p-8 text-gray-800">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">

        {/* Business Logo and Name */}
        <div className="flex items-center space-x-4">
          <img src={Logo} alt="Business Logo" className="w-10 h-10 object-contain" />
          <span className="text-xl font-semibold text-gray-800">ELECTRIFIERS</span>
        </div>

        {/* Links */}
        <div className="flex space-x-6">
          <Link activeClass="active" to="home" smooth={true} offset={-70} duration={500} className="text-gray-800 hover:text-blue-600 transition duration-300">Home</Link>
          <Link to="about" smooth={true} offset={-70} duration={500} className="text-gray-800 hover:text-blue-600 transition duration-300">About</Link>
          <Link to="/services" className="text-gray-800 hover:text-blue-600 transition duration-300">Services</Link>
          <Link to="contact" smooth={true} offset={-70} duration={500} className="text-gray-800 hover:text-blue-600 transition duration-300">Contact</Link>
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-6">
          <FontAwesomeIcon
            icon={faFacebookSquare}
            className="text-2xl text-gray-800 hover:text-blue-500 hover:cursor-pointer"
          />
          <FontAwesomeIcon
            icon={faTwitterSquare}
            className="text-2xl text-gray-800 hover:text-blue-500 hover:cursor-pointer"
          />
          <FontAwesomeIcon
            icon={faLinkedin}
            className="text-2xl text-gray-800 hover:text-blue-500 hover:cursor-pointer"
          />
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-6 border-t border-gray-400 pt-4 text-center text-sm text-gray-800">
        <p>&copy; 2025 <strong>ELECTRIFIERS</strong>. Helping Bangladesh Stay Informed About Power Outages. Developed by <strong>Tarikul Islam</strong>.</p>
      </div>

    </footer>
  );
};

export default Footer;
