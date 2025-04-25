import TimeRangePicker from "../../../Components/ui/TimeRangePicker.jsx";

const TimeRangeColumn = ({ showEdit, startTime, endTime, _id, setUpdateSchedule, updateSchedule }) => {
    return (
        <>
            {showEdit === _id ? (
                <TimeRangePicker
                    startTime={updateSchedule.startTime || startTime}
                    endTime={updateSchedule.endTime || endTime}
                    onStartTimeChange={(e) =>
                        setUpdateSchedule((prev) => ({
                            ...prev,
                            id: _id,
                            startTime: e.target.value,
                        }))
                    }
                    onEndTimeChange={(e) =>
                        setUpdateSchedule((prev) => ({
                            ...prev,
                            id: _id,
                            endTime: e.target.value,
                        }))
                    }
                />
            ) : (
                `${new Date(`1970-01-01T${startTime}`).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                }).toLowerCase()} - ${new Date(`1970-01-01T${endTime}`).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                }).toLowerCase()}`
            )}
        </>
    );
};

export default TimeRangeColumn;
