import { useState, useEffect } from "react";
import LoadSheddingList from "./LoadSheddingList.jsx";
import TimerCircle from "./TimerCircle.jsx";
import socket from "../../Components/socket/Socket.jsx";
import dayjs from "dayjs";

const Home = () => {
  const [fullSchedule, setFullSchedule] = useState([]);
  const userEmail = JSON.parse(localStorage.getItem("user")).email;

  // Helper function to get relative day label
  function getRelativeDay(dateStr) {
    const today = dayjs().startOf("day");
    const target = dayjs(dateStr).startOf("day");

    if (target.isSame(today)) return "Today";
    if (target.isSame(today.subtract(1, "day"))) return "Yesterday";
    if (target.isSame(today.add(1, "day"))) return "Tomorrow";
    return target.format("dddd"); // fallback to day name like "Monday"
  }

  useEffect(() => {
    // Initial fetch
    socket.emit("user:load-schedule", userEmail, (response) => {
      console.log("Initial schedule response:", response);
      if (response.status === "success") {
        const updatedData = response.data.map((item) => ({
          ...item,
          date: dayjs(item.date).format("YYYY-MM-DD"),
          day: getRelativeDay(item.date),
        }));
        setFullSchedule(updatedData);
        console.log("Schedule loaded successfully:", updatedData);
      } else {
        console.error("Error fetching schedule:", response.message);
      }
    });

    // Real-time schedule updates
    const handleNewSchedule = (newSchedule) => {
      const formatted = {
        ...newSchedule,
        date: dayjs(newSchedule.date).format("YYYY-MM-DD"),
        day: getRelativeDay(newSchedule.date),
      };
      setFullSchedule((prev) => [...prev, formatted]);
    };

    const handleScheduleUpdate = (updatedSchedule) => {
      setFullSchedule((prev) =>
        prev.map((item) =>
          item._id === updatedSchedule._id
            ? {
                ...item,
                ...updatedSchedule,
                date: dayjs(updatedSchedule.date).format("YYYY-MM-DD"),
                day: getRelativeDay(updatedSchedule.date),
              }
            : item
        )
      );
    };

    const handleScheduleDelete = (deletedSchedule) => {
      setFullSchedule((prev) => prev.filter((item) => item._id !== deletedSchedule._id));
    };

    // Attach socket listeners
    socket.on("schedule-added", handleNewSchedule);
    socket.on("schedule-updated", handleScheduleUpdate);
    socket.on("schedule-deleted", handleScheduleDelete);

    // Cleanup listeners on unmount
    return () => {
      socket.off("schedule-added", handleNewSchedule);
      socket.off("schedule-updated", handleScheduleUpdate);
      socket.off("schedule-deleted", handleScheduleDelete);
    };
  }, [userEmail]);

  return (
    <div className="max-w-6xl flex flex-col items-center mx-auto my-10 p-8 bg-white rounded-lg shadow-sm">
      <TimerCircle fullSchedule={fullSchedule} />

      <svg xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e91e63" />
            <stop offset="100%" stopColor="#673ab7" />
          </linearGradient>

          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#03a9f4" />
            <stop offset="100%" stopColor="#673ab7" />
          </linearGradient>
        </defs>
      </svg>

      <div className="mt-8 w-full sm:p-6 bg-gray-100 rounded-lg shadow-md">
        <LoadSheddingList fullSchedule={fullSchedule} />
      </div>
    </div>
  );
};

export default Home;
