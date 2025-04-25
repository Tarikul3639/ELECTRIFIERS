import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/ui/Button.jsx";
import DatePicker from "../../components/ui/DatePicker.jsx";
import CustomSelect from "../../components/ui/Select.jsx";
import socket from "../../Components/socket/Socket.jsx";
import { toast } from "react-toastify";
import { format } from "date-fns";
import "react-toastify/dist/ReactToastify.css";
import TimeRangePicker from "../../Components/ui/TimeRangePicker.jsx";
import { useState } from "react";

const AddNewSchedule = ({ setShowEdit, locationData }) => {
  const [loading, setLoading] = React.useState(false);

  // Initial state for the new schedule data
  const [newUser, setNewUser] = React.useState({
    division: "",
    district: "",
    date: null,  // JavaScript Date object
    startTime: "00:00",
    endTime: "00:00",
  });

  // Handle division selection
  const handleDivisionChange = (selected) => {
    setNewUser((prev) => ({
      ...prev,
      division: selected.value,
      district: "", // reset district
    }));
  };

  // Handle district selection
  const handleDistrictChange = (selected) => {
    setNewUser((prev) => ({
      ...prev,
      district: selected.value,
    }));
  };

  // Handle date selection
  const handleNewDateChange = (date) => {
    setNewUser((prev) => ({
      ...prev,
      date,
    }));
  };

  // Handle start time
  const handleStartTimeChange = (e) => {
    setNewUser((prev) => ({
      ...prev,
      startTime: e.target.value,
    }));
  };

  // Handle end time
  const handleEndTimeChange = (e) => {
    setNewUser((prev) => ({
      ...prev,
      endTime: e.target.value,
    }));
  };

  const handleAddNew = () => {
    setLoading(true);
    console.log("New User Data:", newUser);
    // Validation check
    const { date, startTime, endTime, district, division } = newUser;
    if (!date || !startTime || !endTime || !district || !division) {
      setLoading(false);
      return toast.info("Please fill all the fields");
    }

    // Format date to "yyyy-MM-dd"
    const formattedDate = format(date, "yyyy-MM-dd");

    // Construct schedule payload (you can include day here if needed)
    const payload = {
      ...newUser,
      date: formattedDate,
    };

    // Emit event to backend
    socket.emit("add-schedule", payload, (response) => {
      if (response.status === "success") {
        toast.success(response.message || "Schedule added successfully!");
      } else {
        toast.error(response.message || "Failed to add schedule");
      }
      setLoading(false);
    });

    // Reset input and close form
    setNewUser({ division: "", district: "", date: null, startTime: "", endTime: "" });
    setShowEdit(null);
  };


  return (
    <tr id="AddNewSchedule" className="border border-gray-500 bg-white text-gray-700 text-center">
      {/* ID placeholder cell */}
      <td className="px-2.5 py-2 border border-gray-200">
        <div className="border border-gray-900 py-1.5 rounded font-[600]">ID</div>
      </td>

      {/* Division selection */}
      <td className="px-1 py-2 border border-gray-200">
        <CustomSelect
          value={newUser.division ? { value: newUser.division, label: newUser.division } : null}
          options={Object.keys(locationData).map((div) => ({ value: div, label: div }))}
          onChange={handleDivisionChange}
          placeholder="Select Division"
          classNames={{
            menuButton: () => "bg-white text-gray-700 border m-1 text-sm font-semibold min-w-[150px] rounded-sm shadow-none hover:bg-white",
            menu: "z-50 bg-white text-sm shadow-lg rounded-sm mt-1 p-0",
            listItem: ({ isSelected }) =>
              `block transition pl-2 py-2 cursor-pointer truncate ${isSelected
                ? "bg-[#00287e] text-white"
                : "text-gray-700"
              }`,
          }}
        />
      </td>

      {/* District selection */}
      <td className="px-1 py-2 border border-gray-200">
        <CustomSelect
          value={newUser.district ? { value: newUser.district, label: newUser.district } : null}
          options={[...new Set(locationData[newUser.division] || [])].map((district) => ({
            value: district,
            label: district,
          }))}
          onChange={handleDistrictChange}
          placeholder="Select District"
          classNames={{
            menuButton: () => "bg-white text-gray-700 border m-1 text-sm font-semibold min-w-[150px] rounded-sm shadow-none hover:bg-white",
            menu: "z-50 bg-white text-sm shadow-lg rounded-sm mt-1 p-0",
            listItem: ({ isSelected }) =>
              `block transition pl-2 py-2 cursor-pointer truncate ${isSelected
                ? "bg-[#00287e] text-white"
                : "text-gray-700"
              }`,
          }}
        />
      </td>

      {/* Day display (auto-filled) */}
      <td className="px-1 py-0 border border-gray-200">
        <input
          type="text"
          name="day"
          value={newUser.date ? format(newUser.date, "EEEE") : ""}
          readOnly
          placeholder="Day"
          className="border border-gray-900 px-1 py-2 rounded text-center placeholder:text-center focus:outline-none placeholder:text-gray-700 placeholder:font-semibold text-sm font-semibold m-1"
        />
      </td>

      {/* Date picker */}
      <td className="px-1 py-0 border border-gray-200">
        <DatePicker
          selected={newUser.date ? new Date(newUser.date) : null}
          onChange={handleNewDateChange}
          placeholderText="Select a New Date"
          dateFormat="yyyy-MM-dd"
          classNames={{
            Button: () => "flex justify-center items-center bg-white text-gray-700 border border-gray-900 text-sm font-medium px-0 min-w-[150px] max-w-[200px] py-[5px] rounded-sm hover:bg-gray-100 m-1",
            Input: () => "border-0 px-0 py-1 text-gray-700 text-center placeholder:text-gray-700",
            Icon: () => "mr-1",
          }}
        />
      </td>

      {/* Schedule time selection */}
      <td className="px-1 py-0 border border-gray-200">
        <TimeRangePicker
          startTime={newUser.startTime}
          endTime={newUser.endTime}
          onStartTimeChange={handleStartTimeChange}
          onEndTimeChange={handleEndTimeChange}
        />
      </td>

      <td className="px-2.5 py-2 border border-gray-200">
        <div className="border border-gray-900 py-1.5 rounded font-[600] min-w-[150px]">Status</div>
      </td>

      {/* Add button */}
      <td className="px-0 py-1">
        <Button
          text="Add"
          onClick={handleAddNew}
          variant="primary"
          loading={loading}
          icon={<FontAwesomeIcon icon={faPlus} className="text-[1rem]" />}
        />
      </td>

      {/* Cancel/Delete button */}
      <td className="px-0 py-1 border border-gray-200">
        <Button
          text="DELETE"
          onClick={() => setShowEdit(null)}
          variant="danger"
        />
      </td>
    </tr>
  );
};

export default AddNewSchedule;
