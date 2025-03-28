import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faFilter, faSortDown, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { useState, useCallback } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const ScheduleManage = () => {
    const [showEdit, setShowEdit] = useState(null);
    const [showFilter, setShowFilter] = useState(false);
    const divisions = ["Dhaka", "Chittagong", "Rajshahi", "Khulna"];
    const [selectedDivision, setSelectedDivision] = useState("");
    const [selectedArea, setSelectedArea] = useState("");

    const areas = {
        Dhaka: ["Dhanmondi", "Uttara", "Gulshan", "Mirpur"],
        Chittagong: ["Pahartali", "Nasirabad", "Halishahar"],
        Rajshahi: ["Rajpara", "Boalia", "Shalbagan"],
        Khulna: ["Sonadanga", "Khalishpur", "Daulatpur"],
    };
    const schedule = {
        Dhanmondi: [
            { id: 1, day: "Sunday", date: "2025-03-28", scheduleTime: "8:00 AM - 10:00 AM" },
            { id: 2, day: "Monday", date: "2025-03-29", scheduleTime: "10:00 AM - 12:00 PM" },
            { id: 3, day: "Tuesday", date: "2025-03-30", scheduleTime: "1:00 PM - 3:00 PM" },
            { id: 4, day: "Wednesday", date: "2025-03-31", scheduleTime: "4:00 PM - 6:00 PM" }
        ],
        Uttara: [
            { id: 5, day: "Tuesday", date: "2025-03-30", scheduleTime: "2:00 PM - 4:00 PM" },
            { id: 6, day: "Wednesday", date: "2025-03-31", scheduleTime: "8:00 AM - 10:00 AM" },
            { id: 7, day: "Thursday", date: "2025-04-01", scheduleTime: "5:00 PM - 7:00 PM" },
            { id: 8, day: "Friday", date: "2025-04-02", scheduleTime: "3:00 PM - 5:00 PM" }
        ],
        Gulshan: [
            { id: 9, day: "Thursday", date: "2025-04-01", scheduleTime: "10:00 AM - 12:00 PM" },
            { id: 10, day: "Friday", date: "2025-04-02", scheduleTime: "1:00 PM - 3:00 PM" },
            { id: 11, day: "Saturday", date: "2025-04-03", scheduleTime: "9:00 AM - 11:00 AM" },
            { id: 12, day: "Sunday", date: "2025-04-04", scheduleTime: "11:00 AM - 1:00 PM" }
        ],
        Mirpur: [
            { id: 13, day: "Saturday", date: "2025-04-03", scheduleTime: "9:00 AM - 11:00 AM" },
            { id: 14, day: "Sunday", date: "2025-04-04", scheduleTime: "11:00 AM - 1:00 PM" },
            { id: 15, day: "Monday", date: "2025-03-29", scheduleTime: "2:00 PM - 4:00 PM" }
        ],
        Pahartali: [
            { id: 16, day: "Monday", date: "2025-03-29", scheduleTime: "8:00 AM - 10:00 AM" },
            { id: 17, day: "Tuesday", date: "2025-03-30", scheduleTime: "3:00 PM - 5:00 PM" },
            { id: 18, day: "Wednesday", date: "2025-03-31", scheduleTime: "4:00 PM - 6:00 PM" }
        ],
        Nasirabad: [
            { id: 19, day: "Tuesday", date: "2025-03-30", scheduleTime: "2:00 PM - 4:00 PM" },
            { id: 20, day: "Wednesday", date: "2025-03-31", scheduleTime: "10:00 AM - 12:00 PM" }
        ],
        Halishahar: [
            { id: 21, day: "Wednesday", date: "2025-03-31", scheduleTime: "10:00 AM - 12:00 PM" },
            { id: 22, day: "Thursday", date: "2025-04-01", scheduleTime: "12:00 PM - 2:00 PM" }
        ],
        Rajpara: [
            { id: 23, day: "Thursday", date: "2025-04-01", scheduleTime: "2:00 PM - 4:00 PM" },
            { id: 24, day: "Friday", date: "2025-04-02", scheduleTime: "1:00 PM - 3:00 PM" }
        ],
        Boalia: [
            { id: 25, day: "Friday", date: "2025-04-02", scheduleTime: "3:00 PM - 5:00 PM" },
            { id: 26, day: "Saturday", date: "2025-04-03", scheduleTime: "9:00 AM - 11:00 AM" }
        ],
        Shalbagan: [
            { id: 27, day: "Saturday", date: "2025-04-03", scheduleTime: "4:00 PM - 6:00 PM" },
            { id: 28, day: "Sunday", date: "2025-04-04", scheduleTime: "11:00 AM - 1:00 PM" }
        ],
        Sonadanga: [
            { id: 29, day: "Sunday", date: "2025-03-28", scheduleTime: "9:00 AM - 11:00 AM" },
            { id: 30, day: "Monday", date: "2025-03-29", scheduleTime: "1:00 PM - 3:00 PM" }
        ],
        Khalishpur: [
            { id: 31, day: "Monday", date: "2025-03-29", scheduleTime: "1:00 PM - 3:00 PM" },
            { id: 32, day: "Tuesday", date: "2025-03-30", scheduleTime: "10:00 AM - 12:00 PM" }
        ],
        Daulatpur: [
            { id: 33, day: "Tuesday", date: "2025-03-30", scheduleTime: "10:00 AM - 12:00 PM" },
            { id: 34, day: "Wednesday", date: "2025-03-31", scheduleTime: "2:00 PM - 4:00 PM" }
        ]
    };

    const [users, setUsers] = useState([
        { id: 1, day: "Sunday", date: "2025-03-28", scheduleTime: "8:00 AM - 10:00 AM" },
        { id: 2, day: "Monday", date: "2025-03-29", scheduleTime: "10:00 AM - 12:00 PM" },
        { id: 3, day: "Tuesday", date: "2025-03-30", scheduleTime: "2:00 PM - 4:00 PM" },
        { id: 4, day: "Wednesday", date: "2025-03-31", scheduleTime: "8:00 AM - 10:00 AM" },
    ]);

    const [newUser, setNewUser] = useState({
        day: "",
        date: "",
        scheduleTime: "8:00 AM - 10:00 AM",
    });

    const scheduleTimes = [
        "8:00 AM - 10:00 AM",
        "10:00 AM - 12:00 PM",
        "2:00 PM - 4:00 PM",
        "4:00 PM - 6:00 PM",
        "6:00 PM - 8:00 PM"
    ];
    const handleDivisionChange = (e) => {
        setSelectedDivision(e.target.value);
        setSelectedArea("");
    };
    const [originalValues, setOriginalValues] = useState({});

    const handleEdit = useCallback((id) => {
        setOriginalValues((prev) => {
            const user = users.find((u) => u.id === id);
            return { ...prev, [id]: { ...user } };
        });
        setShowEdit(id);
    }, [users]);

    const handleDelete = useCallback((id) => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    }, []);

    const handleUpdate = useCallback((id, day, date, scheduleTime) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.id === id ? { ...user, day, date, scheduleTime } : user
            )
        );
        setShowEdit(null);
    }, []);

    const handleCancel = useCallback((id) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.id === id ? { ...user, ...originalValues[id] } : user
            )
        );
        setShowEdit(null);
    }, [originalValues]);

    const handleAddNew = () => {
        const newId = users.length + 1;
        setUsers((prevUsers) => [
            ...prevUsers,
            { id: newId, ...newUser },
        ]);
        setShowEdit(null);
    };

    const handleNewUserChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleNewDateChange = (date) => {
        const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' });
        setNewUser({
            ...newUser,
            date: date.toISOString().split('T')[0],
            day: dayOfWeek,
        });
    };


    const renderEditButtons = (userId, day, date, scheduleTime) => {
        return showEdit === userId ? (
            <div className="flex items-center justify-center space-x-2">
                <button
                    onClick={() => handleUpdate(userId, day, date, scheduleTime)}
                    className="bg-[#00B56F] text-white text-xs font-semibold px-4 py-2 rounded-sm space-x-2 hover:bg-[#09a567] transition duration-300"
                >
                    UPDATE
                </button>
                <button
                    onClick={() => handleCancel(userId)}
                    className="bg-red-500 text-white text-xs font-semibold px-4 py-2 rounded-sm space-x-2 hover:bg-red-700 transition duration-300"
                >
                    CANCEL
                </button>
            </div>
        ) : (
            <button
                onClick={() => handleEdit(userId)}
                className="bg-[#00B56F] text-white text-xs font-semibold px-4 py-2 rounded-sm space-x-2 hover:bg-[#09a567] transition duration-300"
            >
                EDIT
            </button>
        );
    };

    const handleDateChange = (id, selectedDate) => {
        const dayOfWeek = selectedDate.toLocaleString('en-US', { weekday: 'long' });
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.id === id ? { ...user, day: dayOfWeek, date: selectedDate.toISOString().split('T')[0] } : user
            )
        );
    };

    const handleScheduleTimeChange = (id, scheduleTime) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.id === id ? { ...user, scheduleTime } : user
            )
        );
    };

    return (
        <div className="w-screen-md bg-gray-200 p-2 rounded-lg shadow-lg">
            <div className="flex items-center justify-start p-2 w-full">
                <button
                    onClick={() => setShowEdit("new")}
                    className="bg-[#00B56F] text-white text-xs font-semibold px-4 py-2 rounded-sm flex items-center space-x-2 hover:bg-[#09a567] transition duration-300"
                >
                    <FontAwesomeIcon icon={faPlus} className="text-[1rem]" />
                    <span>New</span>
                </button>
                <button
                    onClick={() => setShowFilter(!showFilter)}
                    className="bg-[#2489f4] text-white text-xs font-semibold px-4 py-2 rounded-sm flex items-center space-x-2 ml-4 hover:bg-[#1179e0] transition duration-300"
                >
                    <FontAwesomeIcon icon={faFilter} className="text-xs " />
                    <span>Filter</span>
                    <FontAwesomeIcon icon={faSortDown} className={`text-xs transition-transform duration-0 ${showFilter ? "-rotate-90" : "rotate-0"}`} />
                </button>


                {showFilter && (
                    <div className="transform translate-x-0 transition-transform duration-500 ease-in-out flex items-center space-x-2 ml-4">
                        <select
                            name="District"
                            className="bg-[#2489f4] text-white text-xs font-semibold px-3 py-2 rounded-sm flex items-center space-x-2 ml-4 hover:bg-[#1179e0] transition duration-300 focus:outline-none"
                            defaultValue=""
                            onChange={handleDivisionChange}
                        >
                            <option value="" disabled className="text-[#9ac8ff] bg-[#2489f4]">
                                District
                            </option>
                            {divisions.map((division, index) => (
                                <option
                                    key={index}
                                    value={division}
                                    className="bg-[#2489f4] text-white hover:bg-[#1179e0] focus:bg-[#1179e0]"
                                >
                                    {division}
                                </option>
                            ))}
                        </select>

                        <select
                            name="Area"
                            className="bg-[#2489f4] text-white text-xs font-semibold px-3 py-2 rounded-sm flex items-center space-x-2 ml-4 hover:bg-[#1179e0] transition duration-300 focus:outline-none"
                            defaultValue=""
                        >
                            <option value="" disabled className="text-[#9ac8ff] bg-[#2489f4]">
                                Area
                            </option>

                            {selectedDivision && areas[selectedDivision] &&
                                areas[selectedDivision].map((area, index) => (
                                    <option
                                        key={index}
                                        value={area}
                                        className="bg-[#2489f4] text-white hover:bg-[#1179e0] focus:bg-[#1179e0]"
                                    >
                                        {area}
                                    </option>
                                ))
                            }
                        </select>


                        <button className="bg-[#2489f4] text-white text-xs font-semibold px-4 py-2 rounded-sm flex items-center space-x-2 ml-4 hover:bg-[#1179e0] transition duration-300">
                            <FontAwesomeIcon icon={faCalendar} className="text-xs mr-2" />Month
                        </button>
                    </div>

                )}
            </div>

            <div className="overflow-auto">
                {/* এখান থেকে আলাদা করবো */}
                <table className="min-w-full border-collapse bg-white border border-gray-200"> 
                    <thead>
                        <tr className="border border-gray-500 border-solid bg-white text-gray-700">
                            <th className="px-1 py-2 border-3 border-gray-200">ID</th>
                            <th className="px-1 py-2 border-3 border-gray-200">Day</th>
                            <th className="px-1 py-2 border-3 border-gray-200">Date</th>
                            <th className="px-1 py-2 border-3 border-gray-200">Schedule Time</th>
                            <th className="px-1 py-2 border-3 border-gray-200">EDIT</th>
                            <th className="px-1 py-2 border-3 border-gray-200">DELETE</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map(({ id, day, date, scheduleTime }) => (
                            <tr key={id} className="border border-gray-500 border-solid bg-white text-gray-700 text-center">
                                <td className="px-1 py-2 border-3 border-gray-200">{id}</td>
                                <td className="px-1 py-2 border-3 border-gray-200">
                                    {showEdit === id ? (
                                        <input
                                            type="text"
                                            value={day}
                                            readOnly
                                            className="text-gray-700 text-sm font-medium px-1 py-1 rounded text-center placeholder:text-center 
                       focus:outline-none focus:ring-0 border-none bg-transparent cursor-default"
                                        />
                                    ) : (
                                        day
                                    )}
                                </td>

                                <td className="px-1 py-2 border-3 border-gray-200">
                                    {showEdit === id ? (
                                        <div className="flex items-center justify-center ">
                                            <DatePicker
                                                selected={new Date(date)}
                                                onChange={(date) => handleDateChange(id, date)}
                                                className="text-gray-700 text-sm font-medium px-1 py-1 rounded flex text-center placeholder:text-center"
                                                dateFormat="yyyy-MM-dd"
                                            />
                                            <FaRegCalendarAlt className="text-gray-00 pointer-events-none" />
                                        </div>
                                    ) : (
                                        date
                                    )}
                                </td>
                                <td className="px-1 py-2 border-3 border-gray-200">
                                    {showEdit === id ? (
                                        <select
                                            value={scheduleTime}
                                            onChange={(e) => handleScheduleTimeChange(id, e.target.value)}
                                            className="text-gray-700 text-sm font-medium px-1 py-1 rounded"
                                        >
                                            {scheduleTimes.map((time) => (
                                                <option key={time} value={time}>
                                                    {time}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        scheduleTime
                                    )}
                                </td>
                                <td className="px-1 py-2 border-3 border-gray-200">
                                    {renderEditButtons(id, day, date, scheduleTime)}
                                </td>
                                <td className="px-1 py-2 border-3 border-gray-200">
                                    <button
                                        onClick={() => handleDelete(id)}
                                        className="bg-red-500 text-white text-xs font-semibold px-4 py-2 rounded-sm space-x-2 hover:bg-red-700 transition duration-300"
                                    >
                                        DELETE
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {showEdit === "new" && (
                            <tr className="border border-gray-500 border-solid bg-white text-gray-700 text-center">
                                <td className="px-1 py-2 border-3 border-gray-200"></td>
                                <td className="px-0 py-0 border-3 border-gray-200">
                                    <input
                                        type="text"
                                        name="day"
                                        value={newUser.day}
                                        readOnly
                                        className="border px-1 py-1 rounded text-center placeholder:text-center"
                                    />
                                </td>
                                <td className="px-0 py-0 border-3 border-gray-200">
                                    <DatePicker
                                        selected={newUser.date ? new Date(newUser.date) : null}
                                        onChange={handleNewDateChange}
                                        className="border px-1 py-1 rounded text-center placeholder:text-center"
                                        dateFormat="yyyy-MM-dd"
                                        placeholderText="Select a date"
                                    />
                                </td>

                                <td className="px-0 py-0 border-3 border-gray-200">
                                    <select
                                        name="scheduleTime"
                                        value={newUser.scheduleTime}
                                        onChange={handleNewUserChange}
                                        className="border px-1 py-1 rounded text-center placeholder:text-center"
                                    >
                                        {scheduleTimes.map((time) => (
                                            <option key={time} value={time}>
                                                {time}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td className="px-0 py-0 border-3 border-gray-200">
                                    <button
                                        onClick={handleAddNew}
                                        className="bg-[#00B56F] text-white text-xs font-semibold px-4 py-2 rounded-sm space-x-2 hover:bg-[#09a567] transition duration-300"
                                    >
                                        Add
                                        <span className="hidden md:inline-block pl-1">New</span>
                                    </button>

                                </td>
                                <td className="px-0 py-1 border-3 border-gray-200">
                                    <button
                                        onClick={() => setShowEdit(null)}
                                        className="bg-red-500 text-white text-xs font-semibold px-4 py-2 rounded-sm space-x-2 hover:bg-red-700 transition duration-300"
                                    >
                                        DELETE
                                    </button>
                                </td>
                            </tr>
                        )}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ScheduleManage;
