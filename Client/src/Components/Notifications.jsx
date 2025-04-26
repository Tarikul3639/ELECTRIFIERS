import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faXmark } from "@fortawesome/free-solid-svg-icons";
import socket from "./socket/Socket.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Helper function: calculate "time ago"
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

const Notifications = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const notificationRef = useRef(null);
    const buttonRef = useRef(null);

    // Step 2: Handle socket notification
    useEffect(() => {
        const handleSocketNotification = (data) => {
            console.log("📢 Notification received:", data);
            toast.info(`${data.title}\n${data.message}`);

            const newNotification = {
                title: data.title,
                body: data.message,
                read: false,
                timestamp: new Date().toISOString(),
            };

            const existing = JSON.parse(localStorage.getItem("notifications")) || [];
            existing.unshift(newNotification);
            const updated = existing.slice(0, 20);
            localStorage.setItem("notifications", JSON.stringify(updated));

            window.dispatchEvent(new Event("notificationUpdated"));

            // ✅ Check user's setting
            const isEnabled = localStorage.getItem("notificationsEnabled") === "true";

            // ✅ If browser allows + user enabled in settings
            if ("Notification" in window && Notification.permission === "granted" && isEnabled) {
                new Notification(data.title, {
                    body: data.message,
                    icon: "../assets/Image/logo.png",
                });
            }
        };

        socket.on("notify", handleSocketNotification);

        return () => {
            socket.off("notify", handleSocketNotification);
        };
    }, []);

    // Step 3: Load notifications from localStorage on mount & update
    useEffect(() => {
        const loadNotifications = () => {
            const saved = JSON.parse(localStorage.getItem("notifications")) || [];
            setNotifications(saved);
        };

        loadNotifications();

        const handleUpdate = () => {
            loadNotifications();
        };

        window.addEventListener("notificationUpdated", handleUpdate);
        return () => window.removeEventListener("notificationUpdated", handleUpdate);
    }, []);

    // Step 4: Detect outside click
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
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleNotifications = () => {
        const updated = notifications.map(n => ({ ...n, read: true }));
        setNotifications(updated);
        localStorage.setItem("notifications", JSON.stringify(updated));
        setIsOpen(!isOpen);
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    const deleteNotification = (indexToDelete) => {
        const updated = notifications.filter((_, i) => i !== indexToDelete);
        setNotifications(updated);
        localStorage.setItem("notifications", JSON.stringify(updated));
    };


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
                                    className={`flex justify-between items-center p-3 mb-2 rounded-md transition duration-300 ease-in-out ${notification.read
                                        ? "bg-gray-100"
                                        : "bg-blue-100 hover:bg-blue-200"
                                        }`}
                                >
                                    <div className="flex flex-col ml-2">
                                        <p className="text-[16px] text-gray-700">{notification.body || notification.message}</p>
                                        <p className="text-[11px] text-gray-500 mt-[2px]">{timeAgo(notification.timestamp)}</p>
                                    </div>
                                    <button
                                        title="Delete notification"
                                        className="text-gray-500 hover:text-red-600 hover:bg-red-100 w-10 h-10 rounded-full"
                                        onClick={() => deleteNotification(index)}
                                    >
                                        <FontAwesomeIcon icon={faXmark} className="text-lg" />
                                    </button>
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

export default Notifications;
