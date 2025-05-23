import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faFilter, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../../components/ui/Button.jsx";
import socket from "../../components/socket/Socket.jsx";
import LocationFilter from "./LocationFilter.jsx";
import AddNewSchedule from "./AddNewSchedule.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DayColumn from "./table/DayColumn.jsx";
import DateColumn from "./table/DateColumn.jsx";
import StatusColumn from "./table/StatusColumn.jsx";
import TimeRangeColumn from "./table/TimeRangeColumn.jsx";
import ButtonsColumn from "./table/ButtonsColumn.jsx";

const ScheduleManage = () => {
    // State to manage loading status for delete and update actions
    const [loadingForDelete, setLoadingForDelete] = useState(null); // stores _id of deleting row
    const [loadingForUpdate, setLoadingForUpdate] = useState(null); // stores _id of updating row    

    // State to manage loading locations and location data
    const [loadingLocations, setLoadingLocations] = useState(false);
    const [locationData, setLocationData] = useState({});

    // State for edit functionality and schedule data
    const [showEdit, setShowEdit] = useState(null);
    const [schedule, setSchedule] = useState([]);

    // State to manage schedule updates
    const [updateSchedule, setUpdateSchedule] = useState({
        id: null,
        date: null,
        startTime: null,
        endTime: null,
    });

    // Ref to track socket connection status
    const hasConnected = useRef(false);

    // Socket connection and event listeners setup
    useEffect(() => {
        if (socket.connected && !hasConnected.current) {
            console.log("✅ Already connected to socket:", socket.id);
            hasConnected.current = true;
        } else if (!socket.connected && !hasConnected.current) {
            console.log("❌ Not connected. You may connect it if needed.");
            socket.connect();
            hasConnected.current = true;
        }
    }, []);

    // Fetch schedule data and handle real-time updates via sockets
    useEffect(() => {
        // Load initial schedule data
        socket.emit("load-schedule", '');

        // Listener for full schedule data
        socket.on("load-schedule", (data) => {
            console.log("✅ Schedule data received:", data);
            setSchedule(data);
        });

        // Listener for new schedule addition in real-time
        socket.on("schedule-added", (newSchedule) => {
            console.log("📢 New schedule added in real-time:", newSchedule);
            setSchedule((prev) => [...prev, newSchedule]);
            toast.success("New schedule added!");
        });

        // Listener for schedule updates in real-time
        socket.on("schedule-updated", (updatedSchedule) => {
            console.log("🔄 Schedule updated in real-time:", updatedSchedule);
            setSchedule((prev) =>
                prev.map((item) =>
                    item._id === updatedSchedule._id ? updatedSchedule : item
                )
            );
        });

        // Listener for schedule deletion
        socket.on("schedule-deleted", (deletedSchedule) => {
            setSchedule((prev) => prev.filter((item) => item._id !== deletedSchedule._id));
            toast.success("Schedule deleted successfully!");
        });

        // Cleanup listeners to prevent memory leaks
        return () => {
            socket.off("load-schedule");
            socket.off("schedule-added");
            socket.off("schedule-updated");
            socket.off("schedule-deleted");
        };
    }, []);

    // Fetch location data for the location filter
    useEffect(() => {
        const fetchLocations = async () => {
            setLoadingLocations(true);
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/location`);
                const data = await response.json();
                setLocationData(data);
            } catch (err) {
                console.error("Error fetching location data:", err);
            } finally {
                setLoadingLocations(false);
            }
        };

        fetchLocations();
    }, []);

    // Handle location change for filtering schedule
    const handleLocationChange = (location) => {
        socket.emit("load-schedule", location); // Emit event with the selected location
    };

    // Handle editing of a schedule
    const handleEdit = (id) => {
        setShowEdit(id);
        setUpdateSchedule({ id: null, date: null, startTime: null, endTime: null });
    };

    // Handle schedule update
    const handleUpdate = (id) => {
        setLoadingForUpdate(id);
        if (!id) {
            return toast.info("Please fill all the fields");
        }
        setUpdateSchedule((prev) => ({
            ...prev,
            id: id,
        }));
        socket.emit("update-schedule", updateSchedule, (response) => {
            if (response.status === "success") {
                toast.success(response.message);
                setLoadingForUpdate(null);
                setShowEdit(null);
                setUpdateSchedule({ id: null, date: null, startTime: null, endTime: null });
            } else {
                toast.error(response.message);
                setLoadingForUpdate(null);
                setShowEdit(null);
                setUpdateSchedule({ id: null, date: null, startTime: null, endTime: null });
            }
        });
    };

    // Handle cancel of schedule update
    const handleCancel = () => {
        setShowEdit(null);
        setUpdateSchedule({ id: null, date: null, startTime: null, endTime: null });
    };

    // Handle schedule deletion
    const handleDelete = (id) => {
        setLoadingForDelete(id);
        socket.emit("delete-schedule", id, (response) => {
            setLoadingForDelete(null);
            if (response.status === "success") {
                toast.success(response.message);
            } else {
                toast.error(response.message);
            }
        });
    };

    // Handle opening of new schedule addition form
    const handleAddNewSchedule = () => {
        setShowEdit("new");
        setTimeout(() => {
            document.getElementById("AddNewSchedule")?.scrollIntoView({ behavior: "smooth", block: "center", inline: "end" });
        }, 50);
        setUpdateSchedule({ id: null, date: null, startTime: null, endTime: null });
    };

    return (
        <div className="w-screen-md bg-gray-200 p-2 rounded-lg shadow-lg overflow-hidden">
            {/* Header Section */}
            <div className="flex items-center justify-start p-2 w-full bg-gray-200 rounded-sm shadow-lg mb-1">
                <Button
                    text="New"
                    onClick={handleAddNewSchedule}
                    variant="primary"
                    icon={<FontAwesomeIcon icon={faPlus} className="text-[1rem]" />}
                />
                {/* Location Filter */}
                <LocationFilter
                    onChangeLocation={handleLocationChange}
                    locationData={locationData}
                    loading={loadingLocations}
                />
            </div>

            {/* Schedule Table */}
            <div className="overflow-auto max-h-[450px] rounded-lg shadow-lg bg-white p-2">
                <table className="min-w-full overflow-y-scroll border-collapse bg-white border-4 border-gray-100">
                    <thead className="sticky transition-all duration-1000 -top-[11px] z-10 bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.1)">
                        <tr className="border border-gray-500 border-solid bg-white text-gray-700 sticky-header">
                            {/* Table Headers */}
                            <th className="px-1 py-2 border-3 border-gray-200 min-w-[50px]">ID</th>
                            <th className="px-1 py-2 border-3 border-gray-200 min-w-[50px]">Division</th>
                            <th className="px-1 py-2 border-3 border-gray-200 min-w-[50px]">District</th>
                            <th className="px-1 py-2 border-3 border-gray-200 min-w-[60px]">Day</th>
                            <th className="px-1 py-2 border-3 border-gray-200 min-w-[100px]">Date</th>
                            <th className="px-1 py-2 border-3 border-gray-200 min-w-[170px]">Schedule Time</th>
                            <th className="px-1 py-2 border-3 border-gray-200 min-w-[60px]">Status</th>
                            <th className="px-1 py-2 border-3 border-gray-200">EDIT</th>
                            <th className="px-1 py-2 border-3 border-gray-200">DELETE</th>
                        </tr>
                    </thead>

                    <tbody>
                        {/* Add New Schedule */}
                        {showEdit === "new" && (
                            <AddNewSchedule
                                setShowEdit={setShowEdit}
                                locationData={locationData}
                            />
                        )}

                        {/* Schedule Rows */}
                        {schedule.map(({ division, district, _id, date, startTime, endTime, status }) => (
                            <tr key={_id} className="border border-gray-500 border-solid bg-white text-gray-700 text-center">
                                <td className="px-1 py-2 border-3 border-gray-200">{_id}</td>
                                <td className="px-1 py-2 border-3 border-gray-200">{division}</td>
                                <td className="px-1 py-2 border-3 border-gray-200">{district}</td>
                                <td className="px-1 py-2 border-3 border-gray-200">
                                    <DayColumn showEdit={showEdit} date={date} _id={_id} />
                                </td>
                                <td className="px-0 py-0 border-3 border-gray-200">
                                    <DateColumn showEdit={showEdit} date={date} _id={_id} setUpdateSchedule={setUpdateSchedule} updateSchedule={updateSchedule} />
                                </td>
                                <td className="px-1 py-2 border-3 border-gray-200">
                                    <TimeRangeColumn
                                        showEdit={showEdit}
                                        startTime={startTime}
                                        endTime={endTime}
                                        _id={_id}
                                        setUpdateSchedule={setUpdateSchedule} // Pass the correct setter here
                                        updateSchedule={updateSchedule} // Pass the current state
                                    />
                                </td>
                                <td className="px-1 py-2 border-3 border-gray-200">
                                    <StatusColumn showEdit={showEdit} status={status} _id={_id} />
                                </td>
                                <td className="px-1 py-2 border-3 border-gray-200">
                                    <ButtonsColumn
                                        _Id={_id}
                                        showEdit={showEdit}
                                        handleEdit={handleEdit}
                                        handleUpdate={handleUpdate}
                                        handleCancel={handleCancel}
                                        loadingForUpdate={loadingForUpdate}
                                    />
                                </td>
                                <td className="px-1 py-2 border-3 border-gray-200">
                                    <Button
                                        text="DELETE"
                                        onClick={() => handleDelete(_id)}
                                        variant="danger"
                                        loading={loadingForDelete === _id}
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
