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
import AddNewSchedule from "./AddNewSchedule.jsx";
import EditButtons from "./EditButtons.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const ScheduleManage = () => {
    const [loadingForDelete, setLoadingForDelete] = useState(null); // stores _id of deleting row
    const [loadingForUpdate, setLoadingForUpdate] = useState(null); // stores _id of updating row    
    const [loadingLocations, setLoadingLocations] = useState(false);
    const [locationData, setLocationData] = useState({});
    const [showEdit, setShowEdit] = useState(null);
    const [schedule, setSchedule] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState({
        division: "",
        district: "",
    });
    const [updateSchedule, setUpdateSchedule] = useState({
        id: null,
        date: null,
        day: null,
        scheduleTime: null,
    });

    const hasConnected = useRef(false);
    useEffect(() => {
        if (socket.connected && !hasConnected.current) {
            console.log("✅ Already connected to socket :", socket.id);
            hasConnected.current = true;
        } else if (!socket.connected && !hasConnected.current) {
            console.log("❌ Not connected. You may connect it if needed.");
            socket.connect();
            hasConnected.current = true;
        }
    }, []);
    useEffect(() => {
        socket.emit("load-schedule", '');
        socket.on("load-schedule", (data) => {
            console.log("✅ Schedule data received: ", data);
            setSchedule(data);
        });

        // Optional cleanup
        return () => {
            socket.off("load-schedule");
        };
    }, []);
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

    // Handle location change
    const handleLocationChange = (location) => {
        setSelectedLocation(location);
        // Emit event to server with location info (optional)
        socket.emit("load-schedule", location);
    };
    const handleEdit = (id)=>{
        setShowEdit(id);
        setUpdateSchedule({ id: id, date: null, scheduleTime: null });
    }
    // Memoized time slots for schedule
    const scheduleTimes = useMemo(() => [
        "8:00 AM - 9:00 AM",
        "9:00 AM - 10:00 AM",
        "10:00 AM - 11:00 AM",
        "5:00 PM - 6:00 PM",
    ], []);

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
        setUpdateSchedule({ id: null, date: null, scheduleTime: null });
            } else {
                toast.error(response.message);
                setLoadingForUpdate(null);
        setShowEdit(null);
        setUpdateSchedule({ id: null, date: null, scheduleTime: null });
            }  
        });
        console.log("✅ Schedule updated:", updateSchedule);
    };
    
    const handleCancel = (id) => {
        setShowEdit(null);
        setUpdateSchedule({ id: null, date: null, scheduleTime: null });
    };
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
    const handleAddNewSchedule = () => {
        setShowEdit("new");
        setTimeout(() => {
            document
              .getElementById("AddNewSchedule")
              ?.scrollIntoView({ behavior: "smooth", block: "center" , inline: "end" });
          }, 50);
        setUpdateSchedule({ id: null, date: null, scheduleTime: null });
    };
    

    return (
        <div className="w-screen-md bg-gray-200 p-2 rounded-lg shadow-lg overflow-hidden">
            <div className="flex items-center justify-start p-2 w-full bg-gray-200 rounded-sm shadow-lg mb-1">
                <Button
                    text="New"
                    onClick={handleAddNewSchedule}
                    variant="primary"
                    icon={<FontAwesomeIcon icon={faPlus} className="text-[1rem]" />}
                />
                {/* Filter the Address */}
                <LocationFilter
                    onChangeLocation={handleLocationChange}
                    locationData={locationData}
                    loading={loadingLocations}
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
                        {showEdit === "new" && (
                            <AddNewSchedule
                                setShowEdit={setShowEdit}
                                locationData={locationData}
                            />
                        )}
                        {schedule.map(({ division, district, _id, day, date, scheduleTime }) => (
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
                                                onChange={(date) => setUpdateSchedule((prev) => ({
                                                    ...prev,
                                                    id: _id,
                                                    day: format(date, "EEEE"),
                                                    date: date,
                                                  }))}                                                  
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
                                            onChange={(e) => setUpdateSchedule((prev) => ({
                                                ...prev,
                                                id: _id,
                                                scheduleTime: e.value,
                                              }))}                                              
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
                                    <EditButtons
                                        _Id={_id}
                                        day={day}
                                        date={date}
                                        scheduleTime={scheduleTime}
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
