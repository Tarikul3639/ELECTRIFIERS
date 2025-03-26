import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Home = () => {
    const nextLoadSheddingTime = new Date();
    nextLoadSheddingTime.setHours(21, 30, 0);

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    function calculateTimeLeft() {
        const now = new Date();
        const difference = nextLoadSheddingTime - now;
        const totalMinutes = Math.floor(difference / 1000 / 60);
        const progress = 100 - (difference / (2 * 60 * 60 * 1000)) * 100;
        return { totalMinutes, progress };
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearInterval(timer);
    });
    //rgba(104, 58, 183, 0.46)
    //rgba(228, 31, 103, 0.53)

    return (
        <div className="max-w-6xl flex flex-col items-center mx-auto my-10 p-8 bg-white rounded-lg shadow-sm">

            {/* Next Load Shedding Section */}
            <div className="bg-white shadow-[-2px_-2px_10px_2px_rgba(104,58,183,0.53),_2px_2px_10px_2px_rgba(104,58,183,0.53)] mt-6 rounded-lg p-6 w-full text-center">
                <div className="relative w-32 h-32 mx-auto mb-4">
                    {/* React Inbuilt Circular Progress with Tailwind */}
                    <div className="relative w-full h-full">
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
                            className="font-bold text-2xl"
                        />
                    </div>
                </div>
                <h2 className="text-lg font-semibold text-black">Next Load Shedding</h2>
                <p className="text-2xl font-bold text-gray-800">02:30 PM - 04:30 PM</p>
            </div>

            {/* Gradient definition for CircularProgressbar */}
            <svg xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", width: 0, height: 0 }}>
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#e91e63" />
                        <stop offset="100%" stopColor="#673ab7" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Weekly Load Shedding Schedule */}
            <div className=" rounded-lg bg-gray-100 p-6 w-full mt-6">
                <h2 className="text-2xl text-slate-700 text-center font-bold mb-4">Weekly Load Shedding Schedule</h2>
                <div className="mt-8 w-full rounded-xl bg-gray-200 p-6">
                    <h3 className="TITLE-SECONDARY mb-4 text-slate-700">
                        Today&apos;s Load-Shedding Schedule
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 rounded-lg bg-white">
                            <div className="flex items-center gap-4">
                                <div className="w-2 h-2 rounded-full bg-[#50d71e]" />
                                <div>
                                    <div className="TEXT-CONTENT font-medium text-slate-700">
                                        06:00 - 08:00
                                    </div>
                                    <div className="TEXT-CONTENT text-sm text-slate-500">
                                        Today
                                    </div>
                                </div>
                            </div>
                            <div className="TEXT-CONTENT text-sm text-[#50d71e]">
                                Active
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-white">
                            <div className="flex items-center gap-4">
                                <div className="w-2 h-2 rounded-full bg-[#ffa500]" />
                                <div>
                                    <div className="TEXT-CONTENT font-medium text-slate-700">
                                        10:00 - 12:00
                                    </div>
                                    <div className="TEXT-CONTENT text-sm text-slate-500">
                                        Sunday
                                    </div>
                                </div>
                            </div>
                            <div className="TEXT-CONTENT text-sm text-[#ffa500]">
                                Upcoming
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-white">
                            <div className="flex items-center gap-4">
                                <div className="w-2 h-2 rounded-full bg-[#ffa500]" />
                                <div>
                                    <div className="TEXT-CONTENT font-medium text-slate-700">
                                        14:00 - 16:00
                                    </div>
                                    <div className="TEXT-CONTENT text-sm text-slate-500">
                                        Monday
                                    </div>
                                </div>
                            </div>
                            <div className="TEXT-CONTENT text-sm text-[#ffa500]">
                                Upcoming
                            </div>
                        </div>
                    </div>
                </div>
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 mt-6">
                    View Full Schedule <span className="hidden lg:inline">&amp; Load Shedding Dates</span> 
                </button>
            </div>
        </div>
    );
};

export default Home;
