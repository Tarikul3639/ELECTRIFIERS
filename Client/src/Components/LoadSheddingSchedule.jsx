import { useState } from "react";
import dayjs from "dayjs";

// Full schedule data for load shedding
const fullSchedule = [
    { date: "2025-03-25", time: "06:00 - 08:00", status: "Active" },
    { date: "2025-03-27", time: "10:00 - 12:00", status: "Upcoming" },
    { date: "2025-03-30", time: "14:00 - 16:00", status: "Upcoming" },
    { date: "2025-04-02", time: "08:00 - 10:00", status: "Upcoming" },
    { date: "2025-04-05", time: "16:00 - 18:00", status: "Upcoming" },
    { date: "2025-04-10", time: "12:00 - 14:00", status: "Upcoming" },
    { date: "2025-04-15", time: "18:00 - 20:00", status: "Upcoming" },
];

// Function to get weekly schedule based on today's date
function getWeeklySchedule(schedule) {
    const today = dayjs();
    const startOfWeek = today.startOf("week"); // Start of this week
    const endOfWeek = today.endOf("week"); // End of this week

    // Filter the schedule to only include items within this week
    return schedule.filter((item) => {
        const itemDate = dayjs(item.date);
        return itemDate.isAfter(startOfWeek) && itemDate.isBefore(endOfWeek);
    });
}

export default function LoadSheddingSchedule() {
    // State for toggling view mode
    const [viewMonthly, setViewMonthly] = useState(false);
    // Get this week's schedule
    const weeklySchedule = getWeeklySchedule(fullSchedule);

    return (
        <div className="rounded-lg bg-gray-100 sm:p-6 w-full mt-6">
            {/* Title section with dynamic text based on view mode */}
            <h2 className="text-2xl text-slate-700 text-center font-bold mb-4 uppercase">
                Load-Shedding Schedule
            </h2>

            <div className="mt-8 w-full rounded-xl bg-gray-200 p-2 sm:p-6">
                {/* Sub-title for load shedding schedule */}
                <h3 className="TITLE-SECONDARY mb-4 text-slate-700">
                    {viewMonthly ? "Monthly Load-Shedding Schedule" : "Today's Load-Shedding Schedule"}
                </h3>

                {/* Schedule list section */}
                <div className="space-y-4">
                    {/* Mapping through the schedule array based on the view */}
                    {(viewMonthly ? fullSchedule : weeklySchedule).map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white">
                            <div className="flex items-center gap-4">
                                {/* Status indicator (circle) */}
                                <div
                                    className={`w-2 h-2 rounded-full bg-[${item.status === "Active" ? "#50d71e" : "#FFA500"}]`}
                                />
                                <div>
                                    <div className="TEXT-CONTENT font-medium text-slate-700">
                                        {item.time} {/* Display time */}
                                    </div>
                                    <div className="TEXT-CONTENT text-sm text-slate-500">
                                        {item.date} {/* Display date */}
                                    </div>
                                </div>
                            </div>
                            {/* Status label */}
                            <div className={`TEXT-CONTENT text-sm text-${item.status === "Active" ? "green" : "orange"}-500`}>
                                {item.status} {/* Display status */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Button to toggle between weekly and full schedule view */}
            <button
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700"
                onClick={() => setViewMonthly(!viewMonthly)} // Toggle view mode
            >
                {viewMonthly ? "View Today's Schedule" : (
                    <>
                        View Full Schedule <span className="hidden lg:inline">&amp; Load Shedding Dates</span>
                    </>
                )}
            </button>

        </div>
    );
}
