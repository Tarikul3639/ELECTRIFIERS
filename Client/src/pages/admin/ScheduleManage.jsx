import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faFilter, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import DatePicker from "../../components/ui/DatePicker.jsx";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../../components/ui/Button.jsx";
import CustomSelect from "../../components/ui/Select.jsx";
import socket from "../../Components/socket/Socket.jsx";
import { format } from "date-fns";
import LocationFilter from "./LocationFilter.jsx";


const ScheduleManage = () => {
    const [showEdit, setShowEdit] = useState(null);
    const [showFilter, setShowFilter] = useState(false);
    const [selectedDivision, setSelectedDivision] = useState("");
    const [schedule, setSchedule] = useState([]);

    const hasConnected = useRef(false);
    useEffect(() => {
        if (socket.connected && !hasConnected.current) {
            console.log("✅ Already connected to socket");
            hasConnected.current = true;
        } else if (!socket.connected && !hasConnected.current) {
            console.log("❌ Not connected. You may connect it if needed.");
            socket.connect();
            hasConnected.current = true;
        }
    }, []);

    useEffect(() => {
        socket.on("load-schedule", async (data) => {
            // console.log("✅ Schedule data received: ", data);
            setSchedule(data);
        });

        // Event sender to server
        socket.emit("load-schedule", "Load schedule event triggered from client");
        return () => {
            socket.off("load-schedule");
        };
    }, []);
    console.log("Schedule Data: ", schedule);


    // const getAllSchedules = useCallback(() => {
    //     return Object.values(schedule).flat();
    // }, [schedule]);

    // const [users, setUsers] = useState(getAllSchedules());

    // const [newUser, setNewUser] = useState({
    //     day: "",
    //     date: "",
    //     scheduleTime: "8:00 AM - 10:00 AM",
    // });

    // const scheduleTimes = [
    //     "08:00 AM - 10:00 AM",
    //     "10:00 AM - 12:00 PM",
    //     "02:00 PM - 04:00 PM",
    //     "04:00 PM - 06:00 PM",
    //     "06:00 PM - 08:00 PM"
    // ];
    // const handleDivisionChange = (e) => {
    //     setSelectedDivision(e.value);
    //     console.log("Division :", e.value);
    //     // console.log(selectedDivision);
    //     setSelectedArea("");
    // };
    // const handleAreaChange = (e) => {
    //     setSelectedArea(e.value);
    //     console.log("Area :", e.value);
    // }
    // const [originalValues, setOriginalValues] = useState({});

    // const handleEdit = useCallback((id) => {
    //     setOriginalValues((prev) => {
    //         const user = users.find((u) => u.id === id);
    //         return { ...prev, [id]: { ...user } };
    //     });
    //     setShowEdit(id);
    // }, [users]);

    // const handleDelete = useCallback((id) => {
    //     setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    // }, []);

    // const handleUpdate = useCallback((id, day, date, scheduleTime) => {
    //     setUsers((prevUsers) =>
    //         prevUsers.map((user) =>
    //             user.id === id ? { ...user, day, date, scheduleTime } : user
    //         )
    //     );
    //     setShowEdit(null);
    // }, []);

    // const handleCancel = useCallback((id) => {
    //     setUsers((prevUsers) =>
    //         prevUsers.map((user) =>
    //             user.id === id ? { ...user, ...originalValues[id] } : user
    //         )
    //     );
    //     setShowEdit(null);
    // }, [originalValues]);

    // const handleAddNew = () => {
    //     const newId = users.length + 1;
    //     setUsers((prevUsers) => [
    //         ...prevUsers,
    //         { id: newId, ...newUser },
    //     ]);
    //     setShowEdit(null);
    // };

    // const handleNewDateChange = (date) => {
    //     const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' });
    //     setNewUser({
    //         ...newUser,
    //         date: date.toISOString().split('T')[0],
    //         day: dayOfWeek,
    //     });
    // };


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

    // const handleDateChange = (id, selectedDate) => {
    //     const dayOfWeek = selectedDate.toLocaleString('en-US', { weekday: 'long' });
    //     setUsers((prevUsers) =>
    //         prevUsers.map((user) =>
    //             user.id === id ? { ...user, day: dayOfWeek, date: selectedDate.toISOString().split('T')[0] } : user
    //         )
    //     );
    // };

    // const handleScheduleTimeChange = (id, selectedOption) => {
    //     if (id === "new") {
    //         if (!selectedOption || !selectedOption.value) return;
    //         console.log(selectedOption.value, "scheduleTimeChange");
    //         setNewUser((prevState) => ({
    //             ...prevState,
    //             scheduleTime: selectedOption.value,
    //         }));
    //     } else {
    //         setUsers((prevUsers) =>
    //             prevUsers.map((user) =>
    //                 user.id === id ? { ...user, scheduleTime: selectedOption.value } : user
    //             )
    //         );
    //     }
    // };

    // const filterUsers = useCallback(() => {
    //     if (selectedDivision && selectedArea) {
    //         setUsers(schedule[selectedArea] || []);
    //     } else if (selectedDivision) {
    //         const filteredUsers = Object.keys(schedule).reduce((acc, area) => {
    //             if (areas[selectedDivision].includes(area)) {
    //                 acc = acc.concat(schedule[area]);
    //             }
    //             return acc;
    //         }, []);
    //         setUsers(filteredUsers);
    //     } else {
    //         setUsers(getAllSchedules());
    //     }
    // }, [selectedDivision, selectedArea, schedule, areas, getAllSchedules]);

    // useEffect(() => {
    //     filterUsers();
    // }, [filterUsers]);

    return (
        <div className="w-screen-md bg-gray-200 p-2 rounded-lg shadow-lg overflow-hidden">
            <div className="flex items-center justify-start p-2 w-full bg-gray-200 rounded-sm shadow-lg mb-1">
                <Button
                    text="New"
                    // onClick={() => setShowEdit("new")}
                    variant="primary"
                    icon={<FontAwesomeIcon icon={faPlus} className="text-[1rem]" />}
                />
                {/* Filter the Address */}
                <LocationFilter
                    // divisions={divisions}
                    // areas={areas}
                    // selectedDivision={selectedDivision}
                    // selectedArea={selectedArea}
                    // showFilter={showFilter}
                    // setShowFilter={setShowFilter}
                    // handleDivisionChange={handleDivisionChange}
                    // handleAreaChange={handleAreaChange}
                />
            </div>

            <div className="overflow-auto max-h-[450px] rounded-lg shadow-lg bg-white p-2">

                <table className="min-w-full overflow-y-scroll border-collapse bg-white border-4 border-gray-100">
                    <thead className="sticky transition-all duration-1000 -top-[11px] z-10 bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.1">
                        <tr className="border border-gray-500 border-solid bg-white text-gray-700 sticky-header">
                            <th className="px-1 py-2 border-3 border-gray-200 min-w-[50px]">ID</th>
                            <th className="px-1 py-2 border-3 border-gray-200 min-w-[50px]">Division</th>
                            <th className="px-1 py-2 border-3 border-gray-200 min-w-[50px]">District</th>
                            <th className="px-1 py-2 border-3 border-gray-200 min-w-[60px]">Day</th>
                            <th className="px-1 py-2 border-3 border-gray-200 min-w-[100px]">Date</th>
                            <th className="px-1 py-2 border-3 border-gray-200 min-w-[170px]">Schedule Time</th>
                            <th className="px-1 py-2 border-3 border-gray-200">EDIT</th>
                            <th className="px-1 py-2 border-3 border-gray-200">DELETE</th>
                        </tr>
                    </thead>

                    <tbody>
                        {schedule.map(({division, district, _id, day, date, scheduleTime }) => (
                            <tr key={_id} className="border border-gray-500 border-solid bg-white text-gray-700 text-center">
                                <td className="px-1 py-2 border-3 border-gray-200">{_id}</td>
                                <td className="px-1 py-2 border-3 border-gray-200">{division}</td>
                                <td className="px-1 py-2 border-3 border-gray-200">{district}</td>
                                <td className="px-1 py-2 border-3 border-gray-200">
                                    {showEdit === _id ? (
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
                                    {showEdit === _id ? (
                                        <div className="flex items-center justify-center ">
                                            <DatePicker
                                                selected={new Date(date)}
                                                // onChange={(date) => handleDateChange(id, date)}
                                                classNames={{
                                                    Button: () => "bg-white text-gray-700 border-1 border-gray-700 m-1 text-sm font-medium w-auto px-1 py-1 min-w-[120px] rounded-sm  shadow-none hover:bg-gray-100",
                                                    Input: () => "border-0 px-1 py-1 rounded text-center placeholder:text-center",
                                                }}
                                                dateFormat="yyyy-MM-dd"
                                            />
                                        </div>
                                    ) : (
                                        format(new Date(date), "yyyy-MM-dd")
                                    )}
                                </td>
                                <td className="px-1 py-2 border-3 border-gray-200">
                                    {showEdit === _id ? (
                                        <CustomSelect
                                            value={scheduleTimes.find((time) => time === scheduleTime) ? { value: scheduleTime, label: scheduleTime } : null}
                                            // onChange={(e) => handleScheduleTimeChange(id, e.value)}
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
                                    {renderEditButtons(_id, day, date, scheduleTime)}
                                </td>
                                <td className="px-1 py-2 border-3 border-gray-200">
                                    <Button
                                        text="DELETE"
                                        onClick={() => handleDelete(_id)}
                                        variant="danger"
                                    />
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ScheduleManage;
