import { memo, useEffect, useState, useRef } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const messages = {
  first: "Power cut after in 10 minutes",
  second: "Power cut after in 5 minutes",
  third: "Power cut after in 1 minutes",
  one: "Power on after 10 minutes",
  two: "Power on after 5 minutes",
  three: "Power on after 1 minutes",
};

const TimerCircle = memo(({ fullSchedule }) => {
  const [currentSchedule, setCurrentSchedule] = useState(null);
  const [nextSchedule, setNextSchedule] = useState(null);
  const [scheduleTimes, setScheduleTimes] = useState([]);
  const lastNotifiedTime = useRef({ minute: null, type: null });

  const formatTime = (date) =>
    date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        console.log("Notification permission:", permission);
      });
    }
  }, []);

  const sendNotification = (title, body) => {
    console.log("Sending notification:", title, body);
    const newNotification = {
      title,
      body,
      read: false,
      timestamp: new Date().toISOString(),
    };
  
    const existing = JSON.parse(localStorage.getItem("notifications")) || [];
    existing.unshift(newNotification);
    const updated = existing.slice(0, 20);
    localStorage.setItem("notifications", JSON.stringify(updated));
  
    // Dispatch custom event
    window.dispatchEvent(new Event("notificationUpdated"));
  
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(title, {
        body,
        icon: "/icon.png",
      });
    }
  };  

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
      if (scheduleTimes.length === 0) return;

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
          found = true;
          break;
        }
      }

      if (!found && scheduleTimes.length > 0) {
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

  useEffect(() => {
    lastNotifiedTime.current = { minute: null, type: null };
  }, [currentSchedule, nextSchedule]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let difference = 0,
        totalDuration = 1,
        progress = 0,
        progressColor = "url(#gradient)";

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

      if ((minute === 10 || minute === 5 || minute === 1) && second === 0) {
        const type = currentSchedule ? "current" : "next";

        if (
          lastNotifiedTime.current.minute !== minute ||
          lastNotifiedTime.current.type !== type
        ) {
          let message = "";

          if (type === "current") {
            if (minute === 10) message = messages.one;
            else if (minute === 5) message = messages.two;
            else if (minute === 1) message = messages.three;
          } else {
            if (minute === 10) message = messages.first;
            else if (minute === 5) message = messages.second;
            else if (minute === 1) message = messages.third;
          }

          if (message) {
            sendNotification("Load Shedding Alert", message);
            lastNotifiedTime.current = { minute, type };
          }
        }
      }

      setTimeLeft({ hour, minute, second, progress, color: progressColor });
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, [currentSchedule, nextSchedule]);

  return (
    <div className="bg-white shadow-[-2px_-2px_10px_2px_rgba(104,58,183,0.53),_2px_2px_10px_2px_rgba(104,58,183,0.53)] mt-15 rounded-lg p-6 w-full text-center">
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
});

// Export memoized version
export default TimerCircle;
