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

const AddNewSchedule = ({ setShowEdit, locationData }) => {
    const [loading, setLoading] = React.useState(false);

    // Initial state for the new schedule data
    const [newUser, setNewUser] = React.useState({
        day: "",
        date: null,
        scheduleTime: "",
        division: "",
        district: "",
    });

    // Memoized time slots for schedule
    const scheduleTimes = React.useMemo(() => [
        "12:00 AM - 12:59 AM",
        "1:00 AM - 1:59 AM",
        "2:00 AM - 2:59 AM",
        "3:00 AM - 3:59 AM",
        "4:00 AM - 4:59 AM",
        "5:00 AM - 5:59 AM",
        "6:00 AM - 6:59 AM",
        "7:00 AM - 7:59 AM",
        "8:00 AM - 8:59 AM",
        "8:00 AM - 8:59 AM",
        "9:00 AM - 9:59 AM",
        "10:00 AM - 10:59 AM",
        "11:00 AM - 11:59 AM",
        "12:00 PM - 12:59 PM",
        "1:00 PM - 1:59 PM",
        "2:00 PM - 2:59 PM",
        "3:00 PM - 3:59 PM",
        "4:00 PM - 4:59 PM",
        "5:00 PM - 5:59 PM",
        "6:00 PM - 6:59 PM",
        "7:00 PM - 7:59 PM",
        "8:00 PM - 8:59 PM",
        "9:00 PM - 9:59 PM",
        "10:00 PM - 10:59 PM",
        "11:00 PM - 11:59 PM",
    ], []);

    // Handle division selection
    const handleDivisionChange = (selected) => {
        setNewUser((prev) => ({
            ...prev,
            division: selected.value,
            district: "", // Reset district on division change
        }));
    };

    // Handle district selection
    const handleDistrictChange = (selected) => {
        setNewUser((prev) => ({
            ...prev,
            district: selected.value,
        }));
    };

    // Handle date selection and extract day name
    const handleNewDateChange = (date) => {
        const dayName = format(date, "EEEE");
        setNewUser((prev) => ({
            ...prev,
            date,
            day: dayName,
        }));
    };

    // Handle schedule time selection
    const handleScheduleTimeChange = (id, e) => {
        setNewUser((prev) => ({
            ...prev,
            scheduleTime: e.value,
        }));
    };

    // Add new schedule via socket
    const handleAddNew = () => {
        setLoading(true);
        const formattedDate = format(newUser.date, "yyyy-MM-dd");
        // Validation check
        if (!newUser.date || !newUser.scheduleTime || !newUser.district || !newUser.division) {
            setLoading(false);
            return toast.info("Please fill all the fields");
        }

        // Emit event to backend
        socket.emit("add-schedule", newUser, (response) => {
            if (response.status === "success") {
                toast.success(response.message);
            } else {
                toast.error(response.message);
            }
            setLoading(false);
        });

        // Reset input and close form
        setNewUser({ day: "", date: null, scheduleTime: "", division: "", district: "" });
        setShowEdit(null);
    };

    return (
        <tr id="AddNewSchedule" className="border border-gray-500 bg-white text-gray-700 text-center">
            {/* ID placeholder cell */}
            <td className="px-1 py-2 border border-gray-200">
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
                    options={(locationData[newUser.division] || []).map((district) => ({
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
            <td className="px-0 py-0 border border-gray-200">
                <input
                    type="text"
                    name="day"
                    value={newUser.day}
                    readOnly
                    placeholder="Day"
                    className="border border-gray-900 px-1 py-1.5 rounded text-center placeholder:text-center focus:outline-none placeholder:text-gray-700 placeholder:font-semibold text-sm"
                />
            </td>

            {/* Date picker */}
            <td className="px-0 py-0 border border-gray-200">
                <DatePicker
                    selected={newUser.date ? new Date(newUser.date) : null}
                    onChange={handleNewDateChange}
                    placeholderText="Select a New Date"
                    dateFormat="yyyy-MM-dd"
                    classNames={{
                        Button: () => "flex justify-center items-center bg-white text-gray-700 border border-gray-900 text-sm font-medium px-0 min-w-[150px] max-w-[200px] py-[5px] rounded-sm hover:bg-gray-100",
                        Input: () => "border-0 px-0 py-1 text-gray-700 text-center placeholder:text-gray-700",
                        Icon: () => "mr-1",
                    }}
                />
            </td>

            {/* Schedule time selection */}
            <td className="px-0 py-0 border border-gray-200">
                <CustomSelect
                    value={newUser.scheduleTime ? { value: newUser.scheduleTime, label: newUser.scheduleTime } : null}
                    options={scheduleTimes.map((time) => ({ value: time, label: time }))}
                    onChange={(e) => handleScheduleTimeChange("new", e)}
                    placeholder="Select Schedule Time"
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
