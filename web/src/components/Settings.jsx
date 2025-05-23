import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Switch from './ui/Switch.jsx';
import Dialog from './ui/Dialog.jsx';
import socket from './socket/Socket.jsx';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Settings = () => {
  const [switchOn, setSwitchOn] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || " ";

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

  };

  return (
    <>
      <div className="settings space-y-2">
        <div className="flex justify-between items-center p-3 w-full text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg cursor-pointer transition duration-300 ease-in-out">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faVolumeHigh} className="text-lg pr-3" />
            <span className="text-sm font-semibold">Notifications</span>
          </div>
          <Switch isOn={switchOn} handleToggle={handleToggle} />
        </div>
        <div className="flex justify-between items-center p-3 w-full text-red-600 bg-gray-200 hover:bg-gray-300 rounded-lg cursor-pointer transition duration-300 ease-in-out" onClick={() => setIsDialogOpen(true)}>
          <div className="flex items-center">
            <FontAwesomeIcon icon={faTrashCan} className="text-lg pr-3" />
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
