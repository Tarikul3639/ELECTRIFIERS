import React, { useState } from "react";
import dayjs from "dayjs";

// Function to get today's schedule
function getTodaysSchedule(schedule) {
    const today = dayjs().format("YYYY-MM-DD");
    return schedule.filter((item) => item.date === today);
}

const LoadSheddingList = React.memo(({ fullSchedule }) => {
    const [viewToday, setViewToday] = useState(true); // Default to show today's schedule
    const displayedSchedule = viewToday ? getTodaysSchedule(fullSchedule) : fullSchedule;
    return (
        <div className="rounded-lg bg-gray-100 sm:p-6 w-full mt-6">
            <h2 className="text-2xl text-slate-700 text-center font-bold mb-4 uppercase">
                Load-Shedding Schedule
            </h2>

            <div className="mt-8 w-full rounded-xl bg-gray-200 p-2 sm:p-6">
                <h3 className="TITLE-SECONDARY mb-4 text-slate-700">
                    {viewToday ? "Today's Load-Shedding Schedule" : "Monthly Load-Shedding Schedule"}
                </h3>

                <div className="space-y-4">
                    {displayedSchedule.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white">
                            <div className="flex items-center gap-4">
                                <div
                                    className={`w-2.5 h-2.5 rounded-full ${item.status === "Active"
                                        ? "bg-green-500"
                                        : item.status === "Completed"
                                            ? "bg-gray-400"
                                            : "bg-orange-500"
                                        }`}
                                />
                                <div>
                                    <div className="TEXT-CONTENT font-medium text-slate-700">
                                        {dayjs(`2000-01-01T${item.startTime}`).format("h:mm A")} -{" "}
                                        {dayjs(`2000-01-01T${item.endTime}`).format("h:mm A")}
                                    </div>
                                    <div className="TEXT-CONTENT text-sm text-slate-500">
                                        {item.date} - {item.day}
                                    </div>
                                </div>
                            </div>
                            <div
                                className={`TEXT-CONTENT text-sm font-semibold ${item.status === "Active"
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
                onClick={() => setViewToday((prev) => !prev)}
            >
                {viewToday ? "View Full Schedule & Load Shedding Dates" : "View Today's Schedule"}
            </button>
        </div>
    );
});

export default LoadSheddingList;
