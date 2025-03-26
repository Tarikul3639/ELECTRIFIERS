// import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faXmark,
    faPencil,
    faArrowRightFromBracket,
    faUserPen,
    faGears,
} from "@fortawesome/free-solid-svg-icons";
import ProfileImage from "../assets/Image/logo.png";
import PropTypes from "prop-types";
const Profile = ({ isOpen, onClose, profileRef }) => {
    if (!isOpen) return null;

    return (
        <div ref={profileRef} className="relative p-2 pt-6">
            <button
                className="absolute flex items-center justify-center top-0 right-1 h-5 w-5 p-5 text-gray-600 rounded-full hover:bg-gray-100"
                onClick={onClose}
            >
                <FontAwesomeIcon icon={faXmark} className="text-2xl" />
            </button>
            <div className="flex flex-col items-center">
                <div className="relative flex items-center justify-center w-24 h-24 rounded-full">
                    <img
                        src={ProfileImage}
                        alt="User"
                        className="object-cover rounded-full"
                    />
                    <span className="absolute flex items-center justify-center bottom-0 right-0 h-6 w-6 rounded-full bg-gray-100 p-2 cursor-pointer hover:bg-gray-300">
                        <FontAwesomeIcon
                            icon={faPencil}
                            className="text-sm text-gray-800 hover:text-blue-500"
                        />
                    </span>
                </div>
                <h2 className="mt-4 text-xl font-semibold text-gray-800">
                    Tarikul Islam
                </h2>
                <p className="text-gray-600 text-sm">tarikul@example.com</p>
                <div className="m-4 flex flex-col w-full space-y-1 rounded-3xl">
                    <button className="p-4 pl-6 flex items-center bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-tl-3xl rounded-tr-3xl hover:bg-gray-300 transition">
                        <FontAwesomeIcon icon={faUserPen} className="text-lg pr-4" />
                        <span className="text-sm font-semibold">Edit profile</span>
                    </button>
                    <button className="p-4 pl-6 flex items-center bg-gray-100 hover:bg-gray-300 text-gray-700 transition">
                        <FontAwesomeIcon icon={faGears} className="text-lg pr-4" />
                        <span className="text-sm font-semibold">Setting</span>
                    </button>
                    <button className="p-4 pl-6 flex items-center bg-gray-100 hover:bg-gray-300 text-gray-700 rounded-bl-3xl rounded-br-3xl transition">
                        <FontAwesomeIcon
                            icon={faArrowRightFromBracket}
                            className="text-lg pr-4"
                        />
                        <span className="text-sm font-semibold">Sign out</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
Profile.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    profileRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    ]),
};

export default Profile;
