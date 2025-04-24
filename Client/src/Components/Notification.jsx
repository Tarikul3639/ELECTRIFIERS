import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faXmark } from "@fortawesome/free-solid-svg-icons";

// Helper to calculate time ago
const timeAgo = (timestamp) => {
    const now = new Date();
    const then = new Date(timestamp);
    const seconds = Math.floor((now - then) / 1000);

    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
};

const Notification = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const notificationRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        const savedNotifications = JSON.parse(localStorage.getItem("notifications")) || [];
        setNotifications(savedNotifications);
    }, []);

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

    const toggleNotifications = () => {
        const updated = notifications.map(n => ({ ...n, read: true }));
        setNotifications(updated);
        localStorage.setItem("notifications", JSON.stringify(updated));
        setIsOpen(!isOpen);
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <div className="relative pt-2">
            <button
                ref={buttonRef}
                title="Notifications"
                className="p-3 bg-transparent rounded-full text-gray-800 hover:text-blue-600 relative"
                onClick={toggleNotifications}
            >
                <FontAwesomeIcon icon={faBell} className="text-xl" />
                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div
                    ref={notificationRef}
                    className="absolute right-[-4rem] sm:right-0 mt-3 w-80 bg-white shadow-lg rounded-lg p-4 border border-gray-200 z-50"
                >
                    {/* Header with close button */}
                        <div className="flex justify-between items-center border-b pb-2">
                            <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
                            <button onClick={() => setIsOpen(false)}>
                                <FontAwesomeIcon icon={faXmark} className="text-gray-600 hover:text-gray-800 text-xl" />
                            </button>
                        </div>
                        <div className="mt-2 overflow-y-auto max-h-80">
                            {notifications.length > 0 ? (
                                notifications.map((notification, index) => (
                                    <div
                                        key={index}
                                        className={`p-3 mb-2 rounded-md transition duration-300 ease-in-out ${notification.read
                                                ? "bg-gray-100"
                                                : "bg-blue-100 hover:bg-blue-200"
                                            }`}
                                    >
                                        <p className="text-[16px] text-gray-700">{notification.body || notification.message}</p>
                                        <p className="text-[11px] text-gray-500 mt-[2px]">
                                            {timeAgo(notification.timestamp)}
                                        </p>
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

export default Notification;
