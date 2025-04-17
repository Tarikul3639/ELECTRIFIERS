import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import {
    faXmark,
    faPencil,
    faArrowRightFromBracket,
    faUserPen,
    faGears,
} from "@fortawesome/free-solid-svg-icons";
import ProfileImage from "../assets/Image/logo.png";
import Logo from "../assets/Image/logo.png";
import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [isOpen, setIsOpen] = useState(false);
    const profileRef = useRef(null);
    const buttonRef = useRef(null);
    const navigate = useNavigate(); 

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                profileRef.current &&
                !profileRef.current.contains(event.target) &&
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

    const handleSignOut = () => {
        localStorage.clear(); // ✅ Clear everything from localStorage
        navigate('/login');    // ✅ Navigate to home page
      };

    return (
        <div ref={profileRef} className="relative pt-2 cursor-pointer">
            {/* Profile Button */}
            <button
                ref={buttonRef}
                title="Profile"
                className="bg-transparent rounded-full hover:bg-gray-100"
                onClick={() => setIsOpen(!isOpen)}
            >
                <img src={Logo} alt="Profile" className="w-9 h-9 object-contain cursor-pointer" />
            </button>

            {/* Profile Dropdown */}
            {isOpen && (
                <div className="fixed top-16 right-0 md:absolute md:top-auto md:right-0 md:mt-3 mt-3 w-80 bg-white shadow-lg rounded-lg p-4 border border-gray-200 z-50">
                    <div className="flex justify-between items-center border-b pb-2">
                        <h3 className="text-lg font-semibold">Profile</h3>
                        {/* Replaced button with div for closing the dropdown */}
                        <div
                            onClick={() => setIsOpen(false)}
                            title="Close"
                            className="cursor-pointer"
                        >
                            <FontAwesomeIcon icon={faXmark} className="text-gray-600 hover:text-gray-800 text-xl" />
                        </div>
                    </div>
                    <div className="flex flex-col items-center mt-3">
                        <div className="relative w-24 h-24">
                            <img
                                src={ProfileImage}
                                alt="User"
                                className="w-full object-cover rounded-full"
                            />
                            <span title="Edit" className="absolute bottom-0 right-0 h-6 w-6 flex items-center justify-center bg-gray-100 rounded-full cursor-pointer hover:bg-gray-300">
                                <FontAwesomeIcon icon={faPencil} className="text-sm text-gray-800" />
                            </span>
                        </div>
                        <h2 className="mt-3 text-xl text-[#1E2939] font-bold">Tarikul Islam</h2>
                        <p className="text-gray-700 text-sm">tarikul@example.com</p>
                    </div>
                    <div className="mt-4 space-y-1">
                        <div className="flex items-center p-3 w-full text-gray-700 hover:bg-gray-200 rounded-lg cursor-pointer">
                            <FontAwesomeIcon icon={faUserPen} className="text-lg pr-3" />
                            <span className="text-sm font-semibold">Edit Profile</span>
                        </div>
                        <div className="flex items-center p-3 w-full text-gray-700 hover:bg-gray-200 rounded-lg cursor-pointer">
                            <FontAwesomeIcon icon={faGears} className="text-lg pr-3" />
                            <span className="text-sm font-semibold">Settings</span>
                        </div>
                        <div className="flex items-center p-3 w-full text-gray-700 hover:bg-gray-200 rounded-lg cursor-pointer" onClick={handleSignOut}>
                            <FontAwesomeIcon icon={faArrowRightFromBracket} className="text-lg pr-3" />
                            <span className="text-sm font-semibold">Sign Out</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

Profile.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    profileRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.instanceOf(Element) })]),
};

export default Profile;
