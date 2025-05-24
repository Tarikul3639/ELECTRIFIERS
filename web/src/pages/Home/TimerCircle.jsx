import { memo, useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const TimerCircle = memo(({ fullSchedule }) => {
  const [currentSchedule, setCurrentSchedule] = useState(null);
  const [nextSchedule, setNextSchedule] = useState(null);
  const [scheduleTimes, setScheduleTimes] = useState([]);
  const [timeLeft, setTimeLeft] = useState({
    hour: 0,
    minute: 0,
    second: 0,
    progress: 0,
    color: "url(#gradient2)",
  });

  const formatTime = (date) =>
    date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  useEffect(() => {
    if (!fullSchedule || fullSchedule.length === 0) return;

    const parsedSchedules = fullSchedule.map((s) => {
      const [startHour, startMinute] = s.startTime.split(":").map(Number);
      const [endHour, endMinute] = s.endTime.split(":").map(Number);

      const start = new Date(s.date);
      start.setHours(startHour, startMinute, 0, 0);

      const end = new Date(s.date);
      end.setHours(endHour, endMinute, 0, 0);

      if (end < start) {
        end.setDate(end.getDate() + 1);
      }

      return { start, end };
    });

    setScheduleTimes(parsedSchedules);
  }, [fullSchedule]);

  useEffect(() => {
    const checkSchedule = () => {
      const now = new Date();
      let found = false;

      for (let i = 0; i < scheduleTimes.length; i++) {
        const { start, end } = scheduleTimes[i];

        if (now >= start && now < end) {
          setCurrentSchedule({ start, end });
          setNextSchedule(scheduleTimes[i + 1] || null);
          found = true;
          break;
        } else if (now < start) {
          setNextSchedule({ start, end });
          setCurrentSchedule(null);
          found = true;
          break;
        }
      }

      if (!found) {
        setCurrentSchedule(null);
        setNextSchedule(null);
      }
    };

    checkSchedule();
    const interval = setInterval(checkSchedule, 1000);
    return () => clearInterval(interval);
  }, [scheduleTimes]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let difference = 0,
        totalDuration = 1,
        progress = 0,
        progressColor = "url(#gradient2)";

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
        progress = totalDuration > 0 ? 100 - (difference / 3600000) * 100 : 100;
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

  return (
    <div className="bg-white dark:bg-background-dark shadow-[-2px_-2px_10px_2px_rgba(104,58,183,0.53),_2px_2px_10px_2px_rgba(104,58,183,0.53)] mt-15 rounded-lg p-6 w-full text-center">
      <div className="relative w-32 h-32 mx-auto mb-4 font-bold">
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
        />
      </div>
      <h2 className="text-lg font-semibold text-black dark:text-primary-text-light">
        {currentSchedule ? "Current Load Shedding" : "Next Load Shedding"}
      </h2>
      <p className="text-2xl font-bold text-gray-800 dark:text-primary-text-light">
        {currentSchedule
          ? `${formatTime(currentSchedule.start)} - ${formatTime(currentSchedule.end)}`
          : nextSchedule
          ? `${formatTime(nextSchedule.start)} - ${formatTime(nextSchedule.end)}`
          : "No schedule available"}
      </p>
    </div>
  );
});

export default TimerCircle;
