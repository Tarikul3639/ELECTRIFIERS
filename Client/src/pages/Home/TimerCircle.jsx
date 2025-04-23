import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const TimerCircle = ({ fullSchedule }) => {
  // Schedule state management
  const [currentSchedule, setCurrentSchedule] = useState(null);
  const [nextSchedule, setNextSchedule] = useState(null);
  const [scheduleTimes, setScheduleTimes] = useState([]);
  // console.log("fullSchedule", fullSchedule);

  useEffect(() => {
    const now = new Date();
  
    // Filter schedules that are not completed and have future time slots
    const filtered = fullSchedule.filter((item) => {
      const [startStr] = item.scheduleTime.split(" - ");
      // console.log("startStr", startStr); // startStr 12:00 AM
      const start = parseTime(startStr);
      // console.log("start", start); // start Wed Apr 23 2025 00:00:00 GMT+0600 (Bangladesh Standard Time)
  
      // Set schedule start time to its actual date from `item.date`
      const scheduleDate = new Date(item.date);
      // console.log("scheduleDate", scheduleDate); // scheduleDate Wed Apr 23 2025 06:00:00 GMT+0600 (Bangladesh Standard Time)
      start.setFullYear(scheduleDate.getFullYear(), scheduleDate.getMonth(), scheduleDate.getDate());
      // console.log("start", start); // start Wed Apr 23 2025 00:00:00 GMT+0600 (Bangladesh Standard Time)
      return new Date(item.date) >= now || start >= now;
    });
  
    const times = filtered.map((item) => item.scheduleTime);
    setScheduleTimes(times);
  }, [fullSchedule]);
  
  
  

  // Time parser utility
  const parseTime = (timeStr) => {
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  };

  // Schedule checking logic
  useEffect(() => {
    const checkSchedule = () => {
      if (scheduleTimes.length === 0) return; // Guard clause

      const now = new Date();
      let found = false;

      for (let i = 0; i < scheduleTimes.length; i++) {
        const [startStr, endStr] = scheduleTimes[i].split(" - ");
        const start = parseTime(startStr);
        const end = parseTime(endStr);

        if (now >= start && now < end) {
          setCurrentSchedule({ start, end });
          setNextSchedule(
            scheduleTimes[i + 1]
              ? {
                start: parseTime(scheduleTimes[i + 1].split(" - ")[0]),
                end: parseTime(scheduleTimes[i + 1].split(" - ")[1]),
              }
              : null
          );
          found = true;
          break;
        } else if (now < start) {
          setNextSchedule({ start, end });
          found = true;
          break;
        }
      }

      if (!found) {
        const firstSchedule = scheduleTimes[0].split(" - ");
        const nextDayStart = parseTime(firstSchedule[0]);
        nextDayStart.setDate(nextDayStart.getDate() + 1);
        setNextSchedule({
          start: nextDayStart,
          end: parseTime(firstSchedule[1]),
        });
        setCurrentSchedule(null);
      }
    };

    checkSchedule();
    const interval = setInterval(checkSchedule, 1000);
    return () => clearInterval(interval);
  }, [scheduleTimes]);

  const [timeLeft, setTimeLeft] = useState({
    hour: 0,
    minute: 0,
    second: 0,
    progress: 0,
    color: "url(#gradient2)",
  });

  // Time left calculations
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let difference = 0,
        totalDuration = 1,
        progress = 0,
        progressColor = "transparent";

      if (currentSchedule) {
        const { start, end } = currentSchedule;
        difference = Math.max(end - now, 0);
        totalDuration = end - start;
        progressColor = "url(#gradient)";
        progress = totalDuration > 0 ? (difference / totalDuration) * 100 : 0;
      } else if (nextSchedule) {
        const { start, end } = nextSchedule;
        difference = Math.max(start - now, 0);
        totalDuration = end - start;
        progressColor = "url(#gradient2)";
        progress = totalDuration > 0 ? 100 - (difference / totalDuration) * 100 : 100;
      }

      const hour = Math.floor(difference / 3600000);
      const minute = Math.floor((difference % 3600000) / 60000);
      const second = Math.floor((difference % 60000) / 1000);

      setTimeLeft({ hour, minute, second, progress, color: progressColor });
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, [currentSchedule, nextSchedule]);

  // Time formatting helper
  const formatTime = (date) =>
    date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });

  return (
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
            pathColor: timeLeft.color,
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
            : "No schedule available"}
      </p>
    </div>
  );
};

export default TimerCircle;
