import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import {
    faXmark,
    faPencil,
    faArrowRightFromBracket,
    faUserPen,
    faGears
} from "@fortawesome/free-solid-svg-icons";
import Logo from "../assets/Image/logo.png";
import { useNavigate } from 'react-router-dom';
import socket from "./socket/Socket.jsx";
import AvatarEditor from "./ui/AvatarEditor.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Settings from "./Settings.jsx";

const Profile = ({ isOpen, setIsOpen }) => {
    const [showAvatarEditor, setShowAvatarEditor] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const profileRef = useRef(null);
    const buttonRef = useRef(null);
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: JSON.parse(localStorage.getItem("user"))?.email || "support@loadshedder.com",
        name: JSON.parse(localStorage.getItem("user"))?.name || "Support",
        profileImage: JSON.parse(localStorage.getItem("user"))?.profileImage || Logo,
    });

    const handleAvatarSave = (newAvatarUrl) => {
        setUser(prev => ({
            ...prev,
            profileImage: newAvatarUrl,
        }));
        setShowAvatarEditor(false);

        // Emit socket event to update profile image in DB
        const updatedUser = {
            email: user.email,
            profileImage: newAvatarUrl,
        };
        socket.emit("update-profile-image", updatedUser, (response) => {
            if (response.status === "success") {
                toast.success("Profile image updated successfully!");
                const storedUser = JSON.parse(localStorage.getItem("user"));
                localStorage.setItem("user", JSON.stringify({
                    ...storedUser,
                    profileImage: newAvatarUrl,
                }));
            } else {
                toast.error(response.message);
            }
        });
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            // Close profile if clicked outside profile dropdown and avatar editor
            if (
                profileRef.current &&
                !profileRef.current.contains(event.target) &&
                !buttonRef.current.contains(event.target)
            ) {
                setIsOpen(false);
                setShowAvatarEditor(false);
                setShowSettings(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        // Cleanup on component unmount
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSignOut = () => {
        localStorage.clear();
        navigate('/login');
        socket.disconnect();
    };

    const handleClose = () => {
        setShowAvatarEditor(false);
        setIsOpen(false);
        setShowSettings(false);
        const profileDropdown = document.getElementById("PROFILE");
        if (profileDropdown) {
            profileDropdown.style.display = "none";
        }
    };

    return (
        <div ref={profileRef} className="relative pt-2">
            <button
                ref={buttonRef}
                title="Profile"
                className="bg-transparent rounded-full hover:bg-gray-100"
                onClick={() => setIsOpen(!isOpen)}
            >
                <img src={user.profileImage} alt="Profile" className="w-9 h-9 object-contain cursor-pointer rounded-full" />
            </button>

            {/* Profile Dropdown */}
            {isOpen && (
                <div id="PROFILE" className="fixed top-16 right-0 md:absolute md:top-auto md:right-0 md:mt-3 mt-3 w-80 bg-white shadow-lg rounded-lg p-4 border border-gray-200 z-50">
                    <div className="flex justify-end items-center border-b pb-2">
                        <div onClick={handleClose} title="Close" className="cursor-pointer">
                            <FontAwesomeIcon icon={faXmark} className="text-gray-600 hover:text-gray-800 text-xl" />
                        </div>
                    </div>

                    {!showSettings ? (
                        <>
                            <div className="flex flex-col items-center mt-3">
                                <div className="relative w-24 h-24">
                                    <img src={user.profileImage} alt="User" className="w-full h-full object-cover rounded-full" />
                                    <span
                                        title="Edit"
                                        onClick={() => (setShowAvatarEditor(true), setIsOpen(false))}
                                        className="absolute bottom-0 right-0 h-6 w-6 flex items-center justify-center bg-gray-100 rounded-full cursor-pointer hover:bg-gray-300"
                                    >
                                        <FontAwesomeIcon icon={faPencil} className="text-sm text-gray-800" />
                                    </span>
                                </div>
                                <h2 className="mt-3 text-xl text-[#1E2939] font-bold">{user.name}</h2>
                                <p className="text-gray-700 text-sm">{user.email}</p>
                            </div>
                            <div className="mt-4 space-y-1">
                                <div className="flex items-center p-3 w-full text-gray-700 hover:bg-gray-200 rounded-lg cursor-pointer" onClick={() => (setShowAvatarEditor(!showAvatarEditor), setIsOpen(!isOpen))}>
                                    <FontAwesomeIcon icon={faUserPen} className="text-lg pr-3" />
                                    <span className="text-sm font-semibold">Edit Profile</span>
                                </div>
                                <div className="flex items-center p-3 w-full text-gray-700 hover:bg-gray-200 rounded-lg cursor-pointer" onClick={() => setShowSettings(!showSettings)}>
                                    <FontAwesomeIcon icon={faGears} className="text-lg pr-3" />
                                    <span className="text-sm font-semibold">Settings</span>
                                </div>

                                <div className="flex items-center p-3 w-full text-gray-700 hover:bg-gray-200 rounded-lg cursor-pointer" onClick={handleSignOut}>
                                    <FontAwesomeIcon icon={faArrowRightFromBracket} className="text-lg pr-3" />
                                    <span className="text-sm font-semibold">Sign Out</span>
                                </div>
                            </div>
                        </>): (
                            <Settings/>
                        )}
                </div>
            )}

            {/* Avatar Editor Modal */}
            {showAvatarEditor && (
                <AvatarEditor
                    imageSrc={user.profileImage}
                    onClose={() => setShowAvatarEditor(false)}
                    onSave={handleAvatarSave}
                />
            )}
        </div>
    );
};

export default Profile;
