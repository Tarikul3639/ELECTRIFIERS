import { useEffect, useState, useMemo } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import LoadSheddingSchedule from "../Components/LoadSheddingSchedule";

const Home = () => {
    // Fetch data from the backend API
    useEffect(() => {
        const api = async () => {
          try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            });
      
            const data = await response.json();
            console.log("Data fetched successfully:", data.message);
            return data;
      
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
      
        api();
      }, []); 

    // Define the schedule times using useMemo to avoid unnecessary recalculations
    const scheduleTimes = useMemo(() => [
        "10:00 AM - 08:56 AM",
        "10:00 AM - 11:00 AM",
        "12:40 PM - 12:52 PM",
        "01:42 PM - 02:00 PM",
        "03:00 PM - 08:50 PM"
    ], []);

    // Function to parse the time strings into Date objects for comparison
    const parseTime = (timeStr) => {
        const [time, modifier] = timeStr.split(" ");
        let [hours, minutes] = time.split(":").map(Number);
        if (modifier === "PM" && hours !== 12) hours += 12;
        if (modifier === "AM" && hours === 12) hours = 0;
        const date = new Date();
        date.setHours(hours, minutes, 0, 0);
        return date;
    };

    // State to store the current and next schedule
    const [currentSchedule, setCurrentSchedule] = useState(null);
    const [nextSchedule, setNextSchedule] = useState(null);

    // useEffect to check the current time and determine the active and next schedule real-time UI update
    useEffect(() => {
        const checkSchedule = () => {
            const now = new Date();
            let found = false;

            // Loop through the schedule to find the current or next schedule
            for (let i = 0; i < scheduleTimes.length; i++) {
                const [startStr, endStr] = scheduleTimes[i].split(" - ");
                const start = parseTime(startStr);
                const end = parseTime(endStr);

                if (now >= start && now < end) {
                    setCurrentSchedule({ start, end });
                    const next = scheduleTimes[i + 1]?.split(" - ").map(parseTime);
                    setNextSchedule(next ? { start: next[0], end: next[1] } : null);
                    found = true;
                    break;
                } else if (now < start) {
                    setNextSchedule({ start, end });
                    found = true;
                    break;
                }
            }

            // If no current or next schedule is found, set the next schedule to the first schedule of the next day
            if (!found) {
                const firstSchedule = scheduleTimes[0].split(" - ");
                const nextDayStart = parseTime(firstSchedule[0]);
                nextDayStart.setDate(nextDayStart.getDate() + 1);
                setNextSchedule({
                    start: nextDayStart,
                    end: parseTime(firstSchedule[1])
                });
            }
        };

        checkSchedule(); 
        const interval = setInterval(checkSchedule, 1000); // Set interval to check every second
        return () => clearInterval(interval); // Clean up interval when component unmounts
    }, [scheduleTimes]);

    // State to track the remaining time, progress, and color of the circular progress bar
    const [timeLeft, setTimeLeft] = useState({ hour: 0, minute: 0, second: 0, progress: 0, color: "red" });

    // useEffect to update the time left and progress bar every second
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            let difference = 0, totalDuration = 1, progress = 0, progressColor = "transparent";

            // Update the time and progress if the current schedule is active
            if (currentSchedule) {
                const { start, end } = currentSchedule;
                difference = Math.max(end - now, 0);
                totalDuration = end - start;
                progressColor = "url(#gradient)"; // Apply gradient for current schedule
                progress = totalDuration > 0 ? (difference / totalDuration) * 100 : 0;

            } else if (nextSchedule) {
                // Update the time and progress for the next schedule
                const { start, end } = nextSchedule;
                difference = Math.max(start - now, 0);
                totalDuration = end - start;
                progressColor = "#ff0000"; // Red color for next schedule
                progress = totalDuration > 0 ? 100 - (difference / totalDuration) * 100 : 100;
            }

            // Calculate the hours, minutes, and seconds left
            const hour = Math.floor(difference / 3600000);
            const minute = Math.floor((difference % 3600000) / 60000);
            const second = Math.floor((difference % 60000) / 1000);

            // Update the timeLeft state with the remaining time and progress
            setTimeLeft({ hour, minute, second, progress, color: progressColor });
        };

        updateTime(); // Call the updateTime function initially
        const timer = setInterval(updateTime, 1000); // Set interval for every second to update the timer
        return () => clearInterval(timer); // Cleanup the interval when the component unmounts
    }, [currentSchedule, nextSchedule]); // Re-run when either currentSchedule or nextSchedule changes

    // Function to format the time into a readable string (12-hour format)
    const formatTime = (date) => date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

    return (
        <div className="max-w-6xl flex flex-col items-center mx-auto my-10 p-8 bg-white rounded-lg shadow-sm">
            <div className="bg-white shadow-[-2px_-2px_10px_2px_rgba(104,58,183,0.53),_2px_2px_10px_2px_rgba(104,58,183,0.53)] mt-15 rounded-lg p-6 w-full text-center">
                <div className="relative w-32 h-32 mx-auto mb-4">
                    <CircularProgressbar
                        value={timeLeft.progress}
                        text={
                            timeLeft.hour > 0
                                ? `${timeLeft.hour}h`
                                : timeLeft.minute > 0
                                    ? `${timeLeft.minute}m`
                                    : `${timeLeft.second}s`
                        }
                        strokeWidth={12}
                        styles={buildStyles({
                            pathTransitionDuration: 0.5,
                            pathColor: timeLeft.color, // Dynamic color (gradient or solid)
                            trailColor: "#d6d6d6",
                            textColor: "#673ab7",
                            textSize: "25px",
                        })}
                        className="font-bold"
                    />
                </div>
                <h2 className="text-lg font-semibold text-black">
                    {currentSchedule ? "Current Load Shedding" : "Next Load Shedding"}
                </h2>
                <p className="text-2xl font-bold text-gray-800">
                    {currentSchedule
                        ? `${formatTime(currentSchedule.start)} - ${formatTime(currentSchedule.end)}`
                        : nextSchedule
                            ? `${formatTime(nextSchedule.start)} - ${formatTime(nextSchedule.end)}`
                            : "No schedule"
                    }
                </p>
            </div>

            <svg xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", width: 0, height: 0 }}>
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#e91e63" />
                        <stop offset="100%" stopColor="#673ab7" />
                    </linearGradient>
                </defs>
            </svg>

            <div className="mt-8 w-full sm:p-6 bg-gray-100 rounded-lg shadow-md">
                <LoadSheddingSchedule />
            </div>
        </div>
    );
};

export default Home;
