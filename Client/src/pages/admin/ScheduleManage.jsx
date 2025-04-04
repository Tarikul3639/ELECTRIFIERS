import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faFilter, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { useState, useCallback, useEffect, useMemo } from "react";
import DatePicker from "../../components/ui/DatePicker.jsx";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../../components/ui/Button.jsx";
import CustomSelect from "../../components/ui/Select.jsx";

const ScheduleManage = () => {
    const [showEdit, setShowEdit] = useState(null);
    const [showFilter, setShowFilter] = useState(false);
    const divisions = ["Dhaka", "Chittagong", "Rajshahi", "Khulna"];
    const [selectedDivision, setSelectedDivision] = useState("");
    const [selectedArea, setSelectedArea] = useState("");

    const areas = useMemo(() => ({
        Dhaka: ["Dhanmondi", "Uttara", "Gulshan", "Mirpur"],
        Chittagong: ["Pahartali", "Nasirabad", "Halishahar"],
        Rajshahi: ["Rajpara", "Boalia", "Shalbagan"],
        Khulna: ["Sonadanga", "Khalishpur", "Daulatpur"],
    }), []);
    const schedule = useMemo(() => ({
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
    }), []);

    const getAllSchedules = useCallback(() => {
        return Object.values(schedule).flat();
    }, [schedule]);

    const [users, setUsers] = useState(getAllSchedules());

    const [newUser, setNewUser] = useState({
        day: "",
        date: "",
        scheduleTime: "8:00 AM - 10:00 AM",
    });

    const scheduleTimes = [
        "08:00 AM - 10:00 AM",
        "10:00 AM - 12:00 PM",
        "02:00 PM - 04:00 PM",
        "04:00 PM - 06:00 PM",
        "06:00 PM - 08:00 PM"
    ];
    const handleDivisionChange = (e) => {
        setSelectedDivision(e.value);
        console.log("Division :", e.value);
        // console.log(selectedDivision);
        setSelectedArea("");
    };
    const handleAreaChange = (e) => {
        setSelectedArea(e.value);
        console.log("Area :", e.value);
    }
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
                <Button
                    text="Update"
                    onClick={() => handleUpdate(userId, day, date, scheduleTime)}
                    variant="primary"
                />
                <Button
                    text="Cancel"
                    onClick={() => handleCancel(userId)}
                    variant="danger"
                />
            </div>
        ) : (
            <div className="flex items-center justify-center space-x-2">
                <Button
                    text="Edit"
                    onClick={() => handleEdit(userId)}
                    variant="primary"
                />
            </div>
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

    const handleScheduleTimeChange = (id, selectedOption) => {
        if (id === "new") {
            if (!selectedOption || !selectedOption.value) return;
            console.log(selectedOption.value, "scheduleTimeChange");
            setNewUser((prevState) => ({
                ...prevState,
                scheduleTime: selectedOption.value,
            }));
        } else {
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === id ? { ...user, scheduleTime: selectedOption.value } : user
                )
            );
        }
    };

    const filterUsers = useCallback(() => {
        if (selectedDivision && selectedArea) {
            setUsers(schedule[selectedArea] || []);
        } else if (selectedDivision) {
            const filteredUsers = Object.keys(schedule).reduce((acc, area) => {
                if (areas[selectedDivision].includes(area)) {
                    acc = acc.concat(schedule[area]);
                }
                return acc;
            }, []);
            setUsers(filteredUsers);
        } else {
            setUsers(getAllSchedules());
        }
    }, [selectedDivision, selectedArea, schedule, areas, getAllSchedules]);

    useEffect(() => {
        filterUsers();
    }, [filterUsers]);

    return (
        <div className="w-screen-md bg-gray-200 p-2 rounded-lg shadow-lg overflow-hidden">
            <div className="flex items-center justify-start p-2 w-full bg-gray-200 rounded-sm shadow-lg mb-1">
                <Button
                    text="New"
                    onClick={() => setShowEdit("new")}
                    variant="primary"
                    icon={<FontAwesomeIcon icon={faPlus} className="text-[1rem]" />}
                />
                <Button
                    text="Filter"
                    onClick={() => setShowFilter(!showFilter)}
                    variant="secondary"
                    icon={<FontAwesomeIcon icon={faFilter} className={`text-xs ${showFilter ? "rotate-90" : "rotate-0"}`} />}
                />
                {/* Filter the Address */}
                {showFilter && (
                    <div className="transform translate-x-0 transition-transform duration-500 ease-in-out flex items-center space-x-2 ml-4">
                        <CustomSelect
                            value={selectedDivision}
                            options={divisions && divisions.length > 0 ? divisions.map((division) => ({ value: division, label: division })) : []}
                            placeholder="Select Division"
                            onChange={handleDivisionChange}
                            classNames={{
                                menuButton: () => " bg-[#0051a2] text-[#e7efff] text-xs w-auto font-semibold min-w-[120px] rounded-sm flex items-center hover:bg-[#00287e]",
                                menu: " z-50 bg-[#0051a2] w-full text-xs shadow-lg rounded-sm mt-1 p-0",
                                listItem: ({ isSelected }) => (
                                    `block transition duration-200 pl-2 py-2 mt-1 mb-1 cursor-pointer select-none truncate rounded-none ${isSelected
                                        ? ` bg-[#00287e] text-white hover:bg-[#00287e] `
                                        : `text-white hover:bg-[#00287e]`
                                    }`
                                ),
                            }}
                            isSearchable
                        />

                        <CustomSelect
                            options={selectedDivision && areas[selectedDivision] && areas[selectedDivision].length > 0 ? areas[selectedDivision].map((area) => ({ value: area, label: area })) : []}
                            value={selectedArea ? { value: selectedArea, label: selectedArea } : null}
                            placeholder="Select Area"
                            onChange={handleAreaChange}
                            classNames={{
                                menuButton: () => " bg-[#0051a2] text-[#e7efff] text-xs w-auto font-semibold min-w-[120px] rounded-sm flex items-center hover:bg-[#00287e]",
                                menu: " z-50 bg-[#0051a2] w-full text-xs shadow-lg rounded-sm mt-1 p-0",
                                listItem: ({ isSelected }) => (
                                    `block transition duration-200 pl-2 py-2 mt-1 mb-1 cursor-pointer select-none truncate rounded-none ${isSelected
                                        ? ` bg-[#00287e] text-white hover:bg-[#00287e] `
                                        : `text-white hover:bg-[#00287e]`
                                    }`
                                ),
                            }}
                            isSearchable
                        />
                        <button className="bg-[#2489f4] hidden text-white text-xs font-semibold px-4 py-2 rounded-sm flex items-center space-x-2 ml-4 hover:bg-[#1179e0] transition duration-300">
                            <FontAwesomeIcon icon={faCalendar} className="text-xs mr-2" />Month
                        </button>

                    </div>

                )}
            </div>

            <div className="overflow-auto max-h-[450px] rounded-lg shadow-lg bg-white p-2">

                <table className="min-w-full overflow-y-scroll border-collapse bg-white border-4 border-gray-100">
                    <thead className="sticky transition-all duration-1000 -top-[11px] z-10 bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.1">
                        <tr className="border border-gray-500 border-solid bg-white text-gray-700 sticky-header">
                            <th className="px-1 py-2 border-3 border-gray-200 min-w-[50px]">ID</th>
                            <th className="px-1 py-2 border-3 border-gray-200 min-w-[60px]">Day</th>
                            <th className="px-1 py-2 border-3 border-gray-200 min-w-[100px]">Date</th>
                            <th className="px-1 py-2 border-3 border-gray-200 min-w-[170px]">Schedule Time</th>
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

                                <td className="px-0 py-0 border-3 border-gray-200">
                                    {showEdit === id ? (
                                        <div className="flex items-center justify-center ">
                                            <DatePicker
                                                selected={new Date(date)}
                                                onChange={(date) => handleDateChange(id, date)}
                                                classNames={{
                                                    Button: () => "bg-white text-gray-700 border-1 border-gray-700 m-1 text-sm font-medium w-auto px-1 py-1 min-w-[120px] rounded-sm  shadow-none hover:bg-gray-100",
                                                    Input: () => "border-0 px-1 py-1 rounded text-center placeholder:text-center",
                                                }}
                                                dateFormat="yyyy-MM-dd"
                                            />
                                        </div>
                                    ) : (
                                        date
                                    )}
                                </td>
                                <td className="px-1 py-2 border-3 border-gray-200">
                                    {showEdit === id ? (
                                        <CustomSelect
                                            value={scheduleTimes.find((time) => time === scheduleTime) ? { value: scheduleTime, label: scheduleTime } : null}
                                            onChange={(e) => handleScheduleTimeChange(id, e.value)}
                                            options={scheduleTimes.map((time) => ({ value: time, label: time }))}
                                            placeholder="Select Schedule Time"
                                            classNames={
                                                {
                                                    menuButton: () => " bg-white text-gray-700 border-1 m-1 text-sm font-medium w-auto font-semibold min-w-[120px] rounded-sm  shadow-none hover:bg-gray-100",
                                                    menu: " z-50 bg-white w-full text-sm shadow-lg rounded-sm mt-1 p-0",
                                                    listItem: ({ isSelected }) => (
                                                        `block transition duration-200 pl-2 py-2 mt-1 mb-1 cursor-pointer select-none truncate rounded-none ${isSelected
                                                            ? ` bg-[#00287e] text-white hover:bg-[#00287e] `
                                                            : `text-gray-700`
                                                        }`
                                                    ),
                                                }
                                            }
                                        />
                                    ) : (
                                        scheduleTime
                                    )}
                                </td>
                                <td className="px-1 py-2 border-3 border-gray-200">
                                    {renderEditButtons(id, day, date, scheduleTime)}
                                </td>
                                <td className="px-1 py-2 border-3 border-gray-200">
                                    <Button
                                        text="DELETE"
                                        onClick={() => handleDelete(id)}
                                        variant="danger"
                                    />
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
                                        className="border-1 px-1 py-1 rounded text-center placeholder:text-center focus:outline-none focus:ring-0 cursor-default"
                                    />
                                </td>
                                <td className="px-0 py-0 border-0 border-gray-200 flex items-center justify-center ">
                                    <DatePicker
                                        selected={newUser.date ? new Date(newUser.date) : null}
                                        onChange={handleNewDateChange}
                                        placeholderText="Select a New Date"
                                        dateFormat="yyyy-MM-dd"
                                        classNames={{
                                            Button: () => "flex justify-center items-center bg-white text-gray-700 border-1 border-gray-700 text-sm font-medium px-0 max-w-[200px] py-1 rounded-sm shadow-none hover:bg-gray-100",
                                            Input: () => "border-0 px-0 py-1 text-gray-700 rounded text-center placeholder:text-center",
                                            Icon: () => "mr-1",
                                        }}

                                    />
                                </td>

                                <td className="px-0 py-0 border-3 border-gray-200">
                                    <CustomSelect
                                        value={scheduleTimes.find((time) => time === newUser.scheduleTime) ? {
                                            value: newUser.scheduleTime, label: newUser.scheduleTime
                                        } : null}
                                        onChange={(e) => handleScheduleTimeChange("new", e)}
                                        options={scheduleTimes.map((time) => ({ value: time, label: time }))}
                                        classNames={
                                            {
                                                menuButton: () => " bg-white text-gray-700 border-1 m-1 text-sm font-medium w-auto font-semibold min-w-[120px] rounded-sm  shadow-none hover:bg-white",
                                                menu: " z-50 bg-white w-full text-sm shadow-lg rounded-sm mt-1 p-0",
                                                listItem: ({ isSelected }) => (
                                                    `block transition duration-200 pl-2 py-2 mt-1 mb-1 cursor-pointer select-none truncate rounded-none ${isSelected
                                                        ? ` bg-[#00287e] text-white hover:bg-[#00287e] `
                                                        : `text-gray-700`
                                                    }`
                                                ),
                                            }
                                        }
                                    />
                                </td>

                                <td className="px-0 py-1 m-0 border-0 border-gray-10 flex items-center justify-center ">
                                    <Button
                                        text="Add"
                                        onClick={handleAddNew}
                                        variant="primary"
                                        icon={<FontAwesomeIcon icon={faPlus} className="text-[1rem]" />}
                                    />
                                </td>

                                <td className="px-0 py-1 border-3 border-gray-200">
                                    <Button
                                        text="DELETE"
                                        onClick={() => setShowEdit(null)}
                                        variant="danger"
                                    />
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
