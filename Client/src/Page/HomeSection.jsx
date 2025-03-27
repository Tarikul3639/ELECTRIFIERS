import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import LoadSheddingSchedule from "../Components/LoadSheddingSchedule";

const Home = () => {
    // Set the next load shedding time (example: 9:30 PM)
    const nextLoadSheddingTime = new Date();
    nextLoadSheddingTime.setHours(21, 30, 0);

    // Function to calculate the remaining time
    function calculateTimeLeft() {
        const now = new Date();
        const difference = nextLoadSheddingTime - now;
        const totalMinutes = Math.floor(difference / 1000 / 60);
        const progress = 100 - (difference / (2 * 60 * 60 * 1000)) * 100;
        return { totalMinutes, progress };
    }

    // State for tracking time left
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    // Update time left every second
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearInterval(timer);
    });

    return (
        <div className="max-w-6xl flex flex-col items-center mx-auto my-10 p-8 bg-white rounded-lg shadow-sm">
            {/* Next Load Shedding Section */}
            <div className="bg-white shadow-[-2px_-2px_10px_2px_rgba(104,58,183,0.53),_2px_2px_10px_2px_rgba(104,58,183,0.53)] mt-6 rounded-lg p-6 w-full text-center">
                <div className="relative w-32 h-32 mx-auto mb-4">
                    {/* Circular Progress Indicator */}
                    <CircularProgressbar
                        value={timeLeft.progress}
                        text={`${timeLeft.totalMinutes}m`}
                        strokeWidth={12}
                        styles={buildStyles({
                            pathTransitionDuration: 0.5,
                            pathColor: "url(#gradient)",
                            trailColor: "#d6d6d6",
                            textColor: "#673ab7",
                            textSize: "25px",
                        })}
                        className="font-bold"
                    />
                </div>
                <h2 className="text-lg font-semibold text-black">Next Load Shedding</h2>
                <p className="text-2xl font-bold text-gray-800">02:30 PM - 04:30 PM</p>
            </div>

            {/* SVG Gradient for CircularProgressbar */}
            <svg xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", width: 0, height: 0 }}>
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#e91e63" />
                        <stop offset="100%" stopColor="#673ab7" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Load Shedding Schedule Section */}
            <div className="mt-8 w-full sm:p-6 bg-gray-100 rounded-lg shadow-md">
                <LoadSheddingSchedule />
            </div>
        </div>
    );
};

export default Home;
