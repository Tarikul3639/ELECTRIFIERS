import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faXmark } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const Notification = ({ notifications }) => {
    const [isOpen, setIsOpen] = useState(false);
    const notificationRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                notificationRef.current &&
                !notificationRef.current.contains(event.target) &&
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
        <div className="relative pt-2">
            {/* Notification Button */}
            <button
                ref={buttonRef}
                className="p-3 bg-transparent rounded-full text-gray-800 hover:text-blue-600 relative"
                onClick={() => setIsOpen(!isOpen)}
            >
                <FontAwesomeIcon icon={faBell} className="text-xl" />
                {notifications.length > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {notifications.length}
                    </span>
                )}
            </button>

            {/* Notification Dropdown */}
            {isOpen && (
                <div
                    ref={notificationRef}
                    className="absolute right-[-4rem] sm:right-0 mt-3 w-80 bg-white shadow-lg rounded-lg p-4 border border-gray-200 z-50 max-h-[80vh] overflow-y-auto"
                >
                    <div className="flex justify-between items-center border-b pb-2">
                        <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
                        <button onClick={() => setIsOpen(false)}>
                            <FontAwesomeIcon icon={faXmark} className="text-gray-600 hover:text-gray-800 text-xl" />
                        </button>
                    </div>
                    <div className="mt-2">
                        {notifications.length > 0 ? (
                            notifications.map((notification, index) => (
                                <div
                                    key={index}
                                    className="p-3 mb-2 rounded-md hover:bg-gray-100 transition duration-300 ease-in-out"
                                >
                                    <p className="text-sm text-gray-700">{notification}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500 text-center p-4">No new notifications</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

Notification.propTypes = {
    notifications: PropTypes.array.isRequired,
};

export default Notification;
