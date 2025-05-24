import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Switch from './ui/Switch.jsx';
import Dialog from './ui/Dialog.jsx';
import socket from './socket/Socket.jsx';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Settings = () => {
  const ITEM_CLASS = 'flex justify-between items-center p-3 py-4 w-full text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-background-light/5 dark:hover:bg-background-light/10 hover:bg-gray-200 rounded cursor-pointer transition duration-300 ease-in-out';

  const [switchOn, setSwitchOn] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user")) || " ";
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  // Settings.jsx
  useEffect(() => {
    const saved = localStorage.getItem("notificationsEnabled");
    if (saved === "true" && Notification.permission === "granted") {
      setSwitchOn(true);
    }
  }, []);

  const handleToggle = async () => {
    if (!switchOn) {
      if (Notification.permission === "default") {
        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
          alert("You need to allow notifications to enable this feature.");
          return;
        }
      } else if (Notification.permission === "denied") {
        alert("You have blocked notifications. Please enable from browser settings.");
        return;
      }
    }

    const newValue = !switchOn;
    setSwitchOn(newValue);
    localStorage.setItem("notificationsEnabled", newValue.toString());

    // Notify other components
    window.dispatchEvent(new Event("notificationsToggled"));
  };


  const handleDelete = () => {
    console.log("✅ Account Deleted!");
    setIsDialogOpen(false);
    // Emit socket event to delete account
    socket.emit("delete-account", { user }, (response) => {
      if (response.status === "success") {
        toast.success("Account deleted successfully!");
        localStorage.clear();
        socket.disconnect();
        window.location.href = "/login"; // Redirect to login page
      } else {
        toast.error(response.message);
      }
    });

  };  // Handle dark/light mode
  useEffect(() => {
    const root = document.documentElement;
    
    if (theme === "light") {
      root.classList.remove("dark");
      root.style.backgroundColor = "var(--color-background-light)";
    } else {
      root.classList.add("dark");
      root.style.backgroundColor = "var(--color-background-dark)";
    }
    
    // Save theme preference to localStorage whenever it changes
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <>
      <div className="settings space-y-2">
        {/* Theme Toggle */}
        <div onClick={toggleTheme} className={`mt-2`}>
          <div className={`${ITEM_CLASS} mt-2`}>
            {theme === "dark" ? (
              <div className="flex items-center">
                <i className="bi bi-brightness-high text-lg pr-3"></i>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Light</span>
              </div>
            ) : (
              <div className="flex items-center">
                <i className="bi bi-moon text-lg pr-3"></i>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Dark</span>
              </div>
            )}
          </div>
        </div>
        <div className={`${ITEM_CLASS}`}>
          <div className="flex items-center">
            <FontAwesomeIcon icon={faVolumeHigh} className="text-sm pr-3" />
            <span className="text-sm font-semibold">Notifications</span>
          </div>
          <Switch isOn={switchOn} handleToggle={handleToggle} />
        </div>
        <div className={`${ITEM_CLASS} text-red-800 dark:text-red-800`} onClick={() => setIsDialogOpen(true)}>
          <div className="flex items-center">
            <FontAwesomeIcon icon={faTrashCan} className="text-sm pr-3" />
            <span className="text-sm font-semibold">Account Delete</span>
          </div>
        </div>
      </div>
      {/* Dialog Component */}
      <Dialog
        isOpen={isDialogOpen}
        title="Are you sure for delete your account?"
        message="Warning! Deleting your account is permanent and cannot be undone. You will lose all your data and there is no recovery option."
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default Settings;
