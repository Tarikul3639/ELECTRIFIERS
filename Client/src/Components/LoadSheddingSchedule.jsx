import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import socket from "./socket/Socket.jsx";

// Function to get today's schedule only
function getTodaysSchedule(schedule) {
    const today = dayjs().format("YYYY-MM-DD");
    return schedule.filter((item) => item.date === today);
}

// Function to sort schedule by status priority
function sortByStatus(schedule) {
    const priority = { Active: 1, Upcoming: 2, Completed: 3 };
    return [...schedule].sort((a, b) => priority[a.status] - priority[b.status]);
}

const LoadSheddingSchedule = React.memo(({ onScheduleFetched }) => {
    const userEmail = JSON.parse(localStorage.getItem("user")).email;

    const [fullSchedule, setFullSchedule] = useState([]);
    const [viewMonthly, setViewMonthly] = useState(false);

    useEffect(() => {
        socket.emit("user:load-schedule", userEmail, (response) => {
            if (response.status === "success") {
                const processedSchedule = response.data.map((item) => ({
                    ...item,
                    date: dayjs(item.date).format("YYYY-MM-DD"),
                }));

                setFullSchedule(processedSchedule);
                if (onScheduleFetched) {
                    const todaySchedule = getTodaysSchedule(processedSchedule);
                    onScheduleFetched(todaySchedule);
                }

            } else {
                console.error("Error fetching schedule:", response.message);
            }
        });
    }, []);

    // Get sorted today or monthly data
    const displayedSchedule = sortByStatus(
        viewMonthly ? fullSchedule : getTodaysSchedule(fullSchedule)
    );

    return (
        <div className="rounded-lg bg-gray-100 sm:p-6 w-full mt-6">
            <h2 className="text-2xl text-slate-700 text-center font-bold mb-4 uppercase">
                Load-Shedding Schedule
            </h2>

            <div className="mt-8 w-full rounded-xl bg-gray-200 p-2 sm:p-6">
                <h3 className="TITLE-SECONDARY mb-4 text-slate-700">
                    {viewMonthly ? "Monthly Load-Shedding Schedule" : "Today's Load-Shedding Schedule"}
                </h3>

                <div className="space-y-4">
                    {displayedSchedule.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white">
                            <div className="flex items-center gap-4">
                                <div
                                    className={`w-2.5 h-2.5 rounded-full ${
                                        item.status === "Active"
                                            ? "bg-green-500"
                                            : item.status === "Completed"
                                            ? "bg-gray-400"
                                            : "bg-orange-500"
                                    }`}
                                />
                                <div>
                                    <div className="TEXT-CONTENT font-medium text-slate-700">
                                        {item.scheduleTime}
                                    </div>
                                    <div className="TEXT-CONTENT text-sm text-slate-500">
                                        {item.date} - {item.day}
                                    </div>
                                </div>
                            </div>
                            <div
                                className={`TEXT-CONTENT text-sm font-semibold ${
                                    item.status === "Active"
                                        ? "text-green-500"
                                        : item.status === "Completed"
                                        ? "text-gray-500"
                                        : "text-orange-500"
                                }`}
                            >
                                {item.status}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <button
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700"
                onClick={() => setViewMonthly(!viewMonthly)}
            >
                {viewMonthly ? "View Today's Schedule" : (
                    <>
                        View Full Schedule <span className="hidden lg:inline">&amp; Load Shedding Dates</span>
                    </>
                )}
            </button>
        </div>
    );
});

export default LoadSheddingSchedule;
